package com.rps.model.rps;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class GameDto implements Serializable {

    private PlayerDto firstPlayer;
    private PlayerDto secondPlayer;

    @JsonProperty("firstPlayer")
    public PlayerDto getFirstPlayer() {
        return firstPlayer;
    }

    public void setFirstPlayer(PlayerDto firstPlayer) {
        this.firstPlayer = firstPlayer;
    }

    @JsonProperty("secondPlayer")
    public PlayerDto getSecondPlayer() {
        return secondPlayer;
    }

    public void setSecondPlayer(PlayerDto secondPlayer) {
        this.secondPlayer = secondPlayer;
    }

}
