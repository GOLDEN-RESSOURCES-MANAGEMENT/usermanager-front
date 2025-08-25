import z from "zod";
import axios from "axios";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/libs/session";

const SignupFormSchema = z.object({
  email: z
    .email()
    .endsWith("@usermanager.com", {
      message: "Email invalide",
    })
    .max(100),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .max(100, {
      message: "Le mot de passe doit contenir au maximum 100 caractères",
    }),
});

export const signUp = async (state, formData) => {
  // 1 - Validation du formulaire
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error);
  }
  // 2 - Preparationd des données
  const { email, password } = validatedFields.data;

  // 3 - Requete pour authentification sur le serveur
  // await axios
  //   .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
  //   .then((response) => {});
  let data;

  await axios
    .post(process.env.NEXT_PUBLIC_API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      data = {
        status: 200,
        data: response.data.data,
      };
    })
    .catch((error) => {
      // Identifiant incorrect ou erreur serveur
      if (error.response.status == 401) {
        data = {
          status: error.response.status,
          message: "Les identificant de connexion sont incorrects",
        };
      } else {
        data = {
          status: error.response.status,
          message:
            "Une erreur est survement veillez contacter l'administrateur",
        };
      }
      return;
    });
  // 4 - Redirectiond de l'utilisateur
  if (data.status !== 200) {
    return data;
  } else {
    await createSession(data);
    redirect("/");
  }
};

export const logout = async (state, formData) => {
  await deleteSession();

  redirect("/ogin");
};
