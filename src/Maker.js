import DefaultServiceProvider from './utils/DefaultServiceProvider';
import Cdp from './eth/Cdp';

export default class Maker {
  constructor(config) {
    this._container = new DefaultServiceProvider().buildContainer(
      config.services
    );
    this._authenticatedPromise = this._container.authenticate().then(() => {
      this._ethersProvider = this._container
        .service('cdp')
        .get('smartContract')
        .get('web3')._ethersProvider;
    });
  }

  openCdp() {
    return this._authenticatedPromise.then(() =>
      this._container.service('cdp').openCdp()
    );
  }

  // Should check if this CDP actually exists
  // Should be number
  // Should return promise
  // if (!validCdp) return Promise.reject(error.message)
  getCdp(cdpId) {
    return this._authenticatedPromise.then(
      () => new Cdp(this._container.service('cdp'), cdpId)
    );
  }

  convertEthToPeth(eth) {
    return this._authenticatedPromise.then(() =>
      this._container.service('cdp').convertEthToPeth(eth)
    );
  }
}
