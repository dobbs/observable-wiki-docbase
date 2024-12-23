import {Inspector} from 'observablehq:runtime';
import {html} from 'npm:htl';
import {safeHtml} from './wiki-link.js';
import markdownit from 'npm:markdown-it';

export const plugins = new Map();

plugins.set('unknown', {
  type: 'unknown',
  fn: (item) => {
    const div = html`<div class="item unknown"></div>`;
    const inspector = new Inspector(div);
    inspector.fulfilled(item);
    div.prepend(html`<p><em>Unknown type:</em> ${item.type}</p>`);
    return div;
  }
});

plugins.set('html', {
  type: 'html',
  fn(item) {
    const div = html`<div class="item html"></div>`;
    div.innerHTML = item.text;
    return safeHtml`${div}`;
  }
});

const md = markdownit();
plugins.set('markdown', {
  type: 'markdown',
  fn(item) {
    const div = html`<div class="item markdown"></div>`;
    div.innerHTML = md.render(item.text);
    return safeHtml`${div}`;
  }
});

plugins.set('pagefold', {
  type: 'pagefold',
  fn(item) {
    return safeHtml`<div class="item pagefold"><hr data-content="${item.text}"></div>`;
  }
});

plugins.set('paragraph', {
  type: 'paragraph',
  fn(item) {
    return safeHtml`<div class="item paragraph"><p>${item.text}</p></div>`;
  }
});

plugins.set('reference', {
  type: 'reference',
  fn(item) {
    const {site, slug, title, text} = item;
    const flag = `//${site}/favicon.png`;
    return safeHtml`<div class="item reference">
<p data-site="${site}"><img class="remote" src="${flag}">
  <a class="internal" data-title="${title}"
     href="//${site}/${slug}.html">${title}</a> - ${text}
</p>
</div>`;
  }
});
