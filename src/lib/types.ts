import { StoreConfig } from './scrapers/types';

export interface Store {
  id: string;
  name: string;
  version: string;
  lastUpdateDate: string;
  url: string;
  error?: string;
}

export interface App {
  id: string;
  name: string;
  orderId: number;
  icon: string;
  stores: Store[];
}

export interface AppConfig {
  id: string;
  name: string;
  orderId: number;
  stores: (StoreConfig & { name: string })[];
}

export interface DashboardData {
  lastUpdate: string;
  apps: App[];
}
