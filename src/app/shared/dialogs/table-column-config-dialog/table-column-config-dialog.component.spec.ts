import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableColumnConfigDialogComponent } from './table-column-config-dialog.component';

describe('TableColumnConfigDialogComponent', () => {
  let component: TableColumnConfigDialogComponent;
  let fixture: ComponentFixture<TableColumnConfigDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
