import { Component, Input, inject } from '@angular/core';
import { GamedleStore } from '../../stores/game.store';
import { MatCardModule } from '@angular/material/card';
import { VideoGamePlatform } from '../../model/video-game.model';

@Component({
  selector: 'app-previous-guesses',
  standalone: true,
  imports: [MatCardModule],
  providers: [GamedleStore],
  templateUrl: './previous-guesses.component.html',
  styleUrl: './previous-guesses.component.scss',
})
export class PreviousGuessesComponent {
  @Input() store: any;
  getClassForReleaseYear(year: number) {
    if (this.store.correctVideoGame().releaseYear === year) {
      return 'correct-guess';
    }
    if (Math.abs(this.store.correctVideoGame().releaseYear - year) < 4) {
      return 'close-guess';
    }
    return '';
  }
  getClassForGenre(genre: string) {
    if (this.store.correctVideoGame().genre === genre) {
      return 'correct-guess';
    }
    return '';
  }
  getClassForPlatforms(platforms: VideoGamePlatform[]) {
    console.log({ platforms }, this.store.correctVideoGame().platforms);
    let overlappingPlatforms = [];
    for (let platform of this.store.correctVideoGame().platforms) {
      if (platforms.includes(platform)) {
        overlappingPlatforms.push(platform);
      }
    }
    if (
      overlappingPlatforms.length ===
      this.store.correctVideoGame().platforms.length
    ) {
      return 'correct-guess';
    }
    if (overlappingPlatforms.length > 0) {
      return 'close-guess';
    }
    return '';
  }
  getClassForLocalPlayers(localMaximumPlayers: number) {
    if (
      this.store.correctVideoGame().localMaximumPlayers === localMaximumPlayers
    ) {
      return 'correct-guess';
    }
    if (
      Math.abs(
        this.store.correctVideoGame().localMaximumPlayers - localMaximumPlayers
      ) < 4
    ) {
      return 'close-guess';
    }
    return '';
  }
}
