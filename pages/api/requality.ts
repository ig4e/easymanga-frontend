import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { url, q } = req.query as { [index: string]: string };
	const { data } = await axios({ url: url, responseType: "arraybuffer" });
	res.setHeader("content-type", "image/jpeg");

	let convert: Buffer;

	try {
		convert = await sharp(data)
			.jpeg({ quality: Number(q) || 100 })
			.toBuffer();
	} catch {
		convert = data;
	}

	res.status(200).send(convert);
};
