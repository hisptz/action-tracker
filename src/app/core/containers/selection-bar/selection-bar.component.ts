import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionFilterConfig } from 'src/app/shared/modules/selection-filters/models/selected-filter-config.model';
import { LegendConfigurationDialogComponent } from 'src/app/shared/dialogs/legend-configuration-dialog/legend-configuration-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getCurrentUserManagementAuthoritiesStatus } from '../../store/selectors/user.selectors';
import { Store, select} from '@ngrx/store';
import { State } from '../../store/reducers';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.css'],
})
export class SelectionBarComponent implements OnInit {
  @Input() selectionFilterConfig: SelectionFilterConfig;
  currentPage$: Observable<string>;
  isAdmin$: Observable<any>;

  @Output() filterUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private store: Store<State>) {}

  ngOnInit() {
    this.isAdmin$ = this.store.pipe(select(getCurrentUserManagementAuthoritiesStatus));
  }

  onFilterUpdate(selections: any) {
    this.filterUpdate.emit(selections);
  }

  openLegendDialog() {
    this.dialog.open(LegendConfigurationDialogComponent, {
      height: '400px',
    });
  }
}
