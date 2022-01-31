import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendSetComponent } from './legend-set.component';

describe('LegendSetComponent', () => {
  let component: LegendSetComponent;
  let fixture: ComponentFixture<LegendSetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
