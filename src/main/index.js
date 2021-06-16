import { Container, Sprite, Point, Graphics } from "pixi.js";
import anime from "animejs";
import { Menu, MenuItem } from "../menu/index";
import StairsSwitch from "../stairs/StairsSwitch";

export default class Main extends Container {
  constructor(assets, bounds) {
    super();
    this.bounds = bounds;
    this.decor = new Container();
    this.stairs = null;
    this.menu = null;
    this.backGround = null;
    this.hummer = null;
    this.assets = assets;
    this.init();
  }

  init() {
    this.setBackGround();
    const plant = new Sprite(this.assets.resources["decor/misc/plant"].texture);
    plant.x = this.bounds.width - plant.width * 1.5;
    plant.y = this.bounds.height / 2 - plant.height;
    this.addChild(plant);
    this.initStairs();
    this.initHummer();
    this.initDecor();
    this.initMenu();
    this.initFin();
    this.initUI();
  }

  setBackGround() {
    this.backGround = Sprite.from(this.assets.resources.bg.texture);
    this.backGround.anchor.set(0.5, 0.5);
    this.backGround.x = this.bounds.width / 2;
    this.backGround.y = this.bounds.height / 2;
    this.backGround.scale = new Point(0.9, 0.9);
    this.addChild(this.backGround);
    this.mask = new Graphics()
      .beginFill(0xffffff)
      .drawRect(0, 60, this.backGround.width, this.backGround.height)
      .endFill();
  }

  initUI() {
    const button = new Sprite(this.assets.resources["ui/btn"].texture);
    button.x = this.bounds.width / 2;
    button.y = this.bounds.height - button.height;
    button.anchor.set(0.5, 0.5);
    button.interactive = true;
    button.buttonMode = true;
    button.on("mouseup", () => {
      console.log("install");
    });
    anime({
      targets: button.scale,
      x: [0.9, 1],
      y: [0.9, 1],
      duration: 1000,
      easing: "linear",
      direction: "alternate",
      loop: true,
    });
    const logo = new Sprite(this.assets.resources["ui/logo"].texture);
    logo.x = logo.width / 12;
    logo.y = logo.height / 1.5;
    logo.scale = new Point(0, 0);
    anime({ targets: logo.scale, x: 0.9, y: 0.9 });
    this.addChild(button, logo);
  }

  initFin() {
    this.backFin = new Graphics();
    this.backFin.beginFill(0x000000, 0.8);
    this.backFin.drawRect(0, 0, this.bounds.width, this.bounds.height);
    this.backFin.endFill();

    this.fin = new Sprite(this.assets.resources["ui/fin"].texture);
    this.fin.anchor.set(0.5, 0.5);
    this.fin.x = this.bounds.width / 2;
    this.fin.y = this.bounds.height - this.fin.height;

    this.fin.scale = new Point(0, 0);
    this.backFin.visible = 0;
    this.addChild(this.backFin, this.fin);
  }

  showFin() {
    this.backFin.visible = true;
    anime({
      targets: this.fin.scale,
      x: 1,
      y: 1,
      easing: "linear",
      duration: 120,
    });
  }

