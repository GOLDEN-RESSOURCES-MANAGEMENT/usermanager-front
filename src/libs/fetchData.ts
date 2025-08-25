"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./session";
import { UNAUTHORIRED_CODE } from "./contants";

export const postData = async (endpoint) => {
  const cookie = await verifyTokenExiste();

  return axios({
    method: endpoint.method ?? "POST",
    url: process.env.NEXT_PUBLIC_API_URL + endpoint.endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie?.data?.token}`,
    },
    data: endpoint.data,
  })
    .then((res) => {
      return successResponse(res);
    })
    .catch((err) => {
      return errorResponse(err);
    });
};

export const getData = async (endpoint) => {
  const cookie = await verifyTokenExiste();
  return await axios({
    method: endpoint.method ?? "GET",
    url: process.env.NEXT_PUBLIC_API_URL + endpoint.endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie?.data?.token}`,
    },
    data: endpoint.data ?? null,
  })
    .then((res) => {
      return successResponse(res);
    })
    .catch((err) => {
      if (err.response) {
        return errorResponse(err);
      } else {
        console.log("Erreur réseau ou autre", err.message);
        return errorResponse(err);
      }
    });
};

const verifyTokenExiste = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const cookieData = await decrypt(cookie);
  return cookieData;
};
const successResponse = (res) => {
  return {
    status: res.status,
    data: res.data,
  };
};

const errorResponse = (err) => {
  if (err.code === "ECONNREFUSED") {
    return {
      status: 503,
      data: "",
    };
  }
  if (err.response?.status == UNAUTHORIRED_CODE) {
    deleteSession();
  }
  // console.log(
  //   "000000000000000000000",
  //   err.response?.status,
  //   err.response?.data
  // );
  return {
    status: err.response?.status,
    error: err.response?.data,
  };
};
