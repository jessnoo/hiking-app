import * as dom from 'dojo/dom';
import * as on from 'dojo/on';
import * as domConstruct from 'dojo/dom-construct';
import { State } from '../types';
import * as GroupLayer from 'esri/layers/GroupLayer';

import '../../style/basemap-panel.scss';

export default class BasemapPanel {

  container: any;
  basemapContainer: any;

  constructor(state: State) {
    this.container = dom.byId('basemapPanel');
    this.basemapContainer = document.querySelector('.basemaps');

    let basemapGroup = <GroupLayer>state.view.map.layers.filter((layer) => {
      return (layer.title === 'Basemap');
    }).getItemAt(0);

    basemapGroup.layers.forEach((layer) => {

      // crazy hack to get access to portalItem property
      let portalLayer = <GroupLayer>layer;
      let basemapItem = domConstruct.create('div', {
        class: 'basemapItem',
        style: `background: url(${portalLayer.portalItem.thumbnailUrl}) no-repeat center`,
        'data-id': layer.id,
        innerHTML: `<div>${layer.title}</div>`
      }, this.basemapContainer);

      on(basemapItem, 'click', (evt) => {
        state.currentBasemapId = evt.target.dataset.id;
      });
    });

  }
}
