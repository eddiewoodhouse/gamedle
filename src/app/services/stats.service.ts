import { Injectable, signal } from '@angular/core';

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
}

const STORAGE_KEY = 'gamedle.stats';

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  bestStreak: 0,
};

@Injectable({ providedIn: 'root' })
export class StatsService {
  readonly stats = signal<GameStats>(this.load());

  recordResult(won: boolean): void {
    const current = this.stats();
    const currentStreak = won ? current.currentStreak + 1 : 0;
    const next: GameStats = {
      gamesPlayed: current.gamesPlayed + 1,
      gamesWon: current.gamesWon + (won ? 1 : 0),
      currentStreak,
      bestStreak: Math.max(current.bestStreak, currentStreak),
    };
    this.stats.set(next);
    this.save(next);
  }

  private load(): GameStats {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATS };
      return { ...DEFAULT_STATS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_STATS };
    }
  }

  private save(stats: GameStats): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // localStorage unavailable (private browsing, quota) — stats just won't persist.
    }
  }
}
