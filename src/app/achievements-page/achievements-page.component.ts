import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';

// Расширяем тип HTMLCanvasElement, добавляя свойство chart
interface ChartCanvasElement extends HTMLCanvasElement {
  chart?: Chart;
}

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements-page.component.html',
  styleUrls: ['./achievements-page.component.css'],
})
export class AchievementsPageComponent implements AfterViewInit {
  @ViewChild('progressChart') chartCanvas!: ElementRef<ChartCanvasElement>;

  // Текущая вкладка
  currentSemester: number = 1; // 1 или 2

  // Данные с бэкенда (0-100%)
  maxLevel: number = 100;

  // Месяцы
  semester1Months: string[] = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь','Сессия'];
  semester2Months: string[] = ['Февраль', 'Март', 'Апрель', 'Май','Сессия'];

  // Прогресс по месяцам (реальные данные)
  semester1Progress: number[] = [85, 20, 72, 75, 70]; // Сентябрь–Декабрь
  semester2Progress: number[] = [30, 90, 75, 70, 60]; // Февраль–Май

  // Экзамены и зачёты
  semester1ExamsTotal: number = 8;
  semester1ExamsPassed: number = 4;
  semester2ExamsTotal: number = 9;
  semester2ExamsPassed: number = 3;

  // Уровни достижений для каждого месяца
  monthlyLevels: { [month: string]: { level75: number; level90: number; level100: number; stars: boolean[] } } = {};

  constructor() {
    // Инициализация уровней достижений для каждого месяца
    this.semester1Months.forEach((month, index) => {
      const progress = this.semester1Progress[index];
      this.monthlyLevels[month] = {
        level75: this.maxLevel *0.85 * 0.75,
        level90: this.maxLevel *0.85 * 0.9,
        level100: this.maxLevel *0.85,
        stars: [
          progress >= this.maxLevel*0.85 * 0.75,
          progress >= this.maxLevel*0.85 * 0.9,
          progress >= this.maxLevel*0.85,
        ],
      };
    });

    this.semester2Months.forEach((month, index) => {
      const progress = this.semester2Progress[index];
      this.monthlyLevels[month] = {
        level75: this.maxLevel *0.85 * 0.75,
        level90: this.maxLevel *0.85 * 0.9,
        level100: this.maxLevel*0.85,
        stars: [
          progress >= this.maxLevel*0.85 * 0.75,
          progress >= this.maxLevel*0.85 * 0.9,
          progress >= this.maxLevel*0.85,
        ],
      };
    });
  }

  ngAfterViewInit() {
    this.createChart();
  }

  switchSemester(semester: number) {
    this.currentSemester = semester;
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const months = this.currentSemester === 1 ? this.semester1Months : this.semester2Months;
    const progress = this.currentSemester === 1 ? this.semester1Progress : this.semester2Progress;

    const chartData: ChartData<'line'> = {
      labels: months,
      datasets: [
        {
          label: 'Прогресс',
          data: progress,
          borderColor: '#007bff',
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return '#e0e0e0';
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(0, 123, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 127, 0, 0.1)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ff7f00',
          pointBorderColor: '#ff7f00',
          pointRadius: 5,
        },
      ],
    };

    const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: this.maxLevel,
          title: {
            display: true,
            text: 'Посещаемость (%)',
            color: '#333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Месяцы',
            color: '#333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    // Уничтожаем предыдущий график, если он существует
    if (this.chartCanvas.nativeElement.chart) {
      this.chartCanvas.nativeElement.chart.destroy();
    }

    // Создаём новый график и сохраняем его
    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    this.chartCanvas.nativeElement.chart = chart;
  }
}
