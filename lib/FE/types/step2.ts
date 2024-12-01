import { z } from "zod";
export const productSchemaStep2 = z.object({
  ProductId: z.string(),
  step: z.number().optional(),
  Colors: z
    .array(
      z.object({
        ColorId: z.string().default(""),
        ColorName: z.string().min(1, "Color name is required").optional(),
        ColorCode: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code")
          .optional(),
        Images: z.array(z.string().url("Invalid image URL")).optional(),
        Sizes: z.array(
          z
            .object({
              Size: z.string().min(1, "Size is required"),
              Stock: z.number().min(0, "Stock must be non-negative"),
              SizeId: z.string().default(""),
              isDeleted: z.boolean().optional(),
              PriceAdjustment: z
                .number()
                .min(0, "Price adjustment must be non-negative"),
            })
            .optional()
        ),
      })
    )
    .optional(),
});

export type ProductFormDataStep2 = z.infer<typeof productSchemaStep2>;
