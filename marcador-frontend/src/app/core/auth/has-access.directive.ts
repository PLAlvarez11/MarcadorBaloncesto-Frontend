import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[hasAccess]',
  standalone: true
})
export class HasAccessDirective {
  private requiredAccess: string | null = null;

  constructor(
    private auth: AuthService,
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

  @Input() set hasAccess(access: string) {
    this.requiredAccess = access;
    this.updateView();
  }

  private updateView() {
    this.vcr.clear();
    if (this.requiredAccess && this.auth.hasAccess(this.requiredAccess)) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
