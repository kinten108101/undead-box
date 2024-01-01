#!/usr/bin/env node

const addons_route = require("./dbus-next-ifaces/addons");
const { dbus_server } = require("./utils/dbus-next");

const server = dbus_server("com.github.kinten108101.SteamVPK.Server");

server.use("Addons", addons_route);

server.start()
	.catch(console.error);


