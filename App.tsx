import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { WorkoutPlanScreen } from "./src/screens/WorkoutPlanScreen";
import { DailyWorkoutScreen } from "./src/screens/DailyWorkoutScreen";
import { DietScreen } from "./src/screens/DietScreen";
import { ProgressScreen } from "./src/screens/ProgressScreen";
import { ToolsScreen } from "./src/screens/ToolsScreen";
import { ExerciseDetailModal } from "./src/screens/ExerciseDetailModal";
import { TabBar } from "./src/components/TabBar";
import { dietPlans } from "./src/data/dietPlan";
import { motivationQuotes } from "./src/data/motivation";
import { createInitialAppData, migrateAppData, workoutPlan } from "./src/data/workoutPlan";
import { usePersistentState } from "./src/hooks/usePersistentState";
import { colors } from "./src/theme/theme";
import { AppData, ExerciseVariant, TabKey } from "./src/types";
import { calculateBmi, getBmiCategory } from "./src/utils/bmi";
import { formatDateKey, getTodayPlan } from "./src/utils/date";
import {
  getCompletedCountForDay,
  getStrengthCategoryProgress,
  getWorkoutStreak,
  getWeeklyCompletionBars,
} from "./src/utils/progress";

// Keep key stable so existing installs keep AsyncStorage progress.
const storageKey = "beginner-gym-companion-v1";

