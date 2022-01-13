export class slspFeesLinkController {

	constructor(usiConfigService, slspFeesLinkConfig, $element) {
        this.usiConfigService = usiConfigService;
        this.config = slspFeesLinkConfig;
		this.$element = $element[0];
        this.form = this.$element.parentElement.parentElement;
	}

	$doCheck() {
		let form = false;
		let formLength = 2;

		if (this.form.children[0].children[1] !== undefined && this.form.children[0].children[1].children[0] !== undefined) {
			form = this.form.children[0].children[1].children[0];
		}
		else if (this.form.children[0].children[0] !== undefined && this.form.children[0].children[0].children[0] !== undefined) {
			form = this.form.children[0].children[0].children[0];
			formLength = 3;
		}

		//create and insert fees info block if not present
		if (form && form.children.length == formLength) {
			let info = document.createElement('DIV');
			info.className = "courier-info bar alert-bar";
			info.innerHTML =
				`<h4>${this.usiConfigService.getLabel(this.config, 'feesTitle')}</h4>
				<p>${this.usiConfigService.getLabel(this.config, 'feesInfo')}</p>
				<p><a href="${this.usiConfigService.getLabel(this.config, 'feesUrl')}"
				target="_blank">${this.usiConfigService.getLabel(this.config, 'feesLinkText')}</a></p>`;
			form.insertBefore(info, form.children[formLength - 1]);
		}
	}
}

slspFeesLinkController.$inject = [ 'usiConfigService', 'slspFeesLinkConfig', '$element' ];