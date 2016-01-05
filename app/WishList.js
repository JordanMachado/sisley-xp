let slice = document.querySelector('.pie');

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
      
      this.sendIosEvent();
    }
  }
  sendIosEvent() {
    console.log('---->ios');
  }
}

export default new WishList();
