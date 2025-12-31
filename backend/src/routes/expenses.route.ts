import { Router } from "express";
import { createExpense, deleteExpense, editExpense, getExpenses } from "../controllers/expenses.contraller";

export const expensesRouter = Router();

expensesRouter.get("/", getExpenses);
expensesRouter.post("/create", createExpense);
expensesRouter.put("/:id", editExpense);
expensesRouter.delete("/:id", deleteExpense)
