"use client";
import {
  DropDownListPage,
  DropDownListPageActionProps,
} from "@/components/DropDown";
import {
  Content,
  PageLayoutBody,
  PageLayoutHeader,
  UpdateField,
} from "@/components/Layout";
import { useUser } from "@/hooks/useUser";
import { route } from "@/libs/route";
import { useAuthStore } from "@/libs/store";
import { Grid } from "@radix-ui/themes";
import React from "react";

const ViewPageUser = ({ useruuid }) => {
  const hasRole = useAuthStore((state) => state.hasRole);
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
      visible: hasRole("admin"),
      label: "Modifier",
      href: route("users.edit", { useruuid: useruuid }),
    },
    {
      type: "deleteAction",
      label: "Supprimer",
      visible: hasRole("admin"),

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

  const roleOptions = [
    {
      label: "Admin",
      value: 1,
    },
    {
      label: "User",
      value: 2,
    },
  ];

  return (
    <div className="space-y-12">
      <PageLayoutHeader className="flex justify-end">
        <DropDownListPage actions={actions} />
      </PageLayoutHeader>
      {JSON.stringify(user)}
      <PageLayoutBody className="space-y-5">
        <Content title="Information de l'utilisateur">
          <Grid gap="3" columns="3">
            <UpdateField
              inputType="text"
              title="Nom"
              name="name"
              disabled={true}
              value={user.name}
            />
            <UpdateField
              inputType="select"
              title="Role"
              name="role"
              options={roleOptions}
              disabled={true}
              value={user.role[0]}
            />
            <UpdateField
              inputType="text"
              title="Email"
              disabled={true}
              name="email"
              value={user.email}
            />
            <UpdateField
              inputType="switch"
              title="Active"
              disabled={true}
              name="active"
              value={user.active}
            />
          </Grid>
        </Content>
      </PageLayoutBody>
    </div>
  );
};

export default ViewPageUser;
