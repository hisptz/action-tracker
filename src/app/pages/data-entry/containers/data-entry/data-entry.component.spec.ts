import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared';

import { DataEntryComponent } from './data-entry.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/core/store/reducers';
import { ActionTrackerWidgetComponent } from 'src/app/shared/modules/action-tracker-table/containers/action-tracker-widget/action-tracker-widget.component';
import { FormComponent } from 'src/app/shared/modules/action-tracker-table/components/form/form.component';
import { TextViewComponent } from 'src/app/shared/modules/action-tracker-table/components/text-view/text-view.component';
import { WidgetItemLoaderComponent } from 'src/app/shared/modules/action-tracker-table/components/widget-item-loader/widget-item-loader.component';
import { FormInputItemComponent } from 'src/app/shared/modules/action-tracker-table/components/form-input-item/form-input-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TextAreaInputComponent } from 'src/app/shared/modules/action-tracker-table/components/data-item/text-area-input/text-area-input.component';

describe('DataEntryComponent', () => {
  let component: DataEntryComponent;
  let fixture: ComponentFixture<DataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        ContextMenuModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers })
      ],
      declarations: [
        DataEntryComponent,
        ActionTrackerWidgetComponent,
        FormComponent,
        TextViewComponent,
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
