import { AccountType } from './CollectionLog';

export interface HiscoresData {
  rank: number;
  username: string;
  account_type: AccountType;
  obtained: number;
  total: number;
  recent_obtained: number;
}
