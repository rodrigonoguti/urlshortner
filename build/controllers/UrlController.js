"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlController = void 0;
const typeorm_1 = require("typeorm");
const Url_1 = require("../models/Url");
const nanoid_1 = require("nanoid");
class UrlController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shortUrl } = req.params;
            const urlsRepository = typeorm_1.getRepository(Url_1.Url);
            const originalUrl = yield urlsRepository.findOne({ shortUrl });
            if (originalUrl) {
                return res.redirect(originalUrl.originalUrl);
            }
            else {
                return res.status(404).json({
                    error: "URL não encontrada!"
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            const urlsRepository = typeorm_1.getRepository(Url_1.Url);
            // Verify existing Url
            const urlAlreadyExists = yield urlsRepository.findOne({ originalUrl: url });
            if (urlAlreadyExists) {
                return res.json({
                    newUrl: `${process.env.BASE_URL}/${urlAlreadyExists.shortUrl}`
                });
            }
            // Short Url
            const shortUrl = nanoid_1.nanoid(10);
            // Save database
            const urlObj = urlsRepository.create({
                originalUrl: url,
                shortUrl: shortUrl
            });
            yield urlsRepository.save(urlObj);
            return res.json({
                newUrl: `${process.env.BASE_URL}/${shortUrl}`
            });
        });
    }
}
exports.UrlController = UrlController;
