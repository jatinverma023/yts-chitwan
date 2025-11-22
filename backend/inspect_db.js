// inspect_db.js
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;
if (!URI) {
  console.error('Please set MONGODB_URI in environment first');
  process.exit(1);
}

(async () => {
  try {
    // Connect without dbName so we can inspect any DB on the cluster
    await mongoose.connect(URI);
    console.log('Connected to Atlas (no dbName override)');

    const client = mongoose.connection.client;

    // If mongoose already selected a DB for the current connection, show it
    try {
      const activeDbName = mongoose.connection.db && mongoose.connection.db.databaseName;
      console.log('mongoose.connection.db.databaseName:', activeDbName);
    } catch (e) {
      console.log('Could not read mongoose.connection.db.databaseName');
    }

    // List databases (requires user to have listDatabases privilege - usually allowed for Atlas user)
    try {
      const admin = client.db().admin();
      const dbs = await admin.listDatabases();
      console.log('Databases on cluster:', dbs.databases.map(d => d.name).join(', '));
    } catch (err) {
      console.warn('Could not list databases (insufficient privileges?) —', err.message);
    }

    // Check test.users and yts.users counts
    const testDb = client.db('test');
    const ytsDb  = client.db('yts');

    const testUsersCount = await testDb.collection('users').countDocuments().catch(()=>null);
    const ytsUsersCount  = await ytsDb.collection('users').countDocuments().catch(()=>null);

    console.log('test.users count:', testUsersCount === null ? 'unavailable' : testUsersCount);
    console.log('yts.users count :', ytsUsersCount === null ? 'unavailable' : ytsUsersCount);

    // Show one doc from test.users and yts.users (if present)
    const tdoc = await testDb.collection('users').findOne({});
    const ydoc = await ytsDb.collection('users').findOne({});

    console.log('\nSample doc from test.users:', tdoc ? { _id: tdoc._id, email: tdoc.email, role: tdoc.role } : 'none');
    console.log('Sample doc from yts.users :', ydoc ? { _id: ydoc._id, email: ydoc.email, role: ydoc.role } : 'none');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
