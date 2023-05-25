
//External
import { DataTypes } from "sequelize";
//DB
import { dbConnection } from "src/db/config";


/**
 * @description database product specification model with their respective fields and constraints
 */
export const ProductSpecifSequelize = dbConnection.define("products_specifications", {
    id: {
        type: DataTypes.INTEGER
        , allowNull: true
        , primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER
        , allowNull: false
    },
    specification_uuid: {
        type: DataTypes.STRING(500)
        , allowNull: false
    },
    //YYYY-MM-DD hh:mm:ss
    stop_time: {
        type: DataTypes.STRING(19)
        , allowNull: false
    },
    //YYYY-MM-DD hh:mm:ss
    creation_date: {
        type: DataTypes.STRING(19)
        , allowNull: false
    },
    //YYYY-MM-DD hh:mm:ss
    update_date: {
        type: DataTypes.STRING(19)
        , allowNull: false
    }
},
    {
        timestamps: false
    });

