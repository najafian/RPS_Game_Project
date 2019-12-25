import {PlayerService} from "../service/player-service";
import React, {createRef, RefObject} from "react";
import {Row} from "react-bootstrap";
import {MoveTypeClassname} from "../models/type/move-type-classname";

export interface IPlayerState {
    operation?: PlayerService;
}

export default class PlayerComponent extends React.Component<IPlayerState> {
    readonly playerNameLabelRef: RefObject<HTMLLabelElement>;
    readonly imageRef: RefObject<HTMLDivElement>;
    readonly playerResultLabelRef: RefObject<HTMLLabelElement>;

    constructor(props: any) {
        super(props);
        this.playerNameLabelRef = createRef();
        this.playerResultLabelRef = createRef();
        this.imageRef = createRef();
    }

    componentDidMount(): void {
        this.initializeOperations();

    }

    private initializeOperations() {
        const operations = this.props.operation;
        operations.setPlayerName = (label) => {
            this.playerNameLabelRef.current.innerText = label;
            this.imageRef.current.className = MoveTypeClassname.QUESTION_MARK;
        };

        operations.setPlayerClassIcon = (className) => {
            this.imageRef.current.className = className;
        };

        operations.setPlayerResult = (result: number) => {
            this.playerResultLabelRef.current.innerText = 'Result : ' + result ;
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (<div style={{textAlign: 'center'}}>
            <Row>
                <label ref={this.playerResultLabelRef} style={{width: '100%'}}></label>
            </Row>
            <div className="rps-panel-move-image-class" >
                <div>
                    <label ref={this.playerNameLabelRef}/>
                </div>
                <div style={{padding: '10px'}}>
                    <div ref={this.imageRef} className="rps-move-image-class"/>
                </div>
            </div>
        </div>);
    }
}