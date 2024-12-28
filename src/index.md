# Observable Wiki Docbase


<style>
a.external::after {
  content: '⇧';
  display: inline-block;
  font-size: 80%;
  transform: rotate(45deg);
}
</style>

```js
import {panelViewer, pageData} from './components/panel.js';
import {intentFromLocation} from './components/lineup.js';
import {fromJsonURL, siteViewer} from './components/site.js';
```

```js
const action = intentFromLocation(window.location);
let site, page = {}, el, data;
if (action.intent == "fetch") {
  site = fromJsonURL(action.url);
  page = await fetch(action.url, {mode: 'cors'})
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .catch(error => {action, error});
  data = pageData(site.base, page);
  const panel = {
    id: 'adf4cc3322',
    site,
    page
  };
  el = panelViewer(panel);
} else if (action.intent == "site") {
  site = fromJsonURL(action.url);
} else {
  el = html`
<p>Here are some examples of using this tool to browse existing wiki sites.</p>

<p>A federated wiki:<br>
<a href="?url=https://wiki.dbbs.co/">https://wiki.dbbs.co/</a></p>

<p>A static site generated wiki:<br>
<a href="?url=https://wander.dbbs.co/">https://wander.dbbs.co/</a></p>

<p>A sketch of a folder of wiki pages and a sitemap:<br>
<a href="?url=https://dobbs.github.io/wiki-spike-docbase/-eric/wander/">
https://dobbs.github.io/wiki-spike-docbase/-eric/wander/
</a></p>`;
}
display({
  action,
  site,
  page,
  data
});
```

```js
if (site) {
  display(siteViewer(site));
}
```

```js
display(el);
```
