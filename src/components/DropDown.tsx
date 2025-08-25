import { Popover } from "radix-ui";
import Buttons from "./Buttons";
import { IoMdArrowDropdown } from "react-icons/io";
import clsx from "clsx";
import Link from "next/link";
import { DeleteActionModal } from "./Dialog";
import { LiaSpinnerSolid } from "react-icons/lia";

export type DropDownListPageActionProps =
  | {
      type: "url" | "button"; // url ou button => href obligatoire
      label: string;
      visible: any;
      href: string;
      icon?: React.ReactNode;
    }
  | {
      type: "saveAction" | "deleteAction"; // saveAction => action obligatoire
      label: string;
      visible: any;
      loading: boolean;
      confirmation?: boolean;
      confirmationMessage?: string;
      confirmationTitle?: string;
      confirmationButtonTitle?: string;
      redirect?: string;
      icon?: React.ReactNode;
      action: () => void;
    };

export interface DropDownListPageProps {
  title?: string;
  actions?: DropDownListPageActionProps[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
}
export function DropDownListPage({
  title = "Actions",
  actions,
  icon,
  children,
}: DropDownListPageProps) {
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger className="border-0 outline-none">
          <Buttons
            iconbefore={true}
            type="primary"
            variant="solid"
            icon={icon || <IoMdArrowDropdown className="text-xl" />}
            title={title}
          />
        </Popover.Trigger>
        <Popover.Content
          className={clsx(
            "bg-white w-[250px]  relative z-20 space-y-2 text-sm shadow-lg rounded-lg p-1"
          )}
        >
          {/* {children} */}

          {actions
            .filter((element) => element.visible)
            .map((action, index) => {
              if (["saveAction"].includes(action.type)) {
                return (
                  <Popover.Close
                    key={index}
                    // disabled={action.loading}
                    onClick={action.action}
                    className={clsx(
                      "rounded-md block w-full  cursor-pointer p-3  border-0 hover:bg-primary hover:text-white"
                    )}
                  >
                    <div className="flex gap-3 items-center">
                      <span className={clsx(!action.loading ? "hidden" : "")}>
                        <LiaSpinnerSolid className="animate-spin scale-150" />
                      </span>
                      <span>{action.label}</span>
                    </div>
                  </Popover.Close>
                );
              }
              if (["deleteAction"].includes(action.type)) {
                return <DeleteAction key={index} action={action} />;
              }
              return (
                <Popover.Close
                  key={index}
                  className="block w-full rounded-md cursor-pointer text-left  border-0 hover:bg-primary hover:text-white  "
                >
                  <Link className="block p-3" href={action.href}>
                    {action.label}
                  </Link>
                </Popover.Close>
              );
            })}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
const DeleteAction = ({ action }) => {
  return (
    <Popover.Close
      asChild
      className="block w-full rounded-md cursor-pointer text-left  border-0 hover:bg-primary hover:text-white  "
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <DeleteActionModal
        className="text-left block w-full rounded-md cursor-pointer p-3 border-0 hover:bg-primary hover:text-white  "
        action={action}
      >
        {/* Render nested components */}
        {action.label}
      </DeleteActionModal>
    </Popover.Close>
  );
};
