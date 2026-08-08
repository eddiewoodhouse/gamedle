import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoGame } from '../model/video-game.model';
import { StatsService } from '../services/stats.service';

export type Verdict = 'correct' | 'close' | 'wrong';

export interface GuessComparison {
  releaseYear: Verdict;
  genre: Verdict;
  platforms: Verdict;
  localMaximumPlayers: Verdict;
}

export interface GuessResult {
  guess: VideoGame;
  comparison: GuessComparison;
  isCorrect: boolean;
}

export interface SearchResult {
  id: number;
  title: string;
}

interface NewGameResponse {
  maxGuesses: number;
  guessesRemaining: number;
}

interface GuessResponse {
  guess: VideoGame;
  comparison: GuessComparison;
  isCorrect: boolean;
  guessesRemaining: number;
  isGameOver: boolean;
  answer?: VideoGame;
}

const SEARCH_DEBOUNCE_MS = 250;

@Injectable({ providedIn: 'root' })
export class GamedleStore {
  private readonly http = inject(HttpClient);
  private readonly statsService = inject(StatsService);
  private searchDebounceHandle?: ReturnType<typeof setTimeout>;

  readonly query = signal('');
  readonly searchResults = signal<SearchResult[]>([]);
  readonly isSearching = signal(false);
  readonly isStarting = signal(false);

  readonly previousGuesses = signal<GuessResult[]>([]);
  readonly maxGuesses = signal(8);
  readonly guessesRemaining = signal(8);
  readonly isGameOver = signal(false);
  readonly won = signal(false);
  readonly answer = signal<VideoGame | null>(null);

  readonly guessedIds = computed(
    () => new Set(this.previousGuesses().map((result) => result.guess.id))
  );

  startNewGame(): void {
    this.isStarting.set(true);
    this.http.post<NewGameResponse>('/api/game/new', {}).subscribe({
      next: (res) => {
        this.previousGuesses.set([]);
        this.query.set('');
        this.searchResults.set([]);
        this.maxGuesses.set(res.maxGuesses);
        this.guessesRemaining.set(res.guessesRemaining);
        this.isGameOver.set(false);
        this.won.set(false);
        this.answer.set(null);
        this.isStarting.set(false);
      },
      error: () => this.isStarting.set(false),
    });
  }

  updateQuery(query: string): void {
    this.query.set(query);
    if (this.searchDebounceHandle) clearTimeout(this.searchDebounceHandle);

    if (query.trim().length < 2) {
      this.searchResults.set([]);
      return;
    }

    this.searchDebounceHandle = setTimeout(() => this.search(query), SEARCH_DEBOUNCE_MS);
  }

  submitGuess(gameId: number): void {
    if (this.isGameOver()) return;

    this.http.post<GuessResponse>('/api/game/guess', { gameId }).subscribe({
      next: (res) => {
        this.previousGuesses.update((guesses) => [
          { guess: res.guess, comparison: res.comparison, isCorrect: res.isCorrect },
          ...guesses,
        ]);
        this.guessesRemaining.set(res.guessesRemaining);
        this.query.set('');
        this.searchResults.set([]);

        if (res.isGameOver) {
          this.isGameOver.set(true);
          this.won.set(res.isCorrect);
          this.answer.set(res.answer ?? null);
          this.statsService.recordResult(res.isCorrect);
        }
      },
    });
  }

  private search(query: string): void {
    this.isSearching.set(true);
    this.http.get<SearchResult[]>('/api/games/search', { params: { q: query } }).subscribe({
      next: (results) => {
        this.searchResults.set(results.filter((result) => !this.guessedIds().has(result.id)));
        this.isSearching.set(false);
      },
      error: () => this.isSearching.set(false),
    });
  }
}
