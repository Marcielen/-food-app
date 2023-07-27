export type FieldName = `amount-${string}`;
export interface FormData {
  order_id: { label: string; value: string } | null;
  search?: string;
  [key: string]: any;
}

export const formDefaultValues = {
  order_id: null,
};

export type OrdersProps = {
  active: boolean;
  id: string;
  order: string;
};

export type UpdateDataProps = {
  id: string;
  order_pad_id: string;
  label: string;
};

export type OrdersPadProps = {
  order_id: string;
  id: string;
  label: string;
};

export type ListProductsProps = {
  product_id: string | null;
  amount: number;
  order_pad_id?: string;
  id?: string;
};

export const formDefaultProduct = [
  {
    product_id: "0",
    amount: 0,
  },
];
