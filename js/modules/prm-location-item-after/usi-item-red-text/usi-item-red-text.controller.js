export class usiItemRedTextController {

    constructor( usiConfigService, usiItemRedTextConfig, $element ) {
        console.log("***USI*** usiItemRedTextController.constructor\n\n");
        this.usiConfigService = usiConfigService;
        this.config = usiItemRedTextConfig;
        this.element = $element[0];
    }

    $doCheck() {
        // correct english-only policy names
        const itempolicyElement = this.element.parentElement.parentElement.children[0].children[0].children[0].children[1];

        if ( typeof itempolicyElement === "undefined" ) {
            return;
        }

    	if ( itempolicyElement.innerText == 'Same Day Loan') {
    		itempolicyElement.innerText = this.usiConfigService.getLabel(this.config, 'sameday');
    		itempolicyElement.style.color = "red";
    	}
    	if ( itempolicyElement.innerText == '28 Days Loan') {
    		itempolicyElement.innerText = this.usiConfigService.getLabel(this.config, 'twentyeight');
    	}
    	if ( itempolicyElement.innerText == '7 Days Loan') {
    		itempolicyElement.innerText = this.usiConfigService.getLabel(this.config, 'seven');
    	}
    	itempolicyElement.style["font-size"] = "14px";
    }

    // $onInit() {
    getText() {
        this.itemtext = "I'm the getText() item text";
        this.holdinglocation = {
            message: false,
            btm: false,
            text: "",
            contactlink: ""
        };
        try {
            console.log("***USI*** usiItemRedText.$onInit\n\n");

            // this.meaa = ( this.afterCtrl.parentCtrl.loc.location.libraryCode == 'MEAA' ) ? true : false;
            // console.log(this.meaa);

            switch( this.afterCtrl.parentCtrl.loc.location.subLocationCode ) {
                case '820':
                	this.holdinglocation.message = true;
                	this.holdinglocation.text = this.usiConfigService.getLabel(this.config, 'labisalp');
                    break;
				case '845':
                	this.holdinglocation.message = true;
	                this.holdinglocation.text = this.usiConfigService.getLabel(this.config, 'cattedre');
	                break;
				case '809':
                    this.holdinglocation.message = true;
                	this.holdinglocation.btm = true;
	                this.holdinglocation.text = this.usiConfigService.getLabel(this.config, 'btm');
					this.holdinglocation.contactlink = ( this.usiConfigService.getLanguage() == 'it' ) ? 'http://www.arc.usi.ch/it/btm' : 'https://www.arc.usi.ch/en/risorse-e-servizi/servizi/biblioteca-tecnica-e-dei-materiali';
	                break;
				case '810':
                	this.holdinglocation.message = true;
	                this.holdinglocation.text = this.usiConfigService.getLabel(this.config, 'sequential');
	                break;
				default:
                	this.holdinglocation = 'normal';
            }
            return this.holdinglocation;

        }
        catch (e) {
            console.error("***USI*** an error occured: usiItemRedTextController.$onInit\n\n");
            console.error(e.message);
            throw(e)
        }
    }
}

usiItemRedTextController.$inject = [ 'usiConfigService', 'usiItemRedTextConfig', '$element' ];