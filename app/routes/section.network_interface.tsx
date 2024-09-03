import { useTranslation } from "react-i18next";
import { Suspense, useState } from "react";
import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
	Await,
	defer,
} from "@remix-run/react";

import Loading from "~/components/Loading";
import { executeCommand } from "~/lib/invoke.client";
import PageContainer from "~/components/PageContainer";
import NetworkInterfaceDetail from "~/components/NetworkInterfaceDetail";
import SelectNetworkInterface from "~/components/SelectNetworkInterface";
import {
	networkInterfaceSchema,
	networkInterfacesSchema,
	type NetworkInterfaceType,
} from "~/schemas/network";

export async function clientLoader() {
	const listPromise = executeCommand("network_interface", {
		interfaceIndex: "",
	}).then((data) => {
		const r = networkInterfacesSchema.safeParse(JSON.parse(data));
		return r.data;
	});
	return defer({ listPromise });
}

export default function NetworkInterface() {
	const { t, ready } = useTranslation("network_interface");
	const data = useLoaderData<typeof clientLoader>();
	const error = useRouteError();
	const [netInterface, setInterface] = useState<
		NetworkInterfaceType | undefined
	>(undefined);
	const [loading, setLoading] = useState(false);

	const handleClick = async (i: string) => {
		setLoading(true);
		const result =
			(await executeCommand("network_interface", { interfaceIndex: i })) ||
			"{}";
		const r = networkInterfaceSchema.safeParse(JSON.parse(result));
		setInterface(r.data ? r.data : undefined);
		setLoading(false);
	};

	if (isRouteErrorResponse(error)) {
		return <div>Error: {error.data}</div>;
	}
	if (!ready) {
		return <div>Loading i18n...</div>;
	}

	return (
		<PageContainer scrollable={false}>
			<div className="flex flex-col flex-grow space-y-4 ">
				<h2 className="text-2xl font-bold tracking-tight">
					{t("Network Interface")}
				</h2>
				<Suspense fallback={<Loading />}>
					<Await resolve={data.listPromise}>
						{(d) => (
							<SelectNetworkInterface handleClick={handleClick} data={d} />
						)}
					</Await>
					<div className="flex-grow grid gap-4">
						<NetworkInterfaceDetail
							net_interface={netInterface}
							loading={loading}
						/>
					</div>
				</Suspense>
			</div>
		</PageContainer>
	);
}
