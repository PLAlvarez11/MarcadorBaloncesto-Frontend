import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../core/services/equipos.service';
import { LogosService } from '../../core/services/logos.service';
import { Equipo, CreateEquipo } from '../../core/models/equipo.model';
import { CommonModule, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HasAccessDirective } from '../../core/auth/has-access.directive';

@Component({
  standalone: true,
  selector: 'app-equipos-list',
  imports: [CommonModule, NgFor, NgIf, FormsModule, HasAccessDirective],
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.scss']
})
export class EquiposListComponent implements OnInit {
  equipos: Equipo[] = [];
  form: CreateEquipo = { nombre: '', ciudad: '' };
  editingId: number | null = null;
  selectedFile: File | null = null;

  constructor(private svc: EquiposService, public logos: LogosService) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.svc.getAll().subscribe(res => this.equipos = res);
  }

  save() {
    if (this.editingId == null) {
      this.svc.create(this.form).subscribe(() => { this.form = { nombre:'', ciudad:'' }; this.load(); });
    } else {
      this.svc.update(this.editingId, this.form).subscribe(() => { this.cancel(); this.load(); });
    }
  }

  edit(e: Equipo) {
    this.editingId = e.id;
    this.form = { nombre: e.nombre, ciudad: e.ciudad };
  }

  cancel() {
    this.editingId = null;
    this.form = { nombre:'', ciudad:'' };
    this.selectedFile = null;
  }

  remove(id: number) {
    if (!confirm('¿Eliminar equipo?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }

  onFileChange(ev: any) {
    this.selectedFile = ev.target.files[0] ?? null;
  }

  uploadLogo(equipoId: number) {
    if (!this.selectedFile) return;
    this.logos.upload(equipoId, this.selectedFile).subscribe(() => {
      this.selectedFile = null;
      // Forzar recarga de imagen usando cache-bust
      const img = document.getElementById('logo-'+equipoId) as HTMLImageElement | null;
      if (img) img.src = this.logos.getLogoUrl(equipoId) + '?t=' + Date.now();
    });
  }
}
