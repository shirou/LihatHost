import { useEffect, useState } from "react";
import { executeCommand } from "~/lib/invoke.client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import PageContainer from "~/components/PageContainer";

import { z } from "zod";

const networkDeviceSchema = z
	.object({
		Name: z.string(),
		DriverDescription: z.string(),
		InterfaceDescription: z.string(),
		MacAddress: z.string(),
		LinkSpeed: z.string(),
		Status: z.string(),
	})
	.array();

type NetworkDeviceType = z.infer<typeof networkDeviceSchema>;

export function NetworkDevice() {
	const [data, setData] = useState<NetworkDeviceType | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = (await executeCommand("network_device")) || "[]";
			console.debug(JSON.parse(result));
			const r = networkDeviceSchema.safeParse(JSON.parse(result));
			r.data ? setData(r.data) : setError(r.error.errors[0].message);
		};
		fetchData();
	}, []);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (data === undefined) {
		return <div>Loading...</div>;
	}

	const rows = [
		{ title: "Interface Description", value: data[0].InterfaceDescription },
		{ title: "Mac Address", value: data[0].MacAddress },
		{ title: "Link Speed", value: data[0].LinkSpeed },
		{ title: "Status", value: data[0].Status },
	];

	return (
		<PageContainer scrollable={true}>
			<div className="space-y-1 w-full">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">Network Device</h2>
				</div>
				<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
					{data.map((d) => {
						return (
							<Card key={d.Name}>
								<CardHeader>
									<CardTitle>{d.Name}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="overflow-auto">
										<Table>
											<TableBody>
												{rows.map((row, i) => {
													return (
														<TableRow key={i}>
															<TableCell className="p-2">{row.title}</TableCell>
															<TableCell className="p-2">{row.value}</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</PageContainer>
	);
}
