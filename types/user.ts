export type User = {
  id: number;
  firstName: string;
  lastName: string;
  balance: {
    PLN: number;
    EUR: number;
    USD: number;
  };
};
