import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Url } from "../models/Url";
import { nanoid } from "nanoid";
import * as yup from 'yup';

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

    const schema = yup.object().shape({
      url: yup
        .string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Url inválida'
        )
        .required("Url é obrigatória")
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    const urlsRepository = getRepository(Url);

    // Verify existing Url
    const urlAlreadyExists = await urlsRepository.findOne({ originalUrl: url });

    if (urlAlreadyExists) {
      return res.status(200).json({
        newUrl: `${process.env.BASE_URL}/${urlAlreadyExists.shortUrl}`
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
      newUrl: `${process.env.BASE_URL}/${shortUrl}`
    });
  }
}

export { UrlController };