import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        user: String
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Bear', schema)