export default function App() {
  const { state: appData, setState: setAppData, loading } = usePersistentState<AppData>(
    storageKey,
    createInitialAppData(),
    migrateAppData
  );
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedDay, setSelectedDay] = useState(getTodayPlan(workoutPlan).day);
  const [activeDietId, setActiveDietId] = useState(dietPlans[0].id);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseVariant | null>(null);
  const [workoutTimerSeconds, setWorkoutTimerSeconds] = useState(0);
  const [workoutTimerRunning, setWorkoutTimerRunning] = useState(false);
  const [restTimerSeconds, setRestTimerSeconds] = useState(60);
  const [restTimerRunning, setRestTimerRunning] = useState(false);

  const todayPlan = getTodayPlan(workoutPlan);
  const todayKey = formatDateKey(new Date());
  const todayWaterMl = appData.waterMlByDate[todayKey] ?? 0;
  const todayNote = appData.workoutNotes[todayKey] ?? "";
  const todayCompletedCount = getCompletedCountForDay(
    appData,
    todayKey,
    todayPlan.exercises,
    appData.slotExerciseChoice
  );
  const streak = getWorkoutStreak(appData);
  const weeklyBars = getWeeklyCompletionBars(appData);
  const latestWeight =
    appData.bodyWeightEntries.length > 0
      ? appData.bodyWeightEntries[appData.bodyWeightEntries.length - 1].weightKg
      : null;
  const quote = motivationQuotes[new Date().getDate() % motivationQuotes.length];
  const bmi = latestWeight ? calculateBmi(latestWeight, appData.heightCm) : 0;
  const strengthCategoryProgress = getStrengthCategoryProgress(appData, workoutPlan);
  const exerciseById = useMemo(() => {
    const m = new Map<string, ExerciseVariant>();
    workoutPlan.forEach((plan) => {
      plan.exercises.forEach((ex) => {
        m.set(ex.id, ex);
        ex.alternatives?.forEach((a) => {
          m.set(a.id, a);
        });
      });
    });
    return m;
  }, []);

  useEffect(() => {
    if (!workoutTimerRunning) return;

    const interval = setInterval(() => {
      setWorkoutTimerSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutTimerRunning]);

  useEffect(() => {
    if (!restTimerRunning) return;

    const interval = setInterval(() => {
      setRestTimerSeconds((value) => {
        if (value <= 1) {
          setRestTimerRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [restTimerRunning]);

  function setExerciseWeight(exerciseId: string, weightKg: number) {
    setAppData((current) => ({
      ...current,
      exerciseWeights: {
        ...current.exerciseWeights,
        [exerciseId]: Math.max(weightKg, 0),
      },
    }));
  }

  function setSlotExerciseVariant(slotPrimaryId: string, variantId: string) {
    setAppData((current) => ({
      ...current,
      slotExerciseChoice: { ...current.slotExerciseChoice, [slotPrimaryId]: variantId },
    }));
  }

  function toggleExerciseComplete(exercise: ExerciseVariant) {
    const completionKey = `${todayKey}_${exercise.id}`;
    const nextCompleted = !appData.completedExercises[completionKey];
    const currentWeight = appData.exerciseWeights[exercise.id] ?? exercise.defaultWeightKg;

    setAppData((current) => {
      const previousHistory = current.exerciseHistory[exercise.id] ?? [];
      const alreadyLoggedToday = previousHistory.some((item) => item.date === todayKey);

      return {
        ...current,
        completedExercises: {
          ...current.completedExercises,
          [completionKey]: nextCompleted,
        },
        exerciseHistory:
          nextCompleted && !alreadyLoggedToday
            ? {
                ...current.exerciseHistory,
                [exercise.id]: [
                  ...previousHistory,
                  {
                    date: todayKey,
                    weightKg: currentWeight,
                  },
                ],
              }
            : current.exerciseHistory,
      };
    });
  }

  function updateWorkoutNote(value: string) {
    setAppData((current) => ({
      ...current,
      workoutNotes: {
        ...current.workoutNotes,
        [todayKey]: value,
      },
    }));
  }

  function addWater(ml: number) {
    setAppData((current) => ({
      ...current,
      waterMlByDate: {
        ...current.waterMlByDate,
        [todayKey]: (current.waterMlByDate[todayKey] ?? 0) + ml,
      },
    }));
  }

  function resetWater() {
    setAppData((current) => ({
      ...current,
      waterMlByDate: {
        ...current.waterMlByDate,
        [todayKey]: 0,
      },
    }));
  }

  function addBodyWeight(weightKg: number) {
    setAppData((current) => ({
      ...current,
      bodyWeightEntries: [
        ...current.bodyWeightEntries.filter((entry) => entry.date !== todayKey),
        { date: todayKey, weightKg },
      ].sort((left, right) => left.date.localeCompare(right.date)),
    }));
  }

  function updateHeight(heightCm: number) {
    setAppData((current) => ({
      ...current,
      heightCm: Math.max(heightCm, 0),
    }));
  }

  function renderScreen() {
    if (activeTab === "home") {
      return (
        <HomeScreen
          todayPlan={todayPlan}
          streak={streak}
          waterMl={todayWaterMl}
          completedCount={todayCompletedCount}
          quote={quote}
          onGoToToday={() => setActiveTab("today")}
          onGoToDiet={() => setActiveTab("diet")}
        />
      );
    }

    if (activeTab === "plan") {
      return (
        <WorkoutPlanScreen
          plans={workoutPlan}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          onOpenExercise={(exerciseId) => {
            const match = exerciseById.get(exerciseId);
            if (match) {
              setSelectedExercise(match);
            }
          }}
        />
      );
    }

    if (activeTab === "today") {
      return (
        <DailyWorkoutScreen
          todayPlan={todayPlan}
          dateKey={todayKey}
          note={todayNote}
          slotExerciseChoice={appData.slotExerciseChoice}
          onSelectSlotVariant={setSlotExerciseVariant}
          exerciseHistory={appData.exerciseHistory}
          getExerciseWeight={(exerciseId) => appData.exerciseWeights[exerciseId] ?? 0}
          isCompleted={(exerciseId) => Boolean(appData.completedExercises[`${todayKey}_${exerciseId}`])}
          onOpenExercise={setSelectedExercise}
          onToggleComplete={toggleExerciseComplete}
          onAdjustWeight={(exerciseId, delta) =>
            setExerciseWeight(exerciseId, (appData.exerciseWeights[exerciseId] ?? 0) + delta)
          }
          onSetWeight={setExerciseWeight}
          onNoteChange={updateWorkoutNote}
          workoutTimerSeconds={workoutTimerSeconds}
          workoutTimerRunning={workoutTimerRunning}
          restTimerSeconds={restTimerSeconds}
          restTimerRunning={restTimerRunning}
          onToggleWorkoutTimer={() => setWorkoutTimerRunning((value) => !value)}
          onResetWorkoutTimer={() => {
            setWorkoutTimerRunning(false);
            setWorkoutTimerSeconds(0);
          }}
          onToggleRestTimer={() => setRestTimerRunning((value) => !value)}
          onResetRestTimer={() => {
            setRestTimerRunning(false);
            setRestTimerSeconds(60);
          }}
          onStartRestTimer={(seconds) => {
            setRestTimerSeconds(seconds);
            setRestTimerRunning(true);
          }}
        />
      );
    }

    if (activeTab === "diet") {
      return (
        <DietScreen
          dietPlans={dietPlans}
          activeDietId={activeDietId}
          onSelectDiet={setActiveDietId}
        />
      );
    }

    if (activeTab === "progress") {
      return (
        <ProgressScreen
          appData={appData}
          streak={streak}
          weeklyBars={weeklyBars}
          strengthCategoryProgress={strengthCategoryProgress}
          latestWeight={latestWeight}
          onAddBodyWeight={addBodyWeight}
        />
      );
    }

    return (
      <ToolsScreen
        waterMl={todayWaterMl}
        bmi={bmi}
        bmiCategory={getBmiCategory(bmi)}
        heightCm={appData.heightCm}
        latestWeight={latestWeight}
        quote={quote}
        onAddWater={addWater}
        onResetWater={resetWater}
        onUpdateHeight={updateHeight}
      />
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={colors.accent} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {renderScreen()}
        <TabBar activeTab={activeTab} onChange={setActiveTab} />
      </View>
      <ExerciseDetailModal
        exercise={selectedExercise}
        visible={Boolean(selectedExercise)}
        onClose={() => setSelectedExercise(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
