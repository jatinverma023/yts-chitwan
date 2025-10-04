const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/database');

const Contact = () => {
  const sequelize = getSequelize();
  
  if (!sequelize) {
    throw new Error('Database not initialized');
  }

  return sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 5000]
      }
    },
    inquiryType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'inquiry_type'
    },
    status: {
      type: DataTypes.ENUM('pending', 'read', 'replied', 'archived'),
      defaultValue: 'pending'
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ip_address'
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_agent'
    }
  }, {
    tableName: 'contacts',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['email']
      },
      {
        fields: ['status']
      },
      {
        fields: ['created_at']
      }
    ]
  });
};

module.exports = Contact;