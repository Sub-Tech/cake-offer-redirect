import Head from 'next/head'
import Image from 'next/image'
import {Poppins} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Script from "next/script";

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function Home(props) {

    const renderAdzuki = () => {
        if (!props.siteConfig.geo) return null;

        return (
            <>
                <h2 className={styles.offersHeaderText}>Other offers you might like</h2>
                <div data-adzuki-id={props.siteConfig.affiliate} data-adzuki-ads='10' data-adzuki-top-tags={props.siteConfig.tag}></div>
            </>
        )
    }

    return (
        <>
            <Head>
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
d.addEventListener('DOMContentLoaded',function(){(k.adsbyadzuki=k.adsbyadzuki||[]).push(['init', a])})})({
  geo: '${props.siteConfig.geo}',
  reference : 'extrareward4you'
})`,
                }}
            />

            <Script strategy="beforeInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-8VWVQFXWCF"></Script>
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
            />

            <div className={styles.body}>
                <div className={styles.header}>
                    {(props.siteConfig.logo) ?
                        <Image
                            className={styles.logo}
                            src={props.siteConfig.logo}
                            alt="Logo"
                            width={600}
                            height={200}
                            priority
                        /> : null}
                    <h2 className={styles.headerText}>This offer may no longer be available or you do not qualify for
                        it.</h2>

                </div>
                <main className={styles.main}>
                    {renderAdzuki()}
                    {(props.siteConfig.link) ? <a href={props.siteConfig.link} className={styles.button}>
                        Return To Site
                    </a> : null }
                </main>
            </div>
        </>
    )
}

export function getServerSideProps(context) {
    const getSiteConfig = () => {

        let config = {
            affiliate: (context?.query?.affiliate) ?? null,
            geo: null,
            logo: null,
            alt: null,
            link: null,
            tag: null
        }

        switch (config.affiliate) {
            case '19304':
                config.logo = '/logos/cashback.png';
                config.geo = 'UK';
                config.link = 'https://cashback.co.uk/';
                config.tag = 'cashback';
                break;
            case '18920':
                config.logo = '/logos/paid-surveys.png';
                config.geo = 'UK';
                config.link = 'https://paidsurveys.uk.com/';
                config.tag = 'cashback';
                break;
            case '19200' || '18915':
                config.logo = '/logos/20-cogs.png';
                config.geo = 'UK';
                config.link = 'https://20cogs.co.uk/';
                config.tag = '20cogs';
                break;
            case '18685':
                config.logo = '/logos/global-survey-hub.png';
                config.geo = 'US';
                config.link = 'https://www.globalsurveyhub.com/';
                config.tag = 'coreg';
                break;
            case '18691':
                config.logo = '/logos/product-testing-usa.png';
                config.geo = 'US';
                config.link = 'https://producttestingusa.com/';
                config.tag = 'coreg';
                break;
            case '18824':
                config.logo = '/logos/us-product-testing.png';
                config.geo = 'US';
                config.link = 'https://usproducttesting.com/';
                config.tag = 'coreg';
                break;
            default:
                if(!context?.query?.country || context?.query?.country === 'GB' | context?.query?.country === 'gb' || context?.query?.country === 'UK' || context?.query?.country === 'uk') {
                    config.geo = 'UK';
                    config.affiliate = '19464';
                }

                if(context?.query?.country === 'US' || context?.query?.country === 'us') {
                    config.geo = 'US';
                    config.affiliate = '19465';
                }
                break;
        }

        config.tag = (context?.query?.tag) ?? config.tag
        return config;
    }


    return {
        props: {
            affiliate: (context?.query?.affiliate) ?? null,
            tag: (context?.query?.tag) ?? null,
            siteConfig: getSiteConfig()
        },
    };
}