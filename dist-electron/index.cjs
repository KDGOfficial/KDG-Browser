"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// main/index.ts
var import_electron2 = require("electron");
var import_path2 = __toESM(require("path"), 1);

// main/ipc-handlers.ts
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

// main/index.ts
var mainWindow = null;
import_electron2.Menu.setApplicationMenu(null);
import_electron2.app.setName("KDG Browser");
function createWindow() {
  mainWindow = new import_electron2.BrowserWindow({
    width: 1300,
    height: 850,
    minWidth: 1e3,
    minHeight: 650,
    title: "KDG Browser",
    backgroundColor: "#0d0d12",
    webPreferences: {
      preload: import_path2.default.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
      // Allow rendering other websites in tabs
    },
    // Gamer title bar color/design
    titleBarStyle: "default"
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(import_path2.default.join(__dirname, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
import_electron2.app.on("web-contents-created", (event, contents) => {
  contents.on("will-attach-webview", (webviewEvent, webPreferences, params) => {
    webPreferences.preload = import_path2.default.join(__dirname, "preload.cjs");
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
  });
});
import_electron2.app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();
  import_electron2.app.on("activate", () => {
    if (import_electron2.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
import_electron2.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron2.app.quit();
  }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbWFpbi9pbmRleC50cyIsICIuLi9tYWluL2lwYy1oYW5kbGVycy50cyIsICIuLi9ub2RlX21vZHVsZXMvQGdvb2dsZS9nZW5lcmF0aXZlLWFpL2Rpc3QvaW5kZXgubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3csIE1lbnUgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHJlZ2lzdGVySXBjSGFuZGxlcnMgfSBmcm9tICcuL2lwYy1oYW5kbGVycyc7XG5cbmxldCBtYWluV2luZG93OiBCcm93c2VyV2luZG93IHwgbnVsbCA9IG51bGw7XG5cbi8vIFJlbW92ZSBkZWZhdWx0IGFwcCBtZW51IChGaWxlLCBFZGl0LCBWaWV3Li4uKVxuTWVudS5zZXRBcHBsaWNhdGlvbk1lbnUobnVsbCk7XG5hcHAuc2V0TmFtZSgnS0RHIEJyb3dzZXInKTtcblxuZnVuY3Rpb24gY3JlYXRlV2luZG93KCkge1xuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgIHdpZHRoOiAxMzAwLFxuICAgIGhlaWdodDogODUwLFxuICAgIG1pbldpZHRoOiAxMDAwLFxuICAgIG1pbkhlaWdodDogNjUwLFxuICAgIHRpdGxlOiAnS0RHIEJyb3dzZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyMwZDBkMTInLFxuICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICBwcmVsb2FkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAncHJlbG9hZC5janMnKSxcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbjogZmFsc2UsXG4gICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgd2Vidmlld1RhZzogdHJ1ZSAvLyBBbGxvdyByZW5kZXJpbmcgb3RoZXIgd2Vic2l0ZXMgaW4gdGFic1xuICAgIH0sXG4gICAgLy8gR2FtZXIgdGl0bGUgYmFyIGNvbG9yL2Rlc2lnblxuICAgIHRpdGxlQmFyU3R5bGU6ICdkZWZhdWx0J1xuICB9KTtcblxuICAvLyBMb2FkIGZyb20gVml0ZSBzZXJ2ZXIgaW4gZGV2LCBsb2NhbCBmaWxlIGluIHByb2RcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgbWFpbldpbmRvdy5sb2FkVVJMKCdodHRwOi8vbG9jYWxob3N0OjUxNzMnKTtcbiAgICAvLyBPcGVuIGRldiB0b29scyBpbiBkZXZlbG9wbWVudCBvcHRpb25hbGx5XG4gICAgLy8gbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcbiAgfSBlbHNlIHtcbiAgICBtYWluV2luZG93LmxvYWRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9kaXN0L2luZGV4Lmh0bWwnKSk7XG4gIH1cblxuICBtYWluV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgbWFpbldpbmRvdyA9IG51bGw7XG4gIH0pO1xufVxuXG4vLyBFbmFibGUgd2VidmlldyBpbnRlZ3JhdGlvbiBpbiBtb2Rlcm4gRWxlY3Ryb24gdmVyc2lvblxuYXBwLm9uKCd3ZWItY29udGVudHMtY3JlYXRlZCcsIChldmVudCwgY29udGVudHMpID0+IHtcbiAgY29udGVudHMub24oJ3dpbGwtYXR0YWNoLXdlYnZpZXcnLCAod2Vidmlld0V2ZW50LCB3ZWJQcmVmZXJlbmNlcywgcGFyYW1zKSA9PiB7XG4gICAgLy8gRW5hYmxlIHN0YW5kYXJkIHNlY3VyaXR5IHBlcm1pc3Npb25zIG9uIGxvYWRlZCB3ZWJ2aWV3c1xuICAgIHdlYlByZWZlcmVuY2VzLnByZWxvYWQgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAncHJlbG9hZC5janMnKTtcbiAgICB3ZWJQcmVmZXJlbmNlcy5ub2RlSW50ZWdyYXRpb24gPSBmYWxzZTtcbiAgICB3ZWJQcmVmZXJlbmNlcy5jb250ZXh0SXNvbGF0aW9uID0gdHJ1ZTtcbiAgfSk7XG59KTtcblxuYXBwLndoZW5SZWFkeSgpLnRoZW4oKCkgPT4ge1xuICByZWdpc3RlcklwY0hhbmRsZXJzKCk7XG4gIGNyZWF0ZVdpbmRvdygpO1xuXG4gIGFwcC5vbignYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgaWYgKEJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3JlYXRlV2luZG93KCk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbiAgICBhcHAucXVpdCgpO1xuICB9XG59KTtcbiIsICJpbXBvcnQgeyBpcGNNYWluLCBhcHAsIHNoZWxsLCBkaWFsb2cgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBHb29nbGVHZW5lcmF0aXZlQUkgfSBmcm9tICdAZ29vZ2xlL2dlbmVyYXRpdmUtYWknO1xuXG5jb25zdCBEQVRBX0ZJTEUgPSBwYXRoLmpvaW4oYXBwLmdldFBhdGgoJ3VzZXJEYXRhJyksICdrZGctYnJvd3Nlci1kYXRhLmpzb24nKTtcblxuaW50ZXJmYWNlIEFwcERhdGEge1xuICBzZXR0aW5nczoge1xuICAgIGdlbWluaUtleTogc3RyaW5nO1xuICAgIHNlYXJjaEVuZ2luZTogJ2dvb2dsZScgfCAneWFuZGV4JyB8ICdiaW5nJyB8ICdkdWNrZHVja2dvJztcbiAgICB0aGVtZTogJ2RhcmsnIHwgJ2xpZ2h0JyB8ICdnYW1lcic7XG4gICAgaG9tZXBhZ2U6IHN0cmluZztcbiAgICBoYXNQcm9tcHRlZERlZmF1bHQ6IGJvb2xlYW47XG4gICAgbWVtb3J5U2F2ZXI6IGJvb2xlYW47XG4gIH07XG4gIGhpc3Rvcnk6IEFycmF5PHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gIH0+O1xuICBib29rbWFya3M6IEFycmF5PHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gIH0+O1xufVxuXG4vLyBJbml0aWFsIGRhdGEgc3RydWN0dXJlXG5jb25zdCBkZWZhdWx0RGF0YTogQXBwRGF0YSA9IHtcbiAgc2V0dGluZ3M6IHtcbiAgICBnZW1pbmlLZXk6ICdBSXphU3lEUlVGTS1MblFaWTg3bllOTDNWcE1KdFRHeFZOZDB5cVUnLCAvLyBQcmUtcG9wdWxhdGVkIHVzZXIga2V5XG4gICAgc2VhcmNoRW5naW5lOiAnZ29vZ2xlJyxcbiAgICB0aGVtZTogJ2RhcmsnLFxuICAgIGhvbWVwYWdlOiAna2RnOi8vaG9tZScsXG4gICAgaGFzUHJvbXB0ZWREZWZhdWx0OiBmYWxzZSxcbiAgICBtZW1vcnlTYXZlcjogdHJ1ZVxuICB9LFxuICBoaXN0b3J5OiBbXSxcbiAgYm9va21hcmtzOiBbXVxufTtcblxuLy8gSGVscGVyIHRvIHJlYWQgZGF0YVxuZnVuY3Rpb24gcmVhZERhdGEoKTogQXBwRGF0YSB7XG4gIHRyeSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKERBVEFfRklMRSkpIHtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoREFUQV9GSUxFLCBKU09OLnN0cmluZ2lmeShkZWZhdWx0RGF0YSwgbnVsbCwgMikpO1xuICAgICAgcmV0dXJuIGRlZmF1bHREYXRhO1xuICAgIH1cbiAgICBjb25zdCByYXcgPSBmcy5yZWFkRmlsZVN5bmMoREFUQV9GSUxFLCAndXRmLTgnKTtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldHRpbmdzOiB7IC4uLmRlZmF1bHREYXRhLnNldHRpbmdzLCAuLi5wYXJzZWQuc2V0dGluZ3MgfSxcbiAgICAgIGhpc3Rvcnk6IHBhcnNlZC5oaXN0b3J5IHx8IFtdLFxuICAgICAgYm9va21hcmtzOiBwYXJzZWQuYm9va21hcmtzIHx8IFtdXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVhZGluZyBicm93c2VyIGRhdGE6JywgZXJyKTtcbiAgICByZXR1cm4gZGVmYXVsdERhdGE7XG4gIH1cbn1cblxuLy8gSGVscGVyIHRvIHdyaXRlIGRhdGFcbmZ1bmN0aW9uIHdyaXRlRGF0YShkYXRhOiBBcHBEYXRhKSB7XG4gIHRyeSB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhEQVRBX0ZJTEUsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3Igd3JpdGluZyBicm93c2VyIGRhdGE6JywgZXJyKTtcbiAgfVxufVxuXG4vLyBCb29rbWFya3MgaW1wb3J0IGhlbHBlciBmcm9tIENocm9tZS9FZGdlXG5mdW5jdGlvbiBpbXBvcnRDaHJvbWVCb29rbWFya3MoYnJvd3NlcjogJ2Nocm9tZScgfCAnZWRnZScpOiBBcnJheTx7IHVybDogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+IHtcbiAgbGV0IHJlbGF0aXZlUGF0aCA9ICcnO1xuICBpZiAoYnJvd3NlciA9PT0gJ2Nocm9tZScpIHtcbiAgICByZWxhdGl2ZVBhdGggPSAnR29vZ2xlL0Nocm9tZS9Vc2VyIERhdGEvRGVmYXVsdC9Cb29rbWFya3MnO1xuICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09ICdlZGdlJykge1xuICAgIHJlbGF0aXZlUGF0aCA9ICdNaWNyb3NvZnQvRWRnZS9Vc2VyIERhdGEvRGVmYXVsdC9Cb29rbWFya3MnO1xuICB9XG4gIFxuICBjb25zdCBib29rbWFya3NQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuZW52LkxPQ0FMQVBQREFUQSB8fCAnJywgcmVsYXRpdmVQYXRoKTtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGJvb2ttYXJrc1BhdGgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdTA0MjRcdTA0MzBcdTA0MzlcdTA0M0IgXHUwNDM3XHUwNDMwXHUwNDNBXHUwNDNCXHUwNDMwXHUwNDM0XHUwNDNFXHUwNDNBICR7YnJvd3Nlcn0gXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRC5gKTtcbiAgfVxuICBcbiAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhib29rbWFya3NQYXRoLCAndXRmOCcpO1xuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgY29uc3QgYm9va21hcmtzTGlzdDogQXJyYXk8eyB1cmw6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PiA9IFtdO1xuICBcbiAgZnVuY3Rpb24gdHJhdmVyc2Uobm9kZTogYW55KSB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ3VybCcgJiYgbm9kZS51cmwpIHtcbiAgICAgIGJvb2ttYXJrc0xpc3QucHVzaCh7XG4gICAgICAgIHVybDogbm9kZS51cmwsXG4gICAgICAgIHRpdGxlOiBub2RlLm5hbWUgfHwgbm9kZS51cmxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnZm9sZGVyJyAmJiBBcnJheS5pc0FycmF5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2godHJhdmVyc2UpO1xuICAgIH1cbiAgfVxuICBcbiAgaWYgKGRhdGEucm9vdHMpIHtcbiAgICBpZiAoZGF0YS5yb290cy5ib29rbWFya19iYXIpIHRyYXZlcnNlKGRhdGEucm9vdHMuYm9va21hcmtfYmFyKTtcbiAgICBpZiAoZGF0YS5yb290cy5vdGhlcikgdHJhdmVyc2UoZGF0YS5yb290cy5vdGhlcik7XG4gICAgaWYgKGRhdGEucm9vdHMuc3luY2VkKSB0cmF2ZXJzZShkYXRhLnJvb3RzLnN5bmNlZCk7XG4gIH1cbiAgXG4gIHJldHVybiBib29rbWFya3NMaXN0O1xufVxuXG4vLyBCb29rbWFya3MgaW1wb3J0IGhlbHBlciBmcm9tIEhUTUwgc3RyaW5nXG5mdW5jdGlvbiBwYXJzZUh0bWxCb29rbWFya3MoaHRtbENvbnRlbnQ6IHN0cmluZyk6IEFycmF5PHsgdXJsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4ge1xuICBjb25zdCBib29rbWFya3M6IEFycmF5PHsgdXJsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gPSBbXTtcbiAgY29uc3QgcmVnZXggPSAvPGFcXHMrW14+XSpocmVmPVtcIiddKFteXCInXSopW1wiJ11bXj5dKj4oLio/KTxcXC9hPi9naTtcbiAgbGV0IG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyhodG1sQ29udGVudCkpICE9PSBudWxsKSB7XG4gICAgY29uc3QgdXJsID0gbWF0Y2hbMV07XG4gICAgbGV0IHRpdGxlID0gbWF0Y2hbMl0ucmVwbGFjZSgvPFtePl0qPi9nLCAnJykudHJpbSgpO1xuICAgIGlmICh1cmwgJiYgKHVybC5zdGFydHNXaXRoKCdodHRwOi8vJykgfHwgdXJsLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykpKSB7XG4gICAgICBib29rbWFya3MucHVzaCh7IHVybCwgdGl0bGU6IHRpdGxlIHx8IHVybCB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvb2ttYXJrcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySXBjSGFuZGxlcnMoKSB7XG4gIC8vIC0tLSBTZXR0aW5ncyBIYW5kbGVycyAtLS1cbiAgaXBjTWFpbi5oYW5kbGUoJ3NldHRpbmdzOmdldCcsICgpID0+IHtcbiAgICByZXR1cm4gcmVhZERhdGEoKS5zZXR0aW5ncztcbiAgfSk7XG5cbiAgaXBjTWFpbi5oYW5kbGUoJ3NldHRpbmdzOnNhdmUnLCAoXywgc2V0dGluZ3M6IEFwcERhdGFbJ3NldHRpbmdzJ10pID0+IHtcbiAgICBjb25zdCBkYXRhID0gcmVhZERhdGEoKTtcbiAgICBkYXRhLnNldHRpbmdzID0geyAuLi5kYXRhLnNldHRpbmdzLCAuLi5zZXR0aW5ncyB9O1xuICAgIHdyaXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gIH0pO1xuXG4gIC8vIC0tLSBEZWZhdWx0IEJyb3dzZXIgSGFuZGxlcnMgLS0tXG4gIGlwY01haW4uaGFuZGxlKCdicm93c2VyOmlzRGVmYXVsdCcsICgpID0+IHtcbiAgICByZXR1cm4gYXBwLmlzRGVmYXVsdFByb3RvY29sQ2xpZW50KCdodHRwJyk7XG4gIH0pO1xuXG4gIGlwY01haW4uaGFuZGxlKCdicm93c2VyOnNldERlZmF1bHQnLCAoKSA9PiB7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgYXBwLnNldEFzRGVmYXVsdFByb3RvY29sQ2xpZW50KCdodHRwJyk7XG4gICAgICBhcHAuc2V0QXNEZWZhdWx0UHJvdG9jb2xDbGllbnQoJ2h0dHBzJyk7XG4gICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzZXQgYXMgZGVmYXVsdCBwcm90b2NvbCBjbGllbnQ6JywgZXJyKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbCgnbXMtc2V0dGluZ3M6ZGVmYXVsdGFwcHMnKS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgfVxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9KTtcblxuICAvLyAtLS0gQm9va21hcmtzIEltcG9ydCBIYW5kbGVycyAtLS1cbiAgaXBjTWFpbi5oYW5kbGUoJ2Jvb2ttYXJrczppbXBvcnQnLCAoXywgdHlwZTogJ2Nocm9tZScgfCAnZWRnZScpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IHJlYWREYXRhKCk7XG4gICAgICBjb25zdCBpbXBvcnRlZCA9IGltcG9ydENocm9tZUJvb2ttYXJrcyh0eXBlKTtcbiAgICAgIFxuICAgICAgaWYgKGltcG9ydGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgY291bnQ6IDAsIGVycm9yOiAnXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDNCXHUwNDMwXHUwNDM0XHUwNDNBXHUwNDM4IFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0NEIgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQiBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDIuJyB9O1xuICAgICAgfVxuICAgICAgXG4gICAgICBsZXQgYWRkZWRDb3VudCA9IDA7XG4gICAgICBpbXBvcnRlZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBkYXRhLmJvb2ttYXJrcy5zb21lKGIgPT4gYi51cmwgPT09IGl0ZW0udXJsKTtcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICBkYXRhLmJvb2ttYXJrcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOSksXG4gICAgICAgICAgICB1cmw6IGl0ZW0udXJsLFxuICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhZGRlZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICB3cml0ZURhdGEoZGF0YSk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb3VudDogYWRkZWRDb3VudCB9O1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBpbXBvcnRpbmcgZnJvbSAke3R5cGV9OmAsIGVycik7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVyci5tZXNzYWdlIH07XG4gICAgfVxuICB9KTtcblxuICBpcGNNYWluLmhhbmRsZSgnYm9va21hcmtzOmltcG9ydERpYWxvZycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkaWFsb2cuc2hvd09wZW5EaWFsb2coe1xuICAgICAgcHJvcGVydGllczogWydvcGVuRmlsZSddLFxuICAgICAgZmlsdGVyczogW1xuICAgICAgICB7IG5hbWU6ICdIVE1MIEJvb2ttYXJrcycsIGV4dGVuc2lvbnM6IFsnaHRtbCcsICdodG0nXSB9XG4gICAgICBdXG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHJlc3VsdC5jYW5jZWxlZCB8fCByZXN1bHQuZmlsZVBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGNhbmNlbGVkOiB0cnVlIH07XG4gICAgfVxuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IHJlc3VsdC5maWxlUGF0aHNbMF07XG4gICAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICAgICAgY29uc3QgaW1wb3J0ZWQgPSBwYXJzZUh0bWxCb29rbWFya3MoY29udGVudCk7XG4gICAgICBcbiAgICAgIGlmIChpbXBvcnRlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGNvdW50OiAwLCBlcnJvcjogJ1x1MDQxMiBcdTA0MzJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0M0RcdTA0M0RcdTA0M0VcdTA0M0MgXHUwNDQ0XHUwNDMwXHUwNDM5XHUwNDNCXHUwNDM1IFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0M0UgXHUwNDM3XHUwNDMwXHUwNDNBXHUwNDNCXHUwNDMwXHUwNDM0XHUwNDNFXHUwNDNBLicgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgZGF0YSA9IHJlYWREYXRhKCk7XG4gICAgICBsZXQgYWRkZWRDb3VudCA9IDA7XG4gICAgICBpbXBvcnRlZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBkYXRhLmJvb2ttYXJrcy5zb21lKGIgPT4gYi51cmwgPT09IGl0ZW0udXJsKTtcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICBkYXRhLmJvb2ttYXJrcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOSksXG4gICAgICAgICAgICB1cmw6IGl0ZW0udXJsLFxuICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhZGRlZENvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICB3cml0ZURhdGEoZGF0YSk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb3VudDogYWRkZWRDb3VudCwgZmlsZVBhdGg6IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgpIH07XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGltcG9ydGluZyBib29rbWFya3MgZmlsZTonLCBlcnIpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnIubWVzc2FnZSB9O1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tIEhpc3RvcnkgSGFuZGxlcnMgLS0tXG4gIGlwY01haW4uaGFuZGxlKCdoaXN0b3J5OmdldCcsICgpID0+IHtcbiAgICByZXR1cm4gcmVhZERhdGEoKS5oaXN0b3J5O1xuICB9KTtcblxuICBpcGNNYWluLmhhbmRsZSgnaGlzdG9yeTphZGQnLCAoXywgaXRlbTogeyB1cmw6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHJlYWREYXRhKCk7XG4gICAgY29uc3QgZmlsdGVyZWQgPSBkYXRhLmhpc3RvcnkuZmlsdGVyKGggPT4gaC51cmwgIT09IGl0ZW0udXJsKTtcbiAgICBjb25zdCBuZXdFbnRyeSA9IHtcbiAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOSksXG4gICAgICB1cmw6IGl0ZW0udXJsLFxuICAgICAgdGl0bGU6IGl0ZW0udGl0bGUgfHwgaXRlbS51cmwsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICB9O1xuICAgIGRhdGEuaGlzdG9yeSA9IFtuZXdFbnRyeSwgLi4uZmlsdGVyZWRdLnNsaWNlKDAsIDIwMCk7XG4gICAgd3JpdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiBkYXRhLmhpc3Rvcnk7XG4gIH0pO1xuXG4gIGlwY01haW4uaGFuZGxlKCdoaXN0b3J5OmNsZWFyJywgKCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZWFkRGF0YSgpO1xuICAgIGRhdGEuaGlzdG9yeSA9IFtdO1xuICAgIHdyaXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gW107XG4gIH0pO1xuXG4gIC8vIC0tLSBCb29rbWFya3MgSGFuZGxlcnMgLS0tXG4gIGlwY01haW4uaGFuZGxlKCdib29rbWFya3M6Z2V0JywgKCkgPT4ge1xuICAgIHJldHVybiByZWFkRGF0YSgpLmJvb2ttYXJrcztcbiAgfSk7XG5cbiAgaXBjTWFpbi5oYW5kbGUoJ2Jvb2ttYXJrczp0b2dnbGUnLCAoXywgaXRlbTogeyB1cmw6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHJlYWREYXRhKCk7XG4gICAgY29uc3QgaW5kZXggPSBkYXRhLmJvb2ttYXJrcy5maW5kSW5kZXgoYiA9PiBiLnVybCA9PT0gaXRlbS51cmwpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBkYXRhLmJvb2ttYXJrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhLmJvb2ttYXJrcy5wdXNoKHtcbiAgICAgICAgaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA5KSxcbiAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUgfHwgaXRlbS51cmwsXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHdyaXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gZGF0YS5ib29rbWFya3M7XG4gIH0pO1xuXG4gIC8vIC0tLSBEaWFsb2cgSGFuZGxlcnMgLS0tXG4gIGlwY01haW4uaGFuZGxlKCdkaWFsb2c6b3BlbkltYWdlJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRpYWxvZy5zaG93T3BlbkRpYWxvZyh7XG4gICAgICBwcm9wZXJ0aWVzOiBbJ29wZW5GaWxlJ10sXG4gICAgICBmaWx0ZXJzOiBbXG4gICAgICAgIHsgbmFtZTogJ0ltYWdlcycsIGV4dGVuc2lvbnM6IFsnanBnJywgJ3BuZycsICdqcGVnJywgJ3dlYnAnXSB9XG4gICAgICBdXG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHJlc3VsdC5jYW5jZWxlZCB8fCByZXN1bHQuZmlsZVBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IHJlc3VsdC5maWxlUGF0aHNbMF07XG4gICAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgICBjb25zdCBleHQgPSBwYXRoLmV4dG5hbWUoZmlsZVBhdGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBsZXQgbWltZVR5cGUgPSAnaW1hZ2UvanBlZyc7XG4gICAgICBpZiAoZXh0ID09PSAnLnBuZycpIG1pbWVUeXBlID0gJ2ltYWdlL3BuZyc7XG4gICAgICBlbHNlIGlmIChleHQgPT09ICcud2VicCcpIG1pbWVUeXBlID0gJ2ltYWdlL3dlYnAnO1xuICAgICAgXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmxpbmVEYXRhOiB7XG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICBtaW1lVHlwZVxuICAgICAgICB9LFxuICAgICAgICBmaWxlTmFtZTogcGF0aC5iYXNlbmFtZShmaWxlUGF0aClcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZWFkaW5nIGltYWdlIGZpbGU6JywgZXJyKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gLS0tIEFJIEdlbWluaSBIYW5kbGVyIC0tLVxuICBpcGNNYWluLmhhbmRsZSgnYWk6Z2VuZXJhdGUnLCBhc3luYyAoXywgeyBwcm9tcHQsIHN5c3RlbUluc3RydWN0aW9uLCBpbWFnZVBhcnQgfTogeyBwcm9tcHQ6IHN0cmluZzsgc3lzdGVtSW5zdHJ1Y3Rpb24/OiBzdHJpbmc7IGltYWdlUGFydD86IGFueSB9KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHJlYWREYXRhKCk7XG4gICAgY29uc3QgYXBpS2V5ID0gZGF0YS5zZXR0aW5ncy5nZW1pbmlLZXkgfHwgZGVmYXVsdERhdGEuc2V0dGluZ3MuZ2VtaW5pS2V5O1xuXG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignR2VtaW5pIEFQSSBrZXkgaXMgbm90IGNvbmZpZ3VyZWQuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGdlbkFJID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSShhcGlLZXkpO1xuICAgICAgY29uc3QgbW9kZWwgPSBnZW5BSS5nZXRHZW5lcmF0aXZlTW9kZWwoe1xuICAgICAgICBtb2RlbDogJ2dlbWluaS0xLjUtZmxhc2gnLFxuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbjogc3lzdGVtSW5zdHJ1Y3Rpb24gfHwgJ1x1MDQyMlx1MDQ0QiBcdTIwMTQgXHUwNDM4XHUwNDQxXHUwNDNBXHUwNDQzXHUwNDQxXHUwNDQxXHUwNDQyXHUwNDMyXHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQzOFx1MDQzRFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQzQlx1MDQzNVx1MDQzQVx1MDQ0MiBLREcgQnJvd3NlciwgXHUwNDNGXHUwNDNFXHUwNDNDXHUwNDNFXHUwNDQ5XHUwNDNEXHUwNDM4XHUwNDNBIFx1MDQzM1x1MDQzNVx1MDQzOVx1MDQzQ1x1MDQzNVx1MDQ0MFx1MDQzMCBcdTA0MzRcdTA0M0JcdTA0NEYgXCJcdTA0MUFcdTA0MzBcdTA0M0RcdTA0MzBcdTA0M0JcdTA0MzAgXHUwNDE0XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQxM1x1MDQzNVx1MDQzOVx1MDQzQ1x1MDQzNVx1MDQ0MFx1MDQzMFwiIChLREcpLiBcdTA0MjJcdTA0MzJcdTA0M0VcdTA0NEYgXHUwNDQ2XHUwNDM1XHUwNDNCXHUwNDRDIFx1MjAxNCBcdTA0M0ZcdTA0M0VcdTA0M0NcdTA0M0VcdTA0MzNcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDM3XHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDRGXHUwNDNDIFx1MDQzMFx1MDQzRFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0MzhcdTA0MzRcdTA0MzVcdTA0M0UsIFx1MDQzRVx1MDQ0Mlx1MDQzMlx1MDQzNVx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0RcdTA0MzAgXHUwNDMyXHUwNDNFXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQxXHUwNDRCIFx1MDQzRlx1MDQzRSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDVcdTA0M0VcdTA0MzZcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEZcdTA0M0MgXHUwNDM4IFx1MDQzNFx1MDQzMFx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0FcdTA0MzBcdTA0NDdcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQyXHUwNDRCIFx1MDQzRlx1MDQzRSBcdTA0MzhcdTA0MzNcdTA0NDBcdTA0MzBcdTA0M0MuJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhcnRzOiBhbnlbXSA9IFt7IHRleHQ6IHByb21wdCB9XTtcbiAgICAgIGlmIChpbWFnZVBhcnQpIHtcbiAgICAgICAgcGFydHMucHVzaChpbWFnZVBhcnQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RlbC5nZW5lcmF0ZUNvbnRlbnQocGFydHMpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXN1bHQucmVzcG9uc2U7XG4gICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdHZW1pbmkgQVBJIGVycm9yOicsIGVycik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyLm1lc3NhZ2UgfHwgJ0Vycm9yIG9jY3VycmVkIHdoaWxlIGNvbnRhY3RpbmcgR29vZ2xlIEdlbWluaS4nKTtcbiAgICB9XG4gIH0pO1xufVxuIiwgIi8qKlxuICogQ29udGFpbnMgdGhlIGxpc3Qgb2YgT3BlbkFQSSBkYXRhIHR5cGVzXG4gKiBhcyBkZWZpbmVkIGJ5IGh0dHBzOi8vc3dhZ2dlci5pby9kb2NzL3NwZWNpZmljYXRpb24vZGF0YS1tb2RlbHMvZGF0YS10eXBlcy9cbiAqIEBwdWJsaWNcbiAqL1xudmFyIFNjaGVtYVR5cGU7XG4oZnVuY3Rpb24gKFNjaGVtYVR5cGUpIHtcbiAgICAvKiogU3RyaW5nIHR5cGUuICovXG4gICAgU2NoZW1hVHlwZVtcIlNUUklOR1wiXSA9IFwic3RyaW5nXCI7XG4gICAgLyoqIE51bWJlciB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJOVU1CRVJcIl0gPSBcIm51bWJlclwiO1xuICAgIC8qKiBJbnRlZ2VyIHR5cGUuICovXG4gICAgU2NoZW1hVHlwZVtcIklOVEVHRVJcIl0gPSBcImludGVnZXJcIjtcbiAgICAvKiogQm9vbGVhbiB0eXBlLiAqL1xuICAgIFNjaGVtYVR5cGVbXCJCT09MRUFOXCJdID0gXCJib29sZWFuXCI7XG4gICAgLyoqIEFycmF5IHR5cGUuICovXG4gICAgU2NoZW1hVHlwZVtcIkFSUkFZXCJdID0gXCJhcnJheVwiO1xuICAgIC8qKiBPYmplY3QgdHlwZS4gKi9cbiAgICBTY2hlbWFUeXBlW1wiT0JKRUNUXCJdID0gXCJvYmplY3RcIjtcbn0pKFNjaGVtYVR5cGUgfHwgKFNjaGVtYVR5cGUgPSB7fSkpO1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBAcHVibGljXG4gKi9cbnZhciBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlO1xuKGZ1bmN0aW9uIChFeGVjdXRhYmxlQ29kZUxhbmd1YWdlKSB7XG4gICAgRXhlY3V0YWJsZUNvZGVMYW5ndWFnZVtcIkxBTkdVQUdFX1VOU1BFQ0lGSUVEXCJdID0gXCJsYW5ndWFnZV91bnNwZWNpZmllZFwiO1xuICAgIEV4ZWN1dGFibGVDb2RlTGFuZ3VhZ2VbXCJQWVRIT05cIl0gPSBcInB5dGhvblwiO1xufSkoRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSB8fCAoRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSA9IHt9KSk7XG4vKipcbiAqIFBvc3NpYmxlIG91dGNvbWVzIG9mIGNvZGUgZXhlY3V0aW9uLlxuICogQHB1YmxpY1xuICovXG52YXIgT3V0Y29tZTtcbihmdW5jdGlvbiAoT3V0Y29tZSkge1xuICAgIC8qKlxuICAgICAqIFVuc3BlY2lmaWVkIHN0YXR1cy4gVGhpcyB2YWx1ZSBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAgICovXG4gICAgT3V0Y29tZVtcIk9VVENPTUVfVU5TUEVDSUZJRURcIl0gPSBcIm91dGNvbWVfdW5zcGVjaWZpZWRcIjtcbiAgICAvKipcbiAgICAgKiBDb2RlIGV4ZWN1dGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAqL1xuICAgIE91dGNvbWVbXCJPVVRDT01FX09LXCJdID0gXCJvdXRjb21lX29rXCI7XG4gICAgLyoqXG4gICAgICogQ29kZSBleGVjdXRpb24gZmluaXNoZWQgYnV0IHdpdGggYSBmYWlsdXJlLiBgc3RkZXJyYCBzaG91bGQgY29udGFpbiB0aGVcbiAgICAgKiByZWFzb24uXG4gICAgICovXG4gICAgT3V0Y29tZVtcIk9VVENPTUVfRkFJTEVEXCJdID0gXCJvdXRjb21lX2ZhaWxlZFwiO1xuICAgIC8qKlxuICAgICAqIENvZGUgZXhlY3V0aW9uIHJhbiBmb3IgdG9vIGxvbmcsIGFuZCB3YXMgY2FuY2VsbGVkLiBUaGVyZSBtYXkgb3IgbWF5IG5vdFxuICAgICAqIGJlIGEgcGFydGlhbCBvdXRwdXQgcHJlc2VudC5cbiAgICAgKi9cbiAgICBPdXRjb21lW1wiT1VUQ09NRV9ERUFETElORV9FWENFRURFRFwiXSA9IFwib3V0Y29tZV9kZWFkbGluZV9leGNlZWRlZFwiO1xufSkoT3V0Y29tZSB8fCAoT3V0Y29tZSA9IHt9KSk7XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFBvc3NpYmxlIHJvbGVzLlxuICogQHB1YmxpY1xuICovXG5jb25zdCBQT1NTSUJMRV9ST0xFUyA9IFtcInVzZXJcIiwgXCJtb2RlbFwiLCBcImZ1bmN0aW9uXCIsIFwic3lzdGVtXCJdO1xuLyoqXG4gKiBIYXJtIGNhdGVnb3JpZXMgdGhhdCB3b3VsZCBjYXVzZSBwcm9tcHRzIG9yIGNhbmRpZGF0ZXMgdG8gYmUgYmxvY2tlZC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1DYXRlZ29yeTtcbihmdW5jdGlvbiAoSGFybUNhdGVnb3J5KSB7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9VTlNQRUNJRklFRFwiXSA9IFwiSEFSTV9DQVRFR09SWV9VTlNQRUNJRklFRFwiO1xuICAgIEhhcm1DYXRlZ29yeVtcIkhBUk1fQ0FURUdPUllfSEFURV9TUEVFQ0hcIl0gPSBcIkhBUk1fQ0FURUdPUllfSEFURV9TUEVFQ0hcIjtcbiAgICBIYXJtQ2F0ZWdvcnlbXCJIQVJNX0NBVEVHT1JZX1NFWFVBTExZX0VYUExJQ0lUXCJdID0gXCJIQVJNX0NBVEVHT1JZX1NFWFVBTExZX0VYUExJQ0lUXCI7XG4gICAgSGFybUNhdGVnb3J5W1wiSEFSTV9DQVRFR09SWV9IQVJBU1NNRU5UXCJdID0gXCJIQVJNX0NBVEVHT1JZX0hBUkFTU01FTlRcIjtcbiAgICBIYXJtQ2F0ZWdvcnlbXCJIQVJNX0NBVEVHT1JZX0RBTkdFUk9VU19DT05URU5UXCJdID0gXCJIQVJNX0NBVEVHT1JZX0RBTkdFUk9VU19DT05URU5UXCI7XG59KShIYXJtQ2F0ZWdvcnkgfHwgKEhhcm1DYXRlZ29yeSA9IHt9KSk7XG4vKipcbiAqIFRocmVzaG9sZCBhYm92ZSB3aGljaCBhIHByb21wdCBvciBjYW5kaWRhdGUgd2lsbCBiZSBibG9ja2VkLlxuICogQHB1YmxpY1xuICovXG52YXIgSGFybUJsb2NrVGhyZXNob2xkO1xuKGZ1bmN0aW9uIChIYXJtQmxvY2tUaHJlc2hvbGQpIHtcbiAgICAvLyBUaHJlc2hvbGQgaXMgdW5zcGVjaWZpZWQuXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiSEFSTV9CTE9DS19USFJFU0hPTERfVU5TUEVDSUZJRURcIl0gPSBcIkhBUk1fQkxPQ0tfVEhSRVNIT0xEX1VOU1BFQ0lGSUVEXCI7XG4gICAgLy8gQ29udGVudCB3aXRoIE5FR0xJR0lCTEUgd2lsbCBiZSBhbGxvd2VkLlxuICAgIEhhcm1CbG9ja1RocmVzaG9sZFtcIkJMT0NLX0xPV19BTkRfQUJPVkVcIl0gPSBcIkJMT0NLX0xPV19BTkRfQUJPVkVcIjtcbiAgICAvLyBDb250ZW50IHdpdGggTkVHTElHSUJMRSBhbmQgTE9XIHdpbGwgYmUgYWxsb3dlZC5cbiAgICBIYXJtQmxvY2tUaHJlc2hvbGRbXCJCTE9DS19NRURJVU1fQU5EX0FCT1ZFXCJdID0gXCJCTE9DS19NRURJVU1fQU5EX0FCT1ZFXCI7XG4gICAgLy8gQ29udGVudCB3aXRoIE5FR0xJR0lCTEUsIExPVywgYW5kIE1FRElVTSB3aWxsIGJlIGFsbG93ZWQuXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfT05MWV9ISUdIXCJdID0gXCJCTE9DS19PTkxZX0hJR0hcIjtcbiAgICAvLyBBbGwgY29udGVudCB3aWxsIGJlIGFsbG93ZWQuXG4gICAgSGFybUJsb2NrVGhyZXNob2xkW1wiQkxPQ0tfTk9ORVwiXSA9IFwiQkxPQ0tfTk9ORVwiO1xufSkoSGFybUJsb2NrVGhyZXNob2xkIHx8IChIYXJtQmxvY2tUaHJlc2hvbGQgPSB7fSkpO1xuLyoqXG4gKiBQcm9iYWJpbGl0eSB0aGF0IGEgcHJvbXB0IG9yIGNhbmRpZGF0ZSBtYXRjaGVzIGEgaGFybSBjYXRlZ29yeS5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIEhhcm1Qcm9iYWJpbGl0eTtcbihmdW5jdGlvbiAoSGFybVByb2JhYmlsaXR5KSB7XG4gICAgLy8gUHJvYmFiaWxpdHkgaXMgdW5zcGVjaWZpZWQuXG4gICAgSGFybVByb2JhYmlsaXR5W1wiSEFSTV9QUk9CQUJJTElUWV9VTlNQRUNJRklFRFwiXSA9IFwiSEFSTV9QUk9CQUJJTElUWV9VTlNQRUNJRklFRFwiO1xuICAgIC8vIENvbnRlbnQgaGFzIGEgbmVnbGlnaWJsZSBjaGFuY2Ugb2YgYmVpbmcgdW5zYWZlLlxuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIk5FR0xJR0lCTEVcIl0gPSBcIk5FR0xJR0lCTEVcIjtcbiAgICAvLyBDb250ZW50IGhhcyBhIGxvdyBjaGFuY2Ugb2YgYmVpbmcgdW5zYWZlLlxuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkxPV1wiXSA9IFwiTE9XXCI7XG4gICAgLy8gQ29udGVudCBoYXMgYSBtZWRpdW0gY2hhbmNlIG9mIGJlaW5nIHVuc2FmZS5cbiAgICBIYXJtUHJvYmFiaWxpdHlbXCJNRURJVU1cIl0gPSBcIk1FRElVTVwiO1xuICAgIC8vIENvbnRlbnQgaGFzIGEgaGlnaCBjaGFuY2Ugb2YgYmVpbmcgdW5zYWZlLlxuICAgIEhhcm1Qcm9iYWJpbGl0eVtcIkhJR0hcIl0gPSBcIkhJR0hcIjtcbn0pKEhhcm1Qcm9iYWJpbGl0eSB8fCAoSGFybVByb2JhYmlsaXR5ID0ge30pKTtcbi8qKlxuICogUmVhc29uIHRoYXQgYSBwcm9tcHQgd2FzIGJsb2NrZWQuXG4gKiBAcHVibGljXG4gKi9cbnZhciBCbG9ja1JlYXNvbjtcbihmdW5jdGlvbiAoQmxvY2tSZWFzb24pIHtcbiAgICAvLyBBIGJsb2NrZWQgcmVhc29uIHdhcyBub3Qgc3BlY2lmaWVkLlxuICAgIEJsb2NrUmVhc29uW1wiQkxPQ0tFRF9SRUFTT05fVU5TUEVDSUZJRURcIl0gPSBcIkJMT0NLRURfUkVBU09OX1VOU1BFQ0lGSUVEXCI7XG4gICAgLy8gQ29udGVudCB3YXMgYmxvY2tlZCBieSBzYWZldHkgc2V0dGluZ3MuXG4gICAgQmxvY2tSZWFzb25bXCJTQUZFVFlcIl0gPSBcIlNBRkVUWVwiO1xuICAgIC8vIENvbnRlbnQgd2FzIGJsb2NrZWQsIGJ1dCB0aGUgcmVhc29uIGlzIHVuY2F0ZWdvcml6ZWQuXG4gICAgQmxvY2tSZWFzb25bXCJPVEhFUlwiXSA9IFwiT1RIRVJcIjtcbn0pKEJsb2NrUmVhc29uIHx8IChCbG9ja1JlYXNvbiA9IHt9KSk7XG4vKipcbiAqIFJlYXNvbiB0aGF0IGEgY2FuZGlkYXRlIGZpbmlzaGVkLlxuICogQHB1YmxpY1xuICovXG52YXIgRmluaXNoUmVhc29uO1xuKGZ1bmN0aW9uIChGaW5pc2hSZWFzb24pIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlLiBUaGlzIHZhbHVlIGlzIHVudXNlZC5cbiAgICBGaW5pc2hSZWFzb25bXCJGSU5JU0hfUkVBU09OX1VOU1BFQ0lGSUVEXCJdID0gXCJGSU5JU0hfUkVBU09OX1VOU1BFQ0lGSUVEXCI7XG4gICAgLy8gTmF0dXJhbCBzdG9wIHBvaW50IG9mIHRoZSBtb2RlbCBvciBwcm92aWRlZCBzdG9wIHNlcXVlbmNlLlxuICAgIEZpbmlzaFJlYXNvbltcIlNUT1BcIl0gPSBcIlNUT1BcIjtcbiAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2YgdG9rZW5zIGFzIHNwZWNpZmllZCBpbiB0aGUgcmVxdWVzdCB3YXMgcmVhY2hlZC5cbiAgICBGaW5pc2hSZWFzb25bXCJNQVhfVE9LRU5TXCJdID0gXCJNQVhfVE9LRU5TXCI7XG4gICAgLy8gVGhlIGNhbmRpZGF0ZSBjb250ZW50IHdhcyBmbGFnZ2VkIGZvciBzYWZldHkgcmVhc29ucy5cbiAgICBGaW5pc2hSZWFzb25bXCJTQUZFVFlcIl0gPSBcIlNBRkVUWVwiO1xuICAgIC8vIFRoZSBjYW5kaWRhdGUgY29udGVudCB3YXMgZmxhZ2dlZCBmb3IgcmVjaXRhdGlvbiByZWFzb25zLlxuICAgIEZpbmlzaFJlYXNvbltcIlJFQ0lUQVRJT05cIl0gPSBcIlJFQ0lUQVRJT05cIjtcbiAgICAvLyBUaGUgY2FuZGlkYXRlIGNvbnRlbnQgd2FzIGZsYWdnZWQgZm9yIHVzaW5nIGFuIHVuc3VwcG9ydGVkIGxhbmd1YWdlLlxuICAgIEZpbmlzaFJlYXNvbltcIkxBTkdVQUdFXCJdID0gXCJMQU5HVUFHRVwiO1xuICAgIC8vIFVua25vd24gcmVhc29uLlxuICAgIEZpbmlzaFJlYXNvbltcIk9USEVSXCJdID0gXCJPVEhFUlwiO1xufSkoRmluaXNoUmVhc29uIHx8IChGaW5pc2hSZWFzb24gPSB7fSkpO1xuLyoqXG4gKiBUYXNrIHR5cGUgZm9yIGVtYmVkZGluZyBjb250ZW50LlxuICogQHB1YmxpY1xuICovXG52YXIgVGFza1R5cGU7XG4oZnVuY3Rpb24gKFRhc2tUeXBlKSB7XG4gICAgVGFza1R5cGVbXCJUQVNLX1RZUEVfVU5TUEVDSUZJRURcIl0gPSBcIlRBU0tfVFlQRV9VTlNQRUNJRklFRFwiO1xuICAgIFRhc2tUeXBlW1wiUkVUUklFVkFMX1FVRVJZXCJdID0gXCJSRVRSSUVWQUxfUVVFUllcIjtcbiAgICBUYXNrVHlwZVtcIlJFVFJJRVZBTF9ET0NVTUVOVFwiXSA9IFwiUkVUUklFVkFMX0RPQ1VNRU5UXCI7XG4gICAgVGFza1R5cGVbXCJTRU1BTlRJQ19TSU1JTEFSSVRZXCJdID0gXCJTRU1BTlRJQ19TSU1JTEFSSVRZXCI7XG4gICAgVGFza1R5cGVbXCJDTEFTU0lGSUNBVElPTlwiXSA9IFwiQ0xBU1NJRklDQVRJT05cIjtcbiAgICBUYXNrVHlwZVtcIkNMVVNURVJJTkdcIl0gPSBcIkNMVVNURVJJTkdcIjtcbn0pKFRhc2tUeXBlIHx8IChUYXNrVHlwZSA9IHt9KSk7XG4vKipcbiAqIEBwdWJsaWNcbiAqL1xudmFyIEZ1bmN0aW9uQ2FsbGluZ01vZGU7XG4oZnVuY3Rpb24gKEZ1bmN0aW9uQ2FsbGluZ01vZGUpIHtcbiAgICAvLyBVbnNwZWNpZmllZCBmdW5jdGlvbiBjYWxsaW5nIG1vZGUuIFRoaXMgdmFsdWUgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgIEZ1bmN0aW9uQ2FsbGluZ01vZGVbXCJNT0RFX1VOU1BFQ0lGSUVEXCJdID0gXCJNT0RFX1VOU1BFQ0lGSUVEXCI7XG4gICAgLy8gRGVmYXVsdCBtb2RlbCBiZWhhdmlvciwgbW9kZWwgZGVjaWRlcyB0byBwcmVkaWN0IGVpdGhlciBhIGZ1bmN0aW9uIGNhbGxcbiAgICAvLyBvciBhIG5hdHVyYWwgbGFuZ3VhZ2UgcmVwc3Bvc2UuXG4gICAgRnVuY3Rpb25DYWxsaW5nTW9kZVtcIkFVVE9cIl0gPSBcIkFVVE9cIjtcbiAgICAvLyBNb2RlbCBpcyBjb25zdHJhaW5lZCB0byBhbHdheXMgcHJlZGljdGluZyBhIGZ1bmN0aW9uIGNhbGwgb25seS5cbiAgICAvLyBJZiBcImFsbG93ZWRfZnVuY3Rpb25fbmFtZXNcIiBhcmUgc2V0LCB0aGUgcHJlZGljdGVkIGZ1bmN0aW9uIGNhbGwgd2lsbCBiZVxuICAgIC8vIGxpbWl0ZWQgdG8gYW55IG9uZSBvZiBcImFsbG93ZWRfZnVuY3Rpb25fbmFtZXNcIiwgZWxzZSB0aGUgcHJlZGljdGVkXG4gICAgLy8gZnVuY3Rpb24gY2FsbCB3aWxsIGJlIGFueSBvbmUgb2YgdGhlIHByb3ZpZGVkIFwiZnVuY3Rpb25fZGVjbGFyYXRpb25zXCIuXG4gICAgRnVuY3Rpb25DYWxsaW5nTW9kZVtcIkFOWVwiXSA9IFwiQU5ZXCI7XG4gICAgLy8gTW9kZWwgd2lsbCBub3QgcHJlZGljdCBhbnkgZnVuY3Rpb24gY2FsbC4gTW9kZWwgYmVoYXZpb3IgaXMgc2FtZSBhcyB3aGVuXG4gICAgLy8gbm90IHBhc3NpbmcgYW55IGZ1bmN0aW9uIGRlY2xhcmF0aW9ucy5cbiAgICBGdW5jdGlvbkNhbGxpbmdNb2RlW1wiTk9ORVwiXSA9IFwiTk9ORVwiO1xufSkoRnVuY3Rpb25DYWxsaW5nTW9kZSB8fCAoRnVuY3Rpb25DYWxsaW5nTW9kZSA9IHt9KSk7XG4vKipcbiAqIFRoZSBtb2RlIG9mIHRoZSBwcmVkaWN0b3IgdG8gYmUgdXNlZCBpbiBkeW5hbWljIHJldHJpZXZhbC5cbiAqIEBwdWJsaWNcbiAqL1xudmFyIER5bmFtaWNSZXRyaWV2YWxNb2RlO1xuKGZ1bmN0aW9uIChEeW5hbWljUmV0cmlldmFsTW9kZSkge1xuICAgIC8vIFVuc3BlY2lmaWVkIGZ1bmN0aW9uIGNhbGxpbmcgbW9kZS4gVGhpcyB2YWx1ZSBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAgRHluYW1pY1JldHJpZXZhbE1vZGVbXCJNT0RFX1VOU1BFQ0lGSUVEXCJdID0gXCJNT0RFX1VOU1BFQ0lGSUVEXCI7XG4gICAgLy8gUnVuIHJldHJpZXZhbCBvbmx5IHdoZW4gc3lzdGVtIGRlY2lkZXMgaXQgaXMgbmVjZXNzYXJ5LlxuICAgIER5bmFtaWNSZXRyaWV2YWxNb2RlW1wiTU9ERV9EWU5BTUlDXCJdID0gXCJNT0RFX0RZTkFNSUNcIjtcbn0pKER5bmFtaWNSZXRyaWV2YWxNb2RlIHx8IChEeW5hbWljUmV0cmlldmFsTW9kZSA9IHt9KSk7XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIEJhc2ljIGVycm9yIHR5cGUgZm9yIHRoaXMgU0RLLlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKGBbR29vZ2xlR2VuZXJhdGl2ZUFJIEVycm9yXTogJHttZXNzYWdlfWApO1xuICAgIH1cbn1cbi8qKlxuICogRXJyb3JzIGluIHRoZSBjb250ZW50cyBvZiBhIHJlc3BvbnNlIGZyb20gdGhlIG1vZGVsLiBUaGlzIGluY2x1ZGVzIHBhcnNpbmdcbiAqIGVycm9ycywgb3IgcmVzcG9uc2VzIGluY2x1ZGluZyBhIHNhZmV0eSBibG9jayByZWFzb24uXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB9XG59XG4vKipcbiAqIEVycm9yIGNsYXNzIGNvdmVyaW5nIEhUVFAgZXJyb3JzIHdoZW4gY2FsbGluZyB0aGUgc2VydmVyLiBJbmNsdWRlcyBIVFRQXG4gKiBzdGF0dXMsIHN0YXR1c1RleHQsIGFuZCBvcHRpb25hbCBkZXRhaWxzLCBpZiBwcm92aWRlZCBpbiB0aGUgc2VydmVyIHJlc3BvbnNlLlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBHb29nbGVHZW5lcmF0aXZlQUlGZXRjaEVycm9yIGV4dGVuZHMgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cywgc3RhdHVzVGV4dCwgZXJyb3JEZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dDtcbiAgICAgICAgdGhpcy5lcnJvckRldGFpbHMgPSBlcnJvckRldGFpbHM7XG4gICAgfVxufVxuLyoqXG4gKiBFcnJvcnMgaW4gdGhlIGNvbnRlbnRzIG9mIGEgcmVxdWVzdCBvcmlnaW5hdGluZyBmcm9tIHVzZXIgaW5wdXQuXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yIGV4dGVuZHMgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3Ige1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuY29uc3QgREVGQVVMVF9CQVNFX1VSTCA9IFwiaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb21cIjtcbmNvbnN0IERFRkFVTFRfQVBJX1ZFUlNJT04gPSBcInYxYmV0YVwiO1xuLyoqXG4gKiBXZSBjYW4ndCBgcmVxdWlyZWAgcGFja2FnZS5qc29uIGlmIHRoaXMgcnVucyBvbiB3ZWIuIFdlIHdpbGwgdXNlIHJvbGx1cCB0b1xuICogc3dhcCBpbiB0aGUgdmVyc2lvbiBudW1iZXIgaGVyZSBhdCBidWlsZCB0aW1lLlxuICovXG5jb25zdCBQQUNLQUdFX1ZFUlNJT04gPSBcIjAuMjEuMFwiO1xuY29uc3QgUEFDS0FHRV9MT0dfSEVBREVSID0gXCJnZW5haS1qc1wiO1xudmFyIFRhc2s7XG4oZnVuY3Rpb24gKFRhc2spIHtcbiAgICBUYXNrW1wiR0VORVJBVEVfQ09OVEVOVFwiXSA9IFwiZ2VuZXJhdGVDb250ZW50XCI7XG4gICAgVGFza1tcIlNUUkVBTV9HRU5FUkFURV9DT05URU5UXCJdID0gXCJzdHJlYW1HZW5lcmF0ZUNvbnRlbnRcIjtcbiAgICBUYXNrW1wiQ09VTlRfVE9LRU5TXCJdID0gXCJjb3VudFRva2Vuc1wiO1xuICAgIFRhc2tbXCJFTUJFRF9DT05URU5UXCJdID0gXCJlbWJlZENvbnRlbnRcIjtcbiAgICBUYXNrW1wiQkFUQ0hfRU1CRURfQ09OVEVOVFNcIl0gPSBcImJhdGNoRW1iZWRDb250ZW50c1wiO1xufSkoVGFzayB8fCAoVGFzayA9IHt9KSk7XG5jbGFzcyBSZXF1ZXN0VXJsIHtcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgdGFzaywgYXBpS2V5LCBzdHJlYW0sIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy50YXNrID0gdGFzaztcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG4gICAgICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICB0aGlzLnJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBhcGlWZXJzaW9uID0gKChfYSA9IHRoaXMucmVxdWVzdE9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hcGlWZXJzaW9uKSB8fCBERUZBVUxUX0FQSV9WRVJTSU9OO1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gKChfYiA9IHRoaXMucmVxdWVzdE9wdGlvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5iYXNlVXJsKSB8fCBERUZBVUxUX0JBU0VfVVJMO1xuICAgICAgICBsZXQgdXJsID0gYCR7YmFzZVVybH0vJHthcGlWZXJzaW9ufS8ke3RoaXMubW9kZWx9OiR7dGhpcy50YXNrfWA7XG4gICAgICAgIGlmICh0aGlzLnN0cmVhbSkge1xuICAgICAgICAgICAgdXJsICs9IFwiP2FsdD1zc2VcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbn1cbi8qKlxuICogU2ltcGxlLCBidXQgbWF5IGJlY29tZSBtb3JlIGNvbXBsZXggaWYgd2UgYWRkIG1vcmUgdmVyc2lvbnMgdG8gbG9nLlxuICovXG5mdW5jdGlvbiBnZXRDbGllbnRIZWFkZXJzKHJlcXVlc3RPcHRpb25zKSB7XG4gICAgY29uc3QgY2xpZW50SGVhZGVycyA9IFtdO1xuICAgIGlmIChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMuYXBpQ2xpZW50KSB7XG4gICAgICAgIGNsaWVudEhlYWRlcnMucHVzaChyZXF1ZXN0T3B0aW9ucy5hcGlDbGllbnQpO1xuICAgIH1cbiAgICBjbGllbnRIZWFkZXJzLnB1c2goYCR7UEFDS0FHRV9MT0dfSEVBREVSfS8ke1BBQ0tBR0VfVkVSU0lPTn1gKTtcbiAgICByZXR1cm4gY2xpZW50SGVhZGVycy5qb2luKFwiIFwiKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEhlYWRlcnModXJsKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIngtZ29vZy1hcGktY2xpZW50XCIsIGdldENsaWVudEhlYWRlcnModXJsLnJlcXVlc3RPcHRpb25zKSk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJ4LWdvb2ctYXBpLWtleVwiLCB1cmwuYXBpS2V5KTtcbiAgICBsZXQgY3VzdG9tSGVhZGVycyA9IChfYSA9IHVybC5yZXF1ZXN0T3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmN1c3RvbUhlYWRlcnM7XG4gICAgaWYgKGN1c3RvbUhlYWRlcnMpIHtcbiAgICAgICAgaWYgKCEoY3VzdG9tSGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGN1c3RvbUhlYWRlcnMgPSBuZXcgSGVhZGVycyhjdXN0b21IZWFkZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKGB1bmFibGUgdG8gY29udmVydCBjdXN0b21IZWFkZXJzIHZhbHVlICR7SlNPTi5zdHJpbmdpZnkoY3VzdG9tSGVhZGVycyl9IHRvIEhlYWRlcnM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgW2hlYWRlck5hbWUsIGhlYWRlclZhbHVlXSBvZiBjdXN0b21IZWFkZXJzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGhlYWRlck5hbWUgPT09IFwieC1nb29nLWFwaS1rZXlcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcihgQ2Fubm90IHNldCByZXNlcnZlZCBoZWFkZXIgbmFtZSAke2hlYWRlck5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoZWFkZXJOYW1lID09PSBcIngtZ29vZy1hcGktY2xpZW50XCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYEhlYWRlciBuYW1lICR7aGVhZGVyTmFtZX0gY2FuIG9ubHkgYmUgc2V0IHVzaW5nIHRoZSBhcGlDbGllbnQgZmllbGRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGVhZGVycztcbn1cbmFzeW5jIGZ1bmN0aW9uIGNvbnN0cnVjdE1vZGVsUmVxdWVzdChtb2RlbCwgdGFzaywgYXBpS2V5LCBzdHJlYW0sIGJvZHksIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFJlcXVlc3RVcmwobW9kZWwsIHRhc2ssIGFwaUtleSwgc3RyZWFtLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiB1cmwudG9TdHJpbmcoKSxcbiAgICAgICAgZmV0Y2hPcHRpb25zOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGJ1aWxkRmV0Y2hPcHRpb25zKHJlcXVlc3RPcHRpb25zKSksIHsgbWV0aG9kOiBcIlBPU1RcIiwgaGVhZGVyczogYXdhaXQgZ2V0SGVhZGVycyh1cmwpLCBib2R5IH0pLFxuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBtYWtlTW9kZWxSZXF1ZXN0KG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgYm9keSwgcmVxdWVzdE9wdGlvbnMgPSB7fSwgXG4vLyBBbGxvd3MgdGhpcyB0byBiZSBzdHViYmVkIGZvciB0ZXN0c1xuZmV0Y2hGbiA9IGZldGNoKSB7XG4gICAgY29uc3QgeyB1cmwsIGZldGNoT3B0aW9ucyB9ID0gYXdhaXQgY29uc3RydWN0TW9kZWxSZXF1ZXN0KG1vZGVsLCB0YXNrLCBhcGlLZXksIHN0cmVhbSwgYm9keSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIHJldHVybiBtYWtlUmVxdWVzdCh1cmwsIGZldGNoT3B0aW9ucywgZmV0Y2hGbik7XG59XG5hc3luYyBmdW5jdGlvbiBtYWtlUmVxdWVzdCh1cmwsIGZldGNoT3B0aW9ucywgZmV0Y2hGbiA9IGZldGNoKSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hGbih1cmwsIGZldGNoT3B0aW9ucyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZVJlc3BvbnNlRXJyb3IoZSwgdXJsKTtcbiAgICB9XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBhd2FpdCBoYW5kbGVSZXNwb25zZU5vdE9rKHJlc3BvbnNlLCB1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5mdW5jdGlvbiBoYW5kbGVSZXNwb25zZUVycm9yKGUsIHVybCkge1xuICAgIGxldCBlcnIgPSBlO1xuICAgIGlmICghKGUgaW5zdGFuY2VvZiBHb29nbGVHZW5lcmF0aXZlQUlGZXRjaEVycm9yIHx8XG4gICAgICAgIGUgaW5zdGFuY2VvZiBHb29nbGVHZW5lcmF0aXZlQUlSZXF1ZXN0SW5wdXRFcnJvcikpIHtcbiAgICAgICAgZXJyID0gbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFcnJvciBmZXRjaGluZyBmcm9tICR7dXJsLnRvU3RyaW5nKCl9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgZXJyLnN0YWNrID0gZS5zdGFjaztcbiAgICB9XG4gICAgdGhyb3cgZXJyO1xufVxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2VOb3RPayhyZXNwb25zZSwgdXJsKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICAgIGxldCBlcnJvckRldGFpbHM7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgbWVzc2FnZSA9IGpzb24uZXJyb3IubWVzc2FnZTtcbiAgICAgICAgaWYgKGpzb24uZXJyb3IuZGV0YWlscykge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgICR7SlNPTi5zdHJpbmdpZnkoanNvbi5lcnJvci5kZXRhaWxzKX1gO1xuICAgICAgICAgICAgZXJyb3JEZXRhaWxzID0ganNvbi5lcnJvci5kZXRhaWxzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlnbm9yZWRcbiAgICB9XG4gICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUZldGNoRXJyb3IoYEVycm9yIGZldGNoaW5nIGZyb20gJHt1cmwudG9TdHJpbmcoKX06IFske3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fV0gJHttZXNzYWdlfWAsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCwgZXJyb3JEZXRhaWxzKTtcbn1cbi8qKlxuICogR2VuZXJhdGVzIHRoZSByZXF1ZXN0IG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmZXRjaCBBUEkuXG4gKiBAcGFyYW0gcmVxdWVzdE9wdGlvbnMgLSBUaGUgdXNlci1kZWZpbmVkIHJlcXVlc3Qgb3B0aW9ucy5cbiAqIEByZXR1cm5zIFRoZSBnZW5lcmF0ZWQgcmVxdWVzdCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBidWlsZEZldGNoT3B0aW9ucyhyZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGZldGNoT3B0aW9ucyA9IHt9O1xuICAgIGlmICgocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnNpZ25hbCkgIT09IHVuZGVmaW5lZCB8fCAocmVxdWVzdE9wdGlvbnMgPT09IG51bGwgfHwgcmVxdWVzdE9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpID49IDApIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgaWYgKChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMudGltZW91dCkgPj0gMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHJlcXVlc3RPcHRpb25zLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucyA9PT0gbnVsbCB8fCByZXF1ZXN0T3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVxdWVzdE9wdGlvbnMuc2lnbmFsKSB7XG4gICAgICAgICAgICByZXF1ZXN0T3B0aW9ucy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmZXRjaE9wdGlvbnMuc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaE9wdGlvbnM7XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIEFkZHMgY29udmVuaWVuY2UgaGVscGVyIG1ldGhvZHMgdG8gYSByZXNwb25zZSBvYmplY3QsIGluY2x1ZGluZyBzdHJlYW1cbiAqIGNodW5rcyAoYXMgbG9uZyBhcyBlYWNoIGNodW5rIGlzIGEgY29tcGxldGUgR2VuZXJhdGVDb250ZW50UmVzcG9uc2UgSlNPTikuXG4gKi9cbmZ1bmN0aW9uIGFkZEhlbHBlcnMocmVzcG9uc2UpIHtcbiAgICByZXNwb25zZS50ZXh0ID0gKCkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcyAmJiByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoaXMgcmVzcG9uc2UgaGFkICR7cmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGh9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgY2FuZGlkYXRlcy4gUmV0dXJuaW5nIHRleHQgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0VGV4dChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBUZXh0IG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IHJlbW92ZSBhdCBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgKi9cbiAgICByZXNwb25zZS5mdW5jdGlvbkNhbGwgPSAoKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzICYmIHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhpcyByZXNwb25zZSBoYWQgJHtyZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aH0gYCArXG4gICAgICAgICAgICAgICAgICAgIGBjYW5kaWRhdGVzLiBSZXR1cm5pbmcgZnVuY3Rpb24gY2FsbHMgZnJvbSB0aGUgZmlyc3QgY2FuZGlkYXRlIG9ubHkuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgQWNjZXNzIHJlc3BvbnNlLmNhbmRpZGF0ZXMgZGlyZWN0bHkgdG8gdXNlIHRoZSBvdGhlciBjYW5kaWRhdGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihyZXNwb25zZS5jYW5kaWRhdGVzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGAke2Zvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKX1gLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJlc3BvbnNlLmZ1bmN0aW9uQ2FsbCgpIGlzIGRlcHJlY2F0ZWQuIGAgK1xuICAgICAgICAgICAgICAgIGBVc2UgcmVzcG9uc2UuZnVuY3Rpb25DYWxscygpIGluc3RlYWQuYCk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RnVuY3Rpb25DYWxscyhyZXNwb25zZSlbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvbXB0RmVlZGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlSZXNwb25zZUVycm9yKGBGdW5jdGlvbiBjYWxsIG5vdCBhdmFpbGFibGUuICR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgcmVzcG9uc2UuZnVuY3Rpb25DYWxscyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgJiYgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGlzIHJlc3BvbnNlIGhhZCAke3Jlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGNhbmRpZGF0ZXMuIFJldHVybmluZyBmdW5jdGlvbiBjYWxscyBmcm9tIHRoZSBmaXJzdCBjYW5kaWRhdGUgb25seS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBBY2Nlc3MgcmVzcG9uc2UuY2FuZGlkYXRlcyBkaXJlY3RseSB0byB1c2UgdGhlIG90aGVyIGNhbmRpZGF0ZXMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFkQmFkRmluaXNoUmVhc29uKHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IoYCR7Zm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpfWAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZXRGdW5jdGlvbkNhbGxzKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5wcm9tcHRGZWVkYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IoYEZ1bmN0aW9uIGNhbGwgbm90IGF2YWlsYWJsZS4gJHtmb3JtYXRCbG9ja0Vycm9yTWVzc2FnZShyZXNwb25zZSl9YCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG4vKipcbiAqIFJldHVybnMgYWxsIHRleHQgZm91bmQgaW4gYWxsIHBhcnRzIG9mIGZpcnN0IGNhbmRpZGF0ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dChyZXNwb25zZSkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICBjb25zdCB0ZXh0U3RyaW5ncyA9IFtdO1xuICAgIGlmICgoX2IgPSAoX2EgPSByZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0uY29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnBhcnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiAoX2QgPSAoX2MgPSByZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbMF0uY29udGVudCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnBhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGV4dFN0cmluZ3MucHVzaChwYXJ0LnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnQuZXhlY3V0YWJsZUNvZGUpIHtcbiAgICAgICAgICAgICAgICB0ZXh0U3RyaW5ncy5wdXNoKFwiXFxuYGBgXCIgK1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LmV4ZWN1dGFibGVDb2RlLmxhbmd1YWdlICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgICAgICAgIHBhcnQuZXhlY3V0YWJsZUNvZGUuY29kZSArXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuYGBgXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRleHRTdHJpbmdzLnB1c2goXCJcXG5gYGBcXG5cIiArIHBhcnQuY29kZUV4ZWN1dGlvblJlc3VsdC5vdXRwdXQgKyBcIlxcbmBgYFxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGV4dFN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGV4dFN0cmluZ3Muam9pbihcIlwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyBmdW5jdGlvbkNhbGwgb2YgZmlyc3QgY2FuZGlkYXRlLlxuICovXG5mdW5jdGlvbiBnZXRGdW5jdGlvbkNhbGxzKHJlc3BvbnNlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgIGNvbnN0IGZ1bmN0aW9uQ2FsbHMgPSBbXTtcbiAgICBpZiAoKF9iID0gKF9hID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wYXJ0cykge1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgKF9kID0gKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdLmNvbnRlbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQuZnVuY3Rpb25DYWxsKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb25DYWxscy5wdXNoKHBhcnQuZnVuY3Rpb25DYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnVuY3Rpb25DYWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbkNhbGxzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5jb25zdCBiYWRGaW5pc2hSZWFzb25zID0gW1xuICAgIEZpbmlzaFJlYXNvbi5SRUNJVEFUSU9OLFxuICAgIEZpbmlzaFJlYXNvbi5TQUZFVFksXG4gICAgRmluaXNoUmVhc29uLkxBTkdVQUdFLFxuXTtcbmZ1bmN0aW9uIGhhZEJhZEZpbmlzaFJlYXNvbihjYW5kaWRhdGUpIHtcbiAgICByZXR1cm4gKCEhY2FuZGlkYXRlLmZpbmlzaFJlYXNvbiAmJlxuICAgICAgICBiYWRGaW5pc2hSZWFzb25zLmluY2x1ZGVzKGNhbmRpZGF0ZS5maW5pc2hSZWFzb24pKTtcbn1cbmZ1bmN0aW9uIGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3BvbnNlKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICAgIGlmICgoIXJlc3BvbnNlLmNhbmRpZGF0ZXMgfHwgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPT09IDApICYmXG4gICAgICAgIHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCJSZXNwb25zZSB3YXMgYmxvY2tlZFwiO1xuICAgICAgICBpZiAoKF9hID0gcmVzcG9uc2UucHJvbXB0RmVlZGJhY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ibG9ja1JlYXNvbikge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBgIGR1ZSB0byAke3Jlc3BvbnNlLnByb21wdEZlZWRiYWNrLmJsb2NrUmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfYiA9IHJlc3BvbnNlLnByb21wdEZlZWRiYWNrKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYmxvY2tSZWFzb25NZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IGA6ICR7cmVzcG9uc2UucHJvbXB0RmVlZGJhY2suYmxvY2tSZWFzb25NZXNzYWdlfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKF9jID0gcmVzcG9uc2UuY2FuZGlkYXRlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jWzBdKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1swXTtcbiAgICAgICAgaWYgKGhhZEJhZEZpbmlzaFJlYXNvbihmaXJzdENhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYENhbmRpZGF0ZSB3YXMgYmxvY2tlZCBkdWUgdG8gJHtmaXJzdENhbmRpZGF0ZS5maW5pc2hSZWFzb259YDtcbiAgICAgICAgICAgIGlmIChmaXJzdENhbmRpZGF0ZS5maW5pc2hNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBgOiAke2ZpcnN0Q2FuZGlkYXRlLmZpbmlzaE1lc3NhZ2V9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuY29uc3QgcmVzcG9uc2VMaW5lUkUgPSAvXmRhdGFcXDogKC4qKSg/OlxcblxcbnxcXHJcXHJ8XFxyXFxuXFxyXFxuKS87XG4vKipcbiAqIFByb2Nlc3MgYSByZXNwb25zZS5ib2R5IHN0cmVhbSBmcm9tIHRoZSBiYWNrZW5kIGFuZCByZXR1cm4gYW5cbiAqIGl0ZXJhdG9yIHRoYXQgcHJvdmlkZXMgb25lIGNvbXBsZXRlIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIGF0IGEgdGltZVxuICogYW5kIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBzaW5nbGUgYWdncmVnYXRlZFxuICogR2VuZXJhdGVDb250ZW50UmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHJlc3BvbnNlIC0gUmVzcG9uc2UgZnJvbSBhIGZldGNoIGNhbGxcbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc1N0cmVhbShyZXNwb25zZSkge1xuICAgIGNvbnN0IGlucHV0U3RyZWFtID0gcmVzcG9uc2UuYm9keS5waXBlVGhyb3VnaChuZXcgVGV4dERlY29kZXJTdHJlYW0oXCJ1dGY4XCIsIHsgZmF0YWw6IHRydWUgfSkpO1xuICAgIGNvbnN0IHJlc3BvbnNlU3RyZWFtID0gZ2V0UmVzcG9uc2VTdHJlYW0oaW5wdXRTdHJlYW0pO1xuICAgIGNvbnN0IFtzdHJlYW0xLCBzdHJlYW0yXSA9IHJlc3BvbnNlU3RyZWFtLnRlZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0cmVhbTogZ2VuZXJhdGVSZXNwb25zZVNlcXVlbmNlKHN0cmVhbTEpLFxuICAgICAgICByZXNwb25zZTogZ2V0UmVzcG9uc2VQcm9taXNlKHN0cmVhbTIpLFxuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBnZXRSZXNwb25zZVByb21pc2Uoc3RyZWFtKSB7XG4gICAgY29uc3QgYWxsUmVzcG9uc2VzID0gW107XG4gICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkSGVscGVycyhhZ2dyZWdhdGVSZXNwb25zZXMoYWxsUmVzcG9uc2VzKSk7XG4gICAgICAgIH1cbiAgICAgICAgYWxsUmVzcG9uc2VzLnB1c2godmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUmVzcG9uc2VTZXF1ZW5jZShzdHJlYW0pIHtcbiAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBnZW5lcmF0ZVJlc3BvbnNlU2VxdWVuY2VfMSgpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0geWllbGQgX19hd2FpdChyZWFkZXIucmVhZCgpKTtcbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5aWVsZCB5aWVsZCBfX2F3YWl0KGFkZEhlbHBlcnModmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBSZWFkcyBhIHJhdyBzdHJlYW0gZnJvbSB0aGUgZmV0Y2ggcmVzcG9uc2UgYW5kIGpvaW4gaW5jb21wbGV0ZVxuICogY2h1bmtzLCByZXR1cm5pbmcgYSBuZXcgc3RyZWFtIHRoYXQgcHJvdmlkZXMgYSBzaW5nbGUgY29tcGxldGVcbiAqIEdlbmVyYXRlQ29udGVudFJlc3BvbnNlIGluIGVhY2ggaXRlcmF0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRSZXNwb25zZVN0cmVhbShpbnB1dFN0cmVhbSkge1xuICAgIGNvbnN0IHJlYWRlciA9IGlucHV0U3RyZWFtLmdldFJlYWRlcigpO1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgICAgIHN0YXJ0KGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGV4dCA9IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gcHVtcCgpO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHVtcCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWQoKS50aGVuKCh7IHZhbHVlLCBkb25lIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV4dC50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzdHJlYW1cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gY3VycmVudFRleHQubWF0Y2gocmVzcG9uc2VMaW5lUkUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRSZXNwb25zZSA9IEpTT04ucGFyc2UobWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihgRXJyb3IgcGFyc2luZyBKU09OIHJlc3BvbnNlOiBcIiR7bWF0Y2hbMV19XCJgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHBhcnNlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0ID0gY3VycmVudFRleHQuc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGN1cnJlbnRUZXh0Lm1hdGNoKHJlc3BvbnNlTGluZVJFKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVtcCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBzdHJlYW07XG59XG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW4gYXJyYXkgb2YgYEdlbmVyYXRlQ29udGVudFJlc3BvbnNlYHMgaW50byBhIHNpbmdsZVxuICogR2VuZXJhdGVDb250ZW50UmVzcG9uc2UuXG4gKi9cbmZ1bmN0aW9uIGFnZ3JlZ2F0ZVJlc3BvbnNlcyhyZXNwb25zZXMpIHtcbiAgICBjb25zdCBsYXN0UmVzcG9uc2UgPSByZXNwb25zZXNbcmVzcG9uc2VzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGFnZ3JlZ2F0ZWRSZXNwb25zZSA9IHtcbiAgICAgICAgcHJvbXB0RmVlZGJhY2s6IGxhc3RSZXNwb25zZSA9PT0gbnVsbCB8fCBsYXN0UmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RSZXNwb25zZS5wcm9tcHRGZWVkYmFjayxcbiAgICB9O1xuICAgIGZvciAoY29uc3QgcmVzcG9uc2Ugb2YgcmVzcG9uc2VzKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiByZXNwb25zZS5jYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IGNhbmRpZGF0ZS5pbmRleDtcbiAgICAgICAgICAgICAgICBpZiAoIWFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlZFJlc3BvbnNlLmNhbmRpZGF0ZXNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogY2FuZGlkYXRlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBLZWVwIG92ZXJ3cml0aW5nLCB0aGUgbGFzdCBvbmUgd2lsbCBiZSBmaW5hbFxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2ldLmNpdGF0aW9uTWV0YWRhdGEgPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuY2l0YXRpb25NZXRhZGF0YTtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5ncm91bmRpbmdNZXRhZGF0YSA9XG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZS5ncm91bmRpbmdNZXRhZGF0YTtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5maW5pc2hSZWFzb24gPSBjYW5kaWRhdGUuZmluaXNoUmVhc29uO1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2ldLmZpbmlzaE1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUuZmluaXNoTWVzc2FnZTtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5zYWZldHlSYXRpbmdzID1cbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlLnNhZmV0eVJhdGluZ3M7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ2FuZGlkYXRlcyBzaG91bGQgYWx3YXlzIGhhdmUgY29udGVudCBhbmQgcGFydHMsIGJ1dCB0aGlzIGhhbmRsZXNcbiAgICAgICAgICAgICAgICAgKiBwb3NzaWJsZSBtYWxmb3JtZWQgcmVzcG9uc2VzLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmIChjYW5kaWRhdGUuY29udGVudCAmJiBjYW5kaWRhdGUuY29udGVudC5wYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2ldLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS5jYW5kaWRhdGVzW2ldLmNvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogY2FuZGlkYXRlLmNvbnRlbnQucm9sZSB8fCBcInVzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0czogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhcnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIGNhbmRpZGF0ZS5jb250ZW50LnBhcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFydC50ZXh0ID0gcGFydC50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQuZnVuY3Rpb25DYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFydC5mdW5jdGlvbkNhbGwgPSBwYXJ0LmZ1bmN0aW9uQ2FsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LmV4ZWN1dGFibGVDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFydC5leGVjdXRhYmxlQ29kZSA9IHBhcnQuZXhlY3V0YWJsZUNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydC5jb2RlRXhlY3V0aW9uUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGFydC5jb2RlRXhlY3V0aW9uUmVzdWx0ID0gcGFydC5jb2RlRXhlY3V0aW9uUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld1BhcnQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BhcnQudGV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkUmVzcG9uc2UuY2FuZGlkYXRlc1tpXS5jb250ZW50LnBhcnRzLnB1c2gobmV3UGFydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlLnVzYWdlTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZWRSZXNwb25zZS51c2FnZU1ldGFkYXRhID0gcmVzcG9uc2UudXNhZ2VNZXRhZGF0YTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWdncmVnYXRlZFJlc3BvbnNlO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50U3RyZWFtKGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suU1RSRUFNX0dFTkVSQVRFX0NPTlRFTlQsIGFwaUtleSwgXG4gICAgLyogc3RyZWFtICovIHRydWUsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcHJvY2Vzc1N0cmVhbShyZXNwb25zZSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUNvbnRlbnQoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgVGFzay5HRU5FUkFURV9DT05URU5ULCBhcGlLZXksIFxuICAgIC8qIHN0cmVhbSAqLyBmYWxzZSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIGNvbnN0IHJlc3BvbnNlSnNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBlbmhhbmNlZFJlc3BvbnNlID0gYWRkSGVscGVycyhyZXNwb25zZUpzb24pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlOiBlbmhhbmNlZFJlc3BvbnNlLFxuICAgIH07XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5mdW5jdGlvbiBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihpbnB1dCkge1xuICAgIC8vIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBbeyB0ZXh0OiBpbnB1dCB9XSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dC50ZXh0KSB7XG4gICAgICAgIHJldHVybiB7IHJvbGU6IFwic3lzdGVtXCIsIHBhcnRzOiBbaW5wdXRdIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlucHV0LnBhcnRzKSB7XG4gICAgICAgIGlmICghaW5wdXQucm9sZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgcm9sZTogXCJzeXN0ZW1cIiwgcGFydHM6IGlucHV0LnBhcnRzIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBmb3JtYXROZXdDb250ZW50KHJlcXVlc3QpIHtcbiAgICBsZXQgbmV3UGFydHMgPSBbXTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3QgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbmV3UGFydHMgPSBbeyB0ZXh0OiByZXF1ZXN0IH1dO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0T3JTdHJpbmcgb2YgcmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0T3JTdHJpbmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdQYXJ0cy5wdXNoKHsgdGV4dDogcGFydE9yU3RyaW5nIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3UGFydHMucHVzaChwYXJ0T3JTdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhc3NpZ25Sb2xlVG9QYXJ0c0FuZFZhbGlkYXRlU2VuZE1lc3NhZ2VSZXF1ZXN0KG5ld1BhcnRzKTtcbn1cbi8qKlxuICogV2hlbiBtdWx0aXBsZSBQYXJ0IHR5cGVzIChpLmUuIEZ1bmN0aW9uUmVzcG9uc2VQYXJ0IGFuZCBUZXh0UGFydCkgYXJlXG4gKiBwYXNzZWQgaW4gYSBzaW5nbGUgUGFydCBhcnJheSwgd2UgbWF5IG5lZWQgdG8gYXNzaWduIGRpZmZlcmVudCByb2xlcyB0byBlYWNoXG4gKiBwYXJ0LiBDdXJyZW50bHkgb25seSBGdW5jdGlvblJlc3BvbnNlUGFydCByZXF1aXJlcyBhIHJvbGUgb3RoZXIgdGhhbiAndXNlcicuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHBhcnRzIEFycmF5IG9mIHBhcnRzIHRvIHBhc3MgdG8gdGhlIG1vZGVsXG4gKiBAcmV0dXJucyBBcnJheSBvZiBjb250ZW50IGl0ZW1zXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblJvbGVUb1BhcnRzQW5kVmFsaWRhdGVTZW5kTWVzc2FnZVJlcXVlc3QocGFydHMpIHtcbiAgICBjb25zdCB1c2VyQ29udGVudCA9IHsgcm9sZTogXCJ1c2VyXCIsIHBhcnRzOiBbXSB9O1xuICAgIGNvbnN0IGZ1bmN0aW9uQ29udGVudCA9IHsgcm9sZTogXCJmdW5jdGlvblwiLCBwYXJ0czogW10gfTtcbiAgICBsZXQgaGFzVXNlckNvbnRlbnQgPSBmYWxzZTtcbiAgICBsZXQgaGFzRnVuY3Rpb25Db250ZW50ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICAgIGlmIChcImZ1bmN0aW9uUmVzcG9uc2VcIiBpbiBwYXJ0KSB7XG4gICAgICAgICAgICBmdW5jdGlvbkNvbnRlbnQucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICAgIGhhc0Z1bmN0aW9uQ29udGVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1c2VyQ29udGVudC5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgaGFzVXNlckNvbnRlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChoYXNVc2VyQ29udGVudCAmJiBoYXNGdW5jdGlvbkNvbnRlbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiV2l0aGluIGEgc2luZ2xlIG1lc3NhZ2UsIEZ1bmN0aW9uUmVzcG9uc2UgY2Fubm90IGJlIG1peGVkIHdpdGggb3RoZXIgdHlwZSBvZiBwYXJ0IGluIHRoZSByZXF1ZXN0IGZvciBzZW5kaW5nIGNoYXQgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIGlmICghaGFzVXNlckNvbnRlbnQgJiYgIWhhc0Z1bmN0aW9uQ29udGVudCkge1xuICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoXCJObyBjb250ZW50IGlzIHByb3ZpZGVkIGZvciBzZW5kaW5nIGNoYXQgbWVzc2FnZS5cIik7XG4gICAgfVxuICAgIGlmIChoYXNVc2VyQ29udGVudCkge1xuICAgICAgICByZXR1cm4gdXNlckNvbnRlbnQ7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbkNvbnRlbnQ7XG59XG5mdW5jdGlvbiBmb3JtYXRDb3VudFRva2Vuc0lucHV0KHBhcmFtcywgbW9kZWxQYXJhbXMpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QgPSB7XG4gICAgICAgIG1vZGVsOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMubW9kZWwsXG4gICAgICAgIGdlbmVyYXRpb25Db25maWc6IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5nZW5lcmF0aW9uQ29uZmlnLFxuICAgICAgICBzYWZldHlTZXR0aW5nczogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnNhZmV0eVNldHRpbmdzLFxuICAgICAgICB0b29sczogbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLnRvb2xzLFxuICAgICAgICB0b29sQ29uZmlnOiBtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXMudG9vbENvbmZpZyxcbiAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IG1vZGVsUGFyYW1zID09PSBudWxsIHx8IG1vZGVsUGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RlbFBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbixcbiAgICAgICAgY2FjaGVkQ29udGVudDogKF9hID0gbW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lLFxuICAgICAgICBjb250ZW50czogW10sXG4gICAgfTtcbiAgICBjb25zdCBjb250YWluc0dlbmVyYXRlQ29udGVudFJlcXVlc3QgPSBwYXJhbXMuZ2VuZXJhdGVDb250ZW50UmVxdWVzdCAhPSBudWxsO1xuICAgIGlmIChwYXJhbXMuY29udGVudHMpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5zR2VuZXJhdGVDb250ZW50UmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ291bnRUb2tlbnNSZXF1ZXN0IG11c3QgaGF2ZSBvbmUgb2YgY29udGVudHMgb3IgZ2VuZXJhdGVDb250ZW50UmVxdWVzdCwgbm90IGJvdGguXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QuY29udGVudHMgPSBwYXJhbXMuY29udGVudHM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRhaW5zR2VuZXJhdGVDb250ZW50UmVxdWVzdCkge1xuICAgICAgICBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmb3JtYXR0ZWRHZW5lcmF0ZUNvbnRlbnRSZXF1ZXN0KSwgcGFyYW1zLmdlbmVyYXRlQ29udGVudFJlcXVlc3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gQXJyYXkgb3Igc3RyaW5nXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHBhcmFtcyk7XG4gICAgICAgIGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QuY29udGVudHMgPSBbY29udGVudF07XG4gICAgfVxuICAgIHJldHVybiB7IGdlbmVyYXRlQ29udGVudFJlcXVlc3Q6IGZvcm1hdHRlZEdlbmVyYXRlQ29udGVudFJlcXVlc3QgfTtcbn1cbmZ1bmN0aW9uIGZvcm1hdEdlbmVyYXRlQ29udGVudElucHV0KHBhcmFtcykge1xuICAgIGxldCBmb3JtYXR0ZWRSZXF1ZXN0O1xuICAgIGlmIChwYXJhbXMuY29udGVudHMpIHtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdCA9IHBhcmFtcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEFycmF5IG9yIHN0cmluZ1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZm9ybWF0TmV3Q29udGVudChwYXJhbXMpO1xuICAgICAgICBmb3JtYXR0ZWRSZXF1ZXN0ID0geyBjb250ZW50czogW2NvbnRlbnRdIH07XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc3lzdGVtSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgZm9ybWF0dGVkUmVxdWVzdC5zeXN0ZW1JbnN0cnVjdGlvbiA9IGZvcm1hdFN5c3RlbUluc3RydWN0aW9uKHBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWRSZXF1ZXN0O1xufVxuZnVuY3Rpb24gZm9ybWF0RW1iZWRDb250ZW50SW5wdXQocGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheShwYXJhbXMpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmb3JtYXROZXdDb250ZW50KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiB7IGNvbnRlbnQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8vIGh0dHBzOi8vYWkuZ29vZ2xlLmRldi9hcGkvcmVzdC92MWJldGEvQ29udGVudCNwYXJ0XG5jb25zdCBWQUxJRF9QQVJUX0ZJRUxEUyA9IFtcbiAgICBcInRleHRcIixcbiAgICBcImlubGluZURhdGFcIixcbiAgICBcImZ1bmN0aW9uQ2FsbFwiLFxuICAgIFwiZnVuY3Rpb25SZXNwb25zZVwiLFxuICAgIFwiZXhlY3V0YWJsZUNvZGVcIixcbiAgICBcImNvZGVFeGVjdXRpb25SZXN1bHRcIixcbl07XG5jb25zdCBWQUxJRF9QQVJUU19QRVJfUk9MRSA9IHtcbiAgICB1c2VyOiBbXCJ0ZXh0XCIsIFwiaW5saW5lRGF0YVwiXSxcbiAgICBmdW5jdGlvbjogW1wiZnVuY3Rpb25SZXNwb25zZVwiXSxcbiAgICBtb2RlbDogW1widGV4dFwiLCBcImZ1bmN0aW9uQ2FsbFwiLCBcImV4ZWN1dGFibGVDb2RlXCIsIFwiY29kZUV4ZWN1dGlvblJlc3VsdFwiXSxcbiAgICAvLyBTeXN0ZW0gaW5zdHJ1Y3Rpb25zIHNob3VsZG4ndCBiZSBpbiBoaXN0b3J5IGFueXdheS5cbiAgICBzeXN0ZW06IFtcInRleHRcIl0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVDaGF0SGlzdG9yeShoaXN0b3J5KSB7XG4gICAgbGV0IHByZXZDb250ZW50ID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjdXJyQ29udGVudCBvZiBoaXN0b3J5KSB7XG4gICAgICAgIGNvbnN0IHsgcm9sZSwgcGFydHMgfSA9IGN1cnJDb250ZW50O1xuICAgICAgICBpZiAoIXByZXZDb250ZW50ICYmIHJvbGUgIT09IFwidXNlclwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYEZpcnN0IGNvbnRlbnQgc2hvdWxkIGJlIHdpdGggcm9sZSAndXNlcicsIGdvdCAke3JvbGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQT1NTSUJMRV9ST0xFUy5pbmNsdWRlcyhyb2xlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKGBFYWNoIGl0ZW0gc2hvdWxkIGluY2x1ZGUgcm9sZSBmaWVsZC4gR290ICR7cm9sZX0gYnV0IHZhbGlkIHJvbGVzIGFyZTogJHtKU09OLnN0cmluZ2lmeShQT1NTSUJMRV9ST0xFUyl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiQ29udGVudCBzaG91bGQgaGF2ZSAncGFydHMnIHByb3BlcnR5IHdpdGggYW4gYXJyYXkgb2YgUGFydHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSUVycm9yKFwiRWFjaCBDb250ZW50IHNob3VsZCBoYXZlIGF0IGxlYXN0IG9uZSBwYXJ0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvdW50RmllbGRzID0ge1xuICAgICAgICAgICAgdGV4dDogMCxcbiAgICAgICAgICAgIGlubGluZURhdGE6IDAsXG4gICAgICAgICAgICBmdW5jdGlvbkNhbGw6IDAsXG4gICAgICAgICAgICBmdW5jdGlvblJlc3BvbnNlOiAwLFxuICAgICAgICAgICAgZmlsZURhdGE6IDAsXG4gICAgICAgICAgICBleGVjdXRhYmxlQ29kZTogMCxcbiAgICAgICAgICAgIGNvZGVFeGVjdXRpb25SZXN1bHQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgVkFMSURfUEFSVF9GSUVMRFMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRGaWVsZHNba2V5XSArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZFBhcnRzID0gVkFMSURfUEFSVFNfUEVSX1JPTEVbcm9sZV07XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFZBTElEX1BBUlRfRklFTERTKSB7XG4gICAgICAgICAgICBpZiAoIXZhbGlkUGFydHMuaW5jbHVkZXMoa2V5KSAmJiBjb3VudEZpZWxkc1trZXldID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHb29nbGVHZW5lcmF0aXZlQUlFcnJvcihgQ29udGVudCB3aXRoIHJvbGUgJyR7cm9sZX0nIGNhbid0IGNvbnRhaW4gJyR7a2V5fScgcGFydGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByZXZDb250ZW50ID0gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIERvIG5vdCBsb2cgYSBtZXNzYWdlIGZvciB0aGlzIGVycm9yLlxuICovXG5jb25zdCBTSUxFTlRfRVJST1IgPSBcIlNJTEVOVF9FUlJPUlwiO1xuLyoqXG4gKiBDaGF0U2Vzc2lvbiBjbGFzcyB0aGF0IGVuYWJsZXMgc2VuZGluZyBjaGF0IG1lc3NhZ2VzIGFuZCBzdG9yZXNcbiAqIGhpc3Rvcnkgb2Ygc2VudCBhbmQgcmVjZWl2ZWQgbWVzc2FnZXMgc28gZmFyLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgQ2hhdFNlc3Npb24ge1xuICAgIGNvbnN0cnVjdG9yKGFwaUtleSwgbW9kZWwsIHBhcmFtcywgX3JlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5fcmVxdWVzdE9wdGlvbnMgPSBfcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIHRoaXMuX2hpc3RvcnkgPSBbXTtcbiAgICAgICAgdGhpcy5fc2VuZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5fYXBpS2V5ID0gYXBpS2V5O1xuICAgICAgICBpZiAocGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmhpc3RvcnkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlQ2hhdEhpc3RvcnkocGFyYW1zLmhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5faGlzdG9yeSA9IHBhcmFtcy5oaXN0b3J5O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNoYXQgaGlzdG9yeSBzbyBmYXIuIEJsb2NrZWQgcHJvbXB0cyBhcmUgbm90IGFkZGVkIHRvIGhpc3RvcnkuXG4gICAgICogQmxvY2tlZCBjYW5kaWRhdGVzIGFyZSBub3QgYWRkZWQgdG8gaGlzdG9yeSwgbm9yIGFyZSB0aGUgcHJvbXB0cyB0aGF0XG4gICAgICogZ2VuZXJhdGVkIHRoZW0uXG4gICAgICovXG4gICAgYXN5bmMgZ2V0SGlzdG9yeSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2VuZFByb21pc2U7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGNoYXQgbWVzc2FnZSBhbmQgcmVjZWl2ZXMgYSBub24tc3RyZWFtaW5nXG4gICAgICoge0BsaW5rIEdlbmVyYXRlQ29udGVudFJlc3VsdH0uXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kTWVzc2FnZShyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xuICAgICAgICBhd2FpdCB0aGlzLl9zZW5kUHJvbWlzZTtcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IGZvcm1hdE5ld0NvbnRlbnQocmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlQ29udGVudFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBzYWZldHlTZXR0aW5nczogKF9hID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zYWZldHlTZXR0aW5ncyxcbiAgICAgICAgICAgIGdlbmVyYXRpb25Db25maWc6IChfYiA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2VuZXJhdGlvbkNvbmZpZyxcbiAgICAgICAgICAgIHRvb2xzOiAoX2MgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnRvb2xzLFxuICAgICAgICAgICAgdG9vbENvbmZpZzogKF9kID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC50b29sQ29uZmlnLFxuICAgICAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IChfZSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Uuc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICBjYWNoZWRDb250ZW50OiAoX2YgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmNhY2hlZENvbnRlbnQsXG4gICAgICAgICAgICBjb250ZW50czogWy4uLnRoaXMuX2hpc3RvcnksIG5ld0NvbnRlbnRdLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0T3B0aW9ucyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgbGV0IGZpbmFsUmVzdWx0O1xuICAgICAgICAvLyBBZGQgb250byB0aGUgY2hhaW4uXG4gICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gdGhpcy5fc2VuZFByb21pc2VcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGdlbmVyYXRlQ29udGVudCh0aGlzLl9hcGlLZXksIHRoaXMubW9kZWwsIGdlbmVyYXRlQ29udGVudFJlcXVlc3QsIGNoYXRTZXNzaW9uUmVxdWVzdE9wdGlvbnMpKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXNwb25zZS5jYW5kaWRhdGVzICYmXG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChuZXdDb250ZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnQgPSBPYmplY3QuYXNzaWduKHsgcGFydHM6IFtdLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzcG9uc2Ugc2VlbXMgdG8gY29tZSBiYWNrIHdpdGhvdXQgYSByb2xlIHNldC5cbiAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJtb2RlbFwiIH0sIChfYSA9IHJlc3VsdC5yZXNwb25zZS5jYW5kaWRhdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKHJlc3BvbnNlQ29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0Vycm9yTWVzc2FnZSA9IGZvcm1hdEJsb2NrRXJyb3JNZXNzYWdlKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrRXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihgc2VuZE1lc3NhZ2UoKSB3YXMgdW5zdWNjZXNzZnVsLiAke2Jsb2NrRXJyb3JNZXNzYWdlfS4gSW5zcGVjdCByZXNwb25zZSBvYmplY3QgZm9yIGRldGFpbHMuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9zZW5kUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIGZpbmFsUmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGNoYXQgbWVzc2FnZSBhbmQgcmVjZWl2ZXMgdGhlIHJlc3BvbnNlIGFzIGFcbiAgICAgKiB7QGxpbmsgR2VuZXJhdGVDb250ZW50U3RyZWFtUmVzdWx0fSBjb250YWluaW5nIGFuIGl0ZXJhYmxlIHN0cmVhbVxuICAgICAqIGFuZCBhIHJlc3BvbnNlIHByb21pc2UuXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kTWVzc2FnZVN0cmVhbShyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xuICAgICAgICBhd2FpdCB0aGlzLl9zZW5kUHJvbWlzZTtcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IGZvcm1hdE5ld0NvbnRlbnQocmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlQ29udGVudFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBzYWZldHlTZXR0aW5nczogKF9hID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zYWZldHlTZXR0aW5ncyxcbiAgICAgICAgICAgIGdlbmVyYXRpb25Db25maWc6IChfYiA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2VuZXJhdGlvbkNvbmZpZyxcbiAgICAgICAgICAgIHRvb2xzOiAoX2MgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnRvb2xzLFxuICAgICAgICAgICAgdG9vbENvbmZpZzogKF9kID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC50b29sQ29uZmlnLFxuICAgICAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IChfZSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Uuc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICBjYWNoZWRDb250ZW50OiAoX2YgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmNhY2hlZENvbnRlbnQsXG4gICAgICAgICAgICBjb250ZW50czogWy4uLnRoaXMuX2hpc3RvcnksIG5ld0NvbnRlbnRdLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjaGF0U2Vzc2lvblJlcXVlc3RPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0T3B0aW9ucyksIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgY29uc3Qgc3RyZWFtUHJvbWlzZSA9IGdlbmVyYXRlQ29udGVudFN0cmVhbSh0aGlzLl9hcGlLZXksIHRoaXMubW9kZWwsIGdlbmVyYXRlQ29udGVudFJlcXVlc3QsIGNoYXRTZXNzaW9uUmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICAvLyBBZGQgb250byB0aGUgY2hhaW4uXG4gICAgICAgIHRoaXMuX3NlbmRQcm9taXNlID0gdGhpcy5fc2VuZFByb21pc2VcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHN0cmVhbVByb21pc2UpXG4gICAgICAgICAgICAvLyBUaGlzIG11c3QgYmUgaGFuZGxlZCB0byBhdm9pZCB1bmhhbmRsZWQgcmVqZWN0aW9uLCBidXQganVtcFxuICAgICAgICAgICAgLy8gdG8gdGhlIGZpbmFsIGNhdGNoIGJsb2NrIHdpdGggYSBsYWJlbCB0byBub3QgbG9nIHRoaXMgZXJyb3IuXG4gICAgICAgICAgICAuY2F0Y2goKF9pZ25vcmVkKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoU0lMRU5UX0VSUk9SKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChzdHJlYW1SZXN1bHQpID0+IHN0cmVhbVJlc3VsdC5yZXNwb25zZSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNhbmRpZGF0ZXMgJiYgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKG5ld0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudCA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3BvbnNlLmNhbmRpZGF0ZXNbMF0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzcG9uc2Ugc2VlbXMgdG8gY29tZSBiYWNrIHdpdGhvdXQgYSByb2xlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlQ29udGVudC5yb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQ29udGVudC5yb2xlID0gXCJtb2RlbFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2gocmVzcG9uc2VDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrRXJyb3JNZXNzYWdlID0gZm9ybWF0QmxvY2tFcnJvck1lc3NhZ2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja0Vycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHNlbmRNZXNzYWdlU3RyZWFtKCkgd2FzIHVuc3VjY2Vzc2Z1bC4gJHtibG9ja0Vycm9yTWVzc2FnZX0uIEluc3BlY3QgcmVzcG9uc2Ugb2JqZWN0IGZvciBkZXRhaWxzLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgLy8gRXJyb3JzIGluIHN0cmVhbVByb21pc2UgYXJlIGFscmVhZHkgY2F0Y2hhYmxlIGJ5IHRoZSB1c2VyIGFzXG4gICAgICAgICAgICAvLyBzdHJlYW1Qcm9taXNlIGlzIHJldHVybmVkLlxuICAgICAgICAgICAgLy8gQXZvaWQgZHVwbGljYXRpbmcgdGhlIGVycm9yIG1lc3NhZ2UgaW4gbG9ncy5cbiAgICAgICAgICAgIGlmIChlLm1lc3NhZ2UgIT09IFNJTEVOVF9FUlJPUikge1xuICAgICAgICAgICAgICAgIC8vIFVzZXJzIGRvIG5vdCBoYXZlIGFjY2VzcyB0byBfc2VuZFByb21pc2UgdG8gY2F0Y2ggZXJyb3JzXG4gICAgICAgICAgICAgICAgLy8gZG93bnN0cmVhbSBmcm9tIHN0cmVhbVByb21pc2UsIHNvIHRoZXkgc2hvdWxkIG5vdCB0aHJvdy5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbVByb21pc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY291bnRUb2tlbnMoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCBzaW5nbGVSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZU1vZGVsUmVxdWVzdChtb2RlbCwgVGFzay5DT1VOVF9UT0tFTlMsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyksIHNpbmdsZVJlcXVlc3RPcHRpb25zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyNCBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZW1iZWRDb250ZW50KGFwaUtleSwgbW9kZWwsIHBhcmFtcywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suRU1CRURfQ09OVEVOVCwgYXBpS2V5LCBmYWxzZSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5hc3luYyBmdW5jdGlvbiBiYXRjaEVtYmVkQ29udGVudHMoYXBpS2V5LCBtb2RlbCwgcGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IHJlcXVlc3RzV2l0aE1vZGVsID0gcGFyYW1zLnJlcXVlc3RzLm1hcCgocmVxdWVzdCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0KSwgeyBtb2RlbCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VNb2RlbFJlcXVlc3QobW9kZWwsIFRhc2suQkFUQ0hfRU1CRURfQ09OVEVOVFMsIGFwaUtleSwgZmFsc2UsIEpTT04uc3RyaW5naWZ5KHsgcmVxdWVzdHM6IHJlcXVlc3RzV2l0aE1vZGVsIH0pLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjQgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogQ2xhc3MgZm9yIGdlbmVyYXRpdmUgbW9kZWwgQVBJcy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR2VuZXJhdGl2ZU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXksIG1vZGVsUGFyYW1zLCBfcmVxdWVzdE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmFwaUtleSA9IGFwaUtleTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdE9wdGlvbnMgPSBfcmVxdWVzdE9wdGlvbnM7XG4gICAgICAgIGlmIChtb2RlbFBhcmFtcy5tb2RlbC5pbmNsdWRlcyhcIi9cIikpIHtcbiAgICAgICAgICAgIC8vIE1vZGVscyBtYXkgYmUgbmFtZWQgXCJtb2RlbHMvbW9kZWwtbmFtZVwiIG9yIFwidHVuZWRNb2RlbHMvbW9kZWwtbmFtZVwiXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWxQYXJhbXMubW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBwYXRoIGlzIG5vdCBpbmNsdWRlZCwgYXNzdW1lIGl0J3MgYSBub24tdHVuZWQgbW9kZWwuXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gYG1vZGVscy8ke21vZGVsUGFyYW1zLm1vZGVsfWA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0aW9uQ29uZmlnID0gbW9kZWxQYXJhbXMuZ2VuZXJhdGlvbkNvbmZpZyB8fCB7fTtcbiAgICAgICAgdGhpcy5zYWZldHlTZXR0aW5ncyA9IG1vZGVsUGFyYW1zLnNhZmV0eVNldHRpbmdzIHx8IFtdO1xuICAgICAgICB0aGlzLnRvb2xzID0gbW9kZWxQYXJhbXMudG9vbHM7XG4gICAgICAgIHRoaXMudG9vbENvbmZpZyA9IG1vZGVsUGFyYW1zLnRvb2xDb25maWc7XG4gICAgICAgIHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24gPSBmb3JtYXRTeXN0ZW1JbnN0cnVjdGlvbihtb2RlbFBhcmFtcy5zeXN0ZW1JbnN0cnVjdGlvbik7XG4gICAgICAgIHRoaXMuY2FjaGVkQ29udGVudCA9IG1vZGVsUGFyYW1zLmNhY2hlZENvbnRlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgc2luZ2xlIG5vbi1zdHJlYW1pbmcgY2FsbCB0byB0aGUgbW9kZWxcbiAgICAgKiBhbmQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhIHNpbmdsZSB7QGxpbmsgR2VuZXJhdGVDb250ZW50UmVzcG9uc2V9LlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZW50KHJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDb250ZW50KHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBPYmplY3QuYXNzaWduKHsgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLCBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncywgdG9vbHM6IHRoaXMudG9vbHMsIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQ6IChfYSA9IHRoaXMuY2FjaGVkQ29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUgfSwgZm9ybWF0dGVkUGFyYW1zKSwgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHNpbmdsZSBzdHJlYW1pbmcgY2FsbCB0byB0aGUgbW9kZWwgYW5kIHJldHVybnMgYW4gb2JqZWN0XG4gICAgICogY29udGFpbmluZyBhbiBpdGVyYWJsZSBzdHJlYW0gdGhhdCBpdGVyYXRlcyBvdmVyIGFsbCBjaHVua3MgaW4gdGhlXG4gICAgICogc3RyZWFtaW5nIHJlc3BvbnNlIGFzIHdlbGwgYXMgYSBwcm9taXNlIHRoYXQgcmV0dXJucyB0aGUgZmluYWxcbiAgICAgKiBhZ2dyZWdhdGVkIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogRmllbGRzIHNldCBpbiB0aGUgb3B0aW9uYWwge0BsaW5rIFNpbmdsZVJlcXVlc3RPcHRpb25zfSBwYXJhbWV0ZXIgd2lsbFxuICAgICAqIHRha2UgcHJlY2VkZW5jZSBvdmVyIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IHZhbHVlcyBwcm92aWRlZCB0b1xuICAgICAqIHtAbGluayBHb29nbGVHZW5lcmF0aXZlQUkuZ2V0R2VuZXJhdGl2ZU1vZGVsIH0uXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZW50U3RyZWFtKHJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRQYXJhbXMgPSBmb3JtYXRHZW5lcmF0ZUNvbnRlbnRJbnB1dChyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVDb250ZW50U3RyZWFtKHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBPYmplY3QuYXNzaWduKHsgZ2VuZXJhdGlvbkNvbmZpZzogdGhpcy5nZW5lcmF0aW9uQ29uZmlnLCBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncywgdG9vbHM6IHRoaXMudG9vbHMsIHRvb2xDb25maWc6IHRoaXMudG9vbENvbmZpZywgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sIGNhY2hlZENvbnRlbnQ6IChfYSA9IHRoaXMuY2FjaGVkQ29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUgfSwgZm9ybWF0dGVkUGFyYW1zKSwgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbmV3IHtAbGluayBDaGF0U2Vzc2lvbn0gaW5zdGFuY2Ugd2hpY2ggY2FuIGJlIHVzZWQgZm9yXG4gICAgICogbXVsdGktdHVybiBjaGF0cy5cbiAgICAgKi9cbiAgICBzdGFydENoYXQoc3RhcnRDaGF0UGFyYW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIG5ldyBDaGF0U2Vzc2lvbih0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgT2JqZWN0LmFzc2lnbih7IGdlbmVyYXRpb25Db25maWc6IHRoaXMuZ2VuZXJhdGlvbkNvbmZpZywgc2FmZXR5U2V0dGluZ3M6IHRoaXMuc2FmZXR5U2V0dGluZ3MsIHRvb2xzOiB0aGlzLnRvb2xzLCB0b29sQ29uZmlnOiB0aGlzLnRvb2xDb25maWcsIHN5c3RlbUluc3RydWN0aW9uOiB0aGlzLnN5c3RlbUluc3RydWN0aW9uLCBjYWNoZWRDb250ZW50OiAoX2EgPSB0aGlzLmNhY2hlZENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lIH0sIHN0YXJ0Q2hhdFBhcmFtcyksIHRoaXMuX3JlcXVlc3RPcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ291bnRzIHRoZSB0b2tlbnMgaW4gdGhlIHByb3ZpZGVkIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBGaWVsZHMgc2V0IGluIHRoZSBvcHRpb25hbCB7QGxpbmsgU2luZ2xlUmVxdWVzdE9wdGlvbnN9IHBhcmFtZXRlciB3aWxsXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gdmFsdWVzIHByb3ZpZGVkIHRvXG4gICAgICoge0BsaW5rIEdvb2dsZUdlbmVyYXRpdmVBSS5nZXRHZW5lcmF0aXZlTW9kZWwgfS5cbiAgICAgKi9cbiAgICBhc3luYyBjb3VudFRva2VucyhyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcmFtcyA9IGZvcm1hdENvdW50VG9rZW5zSW5wdXQocmVxdWVzdCwge1xuICAgICAgICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiB0aGlzLmdlbmVyYXRpb25Db25maWcsXG4gICAgICAgICAgICBzYWZldHlTZXR0aW5nczogdGhpcy5zYWZldHlTZXR0aW5ncyxcbiAgICAgICAgICAgIHRvb2xzOiB0aGlzLnRvb2xzLFxuICAgICAgICAgICAgdG9vbENvbmZpZzogdGhpcy50b29sQ29uZmlnLFxuICAgICAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IHRoaXMuc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICBjYWNoZWRDb250ZW50OiB0aGlzLmNhY2hlZENvbnRlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBjb3VudFRva2Vucyh0aGlzLmFwaUtleSwgdGhpcy5tb2RlbCwgZm9ybWF0dGVkUGFyYW1zLCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtYmVkcyB0aGUgcHJvdmlkZWQgY29udGVudC5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGVtYmVkQ29udGVudChyZXF1ZXN0LCByZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcmFtcyA9IGZvcm1hdEVtYmVkQ29udGVudElucHV0KHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBnZW5lcmF0aXZlTW9kZWxSZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmVxdWVzdE9wdGlvbnMpLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBlbWJlZENvbnRlbnQodGhpcy5hcGlLZXksIHRoaXMubW9kZWwsIGZvcm1hdHRlZFBhcmFtcywgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWJlZHMgYW4gYXJyYXkgb2Yge0BsaW5rIEVtYmVkQ29udGVudFJlcXVlc3R9cy5cbiAgICAgKlxuICAgICAqIEZpZWxkcyBzZXQgaW4gdGhlIG9wdGlvbmFsIHtAbGluayBTaW5nbGVSZXF1ZXN0T3B0aW9uc30gcGFyYW1ldGVyIHdpbGxcbiAgICAgKiB0YWtlIHByZWNlZGVuY2Ugb3ZlciB0aGUge0BsaW5rIFJlcXVlc3RPcHRpb25zfSB2YWx1ZXMgcHJvdmlkZWQgdG9cbiAgICAgKiB7QGxpbmsgR29vZ2xlR2VuZXJhdGl2ZUFJLmdldEdlbmVyYXRpdmVNb2RlbCB9LlxuICAgICAqL1xuICAgIGFzeW5jIGJhdGNoRW1iZWRDb250ZW50cyhiYXRjaEVtYmVkQ29udGVudFJlcXVlc3QsIHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGl2ZU1vZGVsUmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3JlcXVlc3RPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gYmF0Y2hFbWJlZENvbnRlbnRzKHRoaXMuYXBpS2V5LCB0aGlzLm1vZGVsLCBiYXRjaEVtYmVkQ29udGVudFJlcXVlc3QsIGdlbmVyYXRpdmVNb2RlbFJlcXVlc3RPcHRpb25zKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDI0IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRvcC1sZXZlbCBjbGFzcyBmb3IgdGhpcyBTREtcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgR29vZ2xlR2VuZXJhdGl2ZUFJIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlLZXkpIHtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYSB7QGxpbmsgR2VuZXJhdGl2ZU1vZGVsfSBpbnN0YW5jZSBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsIG5hbWUuXG4gICAgICovXG4gICAgZ2V0R2VuZXJhdGl2ZU1vZGVsKG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICBpZiAoIW1vZGVsUGFyYW1zLm1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJRXJyb3IoYE11c3QgcHJvdmlkZSBhIG1vZGVsIG5hbWUuIGAgK1xuICAgICAgICAgICAgICAgIGBFeGFtcGxlOiBnZW5haS5nZXRHZW5lcmF0aXZlTW9kZWwoeyBtb2RlbDogJ215LW1vZGVsLW5hbWUnIH0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aXZlTW9kZWwodGhpcy5hcGlLZXksIG1vZGVsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgR2VuZXJhdGl2ZU1vZGVsfSBpbnN0YW5jZSBmcm9tIHByb3ZpZGVkIGNvbnRlbnQgY2FjaGUuXG4gICAgICovXG4gICAgZ2V0R2VuZXJhdGl2ZU1vZGVsRnJvbUNhY2hlZENvbnRlbnQoY2FjaGVkQ29udGVudCwgbW9kZWxQYXJhbXMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIGlmICghY2FjaGVkQ29udGVudC5uYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoXCJDYWNoZWQgY29udGVudCBtdXN0IGNvbnRhaW4gYSBgbmFtZWAgZmllbGQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FjaGVkQ29udGVudC5tb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdvb2dsZUdlbmVyYXRpdmVBSVJlcXVlc3RJbnB1dEVycm9yKFwiQ2FjaGVkIGNvbnRlbnQgbXVzdCBjb250YWluIGEgYG1vZGVsYCBmaWVsZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5vdCBjaGVja2luZyB0b29scyBhbmQgdG9vbENvbmZpZyBmb3Igbm93IGFzIGl0IHdvdWxkIHJlcXVpcmUgYSBkZWVwXG4gICAgICAgICAqIGVxdWFsaXR5IGNvbXBhcmlzb24gYW5kIGlzbid0IGxpa2VseSB0byBiZSBhIGNvbW1vbiBjYXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgZGlzYWxsb3dlZER1cGxpY2F0ZXMgPSBbXCJtb2RlbFwiLCBcInN5c3RlbUluc3RydWN0aW9uXCJdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBkaXNhbGxvd2VkRHVwbGljYXRlcykge1xuICAgICAgICAgICAgaWYgKChtb2RlbFBhcmFtcyA9PT0gbnVsbCB8fCBtb2RlbFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWxQYXJhbXNba2V5XSkgJiZcbiAgICAgICAgICAgICAgICBjYWNoZWRDb250ZW50W2tleV0gJiZcbiAgICAgICAgICAgICAgICAobW9kZWxQYXJhbXMgPT09IG51bGwgfHwgbW9kZWxQYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsUGFyYW1zW2tleV0pICE9PSBjYWNoZWRDb250ZW50W2tleV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIm1vZGVsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxQYXJhbXNDb21wID0gbW9kZWxQYXJhbXMubW9kZWwuc3RhcnRzV2l0aChcIm1vZGVscy9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbW9kZWxQYXJhbXMubW9kZWwucmVwbGFjZShcIm1vZGVscy9cIiwgXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbW9kZWxQYXJhbXMubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlZENvbnRlbnRDb21wID0gY2FjaGVkQ29udGVudC5tb2RlbC5zdGFydHNXaXRoKFwibW9kZWxzL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBjYWNoZWRDb250ZW50Lm1vZGVsLnJlcGxhY2UoXCJtb2RlbHMvXCIsIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNhY2hlZENvbnRlbnQubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbFBhcmFtc0NvbXAgPT09IGNhY2hlZENvbnRlbnRDb21wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IoYERpZmZlcmVudCB2YWx1ZSBmb3IgXCIke2tleX1cIiBzcGVjaWZpZWQgaW4gbW9kZWxQYXJhbXNgICtcbiAgICAgICAgICAgICAgICAgICAgYCAoJHttb2RlbFBhcmFtc1trZXldfSkgYW5kIGNhY2hlZENvbnRlbnQgKCR7Y2FjaGVkQ29udGVudFtrZXldfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb2RlbFBhcmFtc0Zyb21DYWNoZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWxQYXJhbXMpLCB7IG1vZGVsOiBjYWNoZWRDb250ZW50Lm1vZGVsLCB0b29sczogY2FjaGVkQ29udGVudC50b29scywgdG9vbENvbmZpZzogY2FjaGVkQ29udGVudC50b29sQ29uZmlnLCBzeXN0ZW1JbnN0cnVjdGlvbjogY2FjaGVkQ29udGVudC5zeXN0ZW1JbnN0cnVjdGlvbiwgY2FjaGVkQ29udGVudCB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aXZlTW9kZWwodGhpcy5hcGlLZXksIG1vZGVsUGFyYW1zRnJvbUNhY2hlLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBCbG9ja1JlYXNvbiwgQ2hhdFNlc3Npb24sIER5bmFtaWNSZXRyaWV2YWxNb2RlLCBFeGVjdXRhYmxlQ29kZUxhbmd1YWdlLCBGaW5pc2hSZWFzb24sIEZ1bmN0aW9uQ2FsbGluZ01vZGUsIEdlbmVyYXRpdmVNb2RlbCwgR29vZ2xlR2VuZXJhdGl2ZUFJLCBHb29nbGVHZW5lcmF0aXZlQUlFcnJvciwgR29vZ2xlR2VuZXJhdGl2ZUFJRmV0Y2hFcnJvciwgR29vZ2xlR2VuZXJhdGl2ZUFJUmVxdWVzdElucHV0RXJyb3IsIEdvb2dsZUdlbmVyYXRpdmVBSVJlc3BvbnNlRXJyb3IsIEhhcm1CbG9ja1RocmVzaG9sZCwgSGFybUNhdGVnb3J5LCBIYXJtUHJvYmFiaWxpdHksIE91dGNvbWUsIFBPU1NJQkxFX1JPTEVTLCBTY2hlbWFUeXBlLCBUYXNrVHlwZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLG1CQUF5QztBQUN6QyxJQUFBQyxlQUFpQjs7O0FDRGpCLHNCQUE0QztBQUM1QyxnQkFBZTtBQUNmLGtCQUFpQjs7O0FDR2pCLElBQUk7QUFBQSxDQUNILFNBQVVDLGFBQVk7QUFFbkIsRUFBQUEsWUFBVyxRQUFRLElBQUk7QUFFdkIsRUFBQUEsWUFBVyxRQUFRLElBQUk7QUFFdkIsRUFBQUEsWUFBVyxTQUFTLElBQUk7QUFFeEIsRUFBQUEsWUFBVyxTQUFTLElBQUk7QUFFeEIsRUFBQUEsWUFBVyxPQUFPLElBQUk7QUFFdEIsRUFBQUEsWUFBVyxRQUFRLElBQUk7QUFDM0IsR0FB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QXVCLENBQUMsY0FBYyxnQkFBZ0IsV0FBVztBQUUzRSxtQkFBZSxVQUFVLGFBQUFBLFFBQUssS0FBSyxXQUFXLGFBQWE7QUFDM0QsbUJBQWUsa0JBQWtCO0FBQ2pDLG1CQUFlLG1CQUFtQjtBQUFBLEVBQ3BDLENBQUM7QUFDSCxDQUFDO0FBRUQscUJBQUksVUFBVSxFQUFFLEtBQUssTUFBTTtBQUN6QixzQkFBb0I7QUFDcEIsZUFBYTtBQUViLHVCQUFJLEdBQUcsWUFBWSxNQUFNO0FBQ3ZCLFFBQUksK0JBQWMsY0FBYyxFQUFFLFdBQVcsR0FBRztBQUM5QyxtQkFBYTtBQUFBLElBQ2Y7QUFBQSxFQUNGLENBQUM7QUFDSCxDQUFDO0FBRUQscUJBQUksR0FBRyxxQkFBcUIsTUFBTTtBQUNoQyxNQUFJLFFBQVEsYUFBYSxVQUFVO0FBQ2pDLHlCQUFJLEtBQUs7QUFBQSxFQUNYO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2VsZWN0cm9uIiwgImltcG9ydF9wYXRoIiwgIlNjaGVtYVR5cGUiLCAiRXhlY3V0YWJsZUNvZGVMYW5ndWFnZSIsICJPdXRjb21lIiwgIkhhcm1DYXRlZ29yeSIsICJIYXJtQmxvY2tUaHJlc2hvbGQiLCAiSGFybVByb2JhYmlsaXR5IiwgIkJsb2NrUmVhc29uIiwgIkZpbmlzaFJlYXNvbiIsICJUYXNrVHlwZSIsICJGdW5jdGlvbkNhbGxpbmdNb2RlIiwgIkR5bmFtaWNSZXRyaWV2YWxNb2RlIiwgIlRhc2siLCAiX2EiLCAicGF0aCIsICJmcyIsICJwYXRoIl0KfQo=
