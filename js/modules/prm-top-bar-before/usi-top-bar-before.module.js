import {usiAlertModule} from './usi-alert/usi-alert.module';

export const usiTopBarBeforeModule = angular
    .module('usiTopBarBeforeModule', [])
        .component('prmTopBarBefore',  {
            template: '<usi-alert-component after-ctrl="$ctrl"></usi-alert-component>'
        });

usiTopBarBeforeModule.requires.push(usiAlertModule.name);
