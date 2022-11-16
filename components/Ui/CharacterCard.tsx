import Image from "next/image";
import React from "react";
import { Character } from "../../pages/titles/[source]/[slug]";

function CharacterCard({ character }: { character: Character }) {
	return (
		<a
			href={`https://anilist.co/character/${character.node.id}/${character.node.name.full}`}
			target="_blank"
			rel="noreferrer"
			className="relative select-none"
		>
			<Image
				src={
					`https://workers.emanga.tk/fetch?url=` +
					character.node.image.large
				}
				className="rounded-md"
				width={86}
				height={128}
                objectFit="cover"
			></Image>

			<span className="left-1 bottom-2.5 p-0.5 px-1 rounded-md  text-xs absolute bg-base">
				{character.role
					.replace(/./g, (str) => str.toLocaleLowerCase())
					.replace(/./, (str) => str.toLocaleUpperCase())}
			</span>
		</a>
	);
}

export default CharacterCard;
