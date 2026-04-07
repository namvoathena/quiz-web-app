export function calculateResults(scoring, totalQuestions, startTime, endTime) {
  const elapsedMs = endTime - startTime;
  const elapsedSeconds = Math.round(elapsedMs / 1000);

  return {
    score: scoring.getScore(),
    accuracy: scoring.getAccuracy(totalQuestions),
    totalTime: elapsedSeconds,
  };
}

export function formatResults(results) {
  return {
    score: String(results.score),
    accuracy: `${results.accuracy}%`,
    totalTime: `${results.totalTime}s`,
  };
}
