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


export const QRCodeGenerator = () => {

    const [isPending, startTransition] = useTransition();
    const [qrCode, setQrCode] = useState<String>("");
    const [isLoading, setIsLoading] = useState(false);
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

    const onSubmit = (values : z.infer<typeof QRCodeGeneratorSchema>) => {
        console.log(values);
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
                                    Générer le QR code
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
                <Card className="w-[400px] h-auto">
                    <CardHeader>Vos informations</CardHeader>
                    <CardContent>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quidem voluptatum voluptate incidunt facilis labore qui minima cum numquam, modi consequatur accusantium animi illum vero quae corrupti? Cum, velit quod!
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}