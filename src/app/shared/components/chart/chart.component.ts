import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectorRef, Component, effect, inject, input, InputSignal, OnDestroy, PLATFORM_ID} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {Subject} from 'rxjs';
import {IS_DARK_MODE} from '../../services/app-theme';

export interface IDashValues {
  id: number,
  canceled: IMonthValues[],
  finished: IMonthValues[],
}

export interface IMonthValues {
  id?: number;
  month: number;
  value: number;
}

@Component({
  selector: 'chart',
  imports: [
    ChartModule
  ],
  templateUrl: './chart.component.html',
  standalone: true,
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnDestroy{
  public dataDashboard: InputSignal<IDashValues | null> = input<IDashValues | null>(null);

  private readonly _cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _destroy: Subject<void> = new Subject<void>();
  private readonly _isDarkMode = inject(IS_DARK_MODE);
  public data: any;
  public options: any;

  constructor() {
    effect(() => {
      this.initChart(this._isDarkMode());
    });

  }

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  initChart(darkMode: boolean) {
    if (isPlatformBrowser(this._platformId)) {
      const textColor = darkMode?'#FFFFFF':'#022c22';
      const lineHorizontal = darkMode?'#ebedef':'#E2E8F9';
      const lineVertical = darkMode?'#ebedef':'#E2E8F9';
      const textColorValueVertical = darkMode?'#FFFFFF':'#022c22'

      const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

      const finishedValues = [];
      const canceledValues = [];
      let maxValue = 0;

      for (let i = 1; i < 13; i++) {
        const mes = 1 + i;
        const finished: IMonthValues | undefined = this.dataDashboard()?.finished.find((p: IMonthValues) => p.month === mes);
        const canceled: IMonthValues | undefined = this.dataDashboard()?.canceled.find((p: IMonthValues) => p.month === mes);

        finishedValues.push(finished?finished.value:0);
        canceledValues.push(canceled?.value??0);
      }

      // TODO ONLY FOR DEMONSTRATION
      for (let i = 0; i < 9; i++) {
        finishedValues[i] = Math.floor(10 + Math.random() * 50); // Random values between 10M and 60M
        canceledValues[i] = Math.floor(10 + Math.random() * 50); // Random values between 10M and 60M
      }
      maxValue = 70;
      //////////////////////////////

      maxValue += 5;
      const interval = Math.ceil(maxValue / 100) * 25;

      const currentMonthIndex = Math.max(0, Math.min(11, 0)) + 11;

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'OS Executadas',
            data: finishedValues,
            fill: true,
            borderColor: '#10b981',
            backgroundColor: 'transparent',
            pointRadius: 2,
            pointHoverRadius: 3,
            borderWidth: 2,
            pointBorderWidth: 1,
            pointBackgroundColor: (ctx: any) => {
              return ctx.dataIndex <= currentMonthIndex ? '#10b981' : 'transparent';
            },
            pointBorderColor: (ctx: any) => {
              return ctx.dataIndex <= currentMonthIndex ? '#10b981' : 'transparent';
            },
            segment: {
              borderColor: (ctx: any) => {
                return ctx.p0DataIndex <= currentMonthIndex - 1 && ctx.p1DataIndex <= currentMonthIndex
                  ? '#10b981'
                  : 'transparent';
              }
            }
          },
          {
            label: 'OS Canceladas',
            data: canceledValues,
            fill: true,
            borderColor: '#ff6259',
            backgroundColor: 'transparent',
            pointRadius: 2,
            pointHoverRadius: 3,
            borderWidth: 2,
            pointBorderWidth: 1,
            pointBackgroundColor: (ctx: any) => {
              return ctx.dataIndex <= currentMonthIndex ? '#ff6259' : 'transparent';
            },
            pointBorderColor: (ctx: any) => {
              return ctx.dataIndex <= currentMonthIndex ? '#ff6259' : 'transparent';
            },
            segment: {
              borderColor: (ctx: any) => {
                return ctx.p0DataIndex <= currentMonthIndex - 1 && ctx.p1DataIndex <= currentMonthIndex
                  ? '#ff6259'
                  : 'transparent';
              },
              borderDash: (ctx: any) => [5, 5]
            }
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1.6,
        responsive: true,
        plugins: {
          title: {
            display: true,
            align: 'start',
            text: 'Comparativo Mensal',
            color: textColor,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#0d1234',
            titleColor: textColor,
            bodyColor: '#ffffff',
            borderColor: '#ff6a17',
            borderWidth: 1,
            padding: 7,
            bodyFont: {
              size: 14,
              weight: 'bold'
            },
            displayColors: false,
            callbacks: {
              title: () => '',
              label: (context: any) => {
                const valor = context.parsed.y;
                return valor + " OS";
              }
            },
          },
        },
        scales: {
          x: {
            offset: true,
            ticks: {
              color: textColor
            },
            grid: {
              display: false,
              color: lineHorizontal,
            }
          },
          y: {
            min: 0,
            max: maxValue,
            ticks: {
              callback: (value: number) => {
                return value <= (interval * 4) ? value : ''
              },
              color: textColorValueVertical,
              borderColor: '#E2E8F9',
              font: {
                size: 12
              }
            },
            afterBuildTicks: (axis: any) => {
              axis.ticks = [interval, interval * 2, interval * 3, interval * 4].map((v) => ({ value: v }));
            },
            grid: {
              display: true,
              color: lineVertical,
            }
          }
        }
      };
      this._cd.markForCheck()
    }
  }
}
