import { compile as c, trpc } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { Elysia, t as T } from "elysia";
import { cors } from "@elysiajs/cors";
import { z } from "zod";
import Db from "./db";

export const createContext = () => {
  return {
    db: Db.getInstance(),
  };
};

type ReturnCreateContextType = ReturnType<typeof createContext>;

const t = initTRPC.context<ReturnCreateContextType>().create({});
const p = t.procedure;

const router = t.router({
  greet: p.query(async ({ ctx }) => {
    return {
      users: ctx.db.getAllUsers(),
    };
  }),
});

export type AppRouter = typeof router;

new Elysia()
  .use(cors())
  .use(
    trpc(router, {
      createContext,
    })
  )
  .listen(5000);
