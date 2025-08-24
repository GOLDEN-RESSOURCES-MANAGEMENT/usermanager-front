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
import { useUser } from "@/hooks/useUser";
import { handleGenericChange } from "@/libs/helper";
import { Grid } from "@radix-ui/themes";

export default function EditUserPage({ userUuid }) {
  const { user, updateUser, setUser, error, loading } = useUser({
    userUuid: userUuid,
  });

  const handleChange = (obj) => {
    handleGenericChange(setUser, obj);
  };

  const handleSaveNewUser = () => {
    updateUser();
  };
  const actions: DropDownListPageActionProps[] = [
    {
      type: "saveAction",
      label: "Enregistrer",
      action: handleSaveNewUser,
      loading: loading,
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
      {JSON.stringify(error)}
      <PageLayoutHeader className="flex justify-end">
        <DropDownListPage actions={actions} />
      </PageLayoutHeader>
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
              inputType="select"
              title="Role"
              options={roleOptions}
              name="role"
              error={error}
              disabled={loading}
              value={user.role[0]}
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
        </Content>
      </PageLayoutBody>
    </div>
  );
}
