export class usiFeesLinkController {

    constructor(usiConfigService, usiFeesLinkConfig, $element) {
        this.usiConfigService = usiConfigService;
        this.config = usiFeesLinkConfig;
        this.$element = $element[0];
        this.form = this.$element.parentElement.parentElement;
        this.reset = false;
        this.service = false;
    }


    $doCheck() {
      let form = false;
      let service = false;
      let index = 1;
      let formType = false;

      // Two kind of forms, apparently...
      // Check for type A
      if (this.form.children[0].children[1] !== undefined) {
        if (this.form.children[0].children[1].children[0] !== undefined) {
            form = this.form.children[0].children[1].children[0];
            formType = "Type A";
        }
        console.log("Form type A. The index is 1");
      }
      // Check for type B
      else if (this.form.children[0].children[0] !== undefined) {
        
        form = this.form.children[0].children[0].children[0];
        formType = "Type B";

        let label = form.querySelector('prm-form-field:not(.hide) label[translate="almaResourceSharing.maximumFee"]');
        if (label) {
          label.parentNode.parentNode.parentNode.classList.add("hide");
        }
        index = 2;
        console.log("Form type B. The index is 2");
      }

      if (form) {
        if (this.afterCtrl.parentCtrl.formData) {
          if (this.afterCtrl.parentCtrl.formData.requestType) {
            // prenotazione
            service = 'holding';
            index = 0;
            console.log("Service > holding. The index is 0");
            let pickUp = false;
            if (this.afterCtrl.parentCtrl.formData.pickupLocation || this.afterCtrl.parentCtrl.formData.pickupLocationFulNet) {
              if (this.afterCtrl.parentCtrl.formData.pickupLocation) {
                pickUp = this.afterCtrl.parentCtrl.formData.pickupLocation.split('$$');
              }
              else {
                pickUp = this.afterCtrl.parentCtrl.formData.pickupLocationFulNet.split('$$');
              }
            }
            if (pickUp && this.afterCtrl.parentCtrl.$scope.$$prevSibling.$parent.$parent.$ctrl.loc !== undefined) {
              index = 1;
              console.log("We know pickup. The index is 1");
              let length = this.afterCtrl.parentCtrl.$scope.$$prevSibling.$parent.$parent.$ctrl.loc.location.holKey.length;
              let holKey = this.afterCtrl.parentCtrl.$scope.$$prevSibling.$parent.$parent.$ctrl.loc.location.holKey.substring(18,length-1);
              let location = holKey.split(', ')[1].substring(10);
              // USI-MEAA location: 112056030005507 (?)
              // USI-BUL location: 112055800005507 (?)
              if (location == pickUp[0]) {
                service = "intern";
              }
              else if (pickUp[1].slice(-8) == '_ADDRESS') {
                service = "home";
              }
              else {
                if (this.afterCtrl.parentCtrl.formData.pickupInstitution == "41SLSP_USI" || this.afterCtrl.parentCtrl.formData.pickupInstitutionFulNet == "41SLSP_USI") {

                  switch (location) {
                    case '112056030005507':
                      service = 'usiPickupBul';
                      break;                  
                    default:
                      service = 'usiPickupMeaa';
                      break;
                  }                  
                }
                else {
                    service = 'slsp';
                }
              }
            }
          }
          else if (this.afterCtrl.parentCtrl.formData.partial) {
            service = "copy"
          }
          else if (this.afterCtrl.parentCtrl.formData.citationType) {
            service = "ill" + this.afterCtrl.parentCtrl.formData.citationType;
          }
          
        }
        let groupuserGroup = this.usiConfigService.getUsergroup();
        // "99" internal staff
        // "USI_MEAA_Fac-Staff" = USI-Faculty and Staff
        // "USI_MEAA_Student" = USI-Student

        // cross service and usergroup
        if ( groupuserGroup == "USI_MEAA_Fac-Staff" || groupuserGroup == "USI_MEAA_Student" ) {
          if ( service == 'illBK' || service == 'illCR' ) {
            service = "illMEAA";
          }
        }

        if (service != this.service) {
          let infoBlock = document.getElementById('info-block');
          if (infoBlock) {
            infoBlock.remove();
          }
          this.service = service;
        }
        else if ((form.children.length == 2 && this.service && index < 2) || (form.children.length == 3 && index == 2)) {
          
          if ( service == "usiPickupBul" || groupuserGroup == "usiPickupMeaa" ) {
            service = "slspCourierToUSIForAffiliates";
            if ( groupuserGroup != "USI_MEAA_Fac-Staff" || groupuserGroup != "USI_MEAA_Student" ) {
              service = "slspCourierToUSIForNonAffiliates";
            }
          }

          let info = document.createElement('DIV');
          info.setAttribute("id", "info-block");
          info.setAttribute("style", "height: auto;");
          info.className = "fees bar alert-bar " + service;
          info.innerHTML =
            `<h4>${this.usiConfigService.getLabel(this.config, service)}</h4>
            <p><a href="${this.usiConfigService.getLabel(this.config, 'linkUrl')}" target="_blank">${this.usiConfigService.getLabel(this.config, 'link')} <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon></a></p>`;
          if (this.service == 'holding') {
            info.innerHTML = info.innerHTML + `<p>${this.usiConfigService.getLabel(this.config, 'holdingText')}</p>`;

          }
          
          // TEST
          if (this.service != 'holding') {
          form.insertBefore(info, form.children[index]);
          }
        }
        else {
        }
      }
    }
}

usiFeesLinkController.$inject = [ 'usiConfigService', 'usiFeesLinkConfig', '$element' ];