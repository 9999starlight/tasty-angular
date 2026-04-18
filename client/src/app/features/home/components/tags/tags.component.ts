import { Component } from '@angular/core';
import { TAG_DATA } from '../../../../core/constants/recipes/tag-data';
import { TagComponent } from './tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  imports: [TagComponent]
})
export class TagsComponent {
  readonly tagData = TAG_DATA;
}
