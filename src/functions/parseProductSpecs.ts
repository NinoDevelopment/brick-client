export type ProductSpec = {
  label: string;
  value: string;
};

const SPEC_LABELS = [
  "Формат",
  "Размер",
  "Вес",
  "Марка по прочности",
  "Плотность",
  "Морозостойкость",
  "Водопоглощение",
];

export const parseProductSpecs = (description?: string): ProductSpec[] => {
  if (!description) return [];

  return description
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const known = SPEC_LABELS.find((label) =>
        line.toLowerCase().startsWith(label.toLowerCase()),
      );

      if (known) {
        return { label: known, value: line.slice(known.length).trim() };
      }

      const splitAt = line.search(/\s(?=\d|от |не |F\d|М\d)/i);
      if (splitAt > 0) {
        return {
          label: line.slice(0, splitAt).trim(),
          value: line.slice(splitAt).trim(),
        };
      }

      return { label: "Характеристика", value: line };
    });
};
