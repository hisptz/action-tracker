import { ConvertLegendIdPipe } from './convertLegendId.pipe';
import { ColorizePipe } from './colorize.pipe';
import { TextTruncatePipe } from './text-truncate.pipe';
export const pipes: any[] = [
  ColorizePipe,
  ConvertLegendIdPipe,
  TextTruncatePipe
];
