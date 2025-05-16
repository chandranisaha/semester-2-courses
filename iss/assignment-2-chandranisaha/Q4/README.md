## Follow the File Structure and add Assumptions in this Readme file
ASSUMPTIONS:

a) The dataset is already imported into MongoDB Atlas or a local MongoDB instance.
b) The accounts, customer, and transactions collections exist in the database.
c) The insertion queries follow MongoDB's standard insertOne() and insertMany() methods.
d) The structure of documents in each collection aligns with the sample dataset provided in MongoDB documentation.
e) The multi-value search query is expected to use $in or a similar operator.
f) The search fields in the transactions collection are assumed to contain multiple possible values.
g) The count query should return the number of documents in each specified collection.
h) The expected method for counting documents is countDocuments().
i) The update query modifies only one document in the transactions collection.
j) The update operation follows the updateOne() method, modifying an existing field.
