const Ajv = require("ajv");
const ajvFormats = require("ajv-formats");
// creating instance from Ajv class
// applying allErrors with true to return all errors not only the first one
// $data for reference
const ajv = new Ajv({ allErrors: true, $data: true });
// applying ajv formats
ajvFormats(ajv);
// applying ajv errors
require("ajv-errors")(ajv);

module.exports = ajv;
