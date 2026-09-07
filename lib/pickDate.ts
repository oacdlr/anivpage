export type DateIdea = {
  title: string;
  mood: string;
  location: string;
  budget: string;
  description?: string;
};

export type DateAnswers = {
  mood: string;
  location: string;
  budget: string;
};

function randomOf<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Chooses a date idea for the answers she gave.
 *
 * It tries hardest first and then relaxes, so it always returns something:
 *   1. an idea matching all three answers
 *   2. an idea matching at least two
 *   3. an idea matching at least one
 *   4. any idea at all
 *
 * Ideas are allowed to repeat — nothing is tracked between visits.
 */
export function pickDate(
  ideas: DateIdea[],
  answers: DateAnswers,
): DateIdea | null {
  if (ideas.length === 0) return null;

  const score = (idea: DateIdea) =>
    Number(idea.mood === answers.mood) +
    Number(idea.location === answers.location) +
    Number(idea.budget === answers.budget);

  for (const threshold of [3, 2, 1]) {
    const matches = ideas.filter((idea) => score(idea) >= threshold);
    if (matches.length > 0) return randomOf(matches);
  }

  return randomOf(ideas);
}
