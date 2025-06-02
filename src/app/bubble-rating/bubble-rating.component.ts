import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bubble-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bubble-rating.component.html',
  styleUrls: ['./bubble-rating.component.css'],
})
export class BubbleRatingComponent {
  section = 1;

  responses = {
    section1: {
      q0: null as number | null,
      q01: null as 'yes' | 'no' | null,
      q1: null as number | null,
      q1c: '',
      q2: null as number | null,
      q3: null as number | null,
      q3c: '',
      q4: null as number | null,
      q4c: '',
      q5: null as number | null,
      q5c: '',
      q6: null as number | null,
      q6c: '',
      q7: null as number | null,
      q7c: '',
      q8c: ''
    },
    section2: {
      q0: null as number | null,
      q01: null as 'yes' | 'no' | null,
      q1: null as number | null,
      q1c: '',
      q2: null as number | null,
      q3: null as number | null,
      q3c: '',
      q4: null as number | null,
      q4c: '',
      q5: null as number | null,
      q5c: '',
      q6: null as number | null,
      q6c: '',
      q7: null as number | null,
      q7c: '',
      q8: null as number | null,
      q8c: '',
      q9: null as number | null,
      q9c: '',
      q10c: ''
    },
    section3: {
      q0: null as number | null,
      q0c: '',
      q1: null as number | null,
      q1c: '',
      q2: null as number | null,
      q2c: '',
      q3: null as 'yes' | 'partial' | 'no' | null,
      q4: null as number | null,
      q4c: '',
      q5: ''
    }
  };

  select(section: number) {
    this.section = section;
  }

  submit() {
    if (!this.formValid()) {
      alert('Пожалуйста, ответьте на все обязательные вопросы.');
      return;
    }
    console.log('Submitted:', this.responses);
    alert('Отправлено! Смотри консоль.');
  }

  trackByIndex = (index: number) => index;

  onCheckboxChange(section: string) {
    if (section === 'section1' && !this.responses.section1.q01) {
      this.responses.section1.q1 = null;
      this.responses.section1.q1c = '';
      this.responses.section1.q2 = null;
      this.responses.section1.q3 = null;
      this.responses.section1.q3c = '';
      this.responses.section1.q4 = null;
      this.responses.section1.q4c = '';
      this.responses.section1.q5 = null;
      this.responses.section1.q5c = '';
      this.responses.section1.q6 = null;
      this.responses.section1.q6c = '';
      this.responses.section1.q7 = null;
      this.responses.section1.q7c = '';
      this.responses.section1.q8c = '';
    } else if (section === 'section2' && !this.responses.section2.q01) {
      this.responses.section2.q1 = null;
      this.responses.section2.q1c = '';
      this.responses.section2.q2 = null;
      this.responses.section2.q3 = null;
      this.responses.section2.q3c = '';
      this.responses.section2.q4 = null;
      this.responses.section2.q4c = '';
      this.responses.section2.q5 = null;
      this.responses.section2.q5c = '';
      this.responses.section2.q6 = null;
      this.responses.section2.q6c = '';
      this.responses.section2.q7 = null;
      this.responses.section2.q7c = '';
      this.responses.section2.q8 = null;
      this.responses.section2.q8c = '';
      this.responses.section2.q9 = null;
      this.responses.section2.q9c = '';
      this.responses.section2.q10c = '';
    }
  }

  formValid(): boolean {
    const s = this.responses;

    if (this.section === 1) {
      return s.section1.q0 !== null &&
        s.section1.q01 !== null &&
        (s.section1.q01 === 'no' || (
          s.section1.q1 !== null &&
          s.section1.q2 !== null &&
          s.section1.q3 !== null &&
          s.section1.q4 !== null &&
          s.section1.q5 !== null &&
          s.section1.q6 !== null &&
          s.section1.q7 !== null
        ));
    }

    if (this.section === 2) {
      return s.section2.q0 !== null &&
        s.section2.q01 !== null &&
        (s.section2.q01 === 'no' || (
          s.section2.q1 !== null &&
          s.section2.q2 !== null &&
          s.section2.q3 !== null &&
          s.section2.q4 !== null &&
          s.section2.q5 !== null &&
          s.section2.q6 !== null &&
          s.section2.q7 !== null &&
          s.section2.q8 !== null &&
          s.section2.q9 !== null
        ));
    }

    if (this.section === 3) {
      return s.section3.q0 !== null &&
        s.section3.q1 !== null &&
        s.section3.q3 !== null &&
        s.section3.q4 !== null;
    }

    return false;
  }
}
