// Cloudflare Worker:只有在瀏覽器擋住 Intervals.icu 連線時才需要。
// 部署後把 Worker 網址填到網頁設定的「API 位址」。ALLOWED_ORIGIN 改成你的 GitHub Pages 網址。
const ALLOWED_ORIGIN = 'https://YOUR-NAME.github.io';
const cors = () => ({ 'Access-Control-Allow-Origin': ALLOWED_ORIGIN, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Authorization,Content-Type', 'Access-Control-Max-Age': '86400' });
export default {
  async fetch(req) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors() });
    const u = new URL(req.url);
    if (!u.pathname.startsWith('/api/')) return new Response('not found', { status: 404, headers: cors() });
    const r = await fetch('https://intervals.icu' + u.pathname + u.search, {
      method: req.method,
      headers: { Authorization: req.headers.get('Authorization') || '', 'Content-Type': 'application/json' },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text()
    });
    const h = new Headers(r.headers); for (const [k, v] of Object.entries(cors())) h.set(k, v);
    return new Response(r.body, { status: r.status, headers: h });
  }
};
