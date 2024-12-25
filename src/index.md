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
  el = html`<a href="?url=https://wiki.dbbs.co/welcome-visitors.json">
https://wiki.dbbs.co/welcome-visitors.json
</a>`;
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
