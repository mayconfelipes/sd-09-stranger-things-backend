'use strict';

const flipout = require('flipout');
const UPSIDEDOWN_MODE = process.env.UPSIDEDOWN_MODE;

class StrangerThingsService {
  constructor(repository) {
    this.repository = repository;
  }

  search({ page, size, ...params }, upsideDownMode) {
    const characters = this.repository.search(params, { page, size });

    if (UPSIDEDOWN_MODE) {
      return characters.map(({ name, origin, status }) => ({
        name: flipout(name),
        origin: flipout(origin),
        status: flipout(status),
      }));
    }

    return characters;
  }
}

module.exports = StrangerThingsService;
