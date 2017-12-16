

function amazonQuery() {
  var details = require('./details');
  const {OperationHelper} = require('apac');
  const opHelper = new OperationHelper({
      awsId: details.AccessId,
      awsSecret: details.Secret,
      assocId: details.Tag,
      locale: 'US'
  });

  opHelper.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'IdType': 'ISBN',
    'ItemId' : '9780195315912',
    'Title': 'Stoic Warriors',
    'ResponseGroup': 'ItemAttributes, Offers, Images'
  }).then((response) => {
    console.log("Results object: ", response.result);
    console.log("***************************************************\n");
    console.log("Amazon Page: ", response.result.ItemSearchResponse.Items.Item[0].DetailPageURL);
    console.log("***************************************************\n");
    // console.log("Item Attributes: ", response.result.ItemSearchResponse.Items.Item[0].ItemAttributes);
    // console.log("Lowest Used Price: ", response.result.ItemSearchResponse.Items.Item[0].OfferSummary.LowestUsedPrice.FormattedPrice);
    console.log("***************************************************\n");
    console.log("For Sale Info from Amazon: ", response.result.ItemSearchResponse.Items.Item[0].OfferSummary);


      // console.log("Raw response body: ", response.responseBody);
  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });
};

amazonQuery();
