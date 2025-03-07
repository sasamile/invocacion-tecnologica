import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// Actualizar municipio por ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { codeMunicipalities, name } = await req.json();

    // Verificar si el municipio existe
    const municipio = await db.municipalities.findUnique({
      where: { id },
    });

    if (!municipio) {
      return new NextResponse("Municipio no encontrado", { status: 404 });
    }

    // Actualizar municipio
    const updatedMunicipio = await db.municipalities.update({
      where: { id },
      data: {
        codeMunicipalities,
        name,
      },
    });

    return NextResponse.json(updatedMunicipio);
  } catch (error) {
    console.error("[ERROR_UPDATE_MUNICIPIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Eliminar municipio por ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Verificar si el municipio existe
    const municipio = await db.municipalities.findUnique({
      where: { id },
    });

    if (!municipio) {
      return new NextResponse("Municipio no encontrado", { status: 404 });
    }

    // Eliminar municipio
    await db.municipalities.delete({
      where: { id },
    });

    return new NextResponse("Municipio eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("[ERROR_DELETE_MUNICIPIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
