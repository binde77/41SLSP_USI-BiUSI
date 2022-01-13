import {usiLangSwitchModule} from './usi-lang-switch/usi-lang-switch.module';
import {usiIllSigninOrderLoggedOutModule} from './usi-ill-signin-order-logged-out/usi-ill-signin-order-logged-out.module';

export const usiUserAreaExpandableAfterModule = angular
    .module('usiUserAreaExpandableAfterModule', [])
        .component('prmUserAreaExpandableAfter',  {
            bindings: {parentCtrl: '<'},
            template: '<usi-lang-switch-component after-ctrl="$ctrl"></usi-lang-switch-component><usi-ill-signin-order-logged-out-component fter-ctrl="$ctrl"></usi-ill-signin-order-logged-out-component>'
        });

usiUserAreaExpandableAfterModule.requires.push(usiLangSwitchModule.name);
usiUserAreaExpandableAfterModule.requires.push(usiIllSigninOrderLoggedOutModule.name);