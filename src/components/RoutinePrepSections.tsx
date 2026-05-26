import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { RoutineCardioDetail, RoutineDetailItem } from "../types";
import { colors, radii, spacing } from "../theme/theme";

function openUrl(url: string) {
  Linking.openURL(url).catch(() => {
    console.warn("Could not open link");
  });
}

function RoutineMediaRow({ imageUrl, videoUrl }: { imageUrl?: string; videoUrl?: string }) {
  if (!imageUrl && !videoUrl) return null;

  return (
    <View style={styles.mediaRow}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.previewImage} resizeMode="cover" />
      ) : null}
      {videoUrl ? (
        <Pressable style={styles.videoLink} onPress={() => openUrl(videoUrl)}>
          <Text style={styles.videoLinkText}>Watch example video →</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function DetailBlock({ item }: { item: RoutineDetailItem }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{item.label}</Text>
      <RoutineMediaRow imageUrl={item.imageUrl} videoUrl={item.videoUrl} />
      {item.steps.map((step, index) => (
        <Text key={index} style={styles.stepLine}>
          {index + 1}. {step}
        </Text>
      ))}
      {item.tip ? <Text style={styles.blockTip}>{item.tip}</Text> : null}
    </View>
  );
}

function CardioBlock({ cardio }: { cardio: RoutineCardioDetail }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{cardio.summary}</Text>
      <RoutineMediaRow imageUrl={cardio.imageUrl} videoUrl={cardio.videoUrl} />
      {cardio.steps.map((step, index) => (
        <Text key={index} style={styles.stepLine}>
          {index + 1}. {step}
        </Text>
      ))}
      {cardio.tip ? <Text style={styles.blockTip}>{cardio.tip}</Text> : null}
    </View>
  );
}

/** Warm-up drills only — use after a Screen SectionTitle “Warm-up”. */
export function RoutineWarmupBlocks({ items }: { items: RoutineDetailItem[] }) {
  return (
    <>
      {items.map((item, index) => (
        <DetailBlock key={`w-${index}`} item={item} />
      ))}
    </>
  );
}

/** Cardio segment only — actual order step 2. */
export function RoutineCardioBlocks({ cardio }: { cardio: RoutineCardioDetail }) {
  return <CardioBlock cardio={cardio} />;
}

/** Stretching drills only — actual order step 3. */
export function RoutineStretchBlocks({ items }: { items: RoutineDetailItem[] }) {
  return (
    <>
      {items.map((item, index) => (
        <DetailBlock key={`s-${index}`} item={item} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  blockTitle: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  stepLine: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  blockTip: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: "700",
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  mediaRow: {
    marginBottom: spacing.md,
    borderRadius: radii.sm,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: 148,
    backgroundColor: colors.cardAlt,
    borderRadius: radii.sm,
  },
  videoLink: {
    marginTop: spacing.sm,
    alignSelf: "flex-start",
    backgroundColor: colors.accentSoft,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
  },
  videoLinkText: {
    color: colors.accent,
    fontWeight: "800",
    fontSize: 13,
  },
});
