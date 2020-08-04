import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { removeInterventionFromList } from '../../helpers/remove-intervention-from-list.helper';
import { Intervention } from '../../models/intervention.model';
import { LoadInterventions } from '../../store/actions/intervention.actions';
import { State } from '../../store/reducers/intervention.reducer';
import {
  getInterventions,
  getInterventionsLoadingStatus
} from '../../store/selectors/intervention.selectors';
import * as _ from 'lodash';

@Component({
  selector: 'app-intervention-filter',
  templateUrl: './intervention-filter.component.html',
  styleUrls: ['./intervention-filter.component.css']
})
export class InterventionFilterComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() selectedInterventions: any[];
  @Input()
  interventionFilterConfig: any = {
    resetOnInterventionTypeChange: false,
    emitOnSelection: false,
    singleSelection: false
  };

  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();

  availableInterventions$: Observable<Intervention[]>;
  loadingInterventions$: Observable<boolean>;

  interventionTypes: any[];
  selectedItemsList = [];
  deselectedItemsList = [];
  searchText = '';

  constructor(private store: Store<State>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedInterventions &&
      !changes.selectedInterventions.firstChange
    ) {
      this._setAvailableInterventions();
    }
  }

  ngOnInit() {
    // Initialize selected interventions if not defined
    if (!this.selectedInterventions) {
      this.selectedInterventions = [];
    }

    this.store.dispatch(new LoadInterventions());

    this.loadingInterventions$ = this.store.select(
      getInterventionsLoadingStatus
    );

    this._setAvailableInterventions();
  }

  onSelectIntervention(intervention, e) {
    e.stopPropagation();

    if (this.interventionFilterConfig.singleSelection) {
      this.selectedInterventions = [];
    }

    // Add selected intervention to selection bucket
    this.selectedInterventions = [...this.selectedInterventions, intervention];

    this._setAvailableInterventions();
  }

  onDeselectIntervention(intervention: any, e) {
    e.stopPropagation();

    // Remove intervention from selection list
    this.selectedInterventions = removeInterventionFromList(
      this.selectedInterventions,
      intervention
    );

    this._setAvailableInterventions();
  }

  updateInterventionType(interventionType: string, e) {
    e.stopPropagation();

    if (this.interventionFilterConfig.resetOnInterventionTypeChange) {
      this.selectedInterventions = [];
    }

    this._setAvailableInterventions();
  }

  onSelectAllInterventions(e, availableInterventions: any[]) {
    e.stopPropagation();

    this.selectedItemsList = availableInterventions;
    this.moveSelectedItems(e);
  }

  onDeselectAllInterventions(e) {
    e.stopPropagation();
    this.deselectedItemsList = this.selectedInterventions;
    this.moveDeselectedItems(e);
  }

  onUpdate(e) {
    e.stopPropagation();
    this._onUpdateIntervention();
  }

  onClose(e) {
    e.stopPropagation();
    this.close.emit(this._getInterventionSelection());
  }

  private _getInterventionSelection() {
    return {
      items: this.selectedInterventions,
      dimension: 'intervention',
      changed: true
    };
  }

  private _onUpdateIntervention() {
    this.update.emit(this._getInterventionSelection());
  }

  private _setAvailableInterventions() {
    this.availableInterventions$ = this.store.select(
      getInterventions(this.selectedInterventions)
    );
  }

  ngOnDestroy() {
    this.close.emit(this._getInterventionSelection());
  }
  isInArray(arr: any[], id) {
    const item = _.find(arr || [], (arrItem) => arrItem.id === id) || '';
    return item ? true : false;
  }
  onClickToSelectData(dataFilterItem, dataFilterItems, e, type) {
    if (
      this.interventionFilterConfig &&
      this.interventionFilterConfig.hasOwnProperty('singleSelection') &&
      !this.interventionFilterConfig.singleSelection
    ) {
      const { ctrlKey, shiftKey } = e;
      e.stopPropagation();
      switch (type) {
        case 'SELECT': {
          this.updateSelectedItemsList(dataFilterItem,dataFilterItems, ctrlKey, shiftKey);
          break;
        }
        case 'DESELECT': {
          this.updateDeselectedItemsList(dataFilterItem, dataFilterItems, ctrlKey, shiftKey);
          break;
        }

        default:
          break;
      }
    } else {
      switch (type) {
        case 'SELECT': {
          this.updateSingleSelectedPeriodList(dataFilterItem);
          break;
        }
        case 'DESELECT': {
          this.updateSingleDeselectedPeriodList(dataFilterItem);
          break;
        }

        default:
          break;
      }

    }
  }
  updateSelectedItemsList(item, dataFilterItems, ctrlKey, shiftKey) {
    if ((ctrlKey && shiftKey) || shiftKey) {
      const itemIndex =
        item && item.hasOwnProperty('id') && dataFilterItems
          ? dataFilterItems.findIndex(
              (availableItem) => availableItem.id === item.id
            ) || 0
          : 0;

      this.selectedItemsList =
        dataFilterItems && dataFilterItems.length >= 0
          ? _.uniqBy(
              [
                ...this.selectedItemsList,
                ...dataFilterItems.slice(0, itemIndex + 1),
              ],
              'id'
            ) || this.selectedItemsList
          : [];
    } else if (ctrlKey) {
      const itemInList =
        item && item.hasOwnProperty('id')
          ? _.find(
              this.selectedInterventions || [],
              (selectedItem) => selectedItem.id === item.id
            )
          : null;
      this.selectedItemsList =
        itemInList && itemInList.hasOwnProperty('id')
          ? _.filter(
              this.selectedItemsList || [],
              (periodListItem) => periodListItem.id !== itemInList.id
            ) || this.selectedItemsList
          : [...this.selectedItemsList, item];
    } else {
      this.selectedItemsList = [...[], item];
    }
  }
  updateDeselectedItemsList(item, dataFilterItems, ctrlKey, shiftKey) {

    if ((ctrlKey && shiftKey) || shiftKey) {
      const itemIndex =
      item && item.hasOwnProperty('id') && this.selectedInterventions
        ? this.selectedInterventions.findIndex(
            (availableItem) => availableItem.id === item.id
          ) || 0
        : 0;
       

      this.deselectedItemsList =
        this.selectedInterventions && this.selectedInterventions.length >= 0
          ? _.uniqBy(
              [
                ...this.deselectedItemsList,
                ...this.selectedInterventions.slice(0, itemIndex + 1),
              ],
              'id'
            ) || this.deselectedItemsList
          : [];
    } else if (ctrlKey) {
      const itemInList =
        item && item.hasOwnProperty('id')
          ? _.find(
              this.deselectedItemsList || [],
              (deselectedPeriod) => deselectedPeriod.id === item.id
            )
          : null;
      this.deselectedItemsList =
      itemInList && itemInList.hasOwnProperty('id')
          ? _.filter(
              this.deselectedItemsList || [],
              (dataListItem) => dataListItem.id !== itemInList.id
            ) || this.deselectedItemsList
          : [...this.deselectedItemsList, item];
    } else {
      this.deselectedItemsList = [...[], item];
    }

  }
  updateSingleSelectedPeriodList(dataFilterItem) {

  }
  updateSingleDeselectedPeriodList(dataFilterItem) {

  }
  moveSingleSelectedDataItem(item, e) {
    this.onSelectIntervention(item, e);
    this.selectedItemsList = [];
 }
 moveSingleDeselectedDataItem(dataItem, e) {
   this.onDeselectIntervention(dataItem, e);
   this.deselectedItemsList = [];
}
  moveSelectedItems(e) {
    this.selectedItemsList = _.flattenDeep(
      _.map(this.selectedItemsList || [], (dataItem) => {
        this.onSelectIntervention(dataItem, e);
        const itemMoved =
          dataItem && dataItem.hasOwnProperty('id') && dataItem.id
            ? _.find(
                this.selectedInterventions || [],
                (selectedItem) => selectedItem.id === dataItem.id
              )
            : null;
        return itemMoved ? [] : dataItem;
      }) || []
    );
  }
  moveDeselectedItems(e) {
    this.deselectedItemsList = _.flattenDeep(
      _.map(this.deselectedItemsList || [], (dataItem) => {
        this.onDeselectIntervention(dataItem, e);
        const itemMoved =
          dataItem && dataItem.hasOwnProperty('id') && dataItem.id
            ? _.find(
                this.selectedInterventions || [],
                (selectedItem) => selectedItem.id === dataItem.id
              )
            : null;
        return itemMoved ? dataItem : [];
      }) || []
    );
  }
}
