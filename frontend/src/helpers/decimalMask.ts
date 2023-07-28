export const DecimalMask = (valor: string | number): string => {
  const valorFormatado = Number(valor).toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `$${valorFormatado}`;
};
