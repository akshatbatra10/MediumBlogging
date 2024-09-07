import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogDataPOST, blogDataPUT } from "@akshat_dev/blog-common";

type Variables = {
  userId: string;
  //prisma: PrismaClient;
};

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

blog.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const { title, content } = await c.req.json();

  const { success, error } = blogDataPOST.safeParse({ title, content });
  if (!success) {
    c.status(404);
    return c.json(error);
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return c.json(newPost);
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error while posting the blog" });
  }
});

blog.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id, title, content } = await c.req.json();

  const { success, error } = blogDataPUT.safeParse({ id, title, content });
  if (!success) {
    c.status(404);
    return c.json(error);
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return c.json(updatedPost);
  } catch (error) {
    c.status(403);
    return c.json({ error: "Unable to update post" });
  }
});

blog.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allPosts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(allPosts);
  } catch (error) {
    c.status(404);
    return c.json({ error: "Unable to get posts" });
  }
});

blog.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      c.status(404);
      return c.json({ error: "No post found" });
    }

    return c.json(post);
  } catch (error) {
    c.status(403);
    return c.json({ error: "Unable to get post" });
  }
});

export default blog;
