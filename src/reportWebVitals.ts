import {
  ReportOpts,
  type CLSMetric,
  type FCPMetric,
  type INPMetric,
  type LCPMetric,
  type TTFBMetric,
} from "web-vitals";

export const reportCLS = async (
  onReport?: (metric: CLSMetric) => void,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onCLS } = await import("web-vitals");
    onCLS(onReport, opts);
  }
};

export const reportFCP = async (
  onReport?: (metric: FCPMetric) => void,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onFCP } = await import("web-vitals");
    onFCP(onReport, opts);
  }
};

export const reportINP = async (
  onReport?: (metric: INPMetric) => void,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onINP } = await import("web-vitals");
    onINP(onReport, opts);
  }
};

export const reportLCP = async (
  onReport?: (metric: LCPMetric) => void,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onLCP } = await import("web-vitals");
    onLCP(onReport, opts);
  }
};

export const reportTTFB = async (
  onReport?: (metric: TTFBMetric) => void,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onTTFB } = await import("web-vitals");
    onTTFB(onReport, opts);
  }
};
