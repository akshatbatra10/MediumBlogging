import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { hashPassword, verifyPassword } from "../utils/auth";
import { signInParams, signUpParams } from "@akshat_dev/blog-common";

type Variables = {
  userId: string;
};

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { name, email, password } = await c.req.json();

  const { success, error } = signUpParams.safeParse({ email, password });
  if (!success) {
    c.status(403);
    return c.json(error);
  }

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkUser) {
      c.status(401);
      return c.json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ auth_token: token });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing up" });
  }
});

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();

  const { success, error } = signInParams.safeParse({ email, password });
  if (!success) {
    c.status(403);
    return c.json(error);
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "No user found" });
    }

    const verifiedPassword = await verifyPassword(user.password, password);
    if (!verifiedPassword) {
      c.status(401);
      return c.json({ error: "Password Incorrect" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ auth_token: token });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error while signing in" });
  }
});

export default user;
