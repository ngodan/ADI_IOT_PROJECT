const { getDbContext } = require("../database.service");

const getAllCustomers = async () => {
  const context = getDbContext();
  return await context.Customer.findAll();
};

const getCustomerByCustomerName = async (username) => {
  try {
    const context = getDbContext();
    if (context) {
      const user = await context.Customer.findOne({
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
const findCustomerById = async (id) => {
  return await db.Person.findByPk(id);
};

const createCustomer = async ({ user_name, user_password, user_full_name,user_email, user_role_id, updatedAt, notes, is_use,is_active }) => {
  try{
    const context = getDbContext();
    const newCustomer = await context.Customer.create({ user_name, user_password,user_email, user_full_name, user_role_id, updatedAt, notes, is_use,is_active });
    return newCustomer;
  }
  catch(error){
    console.log("Lỗi",error)
  }
  
};

const updateCustomer = async ({ user_name, user_password, user_full_name,user_email, user_role_id, updatedAt, notes, is_use,pkid }) => {
  const context = getDbContext();
  await context.Customer.update(
    { user_name, user_password, user_full_name,user_email, user_role_id, updatedAt, notes, is_use },
    {
      where: {
        pkid:pkid,
      },
    }
  );
  return { pkid, user_full_name, user_name,updatedAt };
};

const deleteCustomer = async (Id) => {
  await db.Person.destroy({
    where: { Id: Id },
  });
};
const setCustomerActive = async (request) => {
  const context = getDbContext();
  try {
    const [updatedCount] = await context.Customer.update(
      { is_active: request.is_active },
      {
        where: {
          pkid: request.pkid,
        },
      }
    );
    if (updatedCount > 0) {
      return { success: true, message: 'Customer updated successfully.' };
    } else {
      return { success: false, message: 'Customer not found or not updated.' };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'An error occurred while updating user.' };
  }
};

module.exports = {
  getAllCustomers,
  getCustomerByCustomerName,
  findCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  setCustomerActive,
};