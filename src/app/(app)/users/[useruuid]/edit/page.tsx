"use server";
import React from "react";
import EditUserPage from "../../_pages/EditUserPage";

// After
type Params = Promise<{ useruuid: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { useruuid } = await params;
}

export default async function Page({ params }: { params: Params }) {
  const { useruuid } = await params;
  return <EditUserPage userUuid={useruuid} />;
}
