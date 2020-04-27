import { map, toString, head } from 'lodash';
export function openEntryForm(dataItem) {
  let dataItemRowElement;
  setTimeout(function () {
    dataItemRowElement = document.getElementById(
      `${dataItem.id || dataItem.rootCauseDataId}`
    );
    const parentDataItemElement = document.getElementById(
      `${dataItem.parentAction || dataItem.id}`
    );
    const actionTrackerItems = dataItemRowElement.getElementsByClassName(
      'action-tracker-column'
    );
    map(actionTrackerItems, (actionTrackerColumn, index) => {
      if (index !== actionTrackerItems.length - 1) {
        actionTrackerColumn.setAttribute('hidden', true);
      } else {
        actionTrackerColumn.colSpan = toString(actionTrackerItems.length - 1);

        const buttonElement = head(
          actionTrackerColumn.getElementsByClassName('add-action-block')
        );

        const formElement = head(
          actionTrackerColumn.getElementsByClassName(
            'action-tracker-form-wrapper'
          )
        );

        if (dataItem.parentAction) {
          const parentButtonElement = head(
            parentDataItemElement.getElementsByClassName('add-action-block')
          ).parentNode;
          parentButtonElement.setAttribute('hidden', true);
        }

        actionTrackerColumn.removeAttribute('hidden');
        buttonElement.setAttribute('hidden', true);
        formElement.removeAttribute('hidden');
      }
    });
  }, 200);
}
