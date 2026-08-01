import { Component, ChangeDetectionStrategy, effect, inject, untracked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { GamedleStore } from '../../stores/game.store';
import { PreviousGuessesComponent } from '../previous-guesses/previous-guesses.component';
import { GuessAutocompleteComponent } from '../guess-autocomplete/guess-autocomplete.component';
import { GameResultDialogComponent } from '../game-result-dialog/game-result-dialog.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
  imports: [GuessInputComponent, PreviousGuessesComponent, GuessAutocompleteComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GameBoardComponent {
  readonly store = inject(GamedleStore);
  private readonly dialog = inject(MatDialog);

  constructor() {
    this.store.startNewGame();

    effect(() => {
      const isGameOver = this.store.isGameOver();
      if (!isGameOver) return;

      untracked(() => {
        const dialogRef = this.dialog.open(GameResultDialogComponent, {
          data: {
            won: this.store.won(),
            answer: this.store.answer(),
            guessCount: this.store.previousGuesses().length,
          },
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe(() => this.store.startNewGame());
      });
    });
  }
}
