"use client";

import { BaseInstitution, MunicipalityData } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createInstitute, updateInstitute } from "@/services/institutions";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface SchoolFormProps {
  initialData?: BaseInstitution;
  isEditing?: boolean;
  onCancel: () => void;
  municipalities: MunicipalityData[];
  type: "school" | "campus"; // Para identificar qué formulario se usa
}

const baseInstitutionSchema = z.object({
  code: z.string().min(3, "El código debe tener al menos 3 caracteres"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  zona: z.enum(["URBANA", "RURAL", "URBANA, RURAL"]),
  municipalitiesId: z.string(),
  instituteName: z.string().optional(),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
  state: z.enum(["ANTIGUO-ACTIVO", "NUEVO-ACTIVO", "CERRADO"]),
  rector: z
    .string()
    .min(3, "El nombre del rector debe tener al menos 3 caracteres"),
});

export type SchoolFormValues = z.infer<typeof baseInstitutionSchema>;

export function SchoolForm({
  initialData,
  type,
  isEditing,
  municipalities,
  onCancel,
}: SchoolFormProps) {
  const queryClient = useQueryClient();

  const [isLoading, startTransition] = useTransition();
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>(initialData?.municipalityId ?? "");
  const [codeEditable, setCodeEditable] = useState<boolean>(!isEditing);

  // Configurar el formulario con React Hook Form y Zod
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(baseInstitutionSchema),
    defaultValues: {
      code: initialData?.code ?? "",
      name: initialData?.name ?? "",
      address: initialData?.address ?? "",
      zona: (initialData?.zona as "URBANA" | "RURAL") ?? "URBANA",
      municipalitiesId: initialData?.municipality ?? "",
      phone: initialData?.phone ?? "",
      state: (initialData?.state as  "ANTIGUO-ACTIVO" | "NUEVO-ACTIVO" | "CERRADO") ?? "NUEVO-ACTIVO",
      rector: initialData?.rector ?? "",
    },
  });

  const onSubmit = async (values: SchoolFormValues) => {
    try {
      if (!initialData) {
        createProccess(values);
      } else {
        updateProcess(values);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Algo salió mal al eliminar al usuario.",
      });
    }
  };

  const createProccess = (values: SchoolFormValues) => {
    startTransition(async () => {
      try {
        if (type === "school") {
          const { success } = await createInstitute(values);

          if (!success) {
            toast.error("Algo salió mal.", {
              description: "Ocurrió un error al eliminar el colegio.",
            });
          }
          
          if (success) {
            toast.success("Proceso completado.", {
              description: "Institución creada exitosamente.",
            });
            onCancel();
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["institutions"] });
          }
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal al eliminar al usuario.",
        });
      }
    });
  };

  const updateProcess = (values: SchoolFormValues) => {
    startTransition(async () => {
      try {
        if (type === "school") {
          const { success } = await updateInstitute(values, initialData?.id!);

          if (!success) {
            toast.error("Algo salió mal.", {
              description: "Ocurrió un error al eliminar el colegio.",
            });
          }
          
          if (success) {
            toast.success("Proceso completado.", {
              description: "Institución actualizada exitosamente.",
            });
            onCancel();
            queryClient.invalidateQueries({ queryKey: ["institutions"] });
          }
        }
      } catch (error) {
        toast.error("Error", {
          description: "Algo salió mal al eliminar al usuario.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Municipio */}
          <FormField
            control={form.control}
            name="municipalitiesId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipio</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={(value) => {
                    const municipio = municipalities.find(
                      (m) => m.id === value
                    );
                    if (municipio) {
                      field.onChange(municipio.id);
                      setSelectedMunicipio(value);
                    }
                  }}
                  value={selectedMunicipio}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un municipio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {municipalities.map((municipio) => (
                      <SelectItem key={municipio.id} value={municipio.id}>
                        {municipio.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Código */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código del Colegio</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading || !selectedMunicipio || !codeEditable}
                      className="rounded-md"
                      placeholder="Código DANE"
                    />
                  </FormControl>
                </div>
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
                <FormLabel>Nombre del Colegio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Nombre completo del colegio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dirección */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Dirección del colegio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zona */}
          <FormField
            control={form.control}
            name="zona"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zona</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione una zona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="URBANA">Urbana</SelectItem>
                    <SelectItem value="RURAL">Rural</SelectItem>
                    <SelectItem value="URBANA, RURAL">Urbana, Rural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Teléfono */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Teléfono de contacto"
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estado */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ANTIGUO-ACTIVO">Antiguo - Activo</SelectItem>
                    <SelectItem value="NUEVO-ACTIVO">Nuevo - Activo</SelectItem>
                    <SelectItem value="CERRADO">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rector */}
          <FormField
            control={form.control}
            name="rector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rector</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Nombre del rector"
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
            {isLoading && <Loader className="animate-spin" />}
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
