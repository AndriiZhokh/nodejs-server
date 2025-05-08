const { ObjectId } = require('mongodb');

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

  async deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
    const db = getDb();

    try {
      return await db.collection('users').updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { cart: { items: updatedCartItems } } },
      );
    } catch(error) {
      console.log(error)
    }

  }

  async addOrder() {
    const db = getDb();
    try {
      const products = await this.getCart();

      const order = {
        items: products,
        user: {
          _id: new ObjectId(this.id),
          name: this.name,
        },
      };

      const result = await db.collection('orders').insertOne(order);

      this.cart = { items: [] };

      console.log('USER ID', this);

      const test = await db.collection('users').updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { cart: { items: [] } } },
      );

      return result;
    } catch(error) {
      console.log(error);
    }
  }

  async getOrders() {
    const db = getDb();

    try {
      return await db
        .collection('orders')
        .find({ 'user._id': new ObjectId(this.id) })
        .toArray();
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
