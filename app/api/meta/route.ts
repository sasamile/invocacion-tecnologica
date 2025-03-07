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