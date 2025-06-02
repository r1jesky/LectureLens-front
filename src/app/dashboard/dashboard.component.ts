import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  metrics = [
    { label: 'Научность', value: 78 },
    { label: 'Сложность', value: 62 },
    { label: 'Подача материала', value: 89 }
  ];

  sentiment = {
    negative: 18,
    neutral: 35,
    positive: 47
  };

  cloudPhrases = [
    { text: 'Отличный курс', count: 6 },
    { text: 'Много теории', count: 4 },
    { text: 'Интересные примеры', count: 5 },
    { text: 'Сложновато местами', count: 3 },
    { text: 'Хорошее объяснение', count: 5 },
    { text: 'Полезные задания', count: 4 },
    { text: 'Подача на высоте', count: 2 },
    { text: 'Не хватило практики', count: 3 },
    { text: 'Повторяется материал', count: 2 },
    { text: 'Всё понятно и ясно', count: 5 }
  ];

  getFontSize(count: number): number {
    const min = 14;
    const max = 48;
    return min + (max - min) * (Math.min(count, 6) / 6);
  }

  getPhraseColor(index: number): string {
    return index % 2 === 0 ? '#0056b3' : '#ff7f00';
  }

  sentimentChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Негатив', 'Нейтрально', 'Позитивно'],
    datasets: [{
      data: [
        this.sentiment.negative,
        this.sentiment.neutral,
        this.sentiment.positive
      ],
      backgroundColor: ['#0056b3', '#cccccc', '#ff7f00']
    }]
  };

  sentimentChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: { display: false }
    }
  };
}
