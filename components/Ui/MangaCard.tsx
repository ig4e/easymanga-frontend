import Image from "next/image";
import React from "react";
import { Manga } from "../../typings/manga";

function MangaCard({ manga }: { manga: Manga }) {
	return <div className="min-h-[250px] min-w-[180px] w-full h-full">
        <Image src = {manga.cover} width={180} height={250}></Image>
    </div>;
}

export default MangaCard;
