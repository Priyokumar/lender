import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { ILead, ILeadQueryParam } from '../lead.model';

@Injectable()
export class LeadService {

  constructor(
    private http: HttpClient
  ) { }

  getLeads(params?: ILeadQueryParam): Observable<ILead[]> {
    if(params){
      return this.http.get<any>(ApiEndpoint.LEADS, { params: params as any });
    } else{
      return this.http.get<any>(ApiEndpoint.LEADS);
    }
  }
  //leadId:"LEAD2021422483760"
  getLeadById(id: number): Observable<ILead> {
    return this.http.get<any>(ApiEndpoint.LEADS + "/" + id);
  }

  createLead(customer: ILead): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(ApiEndpoint.LEADS, customer);
  }

  updateLead(customer: ILead, id: number): Observable<IActionResponse> {
    return this.http.put<IActionResponse>(ApiEndpoint.LEADS + "/" + id, customer);
  }

  deleteLead(id: number): Observable<IActionResponse> {
    return this.http.delete<IActionResponse>(ApiEndpoint.LEADS + "/" + id);
  }

}
