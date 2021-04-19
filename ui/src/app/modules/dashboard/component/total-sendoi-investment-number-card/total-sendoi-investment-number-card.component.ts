import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: '[total-sendoi-investment-number-card]',
  templateUrl: './total-sendoi-investment-number-card.component.html',
  styleUrls: ['./total-sendoi-investment-number-card.component.scss']
})
export class TotalSendoiInvestmentNumberCardComponent implements OnInit {

  data: number = 0;

  constructor(private dashbaordService: DashboardService) { }

  ngOnInit() {
    this.getAllInvestment();
  }

  getAllInvestment(){
    this.dashbaordService.getTotalInvestment().subscribe(data=>{
      this.data = data;
    }, error=>{
      console.log(error);
      
    });
  }

}
