import { Component, OnInit } from '@angular/core';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [FontAwesomeModule]
})
export class NotFoundComponent implements OnInit {
  faHeartBroken = faHeartBroken;
  constructor() { }

  ngOnInit(): void {
  }

}
