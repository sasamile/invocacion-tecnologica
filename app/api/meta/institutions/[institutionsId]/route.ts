import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Obtener colegio por codeDane
export async function GET(req: Request, { params }: { params: { institutionsId: string } }) {
  try {
    const { institutionsId } = params;
    const colegio = await db.institutions.findUnique({
      where: { codeDane: institutionsId },
      include: { Municipalities: true, headquarters: true },
    });

    if (!colegio) return new NextResponse("Colegio no encontrado", { status: 404 });

    return NextResponse.json(colegio);
  } catch (error) {
    console.error("[ERROR_GET_COLEGIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Editar colegio por codeDane
export async function PATCH(req: Request, { params }: { params: { institutionsId: string } }) {
  try {
    const { institutionsId } = params;
    const data = await req.json();

    const updatedColegio = await db.institutions.update({
      where: { codeDane:institutionsId },
      data,
    });

    return NextResponse.json(updatedColegio);
  } catch (error) {
    console.error("[ERROR_EDIT_COLEGIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Eliminar colegio por codeDane
export async function DELETE(req: Request, { params }: { params: { institutionsId: string } }) {
  try {
    const { institutionsId } = params;

    await db.institutions.delete({
      where: { codeDane:institutionsId },
    });

    return new NextResponse("Colegio eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("[ERROR_DELETE_COLEGIO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
