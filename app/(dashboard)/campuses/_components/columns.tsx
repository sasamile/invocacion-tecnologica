"use client";

import { Badge } from "@/components/ui/badge";
import { CampusesColumns } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-actions";

export const campusColumns: ColumnDef<CampusesColumns>[] = [
  {
    accessorKey: "code",
    header: "Código",
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
    accessorKey: "campuses",
    header: "Sedes",
  },
  {
    accessorKey: "zona",
    header: "Zona",
    cell: ({ row }) => {
      const zona: string = row.getValue("zona");

      return (
        <div className="flex items-center gap-3 min-w-[160px] py-4">
          <Badge>{zona}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state: string = row.getValue("state");

      return (
        <div className="flex items-center gap-3 min-w-[160px] py-4">
          <Badge>{state}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-end min-w-[80px]">
        {/* <CellAction data={row.original} /> */}
      </div>
    ),
  },
];
