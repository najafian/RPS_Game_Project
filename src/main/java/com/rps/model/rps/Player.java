package com.rps.model.rps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rps.model.rps.type.MoveType;
import com.rps.model.rps.type.PlayerType;

import java.io.Serializable;

public class Player implements Serializable {
    private PlayerType playerType;
    private MoveType moveType;

    @JsonProperty("playerType")
    public PlayerType getPlayerType() {
        return playerType;
    }

    public void setPlayerType(PlayerType playerType) {
        this.playerType = playerType;
    }

    @JsonProperty("shapeType")
    public MoveType getMoveType() {
        return moveType;
    }

    public void setMoveType(MoveType moveType) {
        this.moveType = moveType;
    }
}
