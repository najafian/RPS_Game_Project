import {PlayerType} from "./type/playerType";
import {MoveType} from "./type/move-type";
import {PlayerResultType} from "./type/player-result-type";

export interface PlayerModel {
    playerType?: PlayerType;
    shapeType?: MoveType;
    resultType?: PlayerResultType;
}