function getEdgeInsetPx(viewportWidth) {
  const preferred = viewportWidth * 0.02;
  const min = 2;
  const max = 12;
  return Math.min(max, Math.max(min, preferred));
}

export function getSearchPanelStyle(anchor) {
  const viewportWidth = window.innerWidth;
  const edgeInset = getEdgeInsetPx(viewportWidth);
  const panelWidth = Math.min(288, viewportWidth - 8);
  const rect = anchor.getBoundingClientRect();

  let right = viewportWidth - rect.right;
  const leftEdge = viewportWidth - right - panelWidth;

  if (leftEdge < edgeInset) {
    right = viewportWidth - panelWidth - edgeInset;
  }

  right = Math.max(edgeInset, right);

  return {
    top: `${rect.bottom + 8}px`,
    right: `${right}px`,
    width: `${panelWidth}px`,
    maxWidth: `${panelWidth}px`,
  };
}
