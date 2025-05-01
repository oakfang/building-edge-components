import * as Dialog from "@/edge/dialog.base";
import * as Tooltip from "@/edge/tooltip.base";
import type { EphemeralUser } from "@/models/user";
import { Button } from "@/ui/button";
import { TrashIcon, XIcon } from "lucide-react";

export function UsersList({
  users,
  deleteUser,
}: {
  users: EphemeralUser[] | null;
  deleteUser: (id: string) => void;
}) {
  if (!users) return null;

  return (
    <Tooltip.Timer timeout={500} resetTimeout={1000}>
      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between group">
            <span className="font-semibold group-focus-within:text-primary">
              {user.name}
            </span>
            <Tooltip.Root>
              <Dialog.Root>
                <Dialog.ShowModal asChild>
                  <Tooltip.Trigger asChild>
                    <Button
                      intent="clear"
                      size="icon"
                      aria-label="Delete"
                      disabled={user.isEphemeral}
                    >
                      <TrashIcon />
                    </Button>
                  </Tooltip.Trigger>
                </Dialog.ShowModal>
                <Tooltip.Tooltip className="justify-self-anchor-center absolute inset-[unset] bottom-[anchor(top)] [position-try-fallbacks:flip-block] bg-elevated shadow-sm px-2 py-1 rounded">
                  Delete "{user.name}"
                </Tooltip.Tooltip>
                <Dialog.ConfirmationDialog
                  className="bg-elevated md:min-w-lg m-auto flex-col gap-3 p-3 rounded-md shaodw-md open:flex text-start backdrop:bg-transparent backdrop:backdrop-brightness-50"
                  onYes={() => deleteUser(user.id)}
                >
                  <header className="flex items-center justify-between">
                    <Dialog.DialogTitle className="text-xl font-semibold">
                      Are you sure?
                    </Dialog.DialogTitle>
                    <Dialog.Close asChild>
                      <Button intent="clear" size="icon" aria-label="Close">
                        <XIcon />
                      </Button>
                    </Dialog.Close>
                  </header>
                  <Dialog.DialogDescription>
                    Deleting a user is irreversible. Are you sure you want to
                    delete the user entry for "{user.name}"?
                  </Dialog.DialogDescription>
                  <footer className="flex justify-end items-center gap-5">
                    <Dialog.No asChild>
                      <Button intent="outline">No</Button>
                    </Dialog.No>
                    <Dialog.Yes asChild>
                      <Button intent="risky">Yes</Button>
                    </Dialog.Yes>
                  </footer>
                </Dialog.ConfirmationDialog>
              </Dialog.Root>
            </Tooltip.Root>
          </li>
        ))}
      </ul>
    </Tooltip.Timer>
  );
}
