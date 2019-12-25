package com.rps.model.rps.type;

public enum MoveType {
    ROCK,
    PAPER,
    SCISSORS,
    TIE;


    public static MoveType parseShape(int move) {
        switch (move) {
            case 1:
                return ROCK;
            case 2:
                return PAPER;
            case 3:
                return SCISSORS;
            default:
                return TIE;
        }
    }
}
