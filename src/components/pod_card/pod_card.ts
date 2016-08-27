import { VueApi, VueComponent, data } from '../../imports';

@VueComponent('pod-card', require('./pod_card.html'))
export class PodCard extends VueApi {

  @data public testData : number;

  constructor() {
    super();
    this.testData = 5;
  }
}
