"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { FormStateMessage } from "@/components/auth/form-state-message";
import { register } from "@/actions/auth";
import { FormWrapper } from "./form-wrapper";
import { Separator } from "../ui/separator";
import { PasswordInput } from "./password-input";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    try {
      const { error, success } = await register(values);

      if (error) {
        setError(error);
      }

      if (success) {
        form.reset();
      }
    } catch {
      toast.error("Algo salió mal!");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-full">
      <FormWrapper
        headerTitle="Registro"
        headerSubtitle="Crear acceso para el administrador del sistema"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="px-4">
            <div className="space-y-4 mt-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        field={field}
                        placeholder="Introduce la contraseña"
                        isSubmitting={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormStateMessage type="Success" message={success} />
              <FormStateMessage type="Error" message={error} />

              <div className="pt-3 pb-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !isValid}
                  className="w-full font-semibold rounded-lg"
                >
                  {isSubmitting && <Loader className="h-5 w-5 animate-spin" />}
                  Crear acceso
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}
