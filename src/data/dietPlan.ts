import { DietPlan } from "../types";

export const dietPlans: DietPlan[] = [
  {
    id: "fat-loss",
    title: "Fat Loss Indian Plan",
    goal: "High protein, controlled portions, simple daily meals.",
    caloriesHint: "Aim for a small calorie deficit and 2 to 3 liters of water.",
    meals: [
      {
        label: "Breakfast",
        meal: "2 moong dal chillas with paneer stuffing + curd",
        proteinFocus: "Paneer and curd keep protein high without a heavy meal.",
      },
      {
        label: "Pre-workout",
        meal: "1 banana + black coffee or lemon water",
        proteinFocus: "Quick energy without feeling too full before training.",
      },
      {
        label: "Lunch",
        meal: "Grilled chicken or tofu, 1 cup rice, dal, salad",
        proteinFocus: "Lean protein plus rice gives steady energy and recovery support.",
      },
      {
        label: "Post-workout",
        meal: "Whey shake or milk + roasted chana",
        proteinFocus: "Fast protein after training with a light carb source.",
      },
      {
        label: "Dinner",
        meal: "2 rotis, mixed sabzi, dal, egg bhurji or paneer",
        proteinFocus: "Balanced dinner that is easy to repeat every day.",
      },
    ],
  },
  {
    id: "muscle-gain",
    title: "Lean Muscle Indian Plan",
    goal: "High protein with moderate carb increase for better training output.",
    caloriesHint: "Add one extra carb serving if weight and strength stall for 2 weeks.",
    meals: [
      {
        label: "Breakfast",
        meal: "Oats in milk, 2 whole eggs, 2 egg whites, peanut butter toast",
        proteinFocus: "A fuller breakfast supports harder morning or evening sessions.",
      },
      {
        label: "Pre-workout",
        meal: "Banana + peanut butter sandwich",
        proteinFocus: "Easy carbs help performance while peanut butter slows hunger.",
      },
      {
        label: "Lunch",
        meal: "Chicken curry or rajma, 2 cups rice, curd, cucumber salad",
        proteinFocus: "Bigger carb intake helps recovery and gradual strength gain.",
      },
      {
        label: "Post-workout",
        meal: "Whey shake + boiled potatoes or fruit",
        proteinFocus: "Protein and carbs together support muscle recovery.",
      },
      {
        label: "Dinner",
        meal: "2 to 3 rotis, paneer bhurji or fish, dal, sauteed vegetables",
        proteinFocus: "Keeps dinner simple while finishing the day with solid protein.",
      },
    ],
  },
];
