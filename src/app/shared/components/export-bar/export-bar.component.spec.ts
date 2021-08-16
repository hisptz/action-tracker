import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExportBarComponent } from './export-bar.component';

describe('ExportBarComponent', () => {
  let component: ExportBarComponent;
  let fixture: ComponentFixture<ExportBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
