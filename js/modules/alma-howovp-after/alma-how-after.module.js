import {usiHowovpModule} from './usi-howovp/usi-howovp.module';

export const usiAlmaHowovpAfterModule = angular
    .module('usiAlmaHowovpAfterModule', [])
        .component('almaHowovpAfter',  {
            bindings: {parentCtrl: '<'},
            template: '<usi-howovp-component after-ctrl="$ctrl"></usi-howovp-component>'
        });

usiAlmaHowovpAfterModule.requires.push(usiHowovpModule.name);