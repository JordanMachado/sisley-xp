import Mustache from 'Mustache';

export default class menuView {
  constructor() {
    this.el = document.querySelector('.full-menu');
    this.rendered();
  }

  show() {
    TweenLite.to(this.el,.3,{
      top:'0%'
    })
  }

  hide () {
    TweenLite.to(this.el,.3,{
      top:'-100%'
    })
  }

  rendered() {
    this.closeBtn = document.querySelector('.close');
    this.showBtn = document.querySelector('.left');

    this.showBtn.onclick =()=> {
      this.show();
    }
    this.closeBtn.onclick =()=> {
      this.hide();
    }
    this.translateX = 0 ;
    this.translateY = 0 ;
  }
}
