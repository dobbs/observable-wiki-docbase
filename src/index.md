# Observable Wiki Docbase


```js
import {panel, pageData} from './components/panel.js';
import {intentFromLocation} from './components/lineup.js';
```

```js
const action = intentFromLocation(window.location);
let page = {};
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
}
const data = pageData(page);
display({
  action,
  page,
  data
});
```

```js
display(panel({
    id: 'adf4cc3322',
    site: {url: '//wiki.dbbs.co/'},
    page
}));
```
