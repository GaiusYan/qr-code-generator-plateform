"use client";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter,
    CardHeader, 
    CardTitle }
from "@/components/ui/card";
import { QRCodeGeneratorSchema } from "@/schemas/qr-code-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { Form, FormMessage,} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import z from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { FaSpinner } from "react-icons/fa";
import QRCode from "qrcode"


export const QRCodeGenerator = () => {

    const [isPending, startTransition] = useTransition();
    const [qrCode, setQrCode] = useState<String>("");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const form = useForm<z.infer<typeof QRCodeGeneratorSchema>>({
        resolver: zodResolver(QRCodeGeneratorSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            compagny: "",
            website: "",
        },
    });


    const onSubmit =  (values : z.infer<typeof QRCodeGeneratorSchema>) => {
        startTransition(async () => {
            console.log(values);

            try {

                const vCard = [
                    "BEGIN:VCARD",
                    "VERSION:3.0",
                    `FN:${values.name || "Contact"}`,
                    ...(values.email ? [`EMAIL:${values.email}`] : []),
                    ...(values.phone ? [`TEL:${values.phone}`] : []),
                    ...(values.compagny ? [`ORG:${values.compagny}`] : []),
                    ...(values.website ? [`URL:${values.website}`] : []),
                    "END:VCARD",
                ].join("\n");
    
                if (canvasRef.current) {
                    await QRCode.toCanvas(canvasRef.current, vCard, {
                    errorCorrectionLevel: "H",
                    type: "image/png",
                    quality: 0.95,
                    margin: 1,
                    width: 300,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF",
                    },
                });
                // Convert to data URL for display
                const dataUrl = canvasRef.current.toDataURL("image/png")
                setQrCode(dataUrl);
                console.log(dataUrl);
            } 
        }catch(error) {
            console.log(error);
        }

        });
    }

    const downloadQRcode = () => {
        if (!qrCode) return;
        const link = document.createElement("a");
        link.href = qrCode as string;
        link.download = `qrcode-contact.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="space-x-8">
            <div className="flex md:flex-row flex-col gap-2 items-center justify-center min-h-screen w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className="w-[400px]">
                            <CardHeader>
                                <CardTitle className='text-[#7E69AB]'>Vos informations</CardTitle>
                                <CardDescription>
                                    Remplissez vos détails pour générer le QR code
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>Nom complet :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Yan-bena Gaïus Ocklefort" 
                                                    disabled={isPending}
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>Email :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="gaiusyanbena11@gmail.com"
                                                    disabled={isPending} 
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({field}) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>Numéro de téléphone :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="99 99 99 99" 
                                                    disabled={isPending} 
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="compagny"
                                    render={({field}) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>Entreprise :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nom de l'entreprise" 
                                                    disabled={isPending} 
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="website"
                                    render={({field}) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>Entreprise :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Site web" 
                                                    disabled={isPending} 
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    type="submit" 
                                    className="w-full font-semibold text-lg" 
                                    size={"icon-lg"}>
                                    {isPending ? 
                                        (<>
                                            <FaSpinner className="animate-spin"/> Génération
                                        </>) : 
                                        "Générer le QR code"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
                <Card className="w-[400px] h-auto">
                    <CardHeader>
                        <CardTitle className='text-[#7E69AB]'>Votre QR code</CardTitle>
                        <CardDescription>Scanner-le avec votre téléphone</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {qrCode ? 
                            <>
                                <div className="bg-white p-4 rounded-lg border-2 border-primary">
                                    <img 
                                        src={(qrCode || "/favicon.ico") as string} 
                                        alt="QR Code" 
                                        className="w-full h-auto" />
                                </div>

                                <div className="w-full space-y-3">
                                    <Button
                                        onClick={downloadQRcode}
                                        variant="outline"
                                        className="w-full border-2 font-semibold bg-transparent"
                                        size="lg"
                                    >
                                        Télécharger le QR Code
                                    </Button>
                                </div>
                            </>
                        :
                            <>
                                <div className="text-center space-y-4">
                                    <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground">
                                    <div className="text-center">
                                        <p className="text-muted-foreground font-semibold">Aucun QR Code</p>
                                        <p className="text-sm text-muted-foreground">Cliquez sur le bouton pour en générer un</p>
                                    </div>
                                    </div>
                                </div>
                            </>
                        }
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}