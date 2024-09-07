import { Hono } from "hono";
import { cors } from "hono/cors";

import { verifyToken } from "./middleware/auth";
import blog from "./routes/blog";
import user from "./routes/user";

type Variables = {
  userId: string;
  //prisma: PrismaClient;
};

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

// TODO --> Set prisma client as middleware so that we don't
//          have to define it again and again

// app.use("*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   c.set("prisma", prisma);

//   await next();
// });
app.use(cors());
app.use("/api/v1/blog/*", verifyToken);

app.route("/api/v1/user", user);

app.route("/api/v1/blog", blog);

export default app;
