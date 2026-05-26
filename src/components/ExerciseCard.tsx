import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ExerciseVariant } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import { formatKgLabel } from "../utils/exerciseTargets";

type Props = {
  activeExercise: ExerciseVariant;
  variantOptions: ExerciseVariant[];
  onSelectVariant: (variantId: string) => void;
  weightKg: number;
  personalBestKg: number | null;
  idealTargetKg: number;
  completed: boolean;
  onOpenDetail: () => void;
  onToggleComplete: () => void;
  onAdjustWeight: (delta: number) => void;
  onSetWeight: (value: number) => void;
  onStartRest: (seconds: number) => void;
};

export function ExerciseCard({
  activeExercise,
  variantOptions,
  onSelectVariant,
  weightKg,
  personalBestKg,
  idealTargetKg,
  completed,
  onOpenDetail,
  onToggleComplete,
  onAdjustWeight,
  onSetWeight,
  onStartRest,
}: Props) {
  const [draftWeight, setDraftWeight] = useState(weightKg.toString());

  useEffect(() => {
    setDraftWeight(weightKg.toString());
  }, [weightKg]);

  return (
    <View style={[styles.card, completed && styles.completedCard]}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{activeExercise.name}</Text>
          <Text style={styles.meta}>
            {activeExercise.sets} sets x {activeExercise.reps} reps
          </Text>
        </View>
        <Pressable style={styles.detailButton} onPress={onOpenDetail}>
          <Text style={styles.detailButtonText}>Detail</Text>
        </Pressable>
      </View>

      <Text style={styles.helper}>Beginner weight: {activeExercise.beginnerWeight}</Text>
      <Text style={styles.helper}>Rest: {activeExercise.restSeconds} sec</Text>

      {variantOptions.length > 1 ? (
        <View style={styles.variantBlock}>
          <Text style={styles.variantLabel}>Exercise option</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.variantChips}
          >
            {variantOptions.map((opt) => {
              const selected = opt.id === activeExercise.id;
              return (
                <Pressable
                  key={opt.id}
                  style={[styles.chip, selected && styles.chipActive]}
                  onPress={() => onSelectVariant(opt.id)}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextActive]} numberOfLines={2}>
                    {opt.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      <View style={styles.targetsRow}>
        <View style={styles.targetCell}>
          <Text style={styles.targetLabel}>Best so far</Text>
          <Text style={styles.targetValue}>
            {personalBestKg != null ? formatKgLabel(personalBestKg) : "—"}
          </Text>
          {personalBestKg == null ? (
            <Text style={styles.targetHint}>Logs when you mark done</Text>
          ) : null}
        </View>
        <View style={styles.targetCell}>
          <Text style={styles.targetLabel}>Ideal to aim for</Text>
          <Text style={styles.targetValue}>{formatKgLabel(idealTargetKg)}</Text>
          <Text style={styles.targetHint}>Creeps up as you log workouts</Text>
        </View>
      </View>

      <Text style={styles.instructions}>{activeExercise.instructions}</Text>

      <View style={styles.weightRow}>
        <Pressable style={styles.miniButton} onPress={() => onAdjustWeight(-2.5)}>
          <Text style={styles.miniText}>-</Text>
        </Pressable>
        <TextInput
          value={draftWeight}
          onChangeText={setDraftWeight}
          onEndEditing={() => onSetWeight(Number(draftWeight) || 0)}
          keyboardType="numeric"
          style={styles.weightInput}
        />
        <Text style={styles.kgLabel}>kg</Text>
        <Pressable style={styles.miniButton} onPress={() => onAdjustWeight(2.5)}>
          <Text style={styles.miniText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.secondaryButton} onPress={() => onStartRest(activeExercise.restSeconds)}>
          <Text style={styles.secondaryText}>Rest Timer</Text>
        </Pressable>
        <Pressable
          style={[styles.primaryButton, completed && styles.primaryDone]}
          onPress={onToggleComplete}
        >
          <Text style={styles.primaryText}>{completed ? "Completed" : "Mark Done"}</Text>
        </Pressable>
      </View>
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
    marginBottom: spacing.md,
  },
  completedCard: {
    borderColor: colors.success,
    backgroundColor: "#0d2330",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  meta: {
    color: colors.accent,
    fontSize: 13,
    marginTop: 6,
    fontWeight: "700",
  },
  detailButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailButtonText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 12,
  },
  helper: {
    color: colors.textMuted,
    marginTop: 8,
    fontSize: 13,
  },
  instructions: {
    color: colors.text,
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 20,
  },
  targetsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  targetCell: {
    flex: 1,
    backgroundColor: colors.cardAlt,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  targetLabel: {
    color: colors.textSoft,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  targetValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 6,
  },
  targetHint: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 6,
    lineHeight: 15,
  },
  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  miniText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  weightInput: {
    width: 70,
    marginHorizontal: spacing.sm,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundElevated,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: colors.text,
    textAlign: "center",
    fontWeight: "700",
  },
  kgLabel: {
    color: colors.textMuted,
    fontSize: 14,
    marginRight: spacing.sm,
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 14,
  },
  primaryDone: {
    backgroundColor: colors.success,
  },
  primaryText: {
    color: colors.background,
    fontWeight: "800",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.text,
    fontWeight: "700",
  },
  variantBlock: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  variantLabel: {
    color: colors.textSoft,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  variantChips: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingVertical: 4,
  },
  chip: {
    maxWidth: 160,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardAlt,
  },
  chipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  chipTextActive: {
    color: colors.accent,
  },
});
