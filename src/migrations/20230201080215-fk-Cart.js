"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addConstraint("Cart", {
            fields: ["userId"],
            type: "foreign key",
            name: "User_Order_userId_fk",
            references: {
                table: "User",
                field: "userId",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("Cart", "User_Order_userId_fk");
    },
};