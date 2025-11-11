import { z } from 'zod';

export const QRCodeGeneratorSchema = z.object({
    name: z.string()
        .min(2, "Attention ce champ doit contenir au moins 2 caractères")
        .max(255, "Attention ce champ doit contenir moins de 255 caractères"),
    email: z.string().email("Attention ce champ doit être un email valide"),
    phone: z.string().min(5, "Attention ce champ doit contenir au moins 5 caractères"),
    compagny: z.string().min(2, "Attention ce champ doit contenir au moins 2 caractères")
        .max(255, "Attention ce champ doit contenir moins de 255 caractères"),
    website: z.string().min(5, "Attention ce champ doit contenir au moins 5 caractères"),
});