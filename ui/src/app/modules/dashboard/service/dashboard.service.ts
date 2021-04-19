import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../../shared/model/shared.model';
import { ISendoiVsInterestCollection } from '../dashboard.model';

@Injectable()
export class DashboardService {

constructor(private http: HttpClient) { }

getRepaymentAgainstInvestment(){
  return this.http.get<ISendoiVsInterestCollection>(ApiEndpoint.DASHBOARD+"/investment-vs-repayment");
}

getTotalInvestment(){
  return this.http.get<number>(ApiEndpoint.DASHBOARD+"/total-investment");
}

getCurrentAndLastMonthRepayments(){
  return this.http.get<any>(ApiEndpoint.DASHBOARD+"/current-last-month-repayments");
}

findMonthWiseRepayments(){
  return this.http.get<any>(ApiEndpoint.DASHBOARD+"/month-wise-repayments");
}

}
