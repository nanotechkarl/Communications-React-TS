export interface UserState {
  loading: boolean;
  accounts: {
    [key: string]: any;
  };
  current: {
    [key: string]: any;
  };
  edit: {
    [key: string]: any;
  };
  error: string | undefined;
}
