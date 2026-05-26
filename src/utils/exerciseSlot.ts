import type { Exercise, ExerciseVariant } from "../types";

export function resolveExerciseSlot(
  primary: Exercise,
  slotChoice: Record<string, string> | undefined
): ExerciseVariant {
  const chosenId = slotChoice?.[primary.id];
  const pool: ExerciseVariant[] = [primary, ...(primary.alternatives ?? [])];
  const match = pool.find((e) => e.id === chosenId);
  return match ?? primary;
}

export function slotExerciseOptions(primary: Exercise): ExerciseVariant[] {
  return [primary, ...(primary.alternatives ?? [])];
}
