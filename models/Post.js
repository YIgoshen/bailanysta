import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    // unique: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  //author
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',            //будет ссылаться на модель User - делаем связь между 2мя таблицами. Пойти в User и найти по ObjectID
    required: true,
  },
  ImageUrl: String,
}, {
  timestamps: true,
})

export default mongoose.model('Post', PostSchema)
