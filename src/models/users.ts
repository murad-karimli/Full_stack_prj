import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model("User", UserSchema);

// Actions
export const getUsers = () => UserModel.find().select("-password");

export const getAUser = (email: any) =>
  UserModel.findOne({ email }).select("-password");

export const getUserByEmail = (email: any) =>
  UserModel.findOne({ email }).select("+password");

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken }).select(
    "-password"
  );

export const getUserById = (id: string) =>
  UserModel.findById(id).select("-password");

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
