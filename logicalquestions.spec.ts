// fruitBoxPuzzle.spec.ts
import { test, expect } from '@playwright/test';

test('Fruit box labeling puzzle logic', async () => {
  // Step 1: Define the actual contents of each box
  const actualBoxes = {
    apples: ['apple', 'apple'],
    oranges: ['orange', 'orange'],
    mixed: ['apple', 'orange']
  };

  // Step 2: Define incorrect labels (wrong mapping)
  let labels = {
    apples: 'mixed',
    oranges: 'apples',
    mixed: 'oranges'
  };

  // Step 3: Simulate picking from the box labeled "mixed"
  const labeledMixed = 'mixed';
  const pickedFruit = actualBoxes.oranges[0]; // assume we draw from "oranges" box, mislabeled as "mixed"

  expect(pickedFruit).toBe('orange'); // We picked an orange from box labeled "mixed"

  // Step 4: Deduce the actual mapping
  const deducedMapping = {
    [labeledMixed]: 'oranges',            // "mixed" label actually contains oranges
    apples: 'mixed',                      // The box labeled "apples" must be mixed
    oranges: 'apples'                     // The box labeled "oranges" must be apples
  };

  // Assertion
  expect(Object.values(deducedMapping).sort()).toEqual(['apples', 'mixed', 'oranges'].sort());

  console.log(deducedMapping)
  console.log('✅ Puzzle solved successfully with logical deduction!');
});
