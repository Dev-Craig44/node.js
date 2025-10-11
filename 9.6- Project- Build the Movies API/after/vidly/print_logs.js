const mongoose = require('mongoose');
(async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/vidly');
    const docs = await mongoose.connection.db.collection('logs').find().sort({_id:-1}).limit(5).toArray();
    console.log(JSON.stringify(docs,null,2));
    await mongoose.disconnect();
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();
