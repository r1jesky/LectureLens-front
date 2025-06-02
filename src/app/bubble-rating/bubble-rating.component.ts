import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bubble-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './bubble-rating.component.html',
  styleUrls: ['./bubble-rating.component.css'],
})
export class BubbleRatingComponent {
  // Активная секция опроса (1, 2 или 3)
  section = 1;

  // Храним ответы пользователя по каждой секции.
  // Все поля соответствуют вопросам в опроснике.
  // Названия ключей типа q1c, q4 и т.д. — это либо числовой ответ, либо комментарий к вопросу.
  responses = {
    section1: {
      q0: null as number | null,
      q01: null as 'yes' | 'no' | null, // Например, вопрос "да/нет"
      q1: null as number | null,
      q1c: '', // комментарий к вопросу q1
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
      q8c: '' // только комментарий
    },
    // Аналогично для других секций — состав и количество вопросов могут отличаться
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

  // Маппинг: локальные имена вопросов <-> id вопросов для передачи на сервер
  // Например, q1 — это внутренний ключ, 3 — id вопроса в БД
  questionsMapSection1 = {
    q0: 1, q01: 2, q1: 3, q1c: 3, q2: 4, q3: 5, q3c: 5,
    q4: 6, q4c: 6, q5: 7, q5c: 7, q6: 8, q6c: 8,
    q7: 9, q7c: 9, q8c: 10
  };
  questionsMapSection2 = {
    q0: 201, q01: 202, q1: 203, q1c: 204, q2: 205, q3: 206, q3c: 207,
    q4: 208, q4c: 209, q5: 210, q5c: 211, q6: 212, q6c: 213, q7: 214,
    q7c: 215, q8: 216, q8c: 217, q9: 218, q9c: 219, q10c: 220
  };
  questionsMapSection3 = {
    q0: 301, q0c: 302, q1: 303, q1c: 304, q2: 305, q2c: 306, q3: 307,
    q4: 308, q4c: 309, q5: 310
  };

  constructor(private http: HttpClient) {}

  // Метод переключения активной секции
  select(section: number) {
    this.section = section;
  }

  // Основная функция отправки формы
  submit() {
    // Проверяем, все ли обязательные поля заполнены
    if (!this.formValid()) {
      alert('Пожалуйста, ответьте на все обязательные вопросы.');
      return;
    }

    // Определяем, какую карту вопросов и какие ответы использовать в зависимости от текущей секции
    let questionsMap, sectionData;
    if (this.section === 1) {
      questionsMap = this.questionsMapSection1;
      sectionData = this.responses.section1;
    } else if (this.section === 2) {
      questionsMap = this.questionsMapSection2;
      sectionData = this.responses.section2;
    } else if (this.section === 3) {
      questionsMap = this.questionsMapSection3;
      sectionData = this.responses.section3;
    } else {
      alert('Неизвестный раздел!');
      return;
    }

    const mergedAnswers: Record<number, any> = {};

    Object.entries(sectionData)
      .filter(([key, value]) => value !== null && value !== '')
      .forEach(([key, value]) => {
        const isComment = key.endsWith('c');
        const questionId = questionsMap[key as keyof typeof questionsMap];
        if (!questionId) return;
        if (!mergedAnswers[questionId]) {
          mergedAnswers[questionId] = {
            questionId,
            answerValue: null,
            textComment: null,
            voiceCommentUrl: null,
            voiceCommentText: null,
            subjectId: null
          };
        }
        if (isComment) {
          mergedAnswers[questionId].textComment = String(value);
        } else {
          mergedAnswers[questionId].answerValue = String(value);
        }
      });

    const answers = Object.values(mergedAnswers);

    // Формируем payload для отправки — surveyId и respondentId заменить на реальные значения!
    const payload = {
      surveyId: 1, // ID опроса (заполнить реальным)
      userId: 1,
      respondentId: 1, // ID респондента (заполнить реальным)
      answers: answers // массив ответов

    };

    // Отправляем POST-запрос на сервер.
    // URL '/submit' заменить на тот, что используется в бэкенде!
    this.http.post('http://localhost:8080/submit', payload).subscribe({
      next: () => alert('Спасибо! Ваши ответы отправлены.'),
      error: () => alert('Ошибка при отправке!')
    });
  }

  // Трекер для ngFor в шаблоне — ускоряет рендеринг
  trackByIndex = (index: number) => index;

  // При изменении значения чекбокса (например, если ответ "нет" — сбрасываем зависимые поля)
  onCheckboxChange(section: string) {
    if (section === 'section1' && !this.responses.section1.q01) {
      // Если не выбрано "да" в q01, то все последующие вопросы сбрасываются
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
      // Аналогично для секции 2
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

  // Валидация формы: проверяем, что обязательные поля заполнены (логика зависит от секции)
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
