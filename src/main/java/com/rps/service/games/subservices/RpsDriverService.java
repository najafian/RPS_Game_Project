package com.rps.service.games.subservices;

import com.rps.model.rps.type.PlayerResultType;
import com.rps.model.rps.type.MoveType;
import org.springframework.stereotype.Service;

@Service
public class RpsDriverService {

    private interface IResultChecker {
        PlayerResultType apply(MoveType moveType);
    }

    //This function contains the actual buisness logic
    //and help to decide who won
    public PlayerResultType compareSelections(MoveType firstPlayerShape, MoveType result) {
        IResultChecker resultChecker = move ->
                (firstPlayerShape == move ? PlayerResultType.WIN : PlayerResultType.LOSE);

        switch (result) {
            case ROCK:
                return resultChecker.apply(MoveType.ROCK);
            case PAPER:
                return resultChecker.apply(MoveType.PAPER);
            case SCISSORS:
                return resultChecker.apply(MoveType.SCISSORS);
            default:
                return PlayerResultType.TIE;
        }
    }
}
