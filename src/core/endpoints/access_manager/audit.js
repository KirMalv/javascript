/* @flow */

import { AuditArguments, ModulesInject } from '../../flow_interfaces';
import operationConstants from '../../constants/operations';

export function getOperation(): string {
  return operationConstants.PNAccessManagerAudit;
}

export function validateParams(modules: ModulesInject) {
  let { config } = modules;

  if (!config.subscribeKey) return 'Missing Subscribe Key';
}

export function getURL(modules: ModulesInject): string {
  let { config } = modules;
  return '/v1/auth/audit/sub-key/' + config.subscribeKey;
}

export function getRequestTimeout({ config }: ModulesInject): number {
  return config.getTransactionTimeout();
}

export function isAuthSupported(): boolean {
  return false;
}

export function prepareParams(modules: ModulesInject, incomingParams: AuditArguments, outgoingParams: Object): Object {
  const { channel, channelGroup, authKeys = [] } = incomingParams;

  if (channel) {
    outgoingParams.channel = channel;
  }

  if (channelGroup) {
    outgoingParams['channel-group'] = channelGroup;
  }

  if (authKeys.length > 0) {
    outgoingParams.auth = authKeys.join(',');
  }
}

export function handleResponse(modules: ModulesInject, serverResponse: Object): Object {
  return serverResponse.payload;
}
