import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { url, q } = req.query as { [index: string]: string };
	const { data } = await axios({ url: url, responseType: "arraybuffer" });
	const quality = Number(q) || 100;
	let convert: Buffer;

	if (quality < 50) {
		res.setHeader("content-type", "image/webp");
	} else {
		res.setHeader("content-type", "image/jpeg");
	}

	try {
		if (quality < 50) {
			convert = await sharp(data).webp({ quality: quality }).toBuffer();
		} else {
			convert = await sharp(data).jpeg({ quality: quality }).toBuffer();
		}
	} catch {
		convert = data;
	}

	res.status(200).send(convert);
};
