// components/common/school-details-modal.tsx
"use client";

import { Modal } from "@/components/common/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SchoolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    codeDane: string;
    name: string;
    address: string;
    zona: string;
    phone: string;
    Guy: string;
    calendar: string;
    state: string;
    rector: string;
    municipalitiesId: string;
    Municipalities: { codeMunicipalities: string; name: string };
    headquarters: Array<{
      codeDane: string;
      name: string;
      address: string;
      zona: string;
      phone: string;
      calendar: string;
      state: string;
      rector: string;
    }>;
  } | null;
}

export function SchoolDetailsModal({
  isOpen,
  onClose,
  data,
}: SchoolDetailsModalProps) {
  if (!data) return null;

  return (
    <Modal
      title={`Detalles de ${data.name}`}
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[90vh] w-[70%] mx-auto p-6" // Ajustado al 70% del ancho y centrado
    >
      {isOpen && (
        <div className="space-y-8">
          {/* Información del colegio */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Información del Colegio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Código DANE
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.codeDane}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Nombre
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.name}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Dirección
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.address}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Zona
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.zona}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Teléfono
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.phone}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Tipo
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.Guy}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Calendario
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.calendar}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Estado
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.state}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Rector
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.rector}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  Municipio
                </h3>
                <p className="text-base text-gray-900 break-words">
                  {data.Municipalities.name} (Código:{" "}
                  {data.Municipalities.codeMunicipalities})
                </p>
              </div>
            </div>
          </section>

          {/* Lista de sedes */}
          {data.headquarters && data.headquarters.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Sedes ({data.headquarters.length})
              </h2>
              <div className="rounded-xl shadow-md border">
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="whitespace-nowrap font-semibold text-gray-700">
                          Código DANE
                        </TableHead>
                        <TableHead className="whitespace-nowrap font-semibold text-gray-700">
                          Nombre
                        </TableHead>
                        <TableHead className="whitespace-nowrap font-semibold text-gray-700">
                          Dirección
                        </TableHead>
                        <TableHead className="whitespace-nowrap font-semibold text-gray-700">
                          Zona
                        </TableHead>
                        <TableHead className="whitespace-nowrap font-semibold text-gray-700">
                          Estado
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.headquarters.map((headquarter) => (
                        <TableRow
                          key={headquarter.codeDane}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="whitespace-nowrap">
                            {headquarter.codeDane}
                          </TableCell>
                          <TableCell>
                            {headquarter.name}
                          </TableCell>
                          <TableCell>
                            {headquarter.address}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {headquarter.zona}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {headquarter.state}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </Modal>
  );
}