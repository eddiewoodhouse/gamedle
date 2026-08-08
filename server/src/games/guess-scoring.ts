import { VideoGame, VideoGamePlatform } from './video-game.model';

export type Verdict = 'correct' | 'close' | 'wrong';

export interface GuessComparison {
  releaseYear: Verdict;
  genre: Verdict;
  platforms: Verdict;
  localMaximumPlayers: Verdict;
}

export function scoreGuess(guess: VideoGame, answer: VideoGame): GuessComparison {
  return {
    releaseYear: compareWithinRange(guess.releaseYear, answer.releaseYear, 4),
    genre: guess.genre === answer.genre ? 'correct' : 'wrong',
    platforms: comparePlatforms(guess.platforms, answer.platforms),
    localMaximumPlayers: compareWithinRange(
      guess.localMaximumPlayers,
      answer.localMaximumPlayers,
      4
    ),
  };
}

function compareWithinRange(guessValue: number, answerValue: number, closeRange: number): Verdict {
  if (guessValue === answerValue) return 'correct';
  if (Math.abs(guessValue - answerValue) < closeRange) return 'close';
  return 'wrong';
}

function comparePlatforms(
  guessPlatforms: VideoGamePlatform[],
  answerPlatforms: VideoGamePlatform[]
): Verdict {
  const overlap = answerPlatforms.filter((platform) => guessPlatforms.includes(platform));
  if (overlap.length === answerPlatforms.length) return 'correct';
  if (overlap.length > 0) return 'close';
  return 'wrong';
}
