var enviroment = {
  app: 'test',
  apikey: {
    key: 'JGKKI4F8GTEEPF5M4EBS',
    secret: '4RVJ9J6GOT0QQFSQ1W15ODHUP7OFW1DD7ZJY1FNG5WXK103LZD64V2YMDPCKK115334KBMY3FKTWYPNBDI0QOV9M9BFVV9OYVM9V',
    name: 'homedesk'
  },
  url_gate: 'http://localhost:3044',
  url_transaction: 'http://localhost:3044',
  db: {
    redis: {
      url: 'redis://localhost/',
      retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
          return undefined;
        }
        return Math.max(options.attempt * 100, 3000);
      }
    },
  },

  sites: {

    client: {
      name: 'client',
      description: 'Cliente de Test Pólizas',
      port: 3071,
      host: '0.0.0.0',
      cb: 'http://localhost:3071'
    }
  },

  errors: {
    language: 'es'
  },

  db_collection_prefix: '5bcd80db9f3da220a435f9a4_test_cliente',

};

//esto quiere decir que son los servidores de produccion y desarrollo, no su entorno de trabajo

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  enviroment.cache = 1;
  enviroment.db.redis.url = process.env.REDIS_URL || 'redis://localhost/';
  enviroment.url_transaction = process.env.URL_TRANSACTION || 'http://localhost:3044';
}

if (process.env.NODE_ENV === 'test') {
  enviroment.db_collection_prefix = '5bcd80db9f3da220a435f9a4_test_';
}

if (process.env.NODE_ENV === 'development') {
  enviroment.db.redis.url = process.env.REDIS_URL || 'redis://localhost/';
  switch (process.env.HOME) {
    case '/home/dialcon':
      enviroment.db_collection_prefix = '5bcd80db9f3da220a435f9a4_test_';
      break;

  }
}

module.exports = enviroment;
