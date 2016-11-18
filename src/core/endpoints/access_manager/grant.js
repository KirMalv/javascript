/* @flow */

import { GrantArguments, ModulesInject } from '../../flow_interfaces';
import operationConstants from '../../constants/operations';

export function getOperation(): string {
  return operationConstants.PNAccessManagerGrant;
}

export function validateParams(modules: ModulesInject) {
  let { config } = modules;

  if (!config.subscribeKey) return 'Missing Subscribe Key';
}

export function getURL(modules: ModulesInject): string {
  let { config } = modules;
  return '/v1/auth/grant/sub-key/' + config.subscribeKey;
}

export function getRequestTimeout({ config }: ModulesInject): number {
  return config.getTransactionTimeout();
}

export function isAuthSupported(): boolean {
  return false;
}

export function prepareParams(modules: ModulesInject, incomingParams: GrantArguments, outgoingParams: Object): Object {
  const { channels = [], channelGroups = [], ttl, read = false, write = false, manage = false, authKeys = [] } = incomingParams;

  outgoingParams.r = (read) ? '1' : '0';
  outgoingParams.w = (write) ? '1' : '0';
  outgoingParams.m = (manage) ? '1' : '0';

  if (channels.length > 0) {
    outgoingParams.channel = channels.join(',');
  }

  if (channelGroups.length > 0) {
    outgoingParams['channel-group'] = channelGroups.join(',');
  }

  if (authKeys.length > 0) {
    outgoingParams.auth = authKeys.join(',');
  }

  if (ttl || ttl === 0) {
    outgoingParams.ttl = ttl;
  }
}

export function handleResponse(): Object {
  return {};
}
