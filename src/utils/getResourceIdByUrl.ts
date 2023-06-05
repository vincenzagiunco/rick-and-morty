export function getResourceIdByUrl(url: string) {
  const splittedUrl = url.split("/");
  return splittedUrl[splittedUrl.length - 1];
}
