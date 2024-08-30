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
  transition('hidden => visible', animate('1s ease-in-out')),
  transition('visible => hidden', animate('1s ease-in-out')),
]);

export const slideNextPrevAnimation: AnimationTriggerMetadata = trigger('slideNextPrevAnimation', [
  state('void', style({ position: 'absolute', width: '100%' })),
  transition(':enter', [
    style({ transform: '{{ enterTransform }}' }),
    animate('0.2s ease-in-out', style({ transform: 'translateX(0%)' })),
  ], { params: { enterTransform: 'translateX(100%)' } }),
  transition(':leave', [
    style({ transform: 'translateX(0%)', opacity: 0 }),
    animate('0.2s ease-in-out', style({ transform: '{{ leaveTransform }}' })),
  ], { params: { leaveTransform: 'translateX(-100%)', opacity: 0 } }),
]);
