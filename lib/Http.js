const axios = require('axios');

module.exports = async function(route) {
    try { return await axios.get(route);  }
    catch { return undefined; }
}