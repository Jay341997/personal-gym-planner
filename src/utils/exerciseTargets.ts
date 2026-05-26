import { ExerciseVariant, StrengthEntry } from "../types";

/** Round to typical gym plate steps (2.5 kg). */
export function roundPlateKg(kg: number): number {
  if (!Number.isFinite(kg) || kg <= 0) return 0;
  return Math.round(kg / 2.5) * 2.5;
}

export function getExercisePersonalBestKg(history: StrengthEntry[] | undefined): number | null {
  const entries = history ?? [];
  if (entries.length === 0) return null;
  return Math.max(...entries.map((entry) => entry.weightKg));
}

/**
 * Gentle “next target” for beginners: starts at the plan default, then nudges up
 * as you log completed sessions, and stays within a small step above your actual PB.
 */
export function getIdealTargetKg(exercise: ExerciseVariant, history: StrengthEntry[] | undefined): number {
  const entries = history ?? [];
  const defaultKg = exercise.defaultWeightKg;
  const pb = getExercisePersonalBestKg(entries);
  const completions = entries.length;

  const experienceBump = Math.min(Math.floor(completions / 4) * 2.5, 15);
  const fromDefault = roundPlateKg(defaultKg + experienceBump);

  if (pb == null || pb <= 0) {
    return Math.max(roundPlateKg(defaultKg), fromDefault);
  }

  const fromPersonalBest = roundPlateKg(pb + 2.5);
  const ceiling = roundPlateKg(pb + 5);

  const merged = Math.max(fromDefault, fromPersonalBest);
  return Math.min(merged, ceiling);
}

export function formatKgLabel(kg: number): string {
  if (!Number.isFinite(kg)) return "—";
  return Number.isInteger(kg) ? `${kg} kg` : `${kg} kg`;
}
