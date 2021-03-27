import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        email: String,
        password: String,
        points: Number 
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', schema)
