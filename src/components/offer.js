import React, {useEffect, useRef} from 'react';
import styles from "@/styles/Bling.module.css";

export default function Offer({...props}) {
    const nodeRef = useRef(null);
    const ad = props.ad;

    useEffect(() => {
        console.log(props.ad.nodelinkElement);
        nodeRef.current.appendChild(props.ad.nodelinkElement);
    }, [props.ad.nodelinkElement]);

    return (
        <a className={styles.offerCardContainer} ref={nodeRef} target={"_blank"}>
            <div className={styles.offerCard}>
                <div>
                    {/*{ad.nodeImageWithLinkElement}*/}
                </div>
                <img className={styles.offerCardImage} src={ad.image}/>
                <div className={styles.offerCardBody}>
                    <h2 className={styles.offerCardTitle}>{ad.crender_title}</h2>
                    <h3 className={styles.offerCardSubTitle}>{ad.crender_description_md}</h3>

                    <div className={styles.offerCardButtonContainer}>
                        <span className={styles.offerCardInfoButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24">
                                <path fill="#f40"
                                      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                            </svg>
                        </span>
                        <span  className={styles.offerCardButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18"
                                 style={{marginRight: '8px'}}>
                                <path fill="white"
                                      d="M231.9 44.4C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88c0 14.4 3.5 28 9.6 40H48c-26.5 0-48 21.5-48 48v64c0 20.9 13.4 38.7 32 45.3V288 448c0 35.3 28.7 64 64 64H416c35.3 0 64-28.7 64-64V288v-2.7c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41zM464 176v64H432 288V176h72H464zm-240 0v64H80 48V176H152h72zm0 112V464H96c-8.8 0-16-7.2-16-16V288H224zm64 176V288H432V448c0 8.8-7.2 16-16 16H288zm72-336H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40s-17.9 40-40 40zm-136 0H152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8L225.3 128H224z"/>
                            </svg>
                            Claim</span>
                        {/*{ad.nodePixelElement}*/}
                    </div>
                </div>
            </div>
        </a>
    );
}