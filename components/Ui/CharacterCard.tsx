import Image from "next/image";
import React from "react";
import { Character } from "../../pages/titles/[source]/[slug]";

function CharacterCard({ character }: { character: Character }) {
	return (
		<a
			href={`https://anilist.co/character/${character.node.id}/${character.node.name.full}`}
			target="_blank"
			rel="noreferrer"
			className="w-full"
		>
			<div className="relative select-none w-full h-28 max-w-[6rem]">
				<Image
					src={
						`https://workers.emanga.tk/fetch?url=` +
						character.node.image.large
					}
					className="rounded-md w-full h-full"
					layout="fill"
					objectFit="cover"
					alt={character.node.name.full}
				></Image>
				<div className="absolute flex bottom-1 inset-x-2">
					<span className="p-0.5 px-1 rounded-md text-center text-[0.65rem] flex items-center justify-center md:text-xs w-full bg-root">
						{character.role
							.replace(/./g, (str) => str.toLocaleLowerCase())
							.replace(/./, (str) => str.toLocaleUpperCase())}
					</span>
				</div>
			</div>
			<span className="text-sm line-clamp-1">
				{character.node.name.full}
			</span>
		</a>
	);
}

export default CharacterCard;
