import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// para las estadisticas del dashboard sale la cantidad de municipios, instituciones y sedes
export async function GET() {
  try {
    const meta = await db.municipalities.findMany({
      where: {
        departmentId: "50",
      },
      include: {
        institutions: {
          include: {
            headquarters: true,
          },
        },
      },
    });

    const totalMunicipios = meta.length;
    
    let totalInstituciones = 0;
    let totalSedes = 0;
    
    meta.forEach(municipio => {
      totalInstituciones += municipio.institutions.length;
      
      municipio.institutions.forEach(institucion => {
        totalSedes += institucion.headquarters.length;
      });
    });

    return NextResponse.json({
      departamentoId: "50",
      totalMunicipios,
      totalInstituciones,
      totalSedes
    });
    
  } catch (e) {
    console.log("[META_CONTEO]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


// Nuevo endpoint POST para crear un municipio
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica de los datos recibidos
    const { codeMunicipalities, name } = body;

    if (!codeMunicipalities || !name) {
      return new NextResponse(
        JSON.stringify({ error: "codeMunicipalities y name son requeridos" }),
        { status: 400 }
      );
    }

    // Crear el nuevo municipio
    const newMunicipality = await db.municipalities.create({
      data: {
        codeMunicipalities,
        name,
        departmentId: "50", // Asumimos que todos pertenecen al departamento 50
      },
    });

    return NextResponse.json(newMunicipality, { status: 201 });
  } catch (e) {
    console.log("[MUNICIPALITIES_POST]", e);
    return new NextResponse(
      JSON.stringify({ error: "Error creando el municipio" }),
      { status: 500 }
    );
  }
}