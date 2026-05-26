import type { Exercise, ExerciseVariant } from "../types";

/** Match Unsplash assets used in workoutPlan / imageSet */
const IMG = {
  chest: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  back: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=900&q=80",
  legs: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
  shoulders: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
  arms: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  core: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
};

function yt(q: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

function alt(base: Exercise, id: string, name: string, patch: Partial<ExerciseVariant>): ExerciseVariant {
  const { alternatives: _omit, ...rest } = base;
  return { ...rest, ...patch, id, name };
}

/** Two swap-in options per main lift where it makes sense for beginners */
export function alternativesFor(exercise: Exercise): ExerciseVariant[] {
  switch (exercise.id) {
    case "bench-press":
      return [
        alt(exercise, "alt-bench-dumbbell", "Dumbbell Bench Press", {
          beginnerWeight: "5–7.5 kg each side",
          defaultWeightKg: 7.5,
          instructions:
            "Press dumbbells similarly to bar path; keep wrists stacked over elbows.",
          demoUrl: yt("dumbbell bench press form beginner"),
          correctForm: [
            "Shoulders anchored on bench.",
            "Lower until upper arms parallel or slightly deeper if comfortable.",
            "Press symmetrically.",
          ],
          commonMistakes: ["Arms drifting wide.", "Bouncing dumbbells.", "Huge arch.", "Uneven presses."],
          beginnerTips: ["Use light pair first.", "Match bar bench mechanics.", "Control the eccentric."],
        }),
        alt(exercise, "alt-bench-smith", "Smith Machine Bench Press", {
          beginnerWeight: "Bar + ~10 kg each side starter",
          defaultWeightKg: 15,
          instructions: "Bench on fixed rails; pause lightly on chest; same foot drive as flat bench.",
          demoUrl: yt("smith machine bench press beginner"),
          correctForm: [
            "Set safeties chest height.",
            "Unrack with wrists straight.",
            "Lower with control.",
          ],
          commonMistakes: ["Drifting wrists away.", "Bouncing reps.", "Unstable ankles."],
          beginnerTips: ["Great when training alone.", "Progress load slowly.", "Match bar groove."],
          imageUrl: IMG.chest,
        }),
      ];
    case "incline-db-press":
      return [
        alt(exercise, "alt-incline-barbell", "Incline Barbell Press", {
          beginnerWeight: "Light fixed barbell or Ez bar starter",
          defaultWeightKg: 12,
          instructions: "Use ~30° incline; lower to upper chest; elbows ~45° to ribs.",
          demoUrl: yt("incline bench press dumbbell substitute barbell form"),
          targetMuscle: "Upper chest",
          correctForm: ["Track bar over nip line toward face slightly.", "Blades squeezed.", "No hip bridge."],
          commonMistakes: ["Bench too upright.", "Flared elbows excessively.", "Bouncing torso."],
          beginnerTips: ["Lower angle if shoulders pinch.", "Empty bar rehearsals help."],
          imageUrl: IMG.chest,
        }),
        alt(exercise, "alt-incline-machine", "Chest Press Machine (incline)", {
          beginnerWeight: "Light stack notch",
          defaultWeightKg: 12,
          instructions: "Set seat handles hit mid-upper chest; press smooth without jerk.",
          demoUrl: yt("machine chest incline press form"),
          targetMuscle: "Upper chest, triceps",
          correctForm: ["Shoulders back into pad.", "Full extension minus lock jerk.", "Breathe rhythmic."],
          commonMistakes: ["Grip too wide hurting shoulders.", "Shrugging traps.", "Short ROM."],
          beginnerTips: ["Same upper-chest stimulus when dumbbells crowded.", "Count tempo."],
          imageUrl: IMG.chest,
        }),
      ];
    case "chest-fly":
      return [
        alt(exercise, "alt-fly-cable", "Cable Chest Fly", {
          beginnerWeight: "Light stacks",
          defaultWeightKg: 7.5,
          restSeconds: 60,
          instructions: "Slight forward step; elbows soft; arc handles together without turning into press.",
          demoUrl: yt("standing cable chest fly form"),
          targetMuscle: "Chest",
          correctForm: ["Keep shoulder blades anchored.", "Open until stretch not pain.", "Squeeze inward slowly."],
          commonMistakes: ["Straight-arm lockout stressing elbows.", "Over leaning.", "Momentum swing."],
          beginnerTips: ["Constant tension differs from dumbbells.", "Small weight climbs."],
          imageUrl: IMG.chest,
        }),
        alt(exercise, "alt-fly-machine", "Pec Deck / Fly Machine", {
          beginnerWeight: "Light starter pin",
          defaultWeightKg: 10,
          instructions: "Elbows bent on pads; squeeze mid-line; control return eccentric.",
          demoUrl: yt("pec deck machine form beginner"),
          targetMuscle: "Chest",
          correctForm: ["Adjust seat elbows level shoulder.", "No shrugging chin.", "Stop before snap pain."],
          commonMistakes: ["Driving with hands not elbows.", "Thoracic collapse.", "Holding breath."],
          beginnerTips: ["Isolation friendly.", "Short range early ok.", "Sync breath."],
          imageUrl: IMG.chest,
        }),
      ];
    case "tricep-pushdown":
      return [
        alt(exercise, "alt-tri-supine-ext", "Lying Ez Skull Crusher", {
          beginnerWeight: "Ez bar starter",
          defaultWeightKg: 12,
          instructions: "Ez bar perpendicular bench; elbows fixed toward ceiling lower behind head mildly.",
          demoUrl: yt("ez bar skull crusher form"),
          targetMuscle: "Triceps",
          correctForm: ["Wrists neutral.", "Humerus stacked.", "Controlled stretch."],
          commonMistakes: ["Elbows wandering.", "Over arch low back.", "Cutting ROM."],
          beginnerTips: ["Short range first builds elbow tolerance.", "Use spotter collars."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-tri-overhead-rope", "Overhead Cable Rope Extension", {
          beginnerWeight: "Light cable stack",
          defaultWeightKg: 10,
          instructions: "Neutral stance split; elbows high split rope outward at bottom softly.",
          demoUrl: yt("overhead cable triceps extension rope form"),
          targetMuscle: "Triceps long head",
          correctForm: ["Brace core ribs down.", "Elbows stationary.", "Open rope ends apart."],
          commonMistakes: ["Cable drift front losing tension.", "Shrug traps.", "Excess low back bend."],
          beginnerTips: ["Great long-head bias.", "Chase stretch not bounce."],
          imageUrl: IMG.arms,
        }),
      ];
    case "overhead-extension":
      return [
        alt(exercise, "alt-cross-tri-push", "Cross-Body Cable Extension", {
          beginnerWeight: "Light cable",
          defaultWeightKg: 6,
          instructions: "Single handle low-high path across body finishing arm straight line rib height.",
          demoUrl: yt("cross body triceps pushdown cable"),
          targetMuscle: "Triceps",
          correctForm: ["Shoulder stays low.", "Neutral wrist.", "Control negative."],
          commonMistakes: ["Swinging torso.", "Elbow flaring excessively.", "Shrug upward."],
          beginnerTips: ["Single arm exposes imbalance.", "Short sets quality."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-bench-clean-ext", "Seated Ez Overhead Extension", {
          beginnerWeight: "Ez bar seated light",
          defaultWeightKg: 10,
          instructions: "Seated upright back pad; elbows high lower Ez behind crown slow.",
          demoUrl: yt("seated overhead triceps ez bar extension"),
          targetMuscle: "Triceps",
          correctForm: ["Chair supports thoracic upright.", "Knees 90 grounding.", "Wrist stacked."],
          commonMistakes: ["Driving head forward.", "Path too far behind head.", "Rushing negatives."],
          beginnerTips: ["Lower seat supports safer neck.", "Use lighter than pushdown stacks."],
          imageUrl: IMG.arms,
        }),
      ];
    case "lat-pulldown":
      return [
        alt(exercise, "alt-lat-assisted-pullup", "Assisted Pull-Up", {
          beginnerWeight: "Machine assistance plate (brand varies)",
          defaultWeightKg: 0,
          instructions:
            "Set counterweight so you get 8–10 clean reps; chest toward bar path, shoulders down first.",
          demoUrl: yt("assisted pull up machine beginner form"),
          targetMuscle: "Lats, biceps",
          correctForm: ["Depress shoulders first.", "Slight hollow chest.", "Elbows move down and back."],
          commonMistakes: ["Behind-neck pulling.", "Kipping or jumping.", "Shrugging at top."],
          beginnerTips: ["Lower assistance over weeks.", "Match lat pulldown groove."],
          imageUrl: IMG.back,
        }),
        alt(exercise, "alt-lat-neutral-pulldown", "Neutral-Grip Lat Pulldown", {
          beginnerWeight: "15–25 kg",
          defaultWeightKg: 20,
          instructions:
            "Neutral or parallel handles; pull to upper chest keeping torso tall with light controlled lean.",
          demoUrl: yt("neutral grip lat pulldown form"),
          targetMuscle: "Lats, biceps",
          correctForm: ["Drive elbows toward hips.", "Stretch fully overhead.", "No neck jerking."],
          commonMistakes: ["Using momentum.", "Cutting ROM at top.", "Excessive rocking."],
          beginnerTips: ["Often feels friendlier on wrists.", "Pause at bottom briefly."],
          imageUrl: IMG.back,
        }),
      ];
    case "seated-row":
      return [
        alt(exercise, "alt-chest-supported-row", "Chest-Supported Row", {
          beginnerWeight: "Machine or incline bench + dumbbells light",
          defaultWeightKg: 12.5,
          instructions: "Torso supported; row handles or dumbbells to lower ribs squeezing blades.",
          demoUrl: yt("chest supported row machine form"),
          targetMuscle: "Mid back, lats",
          correctForm: ["Keep sternum lifted off pad.", "Elbows skim ribs.", "No neck crane."],
          commonMistakes: ["Jerking torso.", "Shrugged shoulders.", "Short ROM."],
          beginnerTips: ["Great for posture control.", "Match cable row stimulus."],
          imageUrl: IMG.back,
        }),
        alt(exercise, "alt-single-arm-cable-row", "One-Arm Cable Row", {
          beginnerWeight: "Single stack starter",
          defaultWeightKg: 15,
          instructions: "Stagger stance; pull handle to hip with square shoulders.",
          demoUrl: yt("one arm cable row form"),
          targetMuscle: "Lats, mid back",
          correctForm: ["Brace core.", "Elbow tight to torso.", "Control return."],
          commonMistakes: ["Opening hips to cheat.", "Wrist curling.", "Rushing negatives."],
          beginnerTips: ["Fixes side-to-side bias.", "Slow eccentrics."],
          imageUrl: IMG.back,
        }),
      ];
    case "one-arm-row":
      return [
        alt(exercise, "alt-machine-low-row", "Seated Row Machine", {
          beginnerWeight: "Light stack starter",
          defaultWeightKg: 20,
          instructions: "Neutral grip horizontal pull to torso; ribs tall; squeeze blades each rep.",
          demoUrl: yt("plate loaded row machine form"),
          targetMuscle: "Lats, mid back",
          correctForm: ["Feet braced.", "Chest proud.", "No bounce."],
          commonMistakes: ["Rounding low back excessively.", "Yanking stacks.", "Elbows flare wide."],
          beginnerTips: ["Swap when dumbbell balance is tiring.", "Match hip-to-hand path."],
          imageUrl: IMG.back,
        }),
        alt(exercise, "alt-inverted-row", "Inverted Row (Smith or bar)", {
          beginnerWeight: "Bodyweight angled",
          defaultWeightKg: 0,
          instructions: "Hang under fixed bar heels down; pull chest to bar like reverse push-up.",
          demoUrl: yt("inverted row form beginner"),
          targetMuscle: "Upper back, biceps",
          correctForm: ["Glutes tight body line.", "Pull elbows behind body.", "No hip sag."],
          commonMistakes: ["Chicken neck reaching.", "Flared ribs.", "Cutting ROM."],
          beginnerTips: ["Elevate bar to regress.", "Grip shoulder width."],
          imageUrl: IMG.back,
        }),
      ];
    case "barbell-curl":
      return [
        alt(exercise, "alt-db-curl-stand", "Standing Dumbbell Curl", {
          beginnerWeight: "5–7.5 kg each",
          defaultWeightKg: 6,
          instructions: "Neutral or supinating curl with elbows glued to torso.",
          demoUrl: yt("dumbbell curl form beginner"),
          targetMuscle: "Biceps",
          correctForm: ["Stack wrists under elbows.", "Full extension bottom.", "No hip swing."],
          commonMistakes: ["Momentum rock.", "Elbows drifting forward.", "Partial reps."],
          beginnerTips: ["Alternating reps can stabilize.", "Easier wrists than straight bar sometimes."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-cable-curl", "Cable Bar Curl", {
          beginnerWeight: "Light pulley stack",
          defaultWeightKg: 15,
          instructions: "Cable constant tension curling bar to shoulders without drifting elbows.",
          demoUrl: yt("straight bar cable curl form"),
          targetMuscle: "Biceps",
          correctForm: ["Shoulders pinned back.", "Control negative.", "Squeeze top."],
          commonMistakes: ["Cable pulling you forward.", "Shrug traps.", "Rushing negatives."],
          beginnerTips: ["Joint-friendly continuous load.", "Match bar groove."],
          imageUrl: IMG.arms,
        }),
      ];
    case "hammer-curl":
      return [
        alt(exercise, "alt-cross-hammer-cable", "Rope Hammer Curl", {
          beginnerWeight: "Light rope stack",
          defaultWeightKg: 12,
          instructions: "Rope curls neutral palms elbows tight ribs.",
          demoUrl: yt("rope hammer curl cable"),
          targetMuscle: "Brachialis, forearms",
          correctForm: ["Split rope ends subtly at top.", "Vertical forearms.", "Slow lowering."],
          commonMistakes: ["Swinging elbows away.", "Shrug shoulders.", "Short ROM."],
          beginnerTips: ["Great brachialis hit.", "Elbows tucked."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-zottman-curl", "Zottman Curl", {
          beginnerWeight: "Light dumbbells",
          defaultWeightKg: 5,
          instructions:
            "Curl palms up rotating to palms-down on eccentric for forearm pairing with brachialis.",
          demoUrl: yt("zottman curl form"),
          targetMuscle: "Biceps and forearms",
          correctForm: ["Rotate wrist at shoulder height.", "Control negative palms down.", "No swing."],
          commonMistakes: ["Heavy weights causing swing.", "Losing tempo.", "Uneven wrists."],
          beginnerTips: ["Great wrist-friendly pairing.", "Use lighter dumbbells."],
          imageUrl: IMG.arms,
        }),
      ];
    case "squat":
      return [
        alt(exercise, "alt-goblet-squat", "Goblet Squat", {
          beginnerWeight: "One dumbbell/kettlebell 10–16 kg starter",
          defaultWeightKg: 12,
          instructions: "Hold weight vertically at sternum squat between hips elbows inside knees softly.",
          demoUrl: yt("goblet squat beginner form"),
          targetMuscle: "Quads, glutes",
          correctForm: ["Ribs stacked over hips.", "Knees track toes.", "Heels stay down."],
          commonMistakes: ["Rounding upper back dumping weight.", "Knees collapsing.", "Limited depth fear."],
          beginnerTips: ["Counterweight cues upright torso.", "Great before loading barbells."],
          imageUrl: IMG.legs,
        }),
        alt(exercise, "alt-leg-press-squat", "Hack Squat or V-Squat Machine", {
          beginnerWeight: "Light sled notch",
          defaultWeightKg: 40,
          instructions: "Back into pad squat path fixed rails maintaining foot tripod pressure.",
          demoUrl: yt("hack squat machine beginner"),
          targetMuscle: "Quads, glutes",
          correctForm: ["Feet shoulder width mid sled.", "Control depth pelvic neutral.", "Breathe rhythmic."],
          commonMistakes: ["Cutting ROM.", "Locked knees jerk.", "Heels peeling."],
          beginnerTips: ["Machine stability helps patterning.", "Match quad burn."],
          imageUrl: IMG.legs,
        }),
      ];
    case "leg-press":
      return [
        alt(exercise, "alt-bulgarian-split-squat", "Bulgarian Split Squat", {
          beginnerWeight: "Bodyweight rear foot elevated",
          defaultWeightKg: 5,
          instructions:
            "Rear foot bench laces down; squat front knee tracking drop vertical shin optional.",
          demoUrl: yt("bulgarian split squat beginner dumbbell"),
          targetMuscle: "Quads, glutes",
          correctForm: ["Torso slight lean rib stack.", "Knee aligns over mid-foot.", "Drive through heel."],
          commonMistakes: ["Bench too close knee jam.", "Collapsed ankle.", "Bouncing depth."],
          beginnerTips: ["Unilateral stimulus without sled.", "Use wall balance first."],
          imageUrl: IMG.legs,
        }),
        alt(exercise, "alt-sissy-squad-hack-lite", "Sled Leg Press Narrow Stance", {
          beginnerWeight: "Lower stack narrower feet",
          defaultWeightKg: 45,
          instructions: "High foot placement biased glutes alternate low seat quad biased—pick quad focus low.",
          demoUrl: yt("leg press quad focus foot placement"),
          targetMuscle: "Quads",
          correctForm: ["Maintain lumbar contact.", "No lockout snapping.", "Full foot pressure."],
          commonMistakes: ["Rounded low back lift-off.", "Knees caving excessively.", "Shallow reps."],
          beginnerTips: ["Same machine new stimulus via stance.", "Tempo control."],
          imageUrl: IMG.legs,
        }),
      ];
    case "romanian-deadlift":
      return [
        alt(exercise, "alt-db-rdl", "Dumbbell RDL", {
          beginnerWeight: "10–14 kg total starter",
          defaultWeightKg: 12,
          instructions: "Neutral grip dumbbells close legs hip hinge ribs down lengthen hamstrings.",
          demoUrl: yt("dumbbell romanian deadlift form"),
          targetMuscle: "Hamstrings, glutes",
          correctForm: ["Bar path vertical shins quasi-static knee.", "Eyes horizon.", "Controlled eccentrics."],
          commonMistakes: ["Squat depth instead hinge.", "Bar drifting forward.", "Over arch."],
          beginnerTips: ["Often easier wrists than bar.", "Mirrors cue flat back."],
          imageUrl: IMG.legs,
        }),
        alt(exercise, "alt-good-morning-lite", "Seated Hamstring Curl + Hip Hinge Drill", {
          beginnerWeight: "Light cable pull-through substitution",
          defaultWeightKg: 15,
          instructions: "Cable low between legs hinge pushing hips back knees soft constant tension posterior.",
          demoUrl: yt("cable pull through glutes hamstrings form"),
          targetMuscle: "Hamstrings, glutes",
          correctForm: ["Arms ropes extension locked gently.", "Hinge dominant.", "Squeeze glutes finish."],
          commonMistakes: ["Squat dominant.", "Over arch.", "Rounding under load heavy."],
          beginnerTips: ["Great if low back hates barbells today.", "Chase hinge feel."],
          imageUrl: IMG.legs,
        }),
      ];
    case "shoulder-press":
      return [
        alt(exercise, "alt-machine-shoulder", "Machine Shoulder Press", {
          beginnerWeight: "Light stack notch",
          defaultWeightKg: 15,
          instructions: "Adjust seat grips ear height press overhead path guided rails.",
          demoUrl: yt("machine shoulder press form beginner"),
          targetMuscle: "Shoulders, triceps",
          correctForm: ["Head stays neutral pathway.", "No trap shrug finish.", "Control negative."],
          commonMistakes: ["Grip too wide.", "Hyperextending low back excessively.", "Asymmetric presses."],
          beginnerTips: ["Stable when dumbbells wobble.", "Match ROM."],
          imageUrl: IMG.shoulders,
        }),
        alt(exercise, "alt-landmine-press", "Half-Kneeling Landmine Press", {
          beginnerWeight: "Barbell horn + light plates",
          defaultWeightKg: 15,
          instructions: "Half kneel angled bar press upward finish biceps beside ear torso braced.",
          demoUrl: yt("half kneeling landmine press form"),
          targetMuscle: "Shoulders, core",
          correctForm: ["Glute squeezed rear leg.", "Ribs quiet.", "Press arc not flare."],
          commonMistakes: ["Shifting hips.", "Hyper arch.", "Uneven grind."],
          beginnerTips: ["Shoulder-friendly angle.", "Core demand higher."],
          imageUrl: IMG.shoulders,
        }),
      ];
    case "lateral-raise":
      return [
        alt(exercise, "alt-lever-lateral-machine", "Lateral Raise Machine", {
          beginnerWeight: "Light pin starter",
          defaultWeightKg: 8,
          instructions: "Pads on forearms elevate elbows laterally avoiding excessive wrist torque.",
          demoUrl: yt("machine lateral raise form"),
          targetMuscle: "Side delts",
          correctForm: ["Smooth arcs.", "Avoid shrugging excessively.", "Control lowering."],
          commonMistakes: ["Swinging torso.", "Lifting elbows below wrists excessively.", "Holding breath."],
          beginnerTips: ["Isolation easier than dumbbells.", "Cue wide not high."],
          imageUrl: IMG.shoulders,
        }),
        alt(exercise, "alt-cable-lateral-single", "One-Arm Cable Lateral Raise", {
          beginnerWeight: "Low stack crossover",
          defaultWeightKg: 5,
          instructions:
            "Stand sideways low pulley sweeping arm outward slight lean away constant tension arc.",
          demoUrl: yt("single arm cable lateral raise form"),
          targetMuscle: "Side delts",
          correctForm: ["Lead elbow slightly bent.", "Stop near shoulder height.", "Slow negatives."],
          commonMistakes: ["Cable pulling torso rotation jerk.", "Shrug excessively.", "Over high hands."],
          beginnerTips: ["Continuous tension stimulus.", "Fixes imbalances."],
          imageUrl: IMG.shoulders,
        }),
      ];
    case "incline-bench-press":
      return [
        alt(exercise, "alt-incline-db-alt", "Incline Dumbbell Press", {
          beginnerWeight: "Similar dumbbells incline-db day",
          defaultWeightKg: 10,
          instructions: "~30° bench neutral dumbbells path converging mildly overhead ribs down.",
          demoUrl: yt("incline dumbbell press intermediate form"),
          targetMuscle: "Upper chest, shoulders",
          correctForm: ["Elbows angled ~45°.", "Stable shoulder blades.", "Press vertical-ish path."],
          commonMistakes: ["Bench too upright.", "Bouncing elbows.", "Wrist hinge backward excessively."],
          beginnerTips: ["Great when no Smith free.", "Control depth patiently."],
          imageUrl: IMG.chest,
        }),
        alt(exercise, "alt-decline-pushup-alt", "Deficit Push-Up (Hands Elevated Negative)", {
          beginnerWeight: "Bodyweight elevated hands",
          defaultWeightKg: 0,
          instructions: "Hands low boxes feet floor emphasize upper chest stretch press strict line.",
          demoUrl: yt("pseudo planche push up elevated"),
          targetMuscle: "Upper chest, triceps",
          correctForm: ["Body tight plank.", "Elbows angled back slightly.", "Full ROM control."],
          commonMistakes: ["Neck dangling.", "Hips sagging.", "Limited depth."],
          beginnerTips: ["Elevation regresses intensity.", "Match incline stimulus."],
          imageUrl: IMG.chest,
        }),
      ];
    case "push-up":
      return [
        alt(exercise, "alt-pushup-knee", "Knee Push-Up", {
          beginnerWeight: "Bodyweight knees down",
          defaultWeightKg: 0,
          instructions: "Plank line from knees to shoulders lower chest gently press floor evenly.",
          demoUrl: yt("knee push up beginner form"),
          targetMuscle: "Chest, triceps",
          correctForm: ["Hands under shoulders width comfortable.", "Braced trunk.", "Elbows angled ~45°."],
          commonMistakes: ["Raised hips pike excessively.", "Head drooping excessively.", "Flared elbows jerk."],
          beginnerTips: ["Progress to full planks gradually.", "Stop before form collapse."],
          imageUrl: IMG.chest,
        }),
        alt(exercise, "alt-floor-db-press-bw-alt", "Dumbbell Floor Press + Push-Up Combo", {
          beginnerWeight: "Light dumbbells floor",
          defaultWeightKg: 8,
          instructions: "Elbows kiss floor dumbbells paused press shortening ROM friendly shoulders.",
          demoUrl: yt("dumbbell floor press form beginner"),
          targetMuscle: "Chest, triceps",
          correctForm: ["Upper arms angled 45.", "Stable feet anchored.", "No bounce."],
          commonMistakes: ["Heavy weight losing balance.", "Wrist collapsing.", "Uncontrolled eccentrics."],
          beginnerTips: ["Good lockout drill.", "Easier shoulders than flare push-ups.", "Limited stretch."],
          imageUrl: IMG.chest,
        }),
      ];
    case "machine-chest-press":
      return [
        alt(exercise, "alt-fly-machine-press-alt", "Single-Arm Machine Press Iso", {
          beginnerWeight: "Light half stack iso",
          defaultWeightKg: 15,
          instructions: "One arm press torso square addressing imbalance between sides.",
          demoUrl: yt("single arm chest press machine form"),
          targetMuscle: "Chest",
          correctForm: ["Neutral wrist.", "Back flush pad.", "Smooth extension."],
          commonMistakes: ["Torso twist cheating.", "Shrug excessively.", "Lockout snap."],
          beginnerTips: ["Fixes imbalance.", "Use lighter load."],
          imageUrl: IMG.chest,
        }),
        alt(exercise, "alt-decline-smith-press", "Decline Smith Press", {
          beginnerWeight: "Light bar smith decline",
          defaultWeightKg: 12,
          instructions: "Controlled decline emphasizes lower chest synergy when machine upright busy.",
          demoUrl: yt("decline smith press form"),
          targetMuscle: "Lower chest, triceps",
          correctForm: ["Feet anchored.", "Controlled negative.", "Wrist stacked."],
          commonMistakes: ["Grip too wide jerk.", "Bouncing torso.", "Rushing ROM."],
          beginnerTips: ["Different angle novelty.", "Use safeties patiently."],
          imageUrl: IMG.chest,
        }),
      ];
    case "close-grip-pulldown":
      return [
        alt(exercise, "alt-pullup-assisted-close", "Assisted Neutral Pull-Up", {
          beginnerWeight: "Assisted machine counters",
          defaultWeightKg: 0,
          instructions: "Neutral grips machine assist torso tall elbows down ribs.",
          demoUrl: yt("assisted neutral grip pull up beginner"),
          targetMuscle: "Lats, biceps",
          correctForm: ["Depressed scap.", "Controlled lowering.", "Chin clears bar optional."],
          commonMistakes: ["Swinging excessively.", "Shrug excessively.", "Short eccentrics."],
          beginnerTips: ["Closer stimulus to pull pattern.", "Progress assistance down."],
          imageUrl: IMG.back,
        }),
        alt(exercise, "alt-kneeling-cable-lat-pull", "Kneeling Lat Pulldown to Hip", {
          beginnerWeight: "Moderate cable stack kneeling",
          defaultWeightKg: 20,
          instructions: "Kneel stagger lat pull arc finishing elbows tight ribs anti-extension brace.",
          demoUrl: yt("kneeling lat pulldown form"),
          targetMuscle: "Lats",
          correctForm: ["Core braced ribs down.", "Elbows skim torso.", "No momentum rock."],
          commonMistakes: ["Standing hyper arch.", "Shrug excessively.", "Short stretch."],
          beginnerTips: ["Core challenge plus lats.", "Great mind-muscle link."],
          imageUrl: IMG.back,
        }),
      ];
    case "straight-arm-pulldown":
      return [
        alt(exercise, "alt-dumbbell-pull-over", "Dumbbell Pullover", {
          beginnerWeight: "Light dumbbell",
          defaultWeightKg: 14,
          instructions: "Bench shoulder blades anchored arc weight overhead lengthen lats elbows soft.",
          demoUrl: yt("dumbbell pullover chest or lats beginner"),
          targetMuscle: "Lats, chest accessory",
          correctForm: ["Hips low stable.", "Breath diaphragmatic ribs quiet.", "Long range comfortable."],
          commonMistakes: ["Heavy weight shoulder discomfort.", "Bent elbows jerk.", "Excess arch lumbar."],
          beginnerTips: ["Feel lat lengthening.", "Use lighter endurance sets."],
          imageUrl: IMG.back,
        }),
        alt(exercise, "alt-ball-slam-sub", "Straight-Arm Lat Pushdown Plate Loaded", {
          beginnerWeight: "Light plate pulley mimic",
          defaultWeightKg: 10,
          instructions:
            "If cable busy use band anchored high straight-arm pull similar hip hinge arc thighs.",
          demoUrl: yt("straight arm resistance band lat pullover"),
          targetMuscle: "Lats",
          correctForm: ["Maintain rib position.", "Arms elongated.", "Control up phase."],
          commonMistakes: ["Squat squatting torso.", "Bending elbows excessively halfway.", "Rushing negatives."],
          beginnerTips: ["Portable alternative.", "Chase tension not ego."],
          imageUrl: IMG.back,
        }),
      ];
    case "bicep-curl":
      return [
        alt(exercise, "alt-machine-preacher-lite", "Machine Preacher Curl", {
          beginnerWeight: "Light stack pin arm pad stable",
          defaultWeightKg: 12,
          instructions: "Arms rested curl isolating shortening ego sway opportunity.",
          demoUrl: yt("machine preacher curl form beginner"),
          targetMuscle: "Biceps",
          correctForm: ["Full lengthen stop before hyperextend pain.", "Wrist neutral.", "No shoulder lift-off."],
          commonMistakes: ["Grip too narrow strain.", "Rushing negatives.", "Cutting ROM top.", "Grip death squeeze."],
          beginnerTips: ["Strict curl pattern.", "Match dumbbell curls focus."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-concentration-curl", "Concentration Curl", {
          beginnerWeight: "Light dumbbell",
          defaultWeightKg: 8,
          instructions: "Seated elbow inside knee curling slow peak squeeze single arm symmetry.",
          demoUrl: yt("concentration curl dumbbell beginner"),
          targetMuscle: "Biceps",
          correctForm: ["Shoulder anchored low.", "Wrist aligned.", "Controlled negative."],
          commonMistakes: ["Swinging torso.", "Elbow floating off thigh.", "Short ROM intentionally."],
          beginnerTips: ["Great isolation beginner.", "Alternate arms fair."],
          imageUrl: IMG.arms,
        }),
      ];
    case "preacher-curl":
      return [
        alt(exercise, "alt-spider-curl-lite", "Incline Bench Spider Curl", {
          beginnerWeight: "Light dumbbells chest on pad inclined",
          defaultWeightKg: 6,
          instructions: "Chest supported bench arms hang vertical curl emphasizing peak contraction.",
          demoUrl: yt("spider curl dumbbell form"),
          targetMuscle: "Biceps",
          correctForm: ["Shoulders externally rotated relaxed.", "No elbow lift-offs pad.", "Full extension cautious."],
          commonMistakes: ["Swinging elbows.", "Over arch neck.", "Shortened lowering."],
          beginnerTips: ["Strict alternative.", "Comfortable wrists."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-cable-preacher-lite", "Cable Preacher Curl", {
          beginnerWeight: "Low pulley preacher bench",
          defaultWeightKg: 12,
          instructions: "Constant tension preacher bench curl elbows stable pad anchored.",
          demoUrl: yt("cable preacher curl form beginner"),
          targetMuscle: "Biceps",
          correctForm: ["Pad height mid chest.", "Wrist stacked.", "No hip thrust."],
          commonMistakes: ["Grip misalignment.", "Momentum partials.", "Shrug excessively."],
          beginnerTips: ["Joint friendly endurance.", "Match ez bar preacher load lighter."],
          imageUrl: IMG.arms,
        }),
      ];
    case "assisted-dips":
      return [
        alt(exercise, "alt-bench-dip-lite", "Bench Dip (Controlled)", {
          beginnerWeight: "Bodyweight benches",
          defaultWeightKg: 0,
          instructions:
            "Hands behind hips on bench toes forward lower until comfortable shoulder flexion modest.",
          demoUrl: yt("bench tricep dip beginner proper"),
          targetMuscle: "Triceps, chest accessory",
          correctForm: ["Shoulders softly depressed externally rotated mild.", "Elbows angled back mildly.", "No dive."],
          commonMistakes: ["Going too deep impingement sensation.", "Shrug excessively.", "Knee bounce excessively."],
          beginnerTips: ["Stop before shoulder pinch.", "Use dip machine fatigue alternative."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-close-pushup-dip-lite", "Close-Grip Push-Up", {
          beginnerWeight: "Bodyweight diamonds optional",
          defaultWeightKg: 0,
          instructions: "Hands narrower elbows tucked targeting triceps similar dip finish lockout torso tight.",
          demoUrl: yt("close grip push up triceps beginner"),
          targetMuscle: "Triceps, chest",
          correctForm: ["Hands stacked under sternum-ish comfortable.", "Plank ribs quiet.", "Elbows skim ribs."],
          commonMistakes: ["Leading with head.", "Hips sinking.", "Flared elbows wide excessively."],
          beginnerTips: ["Great no machine option.", "Incline regress difficulty."],
          imageUrl: IMG.arms,
        }),
      ];
    case "rope-pushdown":
      return [
        alt(exercise, "alt-vbar-pushdown", "V-Bar Tricep Pushdown", {
          beginnerWeight: "Similar stack notch",
          defaultWeightKg: 17.5,
          instructions: "Neutral ergonomics handle elbows pinned extension lock smooth.",
          demoUrl: yt("v bar tricep pushdown form"),
          targetMuscle: "Triceps",
          correctForm: ["Vertical torso mildly forward ok.", "Wrist stacked.", "No shoulder roll."],
          commonMistakes: ["Swinging lumbar.", "Elbows drifting.", "Incomplete extension."],
          beginnerTips: ["Often stable wrists alternative.", "Match rope loading."],
          imageUrl: IMG.arms,
        }),
        alt(exercise, "alt-kickback-lite-cable-alt", "Cable Tricep Kickback", {
          beginnerWeight: "Light single pulley hinge",
          defaultWeightKg: 7.5,
          instructions:
            "Hinge torso elbow pinned rib height extend forearm squeezing horseshoe lockout torso stable.",
          demoUrl: yt("tricep kickback cable form beginner"),
          targetMuscle: "Triceps",
          correctForm: ["Upper arm parallel floor.", "No torso rotation jerk.", "Control negative deeply."],
          commonMistakes: ["Swinging torso.", "Elbow drooping excessively.", "Over heavy stack."],
          beginnerTips: ["Strict pump finisher.", "Fix imbalance single arm alternating."],
          imageUrl: IMG.arms,
        }),
      ];
    case "arnold-press":
      return [
        alt(exercise, "alt-neutral-db-ohp", "Neutral-Grip Shoulder Press", {
          beginnerWeight: "Palms-facing start rotate none",
          defaultWeightKg: 6,
          instructions: "Dumbbells neutral entire press minimizing rotation demand friendly wrists.",
          demoUrl: yt("neutral grip dumbbell overhead press beginner"),
          targetMuscle: "Shoulders",
          correctForm: ["Ribs anchored.", "Straight path vertically.", "No neck craned."],
          commonMistakes: ["Over arch excessively.", "Shrug excessively.", "Asymmetric ascent."],
          beginnerTips: ["When rotation bothers shoulders.", "Simplifies motor pattern."],
          imageUrl: IMG.shoulders,
        }),
        alt(exercise, "alt-upright-db-row-lite", "Upright Row Substitute Plate Front Raise Combo", {
          beginnerWeight: "Light dumbbells frontal raise alternating",
          defaultWeightKg: 5,
          instructions:
            "Controlled front raises stopping shoulder height wrists neutral substitutes press rotation load.",
          demoUrl: yt("standing dumbbell front raise beginner"),
          targetMuscle: "Front delts",
          correctForm: ["Soft elbows bent.", "No torso swing jerk.", "Lower slowly.", "Pain free range."],
          commonMistakes: ["Shrugs excessively dominating.", "Lifting excessively high irritating.", "Grip too narrow wrists."],
          beginnerTips: ["Use lower weight.", "Prefer pain free alternative."],
          imageUrl: IMG.shoulders,
        }),
      ];
    case "face-pull":
      return [
        alt(exercise, "alt-reverse-fly-lite", "Reverse Pec Deck / Rear Delt Fly", {
          beginnerWeight: "Light stack pin elbows soft",
          defaultWeightKg: 10,
          instructions: "Seated elbows high path opening arms targeting rear delts external rotation synergy.",
          demoUrl: yt("reverse pec deck machine form beginner"),
          targetMuscle: "Rear delts",
          correctForm: ["Avoid excessive trap shrug.", "Control stretch.", "Stop before snap pain externally."],
          commonMistakes: ["Grip too low.", "Momentum slam.", "Thoracic flexion slump excessively."],
          beginnerTips: ["Similar posture benefit.", "Constant tension iso."],
          imageUrl: IMG.shoulders,
        }),
        alt(exercise, "alt-band-face-pull-lite", "Band Face Pull Anchored Eye Level", {
          beginnerWeight: "Light miniband tubular",
          defaultWeightKg: 0,
          instructions: "Split ends pull face height external rotate finish thumbs rear pockets cue.",
          demoUrl: yt("band face pulls form posture"),
          targetMuscle: "Rear delts, upper back",
          correctForm: ["Elbows high track.", "Ribs anchored.", "String controlled.", "Pain free externally."],
          commonMistakes: ["Squat torso momentum.", "Elbows dipping excessively low excessively.", "Shrug dominates."],
          beginnerTips: ["Portable hotel gym fallback.", "Match cable stimulus lighter."],
          imageUrl: IMG.shoulders,
        }),
      ];
    case "walking-lunges":
      return [
        alt(exercise, "alt-reverse-lunge-lite", "Reverse Lunge in Place", {
          beginnerWeight: "Bodyweight or light dumbbells",
          defaultWeightKg: 6,
          instructions: "Step back lowering vertical shin front softer knee shear short steps balance friendly.",
          demoUrl: yt("reverse lunge dumbbell beginner form"),
          targetMuscle: "Quads, glutes",
          correctForm: ["Torso upright mild forward lean knee tracking.", "Back knee nearly taps floor softly.", "Push floor front heel."],
          commonMistakes: ["Tiny step balance loss.", "Knee collapsing valgus jerk.", "Torso collapsing forward jerk."],
          beginnerTips: ["Often easier knees than walking.", "Hallway railing optional lightly."],
          imageUrl: IMG.legs,
        }),
        alt(exercise, "alt-leg-press-walking-alt", "Leg Press Uni-Lateral Mimic Alternate Press", {
          beginnerWeight: "Light alternating single leg sled",
          defaultWeightKg: 35,
          instructions:
            "If walking balance tough alternate single leg sled presses resembling split squat loading pattern.",
          demoUrl: yt("single leg leg press alternating"),
          targetMuscle: "Quads, glutes",
          correctForm: ["Even foot tripod.", "Knee tracks toe.", "Controlled depth pelvic neutral quietly."],
          commonMistakes: ["Pelvis twisting excessively.", "Heel unloading excessively.", "Rushing negatives."],
          beginnerTips: ["Machine stable alternative.", "Volume similar mindfully."],
          imageUrl: IMG.legs,
        }),
      ];
    case "glute-bridge":
      return [
        alt(exercise, "alt-single-leg-glute-bridge", "Single-Leg Glute Bridge", {
          beginnerWeight: "Bodyweight alternating",
          defaultWeightKg: 0,
          instructions:
            "One foot planted other knee tucked press hips square avoiding rotation compensations trunk quiet.",
          demoUrl: yt("single leg glute bridge form beginner"),
          targetMuscle: "Glutes, hamstrings",
          correctForm: ["Ribs anchored.", "Posterior pelvic tilt mildly at top softly.", "No neck crane excessively."],
          commonMistakes: ["Hamstring cramping excessively early hydrate.", "Hyper arch excessively.", "Dropping hips rushed."],
          beginnerTips: ["Progress unilateral endurance.", "Regress alternating partial holds."],
          imageUrl: IMG.legs,
        }),
        alt(exercise, "alt-hip-thrust-lite-alt", "Hip Thrust Bench Supported", {
          beginnerWeight: "Barbell padded optional light",
          defaultWeightKg: 20,
          instructions: "Upper back bench feet planted ribs quiet drive hips vertical squeezing glutes top pause.",
          demoUrl: yt("barbell hip thrust beginner form"),
          targetMuscle: "Glutes",
          correctForm: ["Chin neutral.", "Vertical shin roughly at top optional.", "Knees stacked feet.", "Controlled negative."],
          commonMistakes: ["Hyperextending lumbar excessively at lockout jerk.", "Knees caving jerk.", "Heels lifting jerk."],
          beginnerTips: ["More load progression path.", "Use pad comfort barbell softly."],
          imageUrl: IMG.legs,
        }),
      ];
    case "leg-curl":
      return [
        alt(exercise, "alt-nordic-ham-lite-swap", "Stability Ball Leg Curl Bridge", {
          beginnerWeight: "Bodyweight hips elevated ball",
          defaultWeightKg: 0,
          instructions: "Bridging hips feet on ball curling knees toward torso hamstring controlled anti-extension trunk.",
          demoUrl: yt("swiss ball leg curl beginner"),
          targetMuscle: "Hamstrings, glutes",
          correctForm: ["Keep hips lifted between reps calmly.", "Heels dorsiflex anchored.", "No excessive low back dipping excessively."],
          commonMistakes: ["Foot slipping ball.", "Dropping butt excessively.", "Rushing curls jerk."],
          beginnerTips: ["Bodyweight posterior chain option.", "Use mat barefoot grip optional thoughtfully."],
          imageUrl: IMG.legs,
        }),
        alt(exercise, "alt-seated-leg-curl-swap-alt", "Seated Hamstring Curl", {
          beginnerWeight: "Light stack seated pad",
          defaultWeightKg: 18,
          instructions: "Hips flexed torso upright pad pinning thighs curl ankles pad toward glutes eccentric control.",
          demoUrl: yt("seated hamstring curl form beginner"),
          targetMuscle: "Hamstrings",
          correctForm: ["Toes dorsiflex optional.", "No lifting hips pad excessively.", "Full stretch top calm breath."],
          commonMistakes: ["Grip handles yanking jerk excessively.", "Shortened ROM jerk.", "Rushing excessively."],
          beginnerTips: ["Different bias vs lying.", "Comfort knee friendly sometimes thoughtfully."],
          imageUrl: IMG.legs,
        }),
      ];
    case "deadlift":
      return [
        alt(exercise, "alt-trap-bar-deadlift-lite", "Trap Bar Deadlift", {
          beginnerWeight: "Bar + approachable load",
          defaultWeightKg: 25,
          instructions: "Neutral grips inside frame knees forward torso upright friendly learning hinge pattern powerfully.",
          demoUrl: yt("trap bar deadlift beginner form"),
          targetMuscle: "Glutes, hamstrings, back",
          correctForm: ["Brace before pull quietly.", "Stack lats elbows locked externally softly.", "Lockout hips glutes calmly."],
          commonMistakes: ["Rounding under fatigue excessively.", "Hips rising early jerk jerk.", "Bouncing excessively."],
          beginnerTips: ["Often easier lumbar learning.", "Grip height neutral wrists thoughtfully."],
          imageUrl: IMG.back,
        }),
        alt(exercise, "alt-rack-pull-lite-alt", "Rack Pull from Pins (Mid-Shin)", {
          beginnerWeight: "Bar resting safeties moderately",
          defaultWeightKg: 30,
          instructions: "Shortened ROM emphasizing lockout torso strength building confidence pulling heavy safely pinned.",
          demoUrl: yt("rack pull beginner form pinned"),
          targetMuscle: "Back, glutes",
          correctForm: ["Bar over mid-foot calmly.", "Lats engaged shoulders depressed softly.", "Hips hinge finish quietly."],
          commonMistakes: ["Grip too wide jerk.", "Hitting thighs excessively jerk.", "Losing brace between reps calmly."],
          beginnerTips: ["Reduce low back shear early weeks thoughtfully.", "Match deadlift grooves patiently."],
          imageUrl: IMG.back,
        }),
      ];
    case "plank":
      return [
        alt(exercise, "alt-plank-knee-hold-lite", "Knee Plank Hold", {
          beginnerWeight: "Bodyweight",
          defaultWeightKg: 0,
          instructions:
            "Plank shortened lever knees ground shoulders over elbows wrists optional stacked fists wrists neutral wrists optional.",
          demoUrl: yt("modified plank on knees beginner"),
          targetMuscle: "Core",
          correctForm: ["Quads squeezed glutes calmly.", "Ribs pulled gently toward pelvis calmly.", "Breathe diaphragmatic calmly."],
          commonMistakes: ["Leading with butt excessively elevated excessively excessively.", "Dropping lumbar excessively jerk.", "Holding breath excessively jerk."],
          beginnerTips: ["Progress time before full plank calmly.", "Shoulder friendly wrists optional calmly."],
          imageUrl: IMG.core,
        }),
        alt(exercise, "alt-dead-bug-hold-lite", "Dead Bug Iso Hold Arms Only", {
          beginnerWeight: "Bodyweight",
          defaultWeightKg: 0,
          instructions:
            "Back pinned floor arms lifted knees 90 statically breathing rib control anti-extension calmly.",
          demoUrl: yt("dead bug hold exercise iso"),
          targetMuscle: "Core stabilizers",
          correctForm: ["Low back glued floor calmly gently.", "Exhale on extension calmly.", "No rib flare excessively jerk calmly."],
          commonMistakes: ["Low back arches excessively jerk calmly.", "Neck cranes excessively calmly.", "Breath holding jerk calmly."],
          beginnerTips: ["Great plank regression pattern calmly.", "Match brace demand calmly thoughtfully."],
          imageUrl: IMG.core,
        }),
      ];
    case "dead-bug":
      return [
        alt(exercise, "alt-deadbug-band-lite", "Dead Bug with Band Overhead", {
          beginnerWeight: "Light miniband wrists",
          defaultWeightKg: 0,
          instructions: "Band tension overhead increases serratus core demand slowly alternate limbs smoothly.",
          demoUrl: yt("dead bug band overhead core"),
          targetMuscle: "Core",
          correctForm: ["Maintain pressure back floor calmly.", "Slow tempo quietly.", "Small controlled ranges calmly."],
          commonMistakes: ["Arching off floor jerk.", "Rushing reps jerk.", "Neck straining calmly."],
          beginnerTips: ["Low load variability calmly.", "Use band light patiently."],
          imageUrl: IMG.core,
        }),
        alt(exercise, "alt-bird-dog-lite", "Bird Dog", {
          beginnerWeight: "Bodyweight alternating",
          defaultWeightKg: 0,
          instructions: "Quadruped opposite arm-leg reach anti-rotation lumbar quiet trunk stable breathing rhythmic calmly.",
          demoUrl: yt("bird dog exercise beginner physical therapy core"),
          targetMuscle: "Low back endurance, core",
          correctForm: ["Hips square camera calm.", "Reach long not high jerk.", "Pause top balanced calmly."],
          commonMistakes: ["Rotating hips excessively jerk.", "Dumping into low back arch excessively jerk.", "Rushing tempo jerk."],
          beginnerTips: ["Great dead-bug sibling pattern calmly.", "Progress holds seconds calmly thoughtfully."],
          imageUrl: IMG.core,
        }),
      ];
    default:
      return [];
  }
}
