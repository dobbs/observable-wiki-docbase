export function intentFromLocation(location) {
  let params = new URLSearchParams(location.search);
  if (params.has('url')) {
    return {
      intent: 'fetch',
      url: new URL(params.get('url'), location.origin)
    };
  }
  return {
    intent: 'unknown'
  };
}
