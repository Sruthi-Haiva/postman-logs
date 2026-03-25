export const EXECUTOR_LOGS_DEFAULT_COLUMNS = [
  { key: 'id',                  label: 'ID' },
  { key: 'orgId',               label: 'Org ID' },
  { key: 'workspaceId',         label: 'Workspace ID' },
  { key: 'sessionId',           label: 'Session ID' },
  { key: 'transcriptId',        label: 'Transcript ID' },
  { key: 'agentId',             label: 'Agent ID' },
  { key: 'userId',              label: 'User ID' },
  { key: 'userInput',           label: 'User Input' },
  { key: 'timestamp',           label: 'Timestamp' },

  // Executor Info
  { key: 'executorsInfo[0].statusCode',   label: 'Status Code' },
  { key: 'executorsInfo[0].responseBody', label: 'Response Body' },

  // Executor Object top-level
  { key: 'executors[0].type',                                        label: 'Executor Type' },
  { key: 'executors[0].executorObject.executor_name',                label: 'Executor Name' },
  { key: 'executors[0].executorObject.executor_display_name',        label: 'Display Name' },
  { key: 'executors[0].executorObject.service_provider',             label: 'Service Provider' },
  { key: 'executors[0].executorObject.executor_method_type',         label: 'Method Type' },
  { key: 'executors[0].executorObject.apiUrl',                       label: 'API URL' },
  { key: 'executors[0].executorObject.connectorName',                label: 'Connector Name' },
  { key: 'executors[0].executorObject.scopeOfAccess',                label: 'Scope of Access' },

  // Auth
  { key: 'executors[0].executorObject.authModel.authType',                        label: 'Auth Type' },
  { key: 'executors[0].executorObject.authModel.authAttributes.type',             label: 'Auth Attr Type' },
  { key: 'executors[0].executorObject.authModel.authAttributes.name',             label: 'Auth Attr Name' },
  { key: 'executors[0].executorObject.authModel.authAttributes.producer',         label: 'Auth Producer' },

  // Path Params
  { key: 'executors[0].executorObject.pathParams[0].key',   label: 'Path Param Key' },
  { key: 'executors[0].executorObject.pathParams[0].value', label: 'Path Param Value' },

  // Headers
  { key: 'executors[0].executorObject.headers[0].key',   label: 'Header Key' },
  { key: 'executors[0].executorObject.headers[0].value', label: 'Header Value' },

  // Request Body fields
  { key: 'executors[0].executorObject.requestBody.key',         label: 'Request Body Key' },
  { key: 'executors[0].executorObject.requestBody.annotation',  label: 'Request Body Annotation' },
  { key: 'executors[0].executorObject.requestBody.description', label: 'Request Body Description' },
  { key: 'executors[0].executorObject.requestBody.value[0].key',   label: 'Request Body method key' },
  { key: 'executors[0].executorObject.requestBody.value[0].value', label: 'Request Body method value' },
  { key: 'executors[0].executorObject.requestBody.value[1].key',   label: 'Request Body worksheet_name key' },
  { key: 'executors[0].executorObject.requestBody.value[1].value', label: 'Request Body worksheet_name value' },
  { key: 'executors[0].executorObject.requestBody.value[2].key',   label: 'Request Body criteria key' },
  { key: 'executors[0].executorObject.requestBody.value[2].value', label: 'Request Body criteria value' },
  { key: 'executors[0].executorObject.requestBody.value[3].key',   label: 'Request Body first_match_only key' },
  { key: 'executors[0].executorObject.requestBody.value[3].value', label: 'Request Body first_match_only value' },
  { key: 'executors[0].executorObject.requestBody.value[4].key',   label: 'Request Body is_case_sensitive key' },
  { key: 'executors[0].executorObject.requestBody.value[4].value', label: 'Request Body is_case_sensitive value' },
  { key: 'executors[0].executorObject.requestBody.value[5].key',   label: 'Request Body data key' },
  { key: 'executors[0].executorObject.requestBody.value[5].value', label: 'Request Body data value' },

];

