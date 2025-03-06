"use server";

import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_AUTH_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "../user";

export async function login(credentials: z.infer<typeof LoginSchema>) {
  const result = LoginSchema.safeParse(credentials);

  if (result.error) {
    return { error: "Credenciales invalidas!" };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" };
        default:
          return { error: error.cause?.err?.message };
      }
    }

    throw error;
  }
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Datos invalidos!" };
  }

  const { email, name, password } =
    validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "El email ingresado ya esta en uso!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Negocio creado!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" };
        default:
          return { error: error.cause?.err?.message };
      }
    }

    throw error;
  }
};

export async function logout() {
  await signOut({ redirectTo: DEFAULT_AUTH_REDIRECT });
}
