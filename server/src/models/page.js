import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        text: {
            recorded: String,
            expected: String,
            file: String,
        },
        points: Number,
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Page', schema)
