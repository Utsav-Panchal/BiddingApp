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

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Bid.deleteMany({});
    console.log('Cleared existing data');

    // Create users (1 admin + 9 regular users)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();

    const users = [];
    for (let i = 1; i <= 9; i++) {
      const userHashedPassword = await bcrypt.hash(`user${i}123`, 10);
      const user = new User({
        username: `user${i}`,
        password: userHashedPassword,
        role: 'user'
      });
      await user.save();
      users.push(user);
    }
    console.log('Inserted 10 users (1 admin + 9 regular users)');

    // Create products (5 expired + 5 active)
    const expiredProducts = [];
    const activeProducts = [];

    // Expired products (5)
    for (let i = 1; i <= 5; i++) {
      const product = new Product({
        name: `Expired Product ${i}`,
        description: `This is an expired product ${i} for testing`,
        basePrice: 100 + (i * 50),
        biddingDeadline: new Date('2023-01-01'), // Past date
        bids: [],
        status: 'closed'
      });
      await product.save();
      expiredProducts.push(product);
    }

    // Active products (5)
    for (let i = 1; i <= 5; i++) {
      const product = new Product({
        name: `Active Product ${i}`,
        description: `This is an active product ${i} for testing`,
        basePrice: 200 + (i * 50),
        biddingDeadline: new Date(Date.now() + (i * 7 * 24 * 60 * 60 * 1000)), // 7, 14, 21, 28, 35 days from now
        bids: [],
        status: 'open'
      });
      await product.save();
      activeProducts.push(product);
    }
    console.log('Inserted 10 products (5 expired + 5 active)');

    // Create bids for expired products and assign winners
    for (let i = 0; i < expiredProducts.length; i++) {
      const product = expiredProducts[i];
      const numBids = 3 + Math.floor(Math.random() * 5); // 3-7 bids per product

      // Create bids
      const bids = [];
      for (let j = 0; j < numBids; j++) {
        const userIndex = Math.floor(Math.random() * users.length);
        const amount = product.basePrice + 10 + Math.floor(Math.random() * 100);

        const bid = new Bid({
          amount: amount,
          user: users[userIndex]._id,
          product: product._id,
          timestamp: new Date('2022-12-' + (10 + j)) // Dates before deadline
        });
        await bid.save();
        bids.push(bid);
      }

      // Update product with bids
      product.bids = bids.map(bid => bid._id);

      // Find the highest bid and assign winner
      const highestBid = bids.reduce((max, bid) => bid.amount > max.amount ? bid : max, bids[0]);
      product.winner = highestBid.user;
      product.status = 'closed';

      await product.save();
    }
    console.log('Added bids and winners to expired products');

    // Create bids for active products
    for (let i = 0; i < activeProducts.length; i++) {
      const product = activeProducts[i];
      const numBids = 2 + Math.floor(Math.random() * 4); // 2-5 bids per product

      // Create bids
      const bids = [];
      for (let j = 0; j < numBids; j++) {
        const userIndex = Math.floor(Math.random() * users.length);
        const amount = product.basePrice + 10 + Math.floor(Math.random() * 50);

        const bid = new Bid({
          amount: amount,
          user: users[userIndex]._id,
          product: product._id,
          timestamp: new Date(Date.now() - (j * 24 * 60 * 60 * 1000)) // Recent bids
        });
        await bid.save();
        bids.push(bid);
      }

      // Update product with bids
      product.bids = bids.map(bid => bid._id);
      await product.save();
    }
    console.log('Added bids to active products');

    // Add some bids from admin user to active products
    for (let i = 0; i < activeProducts.length; i++) {
      const product = activeProducts[i];
      const amount = product.basePrice + 50 + Math.floor(Math.random() * 100);

      const bid = new Bid({
        amount: amount,
        user: adminUser._id,
        product: product._id,
        timestamp: new Date()
      });
      await bid.save();
      product.bids.push(bid._id);
      await product.save();
    }
    console.log('Added admin bids to active products');

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
