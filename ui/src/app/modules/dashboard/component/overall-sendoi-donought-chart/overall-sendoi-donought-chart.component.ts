import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ISendoiVsInterestCollection } from '../../dashboard.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: '[overall-sendoi-donought-chart]',
  templateUrl: './overall-sendoi-donought-chart.component.html',
  styleUrls: ['./overall-sendoi-donought-chart.component.scss']
})
export class OverallSendoiDonoughtChartComponent implements OnInit {

  data: ISendoiVsInterestCollection = {
    totalInterestCollection: 20000,
    totalInvested: 400000
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getSendoiDoghnutChartData();
  }

  getSendoiDoghnutChartData() {
    this.dashboardService.getRepaymentAgainstInvestment().subscribe(data=>{
      this.data = data;
      this.drawChart();
    }, error=>{
      console.log(error);
      
    })
  }

  drawChart() {
    new Chart(document.getElementById("overall-sendoi-chart"), {
      type: 'doughnut',
      data: {
        labels: ["Tatol investment", "Interest collection"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: [this.data.totalInvested, this.data.totalInterestCollection]
          }
        ]
      },
      options: {
        legend: {
          position: "bottom"
        },
        title: {
          display: false,
          text: 'Sendoi Against Interest collection'
        }
      }
    });
  }

}
