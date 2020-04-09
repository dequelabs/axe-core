import naReporter from './na';
import noPassesReporter from './no-passes';
import rawEnvReporter from './raw-env';
import rawReporter from './raw';
import v1Reporter from './v1';
import v2Reporter from './v2';

axe.addReporter('na', naReporter);
axe.addReporter('no-passes', noPassesReporter);
axe.addReporter('rawEnv', rawEnvReporter);
axe.addReporter('raw', rawReporter);
axe.addReporter('v1', v1Reporter);
axe.addReporter('v2', v2Reporter, true);
