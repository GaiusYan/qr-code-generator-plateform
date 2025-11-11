import { QRCodeGenerator } from "@/components/qr-code-generator";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="bg-sky-50 min-h-screen">
      <QRCodeGenerator/>
    </div>
  );
}
