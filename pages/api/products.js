import User from '@/Models/User'
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect()
    try {
        if (req.method === "GET") {
            let products = await User.find()
            res.status(200).json(products)
         
        } else {
            return res.status(404).json({ message: "not found route" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "an error occurred" });
    }
}
