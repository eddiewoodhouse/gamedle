import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VideoGame } from '../../model/video-game.model';

export interface GameResultDialogData {
  won: boolean;
  answer: VideoGame | null;
  guessCount: number;
}

@Component({
  selector: 'app-game-result-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './game-result-dialog.component.html',
  styleUrl: './game-result-dialog.component.scss',
})
export class GameResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameResultDialogData
  ) {}

  playAgain(): void {
    this.dialogRef.close();
  }
}
