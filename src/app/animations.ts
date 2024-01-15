import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  group,
  query, state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const slideInAnimation: AnimationTriggerMetadata =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ], {optional: true}),
      ]),
    ]),
    transition('* <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], {optional: true}),
      query(':enter', [
        style({left: '-100%'})
      ], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '100%', opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ], {optional: true}),
        query('@*', animateChild(), {optional: true})
      ]),
    ])
  ]);

export const aboutAnimation: AnimationTriggerMetadata =
  trigger('inOutAnimation', [
    state('inState', style({bottom: 0, opacity: 1})),
    state('outState', style({bottom: -318, opacity: 0})),
    transition('inState => outState', [animate('1s linear')]),
    transition('outState => inState', [animate('1s linear')]),
  ]);

export const routeTransitionAnimations = trigger('triggerName', [
  transition('home => about', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition('about => home', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('500ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 })),
  ])
]);

export const routeTransitionAnimations3 = trigger('triggerName', [
  transition('home => about', [
    query(':enter', [
      style({ transform: 'translateY(100%)', opacity: 0 }),
      animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
    ]),
    query(':leave',
      animateChild()
    ),
  ]),
  transition('about => home', [
    query(':leave',
      animate('500ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 })),
    ),
    query(':enter', [
      animate('500ms ease-out', style({ transform: 'translateY(100%)', opacity: 1 })),
    ]),
  ])
]);

export const routeTransitionAnimations2 = trigger('triggerName', [
  transition('home => about', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({ right: '100%', opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ right: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),
  transition('about => home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ])
]);
