export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  unitName?: string;
}

export type PaperThemeId = 'classic' | 'vintage' | 'pink_pos' | 'acid_neon' | 'obsidian';

export interface PaperTheme {
  id: PaperThemeId;
  name: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  paperTextureOverlay?: string;
  isVip: boolean;
  tagline: string;
}

export interface PresetCategory {
  id: string;
  icon: string;
  title: string;
  cashier: string;
  vibe: string;
  items: Omit<ReceiptItem, 'id'>[];
  defaultDelusionTax: number;
}

export interface ReceiptData {
  storeName: string;
  storeLocation: string;
  cashier: string;
  dateStr: string;
  timeStr: string;
  items: ReceiptItem[];
  delusionTaxPercent: number;
  overallVibe: string;
  authCode: string;
  cardNumber: string;
  showWatermark: boolean;
  themeId: PaperThemeId;
}
