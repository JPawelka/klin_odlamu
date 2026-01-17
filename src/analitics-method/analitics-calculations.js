export default function AnaliticsCalculations(height, phi) {
    const degreesToRadians = (deg) => deg * (Math.PI / 180);
    const alpha = (45 + phi/2)
    const angleRad = degreesToRadians(alpha);
    const result = height/ Math.tan(angleRad);
    function roundToTwo(num) {
        return Math.round(num * 100) / 100;
      }
    return roundToTwo(result);
  
}








