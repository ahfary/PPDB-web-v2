// File: pages/api/siswa/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/fiebaseAdmin";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string  }> }
) {
  try {
    const { id } = await params;

    if (!id || id === "[id]") {
      return NextResponse.json(
        { error: "Invalid or missing document ID" },
        { status: 400 }
      );
    }

    const pendaftaranRef = db.collection("pendaftaran").doc(id);
    const pendaftaranDoc = await pendaftaranRef.get();

    if (!pendaftaranDoc.exists) {
      return NextResponse.json(
        { error: "Registration document not found" },
        { status: 404 }
      );
    }

    const data = pendaftaranDoc.data();
    return NextResponse.json({ id, data });
  } catch (error) {
    console.error("GET error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string  }> }
) {
  try {
    const {  params}=  context;
    const { id: uid } =  await params;

    if (!uid || uid === "[id]") {
      return NextResponse.json(
        { error: "Invalid or missing UID" },
        { status: 400 }
      );
    }

    // Query ke Firestore untuk cari dokumen yang memiliki siswa.id == uid
    const snapshot = await db
      .collection("pendaftaran")
      .where("siswa.id", "==", uid)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "No matching registration document found" },
        { status: 404 }
      );
    }

    // Asumsikan hanya satu dokumen yang cocok
    const docRef = snapshot.docs[0].ref;
    await docRef.delete();

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // ambil ID dari URL

    if (!id || id === "[id]") {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Missing status field in request body" },
        { status: 400 }
      );
    }

    // Query berdasarkan siswa.id
    const snapshot = await db
      .collection("pendaftaran")
      .where("siswa.id", "==", id)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "No matching document found" },
        { status: 404 }
      );
    }

    const docRef = snapshot.docs[0].ref;
    await docRef.update({ "siswa.status": status });

    return NextResponse.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
