import type { EphemeralUser, NewUser } from "@/models/user";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useSyncExternalStore,
} from "react";
import { CreateUserForm } from "./create-user-form";
import { UsersList } from "./users-list";
import { Button } from "@/ui/button";

class UsersStore {
  #users: null | EphemeralUser[] = null;
  #subscribers = new Set<() => void>();

  update(users: EphemeralUser[]) {
    this.#users = users;
    for (const callback of this.#subscribers) callback();
  }

  async sync() {
    const resp = await fetch("/api/users");
    const users = await resp.json();
    this.update(users);
  }

  subscribe = (callback: () => void) => {
    this.#subscribers.add(callback);
    return () => this.#subscribers.delete(callback);
  };

  getSnapshot = () => {
    return this.#users;
  };
}

const store = new UsersStore();

export function App() {
  const users = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const [ephemeralUsers, addEphemeralUser] = useOptimistic<
    null | EphemeralUser[],
    NewUser
  >(users, (state, newUser) => [
    ...(state ?? []),
    { ...newUser, id: crypto.randomUUID(), isEphemeral: true },
  ]);
  const [usersList, deleteEphemeralUser] = useOptimistic<
    EphemeralUser[] | null,
    string
  >(
    ephemeralUsers,
    (state, id) => state?.filter((user) => user.id !== id) ?? null
  );
  function addUser(newUser: NewUser) {
    addEphemeralUser(newUser);
    startTransition(async () => {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      await store.sync();
    });
  }

  function deleteUser(id: string) {
    deleteEphemeralUser(id);
    startTransition(async () => {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      await store.sync();
    });
  }

  useEffect(() => {
    if (!users) store.sync();
  }, [users]);

  return (
    <div className="container mx-auto h-full flex-1 p-8 text-center">
      <h1 className="text-4xl font-bold">Building Edge Project</h1>

      <main className="flex flex-col gap-4 py-3">
        <CreateUserForm addUser={addUser} />

        <UsersList users={usersList} deleteUser={deleteUser} />
      </main>
    </div>
  );
}
