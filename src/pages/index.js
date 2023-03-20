import Head from 'next/head'
import Image from 'next/image'
import {Poppins} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Script from "next/script";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function Home(props) {
    const router = useRouter();

    const getSiteConfig = () => {

        let config = {
            affiliate: props.affiliate,
            geo: null,
            logo: null,
            alt: null,
            link: null
        }

        switch (props.affiliate) {
            case '18779': // This is the slush account
                config.geo = 'UK';
                break;
            case '19304':
                config.logo = '/logos/cashback.png';
                config.geo = 'UK';
                config.link = 'https://cashback.co.uk/';
                break;
            case '18920':
                config.logo = '/logos/paid-surveys.png';
                config.geo = 'UK';
                config.link = 'https://paidsurveys.uk.com/';
                break;
            case '19200' || '18915':
                config.logo = '/logos/20-cogs.png';
                config.geo = 'UK';
                config.link = 'https://20cogs.co.uk/';
                break;
            case '18685':
                config.logo = '/logos/global-survey-hub.png';
                config.geo = 'US';
                config.link = 'https://www.globalsurveyhub.com/';
                break;
            case '18691':
                config.logo = '/logos/product-testing-usa.png';
                config.geo = 'US';
                config.link = 'https://producttestingusa.com/';
                break;
            case '18824':
                config.logo = '/logos/us-product-testing.png';
                config.geo = 'US';
                config.link = 'https://usproducttesting.com/';
                break;
        }

        console.log(config);


        return config;
    }

    const siteConfig = useMemo(() => {
        return getSiteConfig()
    }, [router?.query?.affiliate])

    const renderAdzuki = () => {
        console.log(siteConfig.geo)
        if (!siteConfig.geo) return null;

        return (
            <>
                <Script id="chadzuki" strategy="lazyOnload">
                    {`
                ;(function(a,d,z,u,k,i){
                    i='https://client.getadzuki.com/adzuki-client';d=document;z=d.getElementsByTagName('head')[0];u=d.createElement('script');
                    k="noModule" in u;u.async=true;u.src=k?i+'.module.js':i+'.js';z.appendChild(u);k=window;
                    (k.adsbyadzuki=k.adsbyadzuki||[]).push(['init', a])
                })
                ({
                    geo: "${siteConfig.geo}",
                })
              `}
                </Script>

                <div data-adzuki-id={siteConfig.affiliate} data-adzuki-ads='10'></div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Cake Offer Down</title>
                <meta name="description" content="This offer may no longer be available or you do not qualify for it."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <style jsx global>{`
                  html {
                    font-family: ${poppins.style.fontFamily};
                  }
                `}</style>
            </Head>


            <div className={styles.body}>
                <div className={styles.header}>
                    {(siteConfig.logo) ?
                        <Image
                            className={styles.logo}
                            src={siteConfig.logo}
                            alt="Next.js Logo"
                            width={600}
                            height={200}
                            priority
                        /> : null}
                    <h2 className={styles.headerText}>This offer may no longer be available or you do not qualify for
                        it.</h2>

                </div>
                <main className={styles.main}>
                    <h2 className={styles.offersHeaderText}>Other offers you might like </h2>
                    {renderAdzuki()}
                </main>
            </div>
        </>
    )
}

export function getServerSideProps(context) {
    return {
        props: {affiliate: (context?.query?.affiliate) ?? null},
    };
}