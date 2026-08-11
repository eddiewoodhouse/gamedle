import { VideoGame } from './video-game.model';

export type Verdict = 'correct' | 'close' | 'wrong' | 'neutral';

/** Which way the answer lies relative to the guess, for numeric attributes. */
export type Direction = 'higher' | 'lower';

export interface NumericComparison {
  verdict: Verdict;
  /** null when exactly correct; otherwise the direction of the answer. */
  direction: Direction | null;
}

export interface GuessComparison {
  releaseYear: NumericComparison;
  localMaximumPlayers: NumericComparison;
  genres: Verdict;
  platforms: Verdict;
  developer: Verdict;
  franchise: Verdict;
  perspective: Verdict;
}

/** Per-field tolerance within which a non-exact numeric guess scores 'close'. */
const YEAR_CLOSE_WINDOW = 3;
const PLAYERS_CLOSE_WINDOW = 1;

export function scoreGuess(guess: VideoGame, answer: VideoGame): GuessComparison {
  return {
    releaseYear: compareNumeric(guess.releaseYear, answer.releaseYear, YEAR_CLOSE_WINDOW),
    localMaximumPlayers: compareNumeric(
      guess.localMaximumPlayers,
      answer.localMaximumPlayers,
      PLAYERS_CLOSE_WINDOW
    ),
    genres: compareSet(guess.genres, answer.genres),
    platforms: compareSet(guess.platforms, answer.platforms),
    developer: compareExact(guess.developer, answer.developer),
    franchise: compareNullable(guess.franchise, answer.franchise),
    perspective: compareNullable(guess.perspective, answer.perspective),
  };
}

function compareNumeric(
  guessValue: number,
  answerValue: number,
  closeWindow: number
): NumericComparison {
  if (guessValue === answerValue) return { verdict: 'correct', direction: null };
  const direction: Direction = answerValue > guessValue ? 'higher' : 'lower';
  const verdict: Verdict = Math.abs(guessValue - answerValue) <= closeWindow ? 'close' : 'wrong';
  return { verdict, direction };
}

/**
 * Symmetric set comparison: identical sets are 'correct', any shared member is
 * 'close', and no overlap is 'wrong'. Unlike the old superset test, a broad
 * multi-value guess no longer scores 'correct' against a narrow answer.
 */
function compareSet<T>(guessValues: T[], answerValues: T[]): Verdict {
  const guessSet = new Set(guessValues);
  const answerSet = new Set(answerValues);
  const shared = [...answerSet].filter((value) => guessSet.has(value));
  if (shared.length === answerSet.size && guessSet.size === answerSet.size) return 'correct';
  if (shared.length > 0) return 'close';
  return 'wrong';
}

function compareExact<T>(guessValue: T, answerValue: T): Verdict {
  return guessValue === answerValue ? 'correct' : 'wrong';
}

/**
 * Exact comparison for nullable attributes. Two nulls render 'neutral' — an
 * empty-vs-empty match must never masquerade as a real hit ('correct').
 */
function compareNullable<T>(guessValue: T | null, answerValue: T | null): Verdict {
  if (guessValue === null && answerValue === null) return 'neutral';
  return guessValue === answerValue ? 'correct' : 'wrong';
}
