const report = function (name, attribs) {
    console.log(name, attribs)

    attribs.event_category = 'Performance Metrics'
    gtag('event', name, attribs);
}

const checkLatency = function (event, label) {
    const lag = performance.now() - event.timeStamp
    if(lag > 100) {
        report('input-latency', {
            event_label: label,
            value: Math.round(lag)
        })
    }
}

const paintObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        report(entry.name, {
            value: Math.round(entry.startTime + entry.duration),
        })
    }
});
paintObserver.observe({entryTypes: ['paint']});

if('PerformanceLongTaskTiming' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            report('longtask', {
                value: Math.round(entry.startTime + entry.duration),
                event_label: JSON.stringify(entry.attribution)
            })
        }
    });
    longTaskObserver.observe({entryTypes: ['longtask']});
}

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
    report('TTI', {
        value: tti
    })
});