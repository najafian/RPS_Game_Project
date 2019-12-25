import {FloatLabelType, TextBox} from '@syncfusion/ej2-inputs';
import {IWidgetCommon} from "../common/common";

import {CheckUserPermissionOnControl} from "../../../shared/utils/permission";

export class CustomWidgetInput implements IWidgetCommon<TextBox> {
  private textbox: TextBox;
  permissionID=true;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    if (!isAuthenticated) {
      // this.setDisability(false);
    }
    this.permissionID = isAuthenticated;
  }

  constructor(element?: string | HTMLElement, placeHolder?: string, isRtl?: boolean) {
    this.textbox = new TextBox();
    this.setPlaceHolder(placeHolder);
    this.setFloatLabelType('Auto');
    this.setWidgetDirection(isRtl);
    this.createWidget(element);
  }

  setWidgetDirection(isRtl: any): void {
    this.textbox.enableRtl = isRtl;
  }

  setEnable(stat: boolean) {
    this.textbox.enabled = stat;
  }

  setType(type: string) {
    this.textbox.type = type;
  }

  addAttributes(attributes: Array<{ [key: string]: string }>) {
    attributes.forEach(a => this.textbox.addAttributes(a));
  }

  render() {
    this.textbox.refresh();
  }

  setHeight(height: number) {
  }

  setWidth(width: number) {

  }

  setValue(value: string) {
    this.textbox.value = value;
  }

  getValue() {
    return (this.textbox.value !== null && this.textbox.value.length > 0) ? this.textbox.value : '';
  }

  destroy(): void {
    this.textbox.destroy();
  }

  getWidget() {
    return this.textbox;
  }

  getElement() {
    return this.textbox.element;
  }

  setMaxLength(maxNumber: number) {
    this.textbox.element.onkeypress = (e) => {
      console.log(this.textbox.value);
      if (this.textbox.value.length <= maxNumber) {
        return false;
      }
    };
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.textbox.appendTo(element);
      } else {
        this.textbox.appendTo('#' + element);
      }
    }
  }

  setFloatLabelType(floatLabelType: FloatLabelType): void {
    this.textbox.floatLabelType = floatLabelType;
  }

  getPlaceHolder(): string {
    return this.textbox.placeholder;
  }

  setPlaceHolder(label: string) {
    this.textbox.placeholder = label;
  }

  getLabel(): string {
    return this.textbox.placeholder;
  }

  setLabel(label: string) {
    this.textbox.placeholder = label;
  }
}
