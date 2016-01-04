import Mustache from 'Mustache';
let template = require('./PlantView.tpl');
import WishList from './../WishList';


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
    window.removeEventListener('deviceorientation',  this._onDeviceOrientation)

  }
  update(datas) {
    this.datas = datas;
  }
  addToWishList() {
    WishList.add(this.datas);
    this.addBtn.classList.add('animate');

    window.setTimeout(function() {
        this.hide();
    }.bind(this), 1000);
  }
  render() {
    let html = Mustache.to_html(this.template, this.datas);
    this.el.innerHTML = html;
    this.rendered();

  }
  rendered() {
    this.closeBtn = document.querySelector('.back');
    this.addBtn = document.querySelector('.button');
    this.images = document.querySelectorAll('.images-wrapper img');
    for (var i = 0; i < this.images.length; i++) {
      this.images[i].random = Math.random() * (6 - 2) + 2;
    }
    this.addBtn.onclick =()=> {
      this.addToWishList();
    }
    this.closeBtn.onclick =()=> {
      this.hide();
    }
    this._onDeviceOrientation = this.onDeviceOrientation.bind(this);
    window.addEventListener('deviceorientation',  this._onDeviceOrientation);
    this.translateX = 0 ;
    this.translateY = 0 ;

  }
  onDeviceOrientation(e) {

    this.translateX += (e.gamma - this.translateX );
    this.translateY += (e.beta - this.translateY );
    //console.log(this.images);
    for (var i = 0; i < this.images.length; i++) {
      TweenLite.set(this.images[i],{
        transform: 'translateX('+this.translateX/this.images[i].random+'px) translateY('+this.translateY/this.images[i].random+'px)'
      })
    }


  }
}
