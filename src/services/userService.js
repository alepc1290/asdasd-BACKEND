import User from "../models/User.js";

export async function createUser(data) {
  return await User.create(data);
}

export async function getUserByEmail(email) {
  return await User.findOne({ email, deleted: false });
}

export async function getUserById(id) {
  return await User.findOne({ _id: id, deleted: false }).select("-password");
}

export async function getAllUsers() {
  return await User.find({ deleted: false }).select("-password");
}

export async function deleteUser(id) {
  return await User.findByIdAndUpdate(id, { deleted: true }, { new: true });
}

export async function updateUserTokens(userId, accessToken, refreshToken) {
  return await User.findByIdAndUpdate(
    userId,
    { googleAccessToken: accessToken, googleRefreshToken: refreshToken },
    { new: true }
  );
}
