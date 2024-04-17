const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const score = document.getElementById("score");
const status = document.getElementById("status");
const idealMin = document.getElementById("ideal-min");
const idealMax = document.getElementById("ideal-max");
const imperialFields = document.getElementById("imperial-fields");
const metricFields = document.getElementById("metric-fields");
const formWelcome = document.querySelector(".form--welcome");
const formResult = document.querySelector(".form--result");

const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const stones = document.getElementById("stones");
const pounds = document.getElementById("pounds");

let unit = "metric";

metric.addEventListener("click", (e) => {
  unit = "metric";
  imperialFields.style.display = "none";
  metricFields.style.display = "grid";
  displayWelcomeMessage();
});

imperial.addEventListener("click", (e) => {
  unit = "imperial";
  imperialFields.style.display = "block";
  metricFields.style.display = "none";
  displayWelcomeMessage();
});

height.addEventListener("keyup", calculate);
weight.addEventListener("keyup", calculate);
feet.addEventListener("keyup", calculate);
inches.addEventListener("keyup", calculate);
stones.addEventListener("keyup", calculate);
pounds.addEventListener("keyup", calculate);

imperialFields.style.display = "none";

function calculate() {
  if (unit === "imperial") {
    if (
      feet.value !== "" &&
      inches.value !== "" &&
      stones.value !== "" &&
      pounds.value !== ""
    ) {
      const weightKg =
        (Number(stones.value) * 14 + Number(pounds.value)) * 0.453592;
      const heightCm = (Number(feet.value) * 12 + Number(inches.value)) * 2.54;

      const bmi = getBmi(weightKg, heightCm);
      displayBmiResults(bmi, heightCm);
    }
  }

  if (unit === "metric") {
    if (weight.value !== "" && height.value !== "") {
      const bmi = getBmi(weight.value, height.value);
      displayBmiResults(bmi, height.value);
    }
  }
}

function displayWelcomeMessage() {
  formWelcome.style.display = "block";
  formResult.style.display = "none";
}

function displayBmiResults(bmi, height) {
  score.textContent = bmi;
  formWelcome.style.display = "none";
  formResult.style.display = "grid";

  let statusStr = getResultString(bmi);

  status.textContent = statusStr;
  idealMin.textContent = roundToOneDecimal(getMinIdealWeight(height)) + "kg";
  idealMax.textContent = roundToOneDecimal(getMaxIdealWeight(height)) + "kg";
}

function getBmi(weight, height) {
  return roundToOneDecimal(weight / ((height / 100) * (height / 100)));
}

function getMinIdealWeight(height) {
  return 18.5 * ((height / 100) * (height / 100));
}

function getMaxIdealWeight(height) {
  return 24.9 * ((height / 100) * (height / 100));
}

function roundToOneDecimal(number) {
  return Math.round(number * 10) / 10;
}

function getResultString(bmi) {
  let statusStr;

  switch (true) {
    case bmi < 18.5:
      statusStr = "Underweight";
      break;
    case bmi >= 18.5 && bmi <= 24.9:
      statusStr = "Healthy weight";
      break;
    case bmi >= 25 && bmi <= 29.9:
      statusStr = "Overweight";
      break;
    default:
      statusStr = "Obese";
  }

  return statusStr;
}
