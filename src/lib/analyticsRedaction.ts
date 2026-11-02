/**
 * Query strings on this site can hold health data: a shared result's `?r=` token
 * is a base64url encoding of the age, sex, height and weight entered, and `?q=`
 * is whatever was typed into search. Analytics gets the path and nothing after it.
 */
export function withoutQueryString<T extends { url: string }>(event: T): T {
  const url = new URL(event.url);
  url.search = '';
  url.hash = '';
  return { ...event, url: url.toString() };
}
