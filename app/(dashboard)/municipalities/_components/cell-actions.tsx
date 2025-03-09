// components/municipalities/municipality-cell-action.tsx
"use client";

import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/common/alert-modal";
import { Modal } from "@/components/common/modal";
import { cn } from "@/lib/utils";
import { MunicipalityData } from "@/types";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { MunicipalityForm } from "@/components/common/municipality-form";


interface MunicipalityCellActionProps {
  data: MunicipalityData;
}

export function MunicipalityCellAction({ data }: MunicipalityCellActionProps) {
  const queryClient = useQueryClient();
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openAlertConfirmation, setOpenAlertConfirmation] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const res = await axios.delete(`/api/meta/${data.id}`);

        if (res.status !== 200) {
          toast.error("Algo salió mal.", {
            description: "Ocurrió un error al eliminar el municipio.",
          });
          return;
        }

        toast.success("Proceso completado.", {
          description: "Municipio eliminado exitosamente.",
        });
        setOpenAlertConfirmation(false);
        queryClient.invalidateQueries({ queryKey: ["municipalities"] });
      } catch {
        toast.error("Error", {
          description: "Algo salió mal al eliminar el municipio.",
        });
      }
    });
  };

  return (
    <>
      <AlertModal
        title="¿Está seguro de eliminar este municipio?"
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el municipio de la plataforma."
        isLoading={isLoading}
        isOpen={openAlertConfirmation}
        onClose={() => setOpenAlertConfirmation(false)}
        onConfirm={handleConfirm}
      />

      <Modal
        title="Editar datos del municipio"
        isOpen={open}
        onClose={closeDialog}
        className=" h-min"
      >
        <MunicipalityForm
          initialData={data}
          isEditing={true}
          onCancel={closeDialog}
        />
      </Modal>

      <div className="flex items-center gap-1 w-full justify-end">
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Edit strokeWidth={2.5} className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("group size-8 hover:bg-red-500")}
          onClick={() => setOpenAlertConfirmation(true)}
        >
          <Trash2
            strokeWidth={2.5}
            className="size-4 text-red-400 group-hover:text-white"
          />
        </Button>
      </div>
    </>
  );
}