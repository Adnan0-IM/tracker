import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";

export const dashbaordRoute = Router();

dashbaordRoute.get("/", getDashboard);
