import { Injectable } from '@nestjs/common';
import { VIDEO_GAMES } from './games.data';
import { VideoGame } from './video-game.model';

@Injectable()
export class GamesService {
  private readonly games = VIDEO_GAMES;

  search(query: string, limit = 8): Pick<VideoGame, 'id' | 'title'>[] {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) return [];
    return this.games
      .filter((game) => game.title.toLowerCase().includes(normalized))
      .slice(0, limit)
      .map(({ id, title }) => ({ id, title }));
  }

  findById(id: number): VideoGame | undefined {
    return this.games.find((game) => game.id === id);
  }

  /** Picks a random game, avoiding `excludeId` so a player never gets the same answer twice in a row. */
  pickRandom(excludeId?: number): VideoGame {
    const pool =
      excludeId === undefined || this.games.length <= 1
        ? this.games
        : this.games.filter((game) => game.id !== excludeId);
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
