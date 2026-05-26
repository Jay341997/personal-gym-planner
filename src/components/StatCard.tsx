import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing } from "../theme/theme";

type Props = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 10,
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  helper: {
    color: colors.textSoft,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 18,
  },
});
