import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<div className="py-2 container mx-auto mb-14">
			<div className="w-full flex justify-between items-end">
				<div className="flex flex-col">
					<span className="text-sm">© EasyManga 2022</span>
					<span className="text-xs">By Ahmed Mohamed</span>
				</div>

				<div
					title="Privacy Policy"
					dangerouslySetInnerHTML={{
						__html: `<a href="https://www.iubenda.com/privacy-policy/25841744" class="iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe " title="Privacy Policy ">Privacy Policy</a><script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script>`,
					}}
				></div>
			</div>
		</div>
	);
}

export default Footer;
