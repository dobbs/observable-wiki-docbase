import {html, svg} from 'npm:htl';
import DOMPurify from 'npm:dompurify@3';

function safeHtml(...args) {
  const out = html(...args);
  return sanitize(out);
}

function safeSvg(...args) {
  return sanitize(svg(...args));
}

function sanitize(dirty) {
  const linkified = annotateLinks(dirty);
  return DOMPurify.sanitize(linkified, {
    RETURN_DOM: true,
    SANITIZE_DOM: false,
    IN_PLACE: true,
    ADD_TAGS: ['foreignObject', 'feDropShadow'],
    ADD_ATTR: ['target']
  });
}

function annotateLinks(el) {
  function linked(text) {
    return text
      .replace(/\[\[(.*?)\]\]/g, (_,title) => `<a class="internal" data-title="${title}" href="#">${title}</a>`)
      .replace(/\[(https?:.*?) (.*?)\]/g, (_,url,word) => `<a href="${url.replace(/^https?:/,'')}">${word}</a>`)
  }

  if (el.nodeType && el.nodeType === Element.TEXT_NODE) {
    let child = el.cloneNode();
    el = document.createElement('div');
    el.append(child);
  }

  // iterate all text nodes that have an opening square bracket
  // and replace the markup with HTML links
  const it = document.createNodeIterator(
    el, NodeFilter.SHOW_TEXT, node => /\[/.test(node.textContent) ?
      NodeFilter.FILTER_ACCEPT :
      NodeFilter.FILTER_SKIP
  )
  let textNode, replacements = []
  while ((textNode = it.nextNode())) {
    replacements.push([textNode, linked(textNode.textContent)])
  }
  for (let [node, html] of replacements) {
    const parent = node.parentElement
    parent.insertAdjacentHTML('afterbegin', html);
    node.remove();
  }

  el.querySelectorAll('a').forEach(a => {
    if (a.classList.contains('internal')) {
      // convert click events wiki-link events
      a.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        a.dispatchEvent(new Event('wiki-link', {bubbles: true}));
      };
    } else {
      a.setAttribute('target', '_blank');
      a.classList.add('external');
    }
  });
  return el;
}

export {
  safeHtml,
  safeSvg
}
