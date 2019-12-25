package com.rps.service.games;

import com.rps.service.games.subservices.RPSRulesService;
import com.rps.service.games.subservices.RpsComputerService;
import com.rps.service.games.subservices.RpsDriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacadeRpsService {
    private RpsDriverService rpsDriverService;
    private RPSRulesService rulesService;
    private RpsComputerService computerService;

    @Autowired
    public FacadeRpsService(RpsDriverService rpsDriverService, RPSRulesService rulesService, RpsComputerService computerService) {
        this.rpsDriverService = rpsDriverService;
        this.rulesService = rulesService;
        this.computerService = computerService;
    }

    public RpsDriverService getRpsDriverService() {
        return rpsDriverService;
    }

    public RPSRulesService getRulesService() {
        return rulesService;
    }

    public RpsComputerService getComputerService() {
        return computerService;
    }
}
