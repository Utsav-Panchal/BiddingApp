// seedDatabase.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Product = require('./models/Product');
const Bid = require('./models/Bid');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data (optional)
    await User.deleteMany({});
    await Product.deleteMany({});
    await Bid.deleteMany({});
    console.log('Cleared existing data');

    // Insert users
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();

    const userHashedPassword = await bcrypt.hash('user123', 10);
    const regularUser = new User({
      username: 'user',
      password: userHashedPassword,
      role: 'user'
    });
    await regularUser.save();
    console.log('Inserted users');

    // Insert products
    const product1 = new Product({
      name: 'Laptop',
      description: 'High-performance laptop',
      basePrice: 1000,
      biddingDeadline: new Date('2025-12-31T23:59:59.999Z'),
      bids: [],
      status: 'open'
    });
    await product1.save();

    const product2 = new Product({
      name: 'Smartphone',
      description: 'Latest smartphone model',
      basePrice: 800,
      biddingDeadline: new Date('2025-12-31T23:59:59.999Z'),
      bids: [],
      status: 'open'
    });
    await product2.save();
    console.log('Inserted products');


    // Product to test winner selection
    const pastProduct = new Product({
      name: 'Old Laptop',
      description: 'An old laptop model',
      basePrice: 500,
      biddingDeadline: new Date('2023-01-01T00:00:00.000Z'), // Past date
      bids: [],
      status: 'open'
    });
    await pastProduct.save();


    // Insert bids

    // Bid to test winner selection
    const oldBid1 = new Bid({
      amount: 600,
      user: adminUser._id,
      product: pastProduct._id,
      timestamp: new Date('2023-01-01T01:00:00.000Z')
    });
    await oldBid1.save();

    const oldBid2 = new Bid({
      amount: 700,
      user: regularUser._id,
      product: pastProduct._id,
      timestamp: new Date('2023-01-01T02:00:00.000Z')
    });
    await oldBid2.save();

    pastProduct.bids.push(oldBid1._id, oldBid2._id);
    await pastProduct.save();

    // Update past product with bid
    const bid1 = new Bid({
      amount: 1100,
      user: adminUser._id,
      product: product1._id,
      timestamp: new Date()
    });
    await bid1.save();

    const bid2 = new Bid({
      amount: 850,
      user: regularUser._id,
      product: product2._id,
      timestamp: new Date()
    });
    await bid2.save();
    console.log('Inserted bids');

    // Update products with bids
    product1.bids.push(bid1._id);
    await product1.save();
    product2.bids.push(bid2._id);
    await product2.save();
    console.log('Updated products with bids');

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
seedDatabase();
