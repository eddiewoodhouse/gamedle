import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { VideoGame } from '../model/video-game.model';
import { VIDEO_GAMES } from '../mock/games.mock.data';
import { computed } from '@angular/core';

type GameState = {
  videoGames: VideoGame[];
  isLoading: boolean;
  query: string;
  previousGuesses: VideoGame[];
  correctVideoGame: VideoGame;
};

export const GamedleStore = signalStore(
  { providedIn: 'root' },
  withState<GameState>({
    videoGames: VIDEO_GAMES,
    isLoading: false,
    query: '',
    previousGuesses: [],
    correctVideoGame:
      VIDEO_GAMES[Math.floor(Math.random() * VIDEO_GAMES.length)],
  }),
  withComputed(({ videoGames, query }) => ({
    queryLength: computed(() => query().length),
    gamesLength: computed(() => videoGames().length),
    filteredGames: computed(() => {
      if (query().length > 2) {
        return videoGames()
          .filter((game) =>
            game.title.toLowerCase().includes(query().toLowerCase())
          )
          .slice(0, 2);
      }
      return [];
    }),
  })),
  withMethods((store) => ({
    updateQuery(query: string): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, (state) => ({ query }));
    },
    selectGame(game: VideoGame): void {
      // 👇 Updating state using the `patchState` function.
      if (game === store.correctVideoGame()) {
        patchState(store, (state) => ({
          previousGuesses: [game, ...state.previousGuesses],
        }));
        alert('You guessed the correct game! ' + game.title);
      } else {
        patchState(store, (state) => ({
          previousGuesses: [game, ...state.previousGuesses],
        }));
      }
    },
  }))
);
