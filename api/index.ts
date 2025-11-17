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

let initialized = false;

function setup() {
  if (!initialized) {
    registerRoutes(app);
    initialized = true;
  }
}

export default function handler(req: any, res: any) {
  setup();
  return app(req, res);
}
