import { Optional } from "sequelize";

export interface SavingAttributes {
  savingID: number;  // This is required for the created instance (auto-incremented by DB)
  userID: number;
  title: string;
  goalAmount: number;
  currentAmount: number;
  createdAt?: Date;  // Managed by Sequelize (timestamps: true)
  updatedAt?: Date;  // Managed by Sequelize (timestamps: true)
}

export interface SavingCreationAttributes extends Optional<SavingAttributes, 'savingID'> {}
