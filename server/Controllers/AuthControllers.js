import UserModels from '../Models/UserModel.js';
import jwt from 'jsonwebtoken';

const maxAge= 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, "joinsub", {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { email: "", zerodhaID: "" };

    console.log(err);
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "incorrect zerodhaID") {
        errors.password = "That zerodhaID is incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

export const register = async (req, res, next) => {
    try {
        const { zerodhaID, username, email } = req.body;
        const user = await UserModels({ zerodhaID, username, email });
        console.log('user models', user);
        user.save().then(() => console.log("user saved"));
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(201).json({
            user: user._id,
            created: true,
        });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};

export const details = (req, res, next) => {
    UserModels.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.send(allDetails);
            console.log(allDetails);
        }});
};