"use strict";

const initMinHeap = require('./utils/minheap');

module.exports = (logSources, printer) => {
  const minHeap = initMinHeap();

  // get 1st log from each log source, adding to heap with the index so we can track which log is from which source
  logSources.forEach((logSource, index) => {
    const nextLogEntry = logSource.pop();
    if (nextLogEntry !== false) {
      // as a result, the heap is only as big as the number of log sources
      minHeap.push({ index, logEntry: nextLogEntry });
    }
  });

  // after a log is popped we add a new one from the same log source until that one is empty
  while (!minHeap.empty()) {
    const { index, logEntry } = minHeap.pop();

    printer.print(logEntry);

    // get the next log from the same log source
    const nextLogEntry = logSources[index].pop();
    if (nextLogEntry !== false) {
      // add to heap if there is a new log
      minHeap.push({ index, logEntry: nextLogEntry });
    }
  }

  printer.done();
  console.log("Sync sort complete.");
};
