import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Express, Request, Response } from 'express';
import renderApp from './dist/server/entry-server.js';
import store from './src/app/store';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();
const parts = html.split('not rendered');
const app: Express = express();
const preloadedState = store.getState();

app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use((req: Request, res: Response) => {
  res.write(parts[0]);

  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },

    onShellError(err: Error) {
      console.error(err);
    },

    onAllReady() {
      const template = renderFullPage(parts[1], preloadedState);
      res.write(template);
      res.end();
    },

    onError(err: Error) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);

function renderFullPage(html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>dns147-React2023</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
      </body>
    </html>
  `;
}
