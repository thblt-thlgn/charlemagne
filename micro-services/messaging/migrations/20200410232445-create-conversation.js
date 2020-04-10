'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accounts: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      creator: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('conversations', { transaction }),
};
