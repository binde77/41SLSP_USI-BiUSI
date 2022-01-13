import {usiLocationOpenCloseModule} from './usi-location-open-close/usi-location-open-close.module';

export const usiLocationHoldingsAfterModule = angular
    .module('usiLocationHoldingsAfterModule', [])
        .component('prmLocationHoldingsAfter',  {
            bindings: {parentCtrl: '<'},
            template: '<usi-location-open-close-component after-ctrl="$ctrl"></usi-location-open-close-component>'
        });

usiLocationHoldingsAfterModule.requires.push(usiLocationOpenCloseModule.name);