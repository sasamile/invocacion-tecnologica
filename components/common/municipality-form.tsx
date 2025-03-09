// components/municipalities/municipality-form.tsx
"use client";

import { MunicipalityData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface MunicipalityFormProps {
  initialData?: MunicipalityData;
  isEditing?: boolean;
  onCancel: () => void;
}

const municipalitySchema = z.object({
  codeMunicipalities: z.string().min(3, "El código debe tener al menos 3 caracteres"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});

export type MunicipalityFormValues = z.infer<typeof municipalitySchema>;

export function MunicipalityForm({
  initialData,
  isEditing,
  onCancel,
}: MunicipalityFormProps) {
  const queryClient = useQueryClient();
  const [isLoading, startTransition] = useTransition();

  // Configurar el formulario con React Hook Form y Zod
  const form = useForm<MunicipalityFormValues>({
    resolver: zodResolver(municipalitySchema),
    defaultValues: {
      codeMunicipalities: initialData?.codeMunicipalities ?? "",
      name: initialData?.name ?? "",
    },
  });

  const onSubmit = async (values: MunicipalityFormValues) => {
    try {
      if (!initialData) {
        createProcess(values);
      } else {
        updateProcess(values);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Algo salió mal en el proceso.",
      });
    }
  };

  const createProcess = (values: MunicipalityFormValues) => {
    startTransition(async () => {
      try {
        const response = await axios.post("/api/municipalities", {
          ...values,
          departmentId: "50", // Asumimos que todos los municipios son del departamento 50
        });

        if (response.status !== 201) {
          toast.error("Algo salió mal.", {
            description: "Ocurrió un error al crear el municipio.",
          });
          return;
        }

        toast.success("Proceso completado.", {
          description: "Municipio creado exitosamente.",
        });
        onCancel();
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["municipalities"] });
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal al crear el municipio.",
        });
      }
    });
  };

  const updateProcess = (values: MunicipalityFormValues) => {
    startTransition(async () => {
      try {
        const response = await axios.put(`/api/meta/${initialData?.id}`, {
          ...values,
        });

        if (response.status !== 200) {
          toast.error("Algo salió mal.", {
            description: "Ocurrió un error al actualizar el municipio.",
          });
          return;
        }

        toast.success("Proceso completado.", {
          description: "Municipio actualizado exitosamente.",
        });
        onCancel();
        queryClient.invalidateQueries({ queryKey: ["municipalities"] });
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal al actualizar el municipio.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Código */}
          <FormField
            control={form.control}
            name="codeMunicipalities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código del Municipio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading || (isEditing && !!initialData)} // Deshabilitar en modo edición
                    placeholder="Código del municipio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Municipio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Nombre del municipio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader className="animate-spin mr-2" />}
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}