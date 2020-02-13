import { ConvertLegendIdPipe } from './convertLegendId.pipe';
import { ColorizePipe } from './colorize.pipe';
import { TextTruncatePipe } from './text-truncate.pipe';
import { IsCurrentYearPipe } from './is-current-year.pipe';
export const pipes: any[] = [
  ColorizePipe,
  ConvertLegendIdPipe,
  TextTruncatePipe,
  IsCurrentYearPipe
];
