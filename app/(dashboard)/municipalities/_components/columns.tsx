// _components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { MunicipalityData } from "@/types";
import { MunicipalityCellAction } from "./cell-actions";
export const municipalityColumns: ColumnDef<MunicipalityData>[] = [
  {
    accessorKey: "codeMunicipalities",
    header: "Código",
    cell: ({ row }) => {
      const code: string = row.getValue("codeMunicipalities");
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
    accessorKey: "totalInstituciones",
    header: "Colegios",
  },
  {
    accessorKey: "totalSedes",
    header: "Sedes",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-end min-w-[80px]">
        <MunicipalityCellAction data={row.original} />
      </div>
    ),
  },
];
