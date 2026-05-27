import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing } from "../theme/theme";

const playlistLinks = [
  {
    label: "Bollywood workout mix",
    url: "https://www.youtube.com/results?search_query=bollywood+gym+workout+songs+mix",
  },
  {
    label: "English workout mix",
    url: "https://www.youtube.com/results?search_query=english+gym+workout+songs+mix",
  },
  {
    label: "Bollywood + English mixed set",
    url: "https://www.youtube.com/results?search_query=bollywood+english+workout+mashup+mix",
  },
];

function openUrl(url: string) {
  Linking.openURL(url).catch(() => {
    console.warn("Could not open music link");
  });
}

export function WorkoutMusicCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Workout Music</Text>
      <Text style={styles.subtitle}>Pick a high-energy set before training.</Text>
      {playlistLinks.map((link) => (
        <Pressable key={link.label} style={styles.linkButton} onPress={() => openUrl(link.url)}>
          <Text style={styles.linkText}>{link.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  linkButton: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.pill,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    alignSelf: "flex-start",
  },
  linkText: {
    color: colors.accent,
    fontWeight: "800",
    fontSize: 13,
  },
});
