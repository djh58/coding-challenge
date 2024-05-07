"use strict";

// found this npm module that provides a heap implementation, figured it's better than doing one in OOP :)
const Heap = require('heap');


// expects a log entry struct (date and msg), along with the index, which is used to track which log source it is from
module.exports = () => {
  return new Heap((a, b) => a.logEntry.date - b.logEntry.date);
};
