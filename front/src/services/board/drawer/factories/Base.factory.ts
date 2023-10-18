import { type TBaseFactory } from '../../../../types/board/drawer/factories/Base.factory'
import StateFactory from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import CommonBases from '../Common.bases'
import TextPipe from '../../../../pipes/Text.pipe'
import { type TDrawer } from '../../../../types/Drawer'
import PopupManager from '../../../canvas/Popup.manager';

const BaseFactory: TBaseFactory = {
    ...CommonBases,
    ...StateFactory,

    create (drawer: TDrawer): void {
        this.drawer = drawer
        this.positionX = isNaN(drawer.entity!.positionX) ? this.positionX : drawer.entity!.positionX
        this.positionY = isNaN(drawer.entity!.positionY) ? this.positionY : drawer.entity!.positionY
    },

    isSelected ({ x, y }: IPosition): boolean {
        return this.drawer!.context!.isPointInPath(this.path, x, y)
    },

    updatePosition (position: IPosition): void {
        this.positionX = position.x
        this.positionY = position.y
    },

    position (withOffset: number = 0): IPosition {
        return {
            x: this.positionX - withOffset, y: this.positionY - withOffset
        }
    },

    draw (): void {
        const context = this.drawer!.context!

        const rectangle = new Path2D()

        if (this.beforeDraw != null) this.beforeDraw()

        context.beginPath()
        context.lineWidth = 5
        rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])
        context.stroke()

        context.strokeStyle = this.borderColor
        context.fillStyle = this.backgroundColor
        context.beginPath()
        context.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

        if (this.selected) {
            context.strokeStyle = this.selectedColor
        } else if (this.onHover) {
            context.strokeStyle = this.onHoverColor
        }

        context.stroke(rectangle)
        context.fill()
        context.closePath()

        const marginX: number = this.positionX + this.marginText

        const canvas = document.querySelector("canvas") as HTMLCanvasElement;

        const buttonX = this.positionX + this.width - 60;
        const buttonY = this.positionY + 10;
        const buttonWidth = 50;
        const buttonHeight = 20;
        const buttonRadius = 5;

        context.fillStyle = "white";
        context.beginPath();
        context.moveTo(buttonX, buttonY + buttonRadius);
        context.lineTo(buttonX, buttonY + buttonHeight - buttonRadius);
        context.quadraticCurveTo(buttonX, buttonY + buttonHeight, buttonX + buttonRadius, buttonY + buttonHeight);
        context.lineTo(buttonX + buttonWidth - buttonRadius, buttonY + buttonHeight);
        context.quadraticCurveTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX + buttonWidth, buttonY + buttonHeight - buttonRadius);
        context.lineTo(buttonX + buttonWidth, buttonY + buttonRadius);
        context.quadraticCurveTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth - buttonRadius, buttonY);
        context.lineTo(buttonX + buttonRadius, buttonY);
        context.quadraticCurveTo(buttonX, buttonY, buttonX, buttonY + buttonRadius);
        context.fill();

        context.font = "16px Arial";
        context.fillStyle = "black";
        context.fillText("Info", buttonX + 10, buttonY + 15);

        let textInfo = '';
        let linkInfo = '';

        if (this.backgroundColor == "#304570") {
            textInfo = 'A Docker network\nis an essential\ncomponent of the\nDocker ecosystem\nthat manages\ncontainer connectivity.'
            linkInfo = 'https://docs.docker.com/network/';
        } else if (this.backgroundColor == "#1f2937") {
            textInfo = 'A Docker service\nis a software unit\nfor deploying, managing,\nand scaling containers,\nsimplifying the\nmanagement of\napplications in distributed\nenvironments.'
            linkInfo = 'https://docs.docker.com/engine/swarm/how-swarm-mode-works/services/';
        } else {
            textInfo = 'A Docker volume\nis a storage mechanism\nthat enables Docker\ncontainers to access\npersistent and shared\ndata.'
            linkInfo = 'https://docs.docker.com/storage/volumes/';
        }

        canvas.addEventListener("click", (event) => {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left
            const mouseY = event.clientY - canvas.getBoundingClientRect().top

            PopupManager.handleClick(mouseX, mouseY, this.positionX, this.positionY, this.width, textInfo, linkInfo, context, canvas);
        });

        context.fillStyle = this.titleColor
        context.font = 'bold 20px Arial'
        context.fillText(TextPipe.capitalizeFirstLetter(this.drawer!.entity!.name), marginX, this.positionY + 80)

        context.fillStyle = this.textColor
        context.font = '20px Arial'
        context.fillText(TextPipe.capitalizeFirstLetter(this.type!), marginX, this.positionY + 45)

        if (this.afterDraw != null) this.afterDraw()

        this.path = rectangle
    }
}

export default BaseFactory
