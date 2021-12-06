import { style, animate, animation } from '@angular/animations';

export const scaleIn = animation([
  style({ transform: 'scale(0)', 'transform-origin': '0% 0%', opacity: 0 }),
  animate(
    '{{ time }}',
    style({ transform: 'scale(1)', 'transform-origin': '0% 0%', opacity: 1 })
  ),
]);

export const scaleOut = animation([
  style({ transform: 'scale(1)', 'transform-origin': '0% 0%', opacity: 1 }),
  animate(
    '{{ time }}',
    style({ transform: 'scale(0)', 'transform-origin': '0% 0%', opacity: 0 })
  ),
]);
