export class usiLinksController {
    constructor(usiConfigService, usiLinksConfig) {
        this.usiConfigService = usiConfigService;
        this.usiLinksConfig = usiLinksConfig;
    }

    $onInit() {
        try {
            console.log("***USI*** usiLinksController.$onInit\n\n");
        }
        catch (e) {
            console.error("***USI*** an error occured: usiLinksController.$onInit\n\n");
            console.error(e.message);
            throw(e)
        }
    }

    getLibrary() {
        if ( typeof this.afterCtrl.parentCtrl.currLoc === "undefined" ) {
            return;
        }
        return this.afterCtrl.parentCtrl.currLoc.location.librarycodeTranslation;
    }

    getLink() {
        if ( typeof this.afterCtrl.parentCtrl.loc === "undefined" && typeof this.afterCtrl.parentCtrl.currLoc  === "undefined" ) {
            return;
        }
        if (this.afterCtrl.parentCtrl.loc.location.libraryCode == 'MEAA' || this.afterCtrl.parentCtrl.currLoc.location.libraryCode == 'MEAA') {
            // return 'http:\/\/biblio.arc.usi.ch';
            return this.usiConfigService.getLabel(this.usiLinksConfig, 'mendrisio');
        }
        else if (this.afterCtrl.parentCtrl.loc.location.libraryCode == 'LUBUL' || this.afterCtrl.parentCtrl.currLoc.location.libraryCode == 'LUBUL'){
            return this.usiConfigService.getLabel(this.usiLinksConfig, 'lugano');
        }
        else {
            return `https:\/\/registration.slsp.ch\/libraries\/\?library\=${this.afterCtrl.parentCtrl.loc.location.libraryCode}`;
        }
    }

    getStyle() {
        return '';
    }

    getMEAAclosureMessage() {
        // check if today is in given closure range
        var today = new Date().getTime();
        // the month is 0-indexed! For example, new Date(1995, 11, 17) resolves to December 17, 1995
        var from = new Date(2021, 6, 21).getTime();
        var to = new Date(2021, 7, 8).getTime();
        var withinRange = today >= from && today <= to;
        // return closure message, or return false
        if ( withinRange ) {
            switch ( this.afterCtrl.parentCtrl.userSessionManagerService.attributesMap.interfaceLanguage ) {
                case "it":
                return "Attenzione: servizi sospesi per chiusura estiva dal 26 luglio all’8 agosto"
                break;
                default:
                return "Attention: services suspended due to summer closure from 26 July to 8 August"
            }
        }
        else {
            return false;
        }
    }
}

usiLinksController.$inject = [ 'usiConfigService', 'usiLinksConfig' ];