import { Component } from '@angular/core';
import { Icons } from '../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MISC_TEXT } from '../../core/constants/texts/misc-text';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [FontAwesomeModule],
})

export class NotFoundComponent {
  public faHeartBroken = Icons.faHeartBroken;
  public miscText = MISC_TEXT;
}
