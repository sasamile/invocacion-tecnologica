import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Obtener todas las sedes de colegios en el departamento del Meta
export async function GET() {
  try {
    const sedes = await db.headquarters.findMany({
      where: {
        Institutions: {
          Municipalities: {
            Department: {
              codeDepartment: "50",
            },
          },
        },
      },
      include: {
        Institutions: {
          include: {
            Municipalities: true,
          },
        },
      },
    });

    const result = sedes.map((sede) => ({
      codeDane: sede.codeDane,
      name: sede.name,
      institucion: sede.Institutions.name,
      municipio: sede.Institutions.Municipalities.name,
      zona: sede.zona, 
      rector: sede.rector,
      state: sede.state, 
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ERROR_SEDES_META]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
