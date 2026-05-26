export type TabKey =
  | "home"
  | "plan"
  | "today"
  | "diet"
  | "progress"
  | "tools";

export type ExerciseVariant = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  beginnerWeight: string;
  defaultWeightKg: number;
  restSeconds: number;
  instructions: string;
  targetMuscle: string;
  correctForm: string[];
  commonMistakes: string[];
  beginnerTips: string[];
  demoUrl: string;
  imageUrl: string;
};

/** Primary plan exercise; optional swap-ins for Today tab */
export type Exercise = ExerciseVariant & {
  alternatives?: ExerciseVariant[];
};

export type RoutineDetailItem = {
  label: string;
  steps: string[];
  tip?: string;
  imageUrl?: string;
  videoUrl?: string;
};

/** Cardio block: short headline plus how to perform at easy effort */
export type RoutineCardioDetail = {
  summary: string;
  steps: string[];
  tip?: string;
  imageUrl?: string;
  videoUrl?: string;
};

export type WorkoutDayPlan = {
  day: string;
  focus: string;
  warmup: RoutineDetailItem[];
  stretching: RoutineDetailItem[];
  cardio: RoutineCardioDetail;
  exercises: Exercise[];
};

export type DietMeal = {
  label: string;
  meal: string;
  proteinFocus: string;
};

export type DietPlan = {
  id: string;
  title: string;
  goal: string;
  caloriesHint: string;
  meals: DietMeal[];
};

export type BodyWeightEntry = {
  date: string;
  weightKg: number;
};

export type StrengthEntry = {
  date: string;
  weightKg: number;
};

export type AppData = {
  exerciseWeights: Record<string, number>;
  completedExercises: Record<string, boolean>;
  workoutNotes: Record<string, string>;
  waterMlByDate: Record<string, number>;
  bodyWeightEntries: BodyWeightEntry[];
  exerciseHistory: Record<string, StrengthEntry[]>;
  heightCm: number;
  /** Maps primary exercise id → chosen variant id for Today (defaults to primary). */
  slotExerciseChoice: Record<string, string>;
};
