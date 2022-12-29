import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function NavLink({ href, title }: { href: string; title: string }) {
	const [active, setActive] = useState(false);
	const location = useRouter();
	useEffect(() => {
		setActive(location.pathname === href);
	}, [location]);

	return (
		<div>
			<Link href={href}>
				<div className="flex flex-col items-center group p-1">
					<h1
						className={`transition font-medium text-reverse group-hover:text-primary ${
							active ? "text-primary" : "text-neutral-100"
						}`}
					>
						{title}
					</h1>

					{active ? (
						<motion.div
							layoutId="underlineNavLink"
							initial={{ x: -1, width: 3 }}
							animate={{ x: 0, opacity: 1, width: 15 }}
							exit={{ x: 1, width: 3 }}
						>
							<div className="border-b-[3px] border-primary w-full border-spacing-y-1 h-1"></div>
						</motion.div>
					) : (
						<div className="h-1"></div>
					)}
				</div>
			</Link>
		</div>
	);
}

export default NavLink;
