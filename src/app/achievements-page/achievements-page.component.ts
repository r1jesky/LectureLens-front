import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ответ бэкенда
export interface ProgressStatsDTO {
  scores: number[];
}

// ВЫНЕСИ этот сервис в отдельный файл progress.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private http: HttpClient) {}

  getProgress(userId: number, semester: number): Observable<ProgressStatsDTO> {
    // Поменяй адрес на реальный для твоего бэкенда!
    return this.http.get<ProgressStatsDTO>(`http://localhost:8080/api/students/{{userId}}/progress?
    semester={{$random.integer(100)}}`);
  }
}

// Расширяем тип HTMLCanvasElement, добавляя свойство chart
interface ChartCanvasElement extends HTMLCanvasElement {
  chart?: Chart;
}

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './achievements-page.component.html',
  styleUrls: ['./achievements-page.component.css'],
})
export class AchievementsPageComponent implements AfterViewInit {
  @ViewChild('progressChart') chartCanvas!: ElementRef<ChartCanvasElement>;

  currentSemester: number = 1;
  maxLevel: number = 20;
  userId = 1;

  semester1Months: string[] = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Сессия'];
  semester2Months: string[] = ['Февраль', 'Март', 'Апрель', 'Май', 'Сессия'];
  semester1Progress: number[] = [];
  semester2Progress: number[] = [];

  // остальные переменные без изменений...

  constructor(private progressService: ProgressService) {}

  ngAfterViewInit() {
    this.loadProgress(1);
  }

  loadProgress(semester: number) {
    this.progressService.getProgress(this.userId, semester)
      .subscribe((data: ProgressStatsDTO) => {
        if (semester === 1) {
          this.semester1Progress = data.scores;
        } else {
          this.semester2Progress = data.scores;
        }
        this.createChart();
      });
  }

  switchSemester(semester: number) {
    this.currentSemester = semester;
    this.loadProgress(semester);
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

    if (this.chartCanvas.nativeElement.chart) {
      this.chartCanvas.nativeElement.chart.destroy();
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    this.chartCanvas.nativeElement.chart = chart;
  }
}
