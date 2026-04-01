import { z } from "zod";

export const createAddonGroupSchema = z.object({
  name: z.string().min(1),
  isRequired: z.boolean().optional(),
  maxSelect: z.number().optional(),
});

export const createAddonSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
});

export const updateAddonSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
});