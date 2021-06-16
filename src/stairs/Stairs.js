import { Container, Sprite } from "pixi.js";
import anime from 'animejs';

export default class Stairs extends Container {
  constructor(base, handrail, cover) {
    super();
    this.base = new Sprite(base);
    this.base.visible = false;

    this.handrail = new Sprite(handrail);
    this.handrail.visible = false;

    this.cover = new Sprite(cover);
    this.cover.visible = false;
    
    this.addChild(this.base, this.handrail, this.cover);
  }
  show() {
    this.children.forEach((child, key) => {
      child.y = -child.height / 2;
      child.x = 10;
      child.visible = true;
      anime({targets: child.position, y: 0, duration: 200 + 200*key, easing: 'easeOutQuart'});
    });
  }
  hide() {
    this.children.forEach(child => {
      child.visible = false
    });
  }
}