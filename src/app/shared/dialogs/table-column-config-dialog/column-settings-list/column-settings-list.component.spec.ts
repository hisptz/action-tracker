import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSettingsListComponent } from './column-settings-list.component';

describe('ColumnSettingsListComponent', () => {
  let component: ColumnSettingsListComponent;
  let fixture: ComponentFixture<ColumnSettingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnSettingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
