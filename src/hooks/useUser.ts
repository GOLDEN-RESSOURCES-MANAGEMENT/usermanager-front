"use client";
import { useState, useEffect } from "react";

import { redirect } from "next/navigation";
import { getData, postData } from "@/libs/fetchData";
import {
  emitServerErrorEvent,
  fetchServerError,
  fetchSuccess,
  fetchValidationError,
} from "@/libs/helper";
import {
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
  VALIDATION_CODE,
} from "@/libs/contants";
import { route } from "@/libs/route";

export function useUser({ userUuid }: { userUuid?: string }) {
  // Chargement
  const [loading, setLoading] = useState(true);
  //  Initialisation de l'utilisateur
  const [user, setUser] = useState({
    name: "",
    active: false,
    role: "",
    email: "",
    createdAt: "",
  });
  //  Error
  const [error, setError] = useState<any>(null);

  // Fetch data for user resource
  useEffect(() => {
    setLoading(true);

    if (userUuid) {
      const fetchUser = async () => {
        const response = await getData({
          endpoint: `/users/${userUuid}`,
          method: "GET",
        });
        // Success
        if (fetchSuccess(response.status)) {
          setUser(response.data.data);
        }
        // Serveur error
        if (fetchServerError(response.status)) {
          setError(null);
          emitServerErrorEvent(response.status);
        }
      };
      fetchUser();
    }
    setLoading(false);
  }, [userUuid]);

  const createUser = async () => {
    if (loading) return;
    setError(null);
    setLoading(true);
    const { status, data, error } = await postData({
      endpoint: "/users",
      data: user,
    });
    // Succes
    if (fetchSuccess(status)) {
      redirect(route("users.view", { useruuid: data.data.id }));
    }
    // Validation
    if (fetchValidationError(status)) {
      setError(error.data);
    }
    // Erreur serveur
    if (fetchServerError(status)) {
      emitServerErrorEvent(status);
      setError(null);
    }
    setLoading(false);
  };

  const updateUser = async () => {
    if (loading) return;
    setError(null);
    setLoading(true);
    const { data, status, error } = await postData({
      endpoint: `/users/${userUuid}`,
      method: "PUT",
      data: user,
    });
    // Success
    if (fetchSuccess(status)) {
      redirect(route("users.view", { useruuid: data.data.id }));
    }
    // Validation
    if (fetchValidationError(status)) {
      setError(error.data);
    }
    // Server Error
    if (fetchServerError(status)) {
      emitServerErrorEvent(status);
      setError(null);
    }
    setLoading(false);
  };

  const deleteUser = async () => {
    if (loading) return;
    const { data, status, error } = await getData({
      endpoint: `/users/${userUuid}`,
      method: "DELETE",
    });
    // Success
    if (fetchSuccess(status)) {
      redirect(route("users"));
    }
    // Server Error
    if (fetchServerError(status)) {
      emitServerErrorEvent(status);
      setError(null);
    }
  };

  return { user, loading, error, createUser, updateUser, deleteUser, setUser };
}
