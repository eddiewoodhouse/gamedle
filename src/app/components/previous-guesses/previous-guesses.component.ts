import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Direction, GamedleStore, Verdict } from '../../stores/game.store';
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
    return `verdict verdict--${verdict}`;
  }

  /** Arrow pointing toward the answer for a numeric field, or '' when correct. */
  arrow(direction: Direction | null): string {
    if (direction === 'higher') return '↑';
    if (direction === 'lower') return '↓';
    return '';
  }
}
