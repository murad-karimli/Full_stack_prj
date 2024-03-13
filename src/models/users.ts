import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});
export const UserModel = mongoose.model("User", UserSchema);



//actions
export const getUsers = () => UserModel.find();
export const getAUser=(email:any)=> UserModel.findOne({ email });
export const getUserByEmail = (email: any) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserbyId = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
