import { Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ExerciseVariant } from "../types";
import { colors, radii, spacing } from "../theme/theme";

type Props = {
  exercise: ExerciseVariant | null;
  visible: boolean;
  onClose: () => void;
};

export function ExerciseDetailModal({ exercise, visible, onClose }: Props) {
  if (!exercise) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>

          <Text style={styles.name}>{exercise.name}</Text>
          <Text style={styles.target}>{exercise.targetMuscle}</Text>
          <Text style={styles.helper}>Suggested start: {exercise.beginnerWeight}</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Correct Form</Text>
            {exercise.correctForm.map((tip) => (
              <Text key={tip} style={styles.listText}>
                - {tip}
              </Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Common Mistakes</Text>
            {exercise.commonMistakes.map((tip) => (
              <Text key={tip} style={styles.listText}>
                - {tip}
              </Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Beginner Tips</Text>
            {exercise.beginnerTips.map((tip) => (
              <Text key={tip} style={styles.listText}>
                - {tip}
              </Text>
            ))}
          </View>

          <Pressable style={styles.demoButton} onPress={() => Linking.openURL(exercise.demoUrl)}>
            <Text style={styles.demoButtonText}>Open Video Demo Link</Text>
          </Pressable>
          <Text style={styles.demoHint}>
            This starter app uses a lightweight demo link instead of a heavy embedded player.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 260,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: spacing.md,
    marginRight: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  closeText: {
    color: colors.text,
    fontWeight: "700",
  },
  name: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  target: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  helper: {
    color: colors.warning,
    fontWeight: "700",
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  listText: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: 4,
  },
  demoButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingVertical: 16,
    alignItems: "center",
  },
  demoButtonText: {
    color: colors.background,
    fontWeight: "800",
  },
  demoHint: {
    color: colors.textSoft,
    lineHeight: 20,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
});
