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
import React from "react";
import { UserForm } from "../_components/Form";
import { useUser } from "@/hooks/useUser";
import { handleGenericChange } from "@/libs/helper";
import { Grid } from "@radix-ui/themes";

export default function NewUserPage() {
  const { user, createUser, setUser, error, loading } = useUser({});

  const handleChange = (obj) => {
    handleGenericChange(setUser, obj);
  };

  const handleSaveNewUser = () => {
    createUser();
  };
  const actions: DropDownListPageActionProps[] = [
    {
      type: "saveAction",
      label: "Enregistrer",
      action: handleSaveNewUser,
      loading: loading,
    },
  ];
  return (
    <div className="space-y-12">
      <PageLayoutHeader className="flex justify-end">
        <DropDownListPage actions={actions} />
      </PageLayoutHeader>
      {/* PAGE CONTENT */}
      {JSON.stringify(user)}
      {JSON.stringify(error)}
      {/* TABLE DATA */}
      <PageLayoutBody className="space-y-5">
        <Content title="Information de l'utilisateur">
          <Grid gap="3" columns="3">
            <UpdateField
              inputType="text"
              title="Nom"
              name="name"
              error={error}
              disabled={loading}
              value={user.name}
              onChange={handleChange}
            />
            <UpdateField
              inputType="text"
              title="Role"
              name="role"
              error={error}
              disabled={loading}
              value={user.role}
              onChange={handleChange}
            />
            <UpdateField
              inputType="text"
              title="Email"
              error={error}
              disabled={loading}
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <UpdateField
              inputType="switch"
              title="Active"
              error={error}
              disabled={loading}
              name="active"
              value={user.active}
              onChange={handleChange}
            />
          </Grid>
          {/* <UserForm
            user={user}
            onChange={handleChange}
            error={error}
            loading={loading}
          /> */}
        </Content>
      </PageLayoutBody>
    </div>
  );
}
