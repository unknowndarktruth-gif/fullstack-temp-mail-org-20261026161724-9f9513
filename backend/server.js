const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve cloned frontend static files
app.use(express.static(path.join(__dirname, '..')));

// Persistent local JSON database for synthesized CRUD & auth
const DB_FILE = path.join(__dirname, 'state_db.json');
let stateDb = { users: [], items: [], sessions: {}, submissions: [] };
if (fs.existsSync(DB_FILE)) {
    try { stateDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (e) {}
}
const saveDb = () => fs.writeFileSync(DB_FILE, JSON.stringify(stateDb, null, 2));

// Cloned API Blueprints captured via Playwright
const capturedRoutes = [
  {
    "url": "https://t.fullres.net/track/al",
    "path": "/track/al",
    "query": "",
    "method": "POST",
    "status": 200,
    "content_type": "",
    "request_post_data": "{\"type\":\"pv\",\"width\":1280,\"height\":720,\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"referrer\":\"\",\"metadata\":{\"isAdmin\":false},\"utmSource\":null,\"utmMedium\":null,\"utmCampaign\":null,\"utmTerm\":null,\"utmContent\":null,\"site\":\"tempmail\",\"url\":\"https://temp-mail.org/en/\",\"clientPageViewId\":\"1793031458164-53f2c3b3\",\"fullresSettingsModifiedAt\":null,\"siteTagInstallUrl\":\"https://cdn4.buysellads.net/pub/tempmail.js?1793031000000\"}",
    "response_body": null
  },
  {
    "url": "https://ad-delivery.net/px.gif?ch=2&e=0.6458053066116075",
    "path": "/px.gif",
    "query": "ch=2&e=0.6458053066116075",
    "method": "GET",
    "status": 200,
    "content_type": "image/gif",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ad-delivery.net/px.gif?ch=1&e=0.4790118690795633",
    "path": "/px.gif",
    "query": "ch=1&e=0.4790118690795633",
    "method": "GET",
    "status": 200,
    "content_type": "image/gif",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ad.doubleclick.net/favicon.ico?ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250&e=0.055460131184421835",
    "path": "/favicon.ico",
    "query": "ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250&e=0.055460131184421835",
    "method": "GET",
    "status": 200,
    "content_type": "image/x-icon",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://web2.temp-mail.org/mailbox",
    "path": "/mailbox",
    "query": "",
    "method": "POST",
    "status": 200,
    "content_type": "application/json; charset=utf-8",
    "request_post_data": null,
    "response_body": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZmM0MTIxOTMxZTAxNGU4YjgxZWMwMGEzODA4NGJhMmUiLCJtYWlsYm94Ijoid2ltYWNlczYyNEBob3BlZnVuZGVyLmNvbSIsImlhdCI6MTc5MzAzMTQ1OX0.GKLFCSt2oFDsDGkrkTvOW0LY2ct-GPdBxH2OgO9D-q8",
      "mailbox": "wimaces624@hopefunder.com"
    }
  },
  {
    "url": "https://cdn.api.btloader.com/device?orgid=5102648370397184&platformVersion=10.0&fullVersionList=%5B%7B%22brand%22%3A%22Not%3AA-Brand%22%2C%22version%22%3A%228.0.0.0%22%7D%2C%7B%22brand%22%3A%22Chromium%22%2C%22version%22%3A%22156.0.8078.4%22%7D%2C%7B%22brand%22%3A%22HeadlessChrome%22%2C%22version%22%3A%22156.0.8078.4%22%7D%5D&upapi=true",
    "path": "/device",
    "query": "orgid=5102648370397184&platformVersion=10.0&fullVersionList=%5B%7B%22brand%22%3A%22Not%3AA-Brand%22%2C%22version%22%3A%228.0.0.0%22%7D%2C%7B%22brand%22%3A%22Chromium%22%2C%22version%22%3A%22156.0.8078.4%22%7D%2C%7B%22brand%22%3A%22HeadlessChrome%22%2C%22version%22%3A%22156.0.8078.4%22%7D%5D&upapi=true",
    "method": "GET",
    "status": 200,
    "content_type": "application/json",
    "request_post_data": null,
    "response_body": {
      "device": {
        "os": "Windows",
        "osv": "10.0",
        "ext": {
          "fiftyonedegrees_deviceId": "15364-38914-138645-18092"
        }
      }
    }
  },
  {
    "url": "https://ad-delivery.net/px.gif?ch=1&e=0.317116890632123",
    "path": "/px.gif",
    "query": "ch=1&e=0.317116890632123",
    "method": "GET",
    "status": 200,
    "content_type": "image/gif",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ad-delivery.net/px.gif?ch=2&e=0.6114021083577049",
    "path": "/px.gif",
    "query": "ch=2&e=0.6114021083577049",
    "method": "GET",
    "status": 200,
    "content_type": "image/gif",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ad.doubleclick.net/favicon.ico?ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250&e=0.7274609688187373",
    "path": "/favicon.ico",
    "query": "ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250&e=0.7274609688187373",
    "method": "GET",
    "status": 200,
    "content_type": "image/x-icon",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ab.dns-finder.com/meta/dns",
    "path": "/meta/dns",
    "query": "",
    "method": "GET",
    "status": 200,
    "content_type": "text/plain; charset=utf-8",
    "request_post_data": null,
    "response_body": "ok"
  },
  {
    "url": "https://api.btloader.com/exd?tid=OI6ndu8RRo-DtdDiyi86-a17900cfca&sid=aT4f9OrKSA-SzgpG6BHL-a17900cfca&cv=2.1.196&upapi=true",
    "path": "/exd",
    "query": "tid=OI6ndu8RRo-DtdDiyi86-a17900cfca&sid=aT4f9OrKSA-SzgpG6BHL-a17900cfca&cv=2.1.196&upapi=true",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"websiteID\":\"6219972445995008\",\"orgID\":\"5102648370397184\",\"pageUrl\":\"https://temp-mail.org/en/\",\"extensionsData\":{\"signals\":{\"xAcceptableAdsHeader\":\"\"},\"trustedIframe\":{\"meta\":{\"loadStatus\":\"LOADED\",\"loadTime\":3613},\"htmlSignalAttributes\":[]}},\"sentOnUnload\":false,\"sentOnSPAChange\":false}",
    "response_body": null
  },
  {
    "url": "https://srv.buysellads.com/ads/CEAD527M.json?forcebanner=642368&ignoretargeting=yes",
    "path": "/ads/CEAD527M.json",
    "query": "forcebanner=642368&ignoretargeting=yes",
    "method": "GET",
    "status": 200,
    "content_type": "application/json; charset=utf-8",
    "request_post_data": null,
    "response_body": {
      "ads": [
        {
          "active": "1",
          "ad_via_link": "https://buy.buysellads.com/directory?utm_source=optimize_tempmail_page_views&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=",
          "bannerid": "642368",
          "creativeid": "784360",
          "evenodd": "0",
          "external_id": "397199",
          "height": "0",
          "i": "0",
          "identifier": "c0216a5f0f1b6f4fdf4dd6036584cebb",
          "longimp": "T4DAGUSPTTTTTT4TNIZCWTTTTTT5JDNW2VTTTTTTT3AROBETTTTTT",
          "longlink": "TCDAGUSPTTTTTT4TNIZCWTTTTTT5JDNW2VTTTTTTT3AROBETTTTTTJLV2MSNWYBCPQMC5OZM23SNPAIQKQTI4OLCP7KT",
          "num_slots": "1",
          "statconv": "https://srv.buysellads.com/ads/convert/x/GTND4277CKYDPK3MCT7LYKQUF67DV2QMCABDVZ3JCAAI6K7JCWYI4KJKFT7IK2QLCVYDKKQNCTAIL2JEF6SD5KQKC6SILK7ECKYDVK3EHJJNOSINKM7FV",
          "statimp": "https://srv.buysellads.com/ads/imp/x/GTND4277CKYDPK3MCT7LYKQUF67DV2QMCABDVZ3JCAAI6K7JCWYI4KJKFT7IK2QLCVYDKKQNCTAIL2JEF6SD5KQKC6SILK7ECKYDVK3EHJWNBADLKM7UCBZG2Y",
          "statlink": "https://srv.buysellads.com/ads/click/x/GTND4277CKYDPK3MCT7LYKQUF67DV2QMCABDVZ3JCAAI6K7JCWYI4KJKFT7IK2QLCVYDKKQNCTAIL2JEF6SD5KQKC6SILK7ECKYDVK3EHJNCLSIZ",
          "statview": "https://srv.buysellads.com/ads/viewable/x/GTND4277CKYDPK3MCT7LYKQUF67DV2QMCABDVZ3JCAAI6K7JCWYI4KJKFT7IK2QLCVYDKKQNCTAIL2JEF6SD5KQKC6SILK7ECKYDVK3EHJSCL7ZUKHJCY7V",
          "timestamp": "1793031462",
          "v": "0",
          "width": "0",
          "zoneid": "48775",
          "zonekey": "CEAD527M"
        },
        {}
      ]
    }
  },
  {
    "url": "https://id.a-mx.com/sync/?tagId=&ref=null&u=https://temp-mail.org/en/&tl=https://temp-mail.org/en/&nf=0&rt=true&v=11.25.0&av=2.0&vg=bsapb&us_privacy=null&am=null&gdpr=0&gdpr_consent=",
    "path": "/sync/",
    "query": "tagId=&ref=null&u=https://temp-mail.org/en/&tl=https://temp-mail.org/en/&nf=0&rt=true&v=11.25.0&av=2.0&vg=bsapb&us_privacy=null&am=null&gdpr=0&gdpr_consent=",
    "method": "GET",
    "status": 302,
    "content_type": "",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://hb.yellowblue.io/hb-multi",
    "path": "/hb-multi",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"params\":{\"wrapper_type\":\"prebidjs\",\"wrapper_vendor\":\"bsapb\",\"wrapper_version\":\"11.25.0\",\"adapter_version\":\"8.0.0\",\"auction_start\":1793031467760,\"publisher_id\":\"64d8986b534fd000016358c2\",\"publisher_name\":\"temp-mail.org\",\"site_domain\":\"temp-mail.org\",\"dnt\":0,\"device_type\":\"1\",\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"is_wrapper\":false,\"session_id\":\"67ff9e09-e56b-49f3-b07b-1833c5c4ef6f\",\"tmax\":3500,\"userIds\":\"[{\\\"source\\\":\\\"pubcid.org\\\",\\\"uids\\\":[{\\\"id\\\":\\\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\\\",\\\"atype\\\":1}]}]\",\"site_metadata\":\"{\\\"domain\\\":\\\"temp-mail.org\\\",\\\"keywords\\\":\\\"free,temporary,email,disposable,mail,email address\\\",\\\"publisher\\\":{\\\"domain\\\":\\\"temp-mail.org\\\"},\\\"page\\\":\\\"https://temp-mail.org/en/\\\",\\\"ext\\\":{\\\"data\\\":{\\\"documentLang\\\":\\\"en\\\"}},\\\"content\\\":{\\\"language\\\":\\\"en\\\"}}\",\"user_metadata\":\"{\\\"ext\\\":{\\\"eids\\\":[{\\\"source\\\":\\\"pubcid.org\\\",\\\"uids\\\":[{\\\"id\\\":\\\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\\\",\\\"atype\\\":1}]}]}}\",\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"cs_method\":\"iframe\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,\",\"referrer\":null,\"page_url\":\"https://temp-mail.org/en/\"},\"bids\":[{\"mediaType\":\"banner\",\"adUnitCode\":\"bsa-zone_1594132707957-3_123456\",\"sizes\":[[728,90]],\"floorPrice\":0,\"bidId\":\"490cc0dc-293d-41a3-8e21-aa9a51fbf59a\",\"loop\":1,\"bidderRequestId\":\"67ff9e09-e56b-49f3-b07b-1833c5c4ef6f\",\"transactionId\":\"ueebd7ebe-4055-497e-9ae8-c85fa6926b7b\",\"coppa\":0,\"gpid\":\"/8691100/TempMail_S2S_InContent_ROS_Pos1#bsa-zone_1594132707957-3_123456\",\"placementId\":\"TempMail_S2S_InContent_ROS_Pos1\",\"sua\":{\"source\":1,\"",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594132854548-5_123456\",\"sizes\":[{\"w\":728,\"h\":90}],\"transactionId\":\"u4ef13ec0-14e1-46a8-8c7b-4eeb64605f46\",\"timeout\":3500,\"bidId\":\"81245e6d-c830-4503-8111-8d5e1de4ba95\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594133435018-0_123456\",\"sizes\":[{\"w\":300,\"h\":250},{\"w\":336,\"h\":280}],\"transactionId\":\"u5a46694a-3925-458a-81fb-6e4aefab1f23\",\"timeout\":3500,\"bidId\":\"24f599ad-c4cf-4cce-a814-a073f71ac309\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594133312019-1_123456\",\"sizes\":[{\"w\":160,\"h\":600}],\"transactionId\":\"u1d555795-6351-4cc1-8383-0b8c0ed260e4\",\"timeout\":3500,\"bidId\":\"6c10362e-ff1e-444d-9458-752ccafc67a6\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594133221208-0_123456\",\"sizes\":[{\"w\":160,\"h\":600}],\"transactionId\":\"u7142d3fc-3403-410e-942a-589a8f60d9b9\",\"timeout\":3500,\"bidId\":\"64a9d7c5-aaf8-4f11-9565-b6e0eb08a5c5\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594312726083-3_123456\",\"sizes\":[{\"w\":970,\"h\":250},{\"w\":970,\"h\":90},{\"w\":728,\"h\":90}],\"transactionId\":\"uc3839626-df3a-42e5-b9ae-392cd2e1ef83\",\"timeout\":3500,\"bidId\":\"448f12de-74b7-436c-b93c-bea392dc0efb\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594132954409-8_123456\",\"sizes\":[{\"w\":728,\"h\":90}],\"transactionId\":\"ue5fdd741-7f4a-4878-94d8-2cdcc56006a9\",\"timeout\":3500,\"bidId\":\"9081e740-51d0-4eb6-9dd1-c315428947b7\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594133430290-1_123456\",\"sizes\":[{\"w\":300,\"h\":250},{\"w\":336,\"h\":280}],\"transactionId\":\"u5ffafb9a-c37e-4264-b9be-c3cdb4e6ca44\",\"timeout\":3500,\"bidId\":\"9242cfc7-38da-450d-b8f7-4643a370d401\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://prebid.smilewanted.com/",
    "path": "/",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"zoneId\":\"buysellads.com_hb_display\",\"currencyCode\":\"EUR\",\"tagId\":\"bsa-zone_1594132707957-3_123456\",\"sizes\":[{\"w\":728,\"h\":90}],\"transactionId\":\"ub44e9d3b-8759-44ae-abe1-80c63e0fa675\",\"timeout\":3500,\"bidId\":\"2855f411-47dd-4881-83bb-6e9748dc43b4\",\"positionType\":\"\",\"prebidVersion\":\"11.25.0\",\"schain\":\"1.0,1!buysellads.com,9145,1,15122911-b272-4092-9a54-2dde5ea59d45,,,\",\"pageDomain\":\"https://temp-mail.org/en/\",\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_InContent_ROS_Pos1#bsa-zone_1594132707957-3_123456\",\"data\":{\"divId\":\"bsa-zone_1594132707957-3_123456\",\"placement\":\"TempMail_S2S_InContent_ROS_Pos1\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_InContent_ROS_Pos1\"}},\"tid\":\"u61a0ebed-e444-4ff7-9d60-8febdbb1d90f\",\"tidSource\":\"pbjs\"},\"id\":\"WLSqMwBD0bU5vs\",\"banner\":{\"format\":[{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594132707957-3_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"a8609454-042c-471c-808a-3107db9cf12a\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_InContent_ROS_Pos2#bsa-zone_1594132854548-5_123456\",\"data\":{\"divId\":\"bsa-zone_1594132854548-5_123456\",\"placement\":\"TempMail_S2S_InContent_ROS_Pos2\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_InContent_ROS_Pos2\"}},\"tid\":\"ue940d94d-6631-4fcc-8385-f2057dd49797\",\"tidSource\":\"pbjs\"},\"id\":\"MsMDdc9rv3yY9q\",\"banner\":{\"format\":[{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594132854548-5_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"ef3814e9-cc96-46d0-b1ae-371a983b8908\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_Sidebar_ROS_Pos2#bsa-zone_1594133312019-1_123456\",\"data\":{\"divId\":\"bsa-zone_1594133312019-1_123456\",\"placement\":\"TempMail_S2S_Sidebar_ROS_Pos2\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_Sidebar_ROS_Pos2\"}},\"tid\":\"u816e1bfa-6a3b-41bd-a90a-86e091654000\",\"tidSource\":\"pbjs\"},\"id\":\"Q6TUu7OkByCQ7Q\",\"banner\":{\"format\":[{\"w\":160,\"h\":600}]},\"secure\":1,\"tagid\":\"bsa-zone_1594133312019-1_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"1a4b88b7-5482-4a63-ad3c-176b23ca044d\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_Sidebar_ROS_Pos1#bsa-zone_1594133221208-0_123456\",\"data\":{\"divId\":\"bsa-zone_1594133221208-0_123456\",\"placement\":\"TempMail_S2S_Sidebar_ROS_Pos1\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_Sidebar_ROS_Pos1\"}},\"tid\":\"uedaa48f2-491d-4d65-99dd-05a3e51d624c\",\"tidSource\":\"pbjs\"},\"id\":\"sI2IU1sIJ2UkTe\",\"banner\":{\"format\":[{\"w\":160,\"h\":600}]},\"secure\":1,\"tagid\":\"bsa-zone_1594133221208-0_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"85dee9da-03c0-4510-afc6-8f2c5a479f73\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_SuperLeaderboard_ROS_Desktop#bsa-zone_1594312726083-3_123456\",\"data\":{\"divId\":\"bsa-zone_1594312726083-3_123456\",\"placement\":\"TempMail_S2S_SuperLeaderboard_ROS_Desktop\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_SuperLeaderboard_ROS_Desktop\"}},\"tid\":\"u743754fc-72f4-4ffd-af3b-0f2a5b2ee1e4\",\"tidSource\":\"pbjs\"},\"id\":\"rRjtPMIQ8MN3r0\",\"banner\":{\"format\":[{\"w\":970,\"h\":250},{\"w\":970,\"h\":90},{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594312726083-3_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"a5fe694a-9012-43e7-bc0f-92a927019586\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_MidRec_ROS_Pos1#bsa-zone_1594133430290-1_123456\",\"data\":{\"divId\":\"bsa-zone_1594133430290-1_123456\",\"placement\":\"TempMail_S2S_MidRec_ROS_Pos1\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_MidRec_ROS_Pos1\"}},\"tid\":\"u59880178-b894-4c7f-8f57-194c3ce51b4b\",\"tidSource\":\"pbjs\"},\"id\":\"ZhrNQeEcc2AuRs\",\"banner\":{\"format\":[{\"w\":300,\"h\":250},{\"w\":336,\"h\":280}]},\"secure\":1,\"tagid\":\"bsa-zone_1594133430290-1_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"446a1252-489b-49d0-b12f-4888274587c8\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_FixedFooter_ROS#bsa-zone_1594132954409-8_123456\",\"data\":{\"divId\":\"bsa-zone_1594132954409-8_123456\",\"placement\":\"TempMail_S2S_FixedFooter_ROS\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_FixedFooter_ROS\"}},\"tid\":\"u5478ed77-f01d-482c-8a5e-b4e5a4d47323\",\"tidSource\":\"pbjs\"},\"id\":\"f5k3qHP4fax3rU\",\"banner\":{\"format\":[{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594132954409-8_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"9e654693-75f7-4f0a-9d6d-b342570e5e3f\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://ssb-global.smartadserver.com/api/bid?callerId=169",
    "path": "/api/bid",
    "query": "callerId=169",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"gpid\":\"/8691100/TempMail_S2S_MidRec_ROS_Pos2#bsa-zone_1594133435018-0_123456\",\"data\":{\"divId\":\"bsa-zone_1594133435018-0_123456\",\"placement\":\"TempMail_S2S_MidRec_ROS_Pos2\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_MidRec_ROS_Pos2\"}},\"tid\":\"u98dbf6a8-4ae6-4791-a5a8-6c935b4d07a9\",\"tidSource\":\"pbjs\"},\"id\":\"AkJaOcvgZpMqpe\",\"banner\":{\"format\":[{\"w\":300,\"h\":250},{\"w\":336,\"h\":280}]},\"secure\":1,\"tagid\":\"bsa-zone_1594133435018-0_123456\",\"displaymanager\":\"Prebid.js\",\"displaymanagerver\":\"11.25.0\"}],\"source\":{\"ext\":{\"schain\":{\"ver\":\"1.0\",\"complete\":1,\"nodes\":[{\"asi\":\"buysellads.com\",\"sid\":\"9145\",\"hp\":1,\"rid\":\"15122911-b272-4092-9a54-2dde5ea59d45\"}]},\"tidSource\":\"pbjs\"},\"tid\":\"u0f45527d-cc68-4468-9436-0bc56427be37\"},\"site\":{\"domain\":\"temp-mail.org\",\"keywords\":\"free,temporary,email,disposable,mail,email address\",\"publisher\":{\"domain\":\"temp-mail.org\",\"id\":3835},\"page\":\"https://temp-mail.org/en/\",\"ext\":{\"data\":{\"documentLang\":\"en\"}},\"content\":{\"language\":\"en\"}},\"device\":{\"w\":1280,\"h\":720,\"ua\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36\",\"language\":\"en\",\"ext\":{\"vpw\":1280,\"vph\":720},\"sua\":{\"source\":1,\"platform\":{\"brand\":\"Windows\"},\"browsers\":[{\"brand\":\"Not:A-Brand\",\"version\":[\"8\"]},{\"brand\":\"Chromium\",\"version\":[\"156\"]},{\"brand\":\"HeadlessChrome\",\"version\":[\"156\"]}],\"mobile\":0}},\"user\":{\"ext\":{\"eids\":[{\"source\":\"pubcid.org\",\"uids\":[{\"id\":\"b2e575d0-c5fb-43d9-8ced-5fc5553a2429\",\"atype\":1}]}]}},\"id\":\"8472c64b-2b07-43d3-8b33-2d4051ca9fa9\",\"test\":0,\"tmax\":3500,\"ext\":{\"equativprebidjsversion\":\"11.25.0\"}}",
    "response_body": null
  },
  {
    "url": "https://www.google-analytics.com/j/collect?v=1&_v=j102&a=309415027&t=pageview&_s=1&dl=https%3A%2F%2Ftemp-mail.org%2Fen%2F&ul=en-us&dt=Temp%20Mail%20-%20Disposable%20Temporary%20Email&sr=1280x720&vp=1280x720&_u=YADAAEABAAAAACAAI~&jid=2095406162&gjid=586139411&cid=1493970454.1793031466&tid=UA-86060504-1&_gid=155630680.1793031467&_r=1&_slc=1&gtm=45He6am0n71N24FG6v72729679za200zd72729679xf1&gcd=13l3l3l3l1l1&dma=0&tag_exp=115938465~115938469~118897920~118897930~120385422~120469145~120469153~121246026~121246034&z=1050178084",
    "path": "/j/collect",
    "query": "v=1&_v=j102&a=309415027&t=pageview&_s=1&dl=https%3A%2F%2Ftemp-mail.org%2Fen%2F&ul=en-us&dt=Temp%20Mail%20-%20Disposable%20Temporary%20Email&sr=1280x720&vp=1280x720&_u=YADAAEABAAAAACAAI~&jid=2095406162&gjid=586139411&cid=1493970454.1793031466&tid=UA-86060504-1&_gid=155630680.1793031467&_r=1&_slc=1&gtm=45He6am0n71N24FG6v72729679za200zd72729679xf1&gcd=13l3l3l3l1l1&dma=0&tag_exp=115938465~115938469~118897920~118897930~120385422~120469145~120469153~121246026~121246034&z=1050178084",
    "method": "POST",
    "status": 200,
    "content_type": "text/plain",
    "request_post_data": null,
    "response_body": "2,cG-NMPT1H0Z7C"
  },
  {
    "url": "https://mweb-hb.presage.io/api/header-bidding-request",
    "path": "/api/header-bidding-request",
    "query": "",
    "method": "POST",
    "status": 204,
    "content_type": "",
    "request_post_data": "{\"imp\":[{\"ext\":{\"adUnitId\":\"wd-hb-stdb-tempma-buyse-hp9x2cjzonc2\",\"skipSizeCheck\":true,\"assetKey\":\"OGY-55E7A0611BE8\",\"timeSpentOnPage\":15179.364,\"gpid\":\"/8691100/TempMail_S2S_InContent_ROS_Pos1#bsa-zone_1594132707957-3_123456\",\"data\":{\"divId\":\"bsa-zone_1594132707957-3_123456\",\"placement\":\"TempMail_S2S_InContent_ROS_Pos1\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_InContent_ROS_Pos1\"}},\"tid\":\"ue394e5b8-0f94-4965-8bf0-ce32ed0b671a\",\"tidSource\":\"pbjs\"},\"id\":\"05978817-98ca-4921-89b3-d28c08065b95\",\"banner\":{\"topframe\":1,\"format\":[{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594132707957-3_123456\"},{\"ext\":{\"adUnitId\":\"wd-hb-stdb-tempma-buyse-hp9x2cjzonc2\",\"skipSizeCheck\":true,\"assetKey\":\"OGY-55E7A0611BE8\",\"timeSpentOnPage\":15179.364,\"gpid\":\"/8691100/TempMail_S2S_InContent_ROS_Pos2#bsa-zone_1594132854548-5_123456\",\"data\":{\"divId\":\"bsa-zone_1594132854548-5_123456\",\"placement\":\"TempMail_S2S_InContent_ROS_Pos2\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_InContent_ROS_Pos2\"}},\"tid\":\"u84454bc1-f5a3-49c6-9b96-ec9bc02d6aa7\",\"tidSource\":\"pbjs\"},\"id\":\"7ba27f83-30b5-4da3-93b6-56c0867a0f74\",\"banner\":{\"topframe\":1,\"format\":[{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594132854548-5_123456\"},{\"ext\":{\"adUnitId\":\"wd-hb-stdb-tempma-buyse-hp9x2cjzonc2\",\"skipSizeCheck\":true,\"assetKey\":\"OGY-55E7A0611BE8\",\"timeSpentOnPage\":15179.364,\"gpid\":\"/8691100/TempMail_S2S_FixedFooter_ROS#bsa-zone_1594132954409-8_123456\",\"data\":{\"divId\":\"bsa-zone_1594132954409-8_123456\",\"placement\":\"TempMail_S2S_FixedFooter_ROS\",\"adserver\":{\"name\":\"gam\",\"adslot\":\"/8691100/TempMail_S2S_FixedFooter_ROS\"}},\"tid\":\"uf64afd5e-fc3d-430f-90f5-ee6d6db530f4\",\"tidSource\":\"pbjs\"},\"id\":\"b97b8616-1dc9-46e9-a670-86678e791485\",\"banner\":{\"topframe\":1,\"format\":[{\"w\":728,\"h\":90}]},\"secure\":1,\"tagid\":\"bsa-zone_1594132954409-8_123456\"},{\"ext\":{\"adUnitId\":\"wd-hb-stdb-tempma-buyse-hp9x2cjzonc2\",\"skipSizeCheck\":true,\"assetKey\":\"OGY-55E7A0611BE8\",\"timeSpentOnPage\":15179.364,\"gpid\":\"/8691100/TempMail_S2S_Side",
    "response_body": null
  },
  {
    "url": "https://ad-delivery.net/px.gif?ch=2&e=0.26744848567627566",
    "path": "/px.gif",
    "query": "ch=2&e=0.26744848567627566",
    "method": "GET",
    "status": 200,
    "content_type": "image/gif",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ad.doubleclick.net/favicon.ico?ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250&e=0.7130699393749922",
    "path": "/favicon.ico",
    "query": "ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250&e=0.7130699393749922",
    "method": "GET",
    "status": 200,
    "content_type": "image/x-icon",
    "request_post_data": null,
    "response_body": null
  },
  {
    "url": "https://ad-delivery.net/px.gif?ch=1&e=0.9558097800009638",
    "path": "/px.gif",
    "query": "ch=1&e=0.9558097800009638",
    "method": "GET",
    "status": 200,
    "content_type": "image/gif",
    "request_post_data": null,
    "response_body": null
  }
];

