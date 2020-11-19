// Define the current enviroment
const determineEnviroment = () => {
    // If defined, use the Glider environment variable
    if(process.env.GLIDER_ENV) {
        return process.env.GLIDER_ENV;
    }

    // Otherwise use the Github branch provided by Vercel
    switch(process.env.VERCEL_GITHUB_COMMIT_REF || process.env.NOW_GITHUB_COMMIT_REF) {
        case 'master':
            return 'production';
        case 'develop':
        default:
            return 'staging';
    }
}
const enviroment = determineEnviroment();
console.log(`######ENVIRONMENT=>${enviroment}`);

// Get an an environment variable
const getConfigKey = (key) => {
    // Return environment specific variable if any
    const envKey = `${enviroment.toUpperCase()}_${key}`;
    if(process.env.hasOwnProperty(envKey)) {
      return process.env[envKey];
    }

    // Return variable key
    if(process.env.hasOwnProperty(key)) {
      return process.env[key];
    }

    // Config key does not exist
    return undefined;
};

// const GLIDER_BASEURL = `http://localhost:3000/api/v1`;
const GLIDER_BASEURL = getConfigKey('GLIDER_BASEURL') || `https://${enviroment}.b2b.glider.travel/api/v1`;

const GLIDER_CONFIG =
    {
        GLIDER_TOKEN: getConfigKey('GLIDER_JWT'),
        SEARCH_OFFERS_URL: GLIDER_BASEURL + "/offers/search",
        CREATE_WITH_OFFER_URL: GLIDER_BASEURL + "/orders/createWithOffer",
        SEATMAP_URL: GLIDER_BASEURL + "/offers/{offerId}/seatmap",
        REPRICE_OFFER_URL: GLIDER_BASEURL + "/offers/{offerId}/price",
        FULFILL_URL: GLIDER_BASEURL + "/orders/{orderId}/fulfill",
        ORGID: getConfigKey('GLIDER_ORGID'),
    };

const OTA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQgGlndUv/Lgk6j/tNn38TkyksX1x/WBtfKpPfuobeeMfOhRANCAAQTs1fXwUkTZvGI12UPa+kvkibfpQHs5KTDb4arbDJJCZf0EtWhNdmT6Ieu/W8Yo4gUZRsKf0K+hZjjW8DeY5d5\n-----END PRIVATE KEY-----"
const ORGID = {
    OTA_ORGID: getConfigKey('OTA_ORGID'),
    OTA_PRIVATE_KEY: OTA_PRIVATE_KEY.replace(/\\n/g, '\n'),
    GRAPH_URL:getConfigKey('GRAPH_URL')
}

const SIMARD_BASEURL = getConfigKey('SIMARD_BASEURL') || `https://${enviroment}.api.simard.io/api/v1`;

const SIMARD_CONFIG =
    {
        SIMARD_TOKEN: getConfigKey('SIMARD_JWT'),
        GUARANTEES_URL: SIMARD_BASEURL + "/balances/guarantees",
        CREATE_WITH_OFFER_URL: SIMARD_BASEURL + "/orders/createWithOffer",
        SIMULATE_DEPOSIT_URL: SIMARD_BASEURL + "/balances/simulateDeposit",
        ORGID: getConfigKey('SIMARD_ORGID') || "0x5e6994f76764ceb42c476a2505065a6170178a24c03d81c9f372563830001171",
        DEPOSIT_EXPIRY_DAYS:14,
    };


const REDIS_CONFIG =
    {
        REDIS_PORT: (getConfigKey('REDIS_PORT') && parseInt(getConfigKey('REDIS_PORT'))) || 14563,
        REDIS_HOST: getConfigKey('REDIS_HOST'),
        REDIS_PASSWORD: getConfigKey('REDIS_PASSWORD'),
        SESSION_TTL_IN_SECS: 60 * 60,
    };

const MONGO_CONFIG =
    {
        URL: getConfigKey('MONGO_URL'),
        DBNAME: getConfigKey('MONGO_DBNAME'),
    };

const STRIPE_CONFIG =
    {
        PUBLISHABLE_KEY: getConfigKey('STRIPE_PUBLISHABLE_KEY'),
        SECRET_KEY: getConfigKey('STRIPE_SECRET_KEY'),
        WEBHOOK_SECRET: getConfigKey('STRIPE_WEBHOOK_SECRET'),
        BYPASS_WEBHOOK_SIGNATURE_CHECK: (getConfigKey('STRIPE_BYPASS_WEBHOOK_SIGNATURE_CHECK') === "yes"),
    };
const ELASTIC_CONFIG =
    {
        URL: getConfigKey('ELASTIC_URL'),
    };

const GENERIC_CONFIG =
    {
        ENVIRONMENT: determineEnviroment(),
        ENABLE_HEALHCHECK:(getConfigKey('HEALTHCHECK_ENABLE') === "yes"),
        DEVELOPMENT_MODE:(getConfigKey('DEVELOPMENT_MODE') === "yes")
    };
const SENDGRID_CONFIG =
    {
        SENDGRID_API_KEY: getConfigKey('SENDGRID_API_KEY'),
        FROM_EMAIL_ADDR: getConfigKey('SENDGRID_FROM_EMAIL_ADDR') || 'noreply@glider.travel',
        TEMPLATE_ID: getConfigKey('SENDGRID_TEMPLATE_ID') || 'd-199fb2f410334d1296b0176e0435c4a7',
    };


module.exports = {
    GLIDER_CONFIG,
    SIMARD_CONFIG,
    REDIS_CONFIG,
    MONGO_CONFIG,
    STRIPE_CONFIG,
    ELASTIC_CONFIG,
    ORGID,
    GENERIC_CONFIG,
    SENDGRID_CONFIG
};
