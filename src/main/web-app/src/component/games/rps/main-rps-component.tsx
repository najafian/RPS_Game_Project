import React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Col, Row} from 'react-bootstrap';
import {IRootState} from "../../../shared/reducer";
import PlayerComponent from "./modules/player-component";
import {PlayerService} from "./service/player-service";
import {MoveTypeClassname} from "./models/type/move-type-classname";

import './contents/styles/rps-game-page.css';
import {calculatedRpsGameResult} from "./reducer/rps-reducer";
import {PlayerType} from "./models/type/playerType";
import {GameModel} from "./models/game-model";
import {MoveType} from "./models/type/move-type";
import {PlayerModel} from "./models/player-model";
import {castMoveTypeToImageClass} from "./service/convert-service";
import {restIfNotAthenticated} from "./service/restart-service";
import {IWidgetOps} from "../../../shared/widgets/common/common";
import {CustomWidgetButton} from "../../../shared/widgets/button/CustomWidgetButton";
import {CustomWidgetButtonElement} from "../../../shared/widgets/button/CustomWidgetButtonElement";

interface IProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

class MainRpsComponent extends React.Component<IProps> {
    private firstPlayer: PlayerService = {};
    private secondPlayer: PlayerService = {};

    private iButtonPlayGame: IWidgetOps<CustomWidgetButton> = {};
    private iButtonBackToMain: IWidgetOps<CustomWidgetButton> = {};

    private iButtonRockChoice: IWidgetOps<CustomWidgetButton> = {};
    private iButtonPaperChoice: IWidgetOps<CustomWidgetButton> = {};
    private iButtonScissorsChoice: IWidgetOps<CustomWidgetButton> = {};
    firstMoveType: MoveType;
    secondMoveType: MoveType;

    private isHumanOnLeft: boolean;

    constructor(props: any) {
        super(props);
        restIfNotAthenticated(props);
    }


    componentDidMount(): void {
        this.setPlayerValues();
        this.initializeButtons();
    }

    private setPlayerValues() {
        const state = this.props.location.state;
        const setPlayerName = (playerAction: PlayerService, playerName: string, isFirst: boolean) => {
            const isHuman = playerName === PlayerType.HUMAN;
            playerName = isHuman ? this.props.authenticationState.account as string : playerName;
            const setInnerPlayerName = (name: string) => {
                if (isFirst)
                    this.isHumanOnLeft = isHuman;

                playerAction.setPlayerName(name);
                playerAction.setPlayerResult(0);
            };
            setInnerPlayerName(playerName);
        };
        setPlayerName(this.firstPlayer, state.firstPlayer, true);
        setPlayerName(this.secondPlayer, state.secondPlayer, false);
    }

    private initializeButtons() {
        const state = this.props.location.state;
        this.initializeRPSButtons(state);
        const playBtn = this.iButtonPlayGame.getWidget();
        const backBtn = this.iButtonBackToMain.getWidget();
        backBtn.setLabel('Back');
        backBtn.onClick(() => this.props.history.push('/initialize-rps-config'));
        playBtn.setLabel('Start');
        playBtn.onClick(() => {
            const isInvalidToSelect =
                (state.firstPlayer === PlayerType.HUMAN &&
                    this.firstMoveType === undefined) ||
                (state.secondPlayer === PlayerType.HUMAN &&
                    this.secondMoveType === undefined);

            if (!isInvalidToSelect) {
                const firstPlayer: PlayerModel = {};
                const secondPlayer: PlayerModel = {};
                const checkAndSetMoveType = (player: PlayerModel, moveType: MoveType, playerType: PlayerType) => {
                    player.playerType = playerType;
                    if (moveType !== undefined) {
                        player.shapeType = moveType;
                    }
                };
                checkAndSetMoveType(secondPlayer, this.secondMoveType, state.secondPlayer);
                checkAndSetMoveType(firstPlayer, this.firstMoveType, state.firstPlayer);
                const data: GameModel = {
                    firstPlayer: firstPlayer,
                    secondPlayer: secondPlayer
                };
                this.props.calculatedRpsGameResult(data);
            } else {
                this.props.mainOperations.toastAction.showToast("please select a move!");
            }
            this.iButtonPlayGame.getWidget().setDisability(true);
        });
    }

