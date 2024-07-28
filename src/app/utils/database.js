import mongoose from "mongoose"

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://tanuki:tanuki@cluster0.khvdnhu.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Success: connected to MongoDB")
    } catch (err) {
        console.error("Error: could not connect to MongoDB")
        throw new Error()
    }
}

export default connectDB