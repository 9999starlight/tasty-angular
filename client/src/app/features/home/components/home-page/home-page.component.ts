import { Component, inject } from '@angular/core';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { AuthFacade } from '../../../auth/facade/auth.facade';
import { UiService } from '../../../../shared/services/ui.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [SearchComponent]
})
export class HomePageComponent {
  private authFacade = inject(AuthFacade);
  readonly uiService = inject(UiService);
}
