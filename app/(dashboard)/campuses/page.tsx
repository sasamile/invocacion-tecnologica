"use client";

import { Heading } from "@/components/common/heading";
import { CreateSchoolDialog } from "@/components/schools/create-school-dialog";
import { useState } from "react";
import { campusColumns } from "./_components/columns";
import { TableSkeleton } from "@/components/skeletons/table/table-skeleton";
import { schoolsSkeletonColumns } from "@/constants";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMunicipalities } from "@/hooks/use-municipalities";
import { useInstitutions } from "@/hooks/use-institutions";
import { useCampuses } from "@/hooks/use-campuses";
import { DataTable } from "@/components/common/data-table";
import { FilterSelect } from "./_components/filter-select";

export default function CampusePage() {
  const { data: municipalities } = useMunicipalities();
  const { data: institutions } = useInstitutions();
  const { data: dataTable } = useCampuses();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMunicipio, setSelectedMunicipio] = useState("all");
  const [selectedInstitude, setSelectedInstitude] = useState("all");

  // Filtrar sedes por término de búsqueda y municipio seleccionado
  const filteredCampuses = dataTable?.filter(
    (campus) =>
      (campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campus.code.includes(searchTerm)) &&
      (selectedMunicipio === "all" ||
        campus.municipality === selectedMunicipio) &&
      (selectedInstitude === "all" ||
        campus.instituteName === selectedInstitude)
  );

  return (
    <div className="space-y-6">
      <div className="flex lg:flex-row flex-col max-lg:gap-4 items-center justify-between">
        <Heading
          title="Sedes Educativas"
          description="Gestione las sedes educativas del Departamento del Meta"
        />
        <CreateSchoolDialog
          type="campus"
          label="Agregar sede"
          title="Agregar Nueva Sede"
          description="Ingrese los datos de la nueva sede. El código del departamento, municipio y colegio se generarán automáticamente."
          municipalities={municipalities}
          institutions={institutions}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>

      <div className="flex flex-col-reverse gap-4 xl:flex-row xl:items-center mb-0 pt-3 w-full">
        <div className="relative flex-1 xl:min-w-sm xl:w-sm xs:w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar colegios..."
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full flex max-lg:flex-col lg:items-center gap-3">
          <FilterSelect
            options={municipalities}
            triggerPlaceholder="Todos los municipios"
            defaultValuePlaceholder="Todos los municipios"
            onChange={setSelectedMunicipio}
            value={selectedMunicipio}
          />
          <FilterSelect
            options={institutions}
            triggerPlaceholder="Todos los colegios"
            defaultValuePlaceholder="Todos los colegios"
            onChange={setSelectedInstitude}
            value={selectedInstitude}
          />
        </div>
      </div>

      {!dataTable ? (
        <TableSkeleton
          inputPlaceholder="Buscar sedes..."
          columns={schoolsSkeletonColumns}
          rowCount={10}
        />
      ) : (
        <DataTable columns={campusColumns} data={filteredCampuses ?? []} />
      )}
    </div>
  );
}
