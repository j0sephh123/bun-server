import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import Db from "./db";

const app = new Elysia()
  .use(swagger())
  .decorate("db", Db.getInstance)
  .get("/", () => "Hello Elysia")
  .get("/users", (arg) => {
    const db = arg.db();

    return db.getAllUsers();
  })
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
