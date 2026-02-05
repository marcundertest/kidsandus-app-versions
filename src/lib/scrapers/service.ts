import { IScraper, ScrapeResult, StoreConfig } from './types';
import { ScraperFactory } from './factory';
import { App, Store, AppConfig } from '../types';

export class ScraperService {
  async scrapeAll(apps: AppConfig[]): Promise<{ lastUpdate: string; apps: App[] }> {
    const results: App[] = [];

    for (const app of apps) {
      const appData: App = {
        id: app.id,
        name: app.name,
        orderId: app.orderId,
        icon: '',
        stores: [],
      };

      const scrapePromises = app.stores.map(async (store: StoreConfig & { name: string }) => {
        try {
          const scraper = ScraperFactory.getScraper(store.type);
          const result = await this.scrapeWithRetry(scraper, store);

          if (!appData.icon && result.icon) {
            appData.icon = result.icon;
          }

          return {
            id: store.id,
            name: store.name,
            version: result.version,
            lastUpdateDate: result.lastUpdateDate,
            url: this.getStoreUrl(store),
          } as Store;
        } catch {
          return {
            id: store.id,
            name: store.name,
            version: 'N/A',
            lastUpdateDate: 'N/A',
            url: this.getStoreUrl(store),
          } as Store;
        }
      });

      appData.stores = await Promise.all(scrapePromises);
      results.push(appData);
    }

    return {
      lastUpdate: new Date().toISOString(),
      apps: results,
    };
  }

  private async scrapeWithRetry(
    scraper: IScraper,
    config: StoreConfig,
    retries = 3
  ): Promise<ScrapeResult> {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        return await scraper.scrape(config);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }

  private getStoreUrl(store: StoreConfig): string {
    switch (store.type) {
      case 'microsoft':
        return `https://apps.microsoft.com/detail/${store.productId}`;
      case 'google-play':
        return `https://play.google.com/store/apps/details?id=${store.packageId}`;
      case 'itunes':
        return `https://apps.apple.com/app/id${store.appId}`;
      case 'huawei':
        return `https://appgallery.huawei.com/app/${store.appId}`;
      default:
        return '#';
    }
  }
}
