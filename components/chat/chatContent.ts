export const starterQuestions = [
  "Apa itu AFILABS?",
  "Layanan apa yang disediakan oleh AFILABS?",
  "Cara kerja AFILABS kaya gimana si?",
] as const;

type ServiceKey = "assist" | "creator" | "insight" | "flow";

export type ChatReply = {
  text: string;
  links?: { label: string; description: string; href: string }[];
  followUps: readonly string[];
};

const services = {
  assist: {
    label: "AfiAssist",
    description: "AI untuk percakapan pelanggan",
    href: "/services/afiassist",
  },
  creator: {
    label: "AfiCreator",
    description: "Ide, draft konten, dan brief kreator",
    href: "/services/aficreator",
  },
  flow: {
    label: "AfiFlow",
    description: "Workflow dan tugas operasional berulang",
    href: "/services/afiflow",
  },
  insight: {
    label: "AfiInsight",
    description: "Dashboard dan prioritas bisnis mingguan",
    href: "/services/afiinsight",
  },
} as const;

function serviceReply(key: ServiceKey, text: string): ChatReply {
  return {
    text,
    links: [services[key]],
    followUps: [starterQuestions[2], "Saya ingin diskusi dengan tim"],
  };
}

/** Prepared demo answers. No model, network request, or visitor data storage. */
export function getDemoReply(question: string): ChatReply {
  const value = question.toLowerCase();

  if (/harga|biaya|budget|tarif/.test(value)) {
    return {
      text: "Kebutuhan setiap bisnis berbeda. Demo ini belum memberikan estimasi harga. Tim Afilabs bisa membantu memetakan kebutuhan serta ruang lingkup proyek sebelum membahas biayanya.",
      followUps: ["Saya ingin diskusi dengan tim", starterQuestions[2]],
    };
  }
  if (/diskusi|hubungi|konsultasi|jadwal|audit/.test(value)) {
    return {
      text: "Kamu bisa mulai dengan menceritakan tantangan, tools yang dipakai, dan hasil yang ingin dicapai. Lanjutkan diskusinya bersama tim Afilabs melalui halaman kontak berikut.",
      links: [{ label: "Diskusi dengan tim", description: "Bicarakan kebutuhan bisnismu", href: "https://afilabs.id/contact" }],
      followUps: [starterQuestions[2]],
    };
  }
  if (/cara kerja|proses|implementasi/.test(value)) {
    return {
      text: "Kita mulai dari memahami tantangan dan proses bisnismu, lalu merancang solusi yang sesuai. Setelah dibangun, solusi diuji dan disempurnakan bersama tim. Lingkup serta waktu proyek ditentukan berdasarkan kebutuhanmu.",
      links: [{ label: "How We Work", description: "Kenali tahapan kerja bersama Afilabs", href: "/how-it-works" }],
      followUps: [starterQuestions[1], "Saya ingin diskusi dengan tim"],
    };
  }
  if (/cs|chat|pelanggan|customer|assist|whatsapp/.test(value)) {
    return serviceReply("assist", "AfiAssist bisa menjadi titik awal untuk mengeksplorasi pertanyaan pelanggan yang berulang. Tujuannya memberi tim lebih banyak ruang menangani percakapan yang membutuhkan perhatian manusia.");
  }
  if (/konten|kreator|creator|caption|brief/.test(value)) {
    return serviceReply("creator", "AfiCreator membantu mengeksplorasi ide dan draft konten berdasarkan produk, audiens, serta gaya brand. Tim tetap meninjau dan menyempurnakan hasil sebelum dipakai.");
  }
  if (/insight|intelligence|dashboard|analytics|analitik|laporan|data bisnis|analisis data/.test(value)) {
    return serviceReply("insight", "AfiInsight membantu melihat data bisnis dalam satu konteks dan mengeksplorasi prioritas berikutnya. Coba contoh dashboard dan laporan mingguan di halaman layanannya.");
  }
  if (/manual|berulang|operasional|workflow|flow|otomatis/.test(value)) {
    return serviceReply("flow", "AfiFlow menjadi awal untuk memetakan pekerjaan yang berulang, menilai langkah yang layak diotomatisasi, dan menyesuaikannya dengan tools serta proses tim.");
  }
  if (/layanan|pilih solusi|solusi ai/.test(value)) {
    return {
      text: "Eksplorasi percakapan pelanggan dengan AfiAssist, produksi konten dengan AfiCreator, pandangan data bisnis dengan AfiInsight, dan pekerjaan operasional berulang dengan AfiFlow. Bagian mana yang paling menyita waktu timmu?",
      links: Object.values(services),
      followUps: ["Chat pelanggan saya menumpuk", "Saya butuh ide konten", "Saya ingin lihat dashboard bisnis", "Banyak tugas manual"],
    };
  }
  if (/afilabs|apa itu/.test(value)) {
    return {
      text: "Afilabs adalah AI Growth Partner untuk brand D2C Indonesia. Afilabs membantu mengeksplorasi penerapan AI dalam percakapan pelanggan, pembuatan konten, hingga alur operasional, dimulai dari memahami tantangan nyata timmu.",
      followUps: [starterQuestions[1], starterQuestions[2]],
    };
  }
  return {
    text: "Ini demo percakapan dengan jawaban contoh. Coba tanyakan tentang Afilabs, layanannya, atau cara kerjanya. Untuk kebutuhan yang lebih spesifik, kamu bisa berdiskusi langsung dengan tim.",
    followUps: starterQuestions,
  };
}
