import { type TPopupManager } from '../../types/canvas/Popup.manager'
import { type IPopup } from '../../interfaces/Popup.interface'

const PopupManager: TPopupManager  & IPopup = {
    isPopupOpen: false,
    popupWidth: 250,
    popupHeight: 250,
    popupX: 0,
    popupY: 0,
    learnMoreX: 0,
    learnMoreY: 0,

    handleClick(mouseX: number, mouseY: number, positionX: number, positionY: number, width:number, textInfo: string, linkInfo: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const buttonX = positionX + width - 60;
        const buttonY = positionY + 10;
        const buttonWidth = 50;
        const buttonHeight = 20;
        this.popupX = positionX + width + 40;
        this.popupY = positionY;
        this.learnMoreX = this.popupX + 10;
        this.learnMoreY = this.popupY + 240;

        if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            if (!this.isPopupOpen) {
                this.openPopup(context, positionX, positionY, width, textInfo);
                this.isPopupOpen = true;
            }
        } else if (mouseX >= this.learnMoreX && mouseX <= this.learnMoreX + context.measureText("Learn more").width && mouseY >= this.learnMoreY - 16 && mouseY <= this.learnMoreY) {
            this.handlePopupLink(mouseX, mouseY, linkInfo, context)
        } else {
            this.isPopupOpen = false;
        }
    },

    openPopup(context: CanvasRenderingContext2D, positionX: number, positionY: number, width: number, textInfo: string) {
        this.isPopupOpen = true;
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.strokeRect(this.popupX, positionY, this.popupWidth, this.popupHeight);
        context.fillRect(this.popupX, this.popupY, this.popupWidth, this.popupHeight);
        context.fillStyle = "black";

        const lines = textInfo.split("\n");

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], this.popupX + 10, this.popupY + 25 + i * 25);
        }

        context.font = "16px Arial";
        context.fillText("Learn more", this.learnMoreX, this.learnMoreY);

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(this.learnMoreX, this.learnMoreY + 3);
        context.lineTo(this.learnMoreX + context.measureText("Learn more").width, this.learnMoreY + 3);
        context.stroke();
    },

    handlePopupLink(mouseX: number, mouseY: number, linkInfo: string, context: CanvasRenderingContext2D) {
        if (mouseX >= this.learnMoreX && mouseX <= this.learnMoreX + context.measureText("Learn more").width &&
            mouseY >= this.learnMoreY - 16 && mouseY <= this.learnMoreY) {

            window.open(linkInfo, "_blank");
        }
    },
}

export default PopupManager;