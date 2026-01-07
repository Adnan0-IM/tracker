import axios from "axios";

import * as SecureStore from "expo-secure-store";
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: "fetch",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("session");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
