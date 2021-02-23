import { Router } from "express";
import { UrlController } from "./controllers/UrlController"

const router = Router();

const urlController = new UrlController();

router.post("/encurtador", urlController.create);
router.get("/:shortUrl", urlController.get);

export { router };