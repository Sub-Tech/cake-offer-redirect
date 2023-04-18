import DefaultVersion from "@/versions/defaultVersion";
import CustomRenderVersion from "@/versions/customRenderVersion";


export default function Home(props) {
    switch (props.displayConfig.version) {
        case 'CustomRenderVersion':
            return CustomRenderVersion(props);
        default:
            return DefaultVersion(props);
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
        const branding_colours = [
            // '1c99bf',
            // '1cbf4a',
            // 'bf9e1c',
            '5d1cbf',
            // 'bf1c78'
        ]
        const ad_sizes = [
            'medium_rectangle',
            // 'large_mobile_banner'
        ]
        const display_titles = [
            '1',
            // '0'
        ]
        const number_of_ads = [
            // '3',
            // '6',
            // '9',
            '10',
            '15',
            '30'
        ]
        const main_headers = {
            // 1: 'We’re sorry, this offer is no longer available.',
            2: 'This offer may no longer be available or you do not qualify for it.'
        }
        const sub_headers = {
            1: 'Check out more offers below that you may like',
            // 2: 'Other offers you might like',
        }

        const version = {
            'DefaultVersion': 'default',
            'CustomRenderVersion': 'custom',
        }

        let config = {
            version: context?.query?.force_version ?? Object.keys(version)[Object.keys(version).length * Math.random() << 0],
            branding_colour: branding_colours[Math.floor(Math.random() * branding_colours.length)],
            ad_size: ad_sizes[Math.floor(Math.random() * ad_sizes.length)],
            display_title: display_titles[Math.floor(Math.random() * display_titles.length)],
            number_of_ads: number_of_ads[Math.floor(Math.random() * number_of_ads.length)],
            main_header: Object.keys(main_headers)[Object.keys(main_headers).length * Math.random() << 0],
            sub_header: Object.keys(sub_headers)[Object.keys(sub_headers).length * Math.random() << 0],
            code: '',
            noRender: false,
        };


        switch (config.version) {
            case 'CustomRenderVersion' :
                config.noRender = true;
                break;
        }

        Object.keys(config).forEach((key, index) => {
            if (key === 'code' || key === 'noRender') {
                return;
            }
            let condensedKey = key.split('_').map((item) => {
                return item.charAt(0);
            }).join('_');


            config.code = config.code + condensedKey + '=' + config[key] + ((index < (Object.keys(config).length - 2)) ? ',' : '');
        });

        config.main_header = main_headers[config.main_header];
        config.sub_header = sub_headers[config.sub_header];


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