"use client";

import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/common/alert-modal";
import { Modal } from "@/components/common/modal";
import { cn } from "@/lib/utils";
import { SchoolColumns } from "@/types";
import axios from "axios";

interface CellActionProps {
  data: SchoolColumns;
}

export function CellAction({ data }: CellActionProps) {
  const [isLoading, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [openAlertConfirmation, setOpenAlertConfirmation] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const res = await axios.delete(`http://localhost:3000/api/meta/institutions/${data.code}`);

        console.log(res)

        if (res.status !== 200) {
          toast.error("Algo salió mal.", {
            description: "Ocurrió un error al eliminar el colegio.",
          });
        }

        if (res.status === 200) {
          toast.success("Proceso completado.", {
            description: res.data.message,
          });
          setOpenAlertConfirmation(false);
        }
      } catch {
        toast.error("Error", {
          description: "Algo salió mal al eliminar al usuario.",
        });
      }
    });
  };

  return (
    <>
      <AlertModal
        title="¿Está seguro de eliminar este colegio?"
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el colegio de la plataforma."
        isLoading={isLoading}
        isOpen={openAlertConfirmation}
        onClose={() => setOpenAlertConfirmation(false)}
        onConfirm={handleConfirm}
      />

      <Modal
        title="Corregir datos del colegio"
        isOpen={open}
        onClose={closeDialog}
        className="max-h-[500px] h-full"
      >
        {/* <MonthlyClientForm
          initialData={data}
          vehicleTypes={vehicleTypes}
          clientTypes={clientTypes}
          closeDialog={closeDialog}
        /> */}
      </Modal>

      <div className="flex items-center gap-1 w-full justify-end">
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Edit strokeWidth={2.5} className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "group size-8 hover:bg-red-500",
          )}
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
