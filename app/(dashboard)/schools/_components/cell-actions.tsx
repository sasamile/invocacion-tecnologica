// components/common/cell-action.tsx
"use client";

import { toast } from "sonner";
import { Edit, File, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/common/alert-modal";
import { Modal } from "@/components/common/modal";
import { cn } from "@/lib/utils";
import { SchoolColumns } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { SchoolForm } from "@/components/common/school-form";
import { useMunicipalities } from "@/hooks/use-municipalities";
import { SchoolDetailsModal } from "@/components/common/school-details-modal";
import api from "@/api";

interface CellActionProps {
  data: SchoolColumns;
}

export function CellAction({ data }: CellActionProps) {
  const queryClient = useQueryClient();
  const [isLoading, startTransition] = useTransition();
  const { data: municipalities } = useMunicipalities();

  const [openEdit, setOpenEdit] = useState(false);
  const [openAlertConfirmation, setOpenAlertConfirmation] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailedData, setDetailedData] = useState<any | null>(null);

  const closeEditDialog = () => {
    setOpenEdit(false);
  };

  const closeDetailsDialog = () => {
    setOpenDetails(false);
    setDetailedData(null);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const res = await api.delete(
          `/api/meta/institutions/${data.code}`
        );

        if (res.status !== 200) {
          toast.error("Algo salió mal.", {
            description: "Ocurrió un error al eliminar el colegio.",
          });
          return;
        }

        toast.success("Proceso completado.", {
          description: res.data.message || "Colegio eliminado exitosamente.",
        });
        setOpenAlertConfirmation(false);
        ["institutions", "stats", "campuses"].forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key] })
        );
      } catch {
        toast.error("Error", {
          description: "Algo salió mal al eliminar el colegio.",
        });
      }
    });
  };

  const fetchSchoolDetails = async () => {
    startTransition(async () => {
      try {
        const res = await api.get(
          `/api/meta/institutions/${data.code}`
        );
        setDetailedData(res.data);
        setOpenDetails(true);
      } catch (error) {
        toast.error("Error", {
          description: "No se pudieron cargar los detalles del colegio.",
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
        isOpen={openEdit}
        onClose={closeEditDialog}
        className="max-h-[500px] h-full"
      >
        <SchoolForm
          type="school"
          initialData={data}
          onCancel={closeEditDialog}
          isEditing
          municipalities={municipalities!}
        />
      </Modal>

      <SchoolDetailsModal
        isOpen={openDetails}
        onClose={closeDetailsDialog}
        data={detailedData}
      />

      <div className="flex items-center gap-1 w-full justify-end">
        <Button variant="ghost" size="icon" onClick={() => setOpenEdit(true)}>
          <Edit strokeWidth={2.5} className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchSchoolDetails}
          disabled={isLoading}
        >
          <File strokeWidth={2.5} className="size-4" />
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