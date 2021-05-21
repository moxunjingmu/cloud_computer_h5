module.exports = {

    configureWebpack: {

        // other webpack options to merge in ...

    },

    // devServer Options don't belong into `configureWebpack`

    devServer: { // 环境配置
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
     
    }

};