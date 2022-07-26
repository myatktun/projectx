import { Schema, model } from "mongoose"
import jwt from "jsonwebtoken"
import { randomBytes, scryptSync } from "crypto"
import { IUser } from '@node-server/api-interfaces'

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: 50,
        minlength: 3,
        unique: true
    },
    password: String,
    salt: String,
    role: {
        type: String,
    }
}, { versionKey: false })

UserSchema.pre("save", async function() {
    this.salt = randomBytes(16).toString("base64")
    this.password = scryptSync(this.password as string, this.salt, 64).toString("base64")
})

UserSchema.methods.createJWT = async function(): Promise<string> {
    const id = new Date().getTime()
    if (!process.env.JWT_SECRET) {
        throw new Error("Invalid JWT_SECRET")
    }
    return jwt.sign({ id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME })
}

UserSchema.methods.validPassword = async function(password: string): Promise<boolean> {
    const correct = scryptSync(password, this.salt, 64).toString("base64")
    return correct === this.password
}

export default model("Users", UserSchema)
