"use strict";

module.exports = {
   name: "email",
   events: {
       "movie.create": {
           group: "other",
           handler(payload) {
              console.log('Recieved "movie.create" event in email service with payload: ', payload);
           }
       }
   },
};