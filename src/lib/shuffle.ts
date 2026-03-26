/**
 * Fisher-Yates shuffle — returns array of shuffled indices [0,1,2,3]
 * Used to randomize option display order per question
 */
export function createShuffleOrder(length: number = 4): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

/**
 * Generate shuffle maps for all questions in a topic
 * Returns: shuffleMap[questionIndex] = [shuffled option indices]
 */
export function generateShuffleMap(questionCount: number): number[][] {
  return Array.from({ length: questionCount }, () => createShuffleOrder());
}
