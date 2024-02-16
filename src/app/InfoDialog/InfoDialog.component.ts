import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
      content: `<p>Tauche tiefer in die Welt deiner Fähigkeiten und Potenziale ein:</p>
    <p>Der KODE® KompetenzAtlas ordnet jede deiner Teilkompetenzen den vier Grundkompetenzen P (Personale Kompetenz), A (Aktivitäts- und Handlungskompetenz), F (Fach- und Methodenkompetenz) und S (Sozial-kommunikative Kompetenz) zu.</p>
    <p>Verstehe, wie jede Fähigkeit ein einzigartiges Element deines Kompetenzprofils bildet.</p>`,
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
}
