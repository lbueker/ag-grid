"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../scene/shape/path");
const bbox_1 = require("../../scene/bbox");
class Marker extends path_1.Path {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
        this.size = 12;
    }
    computeBBox() {
        const { x, y, size } = this;
        const half = size / 2;
        return new bbox_1.BBox(x - half, y - half, size, size);
    }
}
__decorate([
    path_1.ScenePathChangeDetection()
], Marker.prototype, "x", void 0);
__decorate([
    path_1.ScenePathChangeDetection()
], Marker.prototype, "y", void 0);
__decorate([
    path_1.ScenePathChangeDetection({ convertor: Math.abs })
], Marker.prototype, "size", void 0);
exports.Marker = Marker;
