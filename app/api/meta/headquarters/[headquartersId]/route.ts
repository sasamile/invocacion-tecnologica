import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Obtener sede por codeDane
export async function GET(
  req: Request,
  { params }: { params: { headquartersId: string } }
) {
  try {
    const { headquartersId } = params;
    const sede = await db.headquarters.findUnique({
      where: { codeDane: headquartersId },
      include: { Institutions: { include: { Municipalities: true } } },
    });

    if (!sede) return new NextResponse("Sede no encontrada", { status: 404 });

    return NextResponse.json(sede);
  } catch (error) {
    console.error("[ERROR_GET_SEDE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Editar sede por codeDane
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ headquartersId: string }> }
) {
  try {
    const resolvedParams = await params;
    const { headquartersId } = resolvedParams;
    const data = await req.json();

    const updatedSede = await db.headquarters.update({
      where: { codeDane: headquartersId },
      data,
    });

    return NextResponse.json(updatedSede);
  } catch (error) {
    console.error("[ERROR_EDIT_SEDE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Eliminar sede por codeDane
export async function DELETE(
  req: Request, { params }: { params: Promise<{ headquartersId: string }> }
) {
  try {
    const resolvedParams = await params;
    const { headquartersId } = resolvedParams;

    console.log("Codgigo:", headquartersId)

    if (!headquartersId) {
      return new NextResponse("ID no proporcionado", { status: 400 });
    }

    console.log("CODIGO:", headquartersId);

    await db.headquarters.delete({
      where: { codeDane: headquartersId },
    });

    return new NextResponse("Sede eliminada correctamente.", { status: 200 });
  } catch (error) {
    console.error("[ERROR_DELETE_SEDE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}