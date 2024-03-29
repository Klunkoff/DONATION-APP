import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environments';

import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  export { db };