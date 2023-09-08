import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import Db from "./db";

const app = new Elysia()
  .use(swagger())
  .decorate("db", Db.getInstance)
  .get("/", () => "Hello Elysia")
  .get("/api/users", (arg) => {
    const db = arg.db();

    return {
      users: db.getAllUsers(),
    };
  })
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
