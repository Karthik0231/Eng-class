import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    caption: {
        type: String,
        required: true
    },
    media: [
        {
            mediaType: {
                type: String
            },
            mediaUrl: {
                type: String
            },
            publicId: {
                type: String
            }
        }
    ],
    likes: [{
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    location: {
        type: String
    },
},
{timestamps: true}
)

const Post = mongoose.model("Post", postSchema)
export default Post;

// ["fghj","dfghjk","dfghjkl"] // [string]
// [{mediaType:"image", mediaUrl:"https://res.cloudinary.com/dzj8qk2c9/image/upload/v1700000000/abc.jpg"}] 
// [{mediaType:String, mediaUrl:String}, {mediaType:String, mediaUrl:String}]