import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

let serverPromise: Promise<any> | null = null;

async function setup() {
  if (!serverPromise) {
    serverPromise = registerRoutes(app);
  }
  return serverPromise;
}

export default async function handler(req: any, res: any) {
  await setup();
  return app(req, res);
}
