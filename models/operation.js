const { DataTypes } = require('sequelize');

const db = require('../db/connection');
const User = require('./user');

const Operation = db.define('Operation', {
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN,
        // allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Operation;