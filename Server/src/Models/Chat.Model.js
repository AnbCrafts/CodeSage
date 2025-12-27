import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true,
        default:"AI Query",
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ['Summarize', 'Explain', 'Suggest', 'Trim','DSA Guide','Polyglot','Custom'],
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  },
  result: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Chat', chatSchema);