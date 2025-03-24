import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class TagComponent implements OnInit {
  @Input() tag: any;

  constructor() { }

  ngOnInit(): void {}
}