export const EXECUTOR_LOGS_ALL_COLUMNS = [
  { key: 'id',                  label: 'ID' },
  { key: 'orgId',               label: 'Org ID' },
  { key: 'workspaceId',         label: 'Workspace ID' },
  { key: 'sessionId',           label: 'Session ID' },
  { key: 'transcriptId',        label: 'Transcript ID' },
  { key: 'agentId',             label: 'Agent ID' },
  { key: 'userId',              label: 'User ID' },
  { key: 'userInput',           label: 'User Input' },
  { key: 'totalExecutionTime',  label: 'Execution Time (s)' },
  { key: 'timestamp',           label: 'Timestamp' },

  // Executor Info
  { key: 'executorsInfo[0].statusCode',   label: 'Status Code' },
  { key: 'executorsInfo[0].responseBody', label: 'Response Body' },

  // Executor Object top-level
  { key: 'executors[0].type',                                        label: 'Executor Type' },
  { key: 'executors[0].executorObject.id',                           label: 'Executor ID' },
  { key: 'executors[0].executorObject.executor_type',                label: 'Executor Kind' },
  { key: 'executors[0].executorObject.executor_name',                label: 'Executor Name' },
  { key: 'executors[0].executorObject.executor_version',             label: 'Version' },
  { key: 'executors[0].executorObject.executor_display_name',        label: 'Display Name' },
  { key: 'executors[0].executorObject.executor_description',         label: 'Description' },
  { key: 'executors[0].executorObject.executor_category',            label: 'Category' },
  { key: 'executors[0].executorObject.executor_category_group',      label: 'Category Group' },
  { key: 'executors[0].executorObject.service_provider',             label: 'Service Provider' },
  { key: 'executors[0].executorObject.executor_method_type',         label: 'Method Type' },
  { key: 'executors[0].executorObject.apiUrl',                       label: 'API URL' },
  { key: 'executors[0].executorObject.connectorName',                label: 'Connector Name' },
  { key: 'executors[0].executorObject.scopeOfAccess',                label: 'Scope of Access' },
  { key: 'executors[0].executorObject.disabled',                     label: 'Disabled' },
  { key: 'executors[0].executorObject.published',                    label: 'Published' },
  { key: 'executors[0].executorObject.registeredAsIs',               label: 'Registered As Is' },
  { key: 'executors[0].executorObject.creationTime',                 label: 'Creation Time' },
  { key: 'executors[0].executorObject.lastModifiedTime',             label: 'Last Modified Time' },
  { key: 'executors[0].executorObject.isDocumentationPublished',     label: 'Docs Published' },
  { key: 'executors[0].executorObject.isMockResponseEnabled',        label: 'Mock Response Enabled' },

  // Auth
  { key: 'executors[0].executorObject.authModel.authType',                        label: 'Auth Type' },
  { key: 'executors[0].executorObject.authModel.authAttributes.type',             label: 'Auth Attr Type' },
  { key: 'executors[0].executorObject.authModel.authAttributes.name',             label: 'Auth Attr Name' },
  { key: 'executors[0].executorObject.authModel.authAttributes.producer',         label: 'Auth Producer' },

  // Path Params
  { key: 'executors[0].executorObject.pathParams[0].key',   label: 'Path Param Key' },
  { key: 'executors[0].executorObject.pathParams[0].value', label: 'Path Param Value' },

  // Headers
  { key: 'executors[0].executorObject.headers[0].key',   label: 'Header Key' },
  { key: 'executors[0].executorObject.headers[0].value', label: 'Header Value' },

  // Request Body fields
  { key: 'executors[0].executorObject.requestBody.key',         label: 'Request Body Key' },
  { key: 'executors[0].executorObject.requestBody.annotation',  label: 'Request Body Annotation' },
  { key: 'executors[0].executorObject.requestBody.description', label: 'Request Body Description' },
  { key: 'executors[0].executorObject.requestBody.value[0].key',   label: 'Request Body method key' },
  { key: 'executors[0].executorObject.requestBody.value[0].value', label: 'Request Body method value' },
  { key: 'executors[0].executorObject.requestBody.value[1].key',   label: 'Request Body worksheet_name key' },
  { key: 'executors[0].executorObject.requestBody.value[1].value', label: 'Request Body worksheet_name value' },
  { key: 'executors[0].executorObject.requestBody.value[2].key',   label: 'Request Body criteria key' },
  { key: 'executors[0].executorObject.requestBody.value[2].value', label: 'Request Body criteria value' },
  { key: 'executors[0].executorObject.requestBody.value[3].key',   label: 'Request Body first_match_only key' },
  { key: 'executors[0].executorObject.requestBody.value[3].value', label: 'Request Body first_match_only value' },
  { key: 'executors[0].executorObject.requestBody.value[4].key',   label: 'Request Body is_case_sensitive key' },
  { key: 'executors[0].executorObject.requestBody.value[4].value', label: 'Request Body is_case_sensitive value' },
  { key: 'executors[0].executorObject.requestBody.value[5].key',   label: 'Request Body data key' },
  { key: 'executors[0].executorObject.requestBody.value[5].value', label: 'Request Body data value' },

  // Mock Response
  { key: 'executors[0].executorObject.mockResponses[0].statusCode',  label: 'Mock Status Code' },
  { key: 'executors[0].executorObject.mockResponses[0].methodType',  label: 'Mock Method Type' },
  { key: 'executors[0].executorObject.mockResponses[0].sampleData',  label: 'Mock Sample Data' },
];

