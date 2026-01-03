
export default function AnaliticsCalculations(height, density, phi, c) {
  if(height === '') {
    return density * phi * c;
  } else {
    return (height + density + phi + c)*0+1;
  }
}