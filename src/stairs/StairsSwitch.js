import { Container, Sprite } from "pixi.js";

import Stairs from "./Stairs";

export default class StairsSwitch extends Container {
  constructor(stairsAssets, defaultStair) {
    super();
    this.stairsAssets = stairsAssets;
    this.stairs = [];
    this.defaultStair = new Sprite(defaultStair);
    this.defaultStair.x = 90;
    this.defaultStair.y = 105;

    this.addChild(this.defaultStair);
    this.initStairs();
    this.current = null;
  }
  initStairs() {
    this.stairs = this.stairsAssets.map((stairAssets) => {
      const stairs = new Stairs(
        stairAssets.base,
        stairAssets.handrail,
        stairAssets.cover
      );
      this.addChild(stairs);
      return stairs;
    });
  }
  switchStairs(key) {
    if (this.current === key) return;

    this.defaultStair.visible = false;
    this.stairs.forEach((stair) => stair.hide());
    
    this.stairs[key].show();
    this.current = key;
  }
}
