import type { BodyWeightEntry } from "../types";
import { calculateBmi, getHealthyWeightRangeKg, getIdealWeightKg } from "./bmi";

/** 3-month plan = 12 weekly steps from start to goal. */
export const WEIGHT_PLAN_WEEKS = 12;

export type WeeklyTargetPoint = {
  weekIndex: number;
  label: string;
  targetKg: number;
};

/** Single check-in to show on the plan (latest log in that plan week). */
export type WeekActual = {
  weekIndex: number;
  actualKg: number;
  dateKey: string;
};

function diffCalendarDays(fromKey: string, toKey: string): number {
  const from = new Date(`${fromKey}T12:00:00`).getTime();
  const to = new Date(`${toKey}T12:00:00`).getTime();
  return Math.floor((to - from) / 86_400_000);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Goal weight toward a healthy BMI band: ideal ~22 when change is needed,
 * otherwise stay near current weight.
 */
export function getPlanTargetKg(heightCm: number, currentKg: number): number {
  if (!heightCm || !currentKg) return 0;
  const ideal = getIdealWeightKg(heightCm, 22);
  const { minKg, maxKg } = getHealthyWeightRangeKg(heightCm);
  const bmi = calculateBmi(currentKg, heightCm);

  if (bmi >= 25) {
    return clamp(ideal, minKg, maxKg);
  }
  if (bmi < 18.5) {
    return clamp(ideal, minKg, maxKg);
  }
  // Already in healthy range: maintain current (optionally nudge toward ideal if far)
  const nearIdeal = Math.abs(currentKg - ideal) < 1.5;
  return nearIdeal ? currentKg : clamp(ideal, minKg, maxKg);
}

/** Linear path from start → target over `weeks` steps (inclusive: 0 … weeks). */
export function buildWeeklyTargetPath(
  startKg: number,
  targetKg: number,
  weeks: number = WEIGHT_PLAN_WEEKS
): WeeklyTargetPoint[] {
  const out: WeeklyTargetPoint[] = [];
  const safeWeeks = Math.max(weeks, 1);

  for (let w = 0; w <= safeWeeks; w += 1) {
    const t = w / safeWeeks;
    const kg = startKg + (targetKg - startKg) * t;
    const label = w === 0 ? "Now" : w === safeWeeks ? "Goal" : `W${w}`;

    out.push({
      weekIndex: w,
      label,
      targetKg: Math.round(kg * 10) / 10,
    });
  }

  return out;
}

/** Map logs to plan week buckets (0…maxWeek); keeps latest weight per bucket. */
export function mapWeightLogsToPlanWeeks(
  entries: BodyWeightEntry[],
  planStartDateKey: string,
  maxWeeks: number = WEIGHT_PLAN_WEEKS
): Map<number, BodyWeightEntry> {
  const byWeek = new Map<number, BodyWeightEntry>();

  entries.forEach((entry) => {
    const days = diffCalendarDays(planStartDateKey, entry.date);
    const week = clamp(Math.max(0, Math.floor(days / 7)), 0, maxWeeks);
    const prev = byWeek.get(week);
    if (!prev || entry.date > prev.date) {
      byWeek.set(week, entry);
    }
  });

  return byWeek;
}

export function weeklyChangeHint(startKg: number, targetKg: number, weeks: number = WEIGHT_PLAN_WEEKS): number {
  if (!weeks) return 0;
  return Math.round(((targetKg - startKg) / weeks) * 10) / 10;
}
