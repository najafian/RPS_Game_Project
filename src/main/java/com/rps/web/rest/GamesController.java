package com.rps.web.rest;

import com.rps.model.rps.GameDto;
import com.rps.model.rps.Game;
import com.rps.security.UserNotActivatedException;
import com.rps.service.games.RpsGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games/")
public class GamesController {

    private RpsGameService gameService;

    @Autowired
    public GamesController(RpsGameService gameService) {
        this.gameService = gameService;
    }


    /**
     * @param game
     * @return  result of Rock-Paper-Scissors game
     * @Author Mehdi Najafian
     * @Date 24/12/2019
     */
    @PostMapping("rps-game")
    public GameDto registerPlayer(@RequestBody Game game) {
        return gameService.calculateRpsGame(game);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public UserNotActivatedException getException(Exception e) {
        return new UserNotActivatedException(e.getMessage());
    }
}
