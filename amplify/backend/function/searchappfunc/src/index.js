const puppeteer = require("puppeteer");
// const https = require("https");
// const AWS = require("aws-sdk");
// const urlParse = require("url").URL;
// const appsyncUrl = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
// const region = process.env.REGION;
// console.table({ appsyncUrl, region });
// console.log(process.env);
// const endpoint = new urlParse(appsyncUrl).hostname.toString();
// // const graphqlQuery = require("./query.js").mutation;
// const apiKey = process.env.API_KEY;

// const mutation = `mutation Test($input: createArticleInput!) {
//   createArticle(input: $input)
// }`;

// const puppeteerFn = async () => {
//   // const browser = await puppeteer.launch({
//   //   executablePath: "/usr/bin/chromium-browser"
//   // });

//   const browser = await puppeteer.launch();

//   const makeHref = async ({ url }) => {
//     const page = await browser.newPage();
//     await page.goto(url);

//     const href = await page.evaluate(() => {
//       const anchors = document.querySelectorAll(".issue a");
//       return anchors[0].href;
//     });

//     return href;
//   };
//   const print = ({ href, siteName }) =>
//     console.log(
//       `Number of ${siteName}: ${href.substring(
//         href.lastIndexOf("/") + 1,
//         href.length
//       )}`
//     );

//   await Promise.all(
//     [
//       {
//         siteName: "JavaScriptWeekly",
//         url: "https://javascriptweekly.com/issues"
//       },
//       {
//         siteName: "ReactStatus",
//         url: "https://react.statuscode.com/issues"
//       },
//       {
//         siteName: "NodeWeekly",
//         url: "https://nodeweekly.com/issues"
//       }
//     ].map(async ({ siteName, url }) => {
//       const href = await makeHref({ url });

//       print({ href, siteName });
//     })
//   );

//   await browser.close();
// };

const createBackEnd = async ({ url, issueNumber }) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  const article = await page.evaluate(issueNumber => {
    const arrParas = [...document.querySelectorAll("p.desc")].map(para => {
      const hyperlink = para.querySelector("a").href;

      const headline = para.querySelector("a").textContent;

      const description = para.textContent.includes("—")
        ? para.textContent.split("—")[1].trim()
        : undefined;

      // edge-case: https://javascriptweekly.com/issues/415
      const outlet = para.nextElementSibling
        ? para.nextElementSibling.firstChild.textContent.trim()
        : undefined;

      const newsletter = "JavaScript Weekly";

      // const issueNumber = url.substring(url.lastIndexOf("/") + 1);

      return {
        description,
        headline,
        hyperlink,
        issueNumber,
        newsletter,
        outlet
      };
    });

    return arrParas;
  }, issueNumber);

  await browser.close();

  return article;
};

exports.handler = async event => {
  const numArr = Array.from(
    { length: 466 - 375 + 1 },
    (_, index) => index + 375
  );
  // const req = new AWS.HttpRequest(appsyncUrl, region);
  try {
    for await (const issueNumber of numArr) {
      console.log(issueNumber);
      const article = await createBackEnd({
        url: `https://javascriptweekly.com/issues/${issueNumber}`,
        issueNumber
      });

      console.log(article);
    }
  } catch (err) {
    console.error(err);
  }

  // const item = {
  //   input: article
  // };

  // req.method = "POST";
  // req.headers.host = endpoint;
  // req.headers["Content-Type"] = "application/json";
  // req.body = JSON.stringify({
  //   mutation,
  //   operationName: "Test",
  //   variables: item
  // });

  // if (apiKey) {
  //   req.headers["x-api-key"] = apiKey;
  // } else {
  //   const signer = new AWS.Signers.V4(req, "appsync", true);
  //   signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  // }

  // const data = await new Promise((resolve, reject) => {
  //   const httpRequest = https.request({ ...req, host: endpoint }, result => {
  //     result.on("data", data => {
  //       resolve(JSON.parse(data.toString()));
  //     });
  //   });

  //   httpRequest.write(req.body);
  //   httpRequest.end();
  // });

  // return {
  //   statusCode: 200,
  //   body: data
  // };
};
