import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/modules/customer/service/customer.service';

@Component({
  selector: '[customer-number-card]',
  templateUrl: './customer-number-card.component.html',
  styleUrls: ['./customer-number-card.component.scss']
})
export class CustomerNumberCardComponent implements OnInit {

  data: number = 0;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(data => {
      this.data = data.length;
    }, error => {
      console.log(error);
    })
  }
}
