export const TAG_DATA = [
  {
    tagName: 'Easy to prepare',
    tagSrc: 'easy_tag.jpg',
    tagParams: {
      level: 'easy',
    },
  },
  {
    tagName: 'Latest',
    tagSrc: 'latest_tag.jpg',
    tagParams: {
      sort: '-createdAt',
    },
  },
  {
    tagName: 'Highest rated',
    tagSrc: 'popular_tag.jpg',
    tagParams: {
      sort: '-rating',
    },
  },
  {
    tagName: 'Vegetarian',
    tagSrc: 'vegetarian_tag.jpg',
    tagParams: {
      vegetarian: true,
    },
  },
  {
    tagName: 'Pasta',
    tagSrc: 'pasta_tag.jpg',
    tagParams: {
      dishType: 'pasta',
    },
  },
  {
    tagName: 'Chicken',
    tagSrc: 'chicken_tag.jpg',
    tagParams: {
      'ingredients.ingredient': 'chicken',
    },
  },
];
