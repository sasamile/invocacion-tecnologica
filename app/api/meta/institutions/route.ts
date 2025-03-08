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
        Municipalities: {
          select: {
            name: true
          }
        },
        headquarters: true,
      },
    });

    const result = instituciones.map((institucion) => ({
      id: institucion.codeDane,
      code: institucion.codeDane,
      name: institucion.name,
      address: institucion.address,
      zona: institucion.zona,
      municipality: institucion.Municipalities.name,
      phone: institucion.phone,
      state: institucion.state,
      rector: institucion.rector,
      campuses: institucion.headquarters.length,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ERROR_COLEGIOS_META]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      codeDane,
      name,
      address,
      zona,
      phone,
      Guy,
      calendar,
      state,
      rector,
      municipalitiesId,
    } = body;


    if (
      !codeDane ||
      !name ||
      !address ||
      !zona ||
      !phone ||
      !Guy ||
      !calendar ||
      !state ||
      !rector ||
      !municipalitiesId
    ) {
      return new NextResponse("Faltan datos obligatorios", { status: 400 });
    }

    // Validar si el municipio pertenece al departamento del Meta
    const municipio = await db.municipalities.findUnique({
      where: { id: municipalitiesId },
      include: { Department: true },
    });

    if (!municipio || municipio.Department.codeDepartment !== "50") {
      return new NextResponse("El municipio no pertenece al Meta", {
        status: 400,
      });
    }

    const newInstitution = await db.institutions.create({
      data: {
        codeDane,
        name,
        address,
        zona,
        phone,
        Guy,
        calendar,
        state,
        rector,
        municipalitiesId,
      },
    });

    return NextResponse.json(newInstitution, { status: 201 });
  } catch (error) {
    console.error("[ERROR_CREAR_COLEGIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



