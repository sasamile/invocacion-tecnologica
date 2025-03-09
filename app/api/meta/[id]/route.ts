import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Obtener sede por codeDane
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const municipalities = await db.municipalities.findUnique({
      where: { id: id },
    });

    if (!municipalities)
      return new NextResponse("municipalities no encontrada", { status: 404 });

    return NextResponse.json(municipalities);
  } catch (error) {
    console.error("[ERROR_GET_SEDE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Editar sede por codeDane
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const data = await req.json();

    const updatedSede = await db.municipalities.update({
      where: { id: id },
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
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    console.log("Codgigo:", id);

    if (!id) {
      return new NextResponse("ID no proporcionado", { status: 400 });
    }

    console.log("CODIGO:", id);

    await db.municipalities.delete({
      where: { id: id },
    });

    return new NextResponse("Sede eliminada correctamente.", { status: 200 });
  } catch (error) {
    console.error("[ERROR_DELETE_SEDE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
