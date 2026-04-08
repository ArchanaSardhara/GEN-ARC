import { Injectable } from '@nestjs/common';

import { Intent } from 'src/types/intent';
import { Metrics } from './consts';

@Injectable()
export class DriftService {
  /**
   * Calculate drift for given metrics
   * @param logs - array of previous user logs
   * @param newEntry - latest entry with metrics
   * @param metrics - array of keys to calculate drift
   * @returns newEntry augmented with drift values and warnings
   */
  calculateDrift(logs: Array<Intent>, newEntry: Intent): Intent {
    const result: Intent = { ...newEntry };
    const metrics = logs
      .map((l) => l.tool)
      .filter((tool) => (tool ?? '').includes('log'));

    for (const key of metrics) {
      const history = logs.filter((l) => l.tool === key).slice(0, 10);
      const avg =
        history.reduce((total, i) => total + (i.value ?? 0), 0) /
        history.length;
      const drift = (newEntry.value ?? 0) < avg;
      if (history.length > 2 && drift) {
        result.drift = avg - (newEntry.value ?? 0);
      }
    }

    // Add date if missing
    if (!result.date) {
      result.date = new Date().toISOString().split('T')[0];
    }

    return result;
  }
}
