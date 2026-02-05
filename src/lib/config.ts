import { AppConfig } from './types';

export const APPS_CONFIG: AppConfig[] = [
  {
    id: 'mykids',
    name: 'MyKids',
    orderId: 1,
    stores: [
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'es.kidsandus.mykids',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '1435773819',
      },
    ],
  },
  {
    id: 'mylocker',
    name: 'MyLocker',
    orderId: 2,
    stores: [
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'com.kidsandus.alumnos',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '1258072089',
      },
    ],
  },
  {
    id: 'ppbb',
    name: 'P&P and B&B',
    orderId: 3,
    stores: [
      {
        id: 'ms-store',
        name: 'Microsoft Store',
        type: 'microsoft',
        productId: 'xp9m1b7t3zd4lt',
      },
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'com.kidsandus.myway.ppbb.pro',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '6749446790',
      },
      {
        id: 'app-store-macos',
        name: 'App Store macOS',
        type: 'itunes',
        appId: '6749446790',
      },
      {
        id: 'appgallery',
        name: 'Huawei AppGallery',
        type: 'huawei',
        appId: 'C114967515',
      },
    ],
  },
  {
    id: 'animal-planet',
    name: 'Animal Planet',
    orderId: 4,
    stores: [
      {
        id: 'ms-store',
        name: 'Microsoft Store',
        type: 'microsoft',
        productId: 'xpdl11h3qshgpb',
      },
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'com.kidsandus.myway',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '6457362370',
      },
      {
        id: 'app-store-macos',
        name: 'App Store macOS',
        type: 'itunes',
        appId: '6502336967',
      },
      {
        id: 'appgallery',
        name: 'Huawei AppGallery',
        type: 'huawei',
        appId: 'C112233051',
      },
    ],
  },
  {
    id: 'fairy-tales',
    name: 'Fairy Tales',
    orderId: 5,
    stores: [
      {
        id: 'ms-store',
        name: 'Microsoft Store',
        type: 'microsoft',
        productId: 'xpfpb39dqxd8kl',
      },
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'com.kidsandus.myway.fairytales.pro',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '6745816888',
      },
      {
        id: 'app-store-macos',
        name: 'App Store macOS',
        type: 'itunes',
        appId: '6745816888',
      },
      {
        id: 'appgallery',
        name: 'Huawei AppGallery',
        type: 'huawei',
        appId: 'C115098195',
      },
    ],
  },
  {
    id: 'tt-homed-in',
    name: 'T&T Homed In',
    orderId: 6,
    stores: [
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'air.TandTHomedIn',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '1087825783',
      },
    ],
  },
  {
    id: 'grip-2120',
    name: 'GRIP 2120',
    orderId: 7,
    stores: [
      {
        id: 'google-play',
        name: 'Google Play',
        type: 'google-play',
        packageId: 'com.cubusgames.T3GRIP2120',
      },
      {
        id: 'app-store-ios',
        name: 'App Store iOS',
        type: 'itunes',
        appId: '1490417008',
      },
    ],
  },
];
