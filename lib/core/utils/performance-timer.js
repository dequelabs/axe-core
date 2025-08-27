import log from '../log';

/**
 * Performance measuring utility shimming the User Timing API
 *
 * https://www.html5rocks.com/en/tutorials/webperformance/usertiming/
 * http://caniuse.com/#search=User%20Timing
 *
 */
const performanceTimer = (() => {
  /**
   * Get a time/date object using performance.now() if supported
   * @return {DOMTimeStamp}
   */
  function now() {
    if (window.performance && window.performance) {
      return window.performance.now();
    }
  }
  let axeStartTime = now();
  let axeStarted = false;

  /**
   * @typedef {utils.performanceTimer} Public API Methods
   */
  return {
    /**
     * @member {Function} start Kicks off performance timing for overall axe audit
     */
    start() {
      this.reset();
      axeStarted = true;
      this.mark('mark_axe_start');
    },

    /**
     * @member {Function} end Concludes performance timing, compares start/end marks
     */
    end() {
      this.mark('mark_axe_end');
      this.measure('axe', 'mark_axe_start', 'mark_axe_end', true);
      this.logMeasures('axe');
      this.clearMark('mark_axe_start', 'mark_axe_end');
      axeStarted = false;
    },

    /**
     * @member {Function} auditStart Starts an audit for a page or frame
     */
    auditStart() {
      if (!axeStarted) {
        this.reset(); // We're in a frame
      }
      this.mark('mark_audit_start');
    },

    /**
     * @member {Function} auditEnd Ends an audit for a page or frame, logs measurement of start/end marks
     */
    auditEnd() {
      this.mark('mark_audit_end');
      this.measure(
        'audit_start_to_end',
        'mark_audit_start',
        'mark_audit_end',
        true
      );
      // log audit/rule measures
      this.logMeasures();
      this.clearMark('mark_audit_start', 'mark_audit_end');
    },

    /**
     * @member {Function} mark Shims creating a new named time stamp, called a mark
     * @param {String} markName String name to record how long it took to get there.
     * A mark that already exists will be overwritten.
     *
     */
    mark(markName) {
      if (window.performance?.mark) {
        window.performance.mark(markName);
      }
    },

    /**
     * @member {Function} measure Shims creating a measure to compare two marks, which can be logged
     * @param {String} measureName String name to log what is being compared.
     * Measures that already exist will be overwritten with a new time stamp.
     * @param {String} startMark String name of mark to start measuring
     * @param {String} endMark String name of mark to end measuring
     */
    measure(measureName, startMark, endMark, keepMarks = false) {
      if (!window.performance?.measure) {
        return;
      }
      try {
        window.performance.measure(measureName, startMark, endMark);
      } catch (e) {
        this._log(e);
      }
      if (!keepMarks) {
        this.clearMark(startMark, endMark);
      }
    },

    /**
     * @member {Function} logMeasures Logs previously captured measures in chronological order.
     * Starts from the most recent start()/auditStart() call.
     * @param {String|undefined} measureName If provided, will only log up to the first matching measure.
     */
    logMeasures(measureName) {
      const last = arr => (Array.isArray(arr) ? arr[arr.length - 1] : arr);
      const logMeasure = req => {
        this._log('Measure ' + req.name + ' took ' + req.duration + 'ms');
      };
      if (
        !window.performance?.getEntriesByType ||
        !window.performance?.getEntriesByName
      ) {
        return;
      }
      // only output measures that were started after axe started, otherwise
      // we get measures made by the page before axe ran (which is confusing)
      const axeStart =
        last(window.performance.getEntriesByName('mark_axe_start')) ||
        last(window.performance.getEntriesByName('mark_audit_start'));
      if (!axeStart) {
        this._log('Axe must be started before using performanceTimer');
        return;
      }

      const measures = window.performance
        .getEntriesByType('measure')
        .filter(measure => measure.startTime >= axeStart.startTime);
      for (let i = 0; i < measures.length; ++i) {
        const req = measures[i];
        if (req.name === measureName) {
          logMeasure(req);
          return;
        } else if (!measureName) {
          logMeasure(req);
        }
      }
    },

    /**
     * @member {Function} timeElapsed Records time since last audit
     * @return {DOMTimeStamp}
     */
    timeElapsed() {
      const currentTime = now();
      return currentTime - axeStartTime;
    },

    /**
     * @member {Function} clearMark Clears a mark
     * @param {String} markName String name of mark to clear
     */
    clearMark(...markNames) {
      if (!window.performance?.clearMarks) {
        return;
      }

      for (const markName of markNames) {
        window.performance.clearMarks(markName);
      }
    },

    /**
     * @member {Function} reset Resets the time for a new audit
     */
    reset() {
      axeStartTime = now();
    },

    /**
     * Logs the message, available to override in testing
     * @private
     * @param {String} message
     */
    _log(message) {
      log(message);
    }
  };
})();

export default performanceTimer;
