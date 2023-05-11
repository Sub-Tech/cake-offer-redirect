import GlobalHead from "@/components/head";
import styles from '@/styles/Bling.module.css'
import Countdown, {zeroPad} from "react-countdown";
import {Container, Row, Col} from 'react-grid-system';
import {AdzukiAd, AdzukiAdLink, useAdzuki} from 'adzuki-client-react'
import Markdown from 'markdown-to-jsx';

export default function BlingVersion(props) {
    const {adSlotAds} = useAdzuki({
        reference: 'extrareward4you',
        geo: props.siteConfig.geo,
        adzukiId: props.siteConfig.adzuki_id,
        maxAds: props.displayConfig.number_of_ads,
    })

    function renderAds() {
        return adSlotAds.map((ad) => (
            <AdzukiAd ad={ad} key={ad.offer_id}>
                <AdzukiAdLink ad={ad}>

                <span className={styles.offerCardContainer}>
                    <div className={styles.offerCard}>
                        <img src={ad.image} alt={ad.lead_text} className={styles.offerCardImage}/>
                        <div className={styles.offerCardBody}>
                            <h2 className={styles.offerCardTitle}>{ad.crender_title}</h2>
                            <h3 className={styles.offerCardSubTitle}>{ad.crender_description_md}</h3>

                            <div className={styles.offerCardButtonContainer}>
                                <a className={styles.offerCardInfoButton} href={ad.url} target={"_blank"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24">
                                        <path fill="#f40"
                                              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                                    </svg>
                                </a>
                                <a href={ad.url} className={styles.offerCardButton} target={"_blank"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18"
                                         style={{marginRight: '8px'}}>
                                        <path fill="white"
                                              d="M231.9 44.4C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88c0 14.4 3.5 28 9.6 40H48c-26.5 0-48 21.5-48 48v64c0 20.9 13.4 38.7 32 45.3V288 448c0 35.3 28.7 64 64 64H416c35.3 0 64-28.7 64-64V288v-2.7c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41zM464 176v64H432 288V176h72H464zm-240 0v64H80 48V176H152h72zm0 112V464H96c-8.8 0-16-7.2-16-16V288H224zm64 176V288H432V448c0 8.8-7.2 16-16 16H288zm72-336H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40s-17.9 40-40 40zm-136 0H152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8L225.3 128H224z"/>
                                    </svg>
                                    {ad.cta_text}</a>
                            </div>
                        </div>
                    </div>
                </span>
                </AdzukiAdLink>
            </AdzukiAd>
        ))
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
                        {renderAds()}
                    </div>
                </Row>
            </Container>
        </>)
}

