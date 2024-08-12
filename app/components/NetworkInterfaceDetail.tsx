import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import { toVendor } from "@network-utils/vendor-lookup";

import { useTranslation } from "react-i18next";
import type { NetworkInterfaceType } from "~/schemas/network";
import Loading from "~/components/Loading";

type NetworkInterfaceDetailProps = {
	net_interface: NetworkInterfaceType | undefined;
	loading: boolean;
};

export default function NetworkInterfaceDetail(
	props: NetworkInterfaceDetailProps,
) {
	const { t } = useTranslation("network_interface");
	const { loading, net_interface } = props;

	if (loading) {
		return <Loading />;
	}
	if (!net_interface) {
		return (
			<div className="w-lvh flex justify-center">
				{t("Please specify network interface")}
			</div>
		);
	}
	return (
		<div className="overflow-auto">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell className="p-2">{t("Interface Description")}</TableCell>
						<TableCell>{net_interface.InterfaceDescription}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="p-2">{t("Mac Address")}</TableCell>
						<TableCell>{net_interface.MacAddress}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="p-2">{t("Vendor")}</TableCell>
						<TableCell>
							{toVendor(
								net_interface.MacAddress.replaceAll("-", ":").toLowerCase(),
							)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="p-2">{t("Link Speed")}</TableCell>
						<TableCell>{net_interface.LinkSpeed}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="p-2">{t("Status")}</TableCell>
						<TableCell>{net_interface.Status}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
