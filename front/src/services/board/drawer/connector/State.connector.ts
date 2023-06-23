import { type TStateConnector } from '../../../../types/board/drawer/connectors/State.connector'

const StateConnector: TStateConnector = {
  path: new Path2D(),

  color: 'blue',

  radius: 7,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  positionX: 0,
  positionY: 0
}

export default StateConnector
