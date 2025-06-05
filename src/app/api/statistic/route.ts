// src/app/api/statistik/route.ts
import { NextResponse } from 'next/server';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDqaxNwwZF5W5Oy2kw1CtQdnrDKlNJmImc",
  authDomain: "ppdb-project-b213e.firebaseapp.com",
  projectId: "ppdb-project-b213e",
  storageBucket: "ppdb-project-b213e.appspot.com",
  messagingSenderId: "562454569704",
  appId: "1:562454569704:web:3f457426b101d5fe36df5d"
};

// Inisialisasi Firebase hanya jika belum ada
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Fungsi GET untuk API /api/statistik
export async function GET() {
  try {
    const pendaftaranRef = collection(db, 'pendaftaran');
    const snapshot = await getDocs(pendaftaranRef);
    const data = snapshot.docs.map(doc => doc.data());

    const total = data.length;
    const berdasarkanJurusan: Record<string, number> = {};
    const berdasarkanJenisKelamin: Record<string, number> = {};

    data.forEach(item => {
      const siswa = item?.siswa;
      if (!siswa) return;

      const jurusan = siswa.jurusan;
      const gender = siswa.jenisKelamin;
      // console.log(data);

      if (jurusan) {
        berdasarkanJurusan[jurusan] = (berdasarkanJurusan[jurusan] || 0) + 1;
      }

      if (gender) {
        berdasarkanJenisKelamin[gender] = (berdasarkanJenisKelamin[gender] || 0) + 1;
      }
    });

    return NextResponse.json({
      total,
      berdasarkanJurusan,
      berdasarkanJenisKelamin,
      dataSiswa: data
    });


  } catch (error) {
    console.error('Error saat mengambil data statistik:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data statistik.' },
      { status: 500 }
    );
  }
}
