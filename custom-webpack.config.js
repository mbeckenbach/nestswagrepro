const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// See https://github.com/typeorm/typeorm/blob/master/docs/faq.md#how-to-use-webpack-for-the-backend

module.exports = {
  plugins: [
    //ignore the drivers you don't want. This is the complete list of all drivers -- remove the suppressions for drivers you want to use.
    new FilterWarningsPlugin({
      // Removed /mssql/, as we use it
      exclude: [/hdb-pool/, /hana-client/, /mongodb/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /typeorm-aurora-data-api-driver/]
    }),
  ]
};
