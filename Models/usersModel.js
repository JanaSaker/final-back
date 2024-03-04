import bcrypt from "bcrypt"
export const createUserModel = (sequelize, DataTypes) => {
     const User = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile: {
            type: DataTypes.STRING,
            allowNull: false

        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        }
    }, {
        timestamps: false
    });

    // Adding a class method to compare passwords and check roles
    User.authenticate = async function (username, password, requiredRole = null) {
        const user = await User.findOne({ where: { username } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid username or password");
        }

        if (requiredRole && user.role !== requiredRole) {
            throw new Error("Insufficient permissions");
        }
    };

    return User;
};
