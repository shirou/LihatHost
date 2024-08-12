import { useEffect, useState } from "react";
import { useLocation, Outlet } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { getLocale } from "~/lib/locale.client";
import DashboardNav, { type NavItem } from "~/components/DashboardNav";
import Loading from "~/components/Loading";

export default function App() {
	const { t, ready, i18n } = useTranslation("common");
	const location = useLocation();
	const [items, setItems] = useState<NavItem[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies(t): ignore infinite loop
	useEffect(() => {
		const setLocale = async () => {
			const l = await getLocale();
			i18n.changeLanguage(l || "en");

			setItems([
				{ title: t("Host"), href: "/section/host" },
				{ title: t("Disk"), href: "/section/disk" },
				{ title: t("Power"), href: "/section/power", disabled: true },
				{ title: t("Network"), href: "#", group: true },
				{ title: t("Interface"), href: "/section/network_interface" },
				{ title: t("IPAddress"), href: "/section/network_address" },
				{ title: t("Scan"), href: "/section/network_scan" },
			]);
		};
		setLocale();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18n.changeLanguage]);

	if (!ready) return <Loading />;

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<DashboardNav items={items} path={location.pathname} />
			</div>
			<div className="flex flex-col">
				<main className="flex flex-1 flex-col gap-1 p-1 lg:gap-3 lg:p-3 h-svh">
					<div className="items-center rounded-lg border border-dashed shadow-sm">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
