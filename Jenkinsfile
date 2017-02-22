node ('kubeselenium2') {

    def err

    try {

      stage ('check out source') {
        checkout scm
      }


      stage ('building') {
        sh 'npm install'
      }

      stage ('testing') {
        wrap([$class: 'Xvfb']) {
          sh 'grunt test'
        }
      }

    } catch (caughtErr) {
		  err = caughtErr
    } finally {
  		if (err) {
  		    currentBuild.result = 'FAILURE'
  		} else {
  		    currentBuild.result = 'SUCCESS'
  		}
  		if(err != null) {
  		    slackSend channel: 'attest-build', color: 'danger', message: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result} ${env.BUILD_URL}", teamDomain: 'deque', token: 'BhW2Vk2kdmiumfZRfrLMGxon'
  		} else {
  	    slackSend channel: 'attest-prod', color: 'good', message: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result} ${env.BUILD_URL}", teamDomain: 'deque', token: 'BhW2Vk2kdmiumfZRfrLMGxon'
  		}

    }
}
