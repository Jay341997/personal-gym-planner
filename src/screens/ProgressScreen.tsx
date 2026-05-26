import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  strengthBars: { label: string; value: number }[];
  latestWeight: number | null;
  onAddBodyWeight: (weightKg: number) => void;
};

export function ProgressScreen({
  appData,
  streak,
  weeklyBars,
  strengthBars,
  latestWeight,
  onAddBodyWeight,
}: Props) {
  const [draftWeight, setDraftWeight] = useState("");
  const totalLogs = Object.values(appData.exerciseHistory).reduce(
    (sum, list) => sum + list.length,
    0
  );

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
        title="Strength Improvements"
        helper="Personal best weights for key beginner lifts."
        bars={strengthBars}
        suffix="kg"
      />
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
});
