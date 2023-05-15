import DefaultVersion from "@/versions/defaultVersion";
import CustomRenderVersion from "@/versions/customRenderVersion";
import BoldVersion from "@/versions/boldVersion";


export default function Home(props) {
    switch (props.displayConfig.version) {
        case 'BoldVersion':
            return BoldVersion(props);
        case 'CustomRenderVersion':
            return CustomRenderVersion(props);
        default:
            return CustomRenderVersion(props);
    }
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
            affiliate: (context?.query?.affiliate) ?? null,
            s5: (context?.query?.s5) ?? null,
            isDefaultAffiliate: false
        }

        switch (config.affiliate) {
            // UK Sites
            case '19211':
            case '12':
            case '19191':
            case '19212':
            case '19463':
                config.logo = '/logos/free-club-uk.png';
                config.adzuki_id = '19463'
                config.geo = 'UK';
                config.link = 'https://freeclub.co.uk/';
                config.exclusive = true;
                break;
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
            case '19477': // For Zeropark
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
            case '19425':
                config.geo = 'US';
                config.adzuki_id = '19465';
                config.isDefaultAffiliate = true;
                break;
            default:
                if (!context?.query?.country || context?.query?.country === 'GB' | context?.query?.country === 'gb' || context?.query?.country === 'UK' || context?.query?.country === 'uk') {
                    config.geo = 'UK';
                    config.adzuki_id = '19464';
                    config.isDefaultAffiliate = true;
                }

                if (context?.query?.country === 'US' || context?.query?.country === 'us') {
                    config.geo = 'US';
                    config.adzuki_id = '19465';
                    config.isDefaultAffiliate = true;
                }
                break;
        }

        config.tag = (context?.query?.tag) ?? config.tag
        return config;
    }

    const getDisplayConfig = () => {
        // Default lander is always the top version
        const versions = {
            'CustomRenderVersion': 'custom',
            // 'BoldVersion': 'bold',
        }

        const splitPercentage = 5; // How much traffic we will send off from the default lander : 5 = 20%, 10 = 10%

        let version = Object.keys(versions)[0]; // Default lander

        if(context?.query?.force_version) {
            version = context?.query?.force_version;
        } else if (Math.floor(Math.random() * splitPercentage) === 1) { // Split 10% of the traffic off to test with
            version = Object.keys(versions)[Object.keys(versions).length * Math.random() << 0];
        }

        const options = {
            branding_colours: null,
            ad_sizes: null,
            display_titles: null,
            number_of_ads: null,
            main_headers: null,
            sub_headers: null
        }

        switch (version) {
            case 'CustomRenderVersion':
                options.main_headers = {
                    3: 'We are sorry this page is no longer available'
                }
                options.sub_headers = {
                    3: `Choose <span style="color:#7f57bb;">3 vouchers</span> as an apology`,
                }
                options.number_of_ads = [
                    25
                ]
                options.ad_sizes = [
                    'medium_rectangle',
                ]
                break;
            default:
                options.branding_colours = ['5d1cbf'];
                options.ad_sizes = ['medium_rectangle']
                options.display_titles = ['1'];
                options.number_of_ads = ['25'];
                options.main_headers = { 3: 'We are sorry this page is no longer available'}
                options.sub_headers = {3: `Choose <span style="color:#7f57bb;">3 vouchers</span> as an apology`}
                break;
        }


        let config = {
            version,
            branding_colour: options.branding_colours ? options.branding_colours[Math.floor(Math.random() * options.branding_colours.length)] : null,
            ad_size: options.ad_sizes ? options.ad_sizes[Math.floor(Math.random() * options.ad_sizes.length)] : null,
            display_title: options.display_titles ? options.display_titles[Math.floor(Math.random() * options.display_titles.length)] : null,
            number_of_ads: options.number_of_ads ? options.number_of_ads[Math.floor(Math.random() * options.number_of_ads.length)] : null,
            main_header: options.main_headers ? Object.keys(options.main_headers)[Object.keys(options.main_headers).length * Math.random() << 0] : null,
            sub_header: options.sub_headers ? Object.keys(options.sub_headers)[Object.keys(options.sub_headers).length * Math.random() << 0] : null,
            code: '',
            noRender: false,
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

        config.main_header = options.main_headers ? options.main_headers[config.main_header] : null;
        config.sub_header = options.sub_headers ? options.sub_headers[config.sub_header] : null;


        switch (context?.query?.affiliate) {
            case '19468':
            case '19469':
            case '19477':
                config.main_header = '';
                config.sub_header = '';
                break;
        }

        return config;
    }


    return {
        props: {
            affiliate: (context?.query?.affiliate) ?? null,
            tag: (context?.query?.tag) ?? null,
            siteConfig: getSiteConfig(),
            displayConfig: getDisplayConfig(),
        },
    };
}