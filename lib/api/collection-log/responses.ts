export interface BaseResponse {
  error?: string;
  message?: string;
}

export type APIResponse<K extends string, T> = BaseResponse & {
  [key in K]: T;
};

export type CollectionLogResponse = APIResponse<'collectionLog', CollectionLog>;
export type HiscoresResponse = APIResponse<'hiscores', Hiscores[]>;
export type ItemsResponse = APIResponse<'items', CollectionLogItem[]>;
export type RankResponse = APIResponse<'rank', number>;
export type RanksResponse = APIResponse<'accountTypeRanks', Ranks>;
export type UserResponse = APIResponse<'user', User>;
export type UserCountResponse = APIResponse<'count', number>;
export type UserListResponse = APIResponse<'users', User[]>;
export type UserSettingsResponse = APIResponse<'userSettings', UserSettings>;
