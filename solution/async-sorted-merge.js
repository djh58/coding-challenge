"use strict";

const initMinHeap = require('./utils/minheap');

// this helper func adds async log entry to heap
async function pushNextLogEntry(minHeap, logSource, idx) {
  const nextLogEntry = await logSource.popAsync();
  if (nextLogEntry !== false) {
      minHeap.push({ idx, logEntry: nextLogEntry });
  }
}


module.exports = (logSources, printer) => {"use strict";

const initMinHeap = require('./utils/minheap');

// this helper func adds async log entry to heap
async function pushNextLogEntry(minHeap, logSource, idx) {
  const nextLogEntry = await logSource.popAsync();
  if (nextLogEntry !== false) {
      minHeap.push({ idx, logEntry: nextLogEntry });
  }
}


module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const minHeap = initMinHeap();

    // get 1st log from each log source
    await Promise.all(logSources.map(async (logSource, idx) => {
        await pushNextLogEntry(minHeap, logSource, idx);
    }));

    // handle the rest, basically "refilling" the heap with a new log from each source after it is popped
    while (!minHeap.empty()) {
        const { idx, logEntry } = minHeap.pop();
        printer.print(logEntry);
        await pushNextLogEntry(minHeap, logSources[idx], idx);
    }

    printer.done();
    console.log("Async sort complete.");
    resolve();
  });
};

  return new Promise(async (resolve, reject) => {
    const minHeap = initMinHeap();

    // get 1st log from each log source
    await Promise.all(logSources.map(async (logSource, idx) => {
        await pushNextLogEntry(minHeap, logSource, idx);
    }));

    // handle the rest, basically "refilling" the heap with a new log from each source after it is popped
    while (!minHeap.empty()) {
        const { idx, logEntry } = minHeap.pop();
        printer.print(logEntry);
        await pushNextLogEntry(minHeap, logSources[idx], idx);
    }

    printer.done();
    console.log("Async sort complete.");
    resolve();
  });
};
