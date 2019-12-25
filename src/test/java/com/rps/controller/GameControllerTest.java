package com.rps.controller;

import com.rps.model.rps.Game;
import com.rps.model.rps.Player;
import com.rps.model.rps.GameDto;
import com.rps.model.rps.type.MoveType;
import com.rps.model.rps.type.PlayerResultType;
import com.rps.model.rps.type.PlayerType;
import com.rps.model.user.UsersDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.ui.ModelMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GameControllerTest {

    private final static String AUTHENTICATE_URI = "/authenticate";
    private final static String RPS_GAME_URI = "/api/games/rps-game";

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void shouldReturnScissorsWinnerWhenPlayingBetweenPaperAndScissors() {
        Player player1 = getPlayer(PlayerType.HUMAN, MoveType.PAPER);
        Player player2 = getPlayer(PlayerType.HUMAN, MoveType.SCISSORS);
        Game Game = getGame(player1, player2);

        GameDto gameResult = getGameDtoFromRestController(Game);

        assertEquals(PlayerResultType.WIN, gameResult.getSecondPlayer().getResultType());
        assertEquals(PlayerResultType.LOSE, gameResult.getFirstPlayer().getResultType());
    }

    @Test
    public void shouldReturnRockWinnerWhenPlayingBetweenScissorsAndRock() {
        Player player1 = getPlayer(PlayerType.HUMAN, MoveType.PAPER);
        Player player2 = getPlayer(PlayerType.HUMAN, MoveType.ROCK);
        Game Game = getGame(player1, player2);

        GameDto gameResult = getGameDtoFromRestController(Game);

        assertEquals(PlayerResultType.LOSE, gameResult.getSecondPlayer().getResultType());
        assertEquals(PlayerResultType.WIN, gameResult.getFirstPlayer().getResultType());
    }

    @Test
    public void shouldReturnPaperWinnerWhenPlayingBetweenPaperAndRock() {
        Player player1 = getPlayer(PlayerType.HUMAN, MoveType.ROCK);
        Player player2 = getPlayer(PlayerType.HUMAN, MoveType.SCISSORS);
        Game Game = getGame(player1, player2);

        GameDto gameResult = getGameDtoFromRestController(Game);

        assertEquals(PlayerResultType.LOSE, gameResult.getSecondPlayer().getResultType());
        assertEquals(PlayerResultType.WIN, gameResult.getFirstPlayer().getResultType());
    }

    @Test
    public void shouldReturnResultWhenPlayingBetween2Computer() {
        Player player1 = getPlayer(PlayerType.COMPUTER, null);
        Player player2 = getPlayer(PlayerType.COMPUTER, null);
        Game Game = getGame(player1, player2);

        GameDto gameResult = getGameDtoFromRestController(Game);

        assertEquals(true, gameResult.getSecondPlayer().getResultType() != null);
        assertEquals(true, gameResult.getFirstPlayer().getResultType() != null);
    }

    private GameDto getGameDtoFromRestController(Game Game) {
        Object jwt_Token = getJwtTokenFromServerWithExistingUserInDatabase();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt_Token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> httpEntity = new HttpEntity<Object>(Game, headers);
        ResponseEntity<GameDto> response = this.restTemplate.exchange(
                RPS_GAME_URI, HttpMethod.POST, httpEntity, GameDto.class, Game);
        return response.getBody();
    }

    private Game getGame(Player firstPlayer, Player secondPlayer) {
        Game Game = new Game();
        Game.setFirstPlayer(firstPlayer);
        Game.setSecondPlayer(secondPlayer);
        return Game;
    }

    private Player getPlayer(PlayerType playerType, MoveType moveType) {
        Player Player = new Player();
        Player.setPlayerType(playerType);
        Player.setMoveType(moveType);
        return Player;
    }

    private String getJwtTokenFromServerWithExistingUserInDatabase() {
        UsersDto userDto = new UsersDto();
        userDto.setUsername("mehdi");
        userDto.setPassword("123456");
        ResponseEntity<ModelMap> modelMapResponseEntity = this.restTemplate.postForEntity(AUTHENTICATE_URI, userDto, ModelMap.class);
        return modelMapResponseEntity.getBody().get("id_token").toString();
    }
}
