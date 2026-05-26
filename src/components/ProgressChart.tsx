import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing } from "../theme/theme";

type ChartBar = {
  label: string;
  value: number;
};

type Props = {
  title: string;
  bars: ChartBar[];
  helper: string;
  suffix?: string;
};

export function ProgressChart({ title, bars, helper, suffix = "" }: Props) {
  const max = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.helper}>{helper}</Text>
      <View style={styles.chartRow}>
        {bars.map((bar) => (
          <View key={`${title}-${bar.label}`} style={styles.barWrap}>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  {
                    height: `${Math.max((bar.value / max) * 100, bar.value > 0 ? 12 : 0)}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.value}>
              {bar.value}
              {suffix}
            </Text>
            <Text style={styles.label}>{bar.label}</Text>
          </View>
        ))}
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
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  helper: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    height: 180,
  },
  barWrap: {
    flex: 1,
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
  value: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  label: {
    color: colors.textSoft,
    fontSize: 11,
    marginTop: 4,
  },
});
