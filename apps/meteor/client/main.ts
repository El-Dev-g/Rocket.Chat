import { accounts } from './meteor/facade/accounts';
import './startup/fakeUserPresence';
import './serviceWorker';

accounts.attachEmailVerification();

import('@rocket.chat/fuselage-polyfills')
	.then(() => import('./meteor/overrides'))
	.then(() => import('./ecdh'))
	.then(() => import('./importPackages'))
	.then(() => import('./startup'))
	.then(() => import('./omnichannel'))
	.then(() => Promise.all([import('./views/admin'), import('./views/marketplace'), import('./views/account')]));
