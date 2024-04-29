import { Component, inject } from '@angular/core';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { GamedleStore } from '../../stores/game.store';
import { MatButtonModule } from '@angular/material/button';
import { PreviousGuessesComponent } from '../previous-guesses/previous-guesses.component';
import { GuessAutocompleteComponent } from '../guess-autocomplete/guess-autocomplete.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
  imports: [
    GuessInputComponent,
    SubmitButtonComponent,
    MatButtonModule,
    PreviousGuessesComponent,
    GuessAutocompleteComponent,
  ],
  providers: [GamedleStore],
})
export class GameBoardComponent {
  readonly store = inject(GamedleStore);
}
