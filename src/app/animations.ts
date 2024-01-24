import {
  animate, AnimationTriggerMetadata, state,
  style,
  transition,
  trigger
} from "@angular/animations";


export const slideUpDownAnimation: AnimationTriggerMetadata = trigger('slideUpDownAnimation', [
  state(
    'hidden',
    style({
      transform: 'translateY(100%)', display: 'none'
    })
  ),
  state(
    'visible',
    style({
      transform: 'translateY(0)', display: 'block'
    })
  ),
  transition('hidden => visible', animate('0.5s ease-in-out')),
  transition('visible => hidden', animate('0.5s ease-in-out')),
]);
