const { getDbContext } = require("../database.service");

const getAllUsers = async () => {
  const context = getDbContext();
  return await context.User.findAll();
};

const getUserByUsername = async (username) => {
  try {
    const context = getDbContext();
    if (context) {
      const user = await context.User.findOne({
        where: {
          user_name: username
        }
      });
      return user;
    }
    else {
      return null;
    }

  } catch (error) {
    console.error('Error getting user by name:', error);
    throw error;
  }
}
const findUserById = async (id) => {
  return await db.Person.findByPk(id);
};

const createUser = async ({ user_name, user_password, user_full_name,user_email, user_role_id, updatedAt, notes, is_use,is_active }) => {
  try{
    const context = getDbContext();
    const newUser = await context.User.create({ user_name, user_password,user_email, user_full_name, user_role_id, updatedAt, notes, is_use,is_active });
    return newUser;
  }
  catch(error){
    console.log("Lỗi",error)
  }
  
};

const updateUser = async ({ user_name, user_full_name,user_email, user_role_id, updatedAt, notes, is_use,pkid }) => {
  const context = getDbContext();
  await context.User.update(
    { user_name, user_full_name,user_email, user_role_id, updatedAt, notes, is_use },
    {
      where: {
        pkid:pkid,
      },
    }
  );
  return { pkid, user_full_name, user_name,updatedAt };
};

const deleteUser = async (pkid) => {
  const context = getDbContext();
  await context.User.destroy({
    where: { pkid: pkid },
  });
};
const setUserActive = async (request) => {
  const context = getDbContext();
  try {
    const [updatedCount] = await context.User.update(
      { is_active: request.is_active },
      {
        where: {
          pkid: request.pkid,
        },
      }
    );
    if (updatedCount > 0) {
      return { success: true, message: 'User updated successfully.' };
    } else {
      return { success: false, message: 'User not found or not updated.' };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'An error occurred while updating user.' };
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  setUserActive,
};