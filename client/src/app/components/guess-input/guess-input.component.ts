import { Component, Input } from '@angular/core';
import { GamedleStore } from '../../stores/game.store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';

@Component({
  selector: 'app-guess-input',
  standalone: true,
  providers: [GamedleStore],
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SubmitButtonComponent,
  ],
})
export class GuessInputComponent {
  @Input() store: any;
  query($event: Event): void {
    let inputElement = $event.target as HTMLInputElement;
    let query = inputElement?.value || '';
    this.store.updateQuery(query);
  }
}
