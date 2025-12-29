import app from "./app";
import getDb from "./config/db";
import { initialize } from "./config/initializeDb";
import { seed } from "./config/seed";

const PORT = Number(process.env.PORT ?? 3000);

const sql = await getDb();

// await initialize(sql);


if ((process.env.SEED ?? "false").toLowerCase() === "true") {
  await seed(sql);
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
