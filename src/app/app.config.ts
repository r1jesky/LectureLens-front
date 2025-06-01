import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BubbleRatingComponent } from './bubble-rating/bubble-rating.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: BubbleRatingComponent },
    ]),
  ],
};
