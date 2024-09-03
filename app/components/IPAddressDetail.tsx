import { useTranslation } from "react-i18next";
import type {
	NetworkIPAddressType,
	NetworkIPAddressesType,
} from "~/schemas/network";
import Loading from "~/components/Loading";
import DataTable from "~/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";

type IPAddressDetailProps = {
	IPAddress: NetworkIPAddressesType | undefined;
	loading: boolean;
};

export default function IPAddressDetail(props: IPAddressDetailProps) {
	const { t } = useTranslation("network_interface");
	const { loading, IPAddress } = props;

	if (loading) {
		return <Loading />;
	}
	if (!IPAddress) {
		return (
			<div className="w-lvh flex justify-center">
				{t("Please specify network interface")}
			</div>
		);
	}

	const columns: ColumnDef<NetworkIPAddressType>[] = [
		{
			accessorKey: "InterfaceDescription",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						{t("InterfaceDescription")}
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "AddressFamily",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						{t("AddressFamily")}
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "Address",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						{t("Address")}
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{ accessorKey: "PrefixOrigin", header: t("PrefixOrigin") },
		{ accessorKey: "Type", header: t("Type") },
		{ accessorKey: "AddressState", header: t("AddressState") },
	];

	return (
		<div className="overflow-auto max-w-svh">
			<DataTable columns={columns} data={IPAddress} />
		</div>
	);
}
