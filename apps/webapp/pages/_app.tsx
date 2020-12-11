import { AppProps } from 'next/app';
import Head from 'next/head';
import withChakra from '../hocs/with-chakra';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Meeshkan Webapp</title>
				<link
					rel="icon"
					href="https://media.graphcms.com/ZUjeEBiaT9iGYxhI5kzq"
				/>
				{/* Meeshkan Recorder */}
				<script
					async
					src="https://recorder.meeshkan.com/record.js?client_id=ad677264-73c2-4101-b910-28b1d698607c"
				/>
				{/* Intercom */}
				<script
					dangerouslySetInnerHTML={{
						__html: '(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic("reattach_activator");ic("update",w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement("script");s.type="text/javascript";s.async=true;s.src="https://widget.intercom.io/widget/nou4ik17";var x=d.getElementsByTagName("script")[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent("onload",l);}else{w.addEventListener("load",l,false);}}})();',
					}}
				></script>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default withChakra(CustomApp);
