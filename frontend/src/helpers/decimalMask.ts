export const DecimalMask = (value: string | number): string => {
  const valorFormatado = Number(value).toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `$${valorFormatado}`;
};

export const MoneyMask = (value: string | number): string => {
  return `$${value}`;
};
