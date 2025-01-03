import {html} from 'npm:htl';
import {plugins} from './plugins.js';

export function panelViewer({
  id,
  site,
  page
}) {
  const {title=null, story=[], journal=[]} = page;
  const el = html`
<article id="${id}">
<div class="twins">
</div>
<header>
  <h1><img src="${site.favicon}" alt="${site.base}"> ${title}</h1>
</header>
${story.map(item => {
  const plugin = plugins.get(item.type.toLowerCase()) || plugins.get('unknown');
  const rendered = plugin.fn(item);
  console.log({rendered});
  return rendered;
})}
<footer>
</footer>
</article>
`;
  const data = pageData(site.base, page);
  el.addEventListener('wiki-link', async event => {
    const {title} = event.detail;
    const url = site.resolvePage(title);
    if (url != null) {
      location = new URL(`?url=${url}`, location);
    }
  });
  return el;
}

export function pageData(base, page) {
  const {title='Untitled', story=[], journal=[]} = page;
  const storyData = story.reduce(
    (acc,item) => (acc.itemIds.add(item.id), acc),
    {itemIds: new Set()}
  );
  const journalData = journal.reduceRight(
    (acc,action) => {
      if (action.site) acc.sites.page.add(action.site);
      if (action.attribution?.site && storyData.itemIds.has(action.id)) {
        const {site} = action.attribution;
        acc.sites.item.set(action.id, {site});
      }
      return acc;
    },
    {
      sites: {
        page: new Set([base]),
        item: new Map()
      }
    }
  );
  return {
    itemIds: storyData.itemIds,
    sites: journalData.sites.page,
    attributions: journalData.sites.item,
  };
}
