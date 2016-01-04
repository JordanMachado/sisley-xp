
class WishList {
  constructor(options) {
    this.products = [];
  }
  add(product) {
    this.products.push(product);
    if(this.products.length>=4) {
      this.sendIosEvent();
    }
  }
  sendIosEvent() {
    console.log('---->ios');  
  }
}

export default new WishList();
