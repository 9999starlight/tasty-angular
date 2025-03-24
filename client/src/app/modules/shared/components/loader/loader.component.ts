import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    imports: [NgClass],
})
export class LoaderComponent implements OnInit {
  @Input() bigLoader: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
