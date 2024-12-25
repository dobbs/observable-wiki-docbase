export function fromJsonURL(url) {
  const [,base] = url.toString().match(/(^.*\/).*?$/);
  const favicon = new URL('./favicon.png', base);
  const sitemapURL = new URL('./system/sitemap.json', base);
  const siteindexURL = new URL('./system/site-index.json', base);
  const sitemap = fetcher('sitemap', sitemapURL);
  const siteindex = fetcher('siteindex', siteindexURL);
  function fetcher(which, url) {
    return async function() {
      const res = await fetch(url, {mode: 'cors'});
      if (res.ok) {
        return await res.json();
      } else {
        return {
          status: res.status,
          statusText: res.statusText,
          error: new Error(`${which} fetch(${url.toString()}) failed: ${res.statusText}`)
        };
      }
    }
  }

  return {
    base,
    favicon,
    sitemapURL,
    siteindexURL,
    sitemap,
    siteindex
  }
}
