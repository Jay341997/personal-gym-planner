import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppData } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { ProgressChart } from "../components/ProgressChart";

type Props = {
  appData: AppData;
  streak: number;
  weeklyBars: { label: string; value: number }[];
  strengthCategoryProgress: {
    category: string;
    exercises: {
      exerciseId: string;
      exerciseName: string;
      personalBest: number;
      improvement: number;
    }[];
  }[];
  latestWeight: number | null;
  onAddBodyWeight: (weightKg: number) => void;
};

export function ProgressScreen({
  appData,
  streak,
  weeklyBars,
  strengthCategoryProgress,
  latestWeight,
  onAddBodyWeight,
}: Props) {
  const [draftWeight, setDraftWeight] = useState("");
  const totalLogs = Object.values(appData.exerciseHistory).reduce(
    (sum, list) => sum + list.length,
    0
  );
  const bodyWeightTrendBars = [...appData.bodyWeightEntries]
    .sort((left, right) => left.date.localeCompare(right.date))
    .slice(-10)
    .map((entry) => ({
      label: new Date(`${entry.date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: entry.weightKg,
    }));

  function shortLabel(name: string) {
    return name.length > 10 ? `${name.slice(0, 10)}...` : name;
  }

  return (
    <ScreenContainer>
      <SectionTitle title="Progress Tracking" subtitle="Body weight, streaks, consistency, and strength improvements." />

      <View style={styles.statsRow}>
        <StatCard
          label="Latest body weight"
          value={latestWeight ? `${latestWeight} kg` : "--"}
          helper="Add a body-weight check-in below."
        />
        <StatCard
          label="Workout streak"
          value={`${streak} days`}
          helper="Built from completed workout days."
        />
      </View>
      <View style={styles.statsRow}>
        <StatCard
          label="Strength logs"
          value={`${totalLogs}`}
          helper="Saved when you complete an exercise."
        />
        <StatCard
          label="Weekly goal"
          value="6 sessions"
          helper="Sunday stays lighter for recovery."
        />
      </View>

      <SectionTitle title="Add Weight Check-in" subtitle="Use one morning check-in each week for cleaner trends." />
      <View style={styles.inputCard}>
        <TextInput
          value={draftWeight}
          onChangeText={setDraftWeight}
          placeholder="Enter body weight in kg"
          placeholderTextColor={colors.textSoft}
          keyboardType="numeric"
          style={styles.input}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            const value = Number(draftWeight);
            if (!value) return;
            onAddBodyWeight(value);
            setDraftWeight("");
          }}
        >
          <Text style={styles.buttonText}>Save Check-in</Text>
        </Pressable>
      </View>

      <ProgressChart
        title="Weekly Workout Progress"
        helper="Completed exercises across the last 7 days."
        bars={weeklyBars}
      />

      <View style={styles.chartSpacer} />

      <ProgressChart
        title="Body Weight Over Time"
        helper="Trend from your latest weight check-ins."
        bars={
          bodyWeightTrendBars.length > 0
            ? bodyWeightTrendBars
            : [{ label: "No logs", value: 0 }]
        }
        suffix="kg"
      />

      <View style={styles.chartSpacer} />

      <SectionTitle
        title="Strength Improvements by Category"
        subtitle="All exercises from your plan, grouped by muscle focus."
      />
      {strengthCategoryProgress.map((group) => {
        const maxPb = Math.max(...group.exercises.map((entry) => entry.personalBest), 1);
        return (
          <View key={group.category} style={styles.groupCard}>
            <Text style={styles.groupTitle}>{group.category}</Text>
            <Text style={styles.groupHelper}>
              {group.exercises.length} exercises |{" "}
              {group.exercises.filter((item) => item.personalBest > 0).length} logged
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryChartRow}
            >
              {group.exercises.map((item) => {
                const heightPercent = Math.max(
                  (item.personalBest / maxPb) * 100,
                  item.personalBest > 0 ? 12 : 0
                );

                return (
                  <View key={item.exerciseId} style={styles.barWrap}>
                    <View style={styles.track}>
                      <View style={[styles.fill, { height: `${heightPercent}%` }]} />
                    </View>
                    <Text style={styles.valueText}>{item.personalBest}kg</Text>
                    <Text style={styles.improveText}>+{item.improvement}kg</Text>
                    <Text style={styles.barLabel}>{shortLabel(item.exerciseName)}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  input: {
    color: colors.text,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 14,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "800",
  },
  chartSpacer: {
    height: spacing.xl,
  },
  groupCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  groupTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  groupHelper: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  categoryChartRow: {
    paddingTop: spacing.xs,
    paddingRight: spacing.sm,
    gap: spacing.sm,
  },
  barWrap: {
    width: 56,
    alignItems: "center",
  },
  track: {
    width: 26,
    height: 120,
    justifyContent: "flex-end",
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.pill,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  fill: {
    width: "100%",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
  },
  valueText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  improveText: {
    color: colors.textSoft,
    fontSize: 11,
    marginTop: 2,
  },
  barLabel: {
    color: colors.textSoft,
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
});
