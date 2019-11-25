import cssOrientationLockEvaluate from './css-orientation-lock-evaluate';

const cssOrientationLockMetadata = {
	id: 'css-orientation-lock',
	evaluate: cssOrientationLockEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Display is operable, and orientation lock does not exist',
			fail: 'CSS Orientation lock is applied, and makes display inoperable',
			incomplete: 'CSS Orientation lock cannot be determined'
		}
	}
};

export default cssOrientationLockMetadata;