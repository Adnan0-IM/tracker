import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import { db } from "../db/db";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { password } from "bun";

export const emailExist = async (targetEmail: string) => {
  const count = await db.$count(usersTable, eq(usersTable.email, targetEmail));

  return count > 0;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
   return await bcrypt.compare(password, hashedPassword)
} 


export const getToken = (userId: number) => {
  // FIXED: Typo in env var and wrapping payload in object
  return Jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {

  return Jwt.verify(token, process.env.JWT_SECRET!);
}
