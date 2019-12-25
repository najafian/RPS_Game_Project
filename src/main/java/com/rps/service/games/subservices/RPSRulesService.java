package com.rps.service.games.subservices;

import com.rps.model.rps.type.MoveType;
import org.springframework.stereotype.Service;

@Service
public class RPSRulesService {

    private interface IMoveChecker {
        boolean apply();
    }

    public MoveType evaluateMove(MoveType moveType1, MoveType moveType2) {

        IMoveChecker whenScissorsIsWinner = () -> (isPaper(moveType1) && isScissors(moveType2)) || (isScissors(moveType1) && isPaper(moveType2));
        IMoveChecker whenRockIsWinner = () -> (isRock(moveType1) && isScissors(moveType2)) || (isScissors(moveType1) && isRock(moveType2));
        IMoveChecker whenPaperIsWinner = () -> (isRock(moveType1) && isPaper(moveType2)) || (isPaper(moveType1) && isRock(moveType2));

        if (whenScissorsIsWinner.apply()) {
            return MoveType.SCISSORS;
        } else if (whenRockIsWinner.apply()) {
            return MoveType.ROCK;
        } else if (whenPaperIsWinner.apply()) {
            return MoveType.PAPER;
        }
        return MoveType.TIE;
    }



    private boolean isRock(MoveType moveType) {
        return moveType == MoveType.ROCK;
    }

    private boolean isPaper(MoveType moveType) {
        return moveType == MoveType.PAPER;
    }

    private boolean isScissors(MoveType moveType) {
        return moveType == MoveType.SCISSORS;
    }

}
