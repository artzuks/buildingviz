// vue.config.js

var webpack = require('webpack')
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                "resolve": {
                    "alias": {
                        "vue$": "vue/dist/vue.common.js",
                        "jquery": "jquery/src/jquery.js"
                    }
                }
        }
        }else{
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
    
  }