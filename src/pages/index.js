import Head from 'next/head'
import Image from 'next/image'
import {Poppins} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Script from "next/script";

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function Home(props) {

    function getDataTag() {
        return (props.displayConfig.exclusive) ? `data-adzuki-exclusive="${props.siteConfig.tag}"` : `data-adzuki-top-tags="${props.siteConfig.tag}"`
    }

    const renderAdzuki = () => {
        if (!props.siteConfig.geo) return null;


        return (
            <>
                <h2 className={styles.offersHeaderText}>{props.displayConfig.sub_header}</h2>
                <div data-adzuki-id={props.siteConfig.adzuki_id}
                     data-adzuki-ads={props.displayConfig.number_of_ads}
                     data-adzuki-ad-size={props.displayConfig.ad_size}
                     data-adzuki-with-title-text={(props.displayConfig.display_title === '1') ? '1' : ''}
                     data-adzuki-exclusive={(props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
                     data-adzuki-top-tags={(!props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
                ></div>
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
  reference : 'extrareward4you',
  s3 : '${props.displayConfig.code}',
  ${(props.siteConfig.affiliate) ? "s4 : '" + props.siteConfig.affiliate + "'," : ''}
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
            />

            <div className={styles.body}>
                <div className={styles.header} style={{backgroundColor: '#' + props.displayConfig.branding_colour}}>
                    {(props.siteConfig.logo) ?
                        <Image
                            className={styles.logo}
                            src={props.siteConfig.logo}
                            alt="Logo"
                            width={600}
                            height={200}
                            priority
                        /> : null}
                    <h2 className={styles.headerText}>{props.displayConfig.main_header}</h2>

                </div>
                <main className={styles.main}>
                    {renderAdzuki()}
                    {(props.siteConfig.link) ? <a href={props.siteConfig.link} className={styles.button}>
                        Return To Site
                    </a> : null}
                </main>
                <div className={styles.footer} style={{backgroundColor: '#' + props.displayConfig.branding_colour}}>
                    <p>Copyright © {new Date().getFullYear()} extrareward4you</p>
                    <p>Owned by Submission Technology Ltd. (04456811)</p>
                </div>
            </div>
        </>
    )
}

export function getServerSideProps(context) {
    const getSiteConfig = () => {

        let config = {
            adzuki_id: null,
            geo: null,
            logo: null,
            alt: null,
            link: null,
            tag: null,
            affiliate: (context?.query?.affiliate) ?? null
        }

        switch (config.affiliate) {
            // UK Sites
            case '19229':
            case '17739':
            case '19304':
                config.logo = '/logos/cashback.png';
                config.adzuki_id = '19304'
                config.geo = 'UK';
                config.link = 'https://cashback.co.uk/';
                config.tag = 'cashback';
                config.exclusive = true;
                break;
            case '18920':
            case '19073' :
                config.logo = '/logos/paid-surveys.png';
                config.adzuki_id = '18920';
                config.geo = 'UK';
                config.link = 'https://paidsurveys.uk.com/';
                config.tag = 'paid_surveys';
                break;

            // US Sites
            case '18685':
                config.logo = '/logos/global-survey-hub.png';
                config.adzuki_id = '18685';
                config.geo = 'US';
                config.link = 'https://www.globalsurveyhub.com/';
                config.tag = 'coreg';
                break;
            case '18691':
                config.logo = '/logos/product-testing-usa.png';
                config.adzuki_id = '18691';
                config.geo = 'US';
                config.link = 'https://producttestingusa.com/';
                config.tag = 'coreg';
                break;
            case '19469': // For Zeropark
            case '19468': // For Zeropark
                config.adzuki_id = '19468';
                config.geo = 'UK';
                break;
            case '17768':
            case '19410':
            case '16489':
            case '18844':
            case '18824':
                config.logo = '/logos/us-product-testing.png';
                config.adzuki_id = '18824';
                config.geo = 'US';
                config.link = 'https://usproducttesting.com/';
                config.tag = 'coreg';
                break;
            default:
                if (!context?.query?.country || context?.query?.country === 'GB' | context?.query?.country === 'gb' || context?.query?.country === 'UK' || context?.query?.country === 'uk') {
                    config.geo = 'UK';
                    config.adzuki_id = '19464';
                }

                if (context?.query?.country === 'US' || context?.query?.country === 'us') {
                    config.geo = 'US';
                    config.adzuki_id = '19465';
                }
                break;
        }

        config.tag = (context?.query?.tag) ?? config.tag
        return config;
    }

    const getDisplayConfig = () => {
        const branding_colours = ['1c99bf', '1cbf4a', 'bf9e1c', '5d1cbf', 'bf1c78']
        const ad_sizes = ['medium_rectangle', 'large_mobile_banner']
        const display_titles = ['1', '0']
        const number_of_ads = ['3', '6', '9', '10', '15']
        const main_headers = {
            1: 'We’re sorry, this offer is no longer available.',
            2: 'This offer may no longer be available or you do not qualify for it.'
        }
        const sub_headers = {
            1: 'Check out more offers below that you may like',
            2: 'Other offers you might like',
        }

        let config = {
            branding_colour: branding_colours[Math.floor(Math.random() * branding_colours.length)],
            ad_size: ad_sizes[Math.floor(Math.random() * ad_sizes.length)],
            display_title: display_titles[Math.floor(Math.random() * display_titles.length)],
            number_of_ads: number_of_ads[Math.floor(Math.random() * number_of_ads.length)],
            main_header: Object.keys(main_headers)[Object.keys(main_headers).length * Math.random() << 0],
            sub_header: Object.keys(sub_headers)[Object.keys(sub_headers).length * Math.random() << 0],
            code: ''
        };

        Object.keys(config).forEach((key, index) => {
            if (key === 'code') {
                return;
            }
            let condensedKey = key.split('_').map((item) => {
                return item.charAt(0);
            }).join('_');


            config.code = config.code + condensedKey + '=' + config[key] + ((index < (Object.keys(config).length - 2)) ? ',' : '');
        });

        config.main_header = main_headers[config.main_header];
        config.sub_header = sub_headers[config.sub_header];

        console.log(config);
        return config;
    }


    return {
        props: {
            affiliate: (context?.query?.affiliate) ?? null,
            tag: (context?.query?.tag) ?? null,
            siteConfig: getSiteConfig(),
            displayConfig: getDisplayConfig()
        },
    };
}