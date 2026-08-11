import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreGuess } from './guess-scoring';
import { VideoGame } from './video-game.model';

function game(overrides: Partial<VideoGame>): VideoGame {
  return {
    id: 1,
    title: 'Test Game',
    releaseYear: 2000,
    genres: ['Action'],
    platforms: ['PC'],
    localMaximumPlayers: 1,
    developer: 'Test Studio',
    franchise: null,
    perspective: '3D',
    ...overrides,
  };
}

test('release year: exact match is correct with no direction', () => {
  const { releaseYear } = scoreGuess(game({ releaseYear: 2010 }), game({ releaseYear: 2010 }));
  assert.deepEqual(releaseYear, { verdict: 'correct', direction: null });
});

test('release year: within +/-3 is close, direction points at the answer', () => {
  const later = scoreGuess(game({ releaseYear: 2010 }), game({ releaseYear: 2013 }));
  assert.deepEqual(later.releaseYear, { verdict: 'close', direction: 'higher' });

  const earlier = scoreGuess(game({ releaseYear: 2010 }), game({ releaseYear: 2007 }));
  assert.deepEqual(earlier.releaseYear, { verdict: 'close', direction: 'lower' });
});

test('release year: beyond the window is wrong but still directional', () => {
  const { releaseYear } = scoreGuess(game({ releaseYear: 2010 }), game({ releaseYear: 2016 }));
  assert.deepEqual(releaseYear, { verdict: 'wrong', direction: 'higher' });
});

test('player count: tighter +/-1 window - diff of 1 is close, 2 is wrong', () => {
  const close = scoreGuess(game({ localMaximumPlayers: 2 }), game({ localMaximumPlayers: 3 }));
  assert.equal(close.localMaximumPlayers.verdict, 'close');
  assert.equal(close.localMaximumPlayers.direction, 'higher');

  const wrong = scoreGuess(game({ localMaximumPlayers: 2 }), game({ localMaximumPlayers: 4 }));
  assert.equal(wrong.localMaximumPlayers.verdict, 'wrong');
});

test('genres: identical set is correct, ignoring order', () => {
  const { genres } = scoreGuess(
    game({ genres: ['Action', 'Adventure'] }),
    game({ genres: ['Adventure', 'Action'] })
  );
  assert.equal(genres, 'correct');
});

test('genres: partial overlap is close, disjoint is wrong', () => {
  const partial = scoreGuess(
    game({ genres: ['Action', 'Puzzle'] }),
    game({ genres: ['Action', 'Adventure'] })
  );
  assert.equal(partial.genres, 'close');

  const disjoint = scoreGuess(game({ genres: ['Racing'] }), game({ genres: ['Puzzle'] }));
  assert.equal(disjoint.genres, 'wrong');
});

test('platforms: a superset guess is NOT correct (the old bug)', () => {
  // Guess spans PlayStation+PC; answer is PlayStation-only.
  const { platforms } = scoreGuess(
    game({ platforms: ['PlayStation', 'PC'] }),
    game({ platforms: ['PlayStation'] })
  );
  assert.equal(platforms, 'close', 'superset should be close, not correct');
});

test('platforms: identical set is correct; no overlap is wrong', () => {
  const identical = scoreGuess(
    game({ platforms: ['PC', 'Xbox'] }),
    game({ platforms: ['Xbox', 'PC'] })
  );
  assert.equal(identical.platforms, 'correct');

  const none = scoreGuess(game({ platforms: ['NES'] }), game({ platforms: ['PC'] }));
  assert.equal(none.platforms, 'wrong');
});

test('developer: exact match only', () => {
  const hit = scoreGuess(game({ developer: 'Nintendo' }), game({ developer: 'Nintendo' }));
  assert.equal(hit.developer, 'correct');

  const miss = scoreGuess(game({ developer: 'Nintendo' }), game({ developer: 'Capcom' }));
  assert.equal(miss.developer, 'wrong');
});

test('franchise: two nulls are neutral, never correct', () => {
  const { franchise } = scoreGuess(game({ franchise: null }), game({ franchise: null }));
  assert.equal(franchise, 'neutral');
});

test('franchise: matching names correct; one null is wrong', () => {
  const match = scoreGuess(game({ franchise: 'Mario' }), game({ franchise: 'Mario' }));
  assert.equal(match.franchise, 'correct');

  const oneNull = scoreGuess(game({ franchise: 'Mario' }), game({ franchise: null }));
  assert.equal(oneNull.franchise, 'wrong');
});

test('perspective: nulls neutral, equal correct, differ wrong', () => {
  assert.equal(
    scoreGuess(game({ perspective: null }), game({ perspective: null })).perspective,
    'neutral'
  );
  assert.equal(
    scoreGuess(game({ perspective: '2D' }), game({ perspective: '2D' })).perspective,
    'correct'
  );
  assert.equal(
    scoreGuess(game({ perspective: '2D' }), game({ perspective: 'First-person' })).perspective,
    'wrong'
  );
});
