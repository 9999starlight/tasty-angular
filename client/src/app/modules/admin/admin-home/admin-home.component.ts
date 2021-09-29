import { Component, OnInit } from '@angular/core';
import { UIService } from '../../shared/sharedServices/ui.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(public uiService: UIService) { }

  ngOnInit(): void {
  }

}
