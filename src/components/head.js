import Script from "next/script";
import Head from "next/head";
import {Poppins} from "next/font/google";

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function GlobalHead({props}) {
    return (<><Head>
            <title>Extra Reward 4 You</title>
            <meta name="description" content="This offer may no longer be available or you do not qualify for it."/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <style jsx global>{`
              html {
                font-family: ${poppins.style.fontFamily};
              }
            `}</style>
        </Head>
            <Script
                id="chadzuki2"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `;(function(a,d,z,u,k,i){
                        i='https://client.getadzuki.com/adzuki-client';d=document;z=d.getElementsByTagName('head')[0];u=d.createElement('script');
                        k="noModule" in u;u.async=true;u.src=k?i+'.module.js':i+'.js';z.appendChild(u);k=window;
                        
                        window.adzukiAdSlotReady = (ads) => {
                           window.adzukiGlobalAds = ads
                        };

                        d.addEventListener('DOMContentLoaded',function(){(k.adsbyadzuki=k.adsbyadzuki||[]).push(['init', a])})})({
                          geo: '${props.siteConfig.geo}',
                          noRender: ${props.displayConfig.noRender},
                          reference : 'extrareward4you',
                          s3 : '${props.displayConfig.code}',
                          utm_source : 'extrareward4you',
                          ${props.siteConfig.isDefaultAffiliate && props.siteConfig.affiliate ? "utm_medium : '" + props.siteConfig.affiliate + "'," : ''}
                          ${props.siteConfig.affiliate ? "s4 : '" + props.siteConfig.affiliate + "'," : ''}
                          ${props.siteConfig.s5 ? "s5 : '" + props.siteConfig.s5 + "'," : ''}
                    })`,
                }}
            />

            <Script strategy="beforeInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-8VWVQFXWCF"></Script>
            <Script
                id="gtag"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-8VWVQFXWCF');`,
                }}
            />

            <Script
                id="hotjar"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3414979,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                }}
            /></>
    )
}