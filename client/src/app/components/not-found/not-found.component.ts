import { Component, OnInit } from '@angular/core';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  faHeartBroken = faHeartBroken;
  constructor() { }

  ngOnInit(): void {
  }

}
