import {usiEditPersonalDetailsModule} from './usi-edit-personal-details/usi-edit-personal-details.module';

export const usiPersonalInfoAfterModule = angular
    .module('usiPersonalInfoAfterModule', [])
        .component('prmPersonalInfoAfter',  {
            bindings: {parentCtrl: '<'},
            template: '<usi-edit-personal-details-component after-ctrl="$ctrl"></usi-edit-personal-details-component>'
        });

usiPersonalInfoAfterModule.requires.push(usiEditPersonalDetailsModule.name);
