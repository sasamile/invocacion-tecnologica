import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Obtener todos los colegios del departamento del Meta
export async function GET() {
  try {
    const instituciones = await db.institutions.findMany({
      where: {
        Municipalities: {
          Department: {
            codeDepartment: "50",
          },
        },
      },
      include: {
        Municipalities: true,
        headquarters: true,
      },
    });

    const result = instituciones.map((institucion) => ({
      codeDane: institucion.codeDane,
      name: institucion.name,
      municipio: institucion.Municipalities.name,
      totalSedes: institucion.headquarters.length,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ERROR_COLEGIOS_META]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
