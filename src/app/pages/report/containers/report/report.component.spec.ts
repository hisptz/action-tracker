import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import { ActionTrackerWidgetComponent } from 'src/app/shared/modules/action-tracker-table/containers/action-tracker-widget/action-tracker-widget.component';
import { FormComponent } from 'src/app/shared/modules/action-tracker-table/components/form/form.component';
import { TextViewComponent } from 'src/app/shared/modules/action-tracker-table/components/text-view/text-view.component';
import { DatePickerComponent } from 'src/app/shared/modules/action-tracker-table/components/date-picker/date-picker.component';
import { WidgetItemLoaderComponent } from 'src/app/shared/modules/action-tracker-table/components/widget-item-loader/widget-item-loader.component';
import { FormInputItemComponent } from 'src/app/shared/modules/action-tracker-table/components/form-input-item/form-input-item.component';
import { TextAreaInputComponent } from 'src/app/shared/modules/action-tracker-table/components/data-item/text-area-input/text-area-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'ngx-contextmenu';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/core/store/reducers';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatCardModule,
        NgbDatepickerModule,
        ContextMenuModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers })
      ],
      declarations: [
        ReportComponent,
        ActionTrackerWidgetComponent,
        FormComponent,
        TextViewComponent,
        DatePickerComponent,
        WidgetItemLoaderComponent,
        FormInputItemComponent,
        TextAreaInputComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
