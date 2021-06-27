/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvestmentVsInterestCollectionChartComponent } from './investment-vs-interest-collection-chart.component';

describe('InvestmentVsInterestCollectionChartComponent', () => {
  let component: InvestmentVsInterestCollectionChartComponent;
  let fixture: ComponentFixture<InvestmentVsInterestCollectionChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentVsInterestCollectionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentVsInterestCollectionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
