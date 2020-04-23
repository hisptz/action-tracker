import {
  Visualization,
  VisualizationLayer,
  VisualizationDataSelection,
} from '../../analysis/modules/ngx-dhis2-visualization/models';
import { find } from 'lodash';
export function getVisualizationForAction(
  visualizations: Visualization[],
  params: any
): Visualization {
  const visualization = find(visualizations, ['id', params.interventionId]);

  if (!visualization) {
    return null;
  }

  return {
    ...visualization,
    layers: getActionVisualizationLayers(
      visualization.layers,
      params.indicatorId
    ),
  };
}

function getActionVisualizationLayers(
  layers: VisualizationLayer[],
  actionIndicatorId: string
): VisualizationLayer[] {
  return (layers || []).map((layer: VisualizationLayer) => {
    return {
      ...layer,
      dataSelections: (layer.dataSelections || []).map(
        (dataSelection: VisualizationDataSelection) => {
          if (dataSelection.dimension === 'dx') {
            return {
              ...dataSelection,
              items: (dataSelection.items || []).filter(
                (item: any) =>
                  item.id === actionIndicatorId || item.isEffectiveCoverage
              ),
            };
          }
          return dataSelection;
        }
      ),
    };
  });
}
