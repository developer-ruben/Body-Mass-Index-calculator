class BMICalculator {
  constructor() {
    // UI Elements
    this.metricRadio = document.getElementById("metric");
    this.imperialRadio = document.getElementById("imperial");

    this.metricHeightInput = document.getElementById("metric-height");
    this.metricWeightInput = document.getElementById("metric-weight");

    this.imperialHeight1Input = document.getElementById("imperial-height-1");
    this.imperialHeight2Input = document.getElementById("imperial-height-2");
    this.imperialWeight1Input = document.getElementById("imperial-weight-1");
    this.imperialWeight2Input = document.getElementById("imperial-weight-2");

    this.bmiEl = document.getElementById("bmi");
    this.bmiTypeEl = document.getElementById("bmi-type");
    this.bmiIdealWeight = document.getElementById("bmi-ideal-weight");

    this.metricFields = document.getElementById("metric-fields");
    this.imperialFields = document.getElementById("imperial-fields");

    this.startScreen = document.getElementById("start");
    this.scoreScreen = document.getElementById("score");

    this.type = "metric";

    this.init();
  }

  init() {
    // Hide score on load
    this.hideScore();
    this.imperialFields.style.display = "none";

    // Event Listeners
    this.metricHeightInput.addEventListener("keyup", () =>
      this.handleMetricCalculation()
    );
    this.metricWeightInput.addEventListener("keyup", () =>
      this.handleMetricCalculation()
    );

    [
      this.imperialHeight1Input,
      this.imperialHeight2Input,
      this.imperialWeight1Input,
      this.imperialWeight2Input,
    ].forEach((input) =>
      input.addEventListener("keyup", () => this.handleImperialCalculation())
    );

    this.metricRadio.addEventListener("click", () =>
      this.toggleMeasurementType("metric")
    );
    this.imperialRadio.addEventListener("click", () =>
      this.toggleMeasurementType("imperial")
    );
  }

  getBmiType(bmi) {
    if (bmi < 18.5) return "underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "healthy";
    if (bmi >= 25 && bmi <= 29.9) return "overweight";
    return "obese";
  }

  convertKgToStLbs(kg) {
    const stones = Math.floor(kg / 6.35029);
    const pounds = Math.round((kg % 6.35029) / 0.453592);
    return { stones, pounds };
  }

  isValidInput(...values) {
    return values.every((value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    });
  }

  updateBmiDisplay(bmi, bmiType, idealWeightText) {
    this.bmiEl.textContent = bmi;
    this.bmiTypeEl.textContent = bmiType;
    this.bmiIdealWeight.textContent = idealWeightText;
  }

  handleMetricCalculation() {
    const rawHeight = this.metricHeightInput.value;
    const rawWeight = this.metricWeightInput.value;

    // Validate raw inputs first to catch empty, zero, or invalid strings
    if (!this.isValidInput(rawHeight, rawWeight)) return;

    const height = parseFloat(rawHeight) / 100;
    const weight = parseFloat(rawWeight);

    if (!this.isValidInput(height, weight)) return;

    const bmi = this.calculateBmi(weight, height);
    this.showScore();

    const idealWeight = this.getIdealWeight(height);
    const bmiText = `${idealWeight.min}kgs - ${idealWeight.max}kgs`;

    this.updateBmiDisplay(bmi, this.getBmiType(bmi), bmiText);
  }

  handleImperialCalculation() {
    const heightFeet = parseFloat(this.imperialHeight1Input.value);
    const heightInches = parseFloat(this.imperialHeight2Input.value);
    const weightStones = parseFloat(this.imperialWeight1Input.value);
    const weightPounds = parseFloat(this.imperialWeight2Input.value);

    if (
      !this.isValidInput(heightFeet, heightInches, weightStones, weightPounds)
    )
      return;

    const weightKilograms = weightStones * 6.35029 + weightPounds * 0.453592;
    const heightMeters = heightFeet * 0.3048 + heightInches * 0.0254;

    const bmi = this.calculateBmi(weightKilograms, heightMeters);
    this.showScore();

    const idealWeight = this.getIdealWeight(heightMeters);
    const idealWeightMinImperial = this.convertKgToStLbs(idealWeight.min);
    const idealWeightMaxImperial = this.convertKgToStLbs(idealWeight.max);

    const bmiText = `${idealWeightMinImperial.stones}st ${idealWeightMinImperial.pounds}lbs - ${idealWeightMaxImperial.stones}st ${idealWeightMaxImperial.pounds}lbs`;

    this.updateBmiDisplay(bmi, this.getBmiType(bmi), bmiText);
  }

  calculateBmi(kg, m) {
    return parseFloat((kg / (m * m)).toFixed(1));
  }

  showScore() {
    this.startScreen.style.display = "none";
    this.scoreScreen.style.display = "flex";
  }

  hideScore() {
    this.startScreen.style.display = "block";
    this.scoreScreen.style.display = "none";
  }

  getIdealWeight(height) {
    return {
      min: (18.5 * (height * height)).toFixed(1),
      max: (24.9 * (height * height)).toFixed(1),
    };
  }

  toggleMeasurementType(newType) {
    if (this.type !== newType) {
      this.hideScore();
      this.type = newType;
    }

    this.metricFields.style.display = newType === "metric" ? "flex" : "none";
    this.imperialFields.style.display =
      newType === "imperial" ? "flex" : "none";

    this.metricHeightInput.value = "";
    this.metricWeightInput.value = "";

    [
      this.imperialHeight1Input,
      this.imperialHeight2Input,
      this.imperialWeight1Input,
      this.imperialWeight2Input,
    ].forEach((input) => (input.value = ""));
  }
}

// Start de BMI Calculator
document.addEventListener("DOMContentLoaded", () => new BMICalculator());
