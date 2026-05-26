import { WorkoutDayPlan } from "../types";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDayName(date: Date): string {
  return dayNames[date.getDay()];
}

export function getTodayPlan(workoutPlan: WorkoutDayPlan[], date = new Date()): WorkoutDayPlan {
  return (
    workoutPlan.find((plan) => plan.day === getDayName(date)) ?? workoutPlan[0]
  );
}

export function getRecentDateKeys(days: number): string[] {
  const result: string[] = [];
  const now = new Date();

  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - index);
    result.push(formatDateKey(date));
  }

  return result;
}

export function getLabelFromDateKey(dateKey: string): string {
  const date = new Date(`${dateKey}T00:00:00`);
  return dayNames[date.getDay()].slice(0, 3);
}
