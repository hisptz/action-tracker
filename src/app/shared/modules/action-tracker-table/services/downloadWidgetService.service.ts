import { Injectable } from '@angular/core';
import * as _ from 'lodash';
declare var unescape: any;

@Injectable({ providedIn: 'root' })
export class DownloadWidgetService {
  exportXLS(filename: string, htmlTable: any) {
    if (this._getMsieVersion() || this._isFirefox()) {
      alert('Not supported browser');
    }
    // Other Browser can download xls
    if (htmlTable) {
      const uri = 'data:application/vnd.ms-excel;base64,',
        template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:' +
          'office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
          '<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
          '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
          '</head><body><table border="1">{table}</table><br /><table border="1">{table}</table></body></html>',
        base64 = s => window.btoa(unescape(encodeURIComponent(s))),
        format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

      const ctx = { worksheet: 'Sheet 1', filename: filename };
      let str =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office' +
        ':excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
        '<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
        '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';

      const codeWithoutNewLine = htmlTable.replace(/\r?\n|\r/g, '');

      const uncommentedTable = codeWithoutNewLine.replace(/<\!--(.*?)-->/g, '');

      const matchedTableContent = uncommentedTable.match(
        /<table[^>]*>([\w|\W]*)<\/table>/im
      );

      ctx['table1'] =
        matchedTableContent && matchedTableContent.length > 1
          ? matchedTableContent[1]
          : '';

      str +=
        '<b>{filename}</b><br/><table border="1">{table1}</table></body></html>';

      setTimeout(() => {
        const link = document.createElement('a');
        link.download = filename + '.xlsx';
        link.href = uri + base64(format(str, ctx));
        link.click();
      }, 100);
    }
  }

  exportCSV(filename: string, htmlTable: any, csv?: any) {
    // Generate our CSV string from out HTML Table
    const csvString = csv ? csv : this._tableToCSV(htmlTable);
    // Create a CSV Blob
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Determine which approach to take for the download
    if (navigator.msSaveOrOpenBlob) {
      // Works for Internet Explorer and Microsoft Edge
      navigator.msSaveOrOpenBlob(blob, filename + '.csv');
    } else {
      this._downloadAnchor(URL.createObjectURL(blob), 'csv', filename);
    }
  }

  private _getMsieVersion() {
    const userAgent = window.navigator.userAgent;

    const msie = userAgent.indexOf('MSIE ');

    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(
        userAgent.substring(msie + 5, userAgent.indexOf('.', msie)),
        10
      );
    }

    const trident = userAgent.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = userAgent.indexOf('rv:');
      return parseInt(
        userAgent.substring(rv + 3, userAgent.indexOf('.', rv)),
        10
      );
    }

    const edge = userAgent.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(
        userAgent.substring(edge + 5, userAgent.indexOf('.', edge)),
        10
      );
    }

    // other browser
    return false;
  }

  private _isFirefox() {
    if (navigator.userAgent.indexOf('Firefox') > 0) {
      return 1;
    }

    return 0;
  }

  private _downloadAnchor(content, ext, filename) {
    const anchor = document.createElement('a');
    anchor.style.display = '!important';
    anchor.id = 'downloadanchor';
    document.body.appendChild(anchor);

    // If the [download] attribute is supported, try to use it

    if ('download' in anchor) {
      anchor.download = filename + '.' + ext;
    }
    anchor.href = content;
    anchor.click();
    anchor.remove();
  }

  private _tableToCSV(table) {
    return _.join(
      _.map(table.rows, row =>
        _.join(
          _.compact(
            _.map(row.cells, cell =>
              cell.hidden || _.includes(cell.classList.value, 'hide-on-export')
                ? null
                : cell.textContent
            )
          ),
          ','
        )
      ),
      '\r\n'
    );
  }
}
