import GlobalHead from "@/components/head";
import styles from '@/styles/CustomRender.module.css'
import Image from "next/image";
import Countdown, {zeroPad} from "react-countdown";
import {useEffect} from "react";

export default function CustomRenderVersion(props) {

   const getAdzukiAdSlotReady = (ads) => {
       console.log('ads', ads);
   }

    return (
        <>
            <GlobalHead props={props} adzukiAdSlotReady={getAdzukiAdSlotReady}/>

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
                        <img src={"/images/customRender/cloud_desktop_left.svg"}
                             className={styles.headerMainCloudThree}/>
                        <img src={"/images/customRender/cloud_desktop_left.svg"}
                             className={styles.headerMainCloudFour}/>
                        <img src={"/images/customRender/cloud_desktop_right.svg"}
                             className={styles.headerMainCloudOne}/>
                        <img src={"/images/customRender/cloud_desktop_right.svg"}
                             className={styles.headerMainCloudTwo}/>
                        <div className={styles.container}>
                            <h2 className={styles.headerMainText}>{props.displayConfig.main_header}</h2>
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
            </div>
        </>)
}

