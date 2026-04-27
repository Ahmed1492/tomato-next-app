import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  cartItems: { type: Object, default: {} }
}, { minimize: false });
// minimize: false => keeps empty {} objects in MongoDB.
// minimize: true => It removes empty objects {} before saving to MongoDB.


const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;