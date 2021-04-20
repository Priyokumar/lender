import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { IRepaymentByMonthChart } from '../../dashboard.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: '[sendoi-repayment-chart]',
  templateUrl: './sendoi-repayment-chart.component.html',
  styleUrls: ['./sendoi-repayment-chart.component.scss']
})
export class SendoiRepaymentChartComponent implements OnInit {

  data:IRepaymentByMonthChart = {
    labels:["JAN","FEB","MAR"],
    values:[86,114,106]
  }

  constructor(private dashbaordService: DashboardService) { }

  ngOnInit() {
    this.getRepaymentChart();
  }

  getRepaymentChart(){
    this.dashbaordService.findMonthWiseRepayments().subscribe(data=>{
      this.data = data;
      this.drawChart();
    }, error=>{
      console.log(error);
      
    })
  }

  drawChart(){
    new Chart(document.getElementById("sendoi-repayment-chart"), {
      type: 'line',
      data: {
        labels: this.data.labels,
        datasets: [{ 
            data: this.data.values,
            label: "Repayment",
            borderColor: "#08AEEA",
            backgroundColor:"#2af59a2d",
            fill: true, 
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'World population per region (in millions)'
        }
      }
    });
  }

}
