import Mustache from 'Mustache';
let template = require('./PlantView.tpl');

export default class PlantView {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this.datas = options.datas;
    this.template = template;
  }
  show() {
    TweenLite.to(this.el,.3,{
      left:'0%'
    })
  }
  hide () {
    TweenLite.to(this.el,.3,{
      left:'100%'
    })
  }
  update(datas) {
    this.datas = datas;
  }
  render() {
    let html = Mustache.to_html(this.template, this.datas);
    this.el.innerHTML = html;
    this.rendered();

  }
  rendered() {
    this.closeBtn = document.querySelector('.back');
    this.closeBtn.onclick =()=> {
      this.hide();
    }
  }
}
