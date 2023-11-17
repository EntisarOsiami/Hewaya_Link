// create category model schema
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: [32, 'Category name is too long']
    },
}, { timestamps: true });
// export category model
export default mongoose.model('Category', CategorySchema);