import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GamedleStore, Verdict } from '../../stores/game.store';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-previous-guesses',
  imports: [MatCardModule],
  templateUrl: './previous-guesses.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './previous-guesses.component.scss',
})
export class PreviousGuessesComponent {
  readonly store = inject(GamedleStore);

  verdictClass(verdict: Verdict): string {
    if (verdict === 'correct') return 'correct-guess';
    if (verdict === 'close') return 'close-guess';
    return '';
  }
}
