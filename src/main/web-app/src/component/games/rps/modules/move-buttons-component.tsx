import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {MoveTypeClassname} from "../models/type/move-type-classname";
import {IWidgetOps} from "../../../../shared/widgets/common/common";
import {CustomWidgetButton} from "../../../../shared/widgets/button/CustomWidgetButton";
import {CustomWidgetButtonElement} from "../../../../shared/widgets/button/CustomWidgetButtonElement";


interface IProps {
buttonActions:{}
}

class MoveButtonsComponent extends React.Component<IProps> {
    private iButtonRock: IWidgetOps<CustomWidgetButton> = {};
    private iButtonPaper: IWidgetOps<CustomWidgetButton> = {};
    private iButtonScissor: IWidgetOps<CustomWidgetButton> = {};
    private iButtonStartGame: IWidgetOps<CustomWidgetButton> = {};

    componentDidMount(): void {
        this.iButtonRock.getWidget().setStyleSheet(MoveTypeClassname.ROCK);
        this.iButtonPaper.getWidget().setStyleSheet(MoveTypeClassname.PAPER);
        this.iButtonScissor.getWidget().setStyleSheet(MoveTypeClassname.SCISSORS);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (<div>
            <Row>
                <Col md={4}><CustomWidgetButtonElement widgetProp={this.iButtonRock}/></Col>
                <Col md={4}><CustomWidgetButtonElement widgetProp={this.iButtonPaper}/></Col>
                <Col md={4}><CustomWidgetButtonElement widgetProp={this.iButtonScissor}/></Col>
            </Row>
            <Row>
                <Col md={4}><CustomWidgetButtonElement widgetProp={this.iButtonStartGame}/></Col>
            </Row>
        </div>);
    }
}