#!/usr/bin/env node

const addons_route = require("./dbus-next-ifaces/addons");
const { dbus_server } = require("./utils/dbus-next");
const { debug } = require("./utils/log");

const server = dbus_server("com.github.kinten108101.SteamVPK.Server");

server.use("Addons", addons_route);

server.start()
	.then(() => {
		debug("Server started")
	})
	.catch(error => {
		if (error instanceof Error && error.message === "server-started") {
			debug("Server already started!");
		} else {
			debug(error);
		}
	});


