package com.rps.business;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

import com.rps.model.rps.type.MoveType;
import com.rps.repository.UsersRepository;
import com.rps.service.games.subservices.RPSRulesService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RPSRulesServiceTest {

    @Autowired
    private UsersRepository usersRepository;

    private RPSRulesService underTest = new RPSRulesService();

    @Test
    public void shouldReturnTieWhenBothMovesAreSame() throws Exception {
        assertThat(underTest.evaluateMove(MoveType.PAPER, MoveType.PAPER), is(MoveType.TIE));
    }

    @Test
    public void shouldReturnScissorWhenScissorsAndPaper() throws Exception {
        assertThat(underTest.evaluateMove(MoveType.PAPER, MoveType.SCISSORS), is(MoveType.SCISSORS));
    }

    @Test
    public void shouldReturnRockWhenScissorsAndRock() throws Exception {
        assertThat(underTest.evaluateMove(MoveType.ROCK, MoveType.SCISSORS), is(MoveType.ROCK));
    }

    @Test
    public void shouldReturnScissorWhenPaperAndRock() throws Exception {
        assertThat(underTest.evaluateMove(MoveType.ROCK, MoveType.SCISSORS), is(MoveType.ROCK));
    }

}