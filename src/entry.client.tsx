// DraftJS needs ReactDOM.findDOMNode(), which is disallowed in StrictMode
import { startTransition /* StrictMode */ } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';

function hydrate() {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />);
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
