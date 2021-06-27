/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverallSendoiDonoughtChartComponent } from './overall-sendoi-donought-chart.component';

describe('OverallSendoiDonoughtChartComponent', () => {
  let component: OverallSendoiDonoughtChartComponent;
  let fixture: ComponentFixture<OverallSendoiDonoughtChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallSendoiDonoughtChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallSendoiDonoughtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
