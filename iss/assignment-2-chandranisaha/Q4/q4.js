// Write answers for q4 here

//use the sample_analytics database
use sample_analytics;

//(a) Insert One Record into `accounts` Collection

db.accounts.insertOne({
    account_id: "A63451",       // Unique account ID
    account_type: "Checking",   // Type of account
    balance: 15000,             // Initial balance
    customer_id: "C1001"        // Linked customer ID
});
/*
OUTPUT:
{
  acknowledged: true,
  insertedId: ObjectId('67cdfb7c5813104f47e43269')
}
*/
//(b) Insert Five Records into `customers` Collection

db.customers.insertMany([
    { customer_id: "C2001", name: "Chandrani", age: 21, city: "Mumbai" },
    { customer_id: "C2002", name: "Shriya", age: 27, city: "Chennai" },
    { customer_id: "C2003", name: "Amitabh", age: 45, city: "Delhi" },
    { customer_id: "C2004", name: "Salman", age: 29, city: "Hyderabad" },
    { customer_id: "C2005", name: "Maithily", age: 38, city: "Pune" }
]);

/*OUTPUT:
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('67cdfc005813104f47e4326a'),
    '1': ObjectId('67cdfc005813104f47e4326b'),
    '2': ObjectId('67cdfc005813104f47e4326c'),
    '3': ObjectId('67cdfc005813104f47e4326d'),
    '4': ObjectId('67cdfc005813104f47e4326e')
  }
}
*/

//(c) Multi-Value Search in `transactions` Collection
//find all transactions where the amount is either 10 or 15

db.transactions.aggregate([
    { $unwind: "$transactions" },
    { $match: { "transactions.amount": { $in: [10, 15] } } },  
    { $project: { _id: 0, "transactions": 1 } }
]).pretty()


/*OUTPUT:
[
  {
    transactions: {
      date: ISODate('1996-11-08T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'sell',
      symbol: 'aapl',
      price: '0.830839821345807028052377063431777060031890869140625',
      total: '12.46259732018710542078565595'
    }
  },
  {
    transactions: {
      date: ISODate('2003-10-15T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'sell',
      symbol: 'ebay',
      price: '12.4687301791585607446677386178635060787200927734375',
      total: '187.0309526873784111700160793'
    }
  },
  {
    transactions: {
      date: ISODate('2012-05-07T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'buy',
      symbol: 'adbe',
      price: '32.88418882214836713728800532408058643341064453125',
      total: '328.8418882214836713728800532'
    }
  },
  {
    transactions: {
      date: ISODate('1995-01-11T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'sell',
      symbol: 'msft',
      price: '2.8983169179514280955345384427346289157867431640625',
      total: '43.47475376927142143301807664'
    }
  },
  {
    transactions: {
      date: ISODate('2010-07-06T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'buy',
      symbol: 'amd',
      price: '7.40388442243446132096096334862522780895233154296875',
      total: '111.0582663365169198144144502'
    }
  },
  {
    transactions: {
      date: ISODate('2015-12-18T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'sell',
      symbol: 'team',
      price: '28.04985262319878103198789176531136035919189453125',
      total: '420.7477893479817154798183765'
    }
  },
  {
    transactions: {
      date: ISODate('2015-10-23T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'sell',
      symbol: 'ibm',
      price: '132.08889373761638807991403155028820037841796875',
      total: '1981.333406064245821198710473'
    }
  },
  {
    transactions: {
      date: ISODate('2016-11-01T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'buy',
      symbol: 'fb',
      price: '131.758005738455040045664645731449127197265625',
      total: '1317.580057384550400456646457'
    }
  },
  {
    transactions: {
      date: ISODate('2016-12-14T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'sell',
      symbol: 'znga',
      price: '2.791519411492493940585291056777350604534149169921875',
      total: '27.91519411492493940585291057'
    }
  },
  {
    transactions: {
      date: ISODate('2016-02-02T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'buy',
      symbol: 'sap',
      price: '76.1478780289535706060632946901023387908935546875',
      total: '1142.218170434303559090949420'
    }
  },
  {
    transactions: {
      date: ISODate('2014-01-17T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'buy',
      symbol: 'ibm',
      price: '164.983450117839282711429405026137828826904296875',
      total: '1649.834501178392827114294050'
    }
  },
  {
    transactions: {
      date: ISODate('1997-03-21T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'sell',
      symbol: 'amd',
      price: '20.05655760299519130285261780954897403717041015625',
      total: '200.5655760299519130285261781'
    }
  },
  {
    transactions: {
      date: ISODate('1973-09-27T00:00:00.000Z'),
      amount: 15,
      transaction_code: 'sell',
      symbol: 'ibm',
      price: '13.5853736009503034409817701089195907115936279296875',
      total: '203.7806040142545516147265516'
    }
  },
  {
    transactions: {
      date: ISODate('2009-11-30T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'sell',
      symbol: 'amzn',
      price: '132.546198954490677124340436421334743499755859375',
      total: '1325.461989544906771243404364'
    }
  },
  {
    transactions: {
      date: ISODate('2014-12-01T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'buy',
      symbol: 'goog',
      price: '533.56267062227789210737682878971099853515625',
      total: '5335.626706222778921073768288'
    }
  },
  {
    transactions: {
      date: ISODate('2016-06-02T00:00:00.000Z'),
      amount: 10,
      transaction_code: 'sell',
      symbol: 'fb',
      price: '118.8806960757473234480130486190319061279296875',
      total: '1188.806960757473234480130486'
    }
  }
]
*/

//(d) Count Documents in Each Collection
//count the number of documents in the `accounts` collection

db.accounts.countDocuments();
//ouput:1747
 
//count the number of documents in the `transactions` collection

db.transactions.countDocuments();
//ouput: 1746

//count the number of documents in the `customers` collection

db.customers.countDocuments();
//ouput: 505


//(e) Update a Document in `transactions` Collection
//update a transaction where transaction_id is "T500"
//change the status from "Pending" to "Completed"

db.transactions.updateOne(
    { 
        account_id: 300714, 
        "transactions.symbol": "crm",
        "transactions.date": ISODate("2016-11-09T00:00:00.000Z")
    },
    { 
        $set: { "transactions.$.amount": 9000 } 
    }
);


/*
OUPUT:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
*/
