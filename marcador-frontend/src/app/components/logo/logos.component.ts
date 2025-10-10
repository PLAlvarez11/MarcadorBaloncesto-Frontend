import { Component } from '@angular/core';
import { LogosService } from './logos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { LogosService } from '../../core/services/logos.service';

//import { LogosService } from '../../services/logos.service';

@Component({
  imports:[CommonModule,  FormsModule ],
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  //styleUrls: ['./logos.component.css']
})
export class LogosComponent {
  equipoId: number = 0;
  selectedFile: File | null = null;
  logoUrl: string | null = null;
  loading = false;

  constructor(private logosService: LogosService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  subirLogo(): void {
    if (!this.selectedFile || !this.equipoId) {
      alert('Selecciona un archivo e ingresa un ID de equipo.');
      return;
    }

    this.loading = true;
    this.logosService.uploadLogo(this.equipoId, this.selectedFile).subscribe({
      next: () => {
        alert('Logo subido correctamente ✅');
        this.verLogo();
        this.loading = false;
      },
      error: () => {
        alert('Error al subir el logo ❌');
        this.loading = false;
      }
    });
  }

  verLogo(): void {
    if (!this.equipoId) {
      alert('Ingresa un ID de equipo.');
      return;
    }

    this.logosService.getLogo(this.equipoId).subscribe({
      next: (data) => {
        const url = URL.createObjectURL(data);
        this.logoUrl = url;
      },
      error: () => {
        alert('No se encontró logo para este equipo.');
        this.logoUrl = null;
      }
    });
  }

  eliminarLogo(): void {
    if (!this.equipoId) {
      alert('Ingresa un ID de equipo.');
      return;
    }

    if (!confirm('¿Seguro que deseas eliminar el logo?')) return;

    this.logosService.deleteLogo(this.equipoId).subscribe({
      next: () => {
        alert('Logo eliminado correctamente 🗑️');
        this.logoUrl = null;
      },
      error: () => {
        alert('Error al eliminar el logo ❌');
      }
    });
  }
}