import { Schema, model } from "mongoose";

const imageGallerySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageName: {
      type: String,
      required: [true, "Image name is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    metadata: {
      resolution: {
        width: Number,
        height: Number,
      },
      fileType: String,
      fileSize: Number,
    },
    description: {
      type: String,
    },
    points: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  
    cloudinaryId: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },  },
  {
    timestamps: true,
    }
);

imageGallerySchema.index({ user: 1 });

const Gallery = model("Gallery", imageGallerySchema);

export default Gallery;
