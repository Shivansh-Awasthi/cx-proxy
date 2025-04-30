export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api')) {
      const backendUrl = 'https://backend.toxicgames.in' + url.pathname + url.search;

      const modifiedRequest = new Request(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
        redirect: 'follow',
      });

      return await fetch(modifiedRequest);
    }

    return new Response('Not found', { status: 404 });
  },
};
