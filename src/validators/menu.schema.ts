import { z } from "zod";

export const createMenuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  categoryId: z.string(),

  basePrice: z.number().optional(),

  isVeg: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
});

export const updateMenuSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),

  basePrice: z.number().optional(),

  isVeg: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
});