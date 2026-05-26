import { AppData, Exercise, RoutineCardioDetail, RoutineDetailItem, WorkoutDayPlan } from "../types";
import { alternativesFor } from "./exerciseAlternatives";

const imageSet = {
  chest:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  back:
    "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=900&q=80",
  legs:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
  shoulders:
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
  arms:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  core:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
};

/** Stock photos for routine steps (warm-up / stretch / cardio previews). */
const RI = {
  treadmillWalk:
    "https://images.unsplash.com/photo-1576678929414-10a81460d974?auto=format&fit=crop&w=900&q=80",
  rowing: "https://images.unsplash.com/photo-1599588956927-973f7c4d5665?auto=format&fit=crop&w=900&q=80",
  cycling: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  briskWalk:
    "https://images.unsplash.com/photo-1476480862126-6bf458cc073c?auto=format&fit=crop&w=900&q=80",
  stairsMachine:
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80",
  elliptical:
    "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=900&q=80",
  bandUpper: imageSet.arms,
  plankMobility: imageSet.core,
  legsSquat: imageSet.legs,
  gluteBridge: imageSet.legs,
  stretchFloor:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
  breathCalm:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
};

function routineYt(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function exercise(
  id: string,
  name: string,
  sets: string,
  reps: string,
  beginnerWeight: string,
  defaultWeightKg: number,
  restSeconds: number,
  instructions: string,
  targetMuscle: string,
  correctForm: string[],
  commonMistakes: string[],
  beginnerTips: string[],
  demoUrl: string,
  imageUrl: string
): Exercise {
  return {
    id,
    name,
    sets,
    reps,
    beginnerWeight,
    defaultWeightKg,
    restSeconds,
    instructions,
    targetMuscle,
    correctForm,
    commonMistakes,
    beginnerTips,
    demoUrl,
    imageUrl,
  };
}

type RoutineExtras = { imageUrl?: string; videoUrl?: string };

function r(
  label: string,
  steps: string[],
  third?: string | RoutineExtras,
  fourth?: RoutineExtras
): RoutineDetailItem {
  let tip: string | undefined;
  let extras: RoutineExtras | undefined;
  if (typeof third === "string") {
    tip = third;
    extras = fourth;
  } else {
    extras = third;
  }
  return { label, steps, ...(tip ? { tip } : {}), ...extras };
}

function c(
  summary: string,
  steps: string[],
  third?: string | RoutineExtras,
  fourth?: RoutineExtras
): RoutineCardioDetail {
  let tip: string | undefined;
  let extras: RoutineExtras | undefined;
  if (typeof third === "string") {
    tip = third;
    extras = fourth;
  } else {
    extras = third;
  }
  return { summary, steps, ...(tip ? { tip } : {}), ...extras };
}

const RAW_WORKOUT_PLAN: WorkoutDayPlan[] = [
  {
    day: "Monday",
    focus: "Chest + Triceps",
    warmup: [
      r(
        "5 min treadmill walk",
        [
          "Set a brisk walk pace (about 5–7 km/h) or slower if joints need it.",
          "Stand tall—light grip on rails only if you need balance, not leaning your weight on them.",
          "Nose-first breathing if comfortable; heel-to-toe steps, relaxed shoulders.",
        ],
        "You should feel warmer and breathe a bit harder—not tired like a cardio max test.",
        { imageUrl: RI.treadmillWalk, videoUrl: routineYt("treadmill walking warm up proper form beginner") }
      ),
      r(
        "Band pull-aparts x 20",
        [
          "Hold band at chest height, hands shoulder-width, slight tension.",
          "Pull elbows wide until the band touches your chest or arms are in a straight line.",
          "Squeeze shoulder blades for 1 second, then return in 2 slow seconds.",
        ],
        "No band? Lace fingers, reach forward, spread shoulder blades apart in 15 slow reps.",
        {
          imageUrl: RI.bandUpper,
          videoUrl: routineYt("resistance band pull apart exercise form"),
        }
      ),
      r(
        "Arm circles x 10 each way",
        [
          "Start with small circles forward—arms straight out to shoulder height.",
          "Gradually grow the circle after 10 reps.",
          "Reverse slowly for backward circles.",
        ],
        "Keep ribs down—circles move from shoulders, not by arching your back.",
        { imageUrl: imageSet.shoulders, videoUrl: routineYt("arm circles warm up shoulder mobility") }
      ),
    ],
    stretching: [
      r(
        "Doorway chest stretch",
        [
          "Place forearm on the door frame elbow near 90°, step through gently with the same-side foot.",
          "Feel mild stretch across chest and front of shoulder—not sharp pain.",
          "Hold 30–45 seconds; breathe into the ribs. Switch sides.",
        ],
        "Stop if hand tingles—you may need a narrower arm angle.",
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("doorway chest stretch pec stretch") }
      ),
      r(
        "Overhead tricep stretch",
        [
          "Lift one arm, bend elbow so hand reaches between shoulder blades (or toward them).",
          "Use opposite hand at elbow—light pressure only, ribs stay stacked.",
          "Hold 25–35 seconds per arm; chin relaxed.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("overhead tricep stretch behind head") }
      ),
    ],
    cardio: c(
      "8 to 12 min incline walk",
      [
        "Treadmill: incline roughly 4–8% at a steady walk pace (effort ~5–6/10).",
        "Brace core lightly—think tall posture, hips under ribs.",
        "You should be able to talk in broken sentences; slow down before you pant.",
      ],
      "Bike or elliptical is fine—same duration, same conversational effort.",
      { imageUrl: RI.treadmillWalk, videoUrl: routineYt("incline treadmill walking workout beginner") }
    ),
    exercises: [
      exercise(
        "bench-press",
        "Bench Press",
        "4",
        "8-10",
        "10-20 kg total",
        15,
        90,
        "Keep feet planted and lower the bar to mid chest with control.",
        "Chest, front delts, triceps",
        [
          "Shoulders stay pulled back on the bench.",
          "Wrists stack above elbows.",
          "Press up in a straight path without bouncing the bar.",
        ],
        [
          "Flaring elbows too wide.",
          "Bouncing the bar off the chest.",
          "Lifting the hips off the bench.",
        ],
        [
          "Start with the empty bar if needed.",
          "If form breaks, reduce weight.",
          "Leave 1 to 2 reps in reserve on each set.",
        ],
        "https://www.youtube.com/results?search_query=bench+press+proper+form",
        imageSet.chest
      ),
      exercise(
        "incline-db-press",
        "Incline Dumbbell Press",
        "3",
        "10-12",
        "5-7.5 kg each",
        7.5,
        75,
        "Use a slight incline and press the dumbbells up while keeping your chest lifted.",
        "Upper chest, front delts",
        [
          "Keep shoulder blades tucked into the bench.",
          "Lower dumbbells just below chest level.",
          "Move both arms evenly.",
        ],
        [
          "Dropping elbows too low.",
          "Pressing too fast.",
          "Arching the lower back too much.",
        ],
        [
          "Use the lightest pair that feels controlled.",
          "Pause at the bottom for more stability.",
        ],
        "https://www.youtube.com/results?search_query=incline+dumbbell+press+form",
        imageSet.chest
      ),
      exercise(
        "chest-fly",
        "Dumbbell Chest Fly",
        "3",
        "12-15",
        "5 kg each",
        5,
        60,
        "Keep a soft bend in the elbow and stretch the chest without overstretching the shoulder.",
        "Chest",
        [
          "Open arms wide in a hugging motion.",
          "Keep shoulder blades down and back.",
          "Bring dumbbells together above the chest slowly.",
        ],
        [
          "Turning the move into a press.",
          "Lowering too deep into shoulder pain.",
          "Locking the elbows.",
        ],
        [
          "Use lighter weight than pressing movements.",
          "Slow reps matter more than heavy reps here.",
        ],
        "https://www.youtube.com/results?search_query=dumbbell+chest+fly+form",
        imageSet.chest
      ),
      exercise(
        "tricep-pushdown",
        "Tricep Pushdown",
        "3",
        "12-15",
        "15-20 kg",
        17.5,
        60,
        "Pin elbows to your sides and straighten the arm fully at the bottom.",
        "Triceps",
        [
          "Stand tall without leaning into the cable.",
          "Move only at the elbow.",
          "Control the return upward.",
        ],
        [
          "Swinging the torso.",
          "Letting elbows drift forward.",
          "Using the shoulders to push.",
        ],
        [
          "Lighter weight usually gives a better tricep feel.",
          "Full lockout is the goal, not momentum.",
        ],
        "https://www.youtube.com/results?search_query=tricep+pushdown+form",
        imageSet.arms
      ),
      exercise(
        "overhead-extension",
        "Overhead Dumbbell Extension",
        "3",
        "12",
        "5 kg",
        5,
        60,
        "Keep elbows close and lower the dumbbell behind the head slowly.",
        "Triceps",
        [
          "Brace the core before lifting overhead.",
          "Keep upper arms mostly still.",
          "Finish each rep with the elbows extended.",
        ],
        [
          "Flaring elbows out wide.",
          "Overarching the back.",
          "Rushing the bottom stretch.",
        ],
        [
          "Use one dumbbell with both hands if balance feels easier.",
          "Sit down if standing feels unstable.",
        ],
        "https://www.youtube.com/results?search_query=overhead+dumbbell+tricep+extension+form",
        imageSet.arms
      ),
    ],
  },
  {
    day: "Tuesday",
    focus: "Back + Biceps",
    warmup: [
      r(
        "5 min rowing machine",
        [
          "Strap snug; drive with legs first, hinge slightly, pull handle to ribs last.",
          "Smooth strokes—ratio about 1 second drive, 2 seconds glide back.",
          "Keep ribs quiet; breathe out on the pull.",
        ],
        "Concept2 display? Aim easy pace—you should finish warm, not emptied.",
        { imageUrl: RI.rowing, videoUrl: routineYt("rowing machine warm up beginner technique") }
      ),
      r(
        "Cat–cow x 10 slow",
        [
          "Hands under shoulders, knees under hips (floor) or palms on thighs (chair).",
          "Round spine up (cat), tuck chin softly; then arch gently (cow), lengthen neck.",
          "Move only spine range that feels silky—avoid sharp pinching.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("cat cow stretch yoga mobilization beginner") }
      ),
      r(
        "Scapular wall slides x 12",
        [
          "Back and head touching wall or stand tall arms at 90° like a football goalpost.",
          "Slide arms up overhead without ribs flaring forward.",
          "Return with control—the goal is shoulder blade glide, not speed.",
        ],
        "Pain above shoulder? Shorten range or skip until checked by a clinician.",
        { imageUrl: imageSet.shoulders, videoUrl: routineYt("wall slide exercise shoulder warmup") }
      ),
    ],
    stretching: [
      r(
        "Lat stretch (bench / chair)",
        [
          "Hinge at hips both hands on bench or thighs, arms reach forward long spine.",
          "Push hips gently back feeling length along ribs and outer back.",
          "Hold 25–35 seconds; inhale lengthen, exhale ease slightly deeper.",
        ],
        { imageUrl: imageSet.back, videoUrl: routineYt("lat stretch child's pose variation bench") }
      ),
      r(
        "Bicep / chest wall stretch",
        [
          "Place palm flat on wall behind you, elbow bent about 90°.",
          "Turn torso away softly until mild front-arm stretch.",
          "Hold 25–35 seconds/side.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("biceps stretch wall stretch") }
      ),
    ],
    cardio: c(
      "10 min easy cycling",
      [
        "Seated upright—minimal upper-body bounce on the pedals.",
        "Easy resistance: spin ~70–85 rpm breathing calm.",
        "Every 3 minutes add one notch if still too effortless; dial back if hips rock.",
      ],
      "Recumbent bikes are perfect here—prioritize joints over hero resistance.",
      { imageUrl: RI.cycling, videoUrl: routineYt("stationary bike warm up beginner easy pace") }
    ),
    exercises: [
      exercise(
        "lat-pulldown",
        "Lat Pulldown",
        "4",
        "10-12",
        "20-30 kg",
        25,
        75,
        "Pull the bar toward the top of the chest while keeping the chest proud.",
        "Lats, upper back, biceps",
        [
          "Start by pulling shoulders down first.",
          "Lean back only slightly.",
          "Pause briefly at the chest.",
        ],
        [
          "Pulling behind the neck.",
          "Using too much body swing.",
          "Shrugging the shoulders upward.",
        ],
        [
          "Think elbows to ribs instead of hands to chest.",
          "If form breaks, reduce weight.",
        ],
        "https://www.youtube.com/results?search_query=lat+pulldown+proper+form",
        imageSet.back
      ),
      exercise(
        "seated-row",
        "Seated Cable Row",
        "3",
        "10-12",
        "20-25 kg",
        22.5,
        75,
        "Pull the handle to your lower ribs and squeeze your shoulder blades together.",
        "Mid back, lats",
        [
          "Sit tall with a neutral spine.",
          "Lead with elbows, not wrists.",
          "Return slowly until arms are straight.",
        ],
        [
          "Rounding the back.",
          "Jerking the handle with momentum.",
          "Shortening the range of motion.",
        ],
        [
          "Use a weight that lets you feel the back doing the work.",
          "Pause at the squeeze for one second.",
        ],
        "https://www.youtube.com/results?search_query=seated+cable+row+form",
        imageSet.back
      ),
      exercise(
        "one-arm-row",
        "One-Arm Dumbbell Row",
        "3",
        "12 each side",
        "7.5 kg",
        7.5,
        60,
        "Support one hand on the bench and row the dumbbell toward the hip.",
        "Lats, upper back",
        [
          "Keep the torso flat and stable.",
          "Pull with the elbow close to the body.",
          "Lower fully each rep.",
        ],
        [
          "Twisting the torso.",
          "Shrugging the shoulder.",
          "Pulling toward the chest instead of the hip.",
        ],
        [
          "Choose control over heavy weight.",
          "Match the same reps and tempo on both sides.",
        ],
        "https://www.youtube.com/results?search_query=one+arm+dumbbell+row+form",
        imageSet.back
      ),
      exercise(
        "barbell-curl",
        "Barbell Curl",
        "3",
        "10-12",
        "10 kg",
        10,
        60,
        "Curl the bar without swinging and lower it under control.",
        "Biceps",
        [
          "Stand tall and brace your abs.",
          "Keep elbows near your ribs.",
          "Control the lowering phase.",
        ],
        [
          "Leaning back to cheat the bar up.",
          "Moving elbows forward too much.",
          "Dropping the bar quickly.",
        ],
        [
          "Use an EZ bar if straight bar wrists feel uncomfortable.",
          "Stop 1 rep before momentum takes over.",
        ],
        "https://www.youtube.com/results?search_query=barbell+curl+form",
        imageSet.arms
      ),
      exercise(
        "hammer-curl",
        "Hammer Curl",
        "3",
        "12",
        "5-7.5 kg each",
        6,
        60,
        "Keep palms facing each other and curl without rocking the shoulders.",
        "Biceps, brachialis, forearms",
        [
          "Keep wrists straight.",
          "Move slowly through the whole rep.",
          "Squeeze at the top.",
        ],
        [
          "Swinging the dumbbells.",
          "Lifting elbows away from the body.",
          "Using partial reps.",
        ],
        [
          "This is a great beginner curl because the wrist stays neutral.",
          "Light dumbbells are enough when tempo is slow.",
        ],
        "https://www.youtube.com/results?search_query=hammer+curl+form",
        imageSet.arms
      ),
    ],
  },
  {
    day: "Wednesday",
    focus: "Legs + Shoulders",
    warmup: [
      r(
        "5 min brisk walk",
        [
          "Outdoors or treadmill—fast enough to breathe a little deeper.",
          "Short quick steps beats long lazy strides.",
          "Roll ankles and shake knees gently after if they feel stiff.",
        ],
        { imageUrl: RI.briskWalk, videoUrl: routineYt("brisk walking warmup before gym beginner") }
      ),
      r(
        "Leg swings x 10/side",
        [
          "Hold wall or squat rack lightly for balance.",
          "Swing straight leg gently forward/back like a pendulum—not forcing height.",
          "Keep torso tall; ribs stay stacked.",
        ],
        { imageUrl: RI.legsSquat, videoUrl: routineYt("leg swings dynamic warmup hip mobility") }
      ),
      r(
        "Bodyweight squats x 12",
        [
          "Feet roughly shoulder-width, toes slightly turned out.",
          "Sit hips back and down; knees track over toes; chest proud.",
          "Stand by pushing evenly through heels and mid-foot—no collapsing inward.",
        ],
        "Pain in knees beyond mild burn? Reduce depth until it feels crisp.",
        { imageUrl: RI.legsSquat, videoUrl: routineYt("bodyweight squat warmup form beginner") }
      ),
    ],
    stretching: [
      r(
        "Standing quad stretch",
        [
          "Stand knee-to-knee softness; grab ankle behind you—not yanking thigh forward.",
          "Tuck glute on standing leg to deepen stretch calmly.",
          "Hold 25–35 seconds/side—switch hands on wall first if balance wobbles.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("standing quad stretch how to") }
      ),
      r(
        "Cross-body shoulder stretch",
        [
          "Guide straight arm across body with opposite forearm—not cranking elbow.",
          "Feel back of shoulder, mild—not sharp.",
          "Hold 25 seconds/side; breathe steadily.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("cross body shoulder stretch rear delt") }
      ),
    ],
    cardio: c(
      "8 min stair climber easy pace",
      [
        "Light footfalls—think quiet steps versus stomping.",
        "Hands rest lightly—standing tall ribs over hips.",
        "Keep pace where you could hum a song softly—no death climb.",
      ],
      "Step machine spikes heart rate quickly—prefer lower pace over higher.",
      { imageUrl: RI.stairsMachine, videoUrl: routineYt("stairmaster beginner easy pace technique") }
    ),
    exercises: [
      exercise(
        "squat",
        "Squat",
        "4",
        "10-12",
        "Bodyweight first",
        0,
        90,
        "Sit down between the hips, keep the chest lifted, and drive through the full foot.",
        "Quads, glutes, core",
        [
          "Brace the core before each rep.",
          "Keep knees tracking over toes.",
          "Stand up by pushing the floor away.",
        ],
        [
          "Heels lifting off the floor.",
          "Knees collapsing inward.",
          "Rushing depth without control.",
        ],
        [
          "Master bodyweight squats before loading.",
          "Use a box behind you if depth is inconsistent.",
        ],
        "https://www.youtube.com/results?search_query=squat+proper+form+beginner",
        imageSet.legs
      ),
      exercise(
        "leg-press",
        "Leg Press",
        "3",
        "12",
        "40-60 kg",
        50,
        75,
        "Place feet shoulder width apart and lower only as far as your hips stay stable.",
        "Quads, glutes",
        [
          "Keep the lower back against the pad.",
          "Press evenly through both feet.",
          "Do not lock the knees hard at the top.",
        ],
        [
          "Knees collapsing inward.",
          "Lowering too deep and rounding the pelvis.",
          "Using tiny range of motion.",
        ],
        [
          "A moderate depth is enough when learning.",
          "Use smooth reps, not fast reps.",
        ],
        "https://www.youtube.com/results?search_query=leg+press+form",
        imageSet.legs
      ),
      exercise(
        "romanian-deadlift",
        "Romanian Deadlift",
        "3",
        "10",
        "10-20 kg total",
        15,
        75,
        "Push the hips back and keep the bar close to the legs the whole time.",
        "Hamstrings, glutes, lower back",
        [
          "Maintain a long neutral spine.",
          "Soft bend in the knees.",
          "Stop when hamstrings feel stretched but back stays flat.",
        ],
        [
          "Turning it into a squat.",
          "Rounding the lower back.",
          "Letting the bar drift far from the legs.",
        ],
        [
          "Practice the hip hinge first with no weight.",
          "Film one set from the side if unsure.",
        ],
        "https://www.youtube.com/results?search_query=romanian+deadlift+form",
        imageSet.legs
      ),
      exercise(
        "shoulder-press",
        "Shoulder Press",
        "3",
        "10",
        "5-7.5 kg each",
        6,
        75,
        "Press up in a controlled line while keeping ribs tucked and glutes tight.",
        "Shoulders, triceps",
        [
          "Start with dumbbells at ear level.",
          "Keep forearms vertical.",
          "Lower back down slowly.",
        ],
        [
          "Overarching the lower back.",
          "Pressing in front of the body.",
          "Shrugging at the top.",
        ],
        [
          "Seated press is fine if balance feels hard.",
          "Use lighter weights until both arms stay even.",
        ],
        "https://www.youtube.com/results?search_query=dumbbell+shoulder+press+form",
        imageSet.shoulders
      ),
      exercise(
        "lateral-raise",
        "Lateral Raise",
        "3",
        "15",
        "3-5 kg each",
        4,
        60,
        "Lift arms out to the side with soft elbows and stop around shoulder height.",
        "Side delts",
        [
          "Lead with elbows slightly above wrists.",
          "Use slow control on the way down.",
          "Keep shoulders relaxed away from ears.",
        ],
        [
          "Swinging the torso.",
          "Lifting too high.",
          "Using dumbbells that force momentum.",
        ],
        [
          "This should burn without needing heavy weight.",
          "Think wide, not high.",
        ],
        "https://www.youtube.com/results?search_query=lateral+raise+form",
        imageSet.shoulders
      ),
    ],
  },
  {
    day: "Thursday",
    focus: "Chest + Back",
    warmup: [
      r(
        "5 min easy bike spin",
        [
          "Slight resistance—feel legs moving without rocking side to side.",
          "Maintain smooth circles; push and pull pedals evenly.",
          "Shoulders relaxed; jaw unclenched.",
        ],
        { imageUrl: RI.cycling, videoUrl: routineYt("exercise bike warm up beginner") }
      ),
      r(
        "Band rows x 15",
        [
          "Wrap band around pillar at chest height, palms neutral.",
          "Pull elbows along ribs squeezing blades like cracking a walnut.",
          "Release 2 counts—no collapsing forward.",
        ],
        "No band? Pretend elbows track back pulling imaginary strings for 15 slow reps.",
        { imageUrl: RI.bandUpper, videoUrl: routineYt("resistance band row exercise form") }
      ),
      r(
        "Push-up plank hold × 20–30 sec",
        [
          "Top of push-up wrists under shoulders—or hands on elevated bench.",
          "Glutes squeezed, ribs gently toward belt line.",
          "Breathe diaphragmatically ribs expand laterally—not locking breath.",
        ],
        "Hips sag? Drop knees or shorten hold—quality plank only.",
        { imageUrl: RI.plankMobility, videoUrl: routineYt("high plank hold form beginner") }
      ),
    ],
    stretching: [
      r(
        "Corner chest opener",
        [
          "Forearms staggered lightly on perpendicular walls elbows near shoulder height.",
          "Lean chest forward until pec stretch—not pinch in fronts of shoulders.",
          "Hold 30 seconds; shrug tension out between breaths.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("corner chest stretch pec stretch") }
      ),
      r(
        "Bench lat lengthener",
        [
          "Kneel or stand facing bench palms down fingers spread.",
          "Hinge hips back lengthening spine; press chest toward floor mildly.",
          "Hold 25–35 seconds emphasizing long neck.",
        ],
        { imageUrl: imageSet.back, videoUrl: routineYt("bench lat stretch latissimus dorsi stretch") }
      ),
    ],
    cardio: c(
      "10 min cross trainer moderate",
      [
        "Grip light—whole foot platforms through stroke.",
        "Upright posture; elbows soft 90-ish degrees.",
        "Effort conversational but steady—minute 8 should feel repeatable.",
      ],
      "Elliptical spikes arms too—relax grip to avoid numb forearms.",
      { imageUrl: RI.elliptical, videoUrl: routineYt("elliptical machine workout beginner steady pace") }
    ),
    exercises: [
      exercise(
        "incline-bench-press",
        "Incline Bench Press",
        "4",
        "8-10",
        "10-15 kg total",
        12.5,
        90,
        "Press with the bench on a mild incline and keep elbows about 45 degrees from the body.",
        "Upper chest, front delts, triceps",
        [
          "Set the bench low enough to still target chest.",
          "Lower to upper chest.",
          "Press smoothly without bouncing.",
        ],
        [
          "Bench angle too steep.",
          "Wrists bent backward.",
          "Bar path too high over the face.",
        ],
        [
          "A small incline often feels better on the shoulders.",
          "Reduce load if the shoulders feel it more than the chest.",
        ],
        "https://www.youtube.com/results?search_query=incline+bench+press+form",
        imageSet.chest
      ),
      exercise(
        "push-up",
        "Push-Up",
        "3",
        "8-12",
        "Bodyweight",
        0,
        60,
        "Keep the body in one straight line and lower the chest between the hands.",
        "Chest, triceps, core",
        [
          "Hands slightly wider than shoulders.",
          "Brace glutes and abs.",
          "Press the floor away evenly.",
        ],
        [
          "Hips sagging or rising too high.",
          "Neck dropping forward.",
          "Partial range of motion.",
        ],
        [
          "Use an incline push-up on a bench if floor reps are too hard.",
          "Quality reps matter more than total reps.",
        ],
        "https://www.youtube.com/results?search_query=push+up+proper+form",
        imageSet.chest
      ),
      exercise(
        "machine-chest-press",
        "Machine Chest Press",
        "3",
        "12",
        "20-25 kg",
        22.5,
        60,
        "Keep the seat set so handles line up around mid chest and press evenly.",
        "Chest, triceps",
        [
          "Shoulders stay back against the pad.",
          "Control the negative phase.",
          "Do not lock elbows aggressively.",
        ],
        [
          "Seat too low or too high.",
          "Rushing each rep.",
          "Letting one arm dominate the press.",
        ],
        [
          "Machines are great for beginners learning chest tension.",
          "Use this after free weights for safer extra volume.",
        ],
        "https://www.youtube.com/results?search_query=machine+chest+press+form",
        imageSet.chest
      ),
      exercise(
        "close-grip-pulldown",
        "Close Grip Lat Pulldown",
        "3",
        "12",
        "20-25 kg",
        22.5,
        75,
        "Pull the handle to the upper chest while keeping the torso steady.",
        "Lats, mid back, biceps",
        [
          "Drive elbows down and back.",
          "Keep chest lifted.",
          "Stretch fully at the top without losing posture.",
        ],
        [
          "Using too much lean-back.",
          "Short reps at the top.",
          "Shrugging into the neck.",
        ],
        [
          "This grip often feels more natural for beginners.",
          "Pause for one second at the bottom.",
        ],
        "https://www.youtube.com/results?search_query=close+grip+lat+pulldown+form",
        imageSet.back
      ),
      exercise(
        "straight-arm-pulldown",
        "Straight Arm Pulldown",
        "3",
        "15",
        "10-15 kg",
        12.5,
        60,
        "Keep arms mostly straight and pull the bar in an arc toward the thighs.",
        "Lats",
        [
          "Hinge slightly at the hips.",
          "Keep ribs down.",
          "Control the stretch back up.",
        ],
        [
          "Turning it into a tricep move by bending too much at the elbow.",
          "Using body swing.",
          "Stopping short of the thighs.",
        ],
        [
          "This is a great drill for learning to feel your lats.",
          "Use slow tension instead of big weight jumps.",
        ],
        "https://www.youtube.com/results?search_query=straight+arm+pulldown+form",
        imageSet.back
      ),
    ],
  },
  {
    day: "Friday",
    focus: "Arms + Shoulders",
    warmup: [
      r(
        "5 min brisk walk",
        [
          "Loosen ankles—smooth rolling steps.",
          "Pump arms casually to wake shoulders—not sprint arms.",
          "Finish with wrists circles each direction × 10.",
        ],
        { imageUrl: RI.briskWalk, videoUrl: routineYt("walking warm up activation before arms workout") }
      ),
      r(
        "Band curls x 15",
        [
          "Stand band under mid-foot elbows pinned ribs.",
          "Curl wrists neutral—squeeze biceps smoothly top and bottom controlled.",
          "No rocking hips—tiny weight hops mean band too heavy.",
        ],
        { imageUrl: RI.bandUpper, videoUrl: routineYt("resistance band bicep curl form") }
      ),
      r(
        "Band external rotations x 15/arm",
        [
          "Elbow glued to ribs 90°, forearm rotates outward like gate opening.",
          "Stop before shoulder aches—pain free range only.",
          "Slow tempo priority rotator cuffs wake up subtly.",
        ],
        "This protects shoulders before presses and curls—do not rush.",
        {
          imageUrl: imageSet.shoulders,
          videoUrl: routineYt("external rotation shoulder band rotator cuff warm up"),
        }
      ),
    ],
    stretching: [
      r(
        "Bicep wall stretch variation",
        [
          "Hand behind on wall fingertips down palm flat if possible—or lower height.",
          "Turn body softly until anterior arm lengthens politely.",
          "Hold 25–35 seconds/arm.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("biceps stretch anatomy wall variation") }
      ),
      r(
        "Overhead tricep side stretch",
        [
          "Arm overhead elbow bent—opposite fingertips assist gently.",
          "Keep ribs down—avoid arching your back just to feel more stretch.",
          "Hold 25–35 seconds/arm.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("overhead tricep stretch standing") }
      ),
      r(
        "Neck lateral stretch",
        [
          "Shoulders relaxed down from ears.",
          "Tilt ear toward shoulder softly—opposite fingertips optional light assist.",
          "Hold 18–22 seconds/side breathe slow.",
        ],
        "Stop if dizziness or sharp nerve sensations.",
        { imageUrl: RI.breathCalm, videoUrl: routineYt("gentle neck stretch side stretch seated") }
      ),
    ],
    cardio: c(
      "10 min light row OR bike",
      [
        "Row option: mimic Tuesday row technique—steady stroke rate conversational.",
        "Bike option: add one gear only if pedals float too easily.",
        "Finish energized not drained—preserve arms for lifts ahead.",
      ],
      "Split 5 rowing + 5 bike if boredom hits—movement quality constant.",
      {
        imageUrl: RI.rowing,
        videoUrl: routineYt("light rowing machine warmup easy pace beginner"),
      }
    ),
    exercises: [
      exercise(
        "bicep-curl",
        "Dumbbell Bicep Curl",
        "3",
        "12",
        "5-7.5 kg each",
        6,
        60,
        "Curl one or both dumbbells with elbows pinned close to the body.",
        "Biceps",
        [
          "Stand tall without shoulder sway.",
          "Fully lower each rep.",
          "Squeeze at the top for one beat.",
        ],
        [
          "Swinging from the hips.",
          "Incomplete lowering.",
          "Turning the wrist too late.",
        ],
        [
          "Alternating arms can help with control.",
          "Lower slower than you lift.",
        ],
        "https://www.youtube.com/results?search_query=dumbbell+bicep+curl+form",
        imageSet.arms
      ),
      exercise(
        "preacher-curl",
        "Preacher Curl",
        "3",
        "12",
        "10 kg",
        10,
        60,
        "Set the upper arm fully on the pad and curl without lifting the shoulder.",
        "Biceps",
        [
          "Use full controlled range.",
          "Keep the armpit planted on the pad.",
          "Lower until arms nearly straight.",
        ],
        [
          "Jerking out of the bottom.",
          "Shortening the negative.",
          "Using too much weight.",
        ],
        [
          "This move gets hard quickly, so stay lighter than expected.",
          "Stop before elbow discomfort starts.",
        ],
        "https://www.youtube.com/results?search_query=preacher+curl+form",
        imageSet.arms
      ),
      exercise(
        "assisted-dips",
        "Assisted Tricep Dips",
        "3",
        "8-10",
        "Bodyweight assisted",
        0,
        75,
        "Keep the chest up and lower only until shoulders stay comfortable.",
        "Triceps, chest",
        [
          "Use machine assistance if needed.",
          "Elbows point mostly backward.",
          "Press evenly with both arms.",
        ],
        [
          "Dropping too deep into the shoulder.",
          "Swinging the legs.",
          "Shrugging into the neck.",
        ],
        [
          "Assistance is not cheating here, it is smart progression.",
          "Smooth reps beat forced reps.",
        ],
        "https://www.youtube.com/results?search_query=assisted+dips+form",
        imageSet.arms
      ),
      exercise(
        "rope-pushdown",
        "Rope Pushdown",
        "3",
        "12-15",
        "15-20 kg",
        17.5,
        60,
        "Split the rope at the bottom and fully finish the elbow extension.",
        "Triceps",
        [
          "Keep shoulders down.",
          "Pin elbows near the ribs.",
          "Return slowly without losing tension.",
        ],
        [
          "Turning it into a chest press.",
          "Flaring elbows too early.",
          "Leaning over the stack.",
        ],
        [
          "The rope often feels smoother on the elbows than a straight bar.",
          "Full range matters more than stack numbers.",
        ],
        "https://www.youtube.com/results?search_query=rope+pushdown+form",
        imageSet.arms
      ),
      exercise(
        "arnold-press",
        "Arnold Press",
        "3",
        "10",
        "5 kg each",
        5,
        75,
        "Rotate the palms from facing you to facing forward as you press up.",
        "Shoulders",
        [
          "Move smoothly through the rotation.",
          "Keep elbows slightly in front at the bottom.",
          "Lower with control.",
        ],
        [
          "Rushing the rotation.",
          "Pressing too far behind the head.",
          "Arching the lower back.",
        ],
        [
          "Lighter weights work best while learning the rotation.",
          "Seated variation can feel more stable.",
        ],
        "https://www.youtube.com/results?search_query=arnold+press+form",
        imageSet.shoulders
      ),
      exercise(
        "face-pull",
        "Face Pull",
        "3",
        "15",
        "10-15 kg",
        12.5,
        60,
        "Pull the rope toward eye level while spreading the hands apart.",
        "Rear delts, upper back",
        [
          "Set the cable around face height.",
          "Elbows stay high.",
          "Finish with shoulder blades squeezed together.",
        ],
        [
          "Pulling too low toward the chest.",
          "Shrugging the traps.",
          "Using lower back momentum.",
        ],
        [
          "This is a great shoulder-health accessory.",
          "Go light enough to feel the rear delts clearly.",
        ],
        "https://www.youtube.com/results?search_query=face+pull+form",
        imageSet.shoulders
      ),
    ],
  },
  {
    day: "Saturday",
    focus: "Legs + Core",
    warmup: [
      r(
        "5 min easy bike",
        [
          "Light tension—wake quads calves without burnout.",
          "Keep cadence rhythmic—smooth circles.",
          "If knees click reduce seat height stiffness consult bike instructions.",
        ],
        { imageUrl: RI.cycling, videoUrl: routineYt("stationary bike leg day warm up beginner") }
      ),
      r(
        "Hip openers (Cossack-lite) × 10/side",
        [
          "Wide stance toes forward or slight turnout comfortable.",
          "Shift weight sideways bending one knee opposite leg stays long.",
          "Keep heel planted bend side torso lifted—tiny range beats collapsed knee.",
        ],
        "Pain inside knee—narrow stance or omit lateral shift.",
        { imageUrl: RI.legsSquat, videoUrl: routineYt("cossack squat mobility hip opener beginner") }
      ),
      r(
        "Glute bridges × 15",
        [
          "Lie back knees hips-width feet planted near glutes fingertips brush heels.",
          "Drive through heels lift hips ribs stay quiet relative pelvis—not flaring massively.",
          "Squeeze butt top 1-second lower vertebrae sequentially.",
        ],
        { imageUrl: RI.gluteBridge, videoUrl: routineYt("glute bridge warmup activation form") }
      ),
    ],
    stretching: [
      r(
        "Hamstring doorway or strap stretch",
        [
          "Leg up wall or doorway edge knee soft not locked alternate option lying strap.",
          "Keep pelvis neutral—avoid forceful ballistic reaching.",
          "Hold 35–45 seconds smooth breathing/side.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("lying hamstring stretch doorway wall") }
      ),
      r(
        "Half-kneeling hip flexor stretch",
        [
          "Back knee padded front knee above ankle torso tall.",
          "Tuck pelvis posterior slightly feel front hip lengthen.",
          "Slight arm reach overhead optional—maintain ribs down.",
          "Hold 28–38 seconds alternate lead leg.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("half kneeling hip flexor stretch beginner") }
      ),
      r(
        "Child's pose with wide knees",
        [
          "Knees mat-width big toes touch sit hips toward heels softly.",
          "Arms lengthen forward forehead rest block or stacked hands breathe wide back.",
          "Rock gently side ribs if comforting.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("child's pose yoga wide knees stretch") }
      ),
    ],
    cardio: c(
      "12 min brisk walk outside if possible",
      [
        "Aim purposeful pace—you could speak but not sing full verses.",
        "Land softer—think quiet feet sparing joints cumulative impact.",
      ],
      "Treadmill fine—tiny incline boosts effort without pounding.",
      { imageUrl: RI.briskWalk, videoUrl: routineYt("brisk walking form cardiovascular warm down") }
    ),
    exercises: [
      exercise(
        "walking-lunges",
        "Walking Lunges",
        "3",
        "12 each leg",
        "Bodyweight or 5 kg each",
        5,
        75,
        "Step long enough to lower under control and keep the front foot flat.",
        "Quads, glutes, balance",
        [
          "Keep chest up.",
          "Lower straight down instead of leaning forward.",
          "Push through the front foot to stand.",
        ],
        [
          "Short choppy steps.",
          "Knee collapsing inward.",
          "Rushing and losing balance.",
        ],
        [
          "Start bodyweight if balance is still improving.",
          "Use a hallway or rail lightly for support if needed.",
        ],
        "https://www.youtube.com/results?search_query=walking+lunge+form",
        imageSet.legs
      ),
      exercise(
        "glute-bridge",
        "Glute Bridge",
        "3",
        "15",
        "Bodyweight",
        0,
        45,
        "Drive through the heels and squeeze the glutes hard at the top.",
        "Glutes, hamstrings, core",
        [
          "Keep ribs down.",
          "Lift until hips are fully extended.",
          "Pause at the top.",
        ],
        [
          "Pushing through the toes.",
          "Overarching the lower back.",
          "Dropping quickly between reps.",
        ],
        [
          "A simple and effective beginner hip exercise.",
          "Add a dumbbell only after you own the bodyweight version.",
        ],
        "https://www.youtube.com/results?search_query=glute+bridge+form",
        imageSet.legs
      ),
      exercise(
        "leg-curl",
        "Leg Curl",
        "3",
        "12",
        "15-25 kg",
        20,
        60,
        "Curl the pad toward you without lifting the hips off the bench.",
        "Hamstrings",
        [
          "Keep hips pressed down.",
          "Move through full range.",
          "Lower slowly for control.",
        ],
        [
          "Using momentum.",
          "Cutting reps short.",
          "Cramping from rushing the tempo.",
        ],
        [
          "Hamstrings respond well to slower reps.",
          "Reduce load if hips start moving around.",
        ],
        "https://www.youtube.com/results?search_query=leg+curl+form",
        imageSet.legs
      ),
      exercise(
        "deadlift",
        "Deadlift",
        "3",
        "5-6",
        "Empty bar to 20 kg",
        20,
        105,
        "Start with the bar close to the shins, brace hard, and stand up by pushing the floor away.",
        "Glutes, hamstrings, back, core",
        [
          "Set the back flat before the pull.",
          "Keep the bar close to the body.",
          "Lock out by squeezing glutes, not leaning back.",
        ],
        [
          "Jerking the bar off the floor.",
          "Rounded lower back.",
          "Letting the bar drift away from the legs.",
        ],
        [
          "Treat this as a technique lift first.",
          "Film from the side and reduce weight if your spine position changes.",
        ],
        "https://www.youtube.com/results?search_query=deadlift+proper+form+beginner",
        imageSet.back
      ),
      exercise(
        "plank",
        "Plank",
        "3",
        "30-45 sec",
        "Bodyweight",
        0,
        45,
        "Keep the body straight and squeeze abs and glutes the whole time.",
        "Core",
        [
          "Elbows under shoulders.",
          "Look slightly ahead of the hands.",
          "Breathe slowly while bracing.",
        ],
        [
          "Hips sagging.",
          "Holding the breath.",
          "Piking hips too high.",
        ],
        [
          "Shorter clean holds are better than long messy holds.",
          "Start from knees if full plank form breaks instantly.",
        ],
        "https://www.youtube.com/results?search_query=plank+proper+form",
        imageSet.core
      ),
      exercise(
        "dead-bug",
        "Dead Bug",
        "3",
        "12 each side",
        "Bodyweight",
        0,
        45,
        "Keep the lower back pressed down while moving opposite arm and leg.",
        "Core",
        [
          "Exhale as the arm and leg extend.",
          "Move slowly and evenly.",
          "Return to center before switching sides.",
        ],
        [
          "Back lifting off the floor.",
          "Rushing through the movement.",
          "Extending too far for current control.",
        ],
        [
          "This is excellent for building core control for squats and deadlifts.",
          "Reduce range if the lower back starts arching.",
        ],
        "https://www.youtube.com/results?search_query=dead+bug+exercise+form",
        imageSet.core
      ),
    ],
  },
  {
    day: "Sunday",
    focus: "Rest",
    warmup: [
      r(
        "Easy 10 min walk",
        [
          "Leisure stroll—observe surroundings reset nervous system.",
          "Soft shoulders rhythmic arms optional.",
          "Finish feeling looser—not like training block.",
        ],
        "Optional skip entirely if mentally you need couch—listen to fatigue.",
        { imageUrl: RI.briskWalk, videoUrl: routineYt("active recovery walk mobility day") }
      ),
      r(
        "Gentle mobility flow",
        [
          "Neck circles micro only if comfy—prefer side tilts chin tucks slower.",
          "Shoulder rolls forward/back × 8.",
          "Hip circles standing hands hips tiny figure eight both directions.",
          "Spine rotations standing tall elbows wide open-close × 10.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("full body mobility routine beginner gentle") }
      ),
      r(
        "Box breathing × 10 cycles",
        [
          "Inhale nose 4 seconds hold 4 exhale mouth 6 hold soft 2 relaxed.",
          "Hand on belly verifying gentle rise—not chest-only gasping.",
        ],
        "Lowers resting stress primes recovery—not performance day.",
        { imageUrl: RI.breathCalm, videoUrl: routineYt("box breathing relaxation technique beginner") }
      ),
    ],
    stretching: [
      r(
        "Full-body light stretch buffet",
        [
          "Choose 6–10 minutes total lingering spots tight from week's training.",
          "Hit calves optional outer hip gentle twist supine knees rock side lightly.",
          "Every hold easy intensity—relaxation oriented.",
        ],
        { imageUrl: RI.stretchFloor, videoUrl: routineYt("full body stretching routine beginner 10 minutes") }
      ),
    ],
    cardio: c(
      "Optional 20 min mellow walk",
      [
        "Truly conversational—bring podcast not interval timer.",
        "Flat terrain—or slow incline conversational still.",
      ],
      "Skip cardio entirely if soreness screams—recovery wins.",
      { imageUrl: RI.briskWalk, videoUrl: routineYt("easy recovery walk cardiovascular health beginner") }
    ),
    exercises: [],
  },
];

function enrichWorkoutAlternatives(plan: WorkoutDayPlan[]): WorkoutDayPlan[] {
  return plan.map((day) => ({
    ...day,
    exercises: day.exercises.map((e) => {
      const alts = alternativesFor(e);
      return alts.length > 0 ? { ...e, alternatives: alts } : e;
    }),
  }));
}

export const workoutPlan = enrichWorkoutAlternatives(RAW_WORKOUT_PLAN);

export function migrateAppData(raw: unknown): AppData {
  const base = createInitialAppData();
  if (!raw || typeof raw !== "object") return base;
  const p = raw as Partial<AppData>;
  const slot =
    p.slotExerciseChoice && typeof p.slotExerciseChoice === "object" && !Array.isArray(p.slotExerciseChoice)
      ? { ...p.slotExerciseChoice }
      : {};
  return {
    ...base,
    ...p,
    exerciseWeights: { ...base.exerciseWeights, ...p.exerciseWeights },
    completedExercises: p.completedExercises ?? base.completedExercises,
    workoutNotes: p.workoutNotes ?? base.workoutNotes,
    waterMlByDate: p.waterMlByDate ?? base.waterMlByDate,
    bodyWeightEntries: p.bodyWeightEntries ?? base.bodyWeightEntries,
    exerciseHistory: p.exerciseHistory ?? base.exerciseHistory,
    heightCm: typeof p.heightCm === "number" ? p.heightCm : base.heightCm,
    slotExerciseChoice: slot,
  };
}

export function createInitialAppData(): AppData {
  const exerciseWeights: Record<string, number> = {};

  workoutPlan.forEach((day) => {
    day.exercises.forEach((item) => {
      exerciseWeights[item.id] = item.defaultWeightKg;
      item.alternatives?.forEach((a) => {
        exerciseWeights[a.id] = a.defaultWeightKg;
      });
    });
  });

  return {
    exerciseWeights,
    completedExercises: {},
    workoutNotes: {},
    waterMlByDate: {},
    bodyWeightEntries: [],
    exerciseHistory: {},
    heightCm: 170,
    slotExerciseChoice: {},
  };
}
