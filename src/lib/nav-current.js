export function isNavItemCurrent(pathname, href) {
  if (href === "/about") {
    return pathname === "/about";
  }

  if (href === "/services") {
    return pathname === "/services";
  }

  if (href === "/team") {
    return pathname === "/team";
  }

  return false;
}
