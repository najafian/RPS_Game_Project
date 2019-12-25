package com.rps.model.rps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rps.model.rps.type.PlayerResultType;

public class PlayerDto extends Player {
    private PlayerResultType resultType;

    @JsonProperty("resultType")
    public PlayerResultType getResultType() {
        return resultType;
    }

    public void setResultType(PlayerResultType resultType) {
        this.resultType = resultType;
    }
}
