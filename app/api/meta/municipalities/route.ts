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



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { codeMunicipalities, name } = body;

    // Validar que se envíen los datos requeridos
    if (!codeMunicipalities || !name) {
      return new NextResponse("Faltan datos obligatorios", { status: 400 });
    }

    // Crear el municipio con el departamento por defecto (Meta)
    const newMunicipio = await db.municipalities.create({
      data: {
        codeMunicipalities,
        name,
        departmentId: "50", // Departamento del Meta
      },
    });

    return NextResponse.json(newMunicipio, { status: 201 });
  } catch (error) {
    console.error("[ERROR_CREAR_MUNICIPIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
