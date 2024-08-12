import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
	Await,
	json,
} from "@remix-run/react";

import { executeCommand } from "~/lib/invoke.client";
import PageContainer from "~/components/PageContainer";
import Loading from "~/components/Loading";
import IPAddressDetail from "~/components/IPAddressDetail";
import { networkIPAddressesSchema } from "~/schemas/network";

export async function clientLoader() {
	const listPromise = executeCommand("network_ip");
	return listPromise;
}

export default function NetworkAddress() {
	const { t, ready } = useTranslation("network_address");
	const ipAddress = useLoaderData<typeof clientLoader>();
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <div>Error: {error.data}</div>;
	}
	if (!ready) {
		return <div>Loading i18n...</div>;
	}

	return (
		<PageContainer scrollable={false}>
			<div className="flex flex-col flex-grow space-y-4 ">
				<h2 className="text-2xl font-bold tracking-tight">{t("IP Address")}</h2>
				<Suspense fallback={<Loading />}>
					<Await resolve={ipAddress}>
						{(resolvedValue) => {
							console.log(resolvedValue);
							const r = networkIPAddressesSchema.safeParse(
								JSON.parse(resolvedValue),
							);
							if (r.error) {
								console.log(r.error.issues);
								throw json({ message: "error" }, { status: 401 });
							}

							const calc = r.data.map((ip) => {
								return {
									...ip,
									Address:
										ip.AddressFamily === "IPv4"
											? ip.IPv4Address
											: ip.IPv6Address,
								};
							});
							return <IPAddressDetail IPAddress={calc} loading={false} />;
						}}
					</Await>
				</Suspense>
			</div>
		</PageContainer>
	);
}
