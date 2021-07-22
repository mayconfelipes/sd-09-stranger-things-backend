'use strict';

const flipout = require('flipout');
require('dotenv').config();
class StrangerThingsService {
  constructor(repository) {
    this.repository = repository;
  }

  search({ page, size, ...params }, upsideDownMode) {
    const characters = this.repository.search(params, { page, size });
    console.log('####');
    console.log(upsideDownMode);
    if (upsideDownMode) {
      console.log('entrou na funcao')
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
