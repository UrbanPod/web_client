declare function require(path: string): string;

import Vue = require('vue');
import { PodCard } from './components/pod_card/pod_card';
new PodCard();
new Vue({ el: '#app' });
