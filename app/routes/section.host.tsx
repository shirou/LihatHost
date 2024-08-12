import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
	Await,
	defer,
} from "@remix-run/react";

import { executeCommand } from "~/lib/invoke.client";
import PageContainer from "~/components/PageContainer";
import Loading from "~/components/Loading";
import HostOperatingSystemDetail from "~/components/HostOperatingSystemDetail";
import HostSystemDetail from "~/components/HostSystemDetail";
import HostProcessorDetail from "~/components/HostProcessorDetail";

import { z } from "zod";

const hostSystemSchema = z.object({
	Name: z.string(),
	Description: z.string(),
	Status: z.string(),
	Manufacturer: z.string(),
	Model: z.string(),
	SystemFamily: z.string(),
	UserName: z.string(),
	Workgroup: z.string(),
	Domain: z.string(),
	SystemType: z.string(),
	BootupState: z.string(),
});

const hostOperatingSystemSchema = z.object({
	Name: z.string(),
	Caption: z.string(),
	Status: z.string(),
	LastBootUpTime: z.string(),
	LocalDateTime: z.string(),
	OSArchitecture: z.string(),
	SerialNumber: z.string(),
	SystemDirectory: z.string(),
});

const hostProcessorSchema = z.object({
	Name: z.string(),
	Description: z.string(),
	Status: z.string(),
	AddressWidth: z.string(),
	L2CacheSize: z.string(),
	L3CacheSize: z.string(),
	Manufacturer: z.string(),
	ProcessorId: z.string(),
});

export type HostSystemType = z.infer<typeof hostSystemSchema>;
export type HostOperatingSystemType = z.infer<typeof hostOperatingSystemSchema>;
export type HostProcessorType = z.infer<typeof hostProcessorSchema>;

export async function clientLoader() {
	const system = executeCommand("host_system").then((data) => {
		const hs = hostSystemSchema.safeParse(JSON.parse(data ?? "{}"));
		return hs.data;
	});
	const os = executeCommand("host_operatingsystem").then((data) => {
		const hs = hostOperatingSystemSchema.safeParse(JSON.parse(data ?? "{}"));
		return hs.data;
	});
	const processor = executeCommand("host_processor").then((data) => {
		const hs = hostProcessorSchema.safeParse(JSON.parse(data ?? "{}"));
		return hs.data;
	});

	return defer({
		system,
		os,
		processor,
	});
	/*
	
	if (hs.error) {
		console.error(hs.error.issues);
		throw json({ message: "hostSystemSchema error" }, { status: 401 });
	}
	const os = hostOperatingSystemSchema.safeParse(JSON.parse(values[1] ?? "{}"));
	if (os.error) {
		console.error(os.error.issues);
		throw json(
			{ message: "hostOperationgSystemSchema error" },
			{ status: 401 },
		);
	}
	const pr = hostProcessorSchema.safeParse(JSON.parse(values[2] ?? "{}"));
	if (pr.error) {
		console.error(pr.error);
		throw json({ message: "hostProcessorSchema error" }, { status: 401 });
	}

	return json({
		system: hs.data,
		os: os.data,
		processor: pr.data,
	});
*/
}

export default function Host() {
	const { t, ready } = useTranslation("host");
	const data = useLoaderData<typeof clientLoader>();
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <div>Error: {error.data}</div>;
	}
	if (!ready) {
		return <div>Loading i18n...</div>;
	}

	return (
		<PageContainer scrollable={false}>
			<div className="flex flex-col flex-grow space-y-4">
				<h2 className="text-2xl font-bold tracking-tight">
					{t("Host Information")}
				</h2>
				<div className="container mx-auto p-4">
					<div className="grid grid-cols-2 gap-2">
						<Suspense fallback={<Loading />}>
							<div className="max-h-[90svh] overflow-y-auto">
								<Await resolve={data.os}>
									{(d) => <HostOperatingSystemDetail data={d} />}
								</Await>
							</div>
							<div className="max-h-[90svh] overflow-y-auto">
								<Await resolve={data.system}>
									{(d) => <HostSystemDetail data={d} />}
								</Await>
							</div>
							<div className="max-h-[90svh] overflow-y-auto">
								<Await resolve={data.processor}>
									{(d) => <HostProcessorDetail data={d} />}
								</Await>
							</div>
						</Suspense>
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
