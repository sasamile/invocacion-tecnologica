"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { Input } from "../ui/input";

interface CreateSchoolDialogProps {
  isDialogOpen: boolean,
  setIsDialogOpen: (open: boolean) => void
}

export function CreateSchoolDialog({ isDialogOpen, setIsDialogOpen }: CreateSchoolDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Colegio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Colegio</DialogTitle>
          <DialogDescription>
            Ingrese los datos del nuevo colegio. El código del departamento y
            municipio se generarán automáticamente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="municipio">Municipio</Label>
            {/* <Select
              onValueChange={(value) => {
                const municipio = municipios.find((m) => m.codigo === value);
                setNewColegio({
                  ...newColegio,
                  municipio: municipio ? municipio.nombre : "",
                });
              }}
            >
              <SelectTrigger id="municipio">
                <SelectValue placeholder="Seleccione un municipio" />
              </SelectTrigger>
              <SelectContent>
                {municipios.map((municipio) => (
                  <SelectItem key={municipio.codigo} value={municipio.codigo}>
                    {municipio.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="codigo">Código del Colegio</Label>
            {/* <div className="flex">
              <div className="flex h-10 w-[90px] items-center justify-center rounded-l-md border border-r-0 bg-muted text-sm">
                {getCodigoPrefix() || "Código"}
              </div>
              <Input
                id="codigo"
                className="rounded-l-none"
                placeholder="Código (3 dígitos)"
                value={newColegio.codigo}
                onChange={(e) =>
                  setNewColegio({ ...newColegio, codigo: e.target.value })
                }
                maxLength={3}
                disabled={!newColegio.municipio}
              />
            </div> */}
            {/* <p className="text-xs text-muted-foreground">
              Código final: {getCodigoPrefix()}
              {newColegio.codigo || "XXX"}
            </p> */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre del Colegio</Label>
            {/* <Input
              id="nombre"
              placeholder="Nombre"
              value={newColegio.nombre}
              onChange={(e) =>
                setNewColegio({ ...newColegio, nombre: e.target.value })
              }
            /> */}
          </div>
        </div>
        <DialogFooter>
          {/* <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button> */}
          {/* <Button onClick={handleAddColegio}>Guardar</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
