import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string(),
  description: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});