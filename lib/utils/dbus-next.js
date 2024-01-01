/**
 * @template {typeof import("dbus-next").interface["Interface"]} T
 * @param {Parameters<import("dbus-next").interface["Interface"]["configureMembers"]>[0]} configs
 * @param {T} klass
 * @return {T}
 * @throws {{ message: "server-started" } & Error} When trying to start server when one already exists.
 */
const createClass = (configs, klass) => {
	klass.configureMembers(configs);
	return klass;
};

/**
 * @param {`${string}.${string}.${string}`} well_known_name
 */
const dbus_server = (well_known_name) => {
	const bus = require("dbus-next").sessionBus();

	/**
	 * @type {{
	 * 	instance: import('dbus-next').interface.Interface,
	 *  iface_name: string,
	 * }[]}
	 */
	const services = [];

	/**
	 * @template {typeof import('dbus-next').interface["Interface"]} T
	 * @param {string} service_name
	 * @param {T} iface_klass
	 */
	const use = async (service_name, iface_klass) => {
		const iface_name = well_known_name + "." + service_name;
		const instance = new iface_klass(iface_name);
		services.push({ instance, iface_name });
	};

	/** @type {number | null} */
	let unique_name = null;

	const start = async () => {
		if (unique_name !== null)
			throw new Error("server-started");

		unique_name = await bus.requestName(well_known_name, 0);

		services.forEach(x => {
			const { instance, iface_name } = x;
			bus.export(`/${iface_name.toLowerCase().replaceAll(".", "/")}`, instance);
		});
	};

	return {
		use,
		start,
	};
};

module.exports = {
	createClass,
	dbus_server,
}
