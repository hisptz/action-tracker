import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared';

import { DataEntryComponent } from './data-entry.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/core/store/reducers';
import { ActionTrackerWidgetComponent } from 'src/app/shared/modules/action-tracker-table/containers/action-tracker-widget/action-tracker-widget.component';
import { FormComponent } from 'src/app/shared/modules/action-tracker-table/components/form/form.component';
import { WidgetItemLoaderComponent } from 'src/app/shared/modules/action-tracker-table/components/widget-item-loader/widget-item-loader.component';
import { FormInputItemComponent } from 'src/app/shared/modules/action-tracker-table/components/form-input-item/form-input-item.component';
import { TextAreaInputComponent } from 'src/app/shared/modules/action-tracker-table/components/data-item/text-area-input/text-area-input.component';

describe('DataEntryComponent', () => {
  let component: DataEntryComponent;
  let fixture: ComponentFixture<DataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, { metaReducers })],
      declarations: [
        DataEntryComponent,
        ActionTrackerWidgetComponent,
        FormComponent,
        WidgetItemLoaderComponent,
        FormInputItemComponent,
        TextAreaInputComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
