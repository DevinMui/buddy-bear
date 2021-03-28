import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        title: String,
        author: String,
        description: String,
        image: String,
        audio: {
            mode: {
                type: String,
                enum: ['SYNTHESIZED', 'RECORDED'],
                default: 'SYNTHESIZED',
            },
            files: [{}],
        },
        mode: {
            type: String,
            enum: ['READ_ALONG', 'READ_SOLO', 'READ_WITH'],
            default: 'READ_ALONG',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Book', schema)
