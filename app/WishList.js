let slice = document.querySelector('.pie');
let full = document.querySelector('.full');

class WishList {
  constructor(options) {
    this.products = [];
  }
  add(product) {
    this.products.push(product);

    window.setTimeout(function() {
        slice.classList.add('add'+this.products.length);
    }.bind(this), 800);

    if(this.products.length>=4) {
      slice.classList.add('animate-full');
      full.classList.add('animate-full');
      this.sendIosEvent();
    }
  }
  sendIosEvent() {
    console.log('---->ios');
  }
}

export default new WishList();
