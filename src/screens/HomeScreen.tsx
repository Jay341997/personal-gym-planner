import { Pressable, StyleSheet, Text, View } from "react-native";
import { WorkoutDayPlan } from "../types";
import { colors, radii, spacing } from "../theme/theme";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { RoutineWarmupBlocks, RoutineCardioBlocks, RoutineStretchBlocks } from "../components/RoutinePrepSections";
import { WorkoutMusicCard } from "../components/WorkoutMusicCard";

type Props = {
  todayPlan: WorkoutDayPlan;
  streak: number;
  waterMl: number;
  completedCount: number;
  quote: string;
  onGoToToday: () => void;
  onGoToDiet: () => void;
};

export function HomeScreen({
  todayPlan,
  streak,
  waterMl,
  completedCount,
  quote,
  onGoToToday,
  onGoToDiet,
}: Props) {
  return (
    <ScreenContainer>
      <Text style={styles.eyebrow}>Personal Gym Planner</Text>
      <Text style={styles.title}>Stay consistent with simple workouts and simple meals.</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroDay}>{todayPlan.day}</Text>
        <Text style={styles.heroFocus}>{todayPlan.focus}</Text>
        <Text style={styles.heroText}>
          {todayPlan.exercises.length > 0
            ? `${todayPlan.exercises.length} exercises, warm-up included, easy weight guidance built in.`
            : "Recovery day. Walk, stretch, hydrate, and come back fresh tomorrow."}
        </Text>
        <View style={styles.heroButtons}>
          <Pressable style={styles.primaryButton} onPress={onGoToToday}>
            <Text style={styles.primaryText}>Open Today</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onGoToDiet}>
            <Text style={styles.secondaryText}>Diet Plan</Text>
          </Pressable>
        </View>
      </View>

      <SectionTitle title="Daily Snapshot" subtitle="Keep the app useful in under a minute." />
      <View style={styles.statsRow}>
        <StatCard label="Workout streak" value={`${streak} days`} helper="Rest day on Sunday does not hurt the streak." />
        <StatCard label="Water today" value={`${waterMl / 1000} L`} helper="Tap into Tools to add glasses quickly." />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="Done today" value={`${completedCount}`} helper="Completed exercises from your current plan." />
        <StatCard label="Beginner rule" value="Form first" helper="If form breaks, reduce weight." />
      </View>

      <SectionTitle title="Music" subtitle="Exercise-focused mixes to start your session strong." />
      <WorkoutMusicCard />

      <SectionTitle title="Today's Flow" subtitle="Do these three blocks in order before your lifts." />

      <SectionTitle title="1 · Warm-up" subtitle="Raise your temperature and wake up shoulders, hips, and core." />
      <View style={styles.card}>
        <RoutineWarmupBlocks items={todayPlan.warmup} />
      </View>

      <SectionTitle title="2 · Light cardio" subtitle="Easy conditioning—conversation pace." />
      <View style={styles.card}>
        <RoutineCardioBlocks cardio={todayPlan.cardio} />
      </View>

      <SectionTitle title="3 · Stretching" subtitle="Slow holds—no bouncing. Then head to weights." />
      <View style={styles.card}>
        <RoutineStretchBlocks items={todayPlan.stretching} />
      </View>

      <SectionTitle title="Beginner Weight Guide" subtitle="Start lighter than your ego wants." />
      <View style={styles.card}>
        <Text style={styles.listText}>- Dumbbells: 5-7.5 kg to learn controlled reps</Text>
        <Text style={styles.listText}>- Bench press: 10-20 kg total, or empty bar first</Text>
        <Text style={styles.listText}>- Squats: bodyweight first, then add load slowly</Text>
        <Text style={styles.listText}>- Lat pulldown: 20-30 kg with chest up</Text>
        <Text style={styles.note}>If form breaks, reduce weight and rebuild the rep cleanly.</Text>
      </View>

      <SectionTitle title="Daily Motivation" />
      <View style={styles.quoteCard}>
        <Text style={styles.quoteMark}>"</Text>
        <Text style={styles.quoteText}>{quote}</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.accent,
    fontWeight: "700",
    letterSpacing: 1,
    fontSize: 12,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroDay: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
  heroFocus: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
  },
  heroText: {
    color: colors.textMuted,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  heroButtons: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
  },
  primaryText: {
    color: colors.background,
    fontWeight: "800",
  },
  secondaryText: {
    color: colors.text,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  listText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  note: {
    color: colors.warning,
    marginTop: spacing.md,
    fontWeight: "700",
  },
  quoteCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.lg,
  },
  quoteMark: {
    color: colors.accent,
    fontSize: 36,
    lineHeight: 36,
  },
  quoteText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "600",
    marginTop: 6,
  },
});
