import { style, animate, animation } from '@angular/animations';

export const expandIn = animation([
  style({ 'letter-spacing': '-0.5em', opacity: 0 }),
  animate('{{ time }}', style({ 'letter-spacing': 'normal', opacity: 1 })),
]);

export const expandOut = animation([
  style({ 'letter-spacing': 'normal', opacity: 1 }),
  animate('{{ time }}', style({ 'letter-spacing': '-0.5em', opacity: 0 })),
]);
