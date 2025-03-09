"use client";

import { Building, School, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsCard } from "./stats-card";
import { StatsCardSkeleton } from "../skeletons/dashboard/stats-card-skeleton";
import { useStats } from "@/hooks/use-stats";
import { InstitutionsDistributionChart } from "../common/institutions-distribution-chart";

export default function StatsView() {
  const { data } = useStats();

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

      <div className="grid gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribución de Instituciones</CardTitle>
            <CardDescription>
              Distribución de instituciones por municipio
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center pt-12">
            <InstitutionsDistributionChart />
          </CardContent>
        </Card>
   
      </div>
    </div>
  );
}
