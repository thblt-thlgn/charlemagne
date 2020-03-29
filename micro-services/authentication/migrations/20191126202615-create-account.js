'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ARRAY(Sequelize.ENUM('admin', 'user')),
        allowNull: false,
        default: [],
      },
      verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('accounts', { transaction });
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_accounts_role', {
        transaction,
      });
    }),
};
