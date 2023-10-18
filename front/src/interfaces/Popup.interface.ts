export interface IPopup {
    handleClick(mouseX: number, mouseY: number, positionX: number, positionY: number, width: number, textInfo: string, linkInfo: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
    openPopup(context: CanvasRenderingContext2D, positionX: number, positionY: number, width: number, textInfo: string): void;
    handlePopupLink(mouseX: number, mouseY: number, linkInfo: string, context: CanvasRenderingContext2D) : void;
}