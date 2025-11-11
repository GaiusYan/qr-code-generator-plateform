declare module "qrcode" {
  export function toCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    {errorCorrectionLevel, width, margin, color}: callbackInterface)
  : void;

  interface callbackInterface {
    errorCorrectionLevel: string,
    width: number,
    margin: number,
    color: {
      dark: string,
      light: string,
    },
  }

  export function toDataURL(
    text: string,
    options?: any
  ): Promise<string>;
}
