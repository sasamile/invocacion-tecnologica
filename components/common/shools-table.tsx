import { DataTable } from "@/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface SchoolsTableProps<TData> {
  type: "institute" | "campus";
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
}

export function SchoolsTable<TData>({ data, columns }: SchoolsTableProps<TData>) {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}
