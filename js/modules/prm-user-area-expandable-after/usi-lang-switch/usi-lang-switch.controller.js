export class usiLangSwitchController {

    constructor($element, $window) {
        console.log("***USI*** usiLangSwitchControler constructor");
        this.$parent = $element.parent().parent()[0];
        this.parentCtrl = this.afterCtrl.parentCtrl;
        this.$window = $window;
    }

    $onInit() {
        try {
            this.languages = ["it","en","de","fr"];
            if (!this.languages.includes(this.parentCtrl.lang)) {
                this.changeLanguage("en");
            }
        }
        catch (e) {
            console.error("***USI*** usiLangSwitchControler $onInit");
            console.error(e.message);
        }
    };

    changeLanguage(lang) {
        this.parentCtrl.changeLangService.addLangParamToUrl(lang);
        let t = this.parentCtrl;
        this.parentCtrl.i18nService.setLanguage(lang).then(function(){
            t.$timeout(function(){return t.$state.go(t.$state.current,{lang:lang},{reload:!0})})
        });
 };

}
usiLangSwitchController.$inject = ['$element'];