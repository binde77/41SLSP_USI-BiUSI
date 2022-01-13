// import {usiFeesLinkModule} from './usi-fees-link/usi-fees-link.module';
import {slspFeesLinkModule} from './slsp-fees-link/slsp-fees-link.module';

export const usiRequestAfterModule = angular
    .module('usiRequestAfterModule', [])
        .component('prmRequestAfter',  {
            bindings: {parentCtrl: '<'},
            // template: `<usi-fees-link-component after-ctrl="$ctrl"></usi-fees-link-component>`
            template: `<slsp-fees-link-component after-ctrl="$ctrl"></slsp-fees-link-component>`
        });

usiRequestAfterModule.requires.push(slspFeesLinkModule.name);
