import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { BodyWeightEntry } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import {
  WEIGHT_PLAN_WEEKS,
  buildWeeklyTargetPath,
  getPlanTargetKg,
  mapWeightLogsToPlanWeeks,
  weeklyChangeHint,
} from "../utils/weightGoal";

type Props = {
  heightCm: number;
  bodyWeightEntries: BodyWeightEntry[];
  latestWeight: number | null;
  planStartDateKey: string;
};

export function BodyWeightGoalChart({
  heightCm,
  bodyWeightEntries,
  latestWeight,
  planStartDateKey,
}: Props) {
  if (!heightCm) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Body weight & 12-week goal</Text>
        <Text style={styles.helper}>Set your height in Tools to see a healthy-range target path.</Text>
      </View>
    );
  }

  if (latestWeight == null || latestWeight <= 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Body weight & 12-week goal</Text>
        <Text style={styles.helper}>Log your weight above to see weekly targets toward a healthy range.</Text>
      </View>
    );
  }

  let targetKg = getPlanTargetKg(heightCm, latestWeight);
  const startKg = latestWeight;
  if (Math.abs(targetKg - startKg) < 0.3) {
    targetKg = startKg;
  }

  const weeklySeries = buildWeeklyTargetPath(startKg, targetKg, WEIGHT_PLAN_WEEKS);
  const byWeek = mapWeightLogsToPlanWeeks(bodyWeightEntries, planStartDateKey, WEIGHT_PLAN_WEEKS);

  const numericValues: number[] = [...weeklySeries.map((p) => p.targetKg)];
  byWeek.forEach((entry) => numericValues.push(entry.weightKg));
  const maxKg = Math.max(...numericValues, 1);
  const minKg = Math.min(...numericValues);
  const pad = Math.max((maxKg - minKg) * 0.12, 2);
  const hi = maxKg + pad;
  const lo = Math.max(0, minKg - pad);
  const span = hi - lo || 1;

  function heightPercent(kg: number): number {
    return ((kg - lo) / span) * 100;
  }

  const avgWeekly = weeklyChangeHint(startKg, targetKg, WEIGHT_PLAN_WEEKS);
  const summaryDirection =
    avgWeekly === 0
      ? "Maintain near your current weight in the healthy band."
      : avgWeekly < 0
        ? `Aim for about ${Math.abs(avgWeekly)} kg/week toward your goal (steady pace).`
        : `Aim for about ${avgWeekly} kg/week toward your goal (steady pace).`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Body weight & 12-week goal</Text>
      <Text style={styles.helper}>
        Weekly target curve to reach ~{targetKg.toFixed(1)} kg by week {WEIGHT_PLAN_WEEKS} (healthy-range goal).
        Teal bar = target; bright line = your check-in that week.
      </Text>
      <Text style={styles.summary}>{summaryDirection}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRow}>
        {weeklySeries.map((point) => {
          const pct = heightPercent(point.targetKg);
          const fillH = Math.max(pct, point.targetKg > 0 ? 8 : 0);
          const logged = byWeek.get(point.weekIndex);
          const actualKg = logged?.weightKg;
          const actualPct = actualKg != null ? heightPercent(actualKg) : null;

          return (
            <View key={point.weekIndex} style={styles.col}>
              <View style={styles.track}>
                <View style={[styles.targetFill, { height: `${fillH}%` }]} />
                {actualPct != null ? (
                  <View style={[styles.actualLine, { bottom: `${actualPct}%` }]} />
                ) : null}
              </View>
              <Text style={styles.value}>{point.targetKg}</Text>
              <Text style={styles.unit}>kg</Text>
              {actualKg != null ? (
                <Text style={styles.actualValue}>You: {actualKg}</Text>
              ) : (
                <Text style={styles.actualPlaceholder}>—</Text>
              )}
              <Text style={styles.label}>{point.label}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  helper: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 20,
  },
  summary: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: "600",
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  scrollRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: spacing.lg,
    paddingRight: spacing.sm,
    gap: spacing.sm,
    minHeight: 200,
  },
  col: {
    width: 52,
    alignItems: "center",
  },
  track: {
    width: 26,
    height: 120,
    justifyContent: "flex-end",
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.pill,
    overflow: "visible",
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
  },
  targetFill: {
    width: "100%",
    backgroundColor: colors.success,
    opacity: 0.45,
    borderRadius: radii.pill,
  },
  actualLine: {
    position: "absolute",
    left: -2,
    right: -2,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  value: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  unit: {
    color: colors.textSoft,
    fontSize: 10,
    marginTop: 0,
  },
  actualValue: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },
  actualPlaceholder: {
    color: colors.textSoft,
    fontSize: 9,
    marginTop: 2,
  },
  label: {
    color: colors.textSoft,
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
});
