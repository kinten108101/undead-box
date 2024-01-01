const dbus = require('dbus-next');
const { interface: DBus } = dbus;

const { createClass } = require("../utils/dbus-next");

const Iface = createClass({
	properties: {
		fun: {
			signature: 's',
		}
	}
}, class extends DBus.Interface {
	fun() {

	}
});

module.exports = Iface;
