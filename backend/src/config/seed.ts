import type postgres from "postgres";

export const seed = async (db: ReturnType<typeof postgres>) => {
  try {
    // 1) Demo user (use env to override)
    const email = process.env.SEED_USER_EMAIL ?? "demo@example.com";
    const password = process.env.SEED_USER_PASSWORD ?? "demo123"; // replace with a hash in production

    const userRows = await db`
    INSERT INTO "Users" (email, password)
    VALUES (${email}, ${password})
    ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
    RETURNING id
  `;
    // If your client returns objects:
    const userId = userRows[0]?.id;
    // const userId = userRows[0];

    // 2) Categories
    await db.unsafe(`
    INSERT INTO "Category"(id, name, icon, color) VALUES
      ('groceries', 'Groceries', '🛒', '#22C55E'),
      ('transport', 'Transport', '🚗', '#3B82F6'),
      ('rent',      'Rent',      '🏠', '#F43F5E'),
      ('utilities', 'Utilities', '💡', '#A855F7'),
      ('entertain', 'Entertainment', '🎬', '#F59E0B')
    ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name, icon = EXCLUDED.icon, color = EXCLUDED.color;
  `);

    // 3) Budgets (MONTHLY)
    const budgets = [
      { categoryId: "groceries", amount: 300, alertThreshold: 80 },
      { categoryId: "transport", amount: 120, alertThreshold: 75 },
      { categoryId: "rent", amount: 1200, alertThreshold: 90 },
      { categoryId: "utilities", amount: 200, alertThreshold: 80 },
      { categoryId: "entertain", amount: 150, alertThreshold: 70 },
    ];

    for (const b of budgets) {
      await db`
      INSERT INTO "Budget"(id, userId, categoryId, periodType, amount, alertThreshold)
      VALUES (${crypto.randomUUID()}, ${userId}, ${
        b.categoryId
      }, ${"MONTHLY"}, ${b.amount}, ${b.alertThreshold})
      ON CONFLICT (userId, categoryId, periodType) DO UPDATE
        SET amount = EXCLUDED.amount, alertThreshold = EXCLUDED.alertThreshold
    `;
    }

    // 4) Sample expenses
    const days = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);
    const expenses = [
      {
        categoryId: "groceries",
        amount: 42.75,
        description: "Supermarket",
        spentAt: days(3),
      },
      {
        categoryId: "transport",
        amount: 15.0,
        description: "Gas",
        spentAt: days(2),
      },
      {
        categoryId: "entertain",
        amount: 12.99,
        description: "Streaming",
        spentAt: days(10),
      },
      {
        categoryId: "utilities",
        amount: 85.5,
        description: "Electric bill",
        spentAt: days(20),
      },
      {
        categoryId: "rent",
        amount: 1200.0,
        description: "Monthly rent",
        spentAt: days(28),
      },
    ];

    for (const e of expenses) {
      await db`
      INSERT INTO "Expense"(id, userId, categoryId, amount, description, spentAt)
      VALUES (${crypto.randomUUID()}, ${userId}, ${e.categoryId}, ${
        e.amount
      }, ${e.description}, ${e.spentAt})
      ON CONFLICT DO NOTHING
    `;
    }

    console.log(`Seed complete for user ${email} (id=${userId})`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    // Optional: close the pool
    try {
      await (db as any).end?.({ timeout: 5 });
    } catch {}
  }
};
