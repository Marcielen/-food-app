export const ConstantRoutes = {
  LOGIN: "/",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PRODUCT: "/product",
  ORDERS: "/orders-registrations",
  ORDERS_PAD: "/orders-pad",
  PAY: "/pay/:id",
};

export const SubstituteRouteParameter = (
  route: string,
  paramName: string,
  value: string
) => {
  return route.replace(`:${paramName}`, value);
};
