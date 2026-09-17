const TARGET_PANEL_WIDTH_PX = 144;

function getEdgeInsetPx(viewportWidth) {
  const preferred = viewportWidth * 0.02;
  const min = 2;
  const max = 8;
  return Math.min(max, Math.max(min, preferred));
}

export function getSearchPanelStyle(anchor) {
  const viewportWidth = window.innerWidth;
  const edgeInset = getEdgeInsetPx(viewportWidth);
  const horizontalMargin = Math.max(edgeInset, Math.min(6, viewportWidth * 0.04));
  const availableWidth = Math.max(0, viewportWidth - horizontalMargin * 2);
  const panelWidth = Math.min(TARGET_PANEL_WIDTH_PX, availableWidth);
  const rect = anchor.getBoundingClientRect();

  if (viewportWidth < 180 || availableWidth < TARGET_PANEL_WIDTH_PX) {
    return {
      top: `${rect.bottom + 6}px`,
      left: `${horizontalMargin}px`,
      right: `${horizontalMargin}px`,
      width: "auto",
      maxWidth: `calc(100vw - ${horizontalMargin * 2}px)`,
    };
  }

  let right = viewportWidth - rect.right;
  const leftEdge = viewportWidth - right - panelWidth;

  if (leftEdge < horizontalMargin) {
    right = viewportWidth - panelWidth - horizontalMargin;
  }

  right = Math.max(horizontalMargin, right);

  return {
    top: `${rect.bottom + 6}px`,
    right: `${right}px`,
    width: `${panelWidth}px`,
    maxWidth: `${panelWidth}px`,
  };
}
