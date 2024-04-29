import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-guess-autocomplete',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './guess-autocomplete.component.html',
  styleUrl: './guess-autocomplete.component.scss',
})
export class GuessAutocompleteComponent {
  @Input() store: any;
}