    initializeRPSButtons(state: any) {
        const isInvalidToSelect = (state.firstPlayer === PlayerType.COMPUTER &&
            state.secondPlayer === PlayerType.COMPUTER);
        const fillRPSButtons = (rpsBtn: CustomWidgetButton, moveType: MoveType, className: MoveTypeClassname) => {
            rpsBtn.setLabel('<div style="width:30px;height:30px;" class="' + className + '"/>');
            rpsBtn.setDisability(isInvalidToSelect);
            rpsBtn.onClick(() => {
                if (this.isHumanOnLeft) {
                    this.firstMoveType = moveType;
                    this.firstPlayer.setPlayerClassIcon(className);
                } else {
                    this.secondMoveType = moveType;
                    this.secondPlayer.setPlayerClassIcon(className);
                }
                console.log(this.firstMoveType, this.secondMoveType);
            });
        };

        fillRPSButtons(this.iButtonScissorsChoice.getWidget(), MoveType.SCISSORS, MoveTypeClassname.SCISSORS);
        fillRPSButtons(this.iButtonRockChoice.getWidget(), MoveType.ROCK, MoveTypeClassname.ROCK);
        fillRPSButtons(this.iButtonPaperChoice.getWidget(), MoveType.PAPER, MoveTypeClassname.PAPER);
    }


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const rpsGame = this.props.rpsGameReducer.rpsGameReducer;
        if (rpsGame !== prevProps.rpsGameReducer.rpsGameReducer) {
            this.firstPlayer.setPlayerResult(rpsGame.firstPlayer.resultType);
            this.secondPlayer.setPlayerResult(rpsGame.secondPlayer.resultType);
            this.firstPlayer.setPlayerClassIcon(castMoveTypeToImageClass(rpsGame.firstPlayer.shapeType.toString()));
            this.secondPlayer.setPlayerClassIcon(castMoveTypeToImageClass(rpsGame.secondPlayer.shapeType.toString()));
            this.iButtonPlayGame.getWidget().setDisability(false);
            this.props.mainOperations.toastAction.showToast('<div>Player 1 ' + rpsGame.firstPlayer.resultType
                + '</div><div>Player 2 ' + rpsGame.secondPlayer.resultType + '</div>');
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (<div className="login-page-form" style={{height: '350px', width: '450px'}}>
            <Row>
                <Col md={5}>
                    <label className="rps-game-player-label">
                        Player 1:
                    </label>
                    <PlayerComponent operation={this.firstPlayer}/>
                </Col>
                <Col md={2}>
                    <div style={{display: 'table', width: '100%', height: '100%'}}>
                        <div style={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center'}}>VS</div>
                    </div>
                </Col>
                <Col md={5}>
                    <label className="rps-game-player-label">
                        Player 2:
                    </label>
                    <PlayerComponent operation={this.secondPlayer}/>
                </Col>
            </Row>
            <hr/>
            <div className="rps-choice-button-class">
                <div className='row'>
                    <Col md={4}><CustomWidgetButtonElement width={'40px'} widgetProp={this.iButtonRockChoice}/> </Col>
                    <Col md={4}><CustomWidgetButtonElement width={'40px'} widgetProp={this.iButtonPaperChoice}/> </Col>
                    <Col md={4}><CustomWidgetButtonElement width={'40px'} widgetProp={this.iButtonScissorsChoice}/>
                    </Col>
                </div>
            </div>
            <div style={{width: '150px', margin: '0 auto'}}>
                <Row>
                    <Col md={6}><CustomWidgetButtonElement widgetProp={this.iButtonPlayGame}/></Col>
                    <Col md={6}><CustomWidgetButtonElement widgetProp={this.iButtonBackToMain}/></Col>
                </Row>
            </div>
        </div>);
    }
}

const mapStateToProps = ({mainOperations, rpsGameReducer, authenticationState}: IRootState) => ({
    authenticationState,
    rpsGameReducer,
    mainOperations
});

const mapDispatchToProps = {
    calculatedRpsGameResult
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainRpsComponent);