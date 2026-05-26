import { Pressable, StyleSheet, Text, View } from "react-native";
import { DietPlan } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionTitle } from "../components/SectionTitle";

type Props = {
  dietPlans: DietPlan[];
  activeDietId: string;
  onSelectDiet: (dietId: string) => void;
};

export function DietScreen({ dietPlans, activeDietId, onSelectDiet }: Props) {
  const activePlan = dietPlans.find((plan) => plan.id === activeDietId) ?? dietPlans[0];

  return (
    <ScreenContainer>
      <SectionTitle
        title="Diet Plan"
        subtitle="Simple Indian meals for fat loss or lean muscle gain."
      />

      <View style={styles.toggleRow}>
        {dietPlans.map((plan) => {
          const active = plan.id === activePlan.id;
          return (
            <Pressable
              key={plan.id}
              style={[styles.toggle, active && styles.toggleActive]}
              onPress={() => onSelectDiet(plan.id)}
            >
              <Text style={[styles.toggleTitle, active && styles.toggleTitleActive]}>
                {plan.title}
              </Text>
              <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{plan.goal}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{activePlan.title}</Text>
        <Text style={styles.summaryText}>{activePlan.goal}</Text>
        <Text style={styles.summaryHint}>{activePlan.caloriesHint}</Text>
      </View>

      {activePlan.meals.map((meal) => (
        <View key={meal.label} style={styles.mealCard}>
          <Text style={styles.mealLabel}>{meal.label}</Text>
          <Text style={styles.mealText}>{meal.meal}</Text>
          <Text style={styles.mealHint}>{meal.proteinFocus}</Text>
        </View>
      ))}

      <SectionTitle title="Easy Rules" />
      <View style={styles.rulesCard}>
        <Text style={styles.rule}>- Keep protein in every meal.</Text>
        <Text style={styles.rule}>- Use curd, eggs, paneer, chicken, dal, tofu, or whey daily.</Text>
        <Text style={styles.rule}>- Repeat simple meals instead of chasing perfect variety.</Text>
        <Text style={styles.rule}>- Prepare lunch and post-workout foods ahead when possible.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  toggle: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  toggleActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  toggleTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  toggleTitleActive: {
    color: colors.background,
  },
  toggleText: {
    color: colors.textMuted,
    marginTop: 6,
    lineHeight: 20,
  },
  toggleTextActive: {
    color: colors.background,
  },
  summaryCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  summaryText: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  summaryHint: {
    color: colors.warning,
    marginTop: spacing.sm,
    fontWeight: "700",
    lineHeight: 20,
  },
  mealCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  mealLabel: {
    color: colors.accent,
    fontWeight: "800",
    fontSize: 13,
    textTransform: "uppercase",
  },
  mealText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  mealHint: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  rulesCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  rule: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: 4,
  },
});
