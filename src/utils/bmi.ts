export function calculateBmi(weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm) {
    return 0;
  }

  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBmiCategory(bmi: number): string {
  if (bmi === 0) return "Add height and weight";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy range";
  if (bmi < 30) return "Overweight";
  return "Obesity range";
}

export function getIdealWeightKg(heightCm: number, targetBmi = 22): number {
  if (!heightCm) return 0;
  const heightM = heightCm / 100;
  return targetBmi * heightM * heightM;
}

export function getHealthyWeightRangeKg(heightCm: number): { minKg: number; maxKg: number } {
  if (!heightCm) return { minKg: 0, maxKg: 0 };
  const heightM = heightCm / 100;
  return {
    minKg: 18.5 * heightM * heightM,
    maxKg: 24.9 * heightM * heightM,
  };
}
