package com.rps.service.games.subservices;

import com.rps.model.rps.type.MoveType;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
//This class will represent the computer who is playing with the user.
public class RpsComputerService {
    // This function helps the computer do the selection among ROCK,
    // PAPER,SCISSORS
    // we have used Random class from java.util.
    public MoveType generateCPUChoice() {
        int randomChoice = ThreadLocalRandom.current().nextInt(1, 4);
        return MoveType.parseShape(randomChoice);
    }
}
