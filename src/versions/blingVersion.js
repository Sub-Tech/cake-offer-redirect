import GlobalHead from "@/components/head";
import styles from '@/styles/Bling.module.css'
import Image from "next/image";
import Countdown, {zeroPad} from "react-countdown";
import {useEffect, useState} from "react";
import {Container, Row, Col} from 'react-grid-system';
import OfferCard from '../components/offerCard';

const observable = {};
export default function BlingVersion(props) {
    const [adzukiAds, setAdzukiAds] = useState([])

    useEffect(() => {
        console.log('useEffect')
        let t = setInterval(() => {
            if (window.adzukiGlobalAds) {
                setAdzukiAds(window.adzukiGlobalAds.data)
                clearInterval(t)
            }
        }, 1000)
    })


    function renderAds() {
        console.log('here');

        if (!adzukiAds || adzukiAds.length === 0) return null

        console.log(adzukiAds);
        return adzukiAds.map((ad, index) => {

            return (
                <Offer ad={ad} key={index}></Offer>
            )
        })
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

            <Row>
                <Col sm={12}>
                    <div className={styles.header}>
                        <Container>
                            <Row style={{alignItems: 'center'}}>
                                <Col sm={4}>
                                    <img src={"/images/bling/lady.png"}
                                         className={styles.headerLady}/>
                                </Col>
                                <Col sm={8} style={{paddingLeft: 40}}>
                                    <h1 className={styles.headerMainText}>Oh S%*T,</h1>
                                    <h2 className={styles.headerSubText}>That page could not be found, you can choose 3
                                        vouchers as an apology</h2>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className={styles.headerMainCountdownContainer}>
                        <h2 className={styles.headerMainCountdownText}>Your exclusive deals expire in
                            : <b><Countdown date={Date.now() + (5 * 60000)}
                                            renderer={(props) => zeroPad(props.minutes) + ':' + zeroPad(props.seconds)}/></b>
                        </h2>
                    </div>
                </Col>
            </Row>

            <Container>
                <Row sm={12}>
                    <div className={styles.offersContainer}>
                        {renderAdzukiDiv()}
                        {renderAds()}
                    </div>
                </Row>
            </Container>
        </>)
}

