import { z } from "zod";
export const productSchemaStep1 = z.object({
  Name: z.string().min(1, "Product name is required").optional(),
  Description: z.string().min(1, "Description is required").optional(),
  Base_price: z
    .number()
    .min(0.01, "Base price must be greater than 0")
    .optional(),
  Available: z.number().min(0, "Quantity must be non-negative").optional(),
  Tags: z.string().optional(),
  AverageRating: z.number().min(0).max(5).optional(),
  ProductId: z.string().optional().default(""),
  ProductType: z
    .string({
      required_error: "Please select a product Type",
      invalid_type_error: "product Type must be selected",
    })
    .optional()
    .default("SHIRTS_PANTS"),
  step: z.number().optional(),
  CategoryId: z
    .string({
      required_error: "Please select a category",
      invalid_type_error: "Category must be selected",
    })
    .min(1, "Please select a category"),

  // discount: z.number().min(0).max(100).optional(),
});

export type ProductFormDataStep1 = z.infer<typeof productSchemaStep1>;
