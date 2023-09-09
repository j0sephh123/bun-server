import { compile as c, trpc } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { Elysia, t as T } from "elysia";
import { cors } from "@elysiajs/cors";
import { z } from "zod";

const t = initTRPC.create();
const p = t.procedure;

const router = t.router({
  greet: p
    .input(
      z.object({
        message: z.string(),
        el: z.enum(["1", "2"]),
      })
    )
    .query(({ input }) => {
      return {
        message: input.message,
        el: input.el,
      };
    }),
});

export type AppRouter = typeof router;

new Elysia().use(cors()).use(trpc(router)).listen(5000);
