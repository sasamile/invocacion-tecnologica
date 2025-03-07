"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, Plus, MapPin, School, FileText, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/common/heading";
import { CreateSchoolDialog } from "@/components/schools/create-school-dialog";

// Datos de ejemplo
const colegiosData = [
  {
    codigo: "50001001",
    nombre: "I.E. Narciso Matus Torres",
    municipio: "Villavicencio",
    sedes: 3,
  },
  {
    codigo: "50001002",
    nombre: "I.E. Francisco José de Caldas",
    municipio: "Villavicencio",
    sedes: 4,
  },
  {
    codigo: "50001003",
    nombre: "I.E. Colegio Departamental La Esperanza",
    municipio: "Villavicencio",
    sedes: 2,
  },
  {
    codigo: "50006001",
    nombre: "I.E. Normal Superior de Acacías",
    municipio: "Acacías",
    sedes: 3,
  },
  {
    codigo: "50006002",
    nombre: "I.E. Luis Carlos Galán Sarmiento",
    municipio: "Acacías",
    sedes: 2,
  },
  {
    codigo: "50110001",
    nombre: "I.E. José María Córdoba",
    municipio: "Barranca de Upía",
    sedes: 4,
  },
  {
    codigo: "50124001",
    nombre: "I.E. Técnico Agrícola",
    municipio: "Cabuyaro",
    sedes: 3,
  },
];

// Lista de municipios para el select
const municipios = [
  { codigo: "50001", nombre: "Villavicencio" },
  { codigo: "50006", nombre: "Acacías" },
  { codigo: "50110", nombre: "Barranca de Upía" },
  { codigo: "50124", nombre: "Cabuyaro" },
  { codigo: "50150", nombre: "Castilla la Nueva" },
  { codigo: "50223", nombre: "Cubarral" },
  { codigo: "50226", nombre: "Cumaral" },
];

export default function SchoolsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("all"); // Updated initial state
  const [newColegio, setNewColegio] = useState({
    municipio: "",
    codigo: "",
    nombre: "",
  });

  // Filtrar colegios por término de búsqueda y municipio seleccionado
  const filteredColegios = colegiosData.filter(
    (colegio) =>
      (colegio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colegio.codigo.includes(searchTerm)) &&
      (selectedMunicipio === "all" || colegio.municipio === selectedMunicipio) // Updated filter logic
  );

  const handleAddColegio = () => {
    // Aquí iría la lógica para agregar un nuevo colegio
    setIsDialogOpen(false);
    // Resetear el formulario
    setNewColegio({ municipio: "", codigo: "", nombre: "" });
  };

  // Generar el prefijo del código basado en el municipio seleccionado
  const getCodigoPrefix = () => {
    if (!newColegio.municipio) return "";
    const municipio = municipios.find((m) => m.nombre === newColegio.municipio);
    return municipio ? municipio.codigo : "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Colegios"
          description="Gestione los colegios del Departamento del Meta"
        />
        <CreateSchoolDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar colegios..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select
            value={selectedMunicipio}
            onValueChange={setSelectedMunicipio}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los municipios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los municipios</SelectItem>{" "}
              {/* Updated SelectItem value */}
              {municipios.map((municipio) => (
                <SelectItem key={municipio.codigo} value={municipio.codigo}>
                  {municipio.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Municipio</TableHead>
              <TableHead className="text-center">Sedes</TableHead>
              <TableHead className="w-[120px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColegios.map((colegio) => (
              <TableRow key={colegio.codigo}>
                <TableCell className="font-medium">{colegio.codigo}</TableCell>
                <TableCell>{colegio.nombre}</TableCell>
                <TableCell>{colegio.municipio}</TableCell>
                <TableCell className="text-center">{colegio.sedes}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Ver sedes">
                      <School className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Ver en mapa">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Reporte">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
