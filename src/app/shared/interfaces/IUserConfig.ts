export type AppTheme = 'light' | 'dark';

export interface IUserConfig {
  id?: number;
  expanded: boolean;
  theme: AppTheme;
}
