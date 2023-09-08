import { Database } from "bun:sqlite";
import usersMock from "./mocks/usersMock";

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
    const insert = this.db.prepare(
      "INSERT INTO users (name, age) VALUES (name, age)"
    );

    const insertUsers = this.db.transaction((userArray) => {
      for (const user of userArray) {
        insert.run(user);
      }
      return userArray.length;
    });

    insertUsers(usersMock);
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
