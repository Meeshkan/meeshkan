const extensionId = 'nbabhjopfigpbmakflnbcacahegdmbfa';

export const latestVersion = '0.3.0';

export const isChrome = (): boolean => !!window.chrome;

export const startRecording = ({ url, clientId }) => {
	window.chrome.runtime.sendMessage(extensionId, {
		message: 'startRecording',
		url,
		clientId,
	});
};

export const getVersion = () => {
	return new Promise((resolve, reject) => {
		window.chrome.runtime.sendMessage(
			extensionId,
			{ message: 'version' },
			(reply) => {
				if (reply?.version) {
					resolve(reply.version);
				} else {
					reject();
				}
			}
		);
	});
};