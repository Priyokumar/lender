/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendoiRepaymentChartComponent } from './sendoi-repayment-chart.component';

describe('SendoiRepaymentChartComponent', () => {
  let component: SendoiRepaymentChartComponent;
  let fixture: ComponentFixture<SendoiRepaymentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendoiRepaymentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendoiRepaymentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
