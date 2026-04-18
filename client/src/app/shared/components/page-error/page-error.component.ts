import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-error',
  imports: [],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss',
})
export class PageErrorComponent {
  @Input() message: string = '';
}