// Dynamic replay of captured API routes
capturedRoutes.forEach(route => {
    if (!route.path || !route.path.startsWith('/')) return;
    const method = (route.method || 'GET').toLowerCase();
    if (['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
        app[method](route.path, (req, res) => {
            res.status(route.status || 200).set('Content-Type', route.content_type || 'application/json');
            if (typeof route.response_body === 'object') {
                return res.json(route.response_body);
            }
            return res.send(route.response_body || { status: 'ok' });
        });
    }
});

// Universal Synthesized Auth & CRUD Endpoints
app.post(['/api/login', '/api/auth/login', '/login'], (req, res) => {
    const { email, username, password } = req.body || {};
    const token = 'synth_jwt_' + Date.now();
    const user = { id: Date.now(), email: email || username || 'user@example.com', role: 'admin', token };
    stateDb.sessions[token] = user;
    saveDb();
    res.json({ success: true, token, user });
});

app.post(['/api/register', '/api/auth/register', '/signup'], (req, res) => {
    const user = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
    stateDb.users.push(user);
    saveDb();
    res.status(201).json({ success: true, user });
});

app.all('/api/*', (req, res) => {
    if (req.method === 'GET') {
        return res.json({ success: true, path: req.path, data: stateDb.items, timestamp: Date.now() });
    }
    const entry = { id: Date.now(), path: req.path, method: req.method, payload: req.body, createdAt: new Date().toISOString() };
    stateDb.items.push(entry);
    saveDb();
    return res.json({ success: true, data: entry });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Full-Stack Cloned Server for https://temp-mail.org/en/ running on http://localhost:${PORT}`);
});
