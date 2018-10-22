let phone = require('libphonenumber-js');
let sms = require(`${_path}/libs/sms`);


exports.generateCode = function (params, cb) {
  if (!params.personal_info.phone || !params.personal_info.phone_country || !params._id) {
    return cb(listErrors(400));
  }
  let mobile_number = phone.isValidNumber(params.personal_info.phone, params.personal_info.phone_country);
  if (!mobile_number) {
    return cb(listErrors(8010));
  }
  let code = _.random(1000, 9999);
  redis.set(`$_phone_validate_${params._id}`, code);
  redis.expire(`$_phone_validate_${params._id}`, config.exp_validation_phone);
  sms.send(params.personal_info.phone, `Mi Aguila: Codigo de verificacion ${code}`, (err, done) => {
    if (err) {
      return cb(err);
    }
    cb(null, true);
  });
};

exports.validateCode = function (params, cb) {
  if (!params.validation_code || !params.user_id) {
    return cb(listErrors(400));
  }
  redis.get(`$_phone_validate_${params.user_id}`, (err, val) => {

    if (err) {
      return cb(err);
    }
    if (!val) {
      return cb(listErrors(13010));
    }
    if (val !== params.validation_code) {
      return cb(listErrors(400));
    }
    request.put({
      url: `${config.url_gate}/v1/${config.app}/users/${params.user_id}`,
      json: true,
      headers: {
        'apikey': config.apikey.key
      },
      body: {
        'approved_phone': true
      }
    }, (err, result, body) => {
      if (err || result.statusCode !== 200) {
        return cb(err || body);
      }
      cb(null, true);
    });
  });
};
