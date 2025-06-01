import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleRatingComponent } from './bubble-rating.component';

describe('BubbleRatingComponent', () => {
  let component: BubbleRatingComponent;
  let fixture: ComponentFixture<BubbleRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
