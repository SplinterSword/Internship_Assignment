'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.User, {
        foreignKey: 'Username',
        targetKey: 'Username',
        as: 'user',
      });
    }
  }

  Contact.init(
    {
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone_Number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Job_Title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Contact',
      indexes: [
        {
          unique: true,
          fields: ['Username', 'Email', 'Phone_Number'], // Composite unique constraint
        },
      ],
    }
  );

  return Contact;
};
