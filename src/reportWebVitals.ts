import {
  CLSReportCallback,
  FCPReportCallback,
  FIDReportCallback,
  INPReportCallback,
  LCPReportCallback,
  ReportOpts,
  TTFBReportCallback,
} from "web-vitals";

export const reportCLS = async (
  onReport?: CLSReportCallback,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onCLS } = await import("web-vitals");
    onCLS(onReport, opts);
  }
};

export const reportFCP = async (
  onReport?: FCPReportCallback,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onFCP } = await import("web-vitals");
    onFCP(onReport, opts);
  }
};

export const reportFID = async (
  onReport?: FIDReportCallback,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onFID } = await import("web-vitals");
    onFID(onReport, opts);
  }
};

export const reportINP = async (
  onReport?: INPReportCallback,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onINP } = await import("web-vitals");
    onINP(onReport, opts);
  }
};

export const reportLCP = async (
  onReport?: LCPReportCallback,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onLCP } = await import("web-vitals");
    onLCP(onReport, opts);
  }
};

export const reportTTFB = async (
  onReport?: TTFBReportCallback,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    const { onTTFB } = await import("web-vitals");
    onTTFB(onReport, opts);
  }
};
