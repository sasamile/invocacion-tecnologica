"use client";

import { SchoolColumns } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-actions";

export const schoolColumns: ColumnDef<SchoolColumns>[] = [
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
    accessorKey: "municipality",
    header: "Municipio",
  },
  {
    accessorKey: "campuses",
    header: "Sedes",
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
