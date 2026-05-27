import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radii, spacing } from "../theme/theme";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { getHealthyWeightRangeKg, getIdealWeightKg } from "../utils/bmi";

type Props = {
  waterMl: number;
  bmi: number;
  bmiCategory: string;
  heightCm: number;
  latestWeight: number | null;
  quote: string;
  onAddWater: (ml: number) => void;
  onResetWater: () => void;
  onUpdateHeight: (heightCm: number) => void;
};

export function ToolsScreen({
  waterMl,
  bmi,
  bmiCategory,
  heightCm,
  latestWeight,
  quote,
  onAddWater,
  onResetWater,
  onUpdateHeight,
}: Props) {
  const [heightDraft, setHeightDraft] = useState(heightCm.toString());
  const idealWeight = getIdealWeightKg(heightCm);
  const healthyRange = getHealthyWeightRangeKg(heightCm);

  useEffect(() => {
    setHeightDraft(heightCm.toString());
  }, [heightCm]);

  return (
    <ScreenContainer>
      <SectionTitle title="Daily Tools" subtitle="Quick helpers that keep the app useful every day." />

      <View style={styles.statsRow}>
        <StatCard
          label="Water today"
          value={`${waterMl / 1000} L`}
          helper="A simple hydration target is 2.5 to 3.5 liters."
        />
        <StatCard
          label="BMI"
          value={bmi ? bmi.toFixed(1) : "--"}
          helper={bmiCategory}
        />
      </View>
      <View style={styles.statsRow}>
        <StatCard
          label="Ideal weight"
          value={idealWeight ? `${idealWeight.toFixed(1)} kg` : "--"}
          helper={
            idealWeight
              ? `Healthy range: ${healthyRange.minKg.toFixed(1)}-${healthyRange.maxKg.toFixed(1)} kg`
              : "Add your height to calculate ideal range."
          }
        />
        <StatCard
          label="Height"
          value={heightCm ? `${heightCm} cm` : "--"}
          helper="Used for BMI and ideal-weight estimate."
        />
      </View>

      <SectionTitle title="Water Tracker" />
      <View style={styles.card}>
        <View style={styles.buttonRow}>
          <Pressable style={styles.waterButton} onPress={() => onAddWater(250)}>
            <Text style={styles.waterButtonText}>+250 ml</Text>
          </Pressable>
          <Pressable style={styles.waterButton} onPress={() => onAddWater(500)}>
            <Text style={styles.waterButtonText}>+500 ml</Text>
          </Pressable>
        </View>
        <Pressable style={styles.resetButton} onPress={onResetWater}>
          <Text style={styles.resetButtonText}>Reset Water</Text>
        </Pressable>
      </View>

      <SectionTitle title="BMI Calculator" subtitle="Uses your latest saved body weight and stored height." />
      <View style={styles.card}>
        <Text style={styles.metricLabel}>Latest body weight</Text>
        <Text style={styles.metricValue}>{latestWeight ? `${latestWeight} kg` : "Add a check-in on Progress screen"}</Text>
        <Text style={[styles.metricLabel, styles.spaced]}>Height in cm</Text>
        <TextInput
          value={heightDraft}
          onChangeText={setHeightDraft}
          keyboardType="numeric"
          onEndEditing={() => onUpdateHeight(Number(heightDraft) || 0)}
          style={styles.input}
        />
        <Text style={styles.metricHint}>Update height once, then the BMI card stays ready.</Text>
      </View>

      <SectionTitle title="Daily Quote" />
      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>{quote}</Text>
      </View>

      <SectionTitle title="Quick Beginner Tips" />
      <View style={styles.card}>
        <Text style={styles.tip}>- Start with 2 or 3 clean sets before chasing more weight.</Text>
        <Text style={styles.tip}>- Stop every set with 1 to 2 good reps still left.</Text>
        <Text style={styles.tip}>- Use the same simple meals for a week before changing them.</Text>
        <Text style={styles.tip}>- Track small wins: one more rep, better form, steadier energy.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  waterButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: "center",
  },
  waterButtonText: {
    color: colors.background,
    fontWeight: "800",
  },
  resetButton: {
    marginTop: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    alignItems: "center",
  },
  resetButtonText: {
    color: colors.text,
    fontWeight: "700",
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  metricValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  spaced: {
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    color: colors.text,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  metricHint: {
    color: colors.textSoft,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  quoteCard: {
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  quoteText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "600",
  },
  tip: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: 4,
  },
});
