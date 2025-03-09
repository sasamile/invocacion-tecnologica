"use client";

import { Badge } from "@/components/ui/badge";
import { CampusesColumns } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export const campusColumns: ColumnDef<CampusesColumns>[] = [
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => {
      const code: string = row.getValue("code");

      return (
        <div className="">
          <p className="font-medium">{code}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "instituteName",
    header: "Colegio",
  },
  {
    accessorKey: "municipality",
    header: "Municipio",
  },
  {
    accessorKey: "zona",
    header: "Zona",
    cell: ({ row }) => {
      const zona: string = row.getValue("zona");

      const zonaColors: Record<string, string> = {
        RURAL: "bg-[#84cc16] text-white", // Verde
        URBANO: "bg-[#2196F3] text-white", // Azul
        URBANA: "bg-[#2196F3] text-white", // Azul
        "URBANA, RURAL":
          "bg-gradient-to-r from-[#7E57C2] to-[#2196F3] text-white",
      };

      return (
        <div className="flex items-center gap-3 min-w-[160px] py-4">
          <Badge className={zonaColors[zona] || "bg-gray-400 text-white"}>
            {zona}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state: string = row.getValue("state");

      const stateColors: Record<string, string> = {
        "ANTIGUO-ACTIVO": "bg-[#FF9800] text-white", // Naranja
        "NUEVO-ACTIVO": "bg-[#4CAF50] text-white", // Verde
        CERRADO: "bg-[#F44336] text-white", // Rojo
      };

      return (
        <div className="flex items-center gap-3 min-w-[160px] py-4">
          <Badge className={stateColors[state] || "bg-gray-400 text-white"}>
            {state}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-end min-w-[80px]">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
