const log4js = require('log4js');

log4js.configure({
  appenders: {
    all: {
      type: 'file',
      filename: `logs/${dayjs().format('YYYY-MM-DD')}.log`
    }
  },
  categories: {
    default: { appenders: ['all'], level: 'all' }
  }
});

const logger = log4js.getLogger();

// logger.info('Something important');
// logger.debug('Time:', new Date());

module.exports = logger;
