import { Component, OnInit, inject } from '@angular/core';
import { UIService } from '../../shared/sharedServices/ui.service';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss'],
    standalone: true,
    imports: [NavigationComponent, RouterOutlet]
})
export class AdminHomeComponent implements OnInit {
  uiService = inject(UIService);


  ngOnInit(): void {
  }

}
