const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/database');

const Event = () => {
  const sequelize = getSequelize();
  
  if (!sequelize) {
    throw new Error('Database not initialized');
  }

  return sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.ENUM('workshop', 'seminar', 'competition', 'meetup', 'conference', 'other'),
      defaultValue: 'workshop'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    registeredCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'registered_count'
    }
  }, {
    tableName: 'events',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['date']
      },
      {
        fields: ['category']
      },
      {
        fields: ['is_active']
      }
    ]
  });
};

module.exports = Event;