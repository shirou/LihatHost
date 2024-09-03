import { z } from "zod";

export const networkInterfaceSchema = z.object({
	Name: z.string(),
	InterfaceIndex: z.string(),
	DriverDescription: z.string(),
	InterfaceDescription: z.string(),
	MacAddress: z.string(),
	LinkSpeed: z.string(),
	Status: z.string(),
});
export const networkInterfacesSchema = networkInterfaceSchema.array();
export type NetworkInterfaceType = z.infer<typeof networkInterfaceSchema>;
export type NetworkInterfacesType = z.infer<typeof networkInterfacesSchema>;

export const networkIPAddressSchema = z.object({
	InterfaceDescription: z.string().optional(),
	IPv4Address: z.string(),
	IPv6Address: z.string(),
	AddressFamily: z.string(),
	Type: z.string(),
	PrefixOrigin: z.string(),
	AddressState: z.string(),
});
export const networkIPAddressesSchema = networkIPAddressSchema.array();
export type NetworkIPAddressType = z.infer<typeof networkIPAddressSchema>;
export type NetworkIPAddressesType = z.infer<typeof networkIPAddressesSchema>;
