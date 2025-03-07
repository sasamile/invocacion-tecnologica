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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      codeDane,
      name,
      address,
      zona,
      phone,
      calendar,
      state,
      rector,
      institutionsId,
    } = body;

    // Validar que se envíen los datos requeridos
    if (
      !codeDane ||
      !name ||
      !address ||
      !zona ||
      !phone ||
      !calendar ||
      !state ||
      !rector ||
      !institutionsId
    ) {
      return new NextResponse("Faltan datos obligatorios", { status: 400 });
    }

    // Verificar si la institución existe y pertenece al departamento del Meta
    const institucion = await db.institutions.findUnique({
      where: { codeDane: institutionsId },
      include: {
        Municipalities: {
          include: {
            Department: true,
          },
        },
      },
    });

    if (!institucion) {
      return new NextResponse("La institución no existe", { status: 404 });
    }

    if (institucion.Municipalities.Department.codeDepartment !== "50") {
      return new NextResponse("La institución no pertenece al Meta", {
        status: 400,
      });
    }

    // Crear la sede en la base de datos
    const newSede = await db.headquarters.create({
      data: {
        codeDane,
        name,
        address,
        zona,
        phone,
        calendar,
        state,
        rector,
        institutionsId,
      },
    });

    return NextResponse.json(newSede, { status: 201 });
  } catch (error) {
    console.error("[ERROR_CREAR_SEDE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
