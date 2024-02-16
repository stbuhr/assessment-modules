import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ProgressIndicator.component.html',
  styleUrl: './ProgressIndicator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorComponent {
  count = input<number>(3);
  current = input<number>(1);
}
