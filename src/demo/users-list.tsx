import * as Dialog from "@/ui/dialog";
import * as Tooltip from "@/ui/tooltip";
import type { EphemeralUser } from "@/models/user";
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
                <Tooltip.Trigger asChild>
                  <Dialog.ShowModal
                    intent="clear"
                    size="icon"
                    aria-label="Delete"
                    disabled={user.isEphemeral}
                  >
                    <TrashIcon />
                  </Dialog.ShowModal>
                </Tooltip.Trigger>
                <Tooltip.Tooltip>
                  Delete "{user.name}"
                </Tooltip.Tooltip>
                <Dialog.ConfirmationDialog onYes={() => deleteUser(user.id)}>
                  <Dialog.DialogHeader>Are you sure?</Dialog.DialogHeader>
                  <Dialog.DialogDescription>
                    Deleting a user is irreversible. Are you sure you want to
                    delete the user entry for "{user.name}"?
                  </Dialog.DialogDescription>
                  <Dialog.DialogFooter>
                    <Dialog.No intent="outline">No</Dialog.No>
                    <Dialog.Yes intent="risky">Yes</Dialog.Yes>
                  </Dialog.DialogFooter>
                </Dialog.ConfirmationDialog>
              </Dialog.Root>
            </Tooltip.Root>
          </li>
        ))}
      </ul>
    </Tooltip.Timer>
  );
}
