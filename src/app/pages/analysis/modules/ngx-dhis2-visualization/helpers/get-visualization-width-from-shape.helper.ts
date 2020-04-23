export function getVisualizationWidthFromShape(
  dashboardItemShape: string
): number {
  const fullWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  switch (dashboardItemShape) {
    case 'DOUBLE_WIDTH':
      return (fullWidth * 3) / 4;
    case 'FULL_WIDTH':
      return fullWidth;
    default:
      return fullWidth / 2;
  }
}
