import * as geoip from 'geoip-lite';
import { Request } from 'express';
import { RequestData } from '@src/ts';

export const extractRequestData = (req: Request): RequestData => {
  const { browser = null, version: browserVersion = null, os = null } = req.useragent || {};
  const ip = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress || null;
  const location = ip ? geoip.lookup(ip) : null;
  const locationAsString = location
    ? `${location.city}, ${location.region}, ${location.city}`
    : null;

  return {
    browser,
    browserVersion,
    os,
    ip,
    location: locationAsString,
  };
};
