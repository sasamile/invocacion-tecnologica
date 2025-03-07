import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Obtener la cantidad de colegios y sedes en cada municipio del departamento 50
export async function GET() {
  try {
    const municipalities = await db.municipalities.findMany({
      where: { departmentId: "50" },
      include: {
        institutions: {
          include: {
            headquarters: true,
          },
        },
      },
    });

    const result = municipalities.map((municipio) => ({
      id: municipio.id,
      codeMunicipalities: municipio.codeMunicipalities,
      name: municipio.name,
      totalInstituciones: municipio.institutions.length,
      totalSedes: municipio.institutions.reduce(
        (total, institucion) => total + institucion.headquarters.length,
        0
      ),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[META_CONTEO]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
