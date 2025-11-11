import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter,
    CardHeader, 
    CardTitle }
from "@/components/ui/card";


export const QRCodeGenerator = () => {
    return (
        <div className="space-x-8">
            <div className="flex md:flex-row flex-col gap-2 items-center justify-center min-h-screen w-full">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className='text-[#7E69AB]'>Vos informations</CardTitle>
                        <CardDescription>
                            Remplissez vos détails pour générer le QR code
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter>
                        <Button>Générer</Button>
                    </CardFooter>
                </Card>
                <Card className="w-[350px]">
                    <CardHeader>Vos informations</CardHeader>
                    <CardContent>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quidem voluptatum voluptate incidunt facilis labore qui minima cum numquam, modi consequatur accusantium animi illum vero quae corrupti? Cum, velit quod!
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}