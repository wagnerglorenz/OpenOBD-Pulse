const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
let currentTunnelUrl = null;

const server = http.createServer((req, res) => {
  const reqUrl = (req.url || '/').split('?')[0];

  if (reqUrl === '/api/tunnel-url') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ url: currentTunnelUrl }));
    return;
  }

  const staticFiles = {
    '/manifest.webmanifest': { file: 'manifest.webmanifest', type: 'application/manifest+json; charset=utf-8' },
    '/sw.js': { file: 'sw.js', type: 'application/javascript; charset=utf-8' },
    '/icon.svg': { file: 'icon.svg', type: 'image/svg+xml' },
    '/icon-192.png': { file: 'icon-192.png', type: 'image/png' },
    '/icon-512.png': { file: 'icon-512.png', type: 'image/png' }
  };
  if (staticFiles[reqUrl]) {
    const target = path.resolve(process.cwd(), staticFiles[reqUrl].file);
    fs.readFile(target, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': staticFiles[reqUrl].type, 'Cache-Control': 'no-cache' });
      res.end(data);
    });
    return;
  }

  if (reqUrl === '/qr') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>QR Code — Engie Probe Android</title>
  <style>
    body { background: #0b0f17; color: #f8fafc; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 32px; max-width: 440px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .qr-box { background: #ffffff; padding: 16px; border-radius: 16px; display: inline-block; margin: 20px 0; }
    a { color: #38bdf8; word-break: break-all; font-family: monospace; font-size: 15px; }
    .badge { display: inline-block; background: #1d4ed8; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">ANDROID WEB BLUETOOTH HTTPS</span>
    <h2 style="margin: 8px 0;">Aponte a câmera do seu Android</h2>
    <p style="color: #94a3b8; font-size: 14px;">Abra o link HTTPS no Google Chrome do celular e desça até o Civic 2007:</p>
    <div class="qr-box" id="qrContainer">Gerando túnel HTTPS...</div>
    <div id="urlContainer" style="margin-top: 8px;">Aguardando Cloudflare Quick Tunnel...</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
  <script>
    async function pollUrl() {
      try {
        const r = await fetch('/api/tunnel-url');
        const data = await r.json();
        if (data.url) {
          document.getElementById('qrContainer').innerHTML = '';
          new QRCode(document.getElementById('qrContainer'), { text: data.url, width: 240, height: 240 });
          document.getElementById('urlContainer').innerHTML = '<a href="' + data.url + '" target="_blank">' + data.url + '</a>';
          return;
        }
      } catch (e) {}
      setTimeout(pollUrl, 1000);
    }
    pollUrl();
  </script>
</body>
</html>`);
    return;
  }

  const htmlFile = path.resolve(process.cwd(), 'engie_probe_mvp.html');
  fs.readFile(htmlFile, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo engie_probe_mvp.html não encontrado.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(content);
  });
});

function printTunnelReadyBanner(httpsUrl) {
  currentTunnelUrl = httpsUrl;
  console.log('\n====================================================================');
  console.log('🚀 TÚNEL HTTPS ATIVO PARA O SEU ANDROID (WEB BLUETOOTH LIBERADO!)');
  console.log('====================================================================');
  console.log('👉 Link para o Chrome no Android:  ' + httpsUrl);
  console.log('🖥️  Painel QR Code na tela do PC:   http://localhost:' + PORT + '/qr');
  console.log('====================================================================\n');

  const isWin = process.platform === 'win32';
  const npxCmd = isWin ? 'npx.cmd' : 'npx';
  spawn(npxCmd, ['--yes', 'qrcode-terminal', httpsUrl], { stdio: 'inherit', shell: isWin });
}

function startHttpsTunnel() {
  const isWin = process.platform === 'win32';
  const npxCmd = isWin ? 'npx.cmd' : 'npx';
  console.log('⏳ Iniciando túnel HTTPS gratuito (Cloudflare Quick Tunnel)...');
  const cf = spawn(npxCmd, ['--yes', 'cloudflared', 'tunnel', '--url', 'http://localhost:' + PORT], { shell: isWin });

  const handleOutput = (chunk) => {
    const match = chunk.toString().match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !currentTunnelUrl) printTunnelReadyBanner(match[0]);
  };
  cf.stdout.on('data', handleOutput);
  cf.stderr.on('data', handleOutput);
}

server.listen(PORT, () => {
  console.log('✅ Servidor local rodando em http://localhost:' + PORT);
  startHttpsTunnel();
});
