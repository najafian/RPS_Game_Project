import React, {Component} from 'react';
import {IWidgetCommon} from "../common/common";
import {Dialog, AnimationSettingsModel, BeforeCloseEventArgs} from '@syncfusion/ej2-popups';
import {EmitType} from '@syncfusion/ej2-base';
import UniqueID from "../../../shared/utils/uniqueKey";

interface IState {
    windowWidget: { widget: CustomWidgetWindowElement };
    settleElement: string;
    width: number;
    height: number;
}

export interface IDirectionAction {
    tabWidgets: Array<IWidgetCommon<any>>;

    setDirection(isRtl: boolean): void;
}

export interface IDirectionWindowAction extends IDirectionAction {
    showWindow(data: any, type: any): boolean;

    close(event: Function): boolean;
}

export class CustomWidgetWindowElement extends Component<IState> implements IWidgetCommon<Dialog> {

    dialog: Dialog;
    windowID: string;

    getLabel(): string {
        return '';
    }

    setLabel(label: string) {
    }

    constructor(prop: any) {
        super(prop);
        this.dialog = new Dialog();
        this.dialog.isModal = true;
        this.dialog.showCloseIcon = true;
        this.dialog.allowDragging = true;
        this.windowID = UniqueID();
        this.dialog.width = this.props.width;
        this.dialog.height = this.props.height;
        this.dialog.visible = false;
        this.props.windowWidget.widget = this;

        this.setPosition('center', 'center');
        this.setAnimationSettings({effect: 'None', duration: 100});
    }

    getMainElement() {
        return this.dialog.element;
    }

    close() {
        this.dialog.hide();
    }

    setModal(isModal = true): void {
        this.dialog.isModal = isModal;
    }

    setAnimationSettings(props: AnimationSettingsModel) {
        this.dialog.animationSettings = props;
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.dialog.appendTo(element);
            } else {
                this.dialog.appendTo('#' + element);
            }
            this.headerTitleDirection();
        }
    }

    headerTitleDirection() {

    }

    showCloseIcon(showCloseIcon = true) {
        this.dialog.showCloseIcon = showCloseIcon;
    }

    setCloseEvent(beforeClose: EmitType<BeforeCloseEventArgs>) {
        this.dialog.beforeClose = beforeClose;
    }

    setTargetElement(target: string | HTMLElement = '#app-view-container') {
        this.dialog.target = target;
    }

    destroy(): void {
        this.dialog.destroy();
    }

    getWidget(): any {
        return this.dialog;
    }

    showDialog(isRTL = false): void {
        if (this.dialog.element === undefined) {
            this.setTargetElement('#' + this.props.settleElement);
            this.createWidget(this.windowID);
        }
        this.dialog.enableRtl = isRTL;
        this.dialog.show(false);
    }

    setHeight(height: number | string) {
        this.dialog.height = height;
    }

    setWidgetDirection(isRtl: boolean): void {
        this.dialog.enableRtl = isRtl;
        this.headerTitleDirection();
    }

    dataBind() {
        this.dialog.dataBind();
    }

    setWidth(width: number | string) {
        this.dialog.width = width;
    }

    setHeaderTitle(header: string | HTMLElement): void {
        this.dialog.header = header;
    }

    setPosition(x = 'center', y = 'center'): void {
        this.dialog.position = {X: x, Y: y};
    }

    render() {
        return (
            <div style={{display: 'none'}} id={this.windowID}>
                {this.props.children}
            </div>);
    }

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    }
}
