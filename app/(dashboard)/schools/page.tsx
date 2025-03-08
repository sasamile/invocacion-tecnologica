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
import { useEffect, useState } from "react";
import axios from "axios";
import { SchoolColumns } from "@/types";
import { schoolColumns } from "./_components/columns";
import { TableSkeleton } from "@/components/skeletons/table/table-skeleton";
import { schoolsSkeletonColumns } from "@/constants";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MunicipalityData {
  id: string;
  codeMunicipalities: string;
  name: string;
  totalInstituciones: number;
  totalSedes: number;
}

export default function SchoolsPage() {
  const [dataTable, setDataTable] = useState<SchoolColumns[]>([]);
  const [municipalities, setMunicipalities] = useState<MunicipalityData[]>([])

  useEffect(() => {
    const getSchoolsAndMunicipalities = async () => {
      const tableDataRes = await axios("http://localhost:3000/api/meta/institutions");
      const municipalityDataRes = await axios("http://localhost:3000/api/meta/municipalities");
      setDataTable(tableDataRes.data);
      setMunicipalities(municipalityDataRes.data)
    };
    getSchoolsAndMunicipalities();
  }, []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("all"); // Updated initial state

  // Filtrar colegios por término de búsqueda y municipio seleccionado
  const filteredColegios = dataTable.filter(
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
          <Select value={selectedMunicipio} onValueChange={setSelectedMunicipio}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Todos los municipios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los municipios</SelectItem> {/* Updated SelectItem value */}
              {municipalities.map((municipality) => (
                <SelectItem key={municipality.id} value={municipality.name}>
                  {municipality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {dataTable.length === 0 && <TableSkeleton inputPlaceholder="Buscar por código..." columns={schoolsSkeletonColumns} rowCount={10} />}
      {dataTable.length > 0 && (
        <SchoolsTable
          type="institute"
          data={filteredColegios}
          columns={schoolColumns}
        />
      )}
    </div>
  );
}
