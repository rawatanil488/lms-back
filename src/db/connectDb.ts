import mongoose from 'mongoose';
const mongo_url = 'mongodb+srv://rawatanil488:rawatanil488@node-type.qjvusql.mongodb.net/?retryWrites=true&w=majority';

export default async () => {
    try {
        await mongoose.connect(mongo_url)
        console.log('MongoDB Connected')
    } catch (err: any) {
        console.log(err.message);
        // Exit
        process.exit(1);
    }
}
