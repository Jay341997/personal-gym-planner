import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors, spacing } from "../theme/theme";

export function ScreenContainer({ children }: PropsWithChildren) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 120,
  },
});
