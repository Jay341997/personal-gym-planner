import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppData, ExerciseVariant, WorkoutDayPlan } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionTitle } from "../components/SectionTitle";
import { TimerCard } from "../components/TimerCard";
import { ExerciseCard } from "../components/ExerciseCard";
import { RoutineWarmupBlocks, RoutineCardioBlocks, RoutineStretchBlocks } from "../components/RoutinePrepSections";
import { getExercisePersonalBestKg, getIdealTargetKg } from "../utils/exerciseTargets";
import { resolveExerciseSlot, slotExerciseOptions } from "../utils/exerciseSlot";

type Props = {
  todayPlan: WorkoutDayPlan;
  dateKey: string;
  note: string;
  slotExerciseChoice: Record<string, string>;
  onSelectSlotVariant: (slotPrimaryId: string, variantId: string) => void;
  exerciseHistory: AppData["exerciseHistory"];
  getExerciseWeight: (exerciseId: string) => number;
  isCompleted: (exerciseId: string) => boolean;
  onOpenExercise: (exercise: ExerciseVariant) => void;
  onToggleComplete: (exercise: ExerciseVariant) => void;
  onAdjustWeight: (exerciseId: string, delta: number) => void;
  onSetWeight: (exerciseId: string, value: number) => void;
  onNoteChange: (value: string) => void;
  workoutTimerSeconds: number;
  workoutTimerRunning: boolean;
  restTimerSeconds: number;
  restTimerRunning: boolean;
  onToggleWorkoutTimer: () => void;
  onResetWorkoutTimer: () => void;
  onToggleRestTimer: () => void;
  onResetRestTimer: () => void;
  onStartRestTimer: (seconds: number) => void;
};

export function DailyWorkoutScreen({
  todayPlan,
  dateKey,
  note,
  slotExerciseChoice,
  onSelectSlotVariant,
  exerciseHistory,
  getExerciseWeight,
  isCompleted,
  onOpenExercise,
  onToggleComplete,
  onAdjustWeight,
  onSetWeight,
  onNoteChange,
  workoutTimerSeconds,
  workoutTimerRunning,
  restTimerSeconds,
  restTimerRunning,
  onToggleWorkoutTimer,
  onResetWorkoutTimer,
  onToggleRestTimer,
  onResetRestTimer,
  onStartRestTimer,
}: Props) {
  return (
    <ScreenContainer>
      <SectionTitle title="Today's Workout" subtitle={`${todayPlan.day} - ${dateKey}`} />

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>{todayPlan.focus}</Text>
        <Text style={styles.bannerText}>
          Start timers when you're ready, warm up, hit your lifts, then finish with light cardio and
          stretches.
        </Text>
      </View>

      <SectionTitle title="Timers" subtitle="Whole-workout timer and rest between sets." />
      <View style={styles.timerRow}>
        <TimerCard
          label="Workout Timer"
          seconds={workoutTimerSeconds}
          running={workoutTimerRunning}
          onStartPause={onToggleWorkoutTimer}
          onReset={onResetWorkoutTimer}
        />
        <TimerCard
          label="Rest Timer"
          seconds={restTimerSeconds}
          running={restTimerRunning}
          onStartPause={onToggleRestTimer}
          onReset={onResetRestTimer}
          accent="green"
        />
      </View>

      <SectionTitle title="Warm-up" subtitle="Prime joints before your main lifts." />
      <View style={styles.card}>
        <RoutineWarmupBlocks items={todayPlan.warmup} />
      </View>

      <SectionTitle title="Exercises" subtitle="Main lifts for today." />
      {todayPlan.exercises.length === 0 ? (
        <View style={styles.restCard}>
          <Text style={styles.restTitle}>Today is your rest day.</Text>
          <Text style={styles.restText}>
            Keep it easy with light walking, mobility work, and good meals.
          </Text>
        </View>
      ) : (
        todayPlan.exercises.map((primary) => {
          const active = resolveExerciseSlot(primary, slotExerciseChoice);
          const history = exerciseHistory[active.id] ?? [];
          const variantOptions = slotExerciseOptions(primary);
          return (
            <ExerciseCard
              key={primary.id}
              activeExercise={active}
              variantOptions={variantOptions}
              onSelectVariant={(variantId) => onSelectSlotVariant(primary.id, variantId)}
              weightKg={getExerciseWeight(active.id)}
              personalBestKg={getExercisePersonalBestKg(history)}
              idealTargetKg={getIdealTargetKg(active, history)}
              completed={isCompleted(active.id)}
              onOpenDetail={() => onOpenExercise(active)}
              onToggleComplete={() => onToggleComplete(active)}
              onAdjustWeight={(delta) => onAdjustWeight(active.id, delta)}
              onSetWeight={(value) => onSetWeight(active.id, value)}
              onStartRest={onStartRestTimer}
            />
          );
        })
      )}

      <SectionTitle
        title="Cardio + stretching"
        subtitle="Cool-down after training—easy cardio, then relaxed holds."
      />
      <View style={styles.card}>
        <Text style={styles.subSectionHeading}>Light cardio</Text>
        <RoutineCardioBlocks cardio={todayPlan.cardio} />
        <Text style={styles.subSectionHeadingSpaced}>Stretching</Text>
        <RoutineStretchBlocks items={todayPlan.stretching} />
      </View>

      <SectionTitle title="Workout Notes" subtitle="Quick log of how the session felt." />
      <View style={styles.card}>
        <TextInput
          value={note}
          onChangeText={onNoteChange}
          multiline
          placeholder="Example: Bench felt stable, squats need slower tempo."
          placeholderTextColor={colors.textSoft}
          style={styles.notesInput}
        />
        <Pressable style={styles.tipBanner} onPress={() => onStartRestTimer(60)}>
          <Text style={styles.tipText}>Quick start 60 sec rest timer</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.cardAlt,
    borderRadius: radii.lg,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  bannerTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  bannerText: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  timerRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  subSectionHeading: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },
  subSectionHeadingSpaced: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  notesInput: {
    minHeight: 110,
    color: colors.text,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    textAlignVertical: "top",
  },
  tipBanner: {
    marginTop: spacing.md,
    backgroundColor: colors.accentSoft,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: "center",
  },
  tipText: {
    color: colors.accent,
    fontWeight: "800",
  },
  restCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  restTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  restText: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});
