import type { Metadata } from 'next';
import { Libre_Franklin, Yaldevi } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ReportFloatingButton } from '@/components/common/ReportFloatingButton';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Script from 'next/script';
import VoiceflowPositionFixer from '@/components/common/VoiceflowPositionFixer';

const libreFranklin = Libre_Franklin({
	subsets: ['latin'],
	variable: '--font-libre-franklin',
	weight: ['600', '700'],
	display: 'swap',
});

const yaldevi = Yaldevi({
	subsets: ['latin'],
	variable: '--font-yaldevi',
	weight: ['400', '500'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Héroes Cercanos',
	description: 'webpt25b',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${libreFranklin.variable} ${yaldevi.variable} antialiased font-sans`}
			>
				<AuthProvider>
					<Header />
					<Navbar />
					<Toaster
						position='top-center'
						toastOptions={{
							style: {
								background: '#fff8e7',
								color: '#3a2c1a',
								borderRadius: '1rem',
								padding: '12px 16px',
								border: '1px solid #facc15',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
							},
						}}
					/>
					<main>
						{children}
						<ReportFloatingButton />
					</main>
					<ScrollToTopButton />
					<VoiceflowPositionFixer />
					<Footer />
				</AuthProvider>

				<Script
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `(function(d, t) {
							var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
							v.onload = function() {
								window.voiceflow.chat.load({
									verify: { projectID: '68823843cdf056cc331e442e' },
									url: 'https://general-runtime.voiceflow.com',
									versionID: 'production',
									voice: {
										url: "https://runtime-api.voiceflow.com"
										}
										});
										};
										v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
										v.type = "text/javascript";
										s.parentNode.insertBefore(v, s);
										})(document, 'script');`,
									}}
				/>
			</body>
		</html>
	);
}
