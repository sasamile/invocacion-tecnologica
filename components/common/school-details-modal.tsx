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
      className="max-h-[90vh] w-full max-w-[1600px] overflow-y-auto p-10" // Aumentamos el ancho a 1600px
    >
      {isOpen && (
        <div className="space-y-12">
          {/* Información del colegio */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
              Información del Colegio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 bg-gray-50 p-8 rounded-xl shadow-md">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                Sedes ({data.headquarters.length})
              </h2>
              <div className="rounded-xl shadow-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-semibold text-gray-700 py-3 px-6">
                        Código DANE
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 py-3 px-6">
                        Nombre
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 py-3 px-6">
                        Dirección
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 py-3 px-6">
                        Zona
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 py-3 px-6">
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
                        <TableCell className="py-3 px-6">
                          {headquarter.codeDane}
                        </TableCell>
                        <TableCell className="py-3 px-6">
                          {headquarter.name}
                        </TableCell>
                        <TableCell className="py-3 px-6">
                          {headquarter.address}
                        </TableCell>
                        <TableCell className="py-3 px-6">
                          {headquarter.zona}
                        </TableCell>
                        <TableCell className="py-3 px-6">
                          {headquarter.state}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          )}
        </div>
      )}
    </Modal>
  );
}
