import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GamesService } from './games.service';

test('pickRandom never returns the excluded id (no repeat answers)', () => {
  const service = new GamesService();
  const excluded = service.pickRandom().id;
  for (let i = 0; i < 500; i++) {
    assert.notEqual(service.pickRandom(excluded).id, excluded);
  }
});

test('pickRandom with no exclusion still returns a game', () => {
  const service = new GamesService();
  assert.ok(service.pickRandom().id > 0);
});
