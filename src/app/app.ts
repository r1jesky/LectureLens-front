import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BubbleRatingComponent} from './bubble-rating/bubble-rating.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BubbleRatingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'LectureLens';
}
