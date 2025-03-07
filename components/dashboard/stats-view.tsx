"use client";

import axios from "axios";
import { Building, School, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { StatsCard } from "./stats-card";
import { StatsCardSkeleton } from "../skeletons/dashboard/stats-card-skeleton";

interface DataProps {
  departamentoId: string;
  totalMunicipios: number;
  totalInstituciones: number;
  totalSedes: number;
}

export default function StatsView() {
  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios("http://localhost:3000/api/meta");
      setData(res.data);
    };
    getData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido al Sistema de Gestión de Instituciones Educativas del Meta.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!data && (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        )}
        {data && (
          <>
            <StatsCard
              title="Municipios"
              description="Municipios registrados en el sistema"
              value={data.totalMunicipios ?? 0}
              Icon={Building}
              backgroundColor="#7c41f5"
            />
            <StatsCard
              title="Colegios"
              description="Colegios registrados en el sistema"
              value={data.totalInstituciones ?? 0}
              Icon={School}
              backgroundColor="#e95342"
            />
            <StatsCard
              title="Sedes"
              description="Sedes educativas registradas"
              value={data.totalSedes ?? 0}
              Icon={MapPin}
              backgroundColor="#fab84a"
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribución de Instituciones</CardTitle>
            <CardDescription>
              Distribución de instituciones por municipio
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Visualización de gráfico</p>
              <p className="text-xs">(Gráfico de barras)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas actualizaciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Colegio nuevo agregado</p>
                  <p className="text-xs text-muted-foreground">
                    IE José María Córdoba - Villavicencio
                  </p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Sede modificada</p>
                  <p className="text-xs text-muted-foreground">
                    Sede Rural Los Alpes - IE Santa María
                  </p>
                  <p className="text-xs text-muted-foreground">Hace 1 día</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-sm font-medium">Municipio actualizado</p>
                  <p className="text-xs text-muted-foreground">
                    Puerto Gaitán - Información de contacto
                  </p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
