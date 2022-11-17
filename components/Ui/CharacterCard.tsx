import Image from "next/image";
import React from "react";
import { Character } from "../../pages/titles/[source]/[slug]";

function CharacterCard({ character }: { character: Character }) {
	return (
		<a
			href={`https://anilist.co/character/${character.node.id}/${character.node.name.full}`}
			target="_blank"
			rel="noreferrer"
			className="relative select-none w-full h-28 max-w-[6rem]"
		>
			<Image
				src={
					`https://workers.emanga.tk/fetch?url=` +
					character.node.image.large
				}
				className="rounded-md w-full h-full"
				layout="fill"
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
