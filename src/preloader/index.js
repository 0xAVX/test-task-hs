import { Loader } from "pixi.js";

export default class Preloader {
  constructor(config, preloderElement) {
    this.config = config;
    this.preloderElement = preloderElement;
    this.loader = new Loader();
  }
  load() {
    this.loader.baseUrl = this.config.baseUrl;
    this.config.sprites.forEach(item => this.loader.add(item.name, item.url));
    this.loader.onComplete.add(this.handleComplete);
    this.loader.onError.add(this.handleError);
    this.loader.load();
  }

  handleComplete = () => {
    this.preloderElement.style.display = 'none';
    this.onComplete(this.loader);
  }

  handleError(e) {
    console.error(e.message);
  }
}