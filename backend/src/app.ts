import express from "express";

const app = express();

// Global middleware
app.use(express.json());

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// Mount feature routes
// import usersRouter from "./modules/users/users.routes";
// app.use("/api/users", usersRouter);

export default app;
