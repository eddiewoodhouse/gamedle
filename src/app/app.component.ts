import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet, GameBoardComponent, FooterComponent, HeaderComponent]
})
export class AppComponent {
  title = 'gamedle';
}
