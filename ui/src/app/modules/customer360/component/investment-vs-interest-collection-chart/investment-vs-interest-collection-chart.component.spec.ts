/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvestmentVsInterestCollectionChartComponent } from './investment-vs-interest-collection-chart.component';

describe('InvestmentVsInterestCollectionChartComponent', () => {
  let component: InvestmentVsInterestCollectionChartComponent;
  let fixture: ComponentFixture<InvestmentVsInterestCollectionChartComponent>;

  beforeEach(async(() => {
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
