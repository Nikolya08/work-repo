import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { First } from './componets/first/first';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, First],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('learn-git');
}
