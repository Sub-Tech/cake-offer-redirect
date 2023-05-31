import GlobalHead from "@/components/head";
import styles from '@/styles/Winner.module.css'
import Image from "next/image";
import Countdown, {zeroPad} from "react-countdown";
import {AdzukiAd, AdzukiAdLink, useAdzuki} from "adzuki-client-react";
import Markdown from "markdown-to-jsx";
import {useEffect, useState} from "react";

export default function WinnerVersion({adzukiConfig, displayConfig, siteConfig, location}) {

    const [localAdzukiConfig, setLocalAdzukiConfig] = useState({...adzukiConfig, suppressFetch: true});
    const {adSlotAds} = useAdzuki(localAdzukiConfig);
    const [peopleCount, setPeopleCount] = useState(null);
    const [formStep, setFormStep] = useState(1);
    const [rewards, setRewards] = useState([]);
    const [rewardSwitcherRunning, setRewardSwitcher] = useState(false);
    const [gender, setGender] = useState(null);
    const [age, setAge] = useState(null);

    useEffect(() => {
        confetti();
        setPeopleCount(Math.floor(Math.random() * 48) + 8);
        if (!rewardSwitcherRunning) {
            setRewardSwitcher(true);
            setInterval(function () {
                const icons = ['📱', '💻', '💄', '✈️', '📷', '📺', '🍷', '🍔', '🛍️', '🤿', '🖥️', '📚', '💸', '💸'];
                let newRewards = [];
                let i = 0;

                while (newRewards.length < 9) {
                    newRewards[i] = icons[Math.floor(Math.random() * icons.length)]
                    i++;
                }
                setRewards(newRewards);
            }, 350)
        }
    }, [])

    useEffect(() => {
        localAdzukiConfig.gender = gender;
    }, [gender])

    useEffect(() => {
        localAdzukiConfig.age = age;
    }, [age])

    function confetti() {
        var elements = document.querySelectorAll("#confetti");
        elements.forEach(function (element) {
            var confetticount = (element.offsetWidth / 50) * 2;
            for (var i = 0; i <= confetticount; i++) {
                var span = document.createElement("span");
                span.className = `${styles.particle} ${(rnd(1, 2) === 1) ? styles.c1 : styles.c2}`;
                span.style.top = rnd(10, 50) + "%";
                span.style.left = rnd(0, 100) + "%";
                span.style.width = rnd(8, 10) + "px";
                span.style.height = rnd(3, 5) + "px";
                span.style.animationDelay = rnd(0, 30) / 10 + "s";
                element.appendChild(span);
            }
        });
    }

    function rnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function renderAds() {
        return adSlotAds.map((ad) =>
            <AdzukiAd ad={ad} key={ad.offer_id}>
                <AdzukiAdLink ad={ad}>
                    <span className={styles.offerCardContainer}>
                        <div className={styles.offerCard}>
                            <img src={ad.image} alt={ad.lead_text} className={styles.offerCardImage}/>
                            <div className={styles.offerCardBody}>
                                <h2 className={styles.offerCardTitle}>{ad.crender_title || ad.lead_text || ""}</h2>
                                <div className={styles.offerCardSubTitle}>
                                    <Markdown>{ad.crender_description_md || "Click to grab this deal"}</Markdown>
                                </div>

                                <div className={styles.offerCardButtonContainer}>
                                    <span className={styles.offerCardInfoButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24">
                                            <path fill="#f40"
                                                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                                        </svg>
                                    </span>
                                    <span className={styles.offerCardButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18"
                                             style={{marginRight: '8px'}}>
                                            <path fill="white"
                                                  d="M231.9 44.4C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88c0 14.4 3.5 28 9.6 40H48c-26.5 0-48 21.5-48 48v64c0 20.9 13.4 38.7 32 45.3V288 448c0 35.3 28.7 64 64 64H416c35.3 0 64-28.7 64-64V288v-2.7c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41zM464 176v64H432 288V176h72H464zm-240 0v64H80 48V176H152h72zm0 112V464H96c-8.8 0-16-7.2-16-16V288H224zm64 176V288H432V448c0 8.8-7.2 16-16 16H288zm72-336H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40s-17.9 40-40 40zm-136 0H152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8L225.3 128H224z"/>
                                        </svg>
                                        {ad.cta_text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </span>
                </AdzukiAdLink>
            </AdzukiAd>
        )
    }

    function loadAds() {
        setLocalAdzukiConfig({...localAdzukiConfig, suppressFetch: false})
    }

    function getFormStep() {
        switch (formStep) {
            case 1:
                return (<>
                        <h3 className={styles.formQuestionText}>How often do you eat chocolate?</h3>
                        <div className={styles.formOption} onClick={() => handleStepSubmit(null, null)}>Never</div>
                        <div className={styles.formOption} onClick={() => handleStepSubmit(null, null)}>1-3 times a
                            week
                        </div>
                        <div className={styles.formOption} onClick={() => handleStepSubmit(null, null)}>4-6 times a
                            week
                        </div>
                        <div className={styles.formOption} onClick={() => handleStepSubmit(null, null)}>Daily</div>
                    </>
                );
                break;
            case 2:
                return (<>
                        <h3 className={styles.formQuestionText}>Are you Male or Female?</h3>
                        <div className={styles.formOption} onClick={() => handleStepSubmit(setGender, 'f')}
                             style={{background: '#ff96d0', borderColor: '#ff96d0'}}>Female
                        </div>
                        <div className={styles.formOption} onClick={() => handleStepSubmit(setGender, 'm')}
                             style={{background: '#96c9ff', borderColor: '#96c9ff'}}>Male
                        </div>
                    </>
                );
                break
            case 3:
                return (<>
                        <h3 className={styles.formQuestionText}>How old are you?</h3>
                        <input className={styles.formInput} placeholder={'Enter your age'} type="number" step="1"
                               onChange={(e) => setAge(e.target.value)}/>
                        <div>
                            <div className={styles.submitButton} onClick={() => loadAds()}>Claim Rewards</div>
                        </div>
                    </>
                );
                break
        }
    }

    function scrollToForm() {
        const element = document.getElementById('form');
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function handleStepSubmit(setter, value) {
        if (setter) {
            setter(value);
        }
        setFormStep(formStep + 1);
    }

    return (
        <>
            <GlobalHead/>

            <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <img src={'/logos/extra-rewards-4-u.png'} className={styles.logo}/>
                    </div>
                </div>

                <div className={styles.quizContainer}>
                    <div className={styles.container}>
                        <div className={styles.quizContainerHeaderBox}>
                            <div className={styles.quizContainerHeaderBoxLeft}>
                                <div className={styles.textcontainer}>
                        <span className={`${styles.particletext} ${styles.confetti}`}
                              id={'confetti'}>Congratulation</span>
                                </div>
                                <h2 className={styles.quizContainerHeaderBoxTitle}>🎉 {peopleCount} people
                                    near <b>{(location.city) ? location.city : 'you'}</b> have claimed rewards today!
                                </h2>
                                <div className={styles.quizContainerHeaderBoxButton} onClick={() => scrollToForm()}>Claim Now</div>
                            </div>
                        </div>

                        {(!adSlotAds.length) ?
                            <>
                                <div className={styles.container}>
                                    <div className={styles.form} id={'form'}>
                                        <span className={styles.formImage}>🎁</span>
                                        <h2 className={styles.formHeader}>Complete to claim</h2>
                                        {getFormStep()}
                                    </div>
                                </div>

                                <div className={styles.container}>
                                    <div className={styles.offersHoldingArea}>
                                        <h3 className={styles.offersHoldingAreaHeader}>Your rewards are waiting for
                                            you!</h3>
                                        <h4 className={styles.offersHoldingAreaSubHeader}>Complete the quick quiz above
                                            to claim
                                            your rewards</h4>
                                        <div className={styles.offersHoldingAreaOffers}>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 1</h4><span
                                                className={styles.rewardIcon}>{rewards[0]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 2</h4><span
                                                className={styles.rewardIcon}>{rewards[1]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 3</h4><span
                                                className={styles.rewardIcon}>{rewards[2]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 4</h4><span
                                                className={styles.rewardIcon}>{rewards[3]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 5</h4><span
                                                className={styles.rewardIcon}>{rewards[4]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 6</h4><span
                                                className={styles.rewardIcon}>{rewards[5]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 7</h4><span
                                                className={styles.rewardIcon}>{rewards[6]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 8</h4><span
                                                className={styles.rewardIcon}>{rewards[7]}</span></div>
                                            <div className={styles.offersHoldingAreaOffer}><h4
                                                className={styles.offersHoldingAreaOfferText}>Reward 9</h4><span
                                                className={styles.rewardIcon}>{rewards[8]}</span></div>

                                        </div>
                                    </div>
                                </div>
                            </> : <div className={styles.container}><div className={styles.offersContainer}> {renderAds()}</div></div>}
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.container}>
                        <h3 className={styles.footerText}>You reached this page because the link you tried to access
                            could not be found, as an apology we have given you the chance to claim some amazing
                            rewards.</h3>
                    </div>
                </div>
            </div>
        </>)
}

