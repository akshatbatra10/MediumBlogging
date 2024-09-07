import { verify } from "hono/jwt";

export const verifyToken = async (c: any, next: any) => {
  const auth_header = c.req.header("Authorization");
  if (!auth_header) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  const auth_token = auth_header.split(" ")[1];
  const decode = await verify(auth_token, c.env.JWT_SECRET);
  if (!decode) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  c.set("userId", decode.id as string);
  await next();
};
