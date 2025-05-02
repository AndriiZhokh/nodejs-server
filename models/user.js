const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this.id = id;
  }

  async save() {
    const db = getDb();

    try {
       await db.collection('users').insertOne(this);
    } catch(error) {
      console.log(error);
    }
  }

  async addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDb();

    try {
      return await db.collection('users').updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { cart: updatedCart } },
      )
    } catch(error) {

    }
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(cp => cp.productId);

    try {
      const products = await db.collection('products').find({ _id: { $in: productIds } }).toArray();

      return products.map(p => ({
        ...p,
        quantity: this.cart.items.find(cp => cp.productId.toString() === p._id.toString()).quantity,
      }));
    } catch(error) {
      console.log(error);
    }
  }

  static async findById(userId) {
    const db = getDb();
    console.log({ userId });

    try {
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      console.log(user);

      return user;
    } catch(error) {
      console.log(error);
    }
  }
}
module.exports = User;
