/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalSendoiInvestmentNumberCardComponent } from './total-sendoi-investment-number-card.component';

describe('TotalSendoiInvestmentNumberCardComponent', () => {
  let component: TotalSendoiInvestmentNumberCardComponent;
  let fixture: ComponentFixture<TotalSendoiInvestmentNumberCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSendoiInvestmentNumberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSendoiInvestmentNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
