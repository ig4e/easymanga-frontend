import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { url, q } = req.query as { [index: string]: string };
	const { data } = await axios({ url: url, responseType: "arraybuffer" });
	res.setHeader("content-type", "image/webp");
	res.status(200).send(
		await sharp(data)
			.webp({ quality: Number(q) || 100 })
			.toBuffer(),
	);
};
