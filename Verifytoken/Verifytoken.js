import jwt, { decode } from "jsonwebtoken";
export const verifytoken = (req, res, next) => {
    const mysecretkey = "19112003"
    const token = req.headers["authorization"].split(" ")[1]
    // console.log(token)
    
    try {
        if (token) {
            const decoded = jwt.verify(token, mysecretkey);
            // console.log(decoded)
            req.mail = decoded.mail
            next()

        }
    }
    catch (error) {
        res.json({ message: error.message })
        // console.log(error.message);

    }
}

