import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormFieldType } from '../../constants/form-field-types.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LegendSetState,
  getActionStatusLegendSetItems
} from '../../modules/selection-filters/modules/legend-set-configuration/store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  formFieldType: any;
  formEntity: any;
  formGroup: FormGroup;
  legendSetItems$: Observable<any>;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formDialogData: any,
    private legendSetStore: Store<LegendSetState>,
    private formBuilder: FormBuilder
  ) {}

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
      this.formDialogData.dataElements.forEach(dataElement => {
        formEntity[dataElement.id || dataElement.formControlName] = [
          this.formDialogData.dataValues[dataElement.id] ||
            this.formDialogData.dataValues[dataElement.formControlName],
          dataElement.required ? Validators.required : ''
        ];
      });
    }
    this.formGroup = this.formBuilder.group(formEntity);
    console.log(this.formGroup);
  }

  onSubmitForm() {
    this.dialogRef.close({
      formValues: this.formGroup.value,
      formAction: 'SUBMIT'
    });
  }
}
