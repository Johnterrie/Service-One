import mongoose from "mongoose"

const connectDB = (url) => {
    try {
        const db = mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to Database")
        })
    } catch (error) {
        console.log(error.message)
    }

    return db
}

export default connectDB