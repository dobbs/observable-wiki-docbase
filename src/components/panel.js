import {html, svg} from 'npm:htl';
import {plugins} from './plugins.js';

export function panel({
  id,
  site,
  page
}) {
  const {title, story=[], journal=[]} = page;
  return html`
<article id="${id}">
<div class="twins">
</div>
<header>
  <h1><img src="${site.url}/favicon.png" alt="${site.url}"> ${title}</h1>
</header>
${story.map(item => {
  let plugin = plugins.get(item.type.toLowerCase()) || plugins.get('unknown');
  return plugin.fn(item);
})}
<footer>
</footer>
</article>
`;
}
