import { getSelectionDimensionsFromFavorite } from './get-selection-dimensions-from-favorite.helper';
import { getVisualizationLayout } from './get-visualization-layout.helper';

import { updateSelectionsWithBottleneckParams } from './update-selections-with-bottleneck.helper';

export function getVisualizationLayersFromFavorite(
  favorite: any,
  globalSelections: any[],
  bottleneckIndicatorIds: string[] = []
) {
  return (favorite ? favorite.mapViews || [favorite] : []).map(
    favoriteLayer => {
      const dataSelections = updateSelectionsWithBottleneckParams(
        getSelectionDimensionsFromFavorite(favoriteLayer),
        globalSelections,
        bottleneckIndicatorIds
      );

      return {
        id: favoriteLayer.id,
        dataSelections,
        layout: getVisualizationLayout(dataSelections),
        analytics: null,
        config: {
          ...favoriteLayer,
          type: 'LINE'
        }
      };
    }
  );
}
