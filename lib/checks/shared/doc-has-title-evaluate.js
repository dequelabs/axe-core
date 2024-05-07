import { sanitize } from '../../commons/text';

function docHasTitleEvaluate() {
  const title = document.title;
  return !!sanitize(title);
}

export default docHasTitleEvaluate;
