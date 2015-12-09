import CoreModule from "core/core.module";
import WidgetModule from "widgets/widgets.module";
import GalleryModule from "gallery/gallery.module";
import SetupDateModule from "setup-date/setup-date.module";
import PetcupidAppCtrl from "app.route";

angular
    .module("petcupidApp", [
        /* Shared modules */
        CoreModule.name,
        WidgetModule.name,

        /* Components */
        GalleryModule.name,
        SetupDateModule.name
    ])
    .controller("PetcupidAppCtrl", PetcupidAppCtrl);