export function resolvePath(obj, path) {
  try {
    // Convert array notation: executors[0] → executors.0
    const normalized = path.replace(/\[(\d+)\]/g, '.$1');
    const result = normalized.split('.').reduce((acc, key) => {
      if (acc === null || acc === undefined) return undefined;
      return acc[key];
    }, obj);

    if (result === null || result === undefined) return '—';
    if (typeof result === 'object') return JSON.stringify(result);
    return result;
  } catch {
    return '—';
  }
}

export const AI_LOGS_DEFAULT_COLUMNS = [
  { key: 'id',              label: 'ID' },
  { key: 'orgId',           label: 'Org ID' },
  { key: 'workspaceId',     label: 'Workspace ID' },
  { key: 'sessionId',       label: 'Session ID' },
  { key: 'agentId',         label: 'Agent ID' },
  { key: 'userId',          label: 'User ID' },

  // User
  { key: 'userInput',       label: 'User Input' },

  // AI Response
  { key: 'aiResponse.message',        label: 'AI Message' },
  { key: 'aiResponse.explanation',    label: 'Explanation' },

  // Error
  { key: 'isError',         label: 'Error' },

  // Time
  { key: 'timestamp',       label: 'Timestamp' },
];

export const AI_LOGS_ALL_COLUMNS = [
  { key: 'id',              label: 'ID' },
  { key: 'orgId',           label: 'Org ID' },
  { key: 'workspaceId',     label: 'Workspace ID' },
  { key: 'sessionId',       label: 'Session ID' },
  { key: 'transcriptId',    label: 'Transcript ID' },
  { key: 'agentId',         label: 'Agent ID' },
  { key: 'userId',          label: 'User ID' },

  // User
  { key: 'userInput',       label: 'User Input' },

  // AI Response
  { key: 'aiResponse.message',        label: 'AI Message' },
  { key: 'aiResponse.fileData',       label: 'File Data' },
  { key: 'aiResponse.fileType',       label: 'File Type' },
  { key: 'aiResponse.nextBestAction', label: 'Next Action' },
  { key: 'aiResponse.explanation',    label: 'Explanation' },

  // AI Meta
  { key: 'aiProvider',      label: 'Provider' },
  { key: 'aiModel',         label: 'Model' },
  { key: 'aiResponseTime',  label: 'Response Time (s)' },

  // Tokens
  { key: 'tokenInfo.inputTokens',     label: 'Input Tokens' },
  { key: 'tokenInfo.outputTokens',    label: 'Output Tokens' },
  { key: 'tokenInfo.cacheTokens',     label: 'Cache Tokens' },

  { key: 'tokenInfo.inputTokenCost',  label: 'Input Cost' },
  { key: 'tokenInfo.outputTokenCost', label: 'Output Cost' },
  { key: 'tokenInfo.cacheTokenCost',  label: 'Cache Cost' },

  // Error
  { key: 'isError',         label: 'Error' },

  // Time
  { key: 'timestamp',       label: 'Timestamp' },
];

export function formatCell(value) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
