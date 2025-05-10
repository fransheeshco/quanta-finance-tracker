import { Op } from 'sequelize';

export const buildQueryOptions = ({
  filters = {},
  sort = {},
}: {
  filters?: Record<string, any>;
  sort?: Record<string, 'asc' | 'desc'>;
}) => {
  const where: Record<string, any> = {};
  const order: any[] = [];

  // Filtering
  for (const [key, value] of Object.entries(filters)) {
    if (value == null) continue;
  
    // Use direct equality for ENUM fields like 'transactionType'
    if (key === 'transactionType') {
      where[key] = value; // Direct match, no ILIKE
    } else if (typeof value === 'string') {
      where[key] = { [Op.iLike]: `%${value}%` };
    } else {
      where[key] = value;
    }
  }  

  // Sorting
  for (const [key, direction] of Object.entries(sort)) {
    order.push([key, direction.toUpperCase()]);
  }

  return { where, order };
};
