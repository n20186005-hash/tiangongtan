export function withTrailingSlash(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function absoluteUrl(pathname: string, site: URL | undefined): string | undefined {
  if (!site) return undefined;
  return new URL(withTrailingSlash(pathname), site).toString();
}

export function absoluteAsset(pathname: string, site: URL | undefined): string | undefined {
  if (!site) return undefined;
  return new URL(pathname, site).toString();
}
