export interface UserState {
  loading: boolean;
  accounts: [];
  current: {
    [key: string]: any;
  };
  edit: {
    [key: string]: any;
  };
  error: string | undefined;
}
