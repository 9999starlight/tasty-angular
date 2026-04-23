import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  showFullMenu = false;
  readonly icons = Icons;
}
