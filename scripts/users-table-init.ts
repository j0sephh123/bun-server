import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

async function init() {
  const queryGetUsersTableCount1 = db.query(
    "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'"
  );
  const result = queryGetUsersTableCount1.get() as { count: number };

  if (result.count > 0) {
    const query = db.query(`SELECT * FROM users`);
    const result = query.all();

    if (result.length === 0) {
      const insertUsersQuery = db.query(`INSERT INTO users (name, age) VALUES
      ('Alice', 30),
      ('Bob', 45),
      ('Charlie', 50),
      ('David', 22),
      ('Eva', 36),
      ('Frank', 60),
      ('Grace', 25),
      ('Helen', 31),
      ('Irene', 44),
      ('John', 53);`);
      insertUsersQuery.run();
    }

    return;
  }

  const queryCreateUsersTable = db.query(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    );`
  );
  queryCreateUsersTable.run();

  const queryGetUsersTableCount2 = db.query(
    "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'"
  );

  const result2 = queryGetUsersTableCount2.get() as { count: number };

  if (result2.count > 0) {
    const insertUsersQuery = db.query(`INSERT INTO users (name, age) VALUES
    ('Alice', 30),
    ('Bob', 45),
    ('Charlie', 50),
    ('David', 22),
    ('Eva', 36),
    ('Frank', 60),
    ('Grace', 25),
    ('Helen', 31),
    ('Irene', 44),
    ('John', 53);`);
    insertUsersQuery.run();
  }

  db.close();
}
init();
