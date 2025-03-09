"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/common/heading";
import { CreateSchoolDialog } from "@/components/schools/create-school-dialog";
import { SchoolsTable } from "@/components/common/shools-table";
import { useState } from "react";
import { schoolColumns } from "./_components/columns";
import { TableSkeleton } from "@/components/skeletons/table/table-skeleton";
import { schoolsSkeletonColumns } from "@/constants";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMunicipalities } from "@/hooks/use-municipalities";
import { useInstitutions } from "@/hooks/use-institutions";

export default function SchoolsPage() {
  const { data: municipalities } = useMunicipalities();
  const { data: dataTable } = useInstitutions();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMunicipio, setSelectedMunicipio] = useState("all");

  // Filtrar colegios por término de búsqueda y municipio seleccionado
  const filteredColegios = dataTable?.filter(
    (school) =>
      (school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.code.includes(searchTerm)) &&
      (selectedMunicipio === "all" || school.municipality === selectedMunicipio) // Updated filter logic
  );

  return (
    <div className="space-y-6">
      <div className="flex lg:flex-row flex-col max-lg:gap-4 items-center justify-between">
        <Heading
          title="Colegios"
          description="Gestione los colegios del Departamento del Meta"
        />
        <CreateSchoolDialog
          label="Agregar colegio"
          title="Agregar Nuevo Colegio"
          description="Ingrese los datos del nuevo colegio. El código del departamento y
            municipio se generarán automáticamente."
          municipalities={municipalities}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-0 pt-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar colegios..."
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select
            value={selectedMunicipio}
            onValueChange={setSelectedMunicipio}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Todos los municipios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los municipios</SelectItem>{" "}
              {/* Updated SelectItem value */}
              {municipalities?.map((municipality) => (
                <SelectItem key={municipality.id} value={municipality.name}>
                  {municipality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!dataTable ? (
        <TableSkeleton
          inputPlaceholder="Buscar por código..."
          columns={schoolsSkeletonColumns}
          rowCount={10}
        />
      ) : (
        <SchoolsTable
          type="institute"
          data={filteredColegios!}
          columns={schoolColumns}
        />
      )}
    </div>
  );
}
