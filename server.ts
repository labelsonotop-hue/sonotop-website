import express from 'express';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // PDF Proxy Route to bypass CORS
  app.get('/api/proxy-pdf', async (req, res) => {
    const pdfUrl = req.query.url as string;
    if (!pdfUrl) {
      return res.status(400).send('Missing url parameter');
    }

    try {
      const response = await axios.get(pdfUrl, {
        responseType: 'arraybuffer',
        headers: {
          'Origin': 'https://phoenix-media.b-cdn.net',
          'Referer': 'https://phoenix-media.b-cdn.net/',
        }
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(Buffer.from(response.data));
    } catch (error) {
      console.error('PDF Proxy Error:', error);
      res.status(500).send('Failed to fetch PDF');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
