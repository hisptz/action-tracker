import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBarComponent } from './export-bar.component';

describe('ExportBarComponent', () => {
  let component: ExportBarComponent;
  let fixture: ComponentFixture<ExportBarComponent>;

  beforeEach(async(() => {
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
