export function setTitle(title: string, appTitle?: string) {
  const _title = title ? ` ${title}-${appTitle} ` : `${appTitle}`;
  document.title = _title;
}
