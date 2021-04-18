/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalSendoiInvestmentNumberCardComponent } from './total-sendoi-investment-number-card.component';

describe('TotalSendoiInvestmentNumberCardComponent', () => {
  let component: TotalSendoiInvestmentNumberCardComponent;
  let fixture: ComponentFixture<TotalSendoiInvestmentNumberCardComponent>;

  beforeEach(async(() => {
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
