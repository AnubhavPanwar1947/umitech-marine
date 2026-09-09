export function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

export function isSolidHeaderPage(pathname) {
  const path = normalizePathname(pathname);

  return (
    path === "/about" ||
    path === "/services" ||
    path.startsWith("/services/") ||
    path === "/team" ||
    path === "/contact" ||
    path === "/blog" ||
    path.startsWith("/blog/")
  );
}

export function isNavItemCurrent(pathname, href) {
  const path = normalizePathname(pathname);
  const link = normalizePathname(href);

  if (link === "/about") {
    return path === "/about";
  }

  if (link === "/services") {
    return path === "/services" || path.startsWith("/services/");
  }

  if (link === "/team") {
    return path === "/team";
  }

  if (link === "/blog") {
    return path === "/blog" || path.startsWith("/blog/");
  }

  return false;
}
