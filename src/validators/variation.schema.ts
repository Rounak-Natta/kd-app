import { z } from "zod";

export const createVariationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0),

  isDefault: z.boolean().optional(),
});

export const updateVariationSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  isDefault: z.boolean().optional(),
});