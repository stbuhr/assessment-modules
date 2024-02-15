import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModuleFrameComponent } from './module-frame/module-frame.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ModuleFrameComponent],
})
export class AppComponent {
  title = 'assessment-modules';
}
