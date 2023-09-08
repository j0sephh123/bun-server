import { Database } from "bun:sqlite";

class Db {
  private static instance: Db;
  db: Database;

  private constructor() {
    this.db = new Database("db.sqlite");
  }

  public static getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  public getAllUsers() {
    return this.db.query(`SELECT * FROM users`).all();
  }

  public doesTableExist() {
    const queryGetUsersTableCount1 = this.db.query(
      "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'"
    );
    const result = queryGetUsersTableCount1.get() as { count: number };

    return result.count > 0;
  }

  public seedUsersTable() {
    this.db
      .query(
        `INSERT INTO users (name, age) VALUES
      ('Alice', 30),
      ('Bob', 45),
      ('Charlie', 50),
      ('David', 22),
      ('Eva', 36),
      ('Frank', 60),
      ('Grace', 25),
      ('Helen', 31),
      ('Irene', 44),
      ('John', 53);`
      )
      .run();
  }

  public createUsersTable() {
    this.db
      .query(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age INTEGER NOT NULL
        );`
      )
      .run();
  }
}

export default Db;
