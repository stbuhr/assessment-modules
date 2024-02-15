import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-module-frame',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './module-frame.component.html',
  styleUrl: './module-frame.component.scss',
})
export class ModuleFrameComponent {
  popupMenuVisible = false;

  showPopupMenu() {
    this.popupMenuVisible = true;
  }

  togglePopupMenu() {
    this.popupMenuVisible = !this.popupMenuVisible;
  }
}
