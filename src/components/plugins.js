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
    return safeHtml({raw: item.text});
  }
});

const md = markdownit();
plugins.set('markdown', {
  type: 'markdown',
  fn(item) {
    return safeHtml`${md.render(item.text)}`;
  }
});

plugins.set('pagefold', {
  type: 'pagefold',
  fn(item) {
    return safeHtml`<hr class="pagefold" data-content="${item.text}">`;
  }
});

plugins.set('paragraph', {
  type: 'paragraph',
  fn(item) {
    return safeHtml`<p>${item.text}</p>`;
  }
});

plugins.set('reference', {
  type: 'reference',
  fn(item) {
    const {site, slug, title, text} = item;
    const flag = `//${site}/favicon.png`;
    return safeHtml`
      <p data-site="${site}"><img class="remote" src="${flag}">
        <a class="internal" data-title="${title}"
           href="//${site}/${slug}.html">${title}</a> - ${text}`;
  }
});
