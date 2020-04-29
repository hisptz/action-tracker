import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormFieldType } from '../../constants/form-field-types.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LegendSetState,
  getLegendSetsEntities,
  getActionStatusLegendSetItems,
} from '../../modules/selection-filters/modules/legend-set-configuration/store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
})
export class FormDialogComponent implements OnInit {
  formFieldType: any;
  formEntity: any;
  formGroup: FormGroup;
  legendSetItems$: Observable<any>;
  legendSetEntities$: Observable<{ [id: string]: any }>;

  minDate: Date;
  maxDate: Date;

  actionStartDateId: any;
  actionEndDateId: any;
  defaultActionStatus;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formDialogData: any,
    private legendSetStore: Store<LegendSetState>,
    private formBuilder: FormBuilder
  ) {
    this.legendSetStore
      .select(getActionStatusLegendSetItems)
      .subscribe((legends) => {
        this.defaultActionStatus = _.find(legends, 'isDefault');
      });
  }

  ngOnInit() {
    this.legendSetItems$ = this.legendSetStore.select(
      getActionStatusLegendSetItems
    );

    this.formFieldType = FormFieldType;

    const formEntity = {};
    if (
      this.formDialogData &&
      this.formDialogData.dataElements &&
      this.formDialogData.dataValues
    ) {
      this.minDate = this.formDialogData.minDate;
      this.maxDate = this.formDialogData.maxDate;

      this.formDialogData.dataElements.forEach((dataElement) => {
        if (dataElement.formControlName === 'startDate') {
          this.actionStartDateId =
            dataElement.id || dataElement.formControlName;
        } else if (dataElement.formControlName === 'endDate') {
          this.actionEndDateId = dataElement.id || dataElement.formControlName;
        } else if (_.has(this.formDialogData.dataValues, 'hasEvent')) {
          this.formDialogData.dataValues['actionStatus'] = this.formDialogData
            .dataValues['hasEvent']
            ? this.formDialogData.dataValues['actionStatus']
            : this.defaultActionStatus.id;
        }
        formEntity[dataElement.id || dataElement.formControlName] = [
          this.formDialogData.dataValues[dataElement.id] ||
            this.formDialogData.dataValues[dataElement.formControlName],
          [
            dataElement.required
              ? Validators.required
              : Validators.nullValidator,
            dataElement.valueType === 'PERCENTAGE'
              ? Validators.max(100)
              : Validators.nullValidator,
            dataElement.valueType === 'PERCENTAGE'
              ? Validators.min(0)
              : Validators.nullValidator,
          ],
        ];
      });
    }
    this.formGroup = this.formBuilder.group(formEntity);
  }

  get startDate(): any {
    return this.formGroup.get(this.actionStartDateId)
      ? this.formGroup.get(this.actionStartDateId).value
      : null;
  }

  get endDate(): any {
    return this.formGroup.get(this.actionEndDateId)
      ? this.formGroup.get(this.actionEndDateId).value
      : null;
  }

  onSubmitForm() {
    this.dialogRef.close({
      formValues: this.formGroup.value,
      formAction: 'SUBMIT',
    });
  }
}
