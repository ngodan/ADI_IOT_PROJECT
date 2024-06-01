const { getDbContext } = require("../database.service");

const getAllRoles = async () => {
  const context = getDbContext();
  return await context.Role.findAll();
};

const getRoleByRoleName = async (RoleName) => {
  try {
    const context = getDbContext();
    if (context) {
      const Role = await context.Role.findOne({
        where: {
          role_name: RoleName
        }
      });
      return Role;
    }
    else{
      return null;
    }

  } catch (error) {
    console.error('Error getting Role by name:', error);
    throw error;
  }
}
const getRoleIdByRoleName = async (RoleName) => {
  try {
    const context = getDbContext();
    if (context) {
      const Role = await context.Role.findOne({
        where: {
          role_name: RoleName
        }
      });
      return Role.pkid;
    }
    else{
      return 0;
    }

  } catch (error) {
    console.error('Error getting Role by name:', error);
    throw error;
  }
}
const findRoleById = async (id) => {
  return await db.Person.findByPk(id);
};

const createRole = async ({ Name, Email }) => {
  const newPerson = await db.Person.create({ Name, Email });
  return newPerson;
};

const updateRole = async ({ Id, Name, Email }) => {
  await db.Person.update(
    { Name, Email },
    {
      where: {
        Id: Id,
      },
    }
  );
  return { Id, Name, Email };
};

const deleteRole = async (Id) => {
  await db.Person.destroy({
    where: { Id: Id },
  });
};
const setRoleActive = async (request) => {
  const context = getDbContext();
  try {
    const [updatedCount] = await context.Role.update(
      { is_active: request.is_active },
      {
        where: {
          pkid: request.pkid,
        },
      }
    );
    if (updatedCount > 0) {
      return { success: true, message: 'Role updated successfully.' };
    } else {
      return { success: false, message: 'Role not found or not updated.' };
    }
  } catch (error) {
    console.error('Error updating Role:', error);
    return { success: false, message: 'An error occurred while updating Role.' };
  }
};

module.exports = {
  getAllRoles,
  getRoleByRoleName,
  getRoleIdByRoleName,
  findRoleById,
  createRole,
  updateRole,
  deleteRole,
  setRoleActive,
};