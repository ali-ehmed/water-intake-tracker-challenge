import { z } from 'zod';

export const waterLogSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  intakeMl: z
    .number()
    .min(1, 'Intake must be at least 1ml')
    .max(10000, 'Intake cannot exceed 10,000ml'),
});

export type WaterLogFormData = z.infer<typeof waterLogSchema>; 