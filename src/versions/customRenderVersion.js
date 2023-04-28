import GlobalHead from "@/components/head";
import styles from '@/styles/CustomRender.module.css'
import Image from "next/image";
import Countdown, {zeroPad} from "react-countdown";
import {useEffect, useState} from "react";
import OfferCard from "@/components/offerCard";

const observable = {};
export default function CustomRenderVersion(props) {
    const [adzukiAds, setAdzukiAds] = useState([])

    useEffect(() => {
        let t = setInterval(() => {
            if (window.adzukiGlobalAds) {
                setAdzukiAds(window.adzukiGlobalAds.data)
                clearInterval(t)
            }
        }, 1000)
    })


    function renderAds() {

        if (!adzukiAds || adzukiAds.length === 0) return null

        return adzukiAds.map((ad, index) => <OfferCard ad={ad} key={ad.offer_id}/>)
    }

    const renderAdzukiDiv = () => {
        if (!props.siteConfig.geo) return null;


        return (
            <div data-adzuki-id={props.siteConfig.adzuki_id}
                 data-adzuki-ads={props.displayConfig.number_of_ads}
                 data-adzuki-exclusive={(props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
                 data-adzuki-top-tags={(!props.siteConfig.exclusive) ? props.siteConfig.tag : ''}
                 data-adzuki-ad-size={props.displayConfig.ad_size}
                 style={{display: 'none'}}></div>
        )
    }


    return (
        <>
            <GlobalHead props={props}/>

            <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.container}>
                            {(props.siteConfig.logo) ?
                                <div className={styles.headerTopLogo}>
                                    <Image
                                        className={styles.headerTopLogoImage}
                                        src={props.siteConfig.logo}
                                        alt="Logo"
                                        width={600}
                                        height={200}
                                        priority
                                    /></div> : null}
                            <h6 className={styles.headerTopText}>Oh no! These things happen from time to time</h6>
                        </div>
                    </div>
                    <div className={styles.headerMain}>
                        <div className={styles.container} style={{position:'relative' ,padding:'40px 0'}}>
                            <img src={"/images/customRender/own/right-tree.png"}
                                 className={styles.headerMainTreeRight}/>
                            <img src={"/images/customRender/own/cactus.png"}
                                 className={styles.headerMainCactusLeft}/>
                            <h2 className={styles.headerMainText}
                                dangerouslySetInnerHTML={{__html: props.displayConfig.main_header}}></h2><br/>
                            <h3 className={styles.headerSubText}
                                dangerouslySetInnerHTML={{__html: props.displayConfig.sub_header}}></h3>
                        </div>
                    </div>
                    <div className={styles.headerMainCountdownContainer}>
                        <div className={styles.container}>
                            <h2 className={styles.headerMainCountdownText}>Your exclusive deals expire in
                                : <b><Countdown date={Date.now() + (5 * 60000)}
                                                renderer={(props) => zeroPad(props.minutes) + ':' + zeroPad(props.seconds)}/></b>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.offersContainer}>
                        {renderAdzukiDiv()}
                        {renderAds()}
                    </div>
                </div>

            </div>
        </>)
}

