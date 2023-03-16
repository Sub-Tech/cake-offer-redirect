import Head from 'next/head'
import Image from 'next/image'
import {Poppins} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Script from "next/script";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const poppins = Poppins({weight: ['300', '600'], subsets: []});

export default function Home() {
    const router = useRouter();
    const affiliate = router.query.affiliate ?? '19304';
    const [logo, setLogo] = useState('');

    const getLogoUrl = () => {
        switch (affiliate) {
            case '19304':
                return '/logos/cashback.png'
            case '18920':
                return '/logos/paid-surveys.png'
            case '19200':
                return '/logos/20-cogs.png'
            case '18915':
                return '/logos/20-cogs.png'
            case '18685':
                return '/logos/global-survey-hub.png'
            case '18691':
                return '/logos/product-testing-usa.png'
            case '18824':
                return '/logos/us-product-testing.png'
            default:
                return '';
        }
    }

    useEffect(() => {
        setLogo(getLogoUrl());
    }, [])

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

            <Script
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `;(function(a,d,z,u,k,i){
          i='https://client.getadzuki.com/adzuki-client';d=document;z=d.getElementsByTagName('head')[0];u=d.createElement('script');
          k="noModule" in u;u.async=true;u.src=k?i+'.module.js':i+'.js';z.appendChild(u);k=window;
          d.addEventListener('DOMContentLoaded',function(){(k.adsbyadzuki=k.adsbyadzuki||[]).push(['init', a])})})({
          geo: 'UK',
        })`,
                }}
            />

            <div className={styles.header}>
                {(logo !== '') ?
                    <Image
                        className={styles.logo}
                        src={getLogoUrl()}
                        alt="Next.js Logo"
                        width={600}
                        height={200}
                        priority
                    /> : null}
                <h2 className={styles.headerText}>This offer may no longer be available or you do not qualify for it.</h2>

            </div>
            <main className={styles.main}>
                <h2 className={styles.offersHeaderText}>Other offers you might like </h2>
                <div data-adzuki-id={affiliate} data-adzuki-ads='10'></div>
            </main>
        </>
    )
}
