export class usiLocationOpenCloseController {

    constructor( usiConfigService, usiLocationOpenCloseConfig, $element ) {
        console.log("***USI*** usiLocationOpenCloseController.constructor\n\n");
        this.usiConfigService = usiConfigService;
        this.config = usiLocationOpenCloseConfig;
        this.usilocation = {};
    }

    $onInit() {
        if ( typeof this.afterCtrl.parentCtrl.currLoc === "undefined" ) {
            return;
        }
        try {
            console.log("***USI*** usiLocationOpenCloseController.$onInit\n\n");
            let openLocations = [ '201', '202', '208', '801', '803', '804', '805', '808', '810', '819', '823', '827', '831', '832', '833', '834', '841', '842', '843', '844' ];
            this.usilocation.isopen = ( openLocations.includes( this.afterCtrl.parentCtrl.currLoc.location.subLocationCode ) ) ? true : false;
            this.usilocation.isusi = ( this.afterCtrl.parentCtrl.currLoc.location.organization == '41SLSP_USI' ) ? true : false;
        }
        catch (e) {
            console.error("***USI*** an error occured: usiLocationOpenCloseController.$onInit\n\n");
            console.error(e.message);
            throw(e)
        }
    }
}

usiLocationOpenCloseController.$inject = [ 'usiConfigService', 'usiLocationOpenCloseConfig', '$element' ];