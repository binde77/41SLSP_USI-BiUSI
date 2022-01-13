export class usiHowovpController {
    constructor(usiConfigService, usiHowovpConfig) {
        this.usiConfigService = usiConfigService;
        this.usiHowovpConfig = usiHowovpConfig;
    }

    $doCheck() {
        let ill = angular.element(document.querySelector('alma-howovp md-list-item span[translate]'));
        console.log(ill);
        if (ill.length) {
            let span = document.createElement('div');
            let title = this.usiConfigService.getLabel(this.usiHowovpConfig, 'ill');
            //this.afterCtrl.parentCtrl.$translate.instant('mainmenu.label.BlankIll');
            
            // span.innerHTML = '<h3>' + this.usiConfigService.getLabel(this.usiHowovpConfig, 'ill') + '</h3>' + this.usiConfigService.getLabel(this.usiHowovpConfig, 'msg').replace('""', '<strong>"' + this.usiConfigService.getLabel(this.usiHowovpConfig, 'title') +'"</strong>');
            span.innerHTML = this.usiConfigService.getLabel(this.usiHowovpConfig, 'msg').replace('""', '<strong>"' + this.usiConfigService.getLabel(this.usiHowovpConfig, 'title') +'"</strong>');
            ill[0].replaceWith(span);
            let howovp = angular.element(document.querySelector('alma-howovp'));
            let ovpTitle = document.createElement('h3');
            ovpTitle.className = 'medium-uppercase-bold ill';
            ovpTitle.innerHTML = '<br><span>' + title + '</span>';
            howovp[0].insertBefore(ovpTitle,howovp[0].children[0]);
        }
    }
}

usiHowovpController.$inject = [ 'usiConfigService', 'usiHowovpConfig' ];

