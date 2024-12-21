# Observable Wiki Docbase


```js
import {panel} from './components/panel.js';
```


```js
const page = await fetch('//wiki.dbbs.co/welcome-visitors.json').then(res => res.json());
display(page);
```

```js
display(panel({
    id: 'adf4cc3322',
    site: {url: '//wiki.dbbs.co/'},
    page
}));
```
