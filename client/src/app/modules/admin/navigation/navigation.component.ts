import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink, RouterLinkActive, FontAwesomeModule]
})
export class NavigationComponent implements OnInit {
  showFullMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

}
