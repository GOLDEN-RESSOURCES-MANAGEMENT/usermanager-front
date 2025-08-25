"use client";
import React from "react";
import { Input } from "./Field";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import Icon from "./Icon";
import { TiHome } from "react-icons/ti";
import { LiaUsersCogSolid } from "react-icons/lia";
import { FaShieldAlt, FaUser } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { Popover } from "radix-ui";
import { CiLogout } from "react-icons/ci";
import { Select } from "radix-ui";
import { Switch, Grid, Skeleton } from "@radix-ui/themes";
import { DialogErrorSystemServeur, LogoutActionModal } from "./Dialog";
import { useAuthStore } from "@/libs/store";
import { fetchSuccess } from "@/libs/helper";
import { getData } from "@/libs/fetchData";
import Buttons from "./Buttons";
interface RouteItemProps {
  title: string;
  href: string;
  pathStict?: boolean;
  icon: React.ReactNode;
}

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user } = useAuthStore.getState();
  const userStore = useAuthStore((state) => state.user);
  const setUserStore = useAuthStore((state) => state.setUser);
  const setRoleStore = useAuthStore((state) => state.setRole);
  const roleStore = useAuthStore((state) => state.role);

  React.useEffect(() => {
    const dd = async () => {
      const { status, data, error } = await getData({ endpoint: "/me" });
      if (fetchSuccess(status)) {
        setUserStore(data.data);
        setRoleStore(data?.data?.role[0]);
      }
    };
    dd();
  }, []);
  // const { user } = useAuthStore();
  return (
    <div className="">
      <Menu />
      <MaintContent user={userStore}>{children}</MaintContent>
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      {JSON.stringify(roleStore)}
      <DialogErrorSystemServeur />
    </div>
  );
};
const MaintContent = ({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) => {
  const [value, setValue] = React.useState("");
  return (
    <div className="ms-[300px]   ">
      <div className="p-2 shadow flex justify-between items-center  px-10 bg-white">
        <div className="w-[300px]">
          <Input
            placeholder={"Rechercher un utilisateur"}
            value={value}
            inputType="text"
            onChange={setValue}
          />
        </div>
        <div className="">
          <Popover.Root>
            <Popover.Trigger>
              <div className="cursor-pointer">
                <Icon size="lg">
                  <FaUser />
                </Icon>
              </div>
            </Popover.Trigger>
            <Popover.Content className="bg-white shadow-lg border-black/10 border rounded-md">
              <div className="w-[250px] py-2 divide-y">
                {/* Information de l'utilisateur */}
                <div className="px-4 py-2">
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                </div>

                {/* Page profil utilisateur */}
                <div className="p-2">
                  <Link
                    href={"/profile"}
                    className={
                      "p-2  flex items-center gap-3 rounded-md w-full hover:text-white hover:bg-primary"
                    }
                  >
                    <Icon size="sm">
                      <FaUser />
                    </Icon>
                    {"Mon profile"}
                  </Link>
                </div>
                {/* Deconnexion */}
                <div className="p-2 w-full ">
                  <LogoutActionModal className="w-full">
                    <div
                      className={
                        "p-2  flex  items-center gap-3 rounded-md w-full hover:text-white hover:bg-primary"
                      }
                    >
                      <Icon size="sm">
                        <FaUser />
                      </Icon>
                      {"Déconnexion"}
                    </div>
                  </LogoutActionModal>
                </div>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
      <div className="p-10 h-full px-8 py-8 max-w-[1300px] mx-auto ">
        {children}
      </div>
    </div>
  );
};
const Menu = () => {
  const pathName = usePathname();
  const isActiveLink = (href: string, strict: boolean) => {
    if (strict) return pathName === href;
    return pathName.startsWith(href);
  };
  const route: RouteItemProps[] = [
    {
      pathStict: true,
      title: "Accueil ",
      href: "/",
      icon: (
        <Icon size="md">
          <TiHome />
        </Icon>
      ),
    },
    // {
    //   pathStict: true,
    //   title: "Rôles et permission",
    //   href: "/roles",
    //   icon: (
    //     <Icon size="md">
    //       <FaShieldAlt />
    //     </Icon>
    //   ),
    // },
    {
      pathStict: false,
      title: "Utilisateurs",
      href: "/users",
      icon: (
        <Icon size="md">
          <LiaUsersCogSolid />
        </Icon>
      ),
    },
    {
      title: "Activité",
      href: "/activity",
      icon: (
        <Icon size="md">
          <RxActivityLog />
        </Icon>
      ),
    },
  ];
  return (
    <div className="bg-white fixed top-0 shadow left-0 w-[300px]  h-full ">
      <div className=" h-full flex justify-between flex-col">
        <div className="">
          {/* Menu header */}
          <div className="h-[61px] px-3  flex items-center ">
            <span className="italic font-bold text-2xl">UserManger</span>
          </div>
          <div className="p-3">
            {/* Menu Content */}
            <div className="space-y-3">
              {route.map((item: RouteItemProps, index: number) => (
                <div key={index} className="">
                  <Link
                    className={clsx(
                      isActiveLink(item.href, item.pathStict) &&
                        "bg-primary text-white",
                      "p-2  flex items-center gap-3 rounded-md w-full hover:text-white hover:bg-primary"
                    )}
                    href={item.href}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          {/* Menu Footer */}
          <Link
            className={clsx(
              "p-2  flex items-center gap-3 rounded-md w-full hover:text-white hover:bg-primary"
            )}
            href={"item.href"}
          >
            <Icon size="md">
              <CiLogout />
            </Icon>
            {"Déconnexion"}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface PageLayoutHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const PageLayoutHeader = ({
  className,
  children,
}: PageLayoutHeaderProps) => {
  return <div className={clsx(className)}>{children}</div>;
};

export const PageLayoutBody = ({
  className,
  children,
}: PageLayoutHeaderProps) => {
  return <div className={clsx(className)}>{children}</div>;
};

export const Content = ({
  field,
  loading,
  title,
  iconTitle,
  className,
  gap = { initial: "4" },
  columns = { md: "2", lg: "3" },
  children,
}: {
  className?: string;
  title?: string;
  iconTitle?: React.ReactNode;
  columns?: object;
  loading?: boolean;
  gap?: object;
  field?: any;
  children?: React.ReactNode;
}): React.ReactNode => {
  return (
    <div className="bg-white space-y-5 p-4 rounded-lg shadow">
      <div className="gap-y-4 space-y-4 ">
        {title && (
          <div className="font-semibold   text-lg flex justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              {iconTitle}
              <span className="">{title} </span>
            </div>
            {/* <div className="">{buttonAction}</div> */}
          </div>
        )}
        {children || (
          <Grid className={className} gap={gap} columns={columns}>
            {field?.map((element, index) => {
              return (
                <InformationField
                  type={null}
                  key={index}
                  cols={element.cols}
                  title={element.title}
                  data={element.content}
                />
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};

interface CustomerInformationFieldProps {
  title: string | null;
  icon?: React.ReactNode;
  cols?: string;
  className?: string;
  data: string | number | undefined | null;
}

const InformationField = ({
  title,
  data,
  className = "",
  cols,
  icon,
  type,
}: CustomerInformationFieldProps) => {
  return (
    <div className={clsx(className, cols)}>
      <div className="font-semibold gap-2 ">
        {icon ? icon : null}
        {title}
      </div>
      <div className="">
        {data ?? (
          <Skeleton className="rounded-xl" width={"100%"} height="40px" />
        )}
      </div>
    </div>
  );
};

type InputType = "text" | "select" | "label" | "switch";

type UpdateFileProps = {
  title?: string;
  inputType: InputType;
  name?: string;
  error?: any;
  disabled?: boolean;
  className?: string;
  col?: 1 | 2 | 3 | 4; // pour la grille
  value?: string | number | boolean;
  // onChange?: (setter, e) => void;
  options?: { label: string; value: number }[]; // pour les selects
};
export const UpdateField = ({
  title,
  error,
  inputType = "text",
  name,
  disabled,
  className = "",
  col = 1,
  value,
  options,
  onChange,
}: UpdateFileProps) => {
  const colspan = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
  };
  const valueIsDefined = (value) => {
    return value !== null || value !== undefined;
  };
  const getValuePathData = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const errorValue = error ? error[name] : null;
  return (
    <div className={clsx(colspan[col], className)}>
      <div className="">
        {title && (
          <label htmlFor={name} className="block font-semibold mb-1">
            {title}
          </label>
        )}
        <div className="">
          {(value === undefined || value === null) && (
            <Skeleton className="rounded-xl" width="100%" height="40px" />
          )}
          {JSON.stringify(value)}
          {value !== undefined && value !== null && (
            <>
              {/* {JSON.stringify(options)} */}
              {/* {JSON.stringify(value)} */}
              {inputType === "select" && (
                <select
                  disabled={disabled}
                  id={name}
                  name={name}
                  className="w-full border border-black/20 te p-2 rounded-md"
                  value={value.id}
                  onChange={(e) =>
                    onChange?.({
                      event: e,
                      inputType: inputType,
                      value: value,
                    })
                  }
                >
                  <option value="">-- Sélectionner --</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {(inputType === "text" || inputType === "number") && (
                <input
                  disabled={disabled}
                  type={inputType}
                  id={name}
                  max={inputType === "number" ? 999999999999999 : undefined}
                  min={inputType === "number" ? 1 : undefined}
                  name={name}
                  className={clsx(
                    errorValue ? "border-red-500 border-2" : "",
                    "w-full border border-black/20 te p-2 rounded-md"
                  )}
                  value={value}
                  onChange={(e) =>
                    onChange?.({ event: e, inputType: inputType, value: value })
                  }
                />
              )}

              {inputType === "textarea" && (
                <textarea
                  id={name}
                  disabled={disabled}
                  name={name}
                  className="w-full border border-black/20 te p-2 rounded-md"
                  value={value}
                  onChange={(e) =>
                    onChange?.({ event: e, inputType: inputType, value: value })
                  }
                ></textarea>
              )}
              {inputType === "switch" && (
                <>
                  <Switch
                    disabled={disabled}
                    checked={value}
                    onClick={(e) =>
                      onChange?.({
                        inputType: inputType,
                        name: name,
                        value: value,
                      })
                    }
                  />
                </>
              )}
            </>
          )}
        </div>

        <div className="text-sm text-red-500 font-semibold">
          {errorValue ?? null}
        </div>
      </div>
    </div>
  );
};
