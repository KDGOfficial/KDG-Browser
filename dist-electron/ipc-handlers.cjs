"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main/ipc-handlers.ts
var ipc_handlers_exports = {};
__export(ipc_handlers_exports, {
  registerIpcHandlers: () => registerIpcHandlers
});
module.exports = __toCommonJS(ipc_handlers_exports);
var import_electron = require("electron");
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// node_modules/@google/generative-ai/dist/index.mjs
var SchemaType;
(function(SchemaType2) {
  SchemaType2["STRING"] = "string";
  SchemaType2["NUMBER"] = "number";
  SchemaType2["INTEGER"] = "integer";
  SchemaType2["BOOLEAN"] = "boolean";
  SchemaType2["ARRAY"] = "array";
  SchemaType2["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));
var ExecutableCodeLanguage;
(function(ExecutableCodeLanguage2) {
  ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
  ExecutableCodeLanguage2["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
  Outcome2["OUTCOME_OK"] = "outcome_ok";
  Outcome2["OUTCOME_FAILED"] = "outcome_failed";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));
var POSSIBLE_ROLES = ["user", "model", "function", "system"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
(function(DynamicRetrievalMode2) {
  DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
  constructor(message, status, statusText, errorDetails) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errorDetails = errorDetails;
  }
};
var GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
};
var DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1beta";
var PACKAGE_VERSION = "0.21.0";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
async function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === "x-goog-api-key") {
        throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
      } else if (headerName === "x-goog-api-client") {
        throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body })
  };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, fetchFn = fetch) {
  const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
  return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
  let response;
  try {
    response = await fetchFn(url, fetchOptions);
  } catch (e) {
    handleResponseError(e, url);
  }
  if (!response.ok) {
    await handleResponseNotOk(response, url);
  }
  return response;
}
function handleResponseError(e, url) {
  let err = e;
  if (!(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
async function handleResponseNotOk(response, url) {
  let message = "";
  let errorDetails;
  try {
    const json = await response.json();
    message = json.error.message;
    if (json.error.details) {
      message += ` ${JSON.stringify(json.error.details)}`;
      errorDetails = json.error.details;
    }
  } catch (e) {
  }
  throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const controller = new AbortController();
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
      requestOptions.signal.addEventListener("abort", () => {
        controller.abort();
      });
    }
    fetchOptions.signal = controller.signal;
  }
  return fetchOptions;
}
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
function getText(response) {
  var _a, _b, _c, _d;
  const textStrings = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.text) {
        textStrings.push(part.text);
      }
      if (part.executableCode) {
        textStrings.push("\n```" + part.executableCode.language + "\n" + part.executableCode.code + "\n```\n");
      }
      if (part.codeExecutionResult) {
        textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
      }
    }
  }
  if (textStrings.length > 0) {
    return textStrings.join("");
  } else {
    return "";
  }
}
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
var badFinishReasons = [
  FinishReason.RECITATION,
  FinishReason.SAFETY,
  FinishReason.LANGUAGE
];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  });
}
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        });
      }
    }
  });
  return stream;
}
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      for (const candidate of response.candidates) {
        const i = candidate.index;
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[i]) {
          aggregatedResponse.candidates[i] = {
            index: candidate.index
          };
        }
        aggregatedResponse.candidates[i].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[i].groundingMetadata = candidate.groundingMetadata;
        aggregatedResponse.candidates[i].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[i].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[i].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[i].content) {
            aggregatedResponse.candidates[i].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (part.executableCode) {
              newPart.executableCode = part.executableCode;
            }
            if (part.codeExecutionResult) {
              newPart.codeExecutionResult = part.codeExecutionResult;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[i].content.parts.push(newPart);
          }
        }
      }
    }
    if (response.usageMetadata) {
      aggregatedResponse.usageMetadata = response.usageMetadata;
    }
  }
  return aggregatedResponse;
}
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse
  };
}
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === "string") {
    return { role: "system", parts: [{ text: input }] };
  } else if (input.text) {
    return { role: "system", parts: [input] };
  } else if (input.parts) {
    if (!input.role) {
      return { role: "system", parts: input.parts };
    } else {
      return input;
    }
  }
}
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
function formatCountTokensInput(params, modelParams) {
  var _a;
  let formattedGenerateContentRequest = {
    model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
    generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
    safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
    tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
    toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
    systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
    cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
    contents: []
  };
  const containsGenerateContentRequest = params.generateContentRequest != null;
  if (params.contents) {
    if (containsGenerateContentRequest) {
      throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
    }
    formattedGenerateContentRequest.contents = params.contents;
  } else if (containsGenerateContentRequest) {
    formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
  } else {
    const content = formatNewContent(params);
    formattedGenerateContentRequest.contents = [content];
  }
  return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
  let formattedRequest;
  if (params.contents) {
    formattedRequest = params;
  } else {
    const content = formatNewContent(params);
    formattedRequest = { contents: [content] };
  }
  if (params.systemInstruction) {
    formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
  }
  return formattedRequest;
}
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse",
  "executableCode",
  "codeExecutionResult"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
function validateChatHistory(history) {
  let prevContent = false;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    prevContent = true;
  }
}
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, _requestOptions = {}) {
    this.model = model;
    this.params = params;
    this._requestOptions = _requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    let finalResult;
    this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)).then((result) => {
      var _a2;
      if (result.response.candidates && result.response.candidates.length > 0) {
        this._history.push(newContent);
        const responseContent = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(result.response);
        if (blockErrorMessage) {
          console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
      finalResult = result;
    });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
    this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
      throw new Error(SILENT_ERROR);
    }).then((streamResult) => streamResult.response).then((response) => {
      if (response.candidates && response.candidates.length > 0) {
        this._history.push(newContent);
        const responseContent = Object.assign({}, response.candidates[0].content);
        if (!responseContent.role) {
          responseContent.role = "model";
        }
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(response);
        if (blockErrorMessage) {
          console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
    }).catch((e) => {
      if (e.message !== SILENT_ERROR) {
        console.error(e);
      }
    });
    return streamPromise;
  }
};
async function countTokens(apiKey, model, params, singleRequestOptions) {
  const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
  return response.json();
}
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
  return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
  return response.json();
}
var GenerativeModel = class {
  constructor(apiKey, modelParams, _requestOptions = {}) {
    this.apiKey = apiKey;
    this._requestOptions = _requestOptions;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
    this.cachedContent = modelParams.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    var _a;
    return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(request, requestOptions = {}) {
    const formattedParams = formatCountTokensInput(request, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent
    });
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(request, requestOptions = {}) {
    const formattedParams = formatEmbedContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
  }
};
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
    if (!cachedContent.name) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
    }
    if (!cachedContent.model) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
    }
    const disallowedDuplicates = ["model", "systemInstruction"];
    for (const key of disallowedDuplicates) {
      if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) && cachedContent[key] && (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
        if (key === "model") {
          const modelParamsComp = modelParams.model.startsWith("models/") ? modelParams.model.replace("models/", "") : modelParams.model;
          const cachedContentComp = cachedContent.model.startsWith("models/") ? cachedContent.model.replace("models/", "") : cachedContent.model;
          if (modelParamsComp === cachedContentComp) {
            continue;
          }
        }
        throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
      }
    }
    const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
    return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
  }
};

