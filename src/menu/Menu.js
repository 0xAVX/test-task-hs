import { Container, Sprite } from "pixi.js";
import anime from "animejs";

export default class Menu extends Container {
  constructor(confirm) {
    super();
    this.items = [];
    this.confirm = new Sprite(confirm);
    this.addChild(this.confirm);
    
    this.visible = false;
    this.confirm.visible = false;
    this.confirm.interactive = true;
    this.confirm.buttonMode = true;

    this.currentItem = null;

    this.confirm.on("mouseup", this.handleConfirm, this);
    this.confirm.on("mousedown", this.handleConfirmClick, this);
  }

  setItems(items) {
    this.items = items;
    this.addChild(...this.items);
    this.items.forEach((item, key) =>
      item.on("mouseup", (evt) => this.handleItemSelected(evt, key), this)
    );
  }

  handleItemSelected(evt, key) {
    const currentItem = evt.target;
    this.items.forEach((item) => item.setActive(false));
    currentItem.setActive(true);
    this.showConfirm(currentItem.position);
    this.currentItem = key;
    this.onChangeItem(key);
  }

  handleConfirm() {
    anime({ targets: this.confirm.scale, x: 1, y: 1 });
    this.onConfirm();
  }

  handleConfirmClick() {
    anime({ targets: this.confirm.scale, x: 0.8, y: 0.8 });
  }

  showConfirm(position) {
    this.confirm.visible = true;
    anime({
      targets: this.confirm.position,
      x: position.x - this.confirm.width / 2,
      y: position.y + this.confirm.height / 2,
    });
  }

  activateMenu() {
    this.visible = true;
    this.items.forEach((item, key) => {
      if (key === 0) return;
      anime({
        targets: item.position,
        x: item.width * key,
        easing: "easeInOutSine",
        duration: 750,
      });
    });
  }
  onConfirm(){}
  onChangeItem(){}
}
