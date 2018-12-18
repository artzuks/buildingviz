// vue.config.js

var webpack = require('webpack')
module.exports = {
    configureWebpack: config => {

        return {
            "resolve": {
                "alias": {
                    "vue$": "vue/dist/vue.common.js",
                    "jquery": "jquery/src/jquery.js"
                }
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                    })
            ]
        }
        
        
    }
    
  }