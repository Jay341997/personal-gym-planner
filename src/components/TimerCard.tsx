import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing } from "../theme/theme";

type Props = {
  label: string;
  seconds: number;
  running: boolean;
  onStartPause: () => void;
  onReset: () => void;
  accent?: "blue" | "green";
};

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export function TimerCard({
  label,
  seconds,
  running,
  onStartPause,
  onReset,
  accent = "blue",
}: Props) {
  return (
    <View
      style={[
        styles.card,
        accent === "green" ? styles.cardGreen : styles.cardBlue,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{formatSeconds(seconds)}</Text>
      <View style={styles.row}>
        <Pressable style={styles.primaryButton} onPress={onStartPause}>
          <Text style={styles.primaryText}>{running ? "Pause" : "Start"}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onReset}>
          <Text style={styles.secondaryText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
  },
  cardBlue: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  cardGreen: {
    backgroundColor: "#0d2430",
    borderColor: "#1b5b73",
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
  },
  value: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  primaryText: {
    color: colors.background,
    fontWeight: "700",
  },
  secondaryText: {
    color: colors.text,
    fontWeight: "700",
  },
});
