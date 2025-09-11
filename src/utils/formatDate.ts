// utils/dateFormatter.ts
export const formatDateFR = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
