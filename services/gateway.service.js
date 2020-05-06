"use strict";
const express = require("express");
const bodyParser = require('body-parser');

module.exports = {
    name: "gateway",
    settings: {
        port: process.env.PORT || 3000,
    },
    methods: {
        initRoutes(app) {
            app.get("/movies", this.getMovies);
            app.post("/movies", this.createMovie);
        },
        getMovies(req, res) {
            return Promise.resolve()
                .then(() => {
                    return this.broker.call("movies.list").then(movies => {
                        res.send(movies);
                    });
                })
                .catch(this.handleErr(res));
        },
        createMovie(req, res) {
            const payload = req.body;
            return Promise.resolve()
          .then(() => {
              return this.broker.call("movies.create", { movie: payload }).then(movie =>
                    res.send(movie)
                );
          })
          .catch(this.handleErr(res));
        },
        handleErr(res) {
            return err => {
                res.status(err.code || 500).send(err.message);
            };
        }
    },
    created() {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.listen(this.settings.port);
        this.initRoutes(app);
        this.app = app;
    }
};