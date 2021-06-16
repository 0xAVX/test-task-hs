import { Container, Sprite } from "pixi.js";

export default class MenuItem extends Container {
  constructor(back, item, selected) {
    super();
    this.back = new Sprite(back);
    this.back.anchor.set(0.5, 0.5);

    this.item = new Sprite(item);
    this.item.anchor.set(0.5, 0.5);

    this.selected = new Sprite(selected);
    this.selected.anchor.set(0.5, 0.5);
    this.selected.visible = false;
    this.selected.y = -4;

    this.width = this.back.width;
    this.height = this.back.height;
    this.addChild(this.back, this.selected, this.item);

    this.interactive = true;
    this.buttonMode = true;
    this.hitArea = this.getBounds();
  }

  setActive(v) {
    
    this.selected.visible = v;
  }
}
