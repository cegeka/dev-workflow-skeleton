import GalleryCtrl from "gallery/gallery.controller";
import CoreModule from "core/core.module";

export default angular
    .module("app.gallery", [CoreModule.name])
    .controller("GalleryCtrl", GalleryCtrl);
