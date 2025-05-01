import * as Dialog from "@/edge/dialog.base";
import { Identified, IdentifierProvider, identifierFor } from "@/edge/utils";
import { NewUser } from "@/models/user";
import { Button } from "@/ui/button";
import { XIcon } from "lucide-react";

const FORM_FEATURE = Symbol("form");
const FormProvider = identifierFor(FORM_FEATURE);

export function CreateUserForm({ addUser }: { addUser: (user: NewUser) => void }) {
  return (
    <FormProvider>
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
          <Identified feature={FORM_FEATURE}>
            <form
              className="flex flex-col gap-5"
              action={(formData) => {
                const name = formData.get("name") as string;
                const newUser = NewUser.parse({ name });
                addUser(newUser);
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
          </Identified>
          <footer className="flex justify-end items-center gap-5">
            <Dialog.Close asChild>
              <Button intent="outline">Cancel</Button>
            </Dialog.Close>
            <Identified feature={FORM_FEATURE} prop="form">
              <Button type="submit">Save</Button>
            </Identified>
          </footer>
        </Dialog.Dialog>
      </Dialog.Root>
    </FormProvider>
  );
}
