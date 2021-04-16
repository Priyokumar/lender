import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { ICustomer } from '../customer.model';

@Injectable()
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<any>(ApiEndpoint.CUSTOMERS);
  }

  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<any>(ApiEndpoint.CUSTOMERS + "/" + id);
  }

  createCustomer(customer: ICustomer): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(ApiEndpoint.CUSTOMERS, customer);
  }

  updateCustomer(customer: ICustomer, id: number): Observable<IActionResponse> {
    return this.http.put<IActionResponse>(ApiEndpoint.CUSTOMERS + "/" + id, customer);
  }

  deleteCustomer(id: number): Observable<IActionResponse> {
    return this.http.delete<IActionResponse>(ApiEndpoint.CUSTOMERS + "/" + id);
  }


}
