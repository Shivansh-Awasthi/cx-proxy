export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api')) {
      const backendUrl = 'https://backend.toxicgames.in' + url.pathname + url.search;

      // Clone original request but change the destination URL
      const modifiedRequest = new Request(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
        redirect: 'follow',
      });

      return fetch(modifiedRequest);
    }

    return new Response('Not found', { status: 404 });
  },
};
