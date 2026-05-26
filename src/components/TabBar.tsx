import { Pressable, StyleSheet, Text, View } from "react-native";
import { TabKey } from "../types";
import { colors, radii, spacing } from "../theme/theme";

type Props = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "plan", label: "Plan" },
  { key: "today", label: "Today" },
  { key: "diet", label: "Diet" },
  { key: "progress", label: "Progress" },
  { key: "tools", label: "Tools" },
];

export function TabBar({ activeTab, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, active && styles.activeTab]}
              onPress={() => onChange(tab.key)}
            >
              <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tab: {
    minWidth: "15.5%",
    alignItems: "center",
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: colors.accent,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  activeLabel: {
    color: colors.background,
    fontWeight: "800",
  },
});
