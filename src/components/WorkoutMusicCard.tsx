import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing } from "../theme/theme";

type PlatformLink = {
  platform: "YouTube" | "Spotify" | "YouTube Music";
  appUrl: string;
  webUrl: string;
};

type MixLink = {
  title: string;
  platforms: PlatformLink[];
};

const workoutMixLinks: MixLink[] = [
  {
    title: "Bollywood workout mix",
    platforms: [
      {
        platform: "YouTube",
        appUrl: "vnd.youtube://results?search_query=bollywood+gym+workout+songs+mix",
        webUrl: "https://www.youtube.com/results?search_query=bollywood+gym+workout+songs+mix",
      },
      {
        platform: "Spotify",
        appUrl: "spotify:search:bollywood%20gym%20workout%20mix",
        webUrl: "https://open.spotify.com/search/bollywood%20gym%20workout%20mix",
      },
      {
        platform: "YouTube Music",
        appUrl: "https://music.youtube.com/search?q=bollywood+gym+workout+songs+mix",
        webUrl: "https://music.youtube.com/search?q=bollywood+gym+workout+songs+mix",
      },
    ],
  },
  {
    title: "English workout mix",
    platforms: [
      {
        platform: "YouTube",
        appUrl: "vnd.youtube://results?search_query=english+gym+workout+songs+mix",
        webUrl: "https://www.youtube.com/results?search_query=english+gym+workout+songs+mix",
      },
      {
        platform: "Spotify",
        appUrl: "spotify:search:english%20gym%20workout%20mix",
        webUrl: "https://open.spotify.com/search/english%20gym%20workout%20mix",
      },
      {
        platform: "YouTube Music",
        appUrl: "https://music.youtube.com/search?q=english+gym+workout+songs+mix",
        webUrl: "https://music.youtube.com/search?q=english+gym+workout+songs+mix",
      },
    ],
  },
  {
    title: "Bollywood + English mixed set",
    platforms: [
      {
        platform: "YouTube",
        appUrl: "vnd.youtube://results?search_query=bollywood+english+workout+mashup+mix",
        webUrl: "https://www.youtube.com/results?search_query=bollywood+english+workout+mashup+mix",
      },
      {
        platform: "Spotify",
        appUrl: "spotify:search:bollywood%20english%20workout%20mix",
        webUrl: "https://open.spotify.com/search/bollywood%20english%20workout%20mix",
      },
      {
        platform: "YouTube Music",
        appUrl: "https://music.youtube.com/search?q=bollywood+english+workout+mashup+mix",
        webUrl: "https://music.youtube.com/search?q=bollywood+english+workout+mashup+mix",
      },
    ],
  },
];

async function openPlatformLink(link: PlatformLink) {
  try {
    const canOpenApp = await Linking.canOpenURL(link.appUrl);
    if (canOpenApp) {
      await Linking.openURL(link.appUrl);
      return;
    }
    await Linking.openURL(link.webUrl);
  } catch {
    console.warn("Could not open music link");
  }
}

export function WorkoutMusicCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Workout Music</Text>
      <Text style={styles.subtitle}>Pick your mix, then open it in YouTube, Spotify, or YouTube Music.</Text>
      {workoutMixLinks.map((mix) => (
        <View key={mix.title} style={styles.mixBlock}>
          <Text style={styles.mixTitle}>{mix.title}</Text>
          <View style={styles.platformRow}>
            {mix.platforms.map((link) => (
              <Pressable key={`${mix.title}-${link.platform}`} style={styles.linkButton} onPress={() => openPlatformLink(link)}>
                <Text style={styles.linkText}>{link.platform}</Text>
              </Pressable>
            ))}
          </View>
        </View>
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
  mixBlock: {
    marginBottom: spacing.md,
  },
  mixTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  platformRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  linkButton: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.pill,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  linkText: {
    color: colors.accent,
    fontWeight: "800",
    fontSize: 13,
  },
});
