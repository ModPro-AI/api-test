export const formatName = (name: string) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const formatId = (id: number) => `#${String(id).padStart(4, "0")}`;
