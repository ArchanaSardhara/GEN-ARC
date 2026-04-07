import { Injectable } from '@nestjs/common';

import { LogItem, MetricType } from '../db/types';

@Injectable()
export class DriftService {
  /**
   * Calculate drift for given metrics
   * @param logs - array of previous user logs
   * @param newEntry - latest entry with metrics
   * @param metrics - array of keys to calculate drift
   * @returns newEntry augmented with drift values and warnings
   */
  calculateDrift(
    logs: Array<LogItem>,
    newEntry: LogItem,
    metrics: MetricType[],
  ): LogItem {
    const result: LogItem = { ...newEntry };

    for (const key of metrics) {
      if (key === 'sleep' && typeof newEntry.sleep?.hours === 'number') {
        const history = logs.map((log) => log.sleep?.hours ?? 0);
        const avg = history.length
          ? history.reduce((total, i) => total + i, 0) / history.length
          : newEntry.sleep?.hours;
        const drift = newEntry.sleep?.hours - avg;
        result['sleep_drift'] = drift;
        if (key === 'sleep' && newEntry.sleep.hours < 7) {
          result.warning = '⚠️ Sleep below 7 hours!';
        }
      }
    }

    // Add date if missing
    if (!result.date) {
      result.date = new Date().toISOString().split('T')[0];
    }

    return result;
  }
}
