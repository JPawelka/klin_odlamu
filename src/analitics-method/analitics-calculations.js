
export default function AnaliticsCalculations(height, density, phi, c) {
  if(height === '') {
    return density * phi * c;
  } else {
    const alpha = (45 + phi/2)
    const degreesToRadians = alpha * Math.PI / 180;
    const result = height/ Math.tan(degreesToRadians);
    function roundToTwo(num) {
        return Math.round(num * 100) / 100;
      }
    return roundToTwo(result);
  }
}