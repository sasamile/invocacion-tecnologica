"use client";

import { Heading } from "@/components/common/heading";
import { useState } from "react";
import { municipalityColumns } from "./_components/columns";
import { TableSkeleton } from "@/components/skeletons/table/table-skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMunicipalities } from "@/hooks/use-municipalities";
import { CreateMunicipalityDialog } from "@/components/schools/create-municipality-dialog";
import { MunicipalitiesTable } from "@/components/common/municipality-table";
import { schoolsSkeletonColumns } from "@/constants";

export default function MunicipalitiesPages() {
  const { data: municipalities } = useMunicipalities();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrar Municipios por término de búsqueda
  const filteredMunicipalities = municipalities?.filter(
    (municipality) =>
      municipality.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      municipality.codeMunicipalities.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex lg:flex-row flex-col max-lg:gap-4 items-center justify-between">
        <Heading
          title="Municipios"
          description="Gestione los municipios del Departamento del Meta"
        />
        <CreateMunicipalityDialog
          label="Agregar municipio"
          title="Agregar Nuevo Municipio"
          description="Ingrese los datos del nuevo municipio."
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-0 pt-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar municipio..."
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!municipalities ? (
        <TableSkeleton
          inputPlaceholder="Buscar por código..."
          columns={schoolsSkeletonColumns}
          rowCount={10}
        />
      ) : (
        <MunicipalitiesTable
          type="municipality"
          data={filteredMunicipalities!}
          columns={municipalityColumns}
        />
      )}
    </div>
  );
}
