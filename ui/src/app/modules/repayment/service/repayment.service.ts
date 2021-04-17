import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { IRepayment } from '../repayment.model';

@Injectable()
export class RepaymentService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRepayments(): Observable<IRepayment[]> {
    return this.http.get<any>(ApiEndpoint.REPAYMENTS);
  }

  getRepaymentById(id: number): Observable<IRepayment> {
    return this.http.get<any>(ApiEndpoint.REPAYMENTS + "/" + id);
  }

  createRepayment(repayment: IRepayment): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(ApiEndpoint.REPAYMENTS, repayment);
  }

  updateRepayment(repayment: IRepayment, id: number): Observable<IActionResponse> {
    return this.http.put<IActionResponse>(ApiEndpoint.REPAYMENTS + "/" + id, repayment);
  }

  deleteRepayment(id: number): Observable<IActionResponse> {
    return this.http.delete<IActionResponse>(ApiEndpoint.REPAYMENTS + "/" + id);
  }

}
