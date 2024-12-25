export function intentFromLocation(location) {
  try {
    let params = new URLSearchParams(location.search);
    if (params.has('url')) {
      const urlstring = params.get('url');
      const url = new URL(
        urlstring.match(/^http|^\/^\//)
          ? urlstring
          : `//${urlstring}`,
        location);
      if (url.pathname.toLowerCase().endsWith('json')) {
        return {
          intent: 'fetch',
          url
        };
      } else {
        return {
          intent: 'site',
          url
        };
      }
    } else {
      return {
        intent: 'unknown',
      };
    }
  } catch (error) {
    return {
      intent: 'unknown',
      error
    };
  }
  let params = new URLSearchParams(location.search);
}
