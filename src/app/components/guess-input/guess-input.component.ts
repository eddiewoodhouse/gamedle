import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GamedleStore } from '../../stores/game.store';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-guess-input',
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatFormFieldModule, MatInputModule],
})
export class GuessInputComponent {
  readonly store = inject(GamedleStore);

  query(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.store.updateQuery(inputElement?.value ?? '');
  }
}
