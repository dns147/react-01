import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Express, Request, Response } from 'express';
import renderApp from './dist/server/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();
const parts = html.split('not rendered');
const app: Express = express();

app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use((req: Request, res: Response) => {
  res.write(parts[0]);
  
  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
