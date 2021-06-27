import { Component, Input, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/modules/customer/customer.model';

@Component({
  selector: '[customer-details]',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  @Input() customer: ICustomer;

  constructor() { }

  ngOnInit() {
  }

}
