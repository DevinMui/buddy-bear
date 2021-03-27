import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        points: Number,
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', schema)
