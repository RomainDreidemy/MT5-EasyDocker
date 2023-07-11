import {Placements} from "../../../../enums/placements";
import {TFactory} from "../../../../types/Factory";
import {IPosition} from "../../../../interfaces/Position.interface";

const PlacementConnector = (factory: TFactory, placement: Placements, offset: number = 0): IPosition => {
  const placements = {
    [Placements.TOP]: {
      x: factory.positionX + factory.width / 2,
      y: factory.positionY - offset,
      placement: Placements.TOP
    },
    [Placements.BOTTOM]: {
      x: factory.positionX + factory.width / 2,
      y: factory.positionY + factory.height + offset,
      placement: Placements.BOTTOM
    },
    [Placements.LEFT]: {
      x: factory.positionX - offset,
      y: factory.positionY + factory.height / 2,
      placement: Placements.LEFT
    },
    [Placements.RIGHT]: {
      x: factory.positionX + factory.width + offset,
      y: factory.positionY + factory.height / 2,
      placement: Placements.RIGHT
    }
  }
  return placements[placement]
}

export default PlacementConnector