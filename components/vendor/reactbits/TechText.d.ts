import type { CSSProperties, ReactElement } from "react";

/**
 * Deklarasi tipe untuk TechText.jsx.
 *
 * Ada supaya sumber vendor-nya tidak perlu disentuh: di sana `style` tidak
 * punya nilai default, sehingga TypeScript menyimpulkannya sebagai prop wajib.
 * Di sini semua prop ditandai opsional sesuai dokumentasi React Bits.
 */
export interface TechTextProps {
  /** Wordmark yang digambar. */
  text?: string;
  /** Kosongkan untuk mewarisi font-family wadahnya. */
  fontFamily?: string;
  fontWeight?: number;
  /** Ukuran terbesar dalam px; mengecil sendiri agar muat di wadah sempit. */
  fontSize?: number;
  /** Jarak antar huruf, dalam em. */
  letterSpacing?: number;
  /** Warna huruf dan garis luarnya. */
  color?: string;
  /** Warna bingkai seleksi, konektor, dan label. */
  accentColor?: string;
  /** Radius di sekitar kursor tempat huruf berubah jadi garis, dalam px. */
  reach?: number;
  softness?: number;
  dashLength?: number;
  dashGap?: number;
  strokeWidth?: number;
  lineStyle?: "dashed" | "solid";
  reveal?: "area" | "letter" | "off";
  /** Kotak kecil yang berkedip di sekitar huruf aktif. 0 mematikannya. */
  specks?: number;
  selection?: boolean;
  labels?: boolean;
  draggable?: boolean;
  /** Sapuan otomatis saat kursor tidak ada. */
  sweep?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

declare function TechText(props: TechTextProps): ReactElement;

export default TechText;
