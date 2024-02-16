import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProgressIndicatorComponent } from '../ProgressIndicator/ProgressIndicator.component';

interface InfoPage {
  title: string;
  subtitle: string;
  content: string;
}

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, ProgressIndicatorComponent],
  templateUrl: './InfoDialog.component.html',
  styleUrl: './InfoDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDialogComponent {
  pages: InfoPage[] = [
    {
      title: 'Entdecke die Vielfalt deiner Fähigkeiten',
      subtitle: '64 Teilkompetenzen',
      content: `
        <img src="assets/atlas.svg" alt="KODE KompetenzAtlas" width="120" height="120" />
        <p>Tauche tiefer in die Welt deiner Fähigkeiten und Potenziale ein:</p>
        <p>Der KODE® KompetenzAtlas ordnet jede deiner Teilkompetenzen den vier Grundkompetenzen P (Personale Kompetenz), A (Aktivitäts- und Handlungskompetenz), F (Fach- und Methodenkompetenz) und S (Sozial-kommunikative Kompetenz) zu.</p>
        <p>Verstehe, wie jede Fähigkeit ein einzigartiges Element deines Kompetenzprofils bildet.</p>
        `,
    },
    {
      title: 'Deine Teilkompetenzen',
      subtitle: 'Ausprägungen im Alltag',
      content: `<p>Deine Fähigkeiten zeigen sich in verschiedenen Ausprägungsstufen: Von niedrig bis sehr hoch. Diese Stufen spiegeln wider, wie oft und wie intensiv du bestimmte Fähigkeiten im Alltag einbringst.</p>
      <p>Eine hohe Ausprägung bedeutet, dass du eine Kompetenz häufig und effektiv nutzt, während eine niedrige Ausprägung Raum für Wachstum und Entwicklung bietet.</p>`,
    },
    {
      title: 'Kompetenzen',
      subtitle: 'Zwischen Wahrscheinlichkeit und Potenzial',
      content: `<p>Hohe Werte in deinem KODE® Profil zeigen eine höhere Wahrscheinlichkeit für Stärken, doch der wahre Wert liegt im Verstehen und Nutzen dieser Fähigkeiten.</p>
      <p>Ob eine Kompetenz als Stärke oder Entwicklungsbereich gilt, hängt von deinem Kontext und deinen Zielen ab. Entdecke, wie du deine Kompetenzen unter normalen und schwierigen Bedingungen optimal einsetzen kannst.</p>`,
    },
  ];

  pageCount = signal<number>(this.pages.length);
  pageNumber = signal<number>(0);
  currentPage = computed(() => this.pages[this.pageNumber()]);

  constructor(public dialog: MatDialog) {}

  close() {
    this.dialog.closeAll();
  }

  gotoPreviousPage() {
    if (this.pageNumber() > 0) {
      this.pageNumber.set(this.pageNumber() - 1);
    }
  }

  gotoNextPage() {
    if (this.pageNumber() < this.pages.length - 1) {
      this.pageNumber.set(this.pageNumber() + 1);
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      if (event.repeat) return;
      this.gotoPreviousPage();
    } else if (event.key === 'ArrowRight') {
      if (event.repeat) return;
      this.gotoNextPage();
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  @ViewChild('contentElement') contentElement:
    | ElementRef<HTMLDivElement>
    | undefined;

  private defaultTouch = { x: 0, y: 0, time: 0 };
  private isTouching = false;

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
      this.isTouching = true;
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
      if (this.contentElement) {
        this.contentElement.nativeElement.style.transform = `translateX(0px)`;
      }
      this.isTouching = false;
    } else if (event.type === 'touchmove') {
      if (!this.isTouching) return;

      // let deltaX = touch.pageX - this.defaultTouch.x;
      // console.log('touchmove ' + deltaX);

      // if (this.contentElement) {
      //   this.contentElement.nativeElement.style.transform = `translateX(${deltaX}px)`;
      // }
    }
  }
}
