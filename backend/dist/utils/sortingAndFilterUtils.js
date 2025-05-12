"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryOptions = void 0;
const sequelize_1 = require("sequelize");
const buildQueryOptions = ({ filters = {}, sort = {}, }) => {
    const where = {};
    const order = [];
    // Filtering
    for (const [key, value] of Object.entries(filters)) {
        if (value == null)
            continue;
        // Use direct equality for ENUM fields like 'transactionType'
        if (key === 'transactionType') {
            where[key] = value; // Direct match, no ILIKE
        }
        else if (typeof value === 'string') {
            where[key] = { [sequelize_1.Op.iLike]: `%${value}%` };
        }
        else {
            where[key] = value;
        }
    }
    // Sorting
    for (const [key, direction] of Object.entries(sort)) {
        order.push([key, direction.toUpperCase()]);
    }
    return { where, order };
};
exports.buildQueryOptions = buildQueryOptions;
