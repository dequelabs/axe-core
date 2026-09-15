# Axe-core Performance

Scripts and tools for reporting and tracking axe-core performance.

- `./reports` - Generated performance reports of axe-core.
- `./sites` - Websites or pages used to test performance of axe-core under various conditions.
- `report.js` - Generates a performance report by running axe-core on each of the sites in the `./sites` directory. It will run each site a dynamic number of times (based on how long the first run of axe-core takes) and then computes a distribution summary for each axe-core performance metric.
