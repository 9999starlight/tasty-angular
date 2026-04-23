export const endpoints = {
  recipesUrl: '/recipes',
  users: {
    baseUrl: '/users',
    login: '/login',
    register: '/register',
    favorites: '/favorites',
    removeFavorite: '/remove_favorite'
  },
  commentsUrl: '/comments'
};
export const baseUrl = 'http://localhost:5000';
export const adminOptions = {
  users: {
    adminStatus: 'adminStatus',
    disableStatus: 'disableStatus'
  }
}