// main/ipc-handlers.ts
var DATA_FILE = import_path.default.join(import_electron.app.getPath("userData"), "kdg-browser-data.json");
var defaultData = {
  settings: {
    geminiKey: "AIzaSyDRUFM-LnQZY87nYNL3VpMJtTGxVNd0yqU",
    // Pre-populated user key
    searchEngine: "google",
    theme: "dark",
    homepage: "kdg://home",
    hasPromptedDefault: false,
    memorySaver: true
  },
  history: [],
  bookmarks: []
};
function readData() {
  try {
    if (!import_fs.default.existsSync(DATA_FILE)) {
      import_fs.default.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const raw = import_fs.default.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      settings: { ...defaultData.settings, ...parsed.settings },
      history: parsed.history || [],
      bookmarks: parsed.bookmarks || []
    };
  } catch (err) {
    console.error("Error reading browser data:", err);
    return defaultData;
  }
}
function writeData(data) {
  try {
    import_fs.default.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing browser data:", err);
  }
}
function importChromeBookmarks(browser) {
  let relativePath = "";
  if (browser === "chrome") {
    relativePath = "Google/Chrome/User Data/Default/Bookmarks";
  } else if (browser === "edge") {
    relativePath = "Microsoft/Edge/User Data/Default/Bookmarks";
  }
  const bookmarksPath = import_path.default.join(process.env.LOCALAPPDATA || "", relativePath);
  if (!import_fs.default.existsSync(bookmarksPath)) {
    throw new Error(`\u0424\u0430\u0439\u043B \u0437\u0430\u043A\u043B\u0430\u0434\u043E\u043A ${browser} \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.`);
  }
  const content = import_fs.default.readFileSync(bookmarksPath, "utf8");
  const data = JSON.parse(content);
  const bookmarksList = [];
  function traverse(node) {
    if (node.type === "url" && node.url) {
      bookmarksList.push({
        url: node.url,
        title: node.name || node.url
      });
    } else if (node.type === "folder" && Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }
  if (data.roots) {
    if (data.roots.bookmark_bar)
      traverse(data.roots.bookmark_bar);
    if (data.roots.other)
      traverse(data.roots.other);
    if (data.roots.synced)
      traverse(data.roots.synced);
  }
  return bookmarksList;
}
function parseHtmlBookmarks(htmlContent) {
  const bookmarks = [];
  const regex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const url = match[1];
    let title = match[2].replace(/<[^>]*>/g, "").trim();
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      bookmarks.push({ url, title: title || url });
    }
  }
  return bookmarks;
}
function registerIpcHandlers() {
  import_electron.ipcMain.handle("settings:get", () => {
    return readData().settings;
  });
  import_electron.ipcMain.handle("settings:save", (_, settings) => {
    const data = readData();
    data.settings = { ...data.settings, ...settings };
    writeData(data);
    return { success: true };
  });
  import_electron.ipcMain.handle("browser:isDefault", () => {
    return import_electron.app.isDefaultProtocolClient("http");
  });
  import_electron.ipcMain.handle("browser:setDefault", () => {
    let success = false;
    try {
      import_electron.app.setAsDefaultProtocolClient("http");
      import_electron.app.setAsDefaultProtocolClient("https");
      success = true;
    } catch (err) {
      console.error("Failed to set as default protocol client:", err);
    }
    if (process.platform === "win32") {
      import_electron.shell.openExternal("ms-settings:defaultapps").catch(() => {
      });
    }
    return success;
  });
  import_electron.ipcMain.handle("bookmarks:import", (_, type) => {
    try {
      const data = readData();
      const imported = importChromeBookmarks(type);
      if (imported.length === 0) {
        return { success: false, count: 0, error: "\u0417\u0430\u043A\u043B\u0430\u0434\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0438\u043B\u0438 \u0444\u0430\u0439\u043B \u043F\u0443\u0441\u0442." };
      }
      let addedCount = 0;
      imported.forEach((item) => {
        const exists = data.bookmarks.some((b) => b.url === item.url);
        if (!exists) {
          data.bookmarks.push({
            id: Math.random().toString(36).substring(2, 9),
            url: item.url,
            title: item.title,
            timestamp: Date.now()
          });
          addedCount++;
        }
      });
      writeData(data);
      return { success: true, count: addedCount };
    } catch (err) {
      console.error(`Error importing from ${type}:`, err);
      return { success: false, error: err.message };
    }
  });
  import_electron.ipcMain.handle("bookmarks:importDialog", async () => {
    const result = await import_electron.dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "HTML Bookmarks", extensions: ["html", "htm"] }
      ]
    });
    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true };
    }
    try {
      const filePath = result.filePaths[0];
      const content = import_fs.default.readFileSync(filePath, "utf8");
      const imported = parseHtmlBookmarks(content);
      if (imported.length === 0) {
        return { success: false, count: 0, error: "\u0412 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u043C \u0444\u0430\u0439\u043B\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0437\u0430\u043A\u043B\u0430\u0434\u043E\u043A." };
      }
      const data = readData();
      let addedCount = 0;
      imported.forEach((item) => {
        const exists = data.bookmarks.some((b) => b.url === item.url);
        if (!exists) {
          data.bookmarks.push({
            id: Math.random().toString(36).substring(2, 9),
            url: item.url,
            title: item.title,
            timestamp: Date.now()
          });
          addedCount++;
        }
      });
      writeData(data);
      return { success: true, count: addedCount, filePath: import_path.default.basename(filePath) };
    } catch (err) {
      console.error("Error importing bookmarks file:", err);
      return { success: false, error: err.message };
    }
  });
  import_electron.ipcMain.handle("history:get", () => {
    return readData().history;
  });
  import_electron.ipcMain.handle("history:add", (_, item) => {
    const data = readData();
    const filtered = data.history.filter((h) => h.url !== item.url);
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      url: item.url,
      title: item.title || item.url,
      timestamp: Date.now()
    };
    data.history = [newEntry, ...filtered].slice(0, 200);
    writeData(data);
    return data.history;
  });
  import_electron.ipcMain.handle("history:clear", () => {
    const data = readData();
    data.history = [];
    writeData(data);
    return [];
  });
  import_electron.ipcMain.handle("bookmarks:get", () => {
    return readData().bookmarks;
  });
  import_electron.ipcMain.handle("bookmarks:toggle", (_, item) => {
    const data = readData();
    const index = data.bookmarks.findIndex((b) => b.url === item.url);
    if (index >= 0) {
      data.bookmarks.splice(index, 1);
    } else {
      data.bookmarks.push({
        id: Math.random().toString(36).substring(2, 9),
        url: item.url,
        title: item.title || item.url,
        timestamp: Date.now()
      });
    }
    writeData(data);
    return data.bookmarks;
  });
  import_electron.ipcMain.handle("dialog:openImage", async () => {
    const result = await import_electron.dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "Images", extensions: ["jpg", "png", "jpeg", "webp"] }
      ]
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    try {
      const filePath = result.filePaths[0];
      const data = import_fs.default.readFileSync(filePath).toString("base64");
      const ext = import_path.default.extname(filePath).toLowerCase();
      let mimeType = "image/jpeg";
      if (ext === ".png")
        mimeType = "image/png";
      else if (ext === ".webp")
        mimeType = "image/webp";
      return {
        inlineData: {
          data,
          mimeType
        },
        fileName: import_path.default.basename(filePath)
      };
    } catch (err) {
      console.error("Error reading image file:", err);
      return null;
    }
  });
  import_electron.ipcMain.handle("ai:generate", async (_, { prompt, systemInstruction, imagePart }) => {
    const data = readData();
    const apiKey = data.settings.geminiKey || defaultData.settings.geminiKey;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction || '\u0422\u044B \u2014 \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442 KDG Browser, \u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u0433\u0435\u0439\u043C\u0435\u0440\u0430 \u0434\u043B\u044F "\u041A\u0430\u043D\u0430\u043B\u0430 \u0414\u043E\u0431\u0440\u043E\u0433\u043E \u0413\u0435\u0439\u043C\u0435\u0440\u0430" (KDG). \u0422\u0432\u043E\u044F \u0446\u0435\u043B\u044C \u2014 \u043F\u043E\u043C\u043E\u0433\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0438\u0434\u0435\u043E, \u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u043E \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F\u043C \u0438 \u0434\u0430\u0432\u0430\u0442\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u043E\u0432\u0435\u0442\u044B \u043F\u043E \u0438\u0433\u0440\u0430\u043C.'
      });
      const parts = [{ text: prompt }];
      if (imagePart) {
        parts.push(imagePart);
      }
      const result = await model.generateContent(parts);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.error("Gemini API error:", err);
      throw new Error(err.message || "Error occurred while contacting Google Gemini.");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerIpcHandlers
});
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbWFpbi9pcGMtaGFuZGxlcnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bnb29nbGUvZ2VuZXJhdGl2ZS1haS9kaXN0L2luZGV4Lm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgaXBjTWFpbiwgYXBwLCBzaGVsbCwgZGlhbG9nIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgR29vZ2xlR2VuZXJhdGl2ZUFJIH0gZnJvbSAnQGdvb2dsZS9nZW5lcmF0aXZlLWFpJztcblxuY29uc3QgREFUQV9GSUxFID0gcGF0aC5qb2luKGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpLCAna2RnLWJyb3dzZXItZGF0YS5qc29uJyk7XG5cbmludGVyZmFjZSBBcHBEYXRhIHtcbiAgc2V0dGluZ3M6IHtcbiAgICBnZW1pbmlLZXk6IHN0cmluZztcbiAgICBzZWFyY2hFbmdpbmU6ICdnb29nbGUnIHwgJ3lhbmRleCcgfCAnYmluZycgfCAnZHVja2R1Y2tnbyc7XG4gICAgdGhlbWU6ICdkYXJrJyB8ICdsaWdodCcgfCAnZ2FtZXInO1xuICAgIGhvbWVwYWdlOiBzdHJpbmc7XG4gICAgaGFzUHJvbXB0ZWREZWZhdWx0OiBib29sZWFuO1xuICAgIG1lbW9yeVNhdmVyOiBib29sZWFuO1xuICB9O1xuICBoaXN0b3J5OiBBcnJheTx7XG4gICAgaWQ6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICB9PjtcbiAgYm9va21hcmtzOiBBcnJheTx7XG4gICAgaWQ6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICB9Pjtcbn1cblxuLy8gSW5pdGlhbCBkYXRhIHN0cnVjdHVyZVxuY29uc3QgZGVmYXVsdERhdGE6IEFwcERhdGEgPSB7XG4gIHNldHRpbmdzOiB7XG4gICAgZ2VtaW5pS2V5OiAnQUl6YVN5RFJVRk0tTG5RWlk4N25ZTkwzVnBNSnRUR3hWTmQweXFVJywgLy8gUHJlLXBvcHVsYXRlZCB1c2VyIGtleVxuICAgIHNlYXJjaEVuZ2luZTogJ2dvb2dsZScsXG4gICAgdGhlbWU6ICdkYXJrJyxcbiAgICBob21lcGFnZTogJ2tkZzovL2hvbWUnLFxuICAgIGhhc1Byb21wdGVkRGVmYXVsdDogZmFsc2UsXG4gICAgbWVtb3J5U2F2ZXI6IHRydWVcbiAgfSxcbiAgaGlzdG9yeTogW10sXG4gIGJvb2ttYXJrczogW11cbn07XG5cbi8vIEhlbHBlciB0byByZWFkIGRhdGFcbmZ1bmN0aW9uIHJlYWREYXRhKCk6IEFwcERhdGEge1xuICB0cnkge1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhEQVRBX0ZJTEUpKSB7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKERBVEFfRklMRSwgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdERhdGEsIG51bGwsIDIpKTtcbiAgICAgIHJldHVybiBkZWZhdWx0RGF0YTtcbiAgICB9XG4gICAgY29uc3QgcmF3ID0gZnMucmVhZEZpbGVTeW5jKERBVEFfRklMRSwgJ3V0Zi04Jyk7XG4gICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShyYXcpO1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogeyAuLi5kZWZhdWx0RGF0YS5zZXR0aW5ncywgLi4ucGFyc2VkLnNldHRpbmdzIH0sXG4gICAgICBoaXN0b3J5OiBwYXJzZWQuaGlzdG9yeSB8fCBbXSxcbiAgICAgIGJvb2ttYXJrczogcGFyc2VkLmJvb2ttYXJrcyB8fCBbXVxuICAgIH07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlYWRpbmcgYnJvd3NlciBkYXRhOicsIGVycik7XG4gICAgcmV0dXJuIGRlZmF1bHREYXRhO1xuICB9XG59XG5cbi8vIEhlbHBlciB0byB3cml0ZSBkYXRhXG5mdW5jdGlvbiB3cml0ZURhdGEoZGF0YTogQXBwRGF0YSkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoREFUQV9GSUxFLCBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdyaXRpbmcgYnJvd3NlciBkYXRhOicsIGVycik7XG4gIH1cbn1cblxuLy8gQm9va21hcmtzIGltcG9ydCBoZWxwZXIgZnJvbSBDaHJvbWUvRWRnZVxuZnVuY3Rpb24gaW1wb3J0Q2hyb21lQm9va21hcmtzKGJyb3dzZXI6ICdjaHJvbWUnIHwgJ2VkZ2UnKTogQXJyYXk8eyB1cmw6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PiB7XG4gIGxldCByZWxhdGl2ZVBhdGggPSAnJztcbiAgaWYgKGJyb3dzZXIgPT09ICdjaHJvbWUnKSB7XG4gICAgcmVsYXRpdmVQYXRoID0gJ0dvb2dsZS9DaHJvbWUvVXNlciBEYXRhL0RlZmF1bHQvQm9va21hcmtzJztcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSAnZWRnZScpIHtcbiAgICByZWxhdGl2ZVBhdGggPSAnTWljcm9zb2Z0L0VkZ2UvVXNlciBEYXRhL0RlZmF1bHQvQm9va21hcmtzJztcbiAgfVxuICBcbiAgY29uc3QgYm9va21hcmtzUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmVudi5MT0NBTEFQUERBVEEgfHwgJycsIHJlbGF0aXZlUGF0aCk7XG4gIGlmICghZnMuZXhpc3RzU3luYyhib29rbWFya3NQYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgXHUwNDI0XHUwNDMwXHUwNDM5XHUwNDNCIFx1MDQzN1x1MDQzMFx1MDQzQVx1MDQzQlx1MDQzMFx1MDQzNFx1MDQzRVx1MDQzQSAke2Jyb3dzZXJ9IFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0QuYCk7XG4gIH1cbiAgXG4gIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoYm9va21hcmtzUGF0aCwgJ3V0ZjgnKTtcbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gIGNvbnN0IGJvb2ttYXJrc0xpc3Q6IEFycmF5PHsgdXJsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gPSBbXTtcbiAgXG4gIGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGU6IGFueSkge1xuICAgIGlmIChub2RlLnR5cGUgPT09ICd1cmwnICYmIG5vZGUudXJsKSB7XG4gICAgICBib29rbWFya3NMaXN0LnB1c2goe1xuICAgICAgICB1cmw6IG5vZGUudXJsLFxuICAgICAgICB0aXRsZTogbm9kZS5uYW1lIHx8IG5vZGUudXJsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2ZvbGRlcicgJiYgQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKHRyYXZlcnNlKTtcbiAgICB9XG4gIH1cbiAgXG4gIGlmIChkYXRhLnJvb3RzKSB7XG4gICAgaWYgKGRhdGEucm9vdHMuYm9va21hcmtfYmFyKSB0cmF2ZXJzZShkYXRhLnJvb3RzLmJvb2ttYXJrX2Jhcik7XG4gICAgaWYgKGRhdGEucm9vdHMub3RoZXIpIHRyYXZlcnNlKGRhdGEucm9vdHMub3RoZXIpO1xuICAgIGlmIChkYXRhLnJvb3RzLnN5bmNlZCkgdHJhdmVyc2UoZGF0YS5yb290cy5zeW5jZWQpO1xuICB9XG4gIFxuICByZXR1cm4gYm9va21hcmtzTGlzdDtcbn1cblxuLy8gQm9va21hcmtzIGltcG9ydCBoZWxwZXIgZnJvbSBIVE1MIHN0cmluZ1xuZnVuY3Rpb24gcGFyc2VIdG1sQm9va21hcmtzKGh0bWxDb250ZW50OiBzdHJpbmcpOiBBcnJheTx7IHVybDogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+IHtcbiAgY29uc3QgYm9va21hcmtzOiBBcnJheTx7IHVybDogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+ID0gW107XG4gIGNvbnN0IHJlZ2V4ID0gLzxhXFxzK1tePl0qaHJlZj1bXCInXShbXlwiJ10qKVtcIiddW14+XSo+KC4qPyk8XFwvYT4vZ2k7XG4gIGxldCBtYXRjaDtcbiAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4LmV4ZWMoaHRtbENvbnRlbnQpKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHVybCA9IG1hdGNoWzFdO1xuICAgIGxldCB0aXRsZSA9IG1hdGNoWzJdLnJlcGxhY2UoLzxbXj5dKj4vZywgJycpLnRyaW0oKTtcbiAgICBpZiAodXJsICYmICh1cmwuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8IHVybC5zdGFydHNXaXRoKCdodHRwczovLycpKSkge1xuICAgICAgYm9va21hcmtzLnB1c2goeyB1cmwsIHRpdGxlOiB0aXRsZSB8fCB1cmwgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib29rbWFya3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcklwY0hhbmRsZXJzKCkge1xuICAvLyAtLS0gU2V0dGluZ3MgSGFuZGxlcnMgLS0tXG4gIGlwY01haW4uaGFuZGxlKCdzZXR0aW5nczpnZXQnLCAoKSA9PiB7XG4gICAgcmV0dXJuIHJlYWREYXRhKCkuc2V0dGluZ3M7XG4gIH0pO1xuXG4gIGlwY01haW4uaGFuZGxlKCdzZXR0aW5nczpzYXZlJywgKF8sIHNldHRpbmdzOiBBcHBEYXRhWydzZXR0aW5ncyddKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHJlYWREYXRhKCk7XG4gICAgZGF0YS5zZXR0aW5ncyA9IHsgLi4uZGF0YS5zZXR0aW5ncywgLi4uc2V0dGluZ3MgfTtcbiAgICB3cml0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICB9KTtcblxuICAvLyAtLS0gRGVmYXVsdCBCcm93c2VyIEhhbmRsZXJzIC0tLVxuICBpcGNNYWluLmhhbmRsZSgnYnJvd3Nlcjppc0RlZmF1bHQnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGFwcC5pc0RlZmF1bHRQcm90b2NvbENsaWVudCgnaHR0cCcpO1xuICB9KTtcblxuICBpcGNNYWluLmhhbmRsZSgnYnJvd3NlcjpzZXREZWZhdWx0JywgKCkgPT4ge1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGFwcC5zZXRBc0RlZmF1bHRQcm90b2NvbENsaWVudCgnaHR0cCcpO1xuICAgICAgYXBwLnNldEFzRGVmYXVsdFByb3RvY29sQ2xpZW50KCdodHRwcycpO1xuICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2V0IGFzIGRlZmF1bHQgcHJvdG9jb2wgY2xpZW50OicsIGVycik7XG4gICAgfVxuICAgIFxuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICBzaGVsbC5vcGVuRXh0ZXJuYWwoJ21zLXNldHRpbmdzOmRlZmF1bHRhcHBzJykuY2F0Y2goKCkgPT4ge30pO1xuICAgIH1cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfSk7XG5cbiAgLy8gLS0tIEJvb2ttYXJrcyBJbXBvcnQgSGFuZGxlcnMgLS0tXG4gIGlwY01haW4uaGFuZGxlKCdib29rbWFya3M6aW1wb3J0JywgKF8sIHR5cGU6ICdjaHJvbWUnIHwgJ2VkZ2UnKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSByZWFkRGF0YSgpO1xuICAgICAgY29uc3QgaW1wb3J0ZWQgPSBpbXBvcnRDaHJvbWVCb29rbWFya3ModHlwZSk7XG4gICAgICBcbiAgICAgIGlmIChpbXBvcnRlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGNvdW50OiAwLCBlcnJvcjogJ1x1MDQxN1x1MDQzMFx1MDQzQVx1MDQzQlx1MDQzMFx1MDQzNFx1MDQzQVx1MDQzOCBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDRCIFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0NDRcdTA0MzBcdTA0MzlcdTA0M0IgXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyLicgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IGFkZGVkQ291bnQgPSAwO1xuICAgICAgaW1wb3J0ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgZXhpc3RzID0gZGF0YS5ib29rbWFya3Muc29tZShiID0+IGIudXJsID09PSBpdGVtLnVybCk7XG4gICAgICAgIGlmICghZXhpc3RzKSB7XG4gICAgICAgICAgZGF0YS5ib29rbWFya3MucHVzaCh7XG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDkpLFxuICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYWRkZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgd3JpdGVEYXRhKGRhdGEpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY291bnQ6IGFkZGVkQ291bnQgfTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW1wb3J0aW5nIGZyb20gJHt0eXBlfTpgLCBlcnIpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnIubWVzc2FnZSB9O1xuICAgIH1cbiAgfSk7XG5cbiAgaXBjTWFpbi5oYW5kbGUoJ2Jvb2ttYXJrczppbXBvcnREaWFsb2cnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGlhbG9nLnNob3dPcGVuRGlhbG9nKHtcbiAgICAgIHByb3BlcnRpZXM6IFsnb3BlbkZpbGUnXSxcbiAgICAgIGZpbHRlcnM6IFtcbiAgICAgICAgeyBuYW1lOiAnSFRNTCBCb29rbWFya3MnLCBleHRlbnNpb25zOiBbJ2h0bWwnLCAnaHRtJ10gfVxuICAgICAgXVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChyZXN1bHQuY2FuY2VsZWQgfHwgcmVzdWx0LmZpbGVQYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBjYW5jZWxlZDogdHJ1ZSB9O1xuICAgIH1cbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSByZXN1bHQuZmlsZVBhdGhzWzBdO1xuICAgICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnN0IGltcG9ydGVkID0gcGFyc2VIdG1sQm9va21hcmtzKGNvbnRlbnQpO1xuICAgICAgXG4gICAgICBpZiAoaW1wb3J0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBjb3VudDogMCwgZXJyb3I6ICdcdTA0MTIgXHUwNDMyXHUwNDRCXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDNFXHUwNDNDIFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQlx1MDQzNSBcdTA0M0RcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDM5XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDNFIFx1MDQzN1x1MDQzMFx1MDQzQVx1MDQzQlx1MDQzMFx1MDQzNFx1MDQzRVx1MDQzQS4nIH07XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSByZWFkRGF0YSgpO1xuICAgICAgbGV0IGFkZGVkQ291bnQgPSAwO1xuICAgICAgaW1wb3J0ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgZXhpc3RzID0gZGF0YS5ib29rbWFya3Muc29tZShiID0+IGIudXJsID09PSBpdGVtLnVybCk7XG4gICAgICAgIGlmICghZXhpc3RzKSB7XG4gICAgICAgICAgZGF0YS5ib29rbWFya3MucHVzaCh7XG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDkpLFxuICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYWRkZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgd3JpdGVEYXRhKGRhdGEpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgY291bnQ6IGFkZGVkQ291bnQsIGZpbGVQYXRoOiBwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKSB9O1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbXBvcnRpbmcgYm9va21hcmtzIGZpbGU6JywgZXJyKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLSBIaXN0b3J5IEhhbmRsZXJzIC0tLVxuICBpcGNNYWluLmhhbmRsZSgnaGlzdG9yeTpnZXQnLCAoKSA9PiB7XG4gICAgcmV0dXJuIHJlYWREYXRhKCkuaGlzdG9yeTtcbiAgfSk7XG5cbiAgaXBjTWFpbi5oYW5kbGUoJ2hpc3Rvcnk6YWRkJywgKF8sIGl0ZW06IHsgdXJsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZWFkRGF0YSgpO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gZGF0YS5oaXN0b3J5LmZpbHRlcihoID0+IGgudXJsICE9PSBpdGVtLnVybCk7XG4gICAgY29uc3QgbmV3RW50cnkgPSB7XG4gICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDkpLFxuICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgIHRpdGxlOiBpdGVtLnRpdGxlIHx8IGl0ZW0udXJsLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgfTtcbiAgICBkYXRhLmhpc3RvcnkgPSBbbmV3RW50cnksIC4uLmZpbHRlcmVkXS5zbGljZSgwLCAyMDApO1xuICAgIHdyaXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gZGF0YS5oaXN0b3J5O1xuICB9KTtcblxuICBpcGNNYWluLmhhbmRsZSgnaGlzdG9yeTpjbGVhcicsICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gcmVhZERhdGEoKTtcbiAgICBkYXRhLmhpc3RvcnkgPSBbXTtcbiAgICB3cml0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIFtdO1xuICB9KTtcblxuICAvLyAtLS0gQm9va21hcmtzIEhhbmRsZXJzIC0tLVxuICBpcGNNYWluLmhhbmRsZSgnYm9va21hcmtzOmdldCcsICgpID0+IHtcbiAgICByZXR1cm4gcmVhZERhdGEoKS5ib29rbWFya3M7XG4gIH0pO1xuXG4gIGlwY01haW4uaGFuZGxlKCdib29rbWFya3M6dG9nZ2xlJywgKF8sIGl0ZW06IHsgdXJsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZWFkRGF0YSgpO1xuICAgIGNvbnN0IGluZGV4ID0gZGF0YS5ib29rbWFya3MuZmluZEluZGV4KGIgPT4gYi51cmwgPT09IGl0ZW0udXJsKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgZGF0YS5ib29rbWFya3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5ib29rbWFya3MucHVzaCh7XG4gICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOSksXG4gICAgICAgIHVybDogaXRlbS51cmwsXG4gICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlIHx8IGl0ZW0udXJsLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgIH0pO1xuICAgIH1cbiAgICB3cml0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGEuYm9va21hcmtzO1xuICB9KTtcblxuICAvLyAtLS0gRGlhbG9nIEhhbmRsZXJzIC0tLVxuICBpcGNNYWluLmhhbmRsZSgnZGlhbG9nOm9wZW5JbWFnZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkaWFsb2cuc2hvd09wZW5EaWFsb2coe1xuICAgICAgcHJvcGVydGllczogWydvcGVuRmlsZSddLFxuICAgICAgZmlsdGVyczogW1xuICAgICAgICB7IG5hbWU6ICdJbWFnZXMnLCBleHRlbnNpb25zOiBbJ2pwZycsICdwbmcnLCAnanBlZycsICd3ZWJwJ10gfVxuICAgICAgXVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChyZXN1bHQuY2FuY2VsZWQgfHwgcmVzdWx0LmZpbGVQYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSByZXN1bHQuZmlsZVBhdGhzWzBdO1xuICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgICAgY29uc3QgZXh0ID0gcGF0aC5leHRuYW1lKGZpbGVQYXRoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgbGV0IG1pbWVUeXBlID0gJ2ltYWdlL2pwZWcnO1xuICAgICAgaWYgKGV4dCA9PT0gJy5wbmcnKSBtaW1lVHlwZSA9ICdpbWFnZS9wbmcnO1xuICAgICAgZWxzZSBpZiAoZXh0ID09PSAnLndlYnAnKSBtaW1lVHlwZSA9ICdpbWFnZS93ZWJwJztcbiAgICAgIFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5saW5lRGF0YToge1xuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgbWltZVR5cGVcbiAgICAgICAgfSxcbiAgICAgICAgZmlsZU5hbWU6IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVhZGluZyBpbWFnZSBmaWxlOicsIGVycik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIC0tLSBBSSBHZW1pbmkgSGFuZGxlciAtLS1cbiAgaXBjTWFpbi5oYW5kbGUoJ2FpOmdlbmVyYXRlJywgYXN5bmMgKF8sIHsgcHJvbXB0LCBzeXN0ZW1JbnN0cnVjdGlvbiwgaW1hZ2VQYXJ0IH06IHsgcHJvbXB0OiBzdHJpbmc7IHN5c3RlbUluc3RydWN0aW9uPzogc3RyaW5nOyBpbWFnZVBhcnQ/OiBhbnkgfSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZWFkRGF0YSgpO1xuICAgIGNvbnN0IGFwaUtleSA9IGRhdGEuc2V0dGluZ3MuZ2VtaW5pS2V5IHx8IGRlZmF1bHREYXRhLnNldHRpbmdzLmdlbWluaUtleTtcblxuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dlbWluaSBBUEkga2V5IGlzIG5vdCBjb25maWd1cmVkLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBnZW5BSSA9IG5ldyBHb29nbGVHZW5lcmF0aXZlQUkoYXBpS2V5KTtcbiAgICAgIGNvbnN0IG1vZGVsID0gZ2VuQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsKHtcbiAgICAgICAgbW9kZWw6ICdnZW1pbmktMS41LWZsYXNoJyxcbiAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IHN5c3RlbUluc3RydWN0aW9uIHx8ICdcdTA0MjJcdTA0NEIgXHUyMDE0IFx1MDQzOFx1MDQ0MVx1MDQzQVx1MDQ0M1x1MDQ0MVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0MzhcdTA0M0RcdTA0NDJcdTA0MzVcdTA0M0JcdTA0M0JcdTA0MzVcdTA0M0FcdTA0NDIgS0RHIEJyb3dzZXIsIFx1MDQzRlx1MDQzRVx1MDQzQ1x1MDQzRVx1MDQ0OVx1MDQzRFx1MDQzOFx1MDQzQSBcdTA0MzNcdTA0MzVcdTA0MzlcdTA0M0NcdTA0MzVcdTA0NDBcdTA0MzAgXHUwNDM0XHUwNDNCXHUwNDRGIFwiXHUwNDFBXHUwNDMwXHUwNDNEXHUwNDMwXHUwNDNCXHUwNDMwIFx1MDQxNFx1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MTNcdTA0MzVcdTA0MzlcdTA0M0NcdTA0MzVcdTA0NDBcdTA0MzBcIiAoS0RHKS4gXHUwNDIyXHUwNDMyXHUwNDNFXHUwNDRGIFx1MDQ0Nlx1MDQzNVx1MDQzQlx1MDQ0QyBcdTIwMTQgXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDMzXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Rlx1MDQzQyBcdTA0MzBcdTA0M0RcdTA0MzBcdTA0M0JcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDM4XHUwNDM0XHUwNDM1XHUwNDNFLCBcdTA0M0VcdTA0NDJcdTA0MzJcdTA0MzVcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwIFx1MDQzMlx1MDQzRVx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0MVx1MDQ0QiBcdTA0M0ZcdTA0M0UgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ1XHUwNDNFXHUwNDM2XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGXHUwNDNDIFx1MDQzOCBcdTA0MzRcdTA0MzBcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNBXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQ0QiBcdTA0M0ZcdTA0M0UgXHUwNDM4XHUwNDMzXHUwNDQwXHUwNDMwXHUwNDNDLidcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYXJ0czogYW55W10gPSBbeyB0ZXh0OiBwcm9tcHQgfV07XG4gICAgICBpZiAoaW1hZ2VQYXJ0KSB7XG4gICAgICAgIHBhcnRzLnB1c2goaW1hZ2VQYXJ0KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kZWwuZ2VuZXJhdGVDb250ZW50KHBhcnRzKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVzdWx0LnJlc3BvbnNlO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignR2VtaW5pIEFQSSBlcnJvcjonLCBlcnIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVyci5tZXNzYWdlIHx8ICdFcnJvciBvY2N1cnJlZCB3aGlsZSBjb250YWN0aW5nIEdvb2dsZSBHZW1pbmkuJyk7XG4gICAgfVxuICB9KTtcbn1cbiIsICIvKipcbiAqIENvbnRhaW5zIHRoZSBsaXN0IG9mIE9wZW5BUEkgZGF0YSB0eXBlc1xuICogYXMgZGVmaW5lZCBieSBodHRwczovL3N3YWdnZXIuaW8vZG9jcy9zcGVjaWZpY2F0aW9uL2RhdGEtbW9kZWxzL2RhdGEtdHlwZXMvXG4gKiBAcHVibGljXG4gKi9cbnZhciBTY2hlbWFUeXBlO1xuKGZ1bmN0aW9uIChTY2hlbWFUeXBlKSB7XG4gICAgLyoqIFN0cmluZyB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJTVFJJTkdcIl0gPSBcInN0cmluZ1wiO1xuICAgIC8qKiBOdW1iZXIgdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiTlVNQkVSXCJdID0gXCJudW1iZXJcIjtcbiAgICAvKiogSW50ZWdlciB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJJTlRFR0VSXCJdID0gXCJpbnRlZ2VyXCI7XG4gICAgLyoqIEJvb2xlYW4gdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiQk9PTEVBTlwiXSA9IFwiYm9vbGVhblwiO1xuICAgIC8qKiBBcnJheSB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJBUlJBWVwiXSA9IFwiYXJyYXlcIjtcbiAgICAvKiogT2JqZWN0IHR5cGUuICovXG4gICAgU2NoZW1hVHlwZVtcIk9CSkVDVFwiXSA9IFwib2JqZWN0XCI7XG59KShTY2hlbWFUeXBlIHx8IChTY2hlbWFUeXBlID0ge30pKTtcblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogQHB1YmxpY1xuICovXG52YXIgRXhlY3V0YWJsZUNvZGVMYW5ndWFnZTtcbihmdW5jdGlvbiAoRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSkge1xuICAgIEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2VbXCJMQU5HVUFHRV9VTlNQRUNJRklFRFwiXSA9IFwibGFuZ3VhZ2VfdW5zcGVjaWZpZWRcIjtcbiAgICBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlW1wiUFlUSE9OXCJdID0gXCJweXRob25cIjtcbn0pKEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UgfHwgKEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UgPSB7fSkpO1xuLyoqXG4gKiBQb3NzaWJsZSBvdXRjb21lcyBvZiBjb2RlIGV4ZWN1dGlvbi5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIE91dGNvbWU7XG4oZnVuY3Rpb24gKE91dGNvbWUpIHtcbiAgICAvKipcbiAgICAgKiBVbnNwZWNpZmllZCBzdGF0dXMuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX1VOU1BFQ0lGSUVEXCJdID0gXCJvdXRjb21lX3Vuc3BlY2lmaWVkXCI7XG4gICAgLyoqXG4gICAgICogQ29kZSBleGVjdXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgKi9cbiAgICBPdXRjb21lW1wiT1VUQ09NRV9PS1wiXSA9IFwib3V0Y29tZV9va1wiO1xuICAgIC8qKlxuICAgICAqIENvZGUgZXhlY3V0aW9uIGZpbmlzaGVkIGJ1dCB3aXRoIGEgZmFpbHVyZS4gYHN0ZGVycmAgc2hvdWxkIGNvbnRhaW4gdGhlXG4gICAgICogcmVhc29uLlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX0ZBSUxFRFwiXSA9IFwib3V0Y29tZV9mYWlsZWRcIjtcbiAgICAvKipcbiAgICAgKiBDb2RlIGV4ZWN1dGlvbiByYW4gZm9yIHRvbyBsb25nLCBhbmQgd2FzIGNhbmNlbGxlZC4gVGhlcmUgbWF5IG9yIG1heSBub3RcbiAgICAgKiBiZSBhIHBhcnRpYWwgb3V0cHV0IHByZXNlbnQuXG4gICAgICovXG4gICAgT3V0Y29tZVtcIk9VVENPTUVfREVBRExJTkVfRVhDRUVERURcIl0gPSBcIm91dGNvbWVfZGVhZGxpbmVfZXhjZWVkZWRcIjtcbn0pKE91dGNvbWUgfHwgKE91dGNvbWUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBQb3NzaWJsZSByb2xlcy5cbiAqIEBwdWJsaWNcbiAqL1xuY29uc3QgUE9TU0lCTEVfUk9MRVMgPSBbXCJ1c2VyXCIsIFwibW9kZWxcIiwgXCJmdW5jdGlvblwiLCBcInN5c3RlbVwiXTtcbi8qKlxuICogSGFybSBjYXRlZ29yaWVzIHRoYXQgd291bGQgY2F1c2UgcHJvbXB0cyBvciBjYW5kaWRhdGVzIHRvIGJlIGJsb2NrZWQuXG4gKiBAcHVibGljXG4gKi9cbnZhciBIYXJtQ2F0ZWdvcnk7XG4oZnVuY3Rpb24gKEhhcm1DYXRlZ29yeSkge1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fQ0FURUdPUllfVU5TUEVDSUZJRURcIjtcbiAgICBIYXJtQ2F0ZWdvcnlbXCJIQVJNX0NBVEVHT1JZX0hBVEVfU1BFRUNIXCJdID0gXCJIQVJNX0NBVEVHT1JZX0hBVEVfU1BFRUNIXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9TRVhVQUxMWV9FWFBMSUNJVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9TRVhVQUxMWV9FWFBMSUNJVFwiO1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfSEFSQVNTTUVOVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9IQVJBU1NNRU5UXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9EQU5HRVJPVVNfQ09OVEVOVFwiXSA9IFwiSEFSTV9DQVRFR09SWV9EQU5HRVJPVVNfQ09OVEVOVFwiO1xufSkoSGFybUNhdGVnb3J5IHx8IChIYXJtQ2F0ZWdvcnkgPSB7fSkpO1xuLyoqXG4gKiBUaHJlc2hvbGQgYWJvdmUgd2hpY2ggYSBwcm9tcHQgb3IgY2FuZGlkYXRlIHdpbGwgYmUgYmxvY2tlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1CbG9ja1RocmVzaG9sZDtcbihmdW5jdGlvbiAoSGFybUJsb2NrVGhyZXNob2xkKSB7XG4gICAgLy8gVGhyZXNob2xkIGlzIHVuc3BlY2lmaWVkLlxuICAgIEhhcm1CbG9ja1RocmVzaG9sZFtcIkhBUk1fQkxPQ0tfVEhSRVNIT0xEX1VOU1BFQ0lGSUVEXCJdID0gXCJIQVJNX0JMT0NLX1RIUkVTSE9MRF9VTlNQRUNJRklFRFwiO1xuICAgIC8vIENvbnRlbnQgd2l0aCBORUdMSUdJQkxFIHdpbGwgYmUgYWxsb3dlZC5cbiAgICBIYXJtQmxvY2tUaHJlc2hvbGRbXCJCTE9DS19MT1dfQU5EX0FCT1ZFXCJdID0gXCJCTE9DS19MT1dfQU5EX0FCT1ZFXCI7XG4gICAgLy8gQ29udGVudCB3aXRoIE5FR0xJR0lCTEUgYW5kIExPVyB3aWxsIGJlIGFsbG93ZWQuXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfTUVESVVNX0FORF9BQk9WRVwiXSA9IFwiQkxPQ0tfTUVESVVNX0FORF9BQk9WRVwiO1xuICAgIC8vIENvbnRlbnQgd2l0aCBORUdMSUdJQkxFLCBMT1csIGFuZCBNRURJVU0gd2lsbCBiZSBhbGxvd2VkLlxuICAgIEhhcm1CbG9ja1RocmVzaG9sZFtcIkJMT0NLX09OTFlfSElHSFwiXSA9IFwiQkxPQ0tfT05MWV9ISUdIXCI7XG4gICAgLy8gQWxsIGNvbnRlbnQgd2lsbCBiZSBhbGxvd2VkLlxuICAgIEhhcm1CbG9ja1RocmVzaG9sZFtcIkJMT0NLX05PTkVcIl0gPSBcIkJMT0NLX05PTkVcIjtcbn0pKEhhcm1CbG9ja1RocmVzaG9sZCB8fCAoSGFybUJsb2NrVGhyZXNob2xkID0ge30pKTtcbi8qKlxuICogUHJvYmFiaWxpdHkgdGhhdCBhIHByb21wdCBvciBjYW5kaWRhdGUgbWF0Y2hlcyBhIGhhcm0gY2F0ZWdvcnkuXG4gKiBAcHVibGljXG4gKi9cbnZhciBIYXJtUHJvYmFiaWxpdHk7XG4oZnVuY3Rpb24gKEhhcm1Qcm9iYWJpbGl0eSkge1xuICAgIC8vIFByb2JhYmlsaXR5IGlzIHVuc3BlY2lmaWVkLlxuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkhBUk1fUFJPQkFCSUxJVFlfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fUFJPQkFCSUxJVFlfVU5TUEVDSUZJRURcIjtcbiAgICAvLyBDb250ZW50IGhhcyBhIG5lZ2xpZ2libGUgY2hhbmNlIG9mIGJlaW5nIHVuc2FmZS5cbiAgICBIYXJtUHJvYmFiaWxpdHlbXCJORUdMSUdJQkxFXCJdID0gXCJORUdMSUdJQkxFXCI7XG4gICAgLy8gQ29udGVudCBoYXMgYSBsb3cgY2hhbmNlIG9mIGJlaW5nIHVuc2FmZS5cbiAgICBIYXJtUHJvYmFiaWxpdHlbXCJMT1dcIl0gPSBcIkxPV1wiO1xuICAgIC8vIENvbnRlbnQgaGFzIGEgbWVkaXVtIGNoYW5jZSBvZiBiZWluZyB1bnNhZmUuXG4gICAgSGFybVByb2JhYmlsaXR5W1wiTUVESVVNXCJdID0gXCJNRURJVU1cIjtcbiAgICAvLyBDb250ZW50IGhhcyBhIGhpZ2ggY2hhbmNlIG9mIGJlaW5nIHVuc2FmZS5cbiAgICBIYXJtUHJvYmFiaWxpdHlbXCJISUdIXCJdID0gXCJISUdIXCI7XG59KShIYXJtUHJvYmFiaWxpdHkgfHwgKEhhcm1Qcm9iYWJpbGl0eSA9IHt9KSk7XG4vKipcbiAqIFJlYXNvbiB0aGF0IGEgcHJvbXB0IHdhcyBibG9ja2VkLlxuICogQHB1YmxpY1xuICovXG52YXIgQmxvY2tSZWFzb247XG4oZnVuY3Rpb24gKEJsb2NrUmVhc29uKSB7XG4gICAgLy8gQSBibG9ja2VkIHJlYXNvbiB3YXMgbm90IHNwZWNpZmllZC5cbiAgICBCbG9ja1JlYXNvbltcIkJMT0NLRURfUkVBU09OX1VOU1BFQ0lGSUVEXCJdID0gXCJCTE9DS0VEX1JFQVNPTl9VTlNQRUNJRklFRFwiO1xuICAgIC8vIENvbnRlbnQgd2FzIGJsb2NrZWQgYnkgc2FmZXR5IHNldHRpbmdzLlxuICAgIEJsb2NrUmVhc29uW1wiU0FGRVRZXCJdID0gXCJTQUZFVFlcIjtcbiAgICAvLyBDb250ZW50IHdhcyBibG9ja2VkLCBidXQgdGhlIHJlYXNvbiBpcyB1bmNhdGVnb3JpemVkLlxuICAgIEJsb2NrUmVhc29uW1wiT1RIRVJcIl0gPSBcIk9USEVSXCI7XG59KShCbG9ja1JlYXNvbiB8fCAoQmxvY2tSZWFzb24gPSB7fSkpO1xuLyoqXG4gKiBSZWFzb24gdGhhdCBhIGNhbmRpZGF0ZSBmaW5pc2hlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEZpbmlzaFJlYXNvbjtcbihmdW5jdGlvbiAoRmluaXNoUmVhc29uKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZS4gVGhpcyB2YWx1ZSBpcyB1bnVzZWQuXG4gICAgRmluaXNoUmVhc29uW1wiRklOSVNIX1JFQVNPTl9VTlNQRUNJRklFRFwiXSA9IFwiRklOSVNIX1JFQVNPTl9VTlNQRUNJRklFRFwiO1xuICAgIC8vIE5hdHVyYWwgc3RvcCBwb2ludCBvZiB0aGUgbW9kZWwgb3IgcHJvdmlkZWQgc3RvcCBzZXF1ZW5jZS5cbiAgICBGaW5pc2hSZWFzb25bXCJTVE9QXCJdID0gXCJTVE9QXCI7XG4gICAgLy8gVGhlIG1heGltdW0gbnVtYmVyIG9mIHRva2VucyBhcyBzcGVjaWZpZWQgaW4gdGhlIHJlcXVlc3Qgd2FzIHJlYWNoZWQuXG4gICAgRmluaXNoUmVhc29uW1wiTUFYX1RPS0VOU1wiXSA9IFwiTUFYX1RPS0VOU1wiO1xuICAgIC8vIFRoZSBjYW5kaWRhdGUgY29udGVudCB3YXMgZmxhZ2dlZCBmb3Igc2FmZXR5IHJlYXNvbnMuXG4gICAgRmluaXNoUmVhc29uW1wiU0FGRVRZXCJdID0gXCJTQUZFVFlcIjtcbiAgICAvLyBUaGUgY2FuZGlkYXRlIGNvbnRlbnQgd2FzIGZsYWdnZWQgZm9yIHJlY2l0YXRpb24gcmVhc29ucy5cbiAgICBGaW5pc2hSZWFzb25bXCJSRUNJVEFUSU9OXCJdID0gXCJSRUNJVEFUSU9OXCI7XG4gICAgLy8gVGhlIGNhbmRpZGF0ZSBjb250ZW50IHdhcyBmbGFnZ2VkIGZvciB1c2luZyBhbiB1bnN1cHBvcnRlZCBsYW5ndWFnZS5cbiAgICBGaW5pc2hSZWFzb25bXCJMQU5HVUFHRVwiXSA9IFwiTEFOR1VBR0VcIjtcbiAgICAvLyBVbmtub3duIHJlYXNvbi5cbiAgICBGaW5pc2hSZWFzb25bXCJPVEhFUlwiXSA9IFwiT1RIRVJcIjtcbn0pKEZpbmlzaFJlYXNvbiB8fCAoRmluaXNoUmVhc29uID0ge30pKTtcbi8qKlxuICogVGFzayB0eXBlIGZvciBlbWJlZGRpbmcgY29udGVudC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIFRhc2tUeXBlO1xuKGZ1bmN0aW9uIChUYXNrVHlwZSkge1xuICAgIFRhc2tUeXBlW1wiVEFTS19UWVBFX1VOU1BFQ0lGSUVEXCJdID0gXCJUQVNLX1RZUEVfVU5TUEVDSUZJRURcIjtcbiAgICBUYXNrVHlwZVtcIlJFVFJJRVZBTF9RVUVSWVwiXSA9IFwiUkVUUklFVkFMX1FVRVJZXCI7XG4gICAgVGFza1R5cGVbXCJSRVRSSUVWQUxfRE9DVU1FTlRcIl0gPSBcIlJFVFJJRVZBTF9ET0NVTUVOVFwiO1xuICAgIFRhc2tUeXBlW1wiU0VNQU5USUNfU0lNSUxBUklUWVwiXSA9IFwiU0VNQU5USUNfU0lNSUxBUklUWVwiO1xuICAgIFRhc2tUeXBlW1wiQ0xBU1NJRklDQVRJT05cIl0gPSBcIkNMQVNTSUZJQ0FUSU9OXCI7XG4gICAgVGFza1R5cGVbXCJDTFVTVEVSSU5HXCJdID0gXCJDTFVTVEVSSU5HXCI7XG59KShUYXNrVHlwZSB8fCAoVGFza1R5cGUgPSB7fSkpO1xuLyoqXG4gKiBAcHVibGljXG4gKi9cbnZhciBGdW5jdGlvbkNhbGxpbmdNb2RlO1xuKGZ1bmN0aW9uIChGdW5jdGlvbkNhbGxpbmdNb2RlKSB7XG4gICAgLy8gVW5zcGVjaWZpZWQgZnVuY3Rpb24gY2FsbGluZyBtb2RlLiBUaGlzIHZhbHVlIHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICBGdW5jdGlvbkNhbGxpbmdNb2RlW1wiTU9ERV9VTlNQRUNJRklFRFwiXSA9IFwiTU9ERV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIERlZmF1bHQgbW9kZWwgYmVoYXZpb3IsIG1vZGVsIGRlY2lkZXMgdG8gcHJlZGljdCBlaXRoZXIgYSBmdW5jdGlvbiBjYWxsXG4gICAgLy8gb3IgYSBuYXR1cmFsIGxhbmd1YWdlIHJlcHNwb3NlLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJBVVRPXCJdID0gXCJBVVRPXCI7XG4gICAgLy8gTW9kZWwgaXMgY29uc3RyYWluZWQgdG8gYWx3YXlzIHByZWRpY3RpbmcgYSBmdW5jdGlvbiBjYWxsIG9ubHkuXG4gICAgLy8gSWYgXCJhbGxvd2VkX2Z1bmN0aW9uX25hbWVzXCIgYXJlIHNldCwgdGhlIHByZWRpY3RlZCBmdW5jdGlvbiBjYWxsIHdpbGwgYmVcbiAgICAvLyBsaW1pdGVkIHRvIGFueSBvbmUgb2YgXCJhbGxvd2VkX2Z1bmN0aW9uX25hbWVzXCIsIGVsc2UgdGhlIHByZWRpY3RlZFxuICAgIC8vIGZ1bmN0aW9uIGNhbGwgd2lsbCBiZSBhbnkgb25lIG9mIHRoZSBwcm92aWRlZCBcImZ1bmN0aW9uX2RlY2xhcmF0aW9uc1wiLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJBTllcIl0gPSBcIkFOWVwiO1xuICAgIC8vIE1vZGVsIHdpbGwgbm90IHByZWRpY3QgYW55IGZ1bmN0aW9uIGNhbGwuIE1vZGVsIGJlaGF2aW9yIGlzIHNhbWUgYXMgd2hlblxuICAgIC8vIG5vdCBwYXNzaW5nIGFueSBmdW5jdGlvbiBkZWNsYXJhdGlvbnMuXG4gICAgRnVuY3Rpb25DYWxsaW5nTW9kZVtcIk5PTkVcIl0gPSBcIk5PTkVcIjtcbn0pKEZ1bmN0aW9uQ2FsbGluZ01vZGUgfHwgKEZ1bmN0aW9uQ2FsbGluZ01vZGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbW9kZSBvZiB0aGUgcHJlZGljdG9yIHRvIGJlIHVzZWQgaW4gZHluYW1pYyByZXRyaWV2YWwuXG4gKiBAcHVibGljXG4gKi9cbnZhciBEeW5hbWljUmV0cmlldmFsTW9kZTtcbihmdW5jdGlvbiAoRHluYW1pY1JldHJpZXZhbE1vZGUpIHtcbiAgICAvLyBVbnNwZWNpZmllZCBmdW5jdGlvbiBjYWxsaW5nIG1vZGUuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgIER5bmFtaWNSZXRyaWV2YWxNb2RlW1wiTU9ERV9VTlNQRUNJRklFRFwiXSA9IFwiTU9ERV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIFJ1biByZXRyaWV2YWwgb25seSB3aGVuIHN5c3RlbSBkZWNpZGVzIGl0IGlzIG5lY2Vzc2FyeS5cbiAgICBEeW5hbWljUmV0cmlldmFsTW9kZVtcIk1PREVfRFlOQU1JQ1wiXSA9IFwiTU9ERV9EWU5BTUlDXCI7XG59KShEeW5hbWljUmV0cmlldmFsTW9kZSB8fCAoRHluYW1pY1JldHJpZXZhbE1vZGUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBCYXNpYyBlcnJvciB0eXBlIGZvciB0aGlzIFNESy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihgW0dvb2dsZUdlbmVyYXRpdmVBSSBFcnJvcl06ICR7bWVzc2FnZX1gKTtcbiAgICB9XG59XG4vKipcbiAqIEVycm9ycyBpbiB0aGUgY29udGVudHMgb2YgYSByZXNwb25zZSBmcm9tIHRoZSBtb2RlbC4gVGhpcyBpbmNsdWRlcyBwYXJzaW5nXG4gKiBlcnJvcnMsIG9yIHJlc3BvbnNlcyBpbmNsdWRpbmcgYSBzYWZldHkgYmxvY2sgcmVhc29uLlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yIGV4dGVuZHMgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHJlc3BvbnNlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgfVxufVxuLyoqXG4gKiBFcnJvciBjbGFzcyBjb3ZlcmluZyBIVFRQIGVycm9ycyB3aGVuIGNhbGxpbmcgdGhlIHNlcnZlci4gSW5jbHVkZXMgSFRUUFxuICogc3RhdHVzLCBzdGF0dXNUZXh0LCBhbmQgb3B0aW9uYWwgZGV0YWlscywgaWYgcHJvdmlkZWQgaW4gdGhlIHNlcnZlciByZXNwb25zZS5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciBleHRlbmRzIEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIHN0YXR1c1RleHQsIGVycm9yRGV0YWlscykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQ7XG4gICAgICAgIHRoaXMuZXJyb3JEZXRhaWxzID0gZXJyb3JEZXRhaWxzO1xuICAgIH1cbn1cbi8qKlxuICogRXJyb3JzIGluIHRoZSBjb250ZW50cyBvZiBhIHJlcXVlc3Qgb3JpZ2luYXRpbmcgZnJvbSB1c2VyIGlucHV0LlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvciBleHRlbmRzIEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yIHtcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmNvbnN0IERFRkFVTFRfQkFTRV9VUkwgPSBcImh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tXCI7XG5jb25zdCBERUZBVUxUX0FQSV9WRVJTSU9OID0gXCJ2MWJldGFcIjtcbi8qKlxuICogV2UgY2FuJ3QgYHJlcXVpcmVgIHBhY2thZ2UuanNvbiBpZiB0aGlzIHJ1bnMgb24gd2ViLiBXZSB3aWxsIHVzZSByb2xsdXAgdG9cbiAqIHN3YXAgaW4gdGhlIHZlcnNpb24gbnVtYmVyIGhlcmUgYXQgYnVpbGQgdGltZS5cbiAqL1xuY29uc3QgUEFDS0FHRV9WRVJTSU9OID0gXCIwLjIxLjBcIjtcbmNvbnN0IFBBQ0tBR0VfTE9HX0hFQURFUiA9IFwiZ2VuYWktanNcIjtcbnZhciBUYXNrO1xuKGZ1bmN0aW9uIChUYXNrKSB7XG4gICAgVGFza1tcIkdFTkVSQVRFX0NPTlRFTlRcIl0gPSBcImdlbmVyYXRlQ29udGVudFwiO1xuICAgIFRhc2tbXCJTVFJFQU1fR0VORVJBVEVfQ09OVEVOVFwiXSA9IFwic3RyZWFtR2VuZXJhdGVDb250ZW50XCI7XG4gICAgVGFza1tcIkNPVU5UX1RPS0VOU1wiXSA9IFwiY291bnRUb2tlbnNcIjtcbiAgICBUYXNrW1wiRU1CRURfQ09OVEVOVFwiXSA9IFwiZW1iZWRDb250ZW50XCI7XG4gICAgVGFza1tcIkJBVENIX0VNQkVEX0NPTlRFTlRTXCJdID0gXCJiYXRjaEVtYmVkQ29udGVudHNcIjtcbn0pKFRhc2sgfHwgKFRhc2sgPSB7fSkpO1xuY2xhc3MgUmVxdWVzdFVybCB7XG4gICAgY29uc3RydWN0b3IobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgIHRoaXMudGFzayA9IHRhc2s7XG4gICAgICAgIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuICAgICAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgYXBpVmVyc2lvbiA9ICgoX2EgPSB0aGlzLnJlcXVlc3RPcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBpVmVyc2lvbikgfHwgREVGQVVMVF9BUElfVkVSU0lPTjtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9ICgoX2IgPSB0aGlzLnJlcXVlc3RPcHRpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYmFzZVVybCkgfHwgREVGQVVMVF9CQVNFX1VSTDtcbiAgICAgICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9LyR7YXBpVmVyc2lvbn0vJHt0aGlzLm1vZGVsfToke3RoaXMudGFza31gO1xuICAgICAgICBpZiAodGhpcy5zdHJlYW0pIHtcbiAgICAgICAgICAgIHVybCArPSBcIj9hbHQ9c3NlXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG59XG4vKipcbiAqIFNpbXBsZSwgYnV0IG1heSBiZWNvbWUgbW9yZSBjb21wbGV4IGlmIHdlIGFkZCBtb3JlIHZlcnNpb25zIHRvIGxvZy5cbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50SGVhZGVycyhyZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGNsaWVudEhlYWRlcnMgPSBbXTtcbiAgICBpZiAocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLmFwaUNsaWVudCkge1xuICAgICAgICBjbGllbnRIZWFkZXJzLnB1c2gocmVxdWVzdE9wdGlvbnMuYXBpQ2xpZW50KTtcbiAgICB9XG4gICAgY2xpZW50SGVhZGVycy5wdXNoKGAke1BBQ0tBR0VfTE9HX0hFQURFUn0vJHtQQUNLQUdFX1ZFUlNJT059YCk7XG4gICAgcmV0dXJuIGNsaWVudEhlYWRlcnMuam9pbihcIiBcIik7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRIZWFkZXJzKHVybCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJ4LWdvb2ctYXBpLWNsaWVudFwiLCBnZXRDbGllbnRIZWFkZXJzKHVybC5yZXF1ZXN0T3B0aW9ucykpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwieC1nb29nLWFwaS1rZXlcIiwgdXJsLmFwaUtleSk7XG4gICAgbGV0IGN1c3RvbUhlYWRlcnMgPSAoX2EgPSB1cmwucmVxdWVzdE9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jdXN0b21IZWFkZXJzO1xuICAgIGlmIChjdXN0b21IZWFkZXJzKSB7XG4gICAgICAgIGlmICghKGN1c3RvbUhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjdXN0b21IZWFkZXJzID0gbmV3IEhlYWRlcnMoY3VzdG9tSGVhZGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcihgdW5hYmxlIHRvIGNvbnZlcnQgY3VzdG9tSGVhZGVycyB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KGN1c3RvbUhlYWRlcnMpfSB0byBIZWFkZXJzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtoZWFkZXJOYW1lLCBoZWFkZXJWYWx1ZV0gb2YgY3VzdG9tSGVhZGVycy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJOYW1lID09PSBcIngtZ29vZy1hcGkta2V5XCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYENhbm5vdCBzZXQgcmVzZXJ2ZWQgaGVhZGVyIG5hbWUgJHtoZWFkZXJOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGVhZGVyTmFtZSA9PT0gXCJ4LWdvb2ctYXBpLWNsaWVudFwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKGBIZWFkZXIgbmFtZSAke2hlYWRlck5hbWV9IGNhbiBvbmx5IGJlIHNldCB1c2luZyB0aGUgYXBpQ2xpZW50IGZpZWxkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZChoZWFkZXJOYW1lLCBoZWFkZXJWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG59XG5hc3luYyBmdW5jdGlvbiBjb25zdHJ1Y3RNb2RlbFJlcXVlc3QobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCBib2R5LCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHVybCA9IG5ldyBSZXF1ZXN0VXJsKG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHVybDogdXJsLnRvU3RyaW5nKCksXG4gICAgICAgIGZldGNoT3B0aW9uczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBidWlsZEZldGNoT3B0aW9ucyhyZXF1ZXN0T3B0aW9ucykpLCB7IG1ldGhvZDogXCJQT1NUXCIsIGhlYWRlcnM6IGF3YWl0IGdldEhlYWRlcnModXJsKSwgYm9keSB9KSxcbiAgICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgdGFzaywgYXBpS2V5LCBzdHJlYW0sIGJvZHksIHJlcXVlc3RPcHRpb25zID0ge30sIFxuLy8gQWxsb3dzIHRoaXMgdG8gYmUgc3R1YmJlZCBmb3IgdGVzdHNcbmZldGNoRm4gPSBmZXRjaCkge1xuICAgIGNvbnN0IHsgdXJsLCBmZXRjaE9wdGlvbnMgfSA9IGF3YWl0IGNvbnN0cnVjdE1vZGVsUmVxdWVzdChtb2RlbCwgdGFzaywgYXBpS2V5LCBzdHJlYW0sIGJvZHksIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gbWFrZVJlcXVlc3QodXJsLCBmZXRjaE9wdGlvbnMsIGZldGNoRm4pO1xufVxuYXN5bmMgZnVuY3Rpb24gbWFrZVJlcXVlc3QodXJsLCBmZXRjaE9wdGlvbnMsIGZldGNoRm4gPSBmZXRjaCkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICB0cnkge1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoRm4odXJsLCBmZXRjaE9wdGlvbnMpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBoYW5kbGVSZXNwb25zZUVycm9yKGUsIHVybCk7XG4gICAgfVxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgYXdhaXQgaGFuZGxlUmVzcG9uc2VOb3RPayhyZXNwb25zZSwgdXJsKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2VFcnJvcihlLCB1cmwpIHtcbiAgICBsZXQgZXJyID0gZTtcbiAgICBpZiAoIShlIGluc3RhbmNlb2YgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciB8fFxuICAgICAgICBlIGluc3RhbmNlb2YgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IpKSB7XG4gICAgICAgIGVyciA9IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihgRXJyb3IgZmV0Y2hpbmcgZnJvbSAke3VybC50b1N0cmluZygpfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgIGVyci5zdGFjayA9IGUuc3RhY2s7XG4gICAgfVxuICAgIHRocm93IGVycjtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlTm90T2socmVzcG9uc2UsIHVybCkge1xuICAgIGxldCBtZXNzYWdlID0gXCJcIjtcbiAgICBsZXQgZXJyb3JEZXRhaWxzO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIG1lc3NhZ2UgPSBqc29uLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIGlmIChqc29uLmVycm9yLmRldGFpbHMpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCAke0pTT04uc3RyaW5naWZ5KGpzb24uZXJyb3IuZGV0YWlscyl9YDtcbiAgICAgICAgICAgIGVycm9yRGV0YWlscyA9IGpzb24uZXJyb3IuZGV0YWlscztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpZ25vcmVkXG4gICAgfVxuICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlGZXRjaEVycm9yKGBFcnJvciBmZXRjaGluZyBmcm9tICR7dXJsLnRvU3RyaW5nKCl9OiBbJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1dICR7bWVzc2FnZX1gLCByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHQsIGVycm9yRGV0YWlscyk7XG59XG4vKipcbiAqIEdlbmVyYXRlcyB0aGUgcmVxdWVzdCBvcHRpb25zIHRvIGJlIHBhc3NlZCB0byB0aGUgZmV0Y2ggQVBJLlxuICogQHBhcmFtIHJlcXVlc3RPcHRpb25zIC0gVGhlIHVzZXItZGVmaW5lZCByZXF1ZXN0IG9wdGlvbnMuXG4gKiBAcmV0dXJucyBUaGUgZ2VuZXJhdGVkIHJlcXVlc3Qgb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gYnVpbGRGZXRjaE9wdGlvbnMocmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7fTtcbiAgICBpZiAoKHJlcXVlc3RPcHRpb25zID09PSBudWxsIHx8IHJlcXVlc3RPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXF1ZXN0T3B0aW9ucy5zaWduYWwpICE9PSB1bmRlZmluZWQgfHwgKHJlcXVlc3RPcHRpb25zID09PSBudWxsIHx8IHJlcXVlc3RPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXF1ZXN0T3B0aW9ucy50aW1lb3V0KSA+PSAwKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIGlmICgocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpID49IDApIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCByZXF1ZXN0T3B0aW9ucy50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnNpZ25hbCkge1xuICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnMuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2hPcHRpb25zLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hPcHRpb25zO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBBZGRzIGNvbnZlbmllbmNlIGhlbHBlciBtZXRob2RzIHRvIGEgcmVzcG9uc2Ugb2JqZWN0LCBpbmNsdWRpbmcgc3RyZWFtXG4gKiBjaHVua3MgKGFzIGxvbmcgYXMgZWFjaCBjaHVuayBpcyBhIGNvbXBsZXRlIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIEpTT04pLlxuICovXG5mdW5jdGlvbiBhZGRIZWxwZXJzKHJlc3BvbnNlKSB7XG4gICAgcmVzcG9uc2UudGV4dCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgJiYgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGlzIHJlc3BvbnNlIGhhZCAke3Jlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGNhbmRpZGF0ZXMuIFJldHVybmluZyB0ZXh0IGZyb20gdGhlIGZpcnN0IGNhbmRpZGF0ZSBvbmx5LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEFjY2VzcyByZXNwb25zZS5jYW5kaWRhdGVzIGRpcmVjdGx5IHRvIHVzZSB0aGUgb3RoZXIgY2FuZGlkYXRlcy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYWRCYWRGaW5pc2hSZWFzb24ocmVzcG9uc2UuY2FuZGlkYXRlc1swXSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVzcG9uc2VFcnJvcihgJHtmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXNwb25zZSl9YCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdldFRleHQocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVzcG9uc2VFcnJvcihgVGV4dCBub3QgYXZhaWxhYmxlLiAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUT0RPOiByZW1vdmUgYXQgbmV4dCBtYWpvciB2ZXJzaW9uXG4gICAgICovXG4gICAgcmVzcG9uc2UuZnVuY3Rpb25DYWxsID0gKCkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcyAmJiByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoaXMgcmVzcG9uc2UgaGFkICR7cmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGh9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgY2FuZGlkYXRlcy4gUmV0dXJuaW5nIGZ1bmN0aW9uIGNhbGxzIGZyb20gdGhlIGZpcnN0IGNhbmRpZGF0ZSBvbmx5LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEFjY2VzcyByZXNwb25zZS5jYW5kaWRhdGVzIGRpcmVjdGx5IHRvIHVzZSB0aGUgb3RoZXIgY2FuZGlkYXRlcy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYWRCYWRGaW5pc2hSZWFzb24ocmVzcG9uc2UuY2FuZGlkYXRlc1swXSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVzcG9uc2VFcnJvcihgJHtmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXNwb25zZSl9YCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGByZXNwb25zZS5mdW5jdGlvbkNhbGwoKSBpcyBkZXByZWNhdGVkLiBgICtcbiAgICAgICAgICAgICAgICBgVXNlIHJlc3BvbnNlLmZ1bmN0aW9uQ2FsbHMoKSBpbnN0ZWFkLmApO1xuICAgICAgICAgICAgcmV0dXJuIGdldEZ1bmN0aW9uQ2FsbHMocmVzcG9uc2UpWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVzcG9uc2VFcnJvcihgRnVuY3Rpb24gY2FsbCBub3QgYXZhaWxhYmxlLiAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJlc3BvbnNlLmZ1bmN0aW9uQ2FsbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzICYmIHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhpcyByZXNwb25zZSBoYWQgJHtyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aH0gYCArXG4gICAgICAgICAgICAgICAgICAgIGBjYW5kaWRhdGVzLiBSZXR1cm5pbmcgZnVuY3Rpb24gY2FsbHMgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0RnVuY3Rpb25DYWxscyhyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBGdW5jdGlvbiBjYWxsIG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuLyoqXG4gKiBSZXR1cm5zIGFsbCB0ZXh0IGZvdW5kIGluIGFsbCBwYXJ0cyBvZiBmaXJzdCBjYW5kaWRhdGUuXG4gKi9cbmZ1bmN0aW9uIGdldFRleHQocmVzcG9uc2UpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgY29uc3QgdGV4dFN0cmluZ3MgPSBbXTtcbiAgICBpZiAoKF9iID0gKF9hID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wYXJ0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgKF9kID0gKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQudGV4dCkge1xuICAgICAgICAgICAgICAgIHRleHRTdHJpbmdzLnB1c2gocGFydC50ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJ0LmV4ZWN1dGFibGVDb2RlKSB7XG4gICAgICAgICAgICAgICAgdGV4dFN0cmluZ3MucHVzaChcIlxcbmBgYFwiICtcbiAgICAgICAgICAgICAgICAgICAgcGFydC5leGVjdXRhYmxlQ29kZS5sYW5ndWFnZSArXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuXCIgK1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LmV4ZWN1dGFibGVDb2RlLmNvZGUgK1xuICAgICAgICAgICAgICAgICAgICBcIlxcbmBgYFxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJ0LmNvZGVFeGVjdXRpb25SZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0ZXh0U3RyaW5ncy5wdXNoKFwiXFxuYGBgXFxuXCIgKyBwYXJ0LmNvZGVFeGVjdXRpb25SZXN1bHQub3V0cHV0ICsgXCJcXG5gYGBcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRleHRTdHJpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRleHRTdHJpbmdzLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgZnVuY3Rpb25DYWxsIG9mIGZpcnN0IGNhbmRpZGF0ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25DYWxscyhyZXNwb25zZSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICBjb25zdCBmdW5jdGlvbkNhbGxzID0gW107XG4gICAgaWYgKChfYiA9IChfYSA9IHJlc3BvbnNlLmNhbmRpZGF0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXS5jb250ZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucGFydHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIChfZCA9IChfYyA9IHJlc3BvbnNlLmNhbmRpZGF0ZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1swXS5jb250ZW50KSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucGFydHMpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmZ1bmN0aW9uQ2FsbCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uQ2FsbHMucHVzaChwYXJ0LmZ1bmN0aW9uQ2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZ1bmN0aW9uQ2FsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25DYWxscztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuY29uc3QgYmFkRmluaXNoUmVhc29ucyA9IFtcbiAgICBGaW5pc2hSZWFzb24uUkVDSVRBVElPTixcbiAgICBGaW5pc2hSZWFzb24uU0FGRVRZLFxuICAgIEZpbmlzaFJlYXNvbi5MQU5HVUFHRSxcbl07XG5mdW5jdGlvbiBoYWRCYWRGaW5pc2hSZWFzb24oY2FuZGlkYXRlKSB7XG4gICAgcmV0dXJuICghIWNhbmRpZGF0ZS5maW5pc2hSZWFzb24gJiZcbiAgICAgICAgYmFkRmluaXNoUmVhc29ucy5pbmNsdWRlcyhjYW5kaWRhdGUuZmluaXNoUmVhc29uKSk7XG59XG5mdW5jdGlvbiBmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXNwb25zZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGxldCBtZXNzYWdlID0gXCJcIjtcbiAgICBpZiAoKCFyZXNwb25zZS5jYW5kaWRhdGVzIHx8IHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID09PSAwKSAmJlxuICAgICAgICByZXNwb25zZS5wcm9tcHRGZWVkYmFjaykge1xuICAgICAgICBtZXNzYWdlICs9IFwiUmVzcG9uc2Ugd2FzIGJsb2NrZWRcIjtcbiAgICAgICAgaWYgKChfYSA9IHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYmxvY2tSZWFzb24pIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCBkdWUgdG8gJHtyZXNwb25zZS5wcm9tcHRGZWVkYmFjay5ibG9ja1JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoX2IgPSByZXNwb25zZS5wcm9tcHRGZWVkYmFjaykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJsb2NrUmVhc29uTWVzc2FnZSkge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgOiAke3Jlc3BvbnNlLnByb21wdEZlZWRiYWNrLmJsb2NrUmVhc29uTWVzc2FnZX1gO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKChfYyA9IHJlc3BvbnNlLmNhbmRpZGF0ZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1swXSkge1xuICAgICAgICBjb25zdCBmaXJzdENhbmRpZGF0ZSA9IHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF07XG4gICAgICAgIGlmIChoYWRCYWRGaW5pc2hSZWFzb24oZmlyc3RDYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IGBDYW5kaWRhdGUgd2FzIGJsb2NrZWQgZHVlIHRvICR7Zmlyc3RDYW5kaWRhdGUuZmluaXNoUmVhc29ufWA7XG4gICAgICAgICAgICBpZiAoZmlyc3RDYW5kaWRhdGUuZmluaXNoTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYDogJHtmaXJzdENhbmRpZGF0ZS5maW5pc2hNZXNzYWdlfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wgKi9cclxuXHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmNvbnN0IHJlc3BvbnNlTGluZVJFID0gL15kYXRhXFw6ICguKikoPzpcXG5cXG58XFxyXFxyfFxcclxcblxcclxcbikvO1xuLyoqXG4gKiBQcm9jZXNzIGEgcmVzcG9uc2UuYm9keSBzdHJlYW0gZnJvbSB0aGUgYmFja2VuZCBhbmQgcmV0dXJuIGFuXG4gKiBpdGVyYXRvciB0aGF0IHByb3ZpZGVzIG9uZSBjb21wbGV0ZSBHZW5lcmF0ZUNvbnRlbnRSZXNwb25zZSBhdCBhIHRpbWVcbiAqIGFuZCBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgc2luZ2xlIGFnZ3JlZ2F0ZWRcbiAqIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSByZXNwb25zZSAtIFJlc3BvbnNlIGZyb20gYSBmZXRjaCBjYWxsXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NTdHJlYW0ocmVzcG9uc2UpIHtcbiAgICBjb25zdCBpbnB1dFN0cmVhbSA9IHJlc3BvbnNlLmJvZHkucGlwZVRocm91Z2gobmV3IFRleHREZWNvZGVyU3RyZWFtKFwidXRmOFwiLCB7IGZhdGFsOiB0cnVlIH0pKTtcbiAgICBjb25zdCByZXNwb25zZVN0cmVhbSA9IGdldFJlc3BvbnNlU3RyZWFtKGlucHV0U3RyZWFtKTtcbiAgICBjb25zdCBbc3RyZWFtMSwgc3RyZWFtMl0gPSByZXNwb25zZVN0cmVhbS50ZWUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdHJlYW06IGdlbmVyYXRlUmVzcG9uc2VTZXF1ZW5jZShzdHJlYW0xKSxcbiAgICAgICAgcmVzcG9uc2U6IGdldFJlc3BvbnNlUHJvbWlzZShzdHJlYW0yKSxcbiAgICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0UmVzcG9uc2VQcm9taXNlKHN0cmVhbSkge1xuICAgIGNvbnN0IGFsbFJlc3BvbnNlcyA9IFtdO1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFkZEhlbHBlcnMoYWdncmVnYXRlUmVzcG9uc2VzKGFsbFJlc3BvbnNlcykpO1xuICAgICAgICB9XG4gICAgICAgIGFsbFJlc3BvbnNlcy5wdXNoKHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVJlc3BvbnNlU2VxdWVuY2Uoc3RyZWFtKSB7XG4gICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiogZ2VuZXJhdGVSZXNwb25zZVNlcXVlbmNlXzEoKSB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IHlpZWxkIF9fYXdhaXQocmVhZGVyLnJlYWQoKSk7XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWllbGQgeWllbGQgX19hd2FpdChhZGRIZWxwZXJzKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogUmVhZHMgYSByYXcgc3RyZWFtIGZyb20gdGhlIGZldGNoIHJlc3BvbnNlIGFuZCBqb2luIGluY29tcGxldGVcbiAqIGNodW5rcywgcmV0dXJuaW5nIGEgbmV3IHN0cmVhbSB0aGF0IHByb3ZpZGVzIGEgc2luZ2xlIGNvbXBsZXRlXG4gKiBHZW5lcmF0ZUNvbnRlbnRSZXNwb25zZSBpbiBlYWNoIGl0ZXJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0UmVzcG9uc2VTdHJlYW0oaW5wdXRTdHJlYW0pIHtcbiAgICBjb25zdCByZWFkZXIgPSBpbnB1dFN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgICAgICBzdGFydChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFRleHQgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHB1bXAoKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHB1bXAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkKCkudGhlbigoeyB2YWx1ZSwgZG9uZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRleHQudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lcnJvcihuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc3RyZWFtXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHQgKz0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IGN1cnJlbnRUZXh0Lm1hdGNoKHJlc3BvbnNlTGluZVJFKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkUmVzcG9uc2UgPSBKU09OLnBhcnNlKG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lcnJvcihuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYEVycm9yIHBhcnNpbmcgSlNPTiByZXNwb25zZTogXCIke21hdGNoWzFdfVwiYCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShwYXJzZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCA9IGN1cnJlbnRUZXh0LnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBjdXJyZW50VGV4dC5tYXRjaChyZXNwb25zZUxpbmVSRSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1bXAoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gc3RyZWFtO1xufVxuLyoqXG4gKiBBZ2dyZWdhdGVzIGFuIGFycmF5IG9mIGBHZW5lcmF0ZUNvbnRlbnRSZXNwb25zZWBzIGludG8gYSBzaW5nbGVcbiAqIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlLlxuICovXG5mdW5jdGlvbiBhZ2dyZWdhdGVSZXNwb25zZXMocmVzcG9uc2VzKSB7XG4gICAgY29uc3QgbGFzdFJlc3BvbnNlID0gcmVzcG9uc2VzW3Jlc3BvbnNlcy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBhZ2dyZWdhdGVkUmVzcG9uc2UgPSB7XG4gICAgICAgIHByb21wdEZlZWRiYWNrOiBsYXN0UmVzcG9uc2UgPT09IG51bGwgfHwgbGFzdFJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0UmVzcG9uc2UucHJvbXB0RmVlZGJhY2ssXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IHJlc3BvbnNlIG9mIHJlc3BvbnNlcykge1xuICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgcmVzcG9uc2UuY2FuZGlkYXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBjYW5kaWRhdGUuaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlcykge1xuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNhbmRpZGF0ZS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gS2VlcCBvdmVyd3JpdGluZywgdGhlIGxhc3Qgb25lIHdpbGwgYmUgZmluYWxcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5jaXRhdGlvbk1ldGFkYXRhID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmNpdGF0aW9uTWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbaV0uZ3JvdW5kaW5nTWV0YWRhdGEgPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuZ3JvdW5kaW5nTWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbaV0uZmluaXNoUmVhc29uID0gY2FuZGlkYXRlLmZpbmlzaFJlYXNvbjtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5maW5pc2hNZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLmZpbmlzaE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbaV0uc2FmZXR5UmF0aW5ncyA9XG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZS5zYWZldHlSYXRpbmdzO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENhbmRpZGF0ZXMgc2hvdWxkIGFsd2F5cyBoYXZlIGNvbnRlbnQgYW5kIHBhcnRzLCBidXQgdGhpcyBoYW5kbGVzXG4gICAgICAgICAgICAgICAgICogcG9zc2libGUgbWFsZm9ybWVkIHJlc3BvbnNlcy5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoY2FuZGlkYXRlLmNvbnRlbnQgJiYgY2FuZGlkYXRlLmNvbnRlbnQucGFydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5jb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IGNhbmRpZGF0ZS5jb250ZW50LnJvbGUgfHwgXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXJ0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBjYW5kaWRhdGUuY29udGVudC5wYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQudGV4dCA9IHBhcnQudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LmZ1bmN0aW9uQ2FsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuZnVuY3Rpb25DYWxsID0gcGFydC5mdW5jdGlvbkNhbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydC5leGVjdXRhYmxlQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuZXhlY3V0YWJsZUNvZGUgPSBwYXJ0LmV4ZWN1dGFibGVDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCA9IHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdQYXJ0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQYXJ0LnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbaV0uY29udGVudC5wYXJ0cy5wdXNoKG5ld1BhcnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS51c2FnZU1ldGFkYXRhKSB7XG4gICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UudXNhZ2VNZXRhZGF0YSA9IHJlc3BvbnNlLnVzYWdlTWV0YWRhdGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFnZ3JlZ2F0ZWRSZXNwb25zZTtcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlQ29udGVudFN0cmVhbShhcGlLZXksIG1vZGVsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlTW9kZWxSZXF1ZXN0KG1vZGVsLCBUYXNrLlNUUkVBTV9HRU5FUkFURV9DT05URU5ULCBhcGlLZXksIFxuICAgIC8qIHN0cmVhbSAqLyB0cnVlLCBKU09OLnN0cmluZ2lmeShwYXJhbXMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIHByb2Nlc3NTdHJlYW0ocmVzcG9uc2UpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50KGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suR0VORVJBVEVfQ09OVEVOVCwgYXBpS2V5LCBcbiAgICAvKiBzdHJlYW0gKi8gZmFsc2UsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICBjb25zdCByZXNwb25zZUpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgZW5oYW5jZWRSZXNwb25zZSA9IGFkZEhlbHBlcnMocmVzcG9uc2VKc29uKTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXNwb25zZTogZW5oYW5jZWRSZXNwb25zZSxcbiAgICB9O1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0U3lzdGVtSW5zdHJ1Y3Rpb24oaW5wdXQpIHtcbiAgICAvLyBudWxsIG9yIHVuZGVmaW5lZFxuICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4geyByb2xlOiBcInN5c3RlbVwiLCBwYXJ0czogW3sgdGV4dDogaW5wdXQgfV0gfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaW5wdXQudGV4dCkge1xuICAgICAgICByZXR1cm4geyByb2xlOiBcInN5c3RlbVwiLCBwYXJ0czogW2lucHV0XSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dC5wYXJ0cykge1xuICAgICAgICBpZiAoIWlucHV0LnJvbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBpbnB1dC5wYXJ0cyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZm9ybWF0TmV3Q29udGVudChyZXF1ZXN0KSB7XG4gICAgbGV0IG5ld1BhcnRzID0gW107XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG5ld1BhcnRzID0gW3sgdGV4dDogcmVxdWVzdCB9XTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgcGFydE9yU3RyaW5nIG9mIHJlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydE9yU3RyaW5nID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgbmV3UGFydHMucHVzaCh7IHRleHQ6IHBhcnRPclN0cmluZyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1BhcnRzLnB1c2gocGFydE9yU3RyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXNzaWduUm9sZVRvUGFydHNBbmRWYWxpZGF0ZVNlbmRNZXNzYWdlUmVxdWVzdChuZXdQYXJ0cyk7XG59XG4vKipcbiAqIFdoZW4gbXVsdGlwbGUgUGFydCB0eXBlcyAoaS5lLiBGdW5jdGlvblJlc3BvbnNlUGFydCBhbmQgVGV4dFBhcnQpIGFyZVxuICogcGFzc2VkIGluIGEgc2luZ2xlIFBhcnQgYXJyYXksIHdlIG1heSBuZWVkIHRvIGFzc2lnbiBkaWZmZXJlbnQgcm9sZXMgdG8gZWFjaFxuICogcGFydC4gQ3VycmVudGx5IG9ubHkgRnVuY3Rpb25SZXNwb25zZVBhcnQgcmVxdWlyZXMgYSByb2xlIG90aGVyIHRoYW4gJ3VzZXInLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBwYXJ0cyBBcnJheSBvZiBwYXJ0cyB0byBwYXNzIHRvIHRoZSBtb2RlbFxuICogQHJldHVybnMgQXJyYXkgb2YgY29udGVudCBpdGVtc1xuICovXG5mdW5jdGlvbiBhc3NpZ25Sb2xlVG9QYXJ0c0FuZFZhbGlkYXRlU2VuZE1lc3NhZ2VSZXF1ZXN0KHBhcnRzKSB7XG4gICAgY29uc3QgdXNlckNvbnRlbnQgPSB7IHJvbGU6IFwidXNlclwiLCBwYXJ0czogW10gfTtcbiAgICBjb25zdCBmdW5jdGlvbkNvbnRlbnQgPSB7IHJvbGU6IFwiZnVuY3Rpb25cIiwgcGFydHM6IFtdIH07XG4gICAgbGV0IGhhc1VzZXJDb250ZW50ID0gZmFsc2U7XG4gICAgbGV0IGhhc0Z1bmN0aW9uQ29udGVudCA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblJlc3BvbnNlXCIgaW4gcGFydCkge1xuICAgICAgICAgICAgZnVuY3Rpb25Db250ZW50LnBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgICAgICBoYXNGdW5jdGlvbkNvbnRlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdXNlckNvbnRlbnQucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICAgIGhhc1VzZXJDb250ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGFzVXNlckNvbnRlbnQgJiYgaGFzRnVuY3Rpb25Db250ZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihcIldpdGhpbiBhIHNpbmdsZSBtZXNzYWdlLCBGdW5jdGlvblJlc3BvbnNlIGNhbm5vdCBiZSBtaXhlZCB3aXRoIG90aGVyIHR5cGUgb2YgcGFydCBpbiB0aGUgcmVxdWVzdCBmb3Igc2VuZGluZyBjaGF0IG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgICBpZiAoIWhhc1VzZXJDb250ZW50ICYmICFoYXNGdW5jdGlvbkNvbnRlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiTm8gY29udGVudCBpcyBwcm92aWRlZCBmb3Igc2VuZGluZyBjaGF0IG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgICBpZiAoaGFzVXNlckNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJDb250ZW50O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb25Db250ZW50O1xufVxuZnVuY3Rpb24gZm9ybWF0Q291bnRUb2tlbnNJbnB1dChwYXJhbXMsIG1vZGVsUGFyYW1zKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICBtb2RlbDogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLm1vZGVsLFxuICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMuZ2VuZXJhdGlvbkNvbmZpZyxcbiAgICAgICAgc2FmZXR5U2V0dGluZ3M6IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5zYWZldHlTZXR0aW5ncyxcbiAgICAgICAgdG9vbHM6IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy50b29scyxcbiAgICAgICAgdG9vbENvbmZpZzogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnRvb2xDb25maWcsXG4gICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMuc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgIGNhY2hlZENvbnRlbnQ6IChfYSA9IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5jYWNoZWRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSxcbiAgICAgICAgY29udGVudHM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgY29udGFpbnNHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0gcGFyYW1zLmdlbmVyYXRlQ29udGVudFJlcXVlc3QgIT0gbnVsbDtcbiAgICBpZiAocGFyYW1zLmNvbnRlbnRzKSB7XG4gICAgICAgIGlmIChjb250YWluc0dlbmVyYXRlQ29udGVudFJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcihcIkNvdW50VG9rZW5zUmVxdWVzdCBtdXN0IGhhdmUgb25lIG9mIGNvbnRlbnRzIG9yIGdlbmVyYXRlQ29udGVudFJlcXVlc3QsIG5vdCBib3RoLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LmNvbnRlbnRzID0gcGFyYW1zLmNvbnRlbnRzO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb250YWluc0dlbmVyYXRlQ29udGVudFJlcXVlc3QpIHtcbiAgICAgICAgZm9ybWF0dGVkR2VuZXJhdGVDb250ZW50UmVxdWVzdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZm9ybWF0dGVkR2VuZXJhdGVDb250ZW50UmVxdWVzdCksIHBhcmFtcy5nZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEFycmF5IG9yIHN0cmluZ1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybWF0TmV3Q29udGVudChwYXJhbXMpO1xuICAgICAgICBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LmNvbnRlbnRzID0gW2NvbnRlbnRdO1xuICAgIH1cbiAgICByZXR1cm4geyBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0OiBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0IH07XG59XG5mdW5jdGlvbiBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChwYXJhbXMpIHtcbiAgICBsZXQgZm9ybWF0dGVkUmVxdWVzdDtcbiAgICBpZiAocGFyYW1zLmNvbnRlbnRzKSB7XG4gICAgICAgIGZvcm1hdHRlZFJlcXVlc3QgPSBwYXJhbXM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBBcnJheSBvciBzdHJpbmdcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZvcm1hdE5ld0NvbnRlbnQocGFyYW1zKTtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdCA9IHsgY29udGVudHM6IFtjb250ZW50XSB9O1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnN5c3RlbUluc3RydWN0aW9uKSB7XG4gICAgICAgIGZvcm1hdHRlZFJlcXVlc3Quc3lzdGVtSW5zdHJ1Y3Rpb24gPSBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihwYXJhbXMuc3lzdGVtSW5zdHJ1Y3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVkUmVxdWVzdDtcbn1cbmZ1bmN0aW9uIGZvcm1hdEVtYmVkQ29udGVudElucHV0KHBhcmFtcykge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkocGFyYW1zKSkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybWF0TmV3Q29udGVudChwYXJhbXMpO1xuICAgICAgICByZXR1cm4geyBjb250ZW50IH07XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vLyBodHRwczovL2FpLmdvb2dsZS5kZXYvYXBpL3Jlc3QvdjFiZXRhL0NvbnRlbnQjcGFydFxuY29uc3QgVkFMSURfUEFSVF9GSUVMRFMgPSBbXG4gICAgXCJ0ZXh0XCIsXG4gICAgXCJpbmxpbmVEYXRhXCIsXG4gICAgXCJmdW5jdGlvbkNhbGxcIixcbiAgICBcImZ1bmN0aW9uUmVzcG9uc2VcIixcbiAgICBcImV4ZWN1dGFibGVDb2RlXCIsXG4gICAgXCJjb2RlRXhlY3V0aW9uUmVzdWx0XCIsXG5dO1xuY29uc3QgVkFMSURfUEFSVFNfUEVSX1JPTEUgPSB7XG4gICAgdXNlcjogW1widGV4dFwiLCBcImlubGluZURhdGFcIl0sXG4gICAgZnVuY3Rpb246IFtcImZ1bmN0aW9uUmVzcG9uc2VcIl0sXG4gICAgbW9kZWw6IFtcInRleHRcIiwgXCJmdW5jdGlvbkNhbGxcIiwgXCJleGVjdXRhYmxlQ29kZVwiLCBcImNvZGVFeGVjdXRpb25SZXN1bHRcIl0sXG4gICAgLy8gU3lzdGVtIGluc3RydWN0aW9ucyBzaG91bGRuJ3QgYmUgaW4gaGlzdG9yeSBhbnl3YXkuXG4gICAgc3lzdGVtOiBbXCJ0ZXh0XCJdLFxufTtcbmZ1bmN0aW9uIHZhbGlkYXRlQ2hhdEhpc3RvcnkoaGlzdG9yeSkge1xuICAgIGxldCBwcmV2Q29udGVudCA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgY3VyckNvbnRlbnQgb2YgaGlzdG9yeSkge1xuICAgICAgICBjb25zdCB7IHJvbGUsIHBhcnRzIH0gPSBjdXJyQ29udGVudDtcbiAgICAgICAgaWYgKCFwcmV2Q29udGVudCAmJiByb2xlICE9PSBcInVzZXJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBGaXJzdCBjb250ZW50IHNob3VsZCBiZSB3aXRoIHJvbGUgJ3VzZXInLCBnb3QgJHtyb2xlfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghUE9TU0lCTEVfUk9MRVMuaW5jbHVkZXMocm9sZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihgRWFjaCBpdGVtIHNob3VsZCBpbmNsdWRlIHJvbGUgZmllbGQuIEdvdCAke3JvbGV9IGJ1dCB2YWxpZCByb2xlcyBhcmU6ICR7SlNPTi5zdHJpbmdpZnkoUE9TU0lCTEVfUk9MRVMpfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJ0cykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihcIkNvbnRlbnQgc2hvdWxkIGhhdmUgJ3BhcnRzJyBwcm9wZXJ0eSB3aXRoIGFuIGFycmF5IG9mIFBhcnRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihcIkVhY2ggQ29udGVudCBzaG91bGQgaGF2ZSBhdCBsZWFzdCBvbmUgcGFydFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3VudEZpZWxkcyA9IHtcbiAgICAgICAgICAgIHRleHQ6IDAsXG4gICAgICAgICAgICBpbmxpbmVEYXRhOiAwLFxuICAgICAgICAgICAgZnVuY3Rpb25DYWxsOiAwLFxuICAgICAgICAgICAgZnVuY3Rpb25SZXNwb25zZTogMCxcbiAgICAgICAgICAgIGZpbGVEYXRhOiAwLFxuICAgICAgICAgICAgZXhlY3V0YWJsZUNvZGU6IDAsXG4gICAgICAgICAgICBjb2RlRXhlY3V0aW9uUmVzdWx0OiAwLFxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFZBTElEX1BBUlRfRklFTERTKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBwYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50RmllbGRzW2tleV0gKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWRQYXJ0cyA9IFZBTElEX1BBUlRTX1BFUl9ST0xFW3JvbGVdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBWQUxJRF9QQVJUX0ZJRUxEUykge1xuICAgICAgICAgICAgaWYgKCF2YWxpZFBhcnRzLmluY2x1ZGVzKGtleSkgJiYgY291bnRGaWVsZHNba2V5XSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYENvbnRlbnQgd2l0aCByb2xlICcke3JvbGV9JyBjYW4ndCBjb250YWluICcke2tleX0nIHBhcnRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcmV2Q29udGVudCA9IHRydWU7XG4gICAgfVxufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBEbyBub3QgbG9nIGEgbWVzc2FnZSBmb3IgdGhpcyBlcnJvci5cbiAqL1xuY29uc3QgU0lMRU5UX0VSUk9SID0gXCJTSUxFTlRfRVJST1JcIjtcbi8qKlxuICogQ2hhdFNlc3Npb24gY2xhc3MgdGhhdCBlbmFibGVzIHNlbmRpbmcgY2hhdCBtZXNzYWdlcyBhbmQgc3RvcmVzXG4gKiBoaXN0b3J5IG9mIHNlbnQgYW5kIHJlY2VpdmVkIG1lc3NhZ2VzIHNvIGZhci5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIENoYXRTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXksIG1vZGVsLCBwYXJhbXMsIF9yZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RPcHRpb25zID0gX3JlcXVlc3RPcHRpb25zO1xuICAgICAgICB0aGlzLl9oaXN0b3J5ID0gW107XG4gICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX2FwaUtleSA9IGFwaUtleTtcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUNoYXRIaXN0b3J5KHBhcmFtcy5oaXN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkgPSBwYXJhbXMuaGlzdG9yeTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjaGF0IGhpc3Rvcnkgc28gZmFyLiBCbG9ja2VkIHByb21wdHMgYXJlIG5vdCBhZGRlZCB0byBoaXN0b3J5LlxuICAgICAqIEJsb2NrZWQgY2FuZGlkYXRlcyBhcmUgbm90IGFkZGVkIHRvIGhpc3RvcnksIG5vciBhcmUgdGhlIHByb21wdHMgdGhhdFxuICAgICAqIGdlbmVyYXRlZCB0aGVtLlxuICAgICAqL1xuICAgIGFzeW5jIGdldEhpc3RvcnkoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3NlbmRQcm9taXNlO1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBjaGF0IG1lc3NhZ2UgYW5kIHJlY2VpdmVzIGEgbm9uLXN0cmVhbWluZ1xuICAgICAqIHtAbGluayBHZW5lcmF0ZUNvbnRlbnRSZXN1bHR9LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgc2VuZE1lc3NhZ2UocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiAoX2IgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICB0b29sczogKF9jID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IChfZCA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiAoX2UgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogKF9mID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWNoZWRDb250ZW50LFxuICAgICAgICAgICAgY29udGVudHM6IFsuLi50aGlzLl9oaXN0b3J5LCBuZXdDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hhdFNlc3Npb25SZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIGxldCBmaW5hbFJlc3VsdDtcbiAgICAgICAgLy8gQWRkIG9udG8gdGhlIGNoYWluLlxuICAgICAgICB0aGlzLl9zZW5kUHJvbWlzZSA9IHRoaXMuX3NlbmRQcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiBnZW5lcmF0ZUNvbnRlbnQodGhpcy5fYXBpS2V5LCB0aGlzLm1vZGVsLCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zKSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQucmVzcG9uc2UuY2FuZGlkYXRlcyAmJlxuICAgICAgICAgICAgICAgIHJlc3VsdC5yZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2gobmV3Q29udGVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50ID0gT2JqZWN0LmFzc2lnbih7IHBhcnRzOiBbXSwgXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc3BvbnNlIHNlZW1zIHRvIGNvbWUgYmFjayB3aXRob3V0IGEgcm9sZSBzZXQuXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IFwibW9kZWxcIiB9LCAoX2EgPSByZXN1bHQucmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChyZXNwb25zZUNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tFcnJvck1lc3NhZ2UgPSBmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXN1bHQucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja0Vycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHNlbmRNZXNzYWdlKCkgd2FzIHVuc3VjY2Vzc2Z1bC4gJHtibG9ja0Vycm9yTWVzc2FnZX0uIEluc3BlY3QgcmVzcG9uc2Ugb2JqZWN0IGZvciBkZXRhaWxzLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIHJldHVybiBmaW5hbFJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBjaGF0IG1lc3NhZ2UgYW5kIHJlY2VpdmVzIHRoZSByZXNwb25zZSBhcyBhXG4gICAgICoge0BsaW5rIEdlbmVyYXRlQ29udGVudFN0cmVhbVJlc3VsdH0gY29udGFpbmluZyBhbiBpdGVyYWJsZSBzdHJlYW1cbiAgICAgKiBhbmQgYSByZXNwb25zZSBwcm9taXNlLlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgc2VuZE1lc3NhZ2VTdHJlYW0ocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiAoX2IgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICB0b29sczogKF9jID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IChfZCA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiAoX2UgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogKF9mID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jYWNoZWRDb250ZW50LFxuICAgICAgICAgICAgY29udGVudHM6IFsuLi50aGlzLl9oaXN0b3J5LCBuZXdDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hhdFNlc3Npb25SZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHN0cmVhbVByb21pc2UgPSBnZW5lcmF0ZUNvbnRlbnRTdHJlYW0odGhpcy5fYXBpS2V5LCB0aGlzLm1vZGVsLCBnZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0LCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgLy8gQWRkIG9udG8gdGhlIGNoYWluLlxuICAgICAgICB0aGlzLl9zZW5kUHJvbWlzZSA9IHRoaXMuX3NlbmRQcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdHJlYW1Qcm9taXNlKVxuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IGJlIGhhbmRsZWQgdG8gYXZvaWQgdW5oYW5kbGVkIHJlamVjdGlvbiwgYnV0IGp1bXBcbiAgICAgICAgICAgIC8vIHRvIHRoZSBmaW5hbCBjYXRjaCBibG9jayB3aXRoIGEgbGFiZWwgdG8gbm90IGxvZyB0aGlzIGVycm9yLlxuICAgICAgICAgICAgLmNhdGNoKChfaWdub3JlZCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFNJTEVOVF9FUlJPUik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc3RyZWFtUmVzdWx0KSA9PiBzdHJlYW1SZXN1bHQucmVzcG9uc2UpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzICYmIHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChuZXdDb250ZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnQgPSBPYmplY3QuYXNzaWduKHt9LCByZXNwb25zZS5jYW5kaWRhdGVzWzBdLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIC8vIFJlc3BvbnNlIHNlZW1zIHRvIGNvbWUgYmFjayB3aXRob3V0IGEgcm9sZSBzZXQuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZUNvbnRlbnQucm9sZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZUNvbnRlbnQucm9sZSA9IFwibW9kZWxcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKHJlc3BvbnNlQ29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0Vycm9yTWVzc2FnZSA9IGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBzZW5kTWVzc2FnZVN0cmVhbSgpIHdhcyB1bnN1Y2Nlc3NmdWwuICR7YmxvY2tFcnJvck1lc3NhZ2V9LiBJbnNwZWN0IHJlc3BvbnNlIG9iamVjdCBmb3IgZGV0YWlscy5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIC8vIEVycm9ycyBpbiBzdHJlYW1Qcm9taXNlIGFyZSBhbHJlYWR5IGNhdGNoYWJsZSBieSB0aGUgdXNlciBhc1xuICAgICAgICAgICAgLy8gc3RyZWFtUHJvbWlzZSBpcyByZXR1cm5lZC5cbiAgICAgICAgICAgIC8vIEF2b2lkIGR1cGxpY2F0aW5nIHRoZSBlcnJvciBtZXNzYWdlIGluIGxvZ3MuXG4gICAgICAgICAgICBpZiAoZS5tZXNzYWdlICE9PSBTSUxFTlRfRVJST1IpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2VycyBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gX3NlbmRQcm9taXNlIHRvIGNhdGNoIGVycm9yc1xuICAgICAgICAgICAgICAgIC8vIGRvd25zdHJlYW0gZnJvbSBzdHJlYW1Qcm9taXNlLCBzbyB0aGV5IHNob3VsZCBub3QgdGhyb3cuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW1Qcm9taXNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvdW50VG9rZW5zKGFwaUtleSwgbW9kZWwsIHBhcmFtcywgc2luZ2xlUmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suQ09VTlRfVE9LRU5TLCBhcGlLZXksIGZhbHNlLCBKU09OLnN0cmluZ2lmeShwYXJhbXMpLCBzaW5nbGVSZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGVtYmVkQ29udGVudChhcGlLZXksIG1vZGVsLCBwYXJhbXMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlTW9kZWxSZXF1ZXN0KG1vZGVsLCBUYXNrLkVNQkVEX0NPTlRFTlQsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuYXN5bmMgZnVuY3Rpb24gYmF0Y2hFbWJlZENvbnRlbnRzKGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXF1ZXN0c1dpdGhNb2RlbCA9IHBhcmFtcy5yZXF1ZXN0cy5tYXAoKHJlcXVlc3QpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmVxdWVzdCksIHsgbW9kZWwgfSk7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlTW9kZWxSZXF1ZXN0KG1vZGVsLCBUYXNrLkJBVENIX0VNQkVEX0NPTlRFTlRTLCBhcGlLZXksIGZhbHNlLCBKU09OLnN0cmluZ2lmeSh7IHJlcXVlc3RzOiByZXF1ZXN0c1dpdGhNb2RlbCB9KSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIENsYXNzIGZvciBnZW5lcmF0aXZlIG1vZGVsIEFQSXMuXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEdlbmVyYXRpdmVNb2RlbCB7XG4gICAgY29uc3RydWN0b3IoYXBpS2V5LCBtb2RlbFBhcmFtcywgX3JlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RPcHRpb25zID0gX3JlcXVlc3RPcHRpb25zO1xuICAgICAgICBpZiAobW9kZWxQYXJhbXMubW9kZWwuaW5jbHVkZXMoXCIvXCIpKSB7XG4gICAgICAgICAgICAvLyBNb2RlbHMgbWF5IGJlIG5hbWVkIFwibW9kZWxzL21vZGVsLW5hbWVcIiBvciBcInR1bmVkTW9kZWxzL21vZGVsLW5hbWVcIlxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsUGFyYW1zLm1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgcGF0aCBpcyBub3QgaW5jbHVkZWQsIGFzc3VtZSBpdCdzIGEgbm9uLXR1bmVkIG1vZGVsLlxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IGBtb2RlbHMvJHttb2RlbFBhcmFtcy5tb2RlbH1gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGlvbkNvbmZpZyA9IG1vZGVsUGFyYW1zLmdlbmVyYXRpb25Db25maWcgfHwge307XG4gICAgICAgIHRoaXMuc2FmZXR5U2V0dGluZ3MgPSBtb2RlbFBhcmFtcy5zYWZldHlTZXR0aW5ncyB8fCBbXTtcbiAgICAgICAgdGhpcy50b29scyA9IG1vZGVsUGFyYW1zLnRvb2xzO1xuICAgICAgICB0aGlzLnRvb2xDb25maWcgPSBtb2RlbFBhcmFtcy50b29sQ29uZmlnO1xuICAgICAgICB0aGlzLnN5c3RlbUluc3RydWN0aW9uID0gZm9ybWF0U3lzdGVtSW5zdHJ1Y3Rpb24obW9kZWxQYXJhbXMuc3lzdGVtSW5zdHJ1Y3Rpb24pO1xuICAgICAgICB0aGlzLmNhY2hlZENvbnRlbnQgPSBtb2RlbFBhcmFtcy5jYWNoZWRDb250ZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHNpbmdsZSBub24tc3RyZWFtaW5nIGNhbGwgdG8gdGhlIG1vZGVsXG4gICAgICogYW5kIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBzaW5nbGUge0BsaW5rIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlfS5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGdlbmVyYXRlQ29udGVudChyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkUGFyYW1zID0gZm9ybWF0R2VuZXJhdGVDb250ZW50SW5wdXQocmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0T3B0aW9ucyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlQ29udGVudCh0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgT2JqZWN0LmFzc2lnbih7IGdlbmVyYXRpb25Db25maWc6IHRoaXMuZ2VuZXJhdGlvbkNvbmZpZywgc2FmZXR5U2V0dGluZ3M6IHRoaXMuc2FmZXR5U2V0dGluZ3MsIHRvb2xzOiB0aGlzLnRvb2xzLCB0b29sQ29uZmlnOiB0aGlzLnRvb2xDb25maWcsIHN5c3RlbUluc3RydWN0aW9uOiB0aGlzLnN5c3RlbUluc3RydWN0aW9uLCBjYWNoZWRDb250ZW50OiAoX2EgPSB0aGlzLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lIH0sIGZvcm1hdHRlZFBhcmFtcyksIGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBzaW5nbGUgc3RyZWFtaW5nIGNhbGwgdG8gdGhlIG1vZGVsIGFuZCByZXR1cm5zIGFuIG9iamVjdFxuICAgICAqIGNvbnRhaW5pbmcgYW4gaXRlcmFibGUgc3RyZWFtIHRoYXQgaXRlcmF0ZXMgb3ZlciBhbGwgY2h1bmtzIGluIHRoZVxuICAgICAqIHN0cmVhbWluZyByZXNwb25zZSBhcyB3ZWxsIGFzIGEgcHJvbWlzZSB0aGF0IHJldHVybnMgdGhlIGZpbmFsXG4gICAgICogYWdncmVnYXRlZCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGdlbmVyYXRlQ29udGVudFN0cmVhbShyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkUGFyYW1zID0gZm9ybWF0R2VuZXJhdGVDb250ZW50SW5wdXQocmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0T3B0aW9ucyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlQ29udGVudFN0cmVhbSh0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgT2JqZWN0LmFzc2lnbih7IGdlbmVyYXRpb25Db25maWc6IHRoaXMuZ2VuZXJhdGlvbkNvbmZpZywgc2FmZXR5U2V0dGluZ3M6IHRoaXMuc2FmZXR5U2V0dGluZ3MsIHRvb2xzOiB0aGlzLnRvb2xzLCB0b29sQ29uZmlnOiB0aGlzLnRvb2xDb25maWcsIHN5c3RlbUluc3RydWN0aW9uOiB0aGlzLnN5c3RlbUluc3RydWN0aW9uLCBjYWNoZWRDb250ZW50OiAoX2EgPSB0aGlzLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lIH0sIGZvcm1hdHRlZFBhcmFtcyksIGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhIG5ldyB7QGxpbmsgQ2hhdFNlc3Npb259IGluc3RhbmNlIHdoaWNoIGNhbiBiZSB1c2VkIGZvclxuICAgICAqIG11bHRpLXR1cm4gY2hhdHMuXG4gICAgICovXG4gICAgc3RhcnRDaGF0KHN0YXJ0Q2hhdFBhcmFtcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBuZXcgQ2hhdFNlc3Npb24odGhpcy5hcGlLZXksIHRoaXMubW9kZWwsIE9iamVjdC5hc3NpZ24oeyBnZW5lcmF0aW9uQ29uZmlnOiB0aGlzLmdlbmVyYXRpb25Db25maWcsIHNhZmV0eVNldHRpbmdzOiB0aGlzLnNhZmV0eVNldHRpbmdzLCB0b29sczogdGhpcy50b29scywgdG9vbENvbmZpZzogdGhpcy50b29sQ29uZmlnLCBzeXN0ZW1JbnN0cnVjdGlvbjogdGhpcy5zeXN0ZW1JbnN0cnVjdGlvbiwgY2FjaGVkQ29udGVudDogKF9hID0gdGhpcy5jYWNoZWRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSB9LCBzdGFydENoYXRQYXJhbXMpLCB0aGlzLl9yZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvdW50cyB0aGUgdG9rZW5zIGluIHRoZSBwcm92aWRlZCByZXF1ZXN0LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgY291bnRUb2tlbnMocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRDb3VudFRva2Vuc0lucHV0KHJlcXVlc3QsIHtcbiAgICAgICAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLFxuICAgICAgICAgICAgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLFxuICAgICAgICAgICAgc2FmZXR5U2V0dGluZ3M6IHRoaXMuc2FmZXR5U2V0dGluZ3MsXG4gICAgICAgICAgICB0b29sczogdGhpcy50b29scyxcbiAgICAgICAgICAgIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZyxcbiAgICAgICAgICAgIHN5c3RlbUluc3RydWN0aW9uOiB0aGlzLnN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgY2FjaGVkQ29udGVudDogdGhpcy5jYWNoZWRDb250ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gY291bnRUb2tlbnModGhpcy5hcGlLZXksIHRoaXMubW9kZWwsIGZvcm1hdHRlZFBhcmFtcywgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWJlZHMgdGhlIHByb3ZpZGVkIGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBlbWJlZENvbnRlbnQocmVxdWVzdCwgcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRFbWJlZENvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZW1iZWRDb250ZW50KHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBmb3JtYXR0ZWRQYXJhbXMsIGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1iZWRzIGFuIGFycmF5IG9mIHtAbGluayBFbWJlZENvbnRlbnRSZXF1ZXN0fXMuXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBiYXRjaEVtYmVkQ29udGVudHMoYmF0Y2hFbWJlZENvbnRlbnRSZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0T3B0aW9ucyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGJhdGNoRW1iZWRDb250ZW50cyh0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgYmF0Y2hFbWJlZENvbnRlbnRSZXF1ZXN0LCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUb3AtbGV2ZWwgY2xhc3MgZm9yIHRoaXMgU0RLXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEdvb2dsZUdlbmVyYXRpdmVBSSB7XG4gICAgY29uc3RydWN0b3IoYXBpS2V5KSB7XG4gICAgICAgIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEge0BsaW5rIEdlbmVyYXRpdmVNb2RlbH0gaW5zdGFuY2UgZm9yIHRoZSBwcm92aWRlZCBtb2RlbCBuYW1lLlxuICAgICAqL1xuICAgIGdldEdlbmVyYXRpdmVNb2RlbChtb2RlbFBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFtb2RlbFBhcmFtcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBNdXN0IHByb3ZpZGUgYSBtb2RlbCBuYW1lLiBgICtcbiAgICAgICAgICAgICAgICBgRXhhbXBsZTogZ2VuYWkuZ2V0R2VuZXJhdGl2ZU1vZGVsKHsgbW9kZWw6ICdteS1tb2RlbC1uYW1lJyB9KWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGl2ZU1vZGVsKHRoaXMuYXBpS2V5LCBtb2RlbFBhcmFtcywgcmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIEdlbmVyYXRpdmVNb2RlbH0gaW5zdGFuY2UgZnJvbSBwcm92aWRlZCBjb250ZW50IGNhY2hlLlxuICAgICAqL1xuICAgIGdldEdlbmVyYXRpdmVNb2RlbEZyb21DYWNoZWRDb250ZW50KGNhY2hlZENvbnRlbnQsIG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICBpZiAoIWNhY2hlZENvbnRlbnQubmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ2FjaGVkIGNvbnRlbnQgbXVzdCBjb250YWluIGEgYG5hbWVgIGZpZWxkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhY2hlZENvbnRlbnQubW9kZWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcihcIkNhY2hlZCBjb250ZW50IG11c3QgY29udGFpbiBhIGBtb2RlbGAgZmllbGQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOb3QgY2hlY2tpbmcgdG9vbHMgYW5kIHRvb2xDb25maWcgZm9yIG5vdyBhcyBpdCB3b3VsZCByZXF1aXJlIGEgZGVlcFxuICAgICAgICAgKiBlcXVhbGl0eSBjb21wYXJpc29uIGFuZCBpc24ndCBsaWtlbHkgdG8gYmUgYSBjb21tb24gY2FzZS5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGRpc2FsbG93ZWREdXBsaWNhdGVzID0gW1wibW9kZWxcIiwgXCJzeXN0ZW1JbnN0cnVjdGlvblwiXTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZGlzYWxsb3dlZER1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgIGlmICgobW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zW2tleV0pICYmXG4gICAgICAgICAgICAgICAgY2FjaGVkQ29udGVudFtrZXldICYmXG4gICAgICAgICAgICAgICAgKG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtc1trZXldKSAhPT0gY2FjaGVkQ29udGVudFtrZXldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJtb2RlbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsUGFyYW1zQ29tcCA9IG1vZGVsUGFyYW1zLm1vZGVsLnN0YXJ0c1dpdGgoXCJtb2RlbHMvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1vZGVsUGFyYW1zLm1vZGVsLnJlcGxhY2UoXCJtb2RlbHMvXCIsIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG1vZGVsUGFyYW1zLm1vZGVsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWRDb250ZW50Q29tcCA9IGNhY2hlZENvbnRlbnQubW9kZWwuc3RhcnRzV2l0aChcIm1vZGVscy9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gY2FjaGVkQ29udGVudC5tb2RlbC5yZXBsYWNlKFwibW9kZWxzL1wiLCBcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBjYWNoZWRDb250ZW50Lm1vZGVsO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZWxQYXJhbXNDb21wID09PSBjYWNoZWRDb250ZW50Q29tcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKGBEaWZmZXJlbnQgdmFsdWUgZm9yIFwiJHtrZXl9XCIgc3BlY2lmaWVkIGluIG1vZGVsUGFyYW1zYCArXG4gICAgICAgICAgICAgICAgICAgIGAgKCR7bW9kZWxQYXJhbXNba2V5XX0pIGFuZCBjYWNoZWRDb250ZW50ICgke2NhY2hlZENvbnRlbnRba2V5XX0pYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9kZWxQYXJhbXNGcm9tQ2FjaGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsUGFyYW1zKSwgeyBtb2RlbDogY2FjaGVkQ29udGVudC5tb2RlbCwgdG9vbHM6IGNhY2hlZENvbnRlbnQudG9vbHMsIHRvb2xDb25maWc6IGNhY2hlZENvbnRlbnQudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IGNhY2hlZENvbnRlbnQuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQgfSk7XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGl2ZU1vZGVsKHRoaXMuYXBpS2V5LCBtb2RlbFBhcmFtc0Zyb21DYWNoZSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQmxvY2tSZWFzb24sIENoYXRTZXNzaW9uLCBEeW5hbWljUmV0cmlldmFsTW9kZSwgRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSwgRmluaXNoUmVhc29uLCBGdW5jdGlvbkNhbGxpbmdNb2RlLCBHZW5lcmF0aXZlTW9kZWwsIEdvb2dsZUdlbmVyYXRpdmVBSSwgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IsIEdvb2dsZUdlbmVyYXRpdmVBSUZldGNoRXJyb3IsIEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yLCBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yLCBIYXJtQmxvY2tUaHJlc2hvbGQsIEhhcm1DYXRlZ29yeSwgSGFybVByb2JhYmlsaXR5LCBPdXRjb21lLCBQT1NTSUJMRV9ST0xFUywgU2NoZW1hVHlwZSwgVGFza1R5cGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFBNEM7QUFDNUMsZ0JBQWU7QUFDZixrQkFBaUI7OztBQ0dqQixJQUFJO0FBQUEsQ0FDSCxTQUFVQSxhQUFZO0FBRW5CLEVBQUFBLFlBQVcsUUFBUSxJQUFJO0FBRXZCLEVBQUFBLFlBQVcsUUFBUSxJQUFJO0FBRXZCLEVBQUFBLFlBQVcsU0FBUyxJQUFJO0FBRXhCLEVBQUFBLFlBQVcsU0FBUyxJQUFJO0FBRXhCLEVBQUFBLFlBQVcsT0FBTyxJQUFJO0FBRXRCLEVBQUFBLFlBQVcsUUFBUSxJQUFJO0FBQzNCLEdBQUcsZUFBZSxhQUFhLENBQUMsRUFBRTtBQXFCbEMsSUFBSTtBQUFBLENBQ0gsU0FBVUMseUJBQXdCO0FBQy9CLEVBQUFBLHdCQUF1QixzQkFBc0IsSUFBSTtBQUNqRCxFQUFBQSx3QkFBdUIsUUFBUSxJQUFJO0FBQ3ZDLEdBQUcsMkJBQTJCLHlCQUF5QixDQUFDLEVBQUU7QUFLMUQsSUFBSTtBQUFBLENB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T0FBTyxVQUFVLFdBQVcsR0FBRztBQUNwRCxhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUk7QUFDRixZQUFNLFdBQVcsT0FBTyxVQUFVLENBQUM7QUFDbkMsWUFBTSxPQUFPLFVBQUFDLFFBQUcsYUFBYSxRQUFRLEVBQUUsU0FBUyxRQUFRO0FBQ3hELFlBQU0sTUFBTSxZQUFBRCxRQUFLLFFBQVEsUUFBUSxFQUFFLFlBQVk7QUFDL0MsVUFBSSxXQUFXO0FBQ2YsVUFBSSxRQUFRO0FBQVEsbUJBQVc7QUFBQSxlQUN0QixRQUFRO0FBQVMsbUJBQVc7QUFFckMsYUFBTztBQUFBLFFBQ0wsWUFBWTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBVSxZQUFBQSxRQUFLLFNBQVMsUUFBUTtBQUFBLE1BQ2xDO0FBQUEsSUFDRixTQUFTLEtBQUs7QUFDWixjQUFRLE1BQU0sNkJBQTZCLEdBQUc7QUFDOUMsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLENBQUM7QUFHRCwwQkFBUSxPQUFPLGVBQWUsT0FBTyxHQUFHLEVBQUUsUUFBUSxtQkFBbUIsVUFBVSxNQUF1RTtBQUNwSixVQUFNLE9BQU8sU0FBUztBQUN0QixVQUFNLFNBQVMsS0FBSyxTQUFTLGFBQWEsWUFBWSxTQUFTO0FBRS9ELFFBQUksQ0FBQyxRQUFRO0FBQ1gsWUFBTSxJQUFJLE1BQU0sbUNBQW1DO0FBQUEsSUFDckQ7QUFFQSxRQUFJO0FBQ0YsWUFBTSxRQUFRLElBQUksbUJBQW1CLE1BQU07QUFDM0MsWUFBTSxRQUFRLE1BQU0sbUJBQW1CO0FBQUEsUUFDckMsT0FBTztBQUFBLFFBQ1AsbUJBQW1CLHFCQUFxQjtBQUFBLE1BQzFDLENBQUM7QUFFRCxZQUFNLFFBQWUsQ0FBQyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3RDLFVBQUksV0FBVztBQUNiLGNBQU0sS0FBSyxTQUFTO0FBQUEsTUFDdEI7QUFFQSxZQUFNLFNBQVMsTUFBTSxNQUFNLGdCQUFnQixLQUFLO0FBQ2hELFlBQU0sV0FBVyxNQUFNLE9BQU87QUFDOUIsYUFBTyxTQUFTLEtBQUs7QUFBQSxJQUN2QixTQUFTLEtBQVU7QUFDakIsY0FBUSxNQUFNLHFCQUFxQixHQUFHO0FBQ3RDLFlBQU0sSUFBSSxNQUFNLElBQUksV0FBVyxnREFBZ0Q7QUFBQSxJQUNqRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJTY2hlbWFUeXBlIiwgIkV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2UiLCAiT3V0Y29tZSIsICJIYXJtQ2F0ZWdvcnkiLCAiSGFybUJsb2NrVGhyZXNob2xkIiwgIkhhcm1Qcm9iYWJpbGl0eSIsICJCbG9ja1JlYXNvbiIsICJGaW5pc2hSZWFzb24iLCAiVGFza1R5cGUiLCAiRnVuY3Rpb25DYWxsaW5nTW9kZSIsICJEeW5hbWljUmV0cmlldmFsTW9kZSIsICJUYXNrIiwgIl9hIiwgInBhdGgiLCAiZnMiXQp9Cg==
