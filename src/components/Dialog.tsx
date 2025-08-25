import { Dialog } from "radix-ui";
import React from "react";
import { DropDownListPageActionProps } from "./DropDown";
import Buttons from "./Buttons";
import { logout } from "@/app/actions/auth";
import { useState } from "react";
import clsx from "clsx";

export const DeleteActionModal = ({
  action,
  isOpen = false,
  className,
  children,
}: {
  isOpen?: boolean;
  className: string;
  children: React.ReactNode;
  action: DropDownListPageActionProps;
}) => {
  const [open, setOpen] = React.useState(isOpen);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={className}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/50 inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed bg-white left-1/2 top-1/2 w-[400px]  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-[36px]  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className="flex space-y-4 flex-col">
            <div className="space-y-4">
              <div className="text-gradiant-primary text-center w-full   font-semibold text-xl ">
                Supression ?
              </div>
              <div className="text-center">
                {action.confirmationMessage ??
                  "Veuillez confirmer la suppression"}
              </div>
            </div>
            <div className=" w-full flex gap-3 text-center">
              <Dialog.Close
                onClick={() => {}}
                className="w-full"
                // suppressHydrationWarning
              >
                <Buttons
                  title="Annuler"
                  className="w-full"
                  type="primary"
                  variant="outline"
                />
              </Dialog.Close>
              <Dialog.Close
                onClick={() => {
                  action.action();
                }}
                className="w-full"
                suppressHydrationWarning
              >
                <Buttons
                  title="Confirmer"
                  className="w-full"
                  type="primary"
                  variant="solid"
                />
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const DialogErrorSystemServeur = () => {
  const [error, setError] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    const handleServerError = (e: any) => {
      setError(e.detail);
      setIsOpen(true);
    };
    window.addEventListener("ServeurError", handleServerError);
    return () => {
      window.removeEventListener("ServeurError", handleServerError);
    };
  }, []);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/50 inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed bg-white left-1/2 top-1/2 w-[400px]  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-[36px]  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className=" space-y-4 flex-col">
            <div className="space-y-2">
              <div className="flex justify-around">
                {/* <Image
                  src={"/images/check-one.svg"}
                  alt="ddd"
                  width={50}
                  height={50}
                /> */}
              </div>
              <div className="text-gradiant-primary text-center  w-full  font-semibold text-xl ">
                Erreur {error?.code}
              </div>
              <div className="text-center">
                Une erreur serveur est survenue. Veuillez contacter
                l’administrateur pour assistance.
              </div>
            </div>
            <div className=" w-full  text-center">
              <Dialog.Close tabIndex={-1} className="w-full">
                <Buttons
                  title="Fermer"
                  size="md"
                  className="w-full text-center"
                  type="primary"
                  variant="solid"
                />
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const LogoutActionModal = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const [state, action, pending] = React.useActionState(logout, undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger
        onClick={() => setIsOpen((v) => !v)}
        className={className}
      >
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/50 inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed bg-white left-1/2 top-1/2 w-[400px]  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-[36px]  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className="flex space-y-10 flex-col">
            <div className="space-y-4">
              <div className="text-gradiant-primary text-center w-full   font-semibold text-xl ">
                Se déconnecter ?
              </div>
            </div>
            <form className="w-full" action={action}>
              <div className="flex w-full gap-3 justify-between">
                <Dialog.Close
                  onClick={() => setIsOpen((v) => false)}
                  className="w-full"
                  suppressHydrationWarning
                >
                  <Buttons
                    title="Confirmer"
                    className="w-full"
                    type="primary"
                    variant="solid"
                  />
                </Dialog.Close>
                <button
                  type="submit"
                  // disabled={pending}
                  className={clsx(
                    false ? "bg-gray-300 text-black" : "bg-primary text-white ",
                    "rounded-lg w-full font-semibold h-11 cursor-pointer "
                  )}
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
