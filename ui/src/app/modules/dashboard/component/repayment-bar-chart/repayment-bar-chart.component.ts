import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: '[repayment-bar-chart]',
  templateUrl: './repayment-bar-chart.component.html',
  styleUrls: ['./repayment-bar-chart.component.scss']
})
export class RepaymentBarChartComponent implements OnInit {

  lastMonthRepayment: number = 40000;
  currentMonthRepayment: number = 56345;

  constructor(private dashbaordService: DashboardService) { }

  ngOnInit() {
    this.getRepaymentBarChartData();
  }

  getRepaymentBarChartData() {
    this.dashbaordService.getCurrentAndLastMonthRepayments().subscribe(data => {
      this.currentMonthRepayment = data.currentMonthRepayment;
      this.lastMonthRepayment = data.lastMonthRepayment;
      this.drawChart();
    }, error => {
      console.log(error);
    })
  }

  drawChart() {
    new Chart(document.getElementById("repayment-bar-chart"), {
      type: 'bar',
      data: {
        labels: ["Last Month", "Current Month"],
        datasets: [
          {
            backgroundColor: ["#F7BACE", "#87F7F0"],
            data: [this.lastMonthRepayment, this.currentMonthRepayment]
          }
        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
