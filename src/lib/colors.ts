const colorMap: Record<string, { bg: string; border: string; label: string }> = {
  '#ea580c': { bg: '#fff7ed', border: '#fed7aa', label: 'Orange' },
  '#dc2626': { bg: '#fff5f5', border: '#fecaca', label: 'Qizil' },
  '#2563eb': { bg: '#eff6ff', border: '#bfdbfe', label: 'Ko\'k' },
  '#16a34a': { bg: '#f0fdf4', border: '#bbf7d0', label: 'Yashil' },
  '#7c3aed': { bg: '#f5f3ff', border: '#ddd6fe', label: 'Binafsha' },
  '#db2777': { bg: '#fdf2f8', border: '#fbcfe8', label: 'Pushti' },
  '#0891b2': { bg: '#ecfeff', border: '#a5f3fc', label: 'Moviy' },
  '#ca8a04': { bg: '#fefce8', border: '#fef08a', label: 'Sariq' },
};

export function getColorMeta(color: string) {
  return colorMap[color] || { bg: '#f9fafb', border: '#e5e7eb', label: color };
}

export const AVAILABLE_COLORS = Object.entries(colorMap).map(([value, meta]) => ({
  value,
  label: meta.label,
  bg: meta.bg,
}));
