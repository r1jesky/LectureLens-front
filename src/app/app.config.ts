import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BubbleRatingComponent } from './bubble-rating/bubble-rating.component';
import { AchievementsPageComponent } from './achievements-page/achievements-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: WelcomePageComponent },
      { path: 'rating', component: BubbleRatingComponent },
      { path: 'achievements', component: AchievementsPageComponent },
    ]),
  ],
};
