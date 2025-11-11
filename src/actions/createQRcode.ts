"use server";

import { QRCodeGeneratorSchema } from "@/schemas/qr-code-generator";
import z from "zod";

export const createQRcode = async (values : z.infer<typeof QRCodeGeneratorSchema>) => {

    
}