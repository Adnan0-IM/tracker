import { Router } from "express";
import { getReports } from "../controllers/reports.controller";


export const reportRouter = Router();

reportRouter.get("/export", getReports);
