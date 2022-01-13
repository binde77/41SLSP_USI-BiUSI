import {usiLocationItemsAfterModule} from './modules/prm-location-items-after/usi-location-items-after.module';
import {usiLocationHoldingsAfterModule} from './modules/prm-location-holdings-after/usi-location-holdings-after.module';
import {usiLocationItemAfterModule} from './modules/prm-location-item-after/usi-location-item-after.module';
import {usiPersonalInfoAfterModule} from './modules/prm-personal-info-after/usi-personal-info-after.module';
import {usiUserAreaExpandableAfterModule} from './modules/prm-user-area-expandable-after/usi-user-area-expandable-after.module';
import {usiRequestAfterModule} from './modules/prm-request-after/usi-request-after.module';
import {usiAlmaHowovpAfterModule} from './modules/alma-howovp-after/alma-how-after.module';
import {slspHttpInterceptRequests} from './modules/slsp-http-intercept-requests/slsp-http-intercept-requests.module';

let app = angular.module('viewCustom', ['angularLoad']);

app.requires.push(usiLocationItemsAfterModule.name);
app.requires.push(usiLocationHoldingsAfterModule.name);
app.requires.push(usiLocationItemAfterModule.name);
app.requires.push(usiPersonalInfoAfterModule.name);
app.requires.push(usiUserAreaExpandableAfterModule.name);
app.requires.push(usiRequestAfterModule.name);
app.requires.push(usiAlmaHowovpAfterModule.name);
app.requires.push(slspHttpInterceptRequests.name);