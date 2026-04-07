import { Component } from '@angular/core';
import { Icons } from '../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NOT_FOUND_TEXT } from '../../core/constants/texts/components-text';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [FontAwesomeModule],
})

export class NotFoundComponent {
  public faHeartBroken = Icons.faHeartBroken;
  public notFoundText = NOT_FOUND_TEXT;
}
