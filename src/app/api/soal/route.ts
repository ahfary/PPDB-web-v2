/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/soal/route.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqaxNwwZF5W5Oy2kw1CtQdnrDKlNJmImc",
  authDomain: "ppdb-project-b213e.firebaseapp.com",
  projectId: "ppdb-project-b213e",
  storageBucket: "ppdb-project-b213e.firebasestorage.app",
  messagingSenderId: "562454569704",
  appId: "1:562454569704:web:3f457426b101d5fe36df5d"
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const mapel = searchParams.get("mapel");
  const getid = searchParams.get("id");
  console.log(getid)

  try {
    const soalQuery = collection(db, "soal_test");
    let q: any = soalQuery;

    if (mapel) {
      // Mencari dokumen di mana field 'nama_pelajaran' sama dengan mapel
      q = query(soalQuery, where("nama_pelajaran", "==", getid));
    }

    const snapshot = await getDocs(q);
    const data= snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching soal:", error);
    return NextResponse.json({ error: "Failed to fetch soal" }, { status: 500 });
  }
}