import { AppData, Exercise, WorkoutDayPlan } from "../types";
import { formatDateKey, getDayName, getRecentDateKeys } from "./date";
import { resolveExerciseSlot } from "./exerciseSlot";

export function getCompletedCountForDay(
  appData: AppData,
  dateKey: string,
  exercises: Exercise[],
  slotChoice: Record<string, string> | undefined
): number {
  return exercises.filter((primary) => {
    const active = resolveExerciseSlot(primary, slotChoice);
    return appData.completedExercises[`${dateKey}_${active.id}`];
  }).length;
}

export function getCompletedWorkoutDates(appData: AppData): string[] {
  const dates = new Set<string>();

  Object.entries(appData.completedExercises).forEach(([key, completed]) => {
    if (!completed) return;
    dates.add(key.split("_")[0]);
  });

  return Array.from(dates).sort();
}

export function getWorkoutStreak(appData: AppData): number {
  const completedDateSet = new Set(getCompletedWorkoutDates(appData));

  if (completedDateSet.size === 0) {
    return 0;
  }

  let cursor = new Date();
  let streak = 0;
  let sawCompletedDay = false;

  for (let index = 0; index < 45; index += 1) {
    const dateKey = formatDateKey(cursor);
    const dayName = getDayName(cursor);

    if (dayName === "Sunday") {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (completedDateSet.has(dateKey)) {
      streak += 1;
      sawCompletedDay = true;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (!sawCompletedDay) {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    break;
  }

  return streak;
}

export function getWeeklyCompletionBars(appData: AppData) {
  return getRecentDateKeys(7).map((dateKey) => {
    let completed = 0;

    Object.entries(appData.completedExercises).forEach(([key, value]) => {
      if (value && key.startsWith(dateKey)) {
        completed += 1;
      }
    });

    return {
      label: new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      value: completed,
    };
  });
}

export function getStrengthSummary(appData: AppData, exerciseIds: string[]) {
  return exerciseIds.map((exerciseId) => {
    const history = appData.exerciseHistory[exerciseId] ?? [];
    const personalBest = history.reduce((best, item) => Math.max(best, item.weightKg), 0);
    const startingWeight = history[0]?.weightKg ?? 0;

    return {
      exerciseId,
      personalBest,
      improvement: Math.max(personalBest - startingWeight, 0),
    };
  });
}

export type StrengthExerciseProgress = {
  exerciseId: string;
  exerciseName: string;
  personalBest: number;
  improvement: number;
};

export type StrengthCategoryProgress = {
  category: string;
  exercises: StrengthExerciseProgress[];
};

function normalizeCategory(targetMuscle: string): string {
  const text = targetMuscle.toLowerCase();

  if (
    text.includes("quad") ||
    text.includes("hamstring") ||
    text.includes("glute") ||
    text.includes("leg")
  ) {
    return "Legs";
  }
  if (text.includes("chest") || text.includes("pec")) {
    return "Chest";
  }
  if (text.includes("lat") || text.includes("back")) {
    return "Back";
  }
  if (text.includes("shoulder") || text.includes("delt")) {
    return "Shoulders";
  }
  if (text.includes("bicep") || text.includes("tricep") || text.includes("forearm") || text.includes("arm")) {
    return "Arms";
  }
  if (text.includes("core") || text.includes("abs")) {
    return "Core";
  }
  return "Other";
}

export function getStrengthCategoryProgress(appData: AppData, plan: WorkoutDayPlan[]): StrengthCategoryProgress[] {
  const exercisesById = new Map<string, Exercise>();
  plan.forEach((day) => {
    day.exercises.forEach((exercise) => {
      exercisesById.set(exercise.id, exercise);
      exercise.alternatives?.forEach((alt) => {
        exercisesById.set(alt.id, alt);
      });
    });
  });

  const grouped = new Map<string, StrengthExerciseProgress[]>();
  exercisesById.forEach((exercise) => {
    const history = appData.exerciseHistory[exercise.id] ?? [];
    const personalBest = history.reduce((best, item) => Math.max(best, item.weightKg), 0);
    const startingWeight = history[0]?.weightKg ?? 0;
    const category = normalizeCategory(exercise.targetMuscle);
    const list = grouped.get(category) ?? [];

    list.push({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      personalBest,
      improvement: Math.max(personalBest - startingWeight, 0),
    });
    grouped.set(category, list);
  });

  return Array.from(grouped.entries())
    .map(([category, exercises]) => ({
      category,
      exercises: exercises.sort((left, right) => right.improvement - left.improvement || left.exerciseName.localeCompare(right.exerciseName)),
    }))
    .sort((left, right) => left.category.localeCompare(right.category));
}
