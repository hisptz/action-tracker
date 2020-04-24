import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { getDataElementsFromConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';

@Component({
  selector: 'app-fields-settings-dialog',
  templateUrl: './fields-settings-dialog.component.html',
  styleUrls: ['./fields-settings-dialog.component.css'],
})
export class FieldsSettingsDialogComponent implements OnInit {
  dataElements$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.dataElements$ = this.store.pipe(
      select(getDataElementsFromConfiguration)
    );
  }
  saveSettings(form) {
    const { value } = form.form;
    console.log({ value });
  }
}
