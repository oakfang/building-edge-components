import * as Dialog from "@/edge/dialog.base";
import * as Tooltip from "@/edge/tooltip.base";
import { Identified, IdentifierProvider } from "@/edge/utils";
import { Button } from "@/ui/button";
import { TrashIcon, XIcon } from "lucide-react";
import { useId, useState } from "react";

interface Entry {
  id: string;
  name: string;
}

export function App() {
  const formId = useId();
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <div className="container mx-auto h-full flex-1 p-8 text-center">
      <h1 className="text-4xl font-bold">Building Edge Project</h1>

      <main className="flex flex-col gap-4 py-3">
        <Dialog.Root>
          <Dialog.ShowModal asChild>
            <Button>Add Entry</Button>
          </Dialog.ShowModal>
          <Dialog.Dialog
            className="bg-elevated md:min-w-lg m-auto flex-col gap-5 p-5 rounded-xl shaodw-lg open:flex text-start backdrop:bg-transparent backdrop:backdrop-brightness-50"
            onSubmit={(e) => e.currentTarget.close()}
          >
            <header className="flex items-center justify-between">
              <Dialog.DialogTitle className="text-xl font-semibold">
                Create New Entry
              </Dialog.DialogTitle>
              <Dialog.Close asChild>
                <Button intent="clear" size="icon" aria-label="Close">
                  <XIcon />
                </Button>
              </Dialog.Close>
            </header>
            <Dialog.DialogDescription>
              This is a sample form for creating a new entry.
            </Dialog.DialogDescription>
            <form
              id={formId}
              className="flex flex-col gap-5"
              action={(formData) => {
                const name = formData.get("name") as string;
                setEntries((entries) => [
                  ...entries,
                  { id: crypto.randomUUID(), name },
                ]);
              }}
            >
              <IdentifierProvider>
                <div className="flex flex-col gap-2">
                  <Identified prop="htmlFor">
                    <label className="font-semibold after:content-['*'] after:ms-1 after:text-red-700">
                      Name
                    </label>
                  </Identified>
                  <Identified>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="rounded p-2 w-full border border-neutral-400"
                    />
                  </Identified>
                </div>
              </IdentifierProvider>
            </form>
            <footer className="flex justify-end items-center gap-5">
              <Dialog.Close asChild>
                <Button intent="outline">Cancel</Button>
              </Dialog.Close>
              <Button type="submit" form={formId}>
                Save
              </Button>
            </footer>
          </Dialog.Dialog>
        </Dialog.Root>

        {entries.length ? (
          <Tooltip.Timer timeout={500} resetTimeout={1000}>
            <ul>
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between group"
                >
                  <span className="font-semibold group-focus-within:text-primary">
                    {entry.name}
                  </span>
                  <Tooltip.Root>
                    <Dialog.Root>
                      <Dialog.ShowModal asChild>
                        <Tooltip.Trigger asChild>
                          <Button
                            intent="clear"
                            size="icon"
                            aria-label="Delete"
                          >
                            <TrashIcon />
                          </Button>
                        </Tooltip.Trigger>
                      </Dialog.ShowModal>
                      <Tooltip.Tooltip className="justify-self-anchor-center absolute inset-[unset] bottom-[anchor(top)] [position-try-fallbacks:flip-block]">
                        Delete "{entry.name}"
                      </Tooltip.Tooltip>
                      <Dialog.ConfirmationDialog
                        className="bg-elevated md:min-w-lg m-auto flex-col gap-3 p-3 rounded-md shaodw-md open:flex text-start backdrop:bg-transparent backdrop:backdrop-brightness-50"
                        onYes={() =>
                          setEntries((entries) =>
                            entries.filter((e) => e.id !== entry.id)
                          )
                        }
                      >
                        <header className="flex items-center justify-between">
                          <Dialog.DialogTitle className="text-xl font-semibold">
                            Are you sure?
                          </Dialog.DialogTitle>
                          <Dialog.Close asChild>
                            <Button
                              intent="clear"
                              size="icon"
                              aria-label="Close"
                            >
                              <XIcon />
                            </Button>
                          </Dialog.Close>
                        </header>
                        <Dialog.DialogDescription>
                          Deleting an entry is irreversible. Are you sure you
                          want to delete the entry for "{entry.name}"?
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
        ) : null}
      </main>
    </div>
  );
}

export default App;
