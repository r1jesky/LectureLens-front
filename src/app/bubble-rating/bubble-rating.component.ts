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

  responses: {
    section1: {
      q0: number | null;
      q01: boolean | null; // Изменил с 'yes' | 'no' на boolean для checkbox
      q1: number | null;
      q1c: string;
      q2: number | null;
      q3: number | null;
      q3c: string;
      q4: number | null;
      q4c: string;
      q5: number | null;
      q5c: string;
      q6: number | null;
      q6c: string;
      q7: number | null;
      q7c: string;
      q8: string;
    };
    section2: {
      q0: number | null;
      q01: boolean | null; // Изменил с 'yes' | 'no' на boolean для checkbox
      q1: number | null;
      q1c: string;
      q2: number | null;
      q3: number | null;
      q3c: string;
      q4: number | null;
      q4c: string;
      q5: number | null;
      q5c: string;
      q6: number | null;
      q6c: string;
      q7: number | null;
      q8: number | null;
      q8c: string;
      q9: number | null;
      q9c: string;
      q10: string;
      q11: number | null;
    };
    section3: {
      q0: number | null; // Исправил на q0 вместо q1 для первой оценки
      q0c: string;
      q1: number | null;
      q1c: string;
      q2: number | null;
      q2c: string;
      q3: 'yes' | 'partial' | 'no' | null;
      q4: number | null;
      q4c: string;
      q5: string;
    };
  } = {
    section1: {
      q0: null,
      q01: false, // Инициализируем как false для checkbox
      q1: null,
      q1c: '',
      q2: null,
      q3: null,
      q3c: '',
      q4: null,
      q4c: '',
      q5: null,
      q5c: '',
      q6: null,
      q6c: '',
      q7: null,
      q7c: '',
      q8: ''
    },
    section2: {
      q0: null,
      q01: false, // Инициализируем как false для checkbox
      q1: null,
      q1c: '',
      q2: null,
      q3: null,
      q3c: '',
      q4: null,
      q4c: '',
      q5: null,
      q5c: '',
      q6: null,
      q6c: '',
      q7: null,
      q8: null,
      q8c: '',
      q9: null,
      q9c: '',
      q10: '',
      q11: null
    },
    section3: {
      q0: null,
      q0c: '',
      q1: null,
      q1c: '',
      q2: null,
      q2c: '',
      q3: null as 'yes' | 'partial' | 'no' | null,
      q4: null,
      q4c: '',
      q5: '',
    },
  };

  select(section: number) {
    this.section = section;
  }

  submit() {
    console.log('Submitted responses:', this.responses);
    alert('Ответы отправлены! (Смотри консоль)');
  }

  trackByIndex = (index: number) => index;

  onCheckboxChange(section: string) {
    // Можно добавить логику, если нужно, например, сброс значений при снятии галочки
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
    } else if (section === 'section2' && !this.responses.section2.q01) {
      this.responses.section2.q1 = null;
      this.responses.section2.q1c = '';
      this.responses.section2.q2 = null;
      this.responses.section2.q3 = null;
      this.responses.section2.q3c = '';
      this.responses.section2.q4 = null;
      this.responses.section2.q4c = '';
    }
  }
}
