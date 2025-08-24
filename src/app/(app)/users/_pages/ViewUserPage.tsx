"use client";
import {
  DropDownListPage,
  DropDownListPageActionProps,
} from "@/components/DropDown";
import { Content, PageLayoutBody, PageLayoutHeader } from "@/components/Layout";
import { useUser } from "@/hooks/useUser";
import { route } from "@/libs/route";
import React from "react";

const ViewPageUser = ({ useruuid }) => {
  const { user, loading, deleteUser } = useUser({
    userUuid: useruuid,
  });

  // Suppression de l'utilisateur
  const handleDeleteAction = async () => {
    deleteUser();
  };
  const actions: DropDownListPageActionProps[] = [
    {
      type: "url",
      label: "Modifier",
      href: route("users.edit", { useruuid: useruuid }),
    },
    {
      type: "deleteAction",
      label: "Supprimer",
      confirmationMessage: "Veuillez confirmer la suppression de l'utilisateur",
      action: handleDeleteAction,
      redirect: route("users"),
      confirmation: true,
    },
  ];

  const inputsValue = [
    {
      title: "Nom",
      icon: null,
      content: user?.name,
    },
    {
      title: "Role",
      icon: null,
      content: user?.role,
    },
    {
      title: "Email",
      icon: null,
      content: user?.email,
    },
    {
      title: "Active",
      icon: null,
      content: user?.active ? "Actif" : "Désactivé",
    },
    {
      title: "Crée le",
      icon: null,
      content: user?.createdAt,
    },
  ];

  return (
    <div className="space-y-12">
      <PageLayoutHeader className="flex justify-end">
        <DropDownListPage actions={actions} />
      </PageLayoutHeader>
      <PageLayoutBody className="space-y-5">
        <Content
          loading={loading}
          field={inputsValue}
          title="Information de l'utilisateur"
        />
      </PageLayoutBody>
    </div>
  );
};

export default ViewPageUser;
