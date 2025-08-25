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
  // const actionsTable = [
  //   {
  //     label: "Afficher",
  //     type: "url",
  //     url: "users.view",
  //     params: (id: any) => ({
  //       useruuid: id,
  //     }),
  //   },
  //   {
  //     label: "Modifier",
  //     type: "url",
  //     url: "users.edit",
  //     params: (id: any) => ({
  //       useruuid: id,
  //     }),
  //   },
  // ];

  //   Colonnes du tablaux
  const columns = [
    {
      accessorKey: "id",
      accessorFn: (row) => row.id,
      header: "id",
      colType: "text",
    },
    {
      accessorFn: (row) => row.description,
      header: "Description",
      colType: "text",
    },
    {
      accessorFn: (row) => row.causeBy?.name,
      accessorKey: "causeBy.name",
      header: "Action par",
      colType: "text",
    },
    {
      accessorFn: (row) => row.name,
      accessorKey: "sujet.name",
      header: "Sujet",
      colType: "text",
    },
    {
      accessorFn: (row) => row.logAt,
      accessorKey: "logAt",
      header: "Date",
      colType: "text",
    },

  ];

  // Actiond de la page
  // const actions: DropDownListPageActionProps[] = [
  //   {
  //     type: "url",
  //     label: "Créer un utilisateur",
  //     href: route("users.new"),
  //   },
  // ];

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
            tableTitle={"Historique d'activités"}
            cols={columns}
          />
        </div>
      </PageLayoutBody>
    </div>
  );
}
