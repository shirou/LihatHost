import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import type { NetworkInterfacesType } from "~/schemas/network";

type SelectNetworkInterfaceProps = {
	data: NetworkInterfacesType;
	handleClick: (i: string) => void;
};

export default function SelectNetworkInterface(
	props: SelectNetworkInterfaceProps,
) {
	const { data, handleClick } = props;
	const { t } = useTranslation("network_interface");

	return (
		<div className="w-1/2 bg-gray-100">
			<Select onValueChange={(value) => handleClick(value)}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={t("Select Network Interface")} />
				</SelectTrigger>
				<SelectContent>
					{data.map((d) => {
						return (
							<SelectItem key={d.InterfaceIndex} value={d.InterfaceIndex}>
								{d.Name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
}
