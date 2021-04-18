import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: '[overall-sendoi-donought-chart]',
  templateUrl: './overall-sendoi-donought-chart.component.html',
  styleUrls: ['./overall-sendoi-donought-chart.component.scss']
})
export class OverallSendoiDonoughtChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(){
    new Chart(document.getElementById("overall-sendoi-chart"), {
      type: 'doughnut',
      data: {
        labels: ["Tatol investment", "Interest collection"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: [2478,5267]
          }
        ]
      },
      options: {
        legend:{
          position:"bottom"
        },
        title: {
          display: false,
          text: 'Sendoi Against Interest collection'
        }
      }
  });
  }

}
