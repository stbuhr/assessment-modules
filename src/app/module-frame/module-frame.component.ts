import { Component, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../InfoDialog/InfoDialog.component';

interface Page {
  inMenu: boolean;
  name: string;
  link: string;
  shortLink: string;
  route: string;
}

@Component({
  selector: 'app-module-frame',
  standalone: true,
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './module-frame.component.html',
  styleUrl: './module-frame.component.scss',
})
export class ModuleFrameComponent implements OnInit {
  pages = [
    {
      inMenu: false,
      name: 'Dashboard',
      link: 'Zum Dashboard',
      shortLink: 'Dashboard',
      route: '/dashboard',
    },
    {
      inMenu: true,
      name: 'Kompetenzatlas',
      link: 'Zum Kompetenzatlas',
      shortLink: 'Atlas',
      route: '/competence-atlas',
    },
    {
      inMenu: true,
      name: 'Teamrollen',
      link: 'Zu den Teamrollen',
      shortLink: 'Teamrollen',
      route: '/team-roles',
    },
    {
      inMenu: true,
      name: 'Soll-/Ist-Vergleich',
      link: 'Zum Soll-/Ist-Vergleich',
      shortLink: 'Soll-/Ist',
      route: '/target-actual-comparison',
    },
    {
      inMenu: true,
      name: 'Stärken',
      link: 'Zu den Stärken',
      shortLink: 'Stärken',
      route: '/strengths',
    },
    {
      inMenu: true,
      name: 'Übertreibungsvermutungen',
      link: 'Zu den Übertreibungsvermutungen',
      shortLink: 'Übertreibungen',
      route: '/exaggerations',
    },
    {
      inMenu: true,
      name: 'Kompetenzentwicklung',
      link: 'Zur Kompetenzentwicklung',
      shortLink: 'Entwicklung',
      route: '/competence-development',
    },
    {
      inMenu: false,
      name: 'Dashboard',
      link: 'Zum Dashboard',
      shortLink: 'Dashboard',
      route: '/dashboard',
    },
  ];
  title = signal('Kompetenzatlas');
  previousPage = signal<Page>(this.pages[0]);
  nextPage = signal<Page>(this.pages[2]);
  infoNotYetRead = signal(true);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dialog.open(InfoDialogComponent, {
      maxHeight: '100%',
      maxWidth: '100%',
      disableClose: true,
    });
  }

  gotoPage(page: Page) {
    const current = this.pages.indexOf(page);
    this.previousPage.set(this.pages[current - 1]);
    this.title.set(page.name);
    this.nextPage.set(this.pages[current + 1]);
  }

  gotoNextPage() {
    const current = this.pages.findIndex((page) => page.name === this.title());
    if (current < this.pages.length - 2) {
      this.previousPage.set(this.pages[current]);
      this.title.set(this.pages[current + 1].name);
      this.nextPage.set(this.pages[current + 2]);
    }
  }

  gotoPreviousPage() {
    const current = this.pages.findIndex((page) => page.name === this.title());
    if (current > 1) {
      this.previousPage.set(this.pages[current - 2]);
      this.title.set(this.pages[current - 1].name);
      this.nextPage.set(this.pages[current]);
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
}
