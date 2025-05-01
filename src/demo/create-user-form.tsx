import * as Dialog from "@/ui/dialog";
import { Identified, IdentifierProvider, identifierFor } from "@/edge/utils";
import { NewUser } from "@/models/user";
import { Button } from "@/ui/button";

const FORM_FEATURE = Symbol("form");
const FormProvider = identifierFor(FORM_FEATURE);

export function CreateUserForm({
  addUser,
}: {
  addUser: (user: NewUser) => void;
}) {
  return (
    <FormProvider>
      <Dialog.Root>
        <Dialog.ShowModal>Add Entry</Dialog.ShowModal>
        <Dialog.Dialog size="xl" onSubmit={(e) => e.currentTarget.close()}>
          <Dialog.DialogHeader>Create New Entry</Dialog.DialogHeader>
          <Dialog.DialogDescription>
            This is a sample form for creating a new entry.
          </Dialog.DialogDescription>
          <Identified feature={FORM_FEATURE}>
            <form
              className="flex flex-col gap-[inherit]"
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
          <Dialog.DialogFooter>
            <Dialog.Close intent="outline">Cancel</Dialog.Close>
            <Identified feature={FORM_FEATURE} prop="form">
              <Button type="submit">Save</Button>
            </Identified>
          </Dialog.DialogFooter>
        </Dialog.Dialog>
      </Dialog.Root>
    </FormProvider>
  );
}
