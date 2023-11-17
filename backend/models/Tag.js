// create tag model schema
const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: [32, 'Tag name is too long']
    },
}, { timestamps: true });
// export tag model
export default mongoose.model('Tag', TagSchema);
