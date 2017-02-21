node ('kuberhel') {
    
    def err
    
    try {
    
    stage 'check out source'
    
    sh 'chmod 400 /root/.ssh/bitbucket'
    
    git url: 'git@bitbucket.org:dmusser/axe-core.git', branch: 'develop', credentialsId: '39c09b29-afd3-4f30-b0d1-6c3e4d99de9f'
    
    stage 'building'
    
    sh 'npm install'
    
    sh 'grunt test-fast'
    
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

		    slackSend channel: 'attest-prod', color: 'danger', message: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result}", teamDomain: 'deque', token: 'BhW2Vk2kdmiumfZRfrLMGxon'

		//    emailext attachLog: true, body: "Build from email-ext ${env.BUILD_URL}", mimeType: 'text/html', recipientProviders: [
		//	[$class: 'CulpritsRecipientProvider'],
		//	[$class: 'RequesterRecipientProvider']
		//    ], subject: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result}"
		} else {
		    slackSend channel: 'attest-prod', color: 'good', message: "\'${env.JOB_NAME}\' (${env.BUILD_NUMBER})  has finished with ${currentBuild.result}", teamDomain: 'deque', token: 'BhW2Vk2kdmiumfZRfrLMGxon'

		}

    }
}