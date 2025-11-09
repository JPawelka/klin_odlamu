
export default function Calculations(inputHeight, factorForCalculations) {
  console.log(`Wysokość klinu: ${inputHeight}`);
  console.log(`Współczynnik: ${factorForCalculations}`);
  
  let safeDistance = inputHeight *factorForCalculations[0]+0.6;
  console.log(`Bezpieczna odległość: ${safeDistance}`);
{factorForCalculations.length === 0 && (console.log('Nie wybrano rodzaju gruntu'))}
{factorForCalculations.length > 0 && (safeDistance = inputHeight *factorForCalculations[0]+0.6)}
}



  
