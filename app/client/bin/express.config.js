import webpack from 'webpack';
import path from 'path';
import express from 'express';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});

export default class ExpressConfig {
  static Init(app) {
    const mode = process.env.NODE_ENV;
    let config;

    if (mode === 'production') {
      // Production
      console.log('NODE_ENV: production');
      config = require('../webpack/production.config.js');
    } else {
      // Development
      console.log('NODE_ENV: development');
      config = require('../webpack/development.config.js');
      // Hot replacement
      const compiler = webpack(config);
      app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
      }));
      // Hot reload
      app.use(require('webpack-hot-middleware')(compiler));
    }

    // Static path
    app.use('/dist', express.static(config.output.path));
    app.use('/bower_components', express.static(path.join(process.env.PWD, 'bower_components')));


    // API call to flask server
    app.all(/^\/api\/(.*)/, (req, res) => {
      proxy.web(req, res, { target: 'http://localhost:5000' });
    });

    // React root page
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.env.PWD, 'index.html'));
    });
  }
}

