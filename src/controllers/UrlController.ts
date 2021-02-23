import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Url } from "../models/Url";
import { nanoid } from "nanoid";

class UrlController {

  async get(req: Request, res: Response) {
    const { shortUrl } = req.params;

    const urlsRepository = getRepository(Url);

    const originalUrl = await urlsRepository.findOne({ shortUrl });

    if (originalUrl) {
      return res.redirect(originalUrl.originalUrl);
    } else {
      return res.status(404).json({
        error: "URL não encontrada!"
      });
    }
  }

  async create(req: Request, res: Response) {
    const { url } = req.body;

    const urlsRepository = getRepository(Url);

    // Verify existing Url
    const urlAlreadyExists = await urlsRepository.findOne({ originalUrl: url });

    if (urlAlreadyExists) {
      return res.json({
        newUrl: `${process.env.BASE_URL}:${process.env.PORT}/${urlAlreadyExists.shortUrl}`
      });
    }

    // Short Url
    const shortUrl = nanoid(10);

    // Save database
    const urlObj = urlsRepository.create({
      originalUrl: url,
      shortUrl: shortUrl
    });

    await urlsRepository.save(urlObj);

    return res.json({
      newUrl: `${process.env.BASE_URL}:${process.env.PORT}/${shortUrl}`
    });
  }
}

export { UrlController };