/**
 * @param {any[]} data
 */
const debug = (...data) => {
	console.debug("[#]", ...data);
};

module.exports = {
	debug,
};
