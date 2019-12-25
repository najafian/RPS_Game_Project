import {MoveTypeClassname} from "../models/type/move-type-classname";

export const castMoveTypeToImageClass = (moveType: string) => {
    console.log(moveType);
    switch (moveType) {
        case 'PAPER':
            return MoveTypeClassname.PAPER;
        case 'ROCK':
            return MoveTypeClassname.ROCK;
        case 'SCISSORS':
            return MoveTypeClassname.SCISSORS;
        default:
            return MoveTypeClassname.QUESTION_MARK;
    }
};

