'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Categories',
          },
          key: 'id',
        },
      },
      CategoryTitle: {
        type: Sequelize.STRING,
      },
      Title: {
        type: Sequelize.TEXT,
      },
      Organization: {
        type: Sequelize.TEXT,
      },
      NavPosition: {
        type: Sequelize.INTEGER,
      },
      ShortDetails: {
        type: Sequelize.TEXT,
      },
      LongDetails: {
        type: Sequelize.TEXT,
      },
      Eligibility: {
        type: Sequelize.TEXT,
      },
      Hours: {
        type: Sequelize.TEXT,
      },
      Address: {
        type: Sequelize.TEXT,
      },
      Contact: {
        type: Sequelize.TEXT,
      },
      MainImg: {
        type: Sequelize.STRING,
      },
      SuppImg: {
        type: Sequelize.STRING,
      },
      Link: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.sequelize.query('ALTER SEQUENCE "Resources_id_seq" RESTART WITH 100;');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Resources');
  },
};
