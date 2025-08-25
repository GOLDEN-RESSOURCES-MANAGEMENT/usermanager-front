"use client";
import {
  DropDownListPage,
  DropDownListPageActionProps,
} from "@/components/DropDown";
import { PageLayoutBody, PageLayoutHeader } from "@/components/Layout";
import MyTable from "@/components/Table";
import { route } from "@/libs/route";
import React from "react";

export default function ListPageActivity() {
  interface ActionTableProps {
    label: string;
    type: "url" | "button";
  }
  const actionsTable = [
    {
      label: "Afficher",
      type: "url",
      url: "users.view",
      params: (id: any) => ({
        useruuid: id,
      }),
    },
    {
      label: "Modifier",
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
      accessorKey: "id",
      header: "id",
      colType: "text",
    },
    {
      accessorKey: "description",
      header: "Description",
      colType: "text",
    },
    {
      accessorKey: "causeBy.name",
      header: "Action par",
      colType: "text",
    },
    {
      accessorKey: "sujet.name",
      header: "Sujet",
      colType: "text",
    },
    {
      accessorKey: "logAt",
      header: "Date",
      colType: "text",
    },
    // {
    //   accessorKey: "name",
    //   header: "Nom",
    //   colType: "text",
    // },
    // {
    //   accessorKey: "email",
    //   header: "Email",
    //   colType: "text",
    // },
    // {
    //   accessorKey: "createdAt",
    //   header: "Date de création",
    //   colType: "text",
    // },
    // {
    //   accessorKey: "active",
    //   header: "Status",
    //   colType: "text",
    // },
    // {
    //   accessorKey: "action",
    //   header: "Action",
    //   colType: "dropdown",
    // },
  ];

  // Actiond de la page
  const actions: DropDownListPageActionProps[] = [
    {
      type: "url",
      label: "Créer un utilisateur",
      href: route("users.new"),
    },
  ];

  return (
    <div className="space-y-12">
      <PageLayoutHeader className="flex justify-between">
        {/* dd */}
        ddpok
        {/* <DropDownListPage actions={actions} /> */}
      </PageLayoutHeader>
      <PageLayoutBody>
        <div className="bg-white space-y-3  rounded-lg shadow">
          <MyTable
            route={["usersmanage.users.view", "useruuid"]}
            apiUrl="/activities"
            tableTitle={"Client"}
            cols={columns}
            actionsTable={actionsTable}
          />
        </div>
      </PageLayoutBody>
    </div>
  );
}
