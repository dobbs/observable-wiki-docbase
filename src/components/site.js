import {html} from 'npm:htl';
import * as Inputs from "npm:@observablehq/inputs";

export function fromJsonURL(url) {
  const [,base] = url.toString().match(/(^.*\/).*?$/);
  const site = {
    base,
    favicon: new URL('./favicon.png', base),
    sitemapURL: new URL('./system/sitemap.json', base),
    siteindexURL: new URL('./system/site-index.json', base),
    sitemap: null,
    siteindex: null
  };
  site.fetchSitemap = fetcher('sitemap', site.sitemapURL);
  site.fetchSiteindex = fetcher('siteindex', site.siteindexURL);
  function fetcher(which, url) {
    return async function() {
      const res = await fetch(url, {mode: 'cors'});
      if (res.ok) {
        const json = await res.json();
        site[which] = json;
        return json;
      } else {
        return {
          status: res.status,
          statusText: res.statusText,
          error: new Error(`${which} fetch(${url.toString()}) failed: ${res.statusText}`)
        };
      }
    }
  }
  return site;
}

export function siteViewer(site) {
  const el = html`<article>
<header><h1>Site: ${site.base}</h1></header>
</article>`;
  site.fetchSitemap().then(sitemap => {
    const table = sitemap.map(({date, title, synopsis, slug}) => {
      const url = new URL(`${slug}.json`, site.base);
      return {
        date: new Date(date).toJSON().replace(/T.*$/,''),
        title: html`<a href="?url=${url}">${title}</a><br>${synopsis}`
      }
    });
    el.append(Inputs.table(
      table,
      {
        width: {
          date: 80
        },
        format: {
          title: el => el
        }
      }))
  });
  return el;
}
