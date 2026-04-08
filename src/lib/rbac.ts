export const ROLE_ROUTES = {
  ADMIN: "/admin",
  MANAGER: "/admin",
  STEWARD: "/waiter",
  CASHIER: "/pos",
};

export const ROLE_PERMISSIONS = {
  ADMIN: ["*"],

  MANAGER: [
    "menu.read",
    "menu.write",
    "orders.read",
  ],

  STEWARD: [
    "orders.create",
    "orders.read",
  ],

  CASHIER: [
    "billing.create",
    "billing.read",
  ],
};