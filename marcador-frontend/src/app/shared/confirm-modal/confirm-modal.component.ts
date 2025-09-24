import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [NgIf],
  template: `
  <div class="modal fade show d-block" *ngIf="visible" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" (click)="cancel()"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="cancel()">Cancelar</button>
          <button class="btn btn-danger" (click)="confirm()">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`.modal { background: rgba(0,0,0,.5); }`]
})
export class ConfirmModalComponent {
  @Input() title = 'Confirmación';
  @Input() message = '¿Seguro que deseas continuar?';
  @Input() visible = false;
  @Output() onConfirm = new EventEmitter<boolean>();

  confirm() {
    this.onConfirm.emit(true);
    this.visible = false;
  }

  cancel() {
    this.onConfirm.emit(false);
    this.visible = false;
  }
}
