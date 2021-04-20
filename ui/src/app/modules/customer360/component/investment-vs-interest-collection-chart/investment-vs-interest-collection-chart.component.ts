import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICustomer } from 'src/app/modules/customer/customer.model';
import { ISendoiVsInterestCollection } from 'src/app/modules/dashboard/dashboard.model';
import Chart from 'chart.js';
import { DashboardService } from 'src/app/modules/dashboard/service/dashboard.service';

@Component({
  selector: '[investment-vs-interest-collection-chart]',
  templateUrl: './investment-vs-interest-collection-chart.component.html',
  styleUrls: ['./investment-vs-interest-collection-chart.component.scss']
})
export class InvestmentVsInterestCollectionChartComponent implements OnInit, OnChanges {

  @Input() customer: ICustomer;
  data: ISendoiVsInterestCollection = {
    totalInterestCollection: 0,
    totalInvested: 0
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.customer){
      this.getSendoiDoghnutChartData();
    }
  }

  ngOnInit() {
  }

  getSendoiDoghnutChartData() {
    this.dashboardService.getRepaymentAgainstInvestmentByCustomerId(this.customer.customerId).subscribe(data=>{
      this.data = data;
      this.drawChart();
    }, error=>{
      console.log(error);
      
    })
  }

  drawChart() {
    new Chart(document.getElementById("overall-customer-investment-interest-collection-chart"), {
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