  initDecor() {
    const Austin = new Sprite(this.assets.resources["decor/Austin"].texture);
    const bookStand = new Sprite(
      this.assets.resources["decor/misc/book_stand"].texture
    );
    const dec_1 = new Sprite(this.assets.resources["decor/misc/dec_1"].texture);
    const globe = new Sprite(this.assets.resources["decor/misc/globe"].texture);
    const l1 = new Sprite(this.assets.resources["decor/misc/Layer_1"].texture);
    const plant2 = new Sprite(
      this.assets.resources["decor/misc/plant_2"].texture
    );
    
    const table = new Sprite(this.assets.resources["decor/misc/table"].texture);

    Austin.x = this.bounds.width / 2 - Austin.width / 2;
    Austin.y = this.bounds.height / 2 - Austin.height / 2;
    bookStand.x = this.stairs.x;
    bookStand.y = this.stairs.y;
    dec_1.x = this.bounds.width - dec_1.width / 2;
    dec_1.y = this.bounds.height - dec_1.height - 65;
    globe.x = globe.width - globe.width / 2;
    globe.y = globe.height;
    l1.x = l1.width / 3;
    l1.y = this.bounds.height - l1.height - 55;
    table.x = table.width - table.width / 3;
    table.y = table.height;
    plant2.x = this.bounds.width / 2 - plant2.width * 2;
    plant2.y = plant2.height / 2;

    this.decor.addChild(Austin, bookStand, dec_1, globe, l1, plant2, table);
    this.addChild(this.decor);
  }

  initHummer() {
    this.hummer = new Sprite(this.assets.resources["ui/icon_hammer"].texture);
    this.hummer.x = this.stairs.x + this.hummer.width * 2;
    this.hummer.y = this.stairs.y + this.hummer.height * 2;
    this.hummer.buttonMode = this.hummer.interactive = true;
    anime({
      targets: this.hummer.position,
      y: [this.hummer.y + 10, this.hummer.y],
      direction: "alternate",
      duration: 750,
      loop: true,
      easing: "easeInOutQuad",
    });
    this.hummer.on("mouseup", () => {
      this.hummer.visible = false;
      this.menu.activateMenu();
    });
    this.addChild(this.hummer);
  }
  initStairs() {
    this.stairs = new StairsSwitch(
      [
        {
          base: this.assets.resources["decor/stairs/new_01/03"].texture,
          handrail: this.assets.resources["decor/stairs/new_01/02"].texture,
          cover: this.assets.resources["decor/stairs/new_01/01"].texture,
        },
        {
          base: this.assets.resources["decor/stairs/new_02/03"].texture,
          handrail: this.assets.resources["decor/stairs/new_02/02"].texture,
          cover: this.assets.resources["decor/stairs/new_02/01"].texture,
        },
        {
          base: this.assets.resources["decor/stairs/new_03/03"].texture,
          handrail: this.assets.resources["decor/stairs/new_03/02"].texture,
          cover: this.assets.resources["decor/stairs/new_03/01"].texture,
        },
      ],
      this.assets.resources["decor/stairs/old_stair"].texture
    );
    this.stairs.x = this.bounds.width - this.stairs.width + 5;
    this.stairs.y = this.bounds.height - this.stairs.height - 105;
    this.stairs.scale = new Point(0.9, 0.9);
    this.addChild(this.stairs);
  }

  initMenu() {
    const item01 = new MenuItem(
      this.assets.resources["ui/menu/item_back"].texture,
      this.assets.resources["ui/menu/01"].texture,
      this.assets.resources["ui/menu/choosed"].texture
    );
    const item02 = new MenuItem(
      this.assets.resources["ui/menu/item_back"].texture,
      this.assets.resources["ui/menu/02"].texture,
      this.assets.resources["ui/menu/choosed"].texture
    );

    const item03 = new MenuItem(
      this.assets.resources["ui/menu/item_back"].texture,
      this.assets.resources["ui/menu/03"].texture,
      this.assets.resources["ui/menu/choosed"].texture
    );

    this.menu = new Menu(this.assets.resources["ui/menu/ok"].texture);
    this.menu.scale = new Point(0.9, 0.9);

    this.menu.setItems([item01, item02, item03]);
    this.menu.x = this.bounds.width / 2 - this.menu.width / 2;
    this.menu.y = this.bounds.height / 2 - this.menu.height * 2 + 30;

    this.addChild(this.menu);
    this.menu.onChangeItem = (key) => this.stairs.switchStairs(key);
    this.menu.onConfirm = () =>
      setTimeout(() => {
        this.menu.visible = false;
        this.showFin();
      }, 200);
  }
}
