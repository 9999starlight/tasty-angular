import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tagData = [
    {
      tagName: 'Easy to prepare',
      tagSrc: '../../../../assets/images/easy_tag.jpg',
      tagParams: {
        level: 'easy'
      }
    },
    {
      tagName: 'Latest',
      tagSrc: '../../../../assets/images/latest_tag.jpg',
      tagParams: {
        sort: '-createdAt'
      }
    },
    {
      tagName: 'Highest rated',
      tagSrc: '../../../../assets/images/popular_tag.jpg',
      tagParams: {
        sort: '-rating'
      }
    },
    {
      tagName: 'Vegetarian',
      tagSrc: '../../../../assets/images/vegetarian_tag.jpg',
      tagParams: {
        vegetarian: true
      }
    },
    {
      tagName: 'Pasta',
      tagSrc: '../../../../assets/images/pasta_tag.jpg',
      tagParams: {
        dishType: 'pasta'
      }
    },
    {
      tagName: 'Chicken',
      tagSrc: '../../../../assets/images/chicken_tag.jpg',
      tagParams: {
        'ingredients.ingredient': 'chicken'
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {}
}
