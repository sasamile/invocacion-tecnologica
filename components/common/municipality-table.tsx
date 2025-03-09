// components/municipalities/municipalities-table.tsx
"use client";

import { DataTable } from "@/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";

// Reusamos la interfaz original extendiéndola
interface MunicipalitiesTableProps<TData> {
  type: "institute" | "campus" | "municipality"; // Añadimos municipality como opción válida
  data: TData[];
  columns: ColumnDef<TData>[];
}

export function MunicipalitiesTable<TData>({
  type,
  data,
  columns,
}: MunicipalitiesTableProps<TData>) {
  return <DataTable columns={columns} data={data} />;
}