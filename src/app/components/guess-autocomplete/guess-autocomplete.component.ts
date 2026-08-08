import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GamedleStore } from '../../stores/game.store';

@Component({
  selector: 'app-guess-autocomplete',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './guess-autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './guess-autocomplete.component.scss',
})
export class GuessAutocompleteComponent {
  readonly store = inject(GamedleStore);
}
