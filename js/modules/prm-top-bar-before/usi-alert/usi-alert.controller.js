export class usiAlertController {
    constructor($http, usiConfigService) {
        this.usiConfigService = usiConfigService;
        let lang = this.usiConfigService.getLanguage();
        console.log(lang);
    }
}

usiAlertController.$inject = [ '$http', 'usiConfigService' ];

