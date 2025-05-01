import { serve } from "bun";
import index from "./index.html";
import { NewUser, type User } from "./models/user";

const DB = new Map<User["id"], User>();

const server = serve({
  routes: {
    "/*": index,
    "/api/users": {
      GET: () => Response.json([...DB.values()]),
      async POST(req) {
        const payload = await req.json();
        const newUser = NewUser.parse(payload);
        const user = { ...newUser, id: crypto.randomUUID() };
        DB.set(user.id, user);
        return Response.json(user);
      },
    },
    "/api/users/:id": {
      DELETE: (req) => {
        const id = req.params.id;
        if (!DB.has(id)){
          return Response.json({ error: "User not found" }, { status: 404 });
        }
        DB.delete(id);
        return Response.json({ ok: true });
      },
    },
  },

  development: process.env.NODE_ENV !== "production",
  hostname: "0.0.0.0",
});

console.log(`🚀 Server running at ${server.url}`);
