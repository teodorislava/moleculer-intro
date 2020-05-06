"use strict";

const DbService = require("../mixins/db.mixin");

module.exports = {
	name: "movies",
	mixins: [
		DbService("movies")
	],

	settings: {
		fields: ["_id", "title", "description", "year", "director", "mainActor"],

		entityValidator: {
			title: { type: "string", min: 1 },
			description: { type: "string", min: 1 },
			year: { type: "string", min: 1 },
            director: { type: "string", min: 1 },
			mainActor: { type: "string", optional: true }
		}
	},

	actions: {

		/**
		 * Create a new movie.
		 *
		 * @actions
		 * @param {Object} movie - Movie entity
		 *
		 * @returns {Object} Created entity
		 */
		create: {
			params: {
				movie: { type: "object" }
			},
			async handler(ctx) {
				let entity = ctx.params.movie;
				await this.validateEntity(entity);
				
				const doc = await this.adapter.insert(entity);
				this.broker.emit("movie.create", doc);
				return doc;
			}
		},

		/**
		 * List all movies.
		 *
		 * @actions
		 *
		 * @returns {Object} List of movies
		 */
		list: {
			async handler(ctx) {

				let params = {
					sort: ["title"]
				};

				const res = await this.adapter.find(params);
				return res;
			}
		},
	}
};