export default function Calculations(inputHeight, factorForCalculations) {
  console.log(`Wysokość klinu: ${inputHeight}`);
  console.log(`Współczynnik: ${factorForCalculations}`);
  
  let safeDistance;
  if (factorForCalculations.length === 0) {
    console.log('Nie wybrano rodzaju gruntu');
      safeDistance = 0; 
    } else {
    const height = parseFloat(inputHeight);
    const factor = parseFloat(factorForCalculations[0]);
    safeDistance = height * factor + 0.6;
    console.log(`Bezpieczna odległość: ${safeDistance}`);
  }
  
  return safeDistance;
}



  
