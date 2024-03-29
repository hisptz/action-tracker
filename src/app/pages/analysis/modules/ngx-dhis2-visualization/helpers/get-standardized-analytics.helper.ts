import * as _ from 'lodash';

export function getStandardizedAnalyticsObject(analyticsObject: any, preferNormalStructure: boolean = false) {
  if (analyticsObject && analyticsObject.count) {
    return analyticsObject;
  }
  const sanitizedAnalyticsObject: any = {
    headers: [],
    metaData: {
      names: null,
      dimensions: null
    },
    rows: []
  };

  if (analyticsObject) {
    /**
     * Check headers
     */
    if (analyticsObject.headers) {
      analyticsObject.headers.forEach((header: any) => {
        try {
          const newHeader: any = header;
          sanitizedAnalyticsObject.headers.push(newHeader);
        } catch (e) {
        }
      });
    }

    /**
     * Check metaData
     */
    if (analyticsObject.metaData) {
      try {
        const sanitizedMetadata: any = getSanitizedAnalyticsMetadata(analyticsObject.metaData, preferNormalStructure);
        sanitizedAnalyticsObject.metaData = sanitizedMetadata;
      } catch (e) {
        console.warn('Invalid metadata object');
      }
    }

    /**
     * Check rows
     */
    if (analyticsObject.rows) {
      sanitizedAnalyticsObject.rows = analyticsObject.rows;
    }
  }

  return analyticsObject ? sanitizedAnalyticsObject : null;
}

function getSanitizedAnalyticsMetadata(analyticMetadata: any, preferNormalStructure: boolean) {
  let sanitizedMetadata: any = {};

  if (analyticMetadata) {
    /**
     * Get metadata names
     */
    if (analyticMetadata.names) {
      sanitizedMetadata.names = analyticMetadata.names;
    } else if (analyticMetadata.items) {
      const metadataItemsKeys = _.keys(analyticMetadata.items);
      const metadataNames: any = {};
      if (metadataItemsKeys) {
        metadataItemsKeys.forEach(metadataItemKey => {
          metadataNames[metadataItemKey] = analyticMetadata.items[metadataItemKey].name;
        });
      }
      sanitizedMetadata['names'] = metadataNames;
      sanitizedMetadata['items'] = analyticMetadata.items;
    }

    /**
     * Get metadata dimensions
     */
    if (analyticMetadata.dimensions) {
      if (!preferNormalStructure) {
        sanitizedMetadata['dimensions'] = analyticMetadata.dimensions;
      } else {
        sanitizedMetadata = {
          ...sanitizedMetadata,
          ...analyticMetadata.dimensions
        };
      }
    } else {
      const metadataKeys = _.keys(analyticMetadata);
      const metadataDimensions: any = {};
      if (metadataKeys) {
        metadataKeys.forEach(metadataKey => {
          if (metadataKey !== 'names') {
            metadataDimensions[metadataKey] = analyticMetadata[metadataKey];
          }
        });
      }
      if (!preferNormalStructure) {
        sanitizedMetadata['dimensions'] = metadataDimensions;
      } else {
        sanitizedMetadata = {
          ...sanitizedMetadata,
          ...metadataDimensions
        };
      }
    }
  }

  return sanitizedMetadata;
}
