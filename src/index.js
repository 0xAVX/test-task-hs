import { Application } from "pixi.js";
import Stats from "stats.js";
import { scaleToWindow } from "./lib/utils";

import Main from "./main";
import Preloader from "./preloader";
import config from "./config.json";

const app = new Application({
  backgroundColor: 0x000000,
  width: 1200,
  height: 700
});

function init() {
  // load assets and fonts
  document.body.appendChild(app.view);
  setup();
}

function setup() {
  let stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  scaleToWindow(app.view, "#000");
  window.addEventListener("resize", function () {
    scaleToWindow(app.view, "#000");
  });

  const preloader = new Preloader(config, document.getElementById("preloader"));
  preloader.load();
  preloader.onComplete = (assets) => {
    const main = new Main(assets, {
      width: app.view.width,
      height: app.view.height,
    });
    app.stage.addChild(main);
  };
  // game loop
  app.ticker.add((delta) => {
    stats.begin();

    stats.end();
  });
}

init();
