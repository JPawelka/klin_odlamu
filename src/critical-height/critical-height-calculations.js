export default function CriticalHeightCalculations(gamma, phi, c) {
    const degreesToRadians = (deg) => deg * (Math.PI / 180);
    
    const angle1 = 45 - phi / 2;
    const angleRad1 = degreesToRadians(angle1);
    const Hkr = (4 * c) / (gamma * Math.tan(angleRad1));
  
    const angle2 = 45 + phi / 2;
    const angleRad2 = degreesToRadians(angle2);
    const L = Hkr / Math.tan(angleRad2); 
    
    function roundToTwo(num) {
      return Math.round(num * 100) / 100;
    }
    
    return {
      hkr: roundToTwo(Hkr),
      l: roundToTwo(L)
    };
  }