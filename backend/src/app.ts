import express from "express";
import { authRouter } from "./routes/auth.route";
import { auth } from "./middleware/auth.middleware";
import { userRouter } from "./routes/user.route";
import { expensesRouter } from "./routes/expenses.route";
import { budgetsRouter } from "./routes/budgets.route";

const app = express();

// Global middleware
app.use(express.json());

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRouter);

app.use("/api/expenses/", expensesRouter);

app.use("/api/budgets", budgetsRouter);

app.use(auth);

// import usersRouter from "./modules/users/users.routes";
app.use("/api/", userRouter);

export default app;
