// src/server.ts
import dotenv from "dotenv";
import http from "http";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
