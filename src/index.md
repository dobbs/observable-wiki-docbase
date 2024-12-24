# Observable Wiki Docbase


```js
import {panelViewer, pageData} from './components/panel.js';
import {intentFromLocation} from './components/lineup.js';
```

```js
const action = intentFromLocation(window.location);
let page = {}, el, data;
if (action.intent == "fetch") {
  page = await fetch(action.url, {mode: 'cors'})
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .catch(error => {action, error});
  data = pageData(page);
  const panel = {
    id: 'adf4cc3322',
    site: {url: action.url},
    page
  };
  el = panelViewer(panel);
} else {
  el = html`<a href="?url=https://wiki.dbbs.co/welcome-visitors.json">
https://wiki.dbbs.co/welcome-visitors.json
</a>`;
}
display({
  action,
  page,
  data
});
```

```js
display(el);
```
