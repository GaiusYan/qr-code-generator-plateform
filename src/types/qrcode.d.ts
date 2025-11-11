declare module "qrcode" {
  export function toCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    callback?: (err?: Error) => void
  ): void;

  export function toDataURL(
    text: string,
    options?: any
  ): Promise<string>;
}
