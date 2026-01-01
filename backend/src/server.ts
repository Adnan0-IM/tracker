import app from "./app";
import { seed } from "./config/seed";
import { env } from "./config/env";

const PORT = env.PORT;

// Seed the database if SEED=true
if ((process.env.SEED ?? "false").toLowerCase() === "true") {
  try {
    await seed();
  } catch (err) {
    console.error("Seeding failed, starting server without seed:", err);
  }
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
