import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly statsService = inject(StatsService);
  readonly stats = this.statsService.stats;
}
