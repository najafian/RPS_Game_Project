package com.rps.service.games;

import com.rps.model.rps.Game;
import com.rps.model.rps.GameDto;
import com.rps.model.rps.Player;
import com.rps.model.rps.PlayerDto;
import com.rps.model.rps.type.PlayerResultType;
import com.rps.model.rps.type.PlayerType;
import com.rps.model.rps.type.MoveType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RpsGameService {

    private FacadeRpsService rpsService;

    @Autowired
    public RpsGameService(FacadeRpsService rpsService) {
        this.rpsService = rpsService;
    }

    public GameDto calculateRpsGame(Game game) {
        GameDto gameDto = new GameDto();
        Player firstPlayer = game.getFirstPlayer();
        Player secondPlayer = game.getSecondPlayer();

        PlayerDto firstPlayerDto = checkAndGetMoveType(firstPlayer);
        PlayerDto secondPlayerDto = checkAndGetMoveType(secondPlayer);
        MoveType resultMoveTypeType = rpsService.getRulesService().evaluateMove(firstPlayerDto.getMoveType(), secondPlayerDto.getMoveType());


        gameDto.setFirstPlayer(setPlayerDto(firstPlayerDto, resultMoveTypeType));
        gameDto.setSecondPlayer(setPlayerDto(secondPlayerDto, resultMoveTypeType));

        return gameDto;
    }

    private PlayerDto setPlayerDto(PlayerDto rpsPlayerDto, MoveType resultMoveTypeType) {
        PlayerResultType playerResultType = rpsService.getRpsDriverService().compareSelections(rpsPlayerDto.getMoveType(), resultMoveTypeType);
        rpsPlayerDto.setResultType(playerResultType);
        return rpsPlayerDto;
    }

    private PlayerDto checkAndGetMoveType(Player firstPlayer) {
        PlayerDto firstPlayerDto = new PlayerDto();
        PlayerType playerType = firstPlayer.getPlayerType();
        MoveType firstMoveTypeType = (playerType != null && playerType == PlayerType.COMPUTER) ?
                rpsService.getComputerService().generateCPUChoice() : firstPlayer.getMoveType();
        firstPlayerDto.setMoveType(firstMoveTypeType);
        firstPlayerDto.setPlayerType(playerType);
        return firstPlayerDto;
    }


}
