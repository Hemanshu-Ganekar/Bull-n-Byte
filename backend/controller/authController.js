import userInfo from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export const login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await userInfo.findOne({ username });
    if (!user) return res.status(404).json({message : "User Not Found"});
    else {
        const ismatch = await bcrypt.compare(password, user.password);
        if (ismatch) {
            let token = jwt.sign({
                id: user._id,
                username: user.username,
            }, process.env.secret,
                { expiresIn: "1h" });
            console.log("Done")
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    }
}

export const signin = async (req, res, next) => {
    let { username, Email, password } = req.body;
    password = await bcrypt.hash(password, 10);
    const user = new userInfo({ username, Email, password });
    await user.save();
    return res.status(200).json({ message: "New user registered" });

}

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Invalid Login" });
    } else {
        await jwt.verify(token,process.env.secret, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid Login" });
            req.user = decoded;
            next();
        })
    }
}