"use server";
import React from "react";
import ViewPageUser from "../../_pages/ViewUserPage";

// After
type Params = Promise<{ useruuid: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { useruuid } = await params;
  // const response = await getData({ endpoint: `/users/${useruuid}` });
}

export default async function Page({ params }: { params: Params }) {
  const { useruuid } = await params;
  return <ViewPageUser useruuid={useruuid} />;
}
