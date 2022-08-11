function docHasSingleTitleEvaluate() {
  var titles = document.getElementsByTagName('title');
  return titles.length === 1;
}

export default docHasSingleTitleEvaluate;
