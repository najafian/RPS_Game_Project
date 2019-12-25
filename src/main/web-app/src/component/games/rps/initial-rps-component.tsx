import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {IRootState} from "../../../shared/reducer";
import {PlayerType} from "./models/type/playerType";
import {restIfNotAthenticated} from "./service/restart-service";
import {IWidgetOps} from "../../../shared/widgets/common/common";
import {CustomWidgetButton} from "../../../shared/widgets/button/CustomWidgetButton";
import {CustomWidgetDropDown} from "../../../shared/widgets/dropDownBox/CustomWidgetDropDown";
import {CustomWidgetDropDownElement} from "../../../shared/widgets/dropDownBox/CustomWidgetDropDownElement";
import {CustomWidgetButtonElement} from "../../../shared/widgets/button/CustomWidgetButtonElement";


interface ICardInstituteProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

class InitialRpsComponent extends React.Component<ICardInstituteProps> {
    private iButtonSubmit: IWidgetOps<CustomWidgetButton> = {};
    private iComboFirstPlayer: IWidgetOps<CustomWidgetDropDown> = {};
    private iComboSecondPlayer: IWidgetOps<CustomWidgetDropDown> = {};

    constructor(props: any) {
        super(props);
        restIfNotAthenticated(props);
    }

    componentDidMount(): void {
        this.initializeDropDowns();
        this.initializeStartGameBtn();
    }

    private initializeDropDowns() {
        const setDropDownProps = (dropDownWidget: CustomWidgetDropDown, label: string) => {
            dropDownWidget.setFloatLabelType("Auto");
            dropDownWidget.setLabel(label);
            dropDownWidget.setDataSource([{text: PlayerType.HUMAN, value: 0}, {text: PlayerType.COMPUTER, value: 1}]);
        };

        const firstComboWidget = this.iComboFirstPlayer.getWidget();
        setDropDownProps(firstComboWidget, 'Left player');

        const secondComboWidget = this.iComboSecondPlayer.getWidget();
        setDropDownProps(secondComboWidget, 'Right player');
    }

    private initializeStartGameBtn() {
        const submitButton = this.iButtonSubmit.getWidget();
        submitButton.setLabel('Submit & Play');
        submitButton.onClick(() => {
            const firstValue = this.iComboFirstPlayer.getWidget().getValue().toString();
            const secondValue = this.iComboSecondPlayer.getWidget().getValue().toString();
            if (checkValidity(firstValue,secondValue)) {
                this.props.mainOperations.toastAction.showToast('Please select the Correct Option!');
            } else {
                this.props.history.push('/main-rps-game', {firstPlayer: firstValue, secondPlayer: secondValue});
            }
        });
    }

    render() {
        return (
            <div className="login-page-form" style={{height: '245px', width: '297px'}}>
                <label style={{width: '100%', textAlign: 'center', color: 'GrayText'}}>Computer vs Computer</label>
                <label style={{width: '100%', textAlign: 'center', color: 'GrayText'}}>Computer vs Human</label>
                <div className="row" style={{paddingLeft: '50px'}}>
                    <CustomWidgetDropDownElement widgetProp={this.iComboFirstPlayer}/>
                    <CustomWidgetDropDownElement widgetProp={this.iComboSecondPlayer}/>
                </div>
                <div className="row" style={{padding: '20px 0 0 57px'}}>
                    <CustomWidgetButtonElement widgetProp={this.iButtonSubmit}>Home</CustomWidgetButtonElement>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({mainOperations, authenticationState}: IRootState) => ({
    authenticationState,
    mainOperations
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialRpsComponent);

const checkValidity = (firstValue: string, secondValue: string) => {
    return (secondValue === firstValue &&
        firstValue === PlayerType.HUMAN) ||
        firstValue.toString() === '' ||
        secondValue.toString() === ''
};