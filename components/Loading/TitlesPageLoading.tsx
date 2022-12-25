import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import PageLayout from "../../components/Ui/PageLayout";
import { MANGA_FIELDS } from "../../apollo/fragments";
import { client } from "../../apollo-client";
import { Manga } from "../../typings/manga";
import ShowImageModal from "../../components/Ui/ShowImageModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
	ArrowDownIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { getRandomEmoji } from "../../utils/getRandomEmoji";
import * as Select from "@radix-ui/react-select";
import { useRouter } from "next/router";
import { sourcesData } from "../../utils/sourcesData";
import MangaCard from "../../components/Ui/MangaCard";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

function TitlesPageLoading() {
	const { theme } = useTheme();
	return (
		<SkeletonTheme
			baseColor={theme === "dark" ? "#222328" : "#DFDFDF"}
			highlightColor={theme === "dark" ? "#4e4f52" : "#E5E6E8"}
		>
			<PageLayout>
				<div className="mb-16">
					<div>
						<Head>
							<title>Manga List</title>
						</Head>
					</div>

					<div className="my-6 w-48 h-10">
						<Skeleton count={1} height={"100%"} />
					</div>

					<div
						key={"titles-grid"}
						className={`grid grid-flow-row [grid-template-columns:repeat(auto-fill,minmax(100px,1fr));] sm:[grid-template-columns:repeat(auto-fill,minmax(160px,1fr));] md:[grid-template-columns:repeat(auto-fill,minmax(185px,1fr));] [grid-auto-rows:1fr] gap-4 md:gap-y-6 content select-none`}
					>
						{Array.from({ length: 36 }).map((_, index) => {
							return (
								<div
									key={"manga-list-index" + index}
									className="flex flex-col gap-2"
								>
									<Skeleton className="h-full w-full aspect-[200/285] rounded-md" />
									<Skeleton
										count={1}
										width={`${15 + Math.random() * 80}%`}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</PageLayout>
		</SkeletonTheme>
	);
}

export default TitlesPageLoading;
