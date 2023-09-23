import mongoose, {Schema,model} from 'mongoose';

const blogPostSchema = new Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  comments: [
    { type: mongoose.Schema.Types.ObjectId,ref: 'Comment',},],
  ratings: [ {
    type: mongoose.Schema.Types.ObjectId, ref: 'Rating', },],
});


const Blog = model('Blog', blogPostSchema);

export default Blog;
