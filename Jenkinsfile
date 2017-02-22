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
		//    def to = emailextrecipients([
		//	[$class: 'CulpritsRecipientProvider'],
		//	[$class: 'DevelopersRecipientProvider'],
		//	[$class: 'RequesterRecipientProvider']
		//    ])

		    slackSend channel: 'attest-prod', color: 'danger', message: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result}. Build URL: ${env.BUILD_URL}", teamDomain: 'deque', token: 'BhW2Vk2kdmiumfZRfrLMGxon'

		//    emailext attachLog: true, body: "Build from email-ext ${env.BUILD_URL}", mimeType: 'text/html', recipientProviders: [
		//	[$class: 'CulpritsRecipientProvider'],
		//	[$class: 'RequesterRecipientProvider']
		//    ], subject: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result}"
		} else {
		    slackSend channel: 'attest-prod', color: 'good', message: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result}. Build URL: ${env.BUILD_URL}", teamDomain: 'deque', token: 'BhW2Vk2kdmiumfZRfrLMGxon'

		}

    }
}
