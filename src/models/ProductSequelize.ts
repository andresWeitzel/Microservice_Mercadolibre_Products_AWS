//External
const { DataTypes } = require('sequelize');
//DB
const { config } = require('../db/config');


/**
 * @description database product model with their respective fields and constraints
 */
export const Product = config.define("product", {
    id: {
        type: DataTypes.INTEGER
        , allowNull: true
        , primaryKey: true
    },
    site_id: {
        type: DataTypes.STRING(20)
        , allowNull: false
    },
    title: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING(100)
        , allowNull: true
    },
    seller_id: {
        type: DataTypes.INTEGER(20)
        , allowNull: false
    },
    category_id: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    official_store_id: {
        type: DataTypes.STRING(100)
        , allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(6,3)
        , allowNull: false
    },
    base_price: {
        type: DataTypes.DECIMAL(6,3)
        , allowNull: false
    },
    original_price: {
        type: DataTypes.DECIMAL(6,3)
        , allowNull: false
    },
    initial_quantity: {
        type: DataTypes.DECIMAL(6,3)
        , allowNull: false
    },
    available_quantity: {
        type: DataTypes.DECIMAL(6,3)
        , allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE
        , allowNull: false
    },
    update_date: {
        type: DataTypes.DATE
        , allowNull: false
    }
},
    {
        timestamps: false
    });

