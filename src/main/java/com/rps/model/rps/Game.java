package com.rps.model.rps;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Game implements Serializable {
    private Player firstPlayer;
    private Player secondPlayer;

    @JsonProperty("firstPlayer")
    public Player getFirstPlayer() {
        return firstPlayer;
    }

    public void setFirstPlayer(Player firstPlayer) {
        this.firstPlayer = firstPlayer;
    }

    @JsonProperty("secondPlayer")
    public Player getSecondPlayer() {
        return secondPlayer;
    }

    public void setSecondPlayer(Player secondPlayer) {
        this.secondPlayer = secondPlayer;
    }
}
