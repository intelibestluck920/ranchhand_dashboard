const calcTHI = (t, h) => {
  return 0.8 * t + (h / 100) * (t - 14.4) + 46.4;
};

function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0; // Return 0 for an empty list to avoid division by zero
  }

  const sum = numbers.reduce((total, num) => total + num, 0);
  const average = sum / numbers.length;
  return average;
}

export { calcTHI, calculateAverage };
