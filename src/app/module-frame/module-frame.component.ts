import {
  Component,
  HostListener,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../InfoDialog/InfoDialog.component';

interface Page {
  inMenu: boolean;
  name: string;
  link: string;
  shortLink: string;
}

@Component({
  selector: 'app-module-frame',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './module-frame.component.html',
  styleUrl: './module-frame.component.scss',
})
export class ModuleFrameComponent implements OnInit {
  pages: Page[] = [
    {
      inMenu: false,
      name: 'Dashboard',
      link: 'Zum Dashboard',
      shortLink: 'Dashboard',
    },
    {
      inMenu: true,
      name: 'Kompetenzatlas',
      link: 'Zum Kompetenzatlas',
      shortLink: 'Atlas',
    },
    {
      inMenu: true,
      name: 'Teamrollen',
      link: 'Zu den Teamrollen',
      shortLink: 'Teamrollen',
    },
    {
      inMenu: true,
      name: 'Soll-/Ist-Vergleich',
      link: 'Zum Soll-/Ist-Vergleich',
      shortLink: 'Soll-/Ist',
    },
    {
      inMenu: true,
      name: 'Stärken',
      link: 'Zu den Stärken',
      shortLink: 'Stärken',
    },
    {
      inMenu: true,
      name: 'Übertreibungsvermutungen',
      link: 'Zu den Übertreibungsvermutungen',
      shortLink: 'Übertreibungen',
    },
    {
      inMenu: true,
      name: 'Kompetenzentwicklung',
      link: 'Zur Kompetenzentwicklung',
      shortLink: 'Entwicklung',
    },
    {
      inMenu: false,
      name: 'Dashboard',
      link: 'Zum Dashboard',
      shortLink: 'Dashboard',
    },
  ];
  pageNumber = signal(1);
  currentPage = computed(() => this.pages[this.pageNumber()]);
  title = computed(() => this.currentPage().name);
  previousPage = computed(() => this.pages[this.pageNumber() - 1]);
  nextPage = computed(() => this.pages[this.pageNumber() + 1]);
  infoNotYetRead = signal(true);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  gotoPage(page: Page) {
    const current = this.pages.indexOf(page);
    this.pageNumber.set(current);
  }

  gotoNextPage() {
    const current = this.pages.findIndex((page) => page.name === this.title());
    if (current < this.pages.length - 2) {
      this.pageNumber.set(current + 1);
    }
  }

  gotoPreviousPage() {
    const current = this.pages.findIndex((page) => page.name === this.title());
    if (current > 1) {
      this.pageNumber.set(current - 1);
    }
  }

  openInfo() {
    this.dialog.open(InfoDialogComponent, {
      maxHeight: '100%',
      maxWidth: '100%',
      disableClose: true,
    });
    this.infoNotYetRead.set(false);
  }

  private defaultTouch = { x: 0, y: 0, time: 0 };

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchmove', ['$event'])
  handleTouch(event: TouchEvent) {
    let touch = event.touches[0] || event.changedTouches[0];

    if (event.type === 'touchstart') {
      this.defaultTouch = {
        x: touch.pageX,
        y: touch.pageY,
        time: event.timeStamp,
      };
    } else if (event.type === 'touchend') {
      let deltaX = touch.pageX - this.defaultTouch.x;
      let deltaTime = event.timeStamp - this.defaultTouch.time;

      if (deltaTime < 500) {
        if (Math.abs(deltaX) > 60) {
          if (deltaX > 0) {
            this.gotoPreviousPage();
          } else {
            this.gotoNextPage();
          }
        }
      }
    }
  }
}
