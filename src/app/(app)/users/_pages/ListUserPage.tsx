"use client";
import Buttons from "@/components/Buttons";
import {
  DropDownListPage,
  DropDownListPageActionProps,
} from "@/components/DropDown";
import { PageLayoutBody, PageLayoutHeader } from "@/components/Layout";
import MyTable from "@/components/Table";
import { route } from "@/libs/route";
import { useAuthStore } from "@/libs/store";
import React from "react";
import { TbReload } from "react-icons/tb";

export default function ListUserPage() {
  const hasRole = useAuthStore((state) => state.hasRole);
  interface ActionTableProps {
    label: string;
    type: "url" | "button";
  }
  const actionsTable = [
    {
      label: "Afficher",
      type: "url",
      visible: true,
      url: "users.view",
      params: (id: any) => ({
        useruuid: id,
      }),
    },
    {
      label: "Modifier",
      visible: hasRole("admin"),
      type: "url",
      url: "users.edit",
      params: (id: any) => ({
        useruuid: id,
      }),
    },
  ];

  //   Colonnes du tablaux
  const columns = [
    {
      accessorFn: (row) => row.id,
      accessorKey: "id",
      header: "id",
      colType: "text",
    },
    {
      accessorFn: (row) => row.name,
      accessorKey: "name",
      header: "Nom",
      colType: "text",
    },
    {
      accessorFn: (row) => row.email,
      accessorKey: "email",
      header: "Email",
      colType: "text",
    },
    {
      accessorFn: (row) => row.createdAt,
      accessorKey: "createdAt",
      header: "Date de création",
      colType: "text",
    },
    {
      accessorFn: (row) => row.active,
      accessorKey: "active",
      header: "Status",
      colType: "badge",
      enum: {
        true: {
          title: "active",
          color: "text-green-900 bg-green-200",
        },
        false: {
          title: "Inactif",
          color: "text-red-900 bg-red-200",
        },
      },
    },
    {
      accessorFn: (row) => row.role?.[0]?.name,
      header: "Role",
      colType: "text",
    },
    {
      accessorKey: "action",
      header: "Action",
      colType: "dropdown",
    },
  ];

  // Actiond de la page
  const actions: DropDownListPageActionProps[] = [
    {
      type: "url",
      visible: hasRole("admin"),
      label: "Créer un utilisateur",
      href: route("users.new"),
    },
  ];

  return (
    <div className="space-y-12">
      <PageLayoutHeader className="flex justify-end">
        <DropDownListPage actions={actions} />
      </PageLayoutHeader>
      <PageLayoutBody>
        <div className="bg-white space-y-3  rounded-lg shadow">
          <MyTable
            route={["usersmanage.users.view", "useruuid"]}
            apiUrl="/users"
            tableTitle={"Utilisateurs"}
            cols={columns}
            actionsTable={actionsTable}
          />
        </div>
      </PageLayoutBody>
    </div>
  );
}
