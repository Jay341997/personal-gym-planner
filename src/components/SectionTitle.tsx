import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme/theme";

type Props = {
  title: string;
  subtitle?: string;
  rightLabel?: string;
};

export function SectionTitle({ title, subtitle, rightLabel }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightLabel ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: spacing.sm,
  },
  left: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  rightLabel: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "700",
  },
});
