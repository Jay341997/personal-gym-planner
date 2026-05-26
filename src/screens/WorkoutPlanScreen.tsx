import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { WorkoutDayPlan } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionTitle } from "../components/SectionTitle";

type Props = {
  plans: WorkoutDayPlan[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
  onOpenExercise: (exerciseId: string) => void;
};

export function WorkoutPlanScreen({
  plans,
  selectedDay,
  onSelectDay,
  onOpenExercise,
}: Props) {
  const activePlan = plans.find((plan) => plan.day === selectedDay) ?? plans[0];

  return (
    <ScreenContainer>
      <SectionTitle
        title="Weekly Gym Plan"
        subtitle="6 workout days, 2 muscle groups daily, Sunday for recovery."
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayRow}
      >
        {plans.map((plan) => {
          const active = plan.day === activePlan.day;
          return (
            <Pressable
              key={plan.day}
              style={[styles.dayPill, active && styles.dayPillActive]}
              onPress={() => onSelectDay(plan.day)}
            >
              <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{plan.day}</Text>
              <Text style={[styles.dayFocus, active && styles.dayFocusActive]}>{plan.focus}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{activePlan.day}</Text>
        <Text style={styles.summaryFocus}>{activePlan.focus}</Text>
        <Text style={styles.summaryText}>
          Warm-up, exercise detail, beginner weight guidance, and recovery reminders are included.
        </Text>
      </View>

      <SectionTitle title="Exercises" rightLabel={`${activePlan.exercises.length} moves`} />
      {activePlan.exercises.length === 0 ? (
        <View style={styles.restCard}>
          <Text style={styles.restTitle}>Recovery Day</Text>
          <Text style={styles.restText}>
            Go for a light walk, stretch, hydrate well, and let your muscles recover.
          </Text>
        </View>
      ) : (
        activePlan.exercises.map((exercise) => (
          <Pressable
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => onOpenExercise(exercise.id)}
          >
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseText}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseMeta}>
                  {exercise.sets} sets x {exercise.reps}
                </Text>
              </View>
              <Text style={styles.exerciseWeight}>{exercise.beginnerWeight}</Text>
            </View>
            <Text style={styles.exerciseHint}>{exercise.instructions}</Text>
            <Text style={styles.exerciseLink}>Tap for form tips and demo link</Text>
          </Pressable>
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  dayRow: {
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  dayPill: {
    width: 160,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  dayPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  dayLabel: {
    color: colors.text,
    fontWeight: "700",
  },
  dayLabelActive: {
    color: colors.background,
  },
  dayFocus: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  dayFocusActive: {
    color: colors.background,
  },
  summaryCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginVertical: spacing.lg,
  },
  summaryTitle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
  summaryFocus: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
  },
  summaryText: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 21,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  exerciseText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  exerciseName: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 17,
  },
  exerciseMeta: {
    color: colors.accent,
    marginTop: 6,
    fontWeight: "700",
    fontSize: 13,
  },
  exerciseWeight: {
    color: colors.warning,
    fontWeight: "700",
    fontSize: 13,
  },
  exerciseHint: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  exerciseLink: {
    color: colors.accent,
    marginTop: spacing.sm,
    fontWeight: "700",
  },
  restCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.lg,
  },
  restTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  restText: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});
