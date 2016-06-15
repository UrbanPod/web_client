import { VueApi, VueComponent, data } from '../../imports';

@VueComponent("pod-card", "<div>Hello, I am a pod card! {{ testData }}</div>")
export class PodCard extends VueApi {

  @data public testData : number;

  constructor() {
    super();
    this.testData = 5;
  }
}
