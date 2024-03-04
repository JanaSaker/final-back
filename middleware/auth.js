import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// At the top of your middleware file
import { createUserModel } from "../Models/usersModel.js";
const User = createUserModel; // Assuming sequelize and DataTypes are imported

import { db } from "../Models/index.js";

const Users = db.Users;


export async function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token_split = token.split(" ");
    const decoded = jwt.verify(token_split[1], process.env.SECRET_STRING);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
}

export async function verifyAdmin(req, res, next) {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token_split = token.split(" ");
    const decoded = jwt.verify(token_split[1], process.env.SECRET_STRING);
    const user = await User.findByPk( decoded.id );

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Failed to authenticate token"+error.message });
  }
}

export async function verifyUser(req, res, next) {
  try {
     const headerInput = req.headers['authorization'];
     const token = headerInput && headerInput.split(' ')[1];
     if (!token) {
       return res.status(401).json({ message: "No token provided" });
     }
 
     const decoded = jwt.verify(token, process.env.SECRET_STRING);
     const user = await Users.findByPk(decoded.id);
     if (!user) {
       return res.status(403).json({ message: "Unauthorized" });
     }
 
     // Attach the user ID to the request object
     req.userId = user.id;
 
     next();
  } catch (error) {
     return res.status(403).json({ message: error.message });
  }
 };
 
