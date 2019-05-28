import * as _ from 'lodash';
export function openEntryForm(dataItem) {
  let dataItemRowElement;
  setTimeout(function() {
    dataItemRowElement = document.getElementById(
      `${dataItem.id || dataItem.rootCauseDataId}`
    );
    const parentDataItemElement = document.getElementById(
      `${dataItem.parentAction || dataItem.id}`
    );
    const actionTrackerItems = dataItemRowElement.getElementsByClassName(
      'action-tracker-column'
    );
    _.map(actionTrackerItems, (actionTrackerColumn, index) => {
      if (index !== actionTrackerItems.length - 1) {
        actionTrackerColumn.setAttribute('hidden', true);
      } else {
        actionTrackerColumn.colSpan = _.toString(actionTrackerItems.length - 1);

        const buttonElement = _.head(
          actionTrackerColumn.getElementsByClassName('btn-add-action')
        );

        const formElement = _.head(
          actionTrackerColumn.getElementsByClassName(
            'action-tracker-form-wrapper'
          )
        );

        if (dataItem.parentAction) {
          const parentButtonElement = _.head(
            parentDataItemElement.getElementsByClassName('btn-add-action')
          ).parentNode;
          parentButtonElement.setAttribute('hidden', true);
        }

        actionTrackerColumn.removeAttribute('hidden');
        buttonElement.setAttribute('hidden', true);
        formElement.removeAttribute('hidden');
      }
    });
  }, 400);
}
