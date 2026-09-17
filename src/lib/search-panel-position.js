const DESKTOP_BREAKPOINT_PX = 960;
const DESKTOP_PANEL_WIDTH_PX = 400;
const VIEWPORT_EDGE_PX = 12;
const MOBILE_EDGE_PX = 16;
const NARROW_EDGE_PX = 8;

export function getSearchPanelStyle(anchor) {
  const viewportWidth = window.innerWidth;
  const rect = anchor.getBoundingClientRect();
  const top = rect.bottom + 8;
  const isDesktop = viewportWidth >= DESKTOP_BREAKPOINT_PX;

  if (!isDesktop || viewportWidth < 180) {
    const edge =
      viewportWidth < 180
        ? NARROW_EDGE_PX
        : Math.min(MOBILE_EDGE_PX, Math.max(8, viewportWidth * 0.04));

    return {
      top: `${top}px`,
      left: `${edge}px`,
      right: `${edge}px`,
      width: "auto",
      maxWidth: `calc(100vw - ${edge * 2}px)`,
    };
  }

  const panelWidth = Math.min(
    DESKTOP_PANEL_WIDTH_PX,
    Math.max(280, viewportWidth - VIEWPORT_EDGE_PX * 2),
  );

  let right = viewportWidth - rect.right;
  const leftIfRightAligned = viewportWidth - right - panelWidth;

  if (leftIfRightAligned < VIEWPORT_EDGE_PX) {
    right = viewportWidth - panelWidth - VIEWPORT_EDGE_PX;
  }

  right = Math.max(VIEWPORT_EDGE_PX, right);

  return {
    top: `${top}px`,
    right: `${right}px`,
    width: `${panelWidth}px`,
    maxWidth: `${panelWidth}px`,
  };
}
