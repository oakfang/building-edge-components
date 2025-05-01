import { z } from "zod";

export const User = z.object({
  id: z.string(),
  name: z.string().min(1),
});

export type User = z.infer<typeof User>;

export const NewUser = User.omit({ id: true });

export type NewUser = z.infer<typeof NewUser>;

export type EphemeralUser = User & { isEphemeral?: true };
