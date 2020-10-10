(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("flui", [], factory);
	else if(typeof exports === 'object')
		exports["flui"] = factory();
	else
		root["flui"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateflui"];
/******/ 	window["webpackHotUpdateflui"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "14398327094832c26cd3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "flui";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.ts")(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/createClass.js":
/*!*************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/createClass.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/defineProperty.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/extends.js":
/*!*********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/extends.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/get.js":
/*!*****************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/get.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(/*! ./superPropBase */ "../node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/inherits.js":
/*!**********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/inherits.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/superPropBase.js":
/*!***************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "../node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "../node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/typeof.js":
/*!********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/typeof.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!****************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "../node_modules/@babel/runtime/regenerator/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/regenerator/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "../node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "../node_modules/regenerator-runtime/runtime.js":
/*!******************************************************!*\
  !*** ../node_modules/regenerator-runtime/runtime.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./asset/asseturl.ts":
/*!***************************!*\
  !*** ./asset/asseturl.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetURL = void 0;

var misc_1 = __webpack_require__(/*! ../misc */ "./misc/index.ts");

var load_manager_1 = __webpack_require__(/*! ./load_manager */ "./asset/load_manager.ts");

var AssetURL = function () {
  function AssetURL(url) {
    (0, _classCallCheck2.default)(this, AssetURL);
    this._url = url ? load_manager_1.LoadManager.resolveURL(url) : null;
    this._urlObject = this._url ? new URL(this._url) : null;

    this._parseDataURI();
  }

  (0, _createClass2.default)(AssetURL, [{
    key: "isDataURI",
    value: function isDataURI() {
      return !!this._mimeType;
    }
  }, {
    key: "_parseDataURI",
    value: function _parseDataURI() {
      this._media = null;
      this._mimeType = null;
      this._charset = null;
      this._decodedBody = null;
      this._body = null;
      this._base64 = false;
      var m = this._url && AssetURL.DATAURI_REGEX.exec(this._url) || null;

      if (m) {
        this._base64 = !!m[3];
        this._body = m[4];

        if (m[1]) {
          this._mimeType = m[1];
          this._media = "".concat(this._mimeType).concat(m[2] || '');
        } else {
          this._mimeType = 'text/plain';

          if (m[2]) {
            this._media = "".concat(this._mimeType).concat(m[2]);
          } else {
            this._charset = 'US-ASCII';
            this._media = "".concat(this._mimeType, ";charset=").concat(this._charset);
          }
        }

        if (!this._charset && m[2]) {
          var cm = /;charset=([^;,]+)/.exec(m[2]);

          if (cm) {
            this._charset = cm[1];
          }
        }
      }
    }
  }, {
    key: "scheme",
    get: function get() {
      return this._urlObject ? this._urlObject.protocol : null;
    }
  }, {
    key: "port",
    get: function get() {
      return this._urlObject ? Number(this._urlObject.port) : null;
    }
  }, {
    key: "host",
    get: function get() {
      return this._urlObject ? this._urlObject.hostname : null;
    }
  }, {
    key: "path",
    get: function get() {
      return this._urlObject ? this._urlObject.pathname : null;
    }
  }, {
    key: "hash",
    get: function get() {
      return this._urlObject ? this._urlObject.hash : null;
    }
  }, {
    key: "origin",
    get: function get() {
      return this._urlObject ? this._urlObject.origin : null;
    }
  }, {
    key: "href",
    get: function get() {
      return this._urlObject ? this._urlObject.href : null;
    }
  }, {
    key: "media",
    get: function get() {
      return this._media;
    }
  }, {
    key: "mimeType",
    get: function get() {
      return this._mimeType;
    }
  }, {
    key: "charset",
    get: function get() {
      return this._charset;
    }
  }, {
    key: "body",
    get: function get() {
      return this._body;
    }
  }, {
    key: "decodedBody",
    get: function get() {
      if (this.isDataURI() && !this._decodedBody) {
        this._decodedBody = this._base64 ? misc_1.base64ToU8(this._body) : decodeURIComponent(this._body);
      }

      return this._decodedBody;
    }
  }]);
  return AssetURL;
}();

exports.AssetURL = AssetURL;
AssetURL.DATAURI_REGEX = /^data:([^;,]+)?((?:;(?:[^;,]+))*?)(;base64)?,(.*)$/;

/***/ }),

/***/ "./asset/file_loader.ts":
/*!******************************!*\
  !*** ./asset/file_loader.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileLoader = void 0;

var loader_1 = __webpack_require__(/*! ./loader */ "./asset/loader.ts");

var asseturl_1 = __webpack_require__(/*! ./asseturl */ "./asset/asseturl.ts");

var misc_1 = __webpack_require__(/*! ../misc */ "./misc/index.ts");

var FileLoader = function (_loader_1$AbstractLoa) {
  (0, _inherits2.default)(FileLoader, _loader_1$AbstractLoa);

  var _super = _createSuper(FileLoader);

  function FileLoader(manager, responseType, mimeType, headers) {
    var _this;

    (0, _classCallCheck2.default)(this, FileLoader);
    _this = _super.call(this, manager);
    _this._responseType = responseType || null;
    _this._mimeType = mimeType || null;
    _this._headers = headers || {};
    return _this;
  }

  (0, _createClass2.default)(FileLoader, [{
    key: "load",
    value: function load(url, options) {
      return __awaiter(this, void 0, void 0, _regenerator.default.mark(function _callee() {
        var _this2 = this;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._manager && this._manager.beginLoad(url);
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var assetURL = new asseturl_1.AssetURL(url);

                  if (assetURL.isDataURI()) {
                    var mimeType = assetURL.mimeType;
                    var decodedBody = assetURL.decodedBody;

                    try {
                      var responseType = (_this2._responseType || '').toLowerCase();

                      switch (responseType) {
                        case 'arraybuffer':
                        case 'blob':
                          {
                            var view = null;

                            if (typeof decodedBody === 'string') {
                              view = misc_1.stringToU8(decodedBody);
                            } else {
                              view = decodedBody;
                            }

                            if (responseType === 'blob') {
                              _this2._object = new Blob([view.buffer], {
                                type: mimeType
                              });
                            } else {
                              _this2._object = view.buffer;
                            }

                            break;
                          }

                        case 'document':
                          {
                            var doc = typeof decodedBody === 'string' ? decodedBody : misc_1.u8ToString(decodedBody);
                            var parser = new DOMParser();
                            _this2._object = parser.parseFromString(doc, mimeType);
                            break;
                          }

                        case 'json':
                          {
                            var _doc = typeof decodedBody === 'string' ? decodedBody : misc_1.u8ToString(decodedBody);

                            _this2._object = JSON.parse(_doc);
                            break;
                          }

                        case 'text':
                          {
                            _this2._object = typeof decodedBody === 'string' ? decodedBody : misc_1.u8ToString(decodedBody);
                            break;
                          }

                        default:
                          _this2._object = assetURL.decodedBody;
                          break;
                      }

                      _this2._manager && _this2._manager.endLoad(url, true);
                      resolve(_this2._object);
                    } catch (error) {
                      _this2._manager && _this2._manager.endLoad(url, false);
                      reject(error);
                    }
                  } else {
                    var that = _this2;
                    var request = new XMLHttpRequest();
                    request.open('GET', url, true);
                    request.addEventListener('load', function (event) {
                      that._object = this.response;

                      if (this.status === 200 || this.status === 0) {
                        that._manager && that._manager.endLoad(url, true);
                        resolve(that._object);
                      } else {
                        that._manager && that._manager.endLoad(url, false);
                        reject(event);
                      }
                    });
                    request.addEventListener('error', function (event) {
                      that._manager && that._manager.endLoad(url, false);
                      reject(event);
                    });
                    request.addEventListener('abort', function (event) {
                      that._manager && that._manager.endLoad(url, false);
                      reject(event);
                    });

                    if (that._responseType !== null) {
                      request.responseType = that._responseType;
                    }

                    if (request.overrideMimeType && _this2._mimeType) {
                      request.overrideMimeType(_this2._mimeType);
                    }

                    for (var k in that._headers) {
                      request.setRequestHeader(k, that._headers[k]);
                    }

                    request.send(null);
                  }
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "responseType",
    get: function get() {
      return this._responseType;
    },
    set: function set(val) {
      this._responseType = val;
    }
  }, {
    key: "mimeType",
    get: function get() {
      return this._mimeType;
    },
    set: function set(val) {
      this._mimeType = val;
    }
  }, {
    key: "headers",
    get: function get() {
      return this._headers;
    },
    set: function set(val) {
      this._headers = val;
    }
  }]);
  return FileLoader;
}(loader_1.AbstractLoader);

exports.FileLoader = FileLoader;

/***/ }),

/***/ "./asset/image_loader.ts":
/*!*******************************!*\
  !*** ./asset/image_loader.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageLoader = void 0;

var loader_1 = __webpack_require__(/*! ./loader */ "./asset/loader.ts");

var ImageLoader = function (_loader_1$AbstractLoa) {
  (0, _inherits2.default)(ImageLoader, _loader_1$AbstractLoa);

  var _super = _createSuper(ImageLoader);

  function ImageLoader(manager, object) {
    (0, _classCallCheck2.default)(this, ImageLoader);
    return _super.call(this, manager, object);
  }

  (0, _createClass2.default)(ImageLoader, [{
    key: "load",
    value: function load(url, options) {
      return __awaiter(this, void 0, void 0, _regenerator.default.mark(function _callee() {
        var _this = this;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._manager && this._manager.beginLoad(url);
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var onImageLoaded = function onImageLoaded(ev) {
                    this._manager && this._manager.endLoad(url, true);

                    this._object.removeEventListener('load', onImageLoaded);

                    this._object.removeEventListener('error', onImageLoadError);

                    resolve(this._object);
                  };

                  var onImageLoadError = function onImageLoadError(ev) {
                    this._manager && this._manager.endLoad(url, false);

                    this._object.removeEventListener('load', onImageLoaded);

                    this._object.removeEventListener('error', onImageLoadError);

                    reject(ev);
                  };

                  if (!_this._object) {
                    _this._object = new Image();
                  }

                  _this._object.src = url;

                  _this._object.addEventListener('load', onImageLoaded.bind(_this));

                  _this._object.addEventListener('error', onImageLoadError.bind(_this));
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);
  return ImageLoader;
}(loader_1.AbstractLoader);

exports.ImageLoader = ImageLoader;

/***/ }),

/***/ "./asset/index.ts":
/*!************************!*\
  !*** ./asset/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = void 0 && (void 0).__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./load_manager */ "./asset/load_manager.ts"), exports);

__exportStar(__webpack_require__(/*! ./asseturl */ "./asset/asseturl.ts"), exports);

__exportStar(__webpack_require__(/*! ./loader */ "./asset/loader.ts"), exports);

__exportStar(__webpack_require__(/*! ./image_loader */ "./asset/image_loader.ts"), exports);

__exportStar(__webpack_require__(/*! ./file_loader */ "./asset/file_loader.ts"), exports);

/***/ }),

/***/ "./asset/load_manager.ts":
/*!*******************************!*\
  !*** ./asset/load_manager.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadManager_1;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadManager = exports.LoadEnd = exports.LoadBegin = void 0;

var types_1 = __webpack_require__(/*! ../types */ "./types.ts");

var LoadBegin = function (_types_1$Event) {
  (0, _inherits2.default)(LoadBegin, _types_1$Event);

  var _super = _createSuper(LoadBegin);

  function LoadBegin(manager, url) {
    var _this;

    (0, _classCallCheck2.default)(this, LoadBegin);
    _this = _super.call(this, LoadBegin.NAME);
    _this.manager = manager;
    _this.url = url;
    return _this;
  }

  return LoadBegin;
}(types_1.Event);

exports.LoadBegin = LoadBegin;
LoadBegin.NAME = 'loadbegin';

var LoadEnd = function (_types_1$Event2) {
  (0, _inherits2.default)(LoadEnd, _types_1$Event2);

  var _super2 = _createSuper(LoadEnd);

  function LoadEnd(manager, url, success) {
    var _this2;

    (0, _classCallCheck2.default)(this, LoadEnd);
    _this2 = _super2.call(this, LoadEnd.NAME);
    _this2.manager = manager;
    _this2.url = url;
    _this2.success = success;
    return _this2;
  }

  return LoadEnd;
}(types_1.Event);

exports.LoadEnd = LoadEnd;
LoadEnd.NAME = 'loadend';

var LoadManager = LoadManager_1 = function () {
  function LoadManager() {
    (0, _classCallCheck2.default)(this, LoadManager);
    this._numItems = 0;
    this._numLoadedItems = 0;
  }

  (0, _createClass2.default)(LoadManager, [{
    key: "beginLoad",
    value: function beginLoad(url) {
      url = LoadManager_1.resolveURL(url);
      this._numItems++;
      this.dispatchEvent(new LoadBegin(this, url));
      return url;
    }
  }, {
    key: "endLoad",
    value: function endLoad(url, succ) {
      if (succ) {
        this._numLoadedItems++;
      }

      url = LoadManager_1.resolveURL(url);
      this.dispatchEvent(new LoadEnd(this, url, succ));
    }
  }, {
    key: "numItems",
    get: function get() {
      return this._numItems;
    }
  }, {
    key: "numLoadedItems",
    get: function get() {
      return this._numLoadedItems;
    }
  }], [{
    key: "resolveURL",
    value: function resolveURL(url) {
      if (!this._tempElement) {
        this._tempElement = document.createElement('a');
      }

      this._tempElement.href = url;
      return this._tempElement.href;
    }
  }]);
  return LoadManager;
}();

LoadManager._tempElement = null;
LoadManager = LoadManager_1 = __decorate([types_1.eventtarget(), __metadata("design:paramtypes", [])], LoadManager);
exports.LoadManager = LoadManager;

/***/ }),

/***/ "./asset/loader.ts":
/*!*************************!*\
  !*** ./asset/loader.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractLoader = void 0;

var AbstractLoader = function () {
  function AbstractLoader(manager, object) {
    (0, _classCallCheck2.default)(this, AbstractLoader);
    this._object = object || null;
    this._manager = manager || null;
    this._crossOrigin = 'anonymous';
  }

  (0, _createClass2.default)(AbstractLoader, [{
    key: "object",
    get: function get() {
      return this._object;
    },
    set: function set(obj) {
      this._object = obj;
    }
  }, {
    key: "manager",
    get: function get() {
      return this._manager;
    },
    set: function set(mngr) {
      this._manager = mngr;
    }
  }, {
    key: "crossOrigin",
    get: function get() {
      return this._crossOrigin;
    },
    set: function set(val) {
      this._crossOrigin = val;
    }
  }]);
  return AbstractLoader;
}();

exports.AbstractLoader = AbstractLoader;

/***/ }),

/***/ "./atlas_manager.ts":
/*!**************************!*\
  !*** ./atlas_manager.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtlasManager = void 0;

var maxrects_packer_1 = __webpack_require__(/*! ./maxrects-packer */ "./maxrects-packer/index.ts");

var AtlasManager = function () {
  function AtlasManager(renderer, cacheWidth, cacheHeight, cachePadding, textureFormat, linearSpace) {
    (0, _classCallCheck2.default)(this, AtlasManager);
    this._renderer = renderer;
    this._cacheWidth = typeof cacheWidth === 'number' ? cacheWidth || AtlasManager.ATLAS_WIDTH : AtlasManager.ATLAS_WIDTH;
    this._cacheHeight = typeof cacheHeight === 'number' ? cacheHeight || AtlasManager.ATLAS_HEIGHT : AtlasManager.ATLAS_HEIGHT;
    this._cachePadding = 1;
    this._linearSpace = !!linearSpace;
    this._packer = new maxrects_packer_1.MaxRectsPacker(this._cacheWidth, this._cacheHeight, this._cachePadding, {
      smart: true,
      pot: false,
      square: false,
      allowRotation: false,
      tag: false
    });
    this._atlasList = [];
    this._atlasInfoMap = {};
    this._textureFormat = textureFormat || 'rgba';
  }

  (0, _createClass2.default)(AtlasManager, [{
    key: "getTextureFormat",
    value: function getTextureFormat() {
      return this._textureFormat;
    }
  }, {
    key: "getAtlasTexture",
    value: function getAtlasTexture(index) {
      return this._atlasList[index];
    }
  }, {
    key: "getAtlasInfo",
    value: function getAtlasInfo(key) {
      return this._atlasInfoMap[key] || null;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var _iterator = _createForOfIteratorHelper(this._atlasList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tex = _step.value;

          this._renderer.disposeTexture(tex);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this._atlasList = null;
    }
  }, {
    key: "pushCanvas",
    value: function pushCanvas(key, ctx, x, y, w, h) {
      if (ctx) {
        var rc = this._packer.add(w, h, null);

        if (rc) {
          this._updateAtlasTextureCanvas(this._packer.bins.length - 1, ctx, rc.x, rc.y, rc.width, rc.height, x, y);

          var info = {
            atlasIndex: this._packer.bins.length - 1,
            uMin: rc.x / (this._cacheWidth + this._cachePadding),
            vMin: rc.y / (this._cacheHeight + this._cachePadding),
            uMax: (rc.x + rc.width) / (this._cacheWidth + this._cachePadding),
            vMax: (rc.y + rc.height) / (this._cacheHeight + this._cachePadding),
            width: rc.width,
            height: rc.height
          };
          this._atlasInfoMap[key] = info;
          return info;
        }
      }
    }
  }, {
    key: "pushBitmap",
    value: function pushBitmap(key, bitmap) {
      if (bitmap) {
        var rc = this._packer.add(bitmap.width, bitmap.height, null);

        if (rc) {
          this._updateAtlasTexture(this._packer.bins.length - 1, bitmap, rc.x, rc.y, rc.width, rc.height);

          var info = {
            atlasIndex: this._packer.bins.length - 1,
            uMin: rc.x / (this._cacheWidth + this._cachePadding),
            vMin: rc.y / (this._cacheHeight + this._cachePadding),
            uMax: (rc.x + rc.width) / (this._cacheWidth + this._cachePadding),
            vMax: (rc.y + rc.height) / (this._cacheHeight + this._cachePadding),
            width: rc.width,
            height: rc.height
          };
          this._atlasInfoMap[key] = info;
          return info;
        }
      }

      return null;
    }
  }, {
    key: "_updateAtlasTextureCanvas",
    value: function _updateAtlasTextureCanvas(atlasIndex, bitmap, x, y, w, h, xOffset, yOffset) {
      if (this._textureFormat !== 'rgba') {
        var bmp = bitmap.getImageData(xOffset, yOffset, w, h);
        return this._updateAtlasTexture(atlasIndex, bmp, x, y, w, h);
      }

      var textureAtlas = null;

      if (atlasIndex === this._atlasList.length) {
        textureAtlas = this._renderer.createTexture(this._textureFormat, this._cacheWidth + this._cachePadding, this._cacheHeight + this._cachePadding, {
          x: 0,
          y: 0,
          z: 0,
          w: 0
        }, this._linearSpace);

        this._atlasList.push(textureAtlas);
      } else {
        textureAtlas = this._atlasList[atlasIndex];
      }

      this._renderer.updateTextureWithCanvas(textureAtlas, bitmap.canvas, xOffset, yOffset, w, h, x, y);
    }
  }, {
    key: "_updateAtlasTexture",
    value: function _updateAtlasTexture(atlasIndex, bitmap, x, y, w, h) {
      var textureAtlas = null;

      if (atlasIndex === this._atlasList.length) {
        textureAtlas = this._renderer.createTexture(this._textureFormat, this._cacheWidth + this._cachePadding, this._cacheHeight + this._cachePadding, {
          x: 0,
          y: 0,
          z: 0,
          w: 0
        }, this._linearSpace);

        this._atlasList.push(textureAtlas);
      } else {
        textureAtlas = this._atlasList[atlasIndex];
      }

      this._renderer.updateTextureWithImage(textureAtlas, bitmap, x, y);
    }
  }]);
  return AtlasManager;
}();

exports.AtlasManager = AtlasManager;
AtlasManager.ATLAS_WIDTH = 1024;
AtlasManager.ATLAS_HEIGHT = 1024;

/***/ }),

/***/ "./components/button.ts":
/*!******************************!*\
  !*** ./components/button.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var __1 = __webpack_require__(/*! .. */ "./index.ts");

var Button = function (_1$RMLElement) {
  (0, _inherits2.default)(Button, _1$RMLElement);

  var _super = _createSuper(Button);

  function Button(uiscene) {
    (0, _classCallCheck2.default)(this, Button);
    return _super.call(this, uiscene);
  }

  (0, _createClass2.default)(Button, [{
    key: "_applyInlineStyles",
    value: function _applyInlineStyles() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Button.prototype), "_applyInlineStyles", this).call(this);
    }
  }, {
    key: "_init",
    value: function _init() {}
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(Button.prototype), "_getDefaultStyleSheet", this).call(this);
      style.flexDirection = 'row';
      style.padding = '2';
      style.justifyContent = 'center';
      style.backgroundColor = '#1074e7';
      return style;
    }
  }]);
  return Button;
}(__1.RMLElement);

Button = __decorate([__1.tagname('button'), __metadata("design:paramtypes", [__1.GUI])], Button);
exports.Button = Button;

/***/ }),

/***/ "./components/input.ts":
/*!*****************************!*\
  !*** ./components/input.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var __1 = __webpack_require__(/*! .. */ "./index.ts");

var Input = function (_1$RMLElement) {
  (0, _inherits2.default)(Input, _1$RMLElement);

  var _super = _createSuper(Input);

  function Input(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = _super.call(this, uiscene);
    _this._selectionStart = 0;
    _this._selectionEnd = 0;
    _this._drawCursor = false;
    _this._cursorTimer = null;
    _this._cursorBatch = null;
    _this._text = new __1.Text(_this._uiscene);

    _this._text._setInternal();

    _this._text.style.backgroundColor = 'transparent';
    _this._text.style.flex = '1 0 auto';

    _this.appendChild(_this._text);

    _this._hiddenInput = document.createElement('input');
    _this._hiddenInput.type = 'text';
    _this._hiddenInput.style.position = 'absolute';
    _this._hiddenInput.style.boxSizing = 'border-box';
    _this._hiddenInput.style.opacity = '0';
    _this._hiddenInput.style.outline = 'none';
    _this._hiddenInput.style.pointerEvents = 'none';
    _this._hiddenInput.style.zIndex = '0';
    _this._hiddenInput.style.transform = 'scaleY(0)';
    _this._hiddenInput.style.transformOrigin = 'top';

    _this._updateHiddenInput();

    _this._setHiddenInputSelection(_this._selectionStart, _this._selectionEnd);

    _this._updateCursorVertices();

    document.body.appendChild(_this._hiddenInput);

    _this.addEventListener(__1.ElementLayoutEvent.NAME, function () {
      this._updateHiddenInput();
    });

    _this.addEventListener(__1.GUIFocusEvent.NAME_FOCUS, function () {
      if (this.type === 'text') {
        this._hiddenInput.focus();

        this._restartCursorTimer();
      }
    });

    _this.addEventListener(__1.GUIFocusEvent.NAME_BLUR, function () {
      if (this.type === 'text') {
        this._hiddenInput.blur();

        this._stopCursorTimer();

        this._drawCursor = false;
      }
    });

    _this.addEventListener(__1.GUIMouseEvent.NAME_MOUSEDOWN, function (e) {
      var data = e;

      if (data.button === 1) {
        if (this.type === 'text') {
          this._hiddenInput.focus();

          var loc = this._text.measureTextLocation(data.x - this.getClientRect().x - this._text.getRect().x, data.y - this.getClientRect().y - this._text.getRect().y);

          if (loc) {
            __1.assert(loc.line === 0);

            this._selectionStart = loc.pos;
            this._selectionEnd = loc.pos;

            this._updateCursorVertices();

            this._setHiddenInputCaretPosition(loc.pos);
          }
        } else if (this.type === 'color') {
          var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });

          this._hiddenInput.dispatchEvent(evt);
        }
      }
    });

    _this.addEventListener(__1.TextEvent.NAME_CONTENT_CHANGE, function (e) {
      var data = e;

      if (this._hiddenInput.value !== this.textContent && this.type === 'text') {
        this._hiddenInput.value = this.textContent;
        this._selectionStart = Math.min(this._selectionStart, this.textContent.length);
        this._selectionEnd = Math.max(this._selectionStart, Math.min(this._selectionEnd, this.textContent.length));

        this._setHiddenInputSelection(this._selectionStart, this._selectionEnd);

        this._updateCursorVertices();
      }
    });

    _this.addEventListener(__1.TextEvent.NAME_FONT_CHANGE, function () {
      that._updateHiddenInput();
    });

    var that = (0, _assertThisInitialized2.default)(_this);

    _this._hiddenInput.addEventListener('keydown', function () {
      if (this.type === 'text') {
        setTimeout(function () {
          var lastSelection = that._selectionStart;
          that._selectionStart = that._hiddenInput.selectionStart;
          that._selectionEnd = that._hiddenInput.selectionEnd;

          if (that._selectionStart !== lastSelection) {
            that._updateCursorVertices();

            that._drawCursor = true;
          }
        }, 0);
      }
    });

    _this._hiddenInput.addEventListener('input', function () {
      that._oninput();
    });

    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "_oninput",
    value: function _oninput() {
      if (this.type === 'text') {
        this._text.textContent = this._hiddenInput.value;
        this._selectionStart = this._hiddenInput.selectionStart;
        this._selectionEnd = this._hiddenInput.selectionEnd;

        this._updateCursorVertices();
      } else if (this.type === 'color') {
        this._text.style.backgroundColor = this._hiddenInput.value;
      }
    }
  }, {
    key: "_draw",
    value: function _draw(renderer) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Input.prototype), "_draw", this).call(this, renderer);

      if (this._drawCursor && this._cursorBatch) {
        renderer.drawBatchList(this._cursorBatch);
      }
    }
  }, {
    key: "_init",
    value: function _init() {}
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(Input.prototype), "_getDefaultStyleSheet", this).call(this);
      style.width = '150px';
      style.height = 'auto';
      style.cursor = 'text';
      style.color = '#000000';
      style.padding = '5';
      style.justifyContent = 'flex-start';
      style.backgroundColor = '#fff';
      style.borderWidth = '1px';
      style.borderColor = '#000';
      style.overflow = 'hidden';
      return style;
    }
  }, {
    key: "_updateHiddenInput",
    value: function _updateHiddenInput() {
      var el = this._uiscene.renderer.getCanvas();

      var v = this.toAbsolute({
        x: 0,
        y: 0
      });
      var t = v.y + this.getRect().height;
      var l = v.x;

      if (el instanceof HTMLCanvasElement) {
        t += el.offsetTop;
        l += el.offsetLeft;

        while (el = el.offsetParent) {
          t += el.offsetTop;
          l += el.offsetLeft;
        }
      }

      if (this.type === 'color') {
        t -= this.getRect().height;
        this._hiddenInput.style.transform = '';
        this._hiddenInput.style.pointerEvents = 'auto';
      } else {
        this._hiddenInput.style.transform = 'scaleY(0)';
        this._hiddenInput.style.pointerEvents = 'none';
      }

      this._hiddenInput.style.left = "".concat(l, "px");
      this._hiddenInput.style.top = "".concat(t, "px");
      this._hiddenInput.style.width = "".concat(this.getRect().width, "px");
      this._hiddenInput.style.height = "".concat(this.getRect().height, "px");
      this._hiddenInput.style.font = "".concat(this._getCachedFont().size, "px ").concat(this._getCachedFont().family);
    }
  }, {
    key: "_buildVertexData",
    value: function _buildVertexData() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Input.prototype), "_buildVertexData", this).call(this);

      this._updateCursorVertices();
    }
  }, {
    key: "_setHiddenInputSelection",
    value: function _setHiddenInputSelection(start, end) {
      if (this._hiddenInput.setSelectionRange) {
        this._hiddenInput.focus();

        this._hiddenInput.selectionStart = start;
        this._hiddenInput.selectionEnd = end;
      } else {
        var ieInput = this._hiddenInput;

        if (ieInput.createTextRange) {
          var range = ieInput.createTextRange();
          range.collapse(true);
          range.moveEnd('character', start);
          range.moveStart('character', end);
          range.select();
        }
      }
    }
  }, {
    key: "_setHiddenInputCaretPosition",
    value: function _setHiddenInputCaretPosition(pos) {
      this._setHiddenInputSelection(pos, pos);
    }
  }, {
    key: "_calcCursorPos",
    value: function _calcCursorPos(pos) {
      var x = this.style.getPaddingLeft();

      for (var i = 0; i < pos; i++) {
        var glyph = this._uiscene._getGlyphInfo(this._text.textContent[i], this._getCachedFont());

        if (glyph) {
          x += glyph.width + this._text.charMargin;
        }
      }

      return x;
    }
  }, {
    key: "_updateCursorVertices",
    value: function _updateCursorVertices() {
      var clipper = this._getClipper(true);

      if (clipper) {
        var x = this._calcCursorPos(this._selectionStart);

        var v = this.toAbsolute({
          x: 0,
          y: 0
        });
        this._cursorBatch = new __1.RMLPrimitiveBatchList(v.x, v.y);

        this._cursorBatch.addPrimitive(new __1.RMLRectPrimitive(x, this.style.getPaddingTop() - 2, 1, this._getCachedFont().size + 4, 0, 0, 0, 0), clipper, null, this._getCachedFontColor());
      }
    }
  }, {
    key: "_stopCursorTimer",
    value: function _stopCursorTimer() {
      if (this._cursorTimer) {
        window.clearInterval(this._cursorTimer);
        this._cursorTimer = null;
      }
    }
  }, {
    key: "_restartCursorTimer",
    value: function _restartCursorTimer() {
      var _this2 = this;

      this._stopCursorTimer();

      this._drawCursor = true;
      this._cursorTimer = window.setInterval(function () {
        _this2._drawCursor = !_this2._drawCursor;
      }, 500);
    }
  }, {
    key: "type",
    get: function get() {
      return this.getAttribute('type') || 'text';
    },
    set: function set(val) {
      if (val !== this.type) {
        if (val === 'text' || val === 'color') {
          this.setAttribute('type', val);
          this._hiddenInput.type = val;

          if (val === 'text') {
            this._text.textContent = this._hiddenInput.value;
            this._text.style.backgroundColor = 'transparent';
            this._selectionStart = 0;
            this._selectionEnd = 0;
            this.style.cursor = 'text';

            if (this === this._uiscene.getFocus()) {
              this._uiscene.setFocus(null);
            }

            this._invalidateContent();
          } else {
            this._stopCursorTimer();

            this._drawCursor = false;
            this.style.cursor = 'default';

            if (val === 'color') {
              this._text.textContent = '';
              this._text.style.backgroundColor = this._hiddenInput.value;
            }
          }
        }

        this._updateHiddenInput();
      }
    }
  }]);
  return Input;
}(__1.RMLElement);

Input = __decorate([__1.tagname('input'), __metadata("design:paramtypes", [__1.GUI])], Input);
exports.Input = Input;

/***/ }),

/***/ "./components/scrollbar.ts":
/*!*********************************!*\
  !*** ./components/scrollbar.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollBar = void 0;

var __1 = __webpack_require__(/*! .. */ "./index.ts");

var ScrollBar = function (_1$Slider) {
  (0, _inherits2.default)(ScrollBar, _1$Slider);

  var _super = _createSuper(ScrollBar);

  function ScrollBar(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, ScrollBar);
    _this = _super.call(this, uiscene);
    _this._buttonUp = new __1.Button(uiscene);

    _this._buttonUp._setInternal();

    _this.appendChild(_this._buttonUp);

    _this._buttonUp.addEventListener(__1.GUIMouseEvent.NAME_MOUSECLICK, function () {
      _this.value -= _this.stepValue;
    });

    _this._buttonDown = new __1.Button(uiscene);

    _this._buttonDown._setInternal();

    _this.appendChild(_this._buttonDown);

    _this._buttonDown.addEventListener(__1.GUIMouseEvent.NAME_MOUSECLICK, function () {
      _this.value += _this.stepValue;
    });

    _this._updateOrientationStyle();

    return _this;
  }

  (0, _createClass2.default)(ScrollBar, [{
    key: "_init",
    value: function _init() {}
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(ScrollBar.prototype), "_getDefaultStyleSheet", this).call(this);
      style.overflow = 'visible';

      if (this.orientation === 'vertical') {
        style.paddingTop = String(this.buttonSize);
        style.paddingBottom = String(this.buttonSize);
      } else {
        style.paddingLeft = String(this.buttonSize);
        style.paddingRight = String(this.buttonSize);
      }

      return style;
    }
  }, {
    key: "_onAttributeChange",
    value: function _onAttributeChange(name) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(ScrollBar.prototype), "_onAttributeChange", this).call(this, name);

      if (name === 'rangeStart' || name === 'rangeEnd') {
        this._invalidateLayout();
      } else if (name === 'buttonSize' || name === 'orientation') {
        if (name === 'orientation') {
          this._updateOrientationStyle();
        }

        this._invalidateLayout();
      }
    }
  }, {
    key: "_updateScrollState",
    value: function _updateScrollState() {}
  }, {
    key: "_updateOrientationStyle",
    value: function _updateOrientationStyle() {
      var vertical = this.orientation === 'vertical';

      this._buttonUp.setAttribute('style', vertical ? "position:absolute;left:0;right:0;top:0;height:".concat(this.buttonSize, ";background-image:default.scrollbar.up") : "position:absolute;left:0;top:0;bottom:0;width:".concat(this.buttonSize, ";background-image:default.scrollbar.left"));

      this._buttonDown.setAttribute('style', vertical ? "position:absolute;left:0;right:0;bottom:0;height:".concat(this.buttonSize, ";background-image:default.scrollbar.down;") : "position:absolute;right:0;top:0;bottom:0;width:".concat(this.buttonSize, ";background-image:default.scrollbar.right"));

      this._invalidateLayout();

      this._uiscene._markStyleRefreshForElement(this);
    }
  }, {
    key: "buttonSize",
    get: function get() {
      return this._getNumberAttribute('buttonSize', 8);
    },
    set: function set(val) {
      this._setNumberAttribute('buttonSize', val);
    }
  }]);
  return ScrollBar;
}(__1.Slider);

ScrollBar = __decorate([__1.tagname('scrollbar'), __metadata("design:paramtypes", [__1.GUI])], ScrollBar);
exports.ScrollBar = ScrollBar;

/***/ }),

/***/ "./components/select.ts":
/*!******************************!*\
  !*** ./components/select.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = exports.Option = void 0;

var __1 = __webpack_require__(/*! .. */ "./index.ts");

var Option = function (_1$RMLElement) {
  (0, _inherits2.default)(Option, _1$RMLElement);

  var _super = _createSuper(Option);

  function Option(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, Option);
    _this = _super.call(this, uiscene);
    _this._hiddenOption = document.createElement('option');
    return _this;
  }

  (0, _createClass2.default)(Option, [{
    key: "_getHiddenOption",
    value: function _getHiddenOption() {
      return this._hiddenOption;
    }
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(Option.prototype), "_getDefaultStyleSheet", this).call(this);
      style.width = '0px';
      style.height = '0px';
      style.backgroundColor = 'transparent';
      style.display = 'none';
      return style;
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(k, v) {
      this._hiddenOption.setAttribute(k, v || '');

      (0, _get2.default)((0, _getPrototypeOf2.default)(Option.prototype), "setAttribute", this).call(this, k, v);
    }
  }, {
    key: "_reparent",
    value: function _reparent(p, at) {
      var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(Option.prototype), "_reparent", this).call(this, p, at);

      if (p.nodeType === __1.RMLNode.ELEMENT_NODE && p.tagName === 'select') {
        var nextOption;

        for (nextOption = this._getNextSibling(true); nextOption && nextOption.tagName !== 'option'; nextOption = nextOption._getNextSibling(true)) {
          ;
        }

        if (nextOption) {
          p._getHiddenInput().insertBefore(this._hiddenOption, nextOption._getHiddenOption());
        } else {
          p._getHiddenInput().appendChild(this._hiddenOption);
        }
      }

      return ret;
    }
  }, {
    key: "_remove",
    value: function _remove() {
      if (this._parent && this._parent.nodeType === __1.RMLNode.ELEMENT_NODE && this._parent.tagName === 'select') {
        this._parent._getHiddenInput().removeChild(this._hiddenOption);
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(Option.prototype), "_remove", this).call(this);
    }
  }, {
    key: "_insertChild",
    value: function _insertChild(child, index) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Option.prototype), "_insertChild", this).call(this, child, index);
      this._hiddenOption.textContent = this.textContent;
    }
  }, {
    key: "_removeChild",
    value: function _removeChild(index) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Option.prototype), "_removeChild", this).call(this, index);
      this._hiddenOption.textContent = this.textContent;
    }
  }]);
  return Option;
}(__1.RMLElement);

Option = __decorate([__1.tagname('option'), __metadata("design:paramtypes", [__1.GUI])], Option);
exports.Option = Option;

var Select = function (_1$RMLElement2) {
  (0, _inherits2.default)(Select, _1$RMLElement2);

  var _super2 = _createSuper(Select);

  function Select(uiscene) {
    var _this2;

    (0, _classCallCheck2.default)(this, Select);
    _this2 = _super2.call(this, uiscene);
    _this2._text = new __1.Text(_this2._uiscene);

    _this2._text._setInternal();

    _this2._text.style.backgroundColor = 'transparent';
    _this2._text.style.flex = '1 0 auto';

    _this2.appendChild(_this2._text);

    _this2._hiddenInput = document.createElement('select');
    _this2._hiddenInput.style.position = 'absolute';
    _this2._hiddenInput.style.boxSizing = 'border-box';
    _this2._hiddenInput.style.opacity = '0';
    _this2._hiddenInput.style.outline = 'none';
    _this2._hiddenInput.style.pointerEvents = 'none';
    _this2._hiddenInput.style.zIndex = '0';
    _this2._hiddenInput.style.transform = 'scaleY(0)';
    _this2._hiddenInput.style.transformOrigin = 'top';

    _this2._updateHiddenInput();

    document.body.appendChild(_this2._hiddenInput);

    _this2.addEventListener(__1.ElementLayoutEvent.NAME, function (evt) {
      this._updateHiddenInput();
    });

    _this2.addEventListener(__1.TextEvent.NAME_FONT_CHANGE, function (evt) {
      that._updateHiddenInput();
    });

    var that = (0, _assertThisInitialized2.default)(_this2);

    _this2._hiddenInput.addEventListener('input', function () {
      that._oninput();
    });

    return _this2;
  }

  (0, _createClass2.default)(Select, [{
    key: "_oninput",
    value: function _oninput() {
      this._text.textContent = this._hiddenInput.options[this._hiddenInput.selectedIndex].textContent;
    }
  }, {
    key: "_init",
    value: function _init() {}
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "_getDefaultStyleSheet", this).call(this);
      style.width = '150px';
      style.height = 'auto';
      style.color = '#000000';
      style.padding = '5';
      style.justifyContent = 'flex-start';
      style.backgroundColor = '#fff';
      style.borderWidth = '1px';
      style.borderColor = '#000';
      style.overflow = 'hidden';
      return style;
    }
  }, {
    key: "_getHiddenInput",
    value: function _getHiddenInput() {
      return this._hiddenInput;
    }
  }, {
    key: "_updateHiddenInput",
    value: function _updateHiddenInput() {
      var el = this._uiscene.renderer.getCanvas();

      var v = this.toAbsolute({
        x: 0,
        y: 0
      });
      var t = v.y;
      var l = v.x;

      if (el instanceof HTMLCanvasElement) {
        t += el.offsetTop;
        l += el.offsetLeft;

        while (el = el.offsetParent) {
          t += el.offsetTop;
          l += el.offsetLeft;
        }
      }

      this._hiddenInput.style.transform = '';
      this._hiddenInput.style.pointerEvents = 'auto';
      this._hiddenInput.style.left = "".concat(l, "px");
      this._hiddenInput.style.top = "".concat(t, "px");
      this._hiddenInput.style.width = "".concat(this.getRect().width, "px");
      this._hiddenInput.style.height = "".concat(this.getRect().height, "px");
      this._hiddenInput.style.font = "".concat(this._getCachedFont().size, "px ").concat(this._getCachedFont().family);
    }
  }, {
    key: "_insertChild",
    value: function _insertChild(child, index) {
      var _a, _b;

      (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "_insertChild", this).call(this, child, index);
      this._text.textContent = ((_a = this._hiddenInput) === null || _a === void 0 ? void 0 : _a.options) ? (_b = this._hiddenInput.options[this._hiddenInput.selectedIndex]) === null || _b === void 0 ? void 0 : _b.textContent : '';
    }
  }, {
    key: "_removeChild",
    value: function _removeChild(index) {
      var _a, _b;

      (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "_removeChild", this).call(this, index);
      this._text.textContent = ((_a = this._hiddenInput) === null || _a === void 0 ? void 0 : _a.options) ? (_b = this._hiddenInput.options[this._hiddenInput.selectedIndex]) === null || _b === void 0 ? void 0 : _b.textContent : '';
    }
  }]);
  return Select;
}(__1.RMLElement);

Select = __decorate([__1.tagname('select'), __metadata("design:paramtypes", [__1.GUI])], Select);
exports.Select = Select;

/***/ }),

/***/ "./components/slider.ts":
/*!******************************!*\
  !*** ./components/slider.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;

var __1 = __webpack_require__(/*! .. */ "./index.ts");

var Slider = function (_1$RMLElement) {
  (0, _inherits2.default)(Slider, _1$RMLElement);

  var _super = _createSuper(Slider);

  function Slider(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, Slider);
    _this = _super.call(this, uiscene);
    _this._blockRect = null;
    _this._lastX = 0;
    _this._lastY = 0;
    _this._lastRectX = 0;
    _this._lastRectY = 0;
    _this._draggingBlock = false;
    _this._blockPos = 0;
    _this._blockColor = _this.style.parseColor('#555555');

    _this.addEventListener(__1.GUIMouseEvent.NAME_MOUSEDOWN, function (evt) {
      var data = evt;

      if (data.button === 1 && !this._draggingBlock && this._blockRect && data.x >= this._blockRect.x && data.y >= this._blockRect.y && data.x < this._blockRect.x + this._blockRect.width && data.y < this._blockRect.y + this._blockRect.height) {
        this.setCapture();
        this._lastX = data.x;
        this._lastY = data.y;
        this._lastRectX = this._blockRect.x;
        this._lastRectY = this._blockRect.y;
        this._draggingBlock = true;
      }
    });

    _this.addEventListener(__1.GUIMouseEvent.NAME_MOUSEUP, function (evt) {
      var data = evt;

      if (data.button === 1 && this._draggingBlock) {
        this.releaseCapture();
        this._draggingBlock = false;
      }
    });

    _this.addEventListener(__1.GUIMouseEvent.NAME_MOUSEMOVE, function (evt) {
      var data = evt;

      if (this._draggingBlock && this._blockRect) {
        var isVertical = this.orientation === 'vertical';
        var clientRect = this.getClientRect();
        var mx = data.x;
        var my = data.y;
        var ratio;

        if (isVertical) {
          var freeSpace = clientRect.height - this.blockSize;
          this._blockRect.y = Math.max(clientRect.y, Math.min(clientRect.y + freeSpace, this._lastRectY + my - this._lastY));
          ratio = (this._blockRect.y - clientRect.y) / freeSpace;
        } else {
          var _freeSpace = clientRect.width - this.blockSize;

          this._blockRect.x = Math.max(clientRect.x, Math.min(clientRect.x + _freeSpace, this._lastRectX + mx - this._lastX));
          ratio = (this._blockRect.x - clientRect.x) / _freeSpace;
        }

        this.value = Math.floor(this.rangeStart + (this.rangeEnd - this.rangeStart) * ratio);
        var blockPos = isVertical ? this._blockRect.y - clientRect.y : this._blockRect.x - clientRect.x;

        if (blockPos !== this._blockPos) {
          this._blockPos = blockPos;

          this._invalidateContent();
        }
      }
    });

    _this.addEventListener(__1.ElementLayoutEvent.NAME, function (evt) {
      _this._blockPos = _this._computeBlockPos();
    });

    _this.addEventListener(__1.AttributeChangeEvent.NAME, function (evt) {
      var data = evt;

      _this._onAttributeChange(data.name);
    });

    return _this;
  }

  (0, _createClass2.default)(Slider, [{
    key: "_onAttributeChange",
    value: function _onAttributeChange(name) {
      if (name === 'rangeStart' || name === 'rangeEnd') {
        this._blockPos = this._computeBlockPos();

        this._invalidateContent();
      }
    }
  }, {
    key: "_buildBlockVertexData",
    value: function _buildBlockVertexData() {
      var clipper = this._getClipper(false);

      if (clipper) {
        var blockColor = this._blockColor;
        var blockImage = this.blockImage ? this._uiscene.imageManager.getImage(this.blockImage) : null;
        var uvMin = (blockImage === null || blockImage === void 0 ? void 0 : blockImage.uvMin) || null;
        var uvMax = (blockImage === null || blockImage === void 0 ? void 0 : blockImage.uvMax) || null;

        this._batchList.addPrimitive(new __1.RMLRectPrimitive(this._blockRect.x, this._blockRect.y, this._blockRect.width, this._blockRect.height, (uvMin === null || uvMin === void 0 ? void 0 : uvMin.x) || 0, (uvMin === null || uvMin === void 0 ? void 0 : uvMin.y) || 0, (uvMax === null || uvMax === void 0 ? void 0 : uvMax.x) || 0, (uvMax === null || uvMax === void 0 ? void 0 : uvMax.y) || 0), clipper, (blockImage === null || blockImage === void 0 ? void 0 : blockImage.texture) || null, blockColor);
      }
    }
  }, {
    key: "_computeBlockPos",
    value: function _computeBlockPos() {
      var isVertical = this.orientation === 'vertical';
      var rangeMin = this.rangeStart < this.rangeEnd ? this.rangeStart : this.rangeEnd;
      var rangeMax = this.rangeStart < this.rangeEnd ? this.rangeEnd : this.rangeStart;
      var value = Math.max(Math.min(this.value, rangeMax), rangeMin);
      var clientRect = this._layout.clientRect;
      var freeSpace = (isVertical ? clientRect.height : clientRect.width) - this.blockSize;

      if (freeSpace < 0) {
        return -1;
      }

      return Math.floor(freeSpace * (value - this.rangeStart) / (this.rangeEnd - this.rangeStart));
    }
  }, {
    key: "_buildVertexData",
    value: function _buildVertexData() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Slider.prototype), "_buildVertexData", this).call(this);

      if (this.rangeStart === this.rangeEnd) {
        this._blockRect = null;
        return;
      }

      var blockSize = Math.floor(this.blockSize);

      if (blockSize <= 0) {
        this._blockRect = null;
        return;
      }

      var isVertical = this.orientation === 'vertical';
      var clientRect = this.getClientRect();
      var freeSpace = (isVertical ? clientRect.height : clientRect.width) - this.blockSize;

      if (freeSpace < 0) {
        this._blockRect = null;
        return;
      }

      this._blockRect = {
        x: isVertical ? clientRect.x : clientRect.x + this._blockPos,
        y: isVertical ? clientRect.y + this._blockPos : clientRect.y,
        width: isVertical ? clientRect.width : blockSize,
        height: isVertical ? blockSize : clientRect.height
      };

      this._buildBlockVertexData();
    }
  }, {
    key: "_init",
    value: function _init() {}
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(Slider.prototype), "_getDefaultStyleSheet", this).call(this);
      style.padding = '0';
      style.backgroundColor = '#ffffff';
      return style;
    }
  }, {
    key: "value",
    get: function get() {
      return this._getNumberAttribute('value', 0);
    },
    set: function set(val) {
      var oldVal = this.value;

      this._setNumberAttribute('value', val);

      val = Math.max(this.rangeStart, Math.min(this.rangeEnd, this.value));

      if (this.value !== oldVal) {
        this._blockPos = this._computeBlockPos();

        this._invalidateContent();

        this.dispatchEvent(new __1.ValueChangeEvent(this.value));
      }
    }
  }, {
    key: "rangeStart",
    get: function get() {
      return this._getNumberAttribute('rangeStart', 0);
    },
    set: function set(val) {
      this._setNumberAttribute('rangeStart', val);
    }
  }, {
    key: "rangeEnd",
    get: function get() {
      return this._getNumberAttribute('rangeEnd', 100);
    },
    set: function set(val) {
      this._setNumberAttribute('rangeEnd', val);
    }
  }, {
    key: "blockSize",
    get: function get() {
      return this._getNumberAttribute('blockSize', 8);
    },
    set: function set(val) {
      this._setNumberAttribute('blockSize', val);
    }
  }, {
    key: "stepValue",
    get: function get() {
      return this._getNumberAttribute('stepValue', 1);
    },
    set: function set(val) {
      this._setNumberAttribute('stepValue', val);
    }
  }, {
    key: "pageValue",
    get: function get() {
      return this._getNumberAttribute('pageValue', 10);
    },
    set: function set(val) {
      this._setNumberAttribute('pageValue', val);
    }
  }, {
    key: "orientation",
    get: function get() {
      return this._getStringAttribute('orientation', 'vertical');
    },
    set: function set(val) {
      this._setStringAttribute('orientation', val);
    }
  }, {
    key: "blockColor",
    get: function get() {
      return this._getStringAttribute('blockColor', '#555555');
    },
    set: function set(val) {
      this._setStringAttribute('blockColor', val);

      this._blockColor = this.style.parseColor(this.blockColor) || this.style.parseColor('#555555');

      this._invalidateContent();
    }
  }, {
    key: "blockImage",
    get: function get() {
      return this._getStringAttribute('blockImage', '');
    },
    set: function set(val) {
      this._setStringAttribute('blockImage', val);

      this._invalidateContent();
    }
  }]);
  return Slider;
}(__1.RMLElement);

Slider = __decorate([__1.tagname('slider'), __metadata("design:paramtypes", [__1.GUI])], Slider);
exports.Slider = Slider;

/***/ }),

/***/ "./components/text.ts":
/*!****************************!*\
  !*** ./components/text.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

var __1 = __webpack_require__(/*! .. */ "./index.ts");

var Text = function (_1$RMLNode) {
  (0, _inherits2.default)(Text, _1$RMLNode);

  var _super = _createSuper(Text);

  function Text(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, Text);
    _this = _super.call(this, uiscene);
    _this._actualContent = '';
    _this._textContent = '';
    _this._autoWrap = false;
    _this._charMargin = 0;
    _this._lineHeight = -1;
    _this._inlineStyle = '';

    _this.addEventListener(__1.AttributeChangeEvent.NAME, function (evt) {
      var e = evt;

      if (e.name === 'autoWrap' || e.name === 'charMargin' || e.name === 'lineHeight') {
        this._invalidateLayout();

        this._invalidateContent();
      }
    });

    return _this;
  }

  (0, _createClass2.default)(Text, [{
    key: "cloneNode",
    value: function cloneNode(deep) {
      var clone = new Text(this._uiscene);
      clone.textContent = this.textContent;
      return clone;
    }
  }, {
    key: "_updateStyle",
    value: function _updateStyle(val) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_updateStyle", this).call(this, val);
      this._inlineStyle = val;
    }
  }, {
    key: "_applyInlineStyles",
    value: function _applyInlineStyles() {
      this.style.applyStyles(this._inlineStyle, true);
    }
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_getDefaultStyleSheet", this).call(this);
      style.backgroundColor = 'transparent';
      style.flex = '0 0 auto';
      style.display = this._findFirstTextNode() === this ? 'flex' : 'none';
      return style;
    }
  }, {
    key: "measureTextLocation",
    value: function measureTextLocation(px, py) {
      var lines = this._splitContent();

      var font = this._getCachedFont();

      var lineHeight = (this.lineHeight >= 0 ? this.lineHeight : -this.lineHeight * font.maxHeight) | 0;
      var charMargin = this.charMargin;
      var l = Math.floor((py - this.style.getPaddingTop()) / lineHeight);

      if (l < 0 || l >= lines.length) {
        return null;
      }

      var t = this.style.getPaddingLeft();
      var c = 0;

      for (var i = 0; i < l; i++) {
        c += lines[i].length;
      }

      for (var _i = 0; _i < lines[l].length; _i++) {
        var glyph = this._uiscene._getGlyphInfo(lines[l][_i], font);

        if (glyph) {
          if (px <= t + (glyph.width >> 1)) {
            break;
          }

          t += glyph.width + charMargin;
          c++;
        }
      }

      return {
        line: l,
        pos: c
      };
    }
  }, {
    key: "_measureContentSize",
    value: function _measureContentSize(rc) {
      var lines = this._splitContent();

      var font = this._getCachedFont();

      var lineHeight = (this.lineHeight >= 0 ? this.lineHeight : -this.lineHeight * font.maxHeight) | 0;
      var charMargin = this.charMargin;
      var autoWrap = this.autoWrap;

      if (rc.width === 0 && rc.height === 0) {
        var _iterator = _createForOfIteratorHelper(lines),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var line = _step.value;
            rc.width = Math.max(rc.width, this._uiscene._measureStringWidth(line, charMargin, font));
            rc.height += lineHeight;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (rc.height === 0) {
        var _iterator2 = _createForOfIteratorHelper(lines),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _line = _step2.value;
            var start = 0;

            if (_line.length === 0) {
              rc.height += lineHeight;
            } else {
              while (start < _line.length) {
                start += autoWrap ? Math.max(1, this._uiscene._clipStringToWidth(_line, rc.width, charMargin, start, font)) : _line.length;
                rc.height += lineHeight;
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (rc.width === 0) {
        var _iterator3 = _createForOfIteratorHelper(lines),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _line2 = _step3.value;
            rc.width = Math.max(rc.width, this._uiscene._measureStringWidth(_line2, charMargin, font));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      return rc;
    }
  }, {
    key: "_isText",
    value: function _isText() {
      return true;
    }
  }, {
    key: "_normalize",
    value: function _normalize() {
      __1.assert(!this.previousSibling || !this.previousSibling._isText(), 'Failed to execute _normalize: text node must be the first', true);

      this._textContent = this._actualContent;
      var textSiblings = [];
      var next = this.nextSibling;

      while (next && next._isText()) {
        textSiblings.push(next);
        next = next.nextSibling;
      }

      for (var _i2 = 0, _textSiblings = textSiblings; _i2 < _textSiblings.length; _i2++) {
        var sibling = _textSiblings[_i2];
        this.parentNode.removeChild(sibling);
      }

      if (!this._textContent) {
        this._remove();
      }

      return next;
    }
  }, {
    key: "_remove",
    value: function _remove() {
      var parent = this._parent;

      if (this._isText()) {
        var first = this._findFirstTextNode();

        var next = this.nextSibling;
        var nextTextNode = next && next._isText() ? next : null;
        (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_remove", this).call(this);

        if (first !== this) {
          first._styleChange();
        } else if (nextTextNode) {
          nextTextNode._styleChange();
        }
      } else {
        (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_remove", this).call(this);
      }

      if (parent) {
        parent._notifyTextContentEvents();
      }

      return this;
    }
  }, {
    key: "_init",
    value: function _init() {}
  }, {
    key: "_reparent",
    value: function _reparent(p, at) {
      if (this._parent !== p) {
        (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_reparent", this).call(this, p, at);

        if (this._isText() && this._getPseudo() === __1.RMLNode.PSEUDO_NONE) {
          var first = this._findFirstTextNode();

          first._styleChange();

          if (first !== this) {
            this.style.display = 'none';
          }

          var next = this.nextSibling;

          if (next && next._isText() && next._getPseudo() === __1.RMLNode.PSEUDO_NONE) {
            next.style.display = 'none';
          }
        }

        if (this._parent) {
          this._parent._notifyTextContentEvents();
        }
      }

      return this;
    }
  }, {
    key: "_buildVertexData",
    value: function _buildVertexData() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_buildVertexData", this).call(this);

      var clipper = this._getClipper(true);

      if (clipper) {
        var lines = this._splitContent();

        var font = this._getCachedFont();

        var lineHeight = (this.lineHeight >= 0 ? this.lineHeight : -this.lineHeight * font.maxHeight) | 0;
        var autoWrap = this.autoWrap;
        var charMargin = this.charMargin;

        var fontColor = this._getCachedFontColor();

        var uvMin = {
          x: 0,
          y: 0
        };
        var uvMax = {
          x: 0,
          y: 0
        };
        var y = this.style.getPaddingTop();

        var _iterator4 = _createForOfIteratorHelper(lines),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var line = _step4.value;
            var start = 0;

            if (line.length === 0) {
              y += lineHeight;
            } else {
              while (start < line.length) {
                var x = this.style.getPaddingLeft();
                var n = autoWrap ? Math.max(1, this._uiscene._clipStringToWidth(line, this._layout.clientRect.width, charMargin, start, font)) : line.length;

                for (var i = start; i < start + n; i++) {
                  var glyph = this._uiscene._getGlyphInfo(line[i], font);

                  if (glyph) {
                    var tex = this._uiscene._getGlyphTexture(glyph.atlasIndex);

                    uvMin.x = glyph.uMin;
                    uvMin.y = glyph.vMin;
                    uvMax.x = glyph.uMax;
                    uvMax.y = glyph.vMax;

                    this._batchList.addPrimitive(new __1.RMLRectPrimitive(x, y, glyph.width, glyph.height, uvMin.x, uvMin.y, uvMax.x, uvMax.y), clipper, tex, fontColor);

                    x += glyph.width + charMargin;
                  }
                }

                start += n;
                y += lineHeight;
              }
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }
  }, {
    key: "_splitContent",
    value: function _splitContent() {
      var content = this.actualContent || '';
      var tab2space = Array.from({
        length: 4
      }).map(function () {
        return ' ';
      }).join('');
      return content.replace(/\t/g, tab2space).split('\n');
    }
  }, {
    key: "_findFirstTextNode",
    value: function _findFirstTextNode() {
      var _a, _b;

      var el = this;

      while (((_a = el.previousSibling) === null || _a === void 0 ? void 0 : _a._isText()) && ((_b = el.previousSibling) === null || _b === void 0 ? void 0 : _b._getPseudo()) === __1.RMLNode.PSEUDO_NONE) {
        el = el.previousSibling;
      }

      return el;
    }
  }, {
    key: "_styleChange",
    value: function _styleChange() {
      __1.assert(!this.previousSibling || !this.previousSibling._isText(), 'Failed to execute _updateStyle: text node must be the first', true);

      this.style.display = 'flex';
      var content = this.textContent;

      for (var next = this.nextSibling; next && next._isText() && next._getPseudo() === __1.RMLNode.PSEUDO_NONE; next = next.nextSibling) {
        content += next.textContent;
      }

      this.actualContent = content;
    }
  }, {
    key: "nodeType",
    get: function get() {
      return __1.RMLNode.TEXT_NODE;
    }
  }, {
    key: "actualContent",
    get: function get() {
      return this._actualContent;
    },
    set: function set(text) {
      text = String(text) || '';

      if (this._actualContent !== text) {
        this._actualContent = text;

        this._invalidateLayout();

        this._invalidateContent();

        this.dispatchEvent(new __1.TextEvent(__1.TextEvent.NAME_CONTENT_CHANGE));
      }
    }
  }, {
    key: "textContent",
    get: function get() {
      return this._textContent;
    },
    set: function set(text) {
      text = String(text) || '';

      if (this._textContent !== text) {
        this._textContent = text;

        if (this._isText()) {
          this._findFirstTextNode()._styleChange();
        } else {
          this.actualContent = text;
        }

        if (this._parent) {
          this._parent._notifyTextContentEvents();
        }
      }
    }
  }, {
    key: "autoWrap",
    get: function get() {
      return this._autoWrap;
    },
    set: function set(val) {
      this._autoWrap = !!val;
    }
  }, {
    key: "charMargin",
    get: function get() {
      return this._charMargin;
    },
    set: function set(val) {
      this._charMargin = Number(val);
    }
  }, {
    key: "lineHeight",
    get: function get() {
      return this._lineHeight;
    },
    set: function set(val) {
      this._lineHeight = val <= 0 ? -1 : val;
    }
  }]);
  return Text;
}(__1.RMLNode);

exports.Text = Text;

/***/ }),

/***/ "./document.ts":
/*!*********************!*\
  !*** ./document.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMLDocument = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var RMLDocument = function (_$RMLNode) {
  (0, _inherits2.default)(RMLDocument, _$RMLNode);

  var _super = _createSuper(RMLDocument);

  function RMLDocument(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, RMLDocument);
    _this = _super.call(this, uiscene);
    _this._textContent = '';
    return _this;
  }

  (0, _createClass2.default)(RMLDocument, [{
    key: "appendChild",
    value: function appendChild(child) {
      if (child.nodeType !== _1.RMLNode.ELEMENT_NODE) {
        throw new Error('Failed to execute appendChild: only element can be inserted into document');
      } else if (this.childElementCount > 0) {
        throw new Error('Failed to execute appendChild: only one element can be inserted into document');
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(RMLDocument.prototype), "appendChild", this).call(this, child);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(newElement, referenceElement) {
      if (!newElement || newElement.nodeType !== _1.RMLNode.ELEMENT_NODE) {
        throw new Error('Failed to execute insertBefore: only element can be inserted into document');
      } else if (referenceElement || this.childElementCount > 0) {
        throw new Error('Failed to execute insertBefore: only one element can be inserted into document');
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(RMLDocument.prototype), "appendChild", this).call(this, newElement);
    }
  }, {
    key: "append",
    value: function append() {
      this._append.apply(this, arguments);
    }
  }, {
    key: "prepend",
    value: function prepend() {
      this._prepend.apply(this, arguments);
    }
  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(selectors) {
      return new _1.RMLStaticNodeList(this._uiscene._querySelectorAll(this, selectors, true, false));
    }
  }, {
    key: "querySelector",
    value: function querySelector(selectors) {
      return this._uiscene._querySelectorOne(this, selectors, true, false);
    }
  }, {
    key: "getElementsByTagName",
    value: function getElementsByTagName(tagname) {
      var results = [];

      for (var child = this.firstElementChild; child; child = child.nextElementSibling) {
        this._uiscene._getElementsByTagName(child, tagname, results);
      }

      return new _1.RMLStaticNodeList(results);
    }
  }, {
    key: "getElementsByClassName",
    value: function getElementsByClassName(classnames) {
      var results = [];
      classnames = classnames || '';
      var classNameList = classnames.split(/\s+/).filter(function (val) {
        return !!val;
      });

      if (classNameList.length > 0) {
        for (var child = this.firstElementChild; child; child = child.nextElementSibling) {
          this._uiscene._getElementsByClassName(child, classNameList, results);
        }
      }

      return new _1.RMLStaticNodeList(results);
    }
  }, {
    key: "getElementById",
    value: function getElementById(id) {
      return this._uiscene._getElementById(this, id);
    }
  }, {
    key: "createElement",
    value: function createElement(tagname) {
      return this._uiscene.createElement(tagname);
    }
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      return {
        position: 'absolute',
        flexDirection: 'column',
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0)'
      };
    }
  }, {
    key: "nodeType",
    get: function get() {
      return _1.RMLNode.DOCUMENT_NODE;
    }
  }, {
    key: "nodeName",
    get: function get() {
      return '#document';
    }
  }, {
    key: "head",
    get: function get() {
      return this.querySelector('head');
    }
  }, {
    key: "body",
    get: function get() {
      return this.querySelector('body');
    }
  }, {
    key: "baseURI",
    get: function get() {
      return this._uiscene.baseURI;
      ;
    },
    set: function set(val) {
      this._uiscene.baseURI = val;
    }
  }, {
    key: "textContent",
    get: function get() {
      return this._textContent;
    },
    set: function set(val) {
      this._textContent = val;
    }
  }, {
    key: "documentElement",
    get: function get() {
      return this.firstElementChild || null;
    }
  }, {
    key: "children",
    get: function get() {
      return this._childrenElements;
    }
  }, {
    key: "childElementCount",
    get: function get() {
      return this._childrenElements.length;
    }
  }, {
    key: "firstElementChild",
    get: function get() {
      return this._getFirstChild(true);
    }
  }, {
    key: "lastElementChild",
    get: function get() {
      return this._getLastChild(true);
    }
  }]);
  return RMLDocument;
}(_1.RMLNode);

exports.RMLDocument = RMLDocument;

/***/ }),

/***/ "./dummy_element.ts":
/*!**************************!*\
  !*** ./dummy_element.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DummyElement = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var DummyElement = function (_$RMLElement) {
  (0, _inherits2.default)(DummyElement, _$RMLElement);

  var _super = _createSuper(DummyElement);

  function DummyElement(uiscene) {
    (0, _classCallCheck2.default)(this, DummyElement);
    return _super.call(this, uiscene);
  }

  (0, _createClass2.default)(DummyElement, [{
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      return {
        display: 'none'
      };
    }
  }]);
  return DummyElement;
}(_1.RMLElement);

DummyElement = __decorate([_1.tagname('link'), _1.tagname('head'), _1.tagname('meta'), __metadata("design:paramtypes", [_1.GUI])], DummyElement);
exports.DummyElement = DummyElement;

/***/ }),

/***/ "./element.ts":
/*!********************!*\
  !*** ./element.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../node_modules/@babel/runtime/helpers/extends.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMLElement = exports.RMLClassList = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var RMLClassList = function () {
  function RMLClassList(el) {
    (0, _classCallCheck2.default)(this, RMLClassList);
    this._classList = [];
    this._value = '';
    this._valueChanged = false;
    var proxy = new Proxy(this, {
      get: function get(target, name) {
        if (typeof name === 'string' && /^\d+$/.test(name)) {
          return target._classList[parseInt(name)];
        } else {
          return target[name];
        }
      }
    });

    RMLClassList._elementMap.set(proxy, el);

    return proxy;
  }

  (0, _createClass2.default)(RMLClassList, [{
    key: "_setValue",
    value: function _setValue(val, dispatch) {
      this._classList = val.split(/\s+/).filter(function (val) {
        return !!val;
      });
      this._valueChanged = true;

      if (dispatch) {
        this._notify();
      }
    }
  }, {
    key: "_notify",
    value: function _notify() {
      var el = RMLClassList._elementMap.get(this);

      el.dispatchEvent(new _1.AttributeChangeEvent('class', false));
    }
  }, {
    key: "add",
    value: function add() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var _i = 0, _args = args; _i < _args.length; _i++) {
        var arg = _args[_i];

        if (!arg || arg.indexOf(' ') >= 0) {
          throw new Error('Failed to add class: class name is invalid');
        }

        if (arg === '') {
          throw new Error('Failed to add class: class name is empty');
        }

        if (this._classList.indexOf(arg) < 0) {
          this._classList.push(arg);

          this._valueChanged = true;

          this._notify();
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _args2 = args; _i2 < _args2.length; _i2++) {
        var arg = _args2[_i2];

        var index = this._classList.indexOf(arg);

        if (index >= 0) {
          this._classList.splice(index, 1);

          this._valueChanged = true;

          this._notify();
        }
      }
    }
  }, {
    key: "toggle",
    value: function toggle(className) {
      this._valueChanged = true;

      var index = this._classList.indexOf(className);

      if (index >= 0) {
        this._classList.splice(index, 1);

        this._notify();

        return false;
      } else {
        this._classList.push(className);

        this._notify();

        return true;
      }
    }
  }, {
    key: "contains",
    value: function contains(className) {
      return this._classList.indexOf(className) >= 0;
    }
  }, {
    key: "replace",
    value: function replace(oldClassName, newClassName) {
      if (newClassName !== oldClassName) {
        var _this$_classList;

        if (!oldClassName || oldClassName.indexOf(' ') >= 0) {
          throw new Error('Failed to replace class: old class name is invalid');
        }

        oldClassName = oldClassName.trim();

        if (oldClassName === '') {
          throw new Error('Failed to replace class: old class name is empty');
        }

        var index = this._classList.indexOf(oldClassName);

        if (index < 0) {
          throw new Error('Failed to replace class: old class name not exists');
        }

        newClassName = newClassName || '';
        newClassName = newClassName.trim();
        var newClassNames = newClassName.split(/\s+/).filter(function (val) {
          return !!val;
        });

        (_this$_classList = this._classList).splice.apply(_this$_classList, [index, 1].concat((0, _toConsumableArray2.default)(newClassNames)));

        this._notify();
      }
    }
  }, {
    key: "value",
    get: function get() {
      if (this._valueChanged) {
        this._valueChanged = false;
        this._value = this._classList.join(' ');
      }

      return this._value;
    },
    set: function set(val) {
      this._setValue(val, true);
    }
  }, {
    key: "length",
    get: function get() {
      return this._classList.length;
    }
  }]);
  return RMLClassList;
}();

exports.RMLClassList = RMLClassList;
RMLClassList._elementMap = new WeakMap();

var RMLElement = function (_$RMLNode) {
  (0, _inherits2.default)(RMLElement, _$RMLNode);

  var _super = _createSuper(RMLElement);

  function RMLElement(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, RMLElement);
    _this = _super.call(this, uiscene);
    _this._tagname = null;
    _this._attributes = {};
    _this._classList = new RMLClassList((0, _assertThisInitialized2.default)(_this));

    _this.addEventListener(_1.AttributeChangeEvent.NAME, function (e) {
      var data = e;

      if (data.name === 'class') {
        _this._uiscene._markStyleRefreshForElement((0, _assertThisInitialized2.default)(_this));
      }
    });

    return _this;
  }

  (0, _createClass2.default)(RMLElement, [{
    key: "getAttribute",
    value: function getAttribute(k) {
      return k === 'class' ? this._classList.value : this._attributes && this._attributes[k] || null;
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(k, v) {
      v = v || null;

      if (this._attributes[k] !== v) {
        this._attributes[k] = v;

        if (k === 'class') {
          this._classList._setValue(v || '', false);
        } else if (k === 'style') {
          this._uiscene._markStyleRefreshForElement(this);
        }

        this.dispatchEvent(new _1.AttributeChangeEvent(k, false));
      }
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(k) {
      if (this._attributes[k] !== undefined) {
        delete this._attributes[k];

        if (k === 'style') {
          this._uiscene._markStyleRefreshForElement(this);
        }

        this.dispatchEvent(new _1.AttributeChangeEvent(k, true));
      }
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(k) {
      return this._attributes[k] !== undefined;
    }
  }, {
    key: "hasAttributes",
    value: function hasAttributes() {
      return Object.getOwnPropertyNames(this._attributes).length !== 0;
    }
  }, {
    key: "insertAdjacentElement",
    value: function insertAdjacentElement(position, element) {
      if (!element) {
        return null;
      }

      if (position === 'beforebegin') {
        this.before(element);
        return element;
      } else if (position === 'afterend') {
        this.after(element);
        return element;
      } else if (position === 'afterbegin') {
        this.prepend(element);
        return element;
      } else if (position === 'beforeend') {
        this.append(element);
        return element;
      }

      return null;
    }
  }, {
    key: "insertAdjacentText",
    value: function insertAdjacentText(position, text) {
      if (!text) {
        return null;
      }

      if (position === 'beforebegin') {
        this.before(text);
        return text;
      } else if (position === 'afterend') {
        this.after(text);
        return text;
      } else if (position === 'afterbegin') {
        this.prepend(text);
        return text;
      } else if (position === 'beforeend') {
        this.append(text);
        return text;
      }

      return null;
    }
  }, {
    key: "matches",
    value: function matches(selectorString) {
      return this.ownerDocument.querySelectorAll(selectorString).indexOf(this) >= 0;
    }
  }, {
    key: "cloneNode",
    value: function cloneNode(deep) {
      var clone = this._uiscene.createElement(this.tagName);

      clone.classList._setValue(this.classList.value, false);

      clone._attributes = (0, _extends2.default)({}, this._attributes);

      if (deep) {
        for (var child = this.firstChild; child; child = child.nextSibling) {
          clone.appendChild(child.cloneNode(deep));
        }
      }

      return clone;
    }
  }, {
    key: "replaceWith",
    value: function replaceWith() {
      for (var _len3 = arguments.length, nodes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nodes[_key3] = arguments[_key3];
      }

      for (var _i3 = 0, _nodes = nodes; _i3 < _nodes.length; _i3++) {
        var node = _nodes[_i3];
        this.before.apply(this, nodes);
      }

      this.remove();
    }
  }, {
    key: "_updateStyle",
    value: function _updateStyle(val) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(RMLElement.prototype), "_updateStyle", this).call(this, val);

      this._rawSetStyleAttribute(val);
    }
  }, {
    key: "_applyInlineStyles",
    value: function _applyInlineStyles() {
      this.style.applyStyles(this.getAttribute('style') || '', true);
    }
  }, {
    key: "_getNumberAttribute",
    value: function _getNumberAttribute(name, defaultValue) {
      var val = this.getAttribute(name);
      var num = val === null ? defaultValue : Number(val);
      return Number.isNaN(num) ? defaultValue : num;
    }
  }, {
    key: "_setNumberAttribute",
    value: function _setNumberAttribute(name, val) {
      this.setAttribute(name, String(val));
    }
  }, {
    key: "_getStringAttribute",
    value: function _getStringAttribute(name, defaultValue) {
      var val = this.getAttribute(name);
      return val ? String(val) : defaultValue;
    }
  }, {
    key: "_setStringAttribute",
    value: function _setStringAttribute(name, val) {
      this.setAttribute(name, String(val));
    }
  }, {
    key: "_rawSetStyleAttribute",
    value: function _rawSetStyleAttribute(style) {
      style = style || '';

      if (this._attributes['style'] !== style) {
        this._attributes['style'] = style;
        this.dispatchEvent(new _1.AttributeChangeEvent('style', false));
      }
    }
  }, {
    key: "_setTagName",
    value: function _setTagName(name) {
      this._tagname = name;
    }
  }, {
    key: "remove",
    value: function remove() {
      this._remove();

      return this;
    }
  }, {
    key: "before",
    value: function before() {
      this._before.apply(this, arguments);
    }
  }, {
    key: "after",
    value: function after() {
      this._after.apply(this, arguments);
    }
  }, {
    key: "append",
    value: function append() {
      this._append.apply(this, arguments);
    }
  }, {
    key: "prepend",
    value: function prepend() {
      this._prepend.apply(this, arguments);
    }
  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(selectors) {
      return new _1.RMLStaticNodeList(this._uiscene._querySelectorAll(this, selectors, true, false));
    }
  }, {
    key: "querySelector",
    value: function querySelector(selectors) {
      return this._uiscene._querySelectorOne(this, selectors, true, false);
    }
  }, {
    key: "getElementById",
    value: function getElementById(id) {
      for (var child = this.firstElementChild; child; child = child.nextElementSibling) {
        var el = this._uiscene._getElementById(child, id);

        if (el) {
          return el;
        }
      }

      return null;
    }
  }, {
    key: "getElementsByTagName",
    value: function getElementsByTagName(tagname) {
      var results = [];

      for (var child = this.firstElementChild; child; child = child.nextElementSibling) {
        this._uiscene._getElementsByTagName(child, tagname, results);
      }

      return new _1.RMLStaticNodeList(results);
    }
  }, {
    key: "getElementsByClassName",
    value: function getElementsByClassName(classnames) {
      var results = [];
      classnames = classnames || '';
      var classNameList = classnames.split(/\s+/).filter(function (val) {
        return !!val;
      });

      if (classNameList.length > 0) {
        for (var child = this.firstElementChild; child; child = child.nextElementSibling) {
          this._uiscene._getElementsByClassName(child, classNameList, results);
        }
      }

      return new _1.RMLStaticNodeList(results);
    }
  }, {
    key: "children",
    get: function get() {
      return this._childrenElements;
    }
  }, {
    key: "childElementCount",
    get: function get() {
      return this._childrenElements.length;
    }
  }, {
    key: "nodeType",
    get: function get() {
      return _1.RMLNode.ELEMENT_NODE;
    }
  }, {
    key: "localName",
    get: function get() {
      return this._tagname;
    }
  }, {
    key: "tagName",
    get: function get() {
      return this._tagname;
    }
  }, {
    key: "id",
    get: function get() {
      return this._attributes.id || '';
    },
    set: function set(id) {
      this._attributes.id = id || '';
    }
  }, {
    key: "classList",
    get: function get() {
      return this._classList;
    }
  }, {
    key: "className",
    get: function get() {
      return this._classList.value;
    }
  }, {
    key: "attributes",
    get: function get() {
      var result = [];

      for (var name in this._attributes) {
        result.push({
          name: name,
          value: this._attributes[name]
        });
      }

      return result;
    }
  }, {
    key: "firstElementChild",
    get: function get() {
      return this._getFirstChild(true);
    }
  }, {
    key: "lastElementChild",
    get: function get() {
      return this._getLastChild(true);
    }
  }, {
    key: "nextElementSibling",
    get: function get() {
      return this._getNextSibling(true);
    }
  }, {
    key: "previousElementSibling",
    get: function get() {
      return this._getPreviousSibling(true);
    }
  }]);
  return RMLElement;
}(_1.RMLNode);

RMLElement = __decorate([_1.tagname('div'), __metadata("design:paramtypes", [_1.GUI])], RMLElement);
exports.RMLElement = RMLElement;

/***/ }),

/***/ "./events.ts":
/*!*******************!*\
  !*** ./events.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMTreeEvent = exports.TextContentChangeEvent = exports.AttributeChangeEvent = exports.ValueChangeEvent = exports.TextEvent = exports.ElementHittestEvent = exports.ElementBuildContentEvent = exports.ElementLayoutEvent = exports.GUIFocusEvent = exports.GUIKeyEvent = exports.GUIMouseEvent = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var GUIMouseEvent = function (_$Event) {
  (0, _inherits2.default)(GUIMouseEvent, _$Event);

  var _super = _createSuper(GUIMouseEvent);

  function GUIMouseEvent(type, x, y, button, keymod) {
    var _this;

    (0, _classCallCheck2.default)(this, GUIMouseEvent);
    _this = _super.call(this, type, {
      bubbles: true,
      cancelable: true
    });
    _this.x = x;
    _this.y = y;
    _this.button = button;
    _this.keymod = keymod;
    return _this;
  }

  return GUIMouseEvent;
}(_1.Event);

exports.GUIMouseEvent = GUIMouseEvent;
GUIMouseEvent.NAME_MOUSEDOWN = 'mousedown';
GUIMouseEvent.NAME_MOUSEUP = 'mouseup';
GUIMouseEvent.NAME_MOUSEMOVE = 'mousemove';
GUIMouseEvent.NAME_MOUSECLICK = 'click';
GUIMouseEvent.NAME_MOUSEDBLCLICK = 'dblclick';
GUIMouseEvent.NAME_MOUSEENTER = 'mouseenter';
GUIMouseEvent.NAME_MOUSELEAVE = 'mouseleave';
GUIMouseEvent.NAME_MOUSEIN = 'mousein';
GUIMouseEvent.NAME_MOUSEOUT = 'mouseout';

var GUIKeyEvent = function (_$Event2) {
  (0, _inherits2.default)(GUIKeyEvent, _$Event2);

  var _super2 = _createSuper(GUIKeyEvent);

  function GUIKeyEvent(type, key, name, charcode, repeat, keymod) {
    var _this2;

    (0, _classCallCheck2.default)(this, GUIKeyEvent);
    _this2 = _super2.call(this, type, {
      bubbles: true,
      cancelable: true
    });
    _this2.key = key;
    _this2.name = name;
    _this2.charCode = charcode;
    _this2.repeat = repeat;
    _this2.keymod = keymod;
    return _this2;
  }

  return GUIKeyEvent;
}(_1.Event);

exports.GUIKeyEvent = GUIKeyEvent;
GUIKeyEvent.NAME_KEYDOWN = 'keydown';
GUIKeyEvent.NAME_KEYUP = 'keyup';
GUIKeyEvent.NAME_KEYPRESS = 'keypress';

var GUIFocusEvent = function (_$Event3) {
  (0, _inherits2.default)(GUIFocusEvent, _$Event3);

  var _super3 = _createSuper(GUIFocusEvent);

  function GUIFocusEvent(type) {
    (0, _classCallCheck2.default)(this, GUIFocusEvent);
    return _super3.call(this, type);
  }

  return GUIFocusEvent;
}(_1.Event);

exports.GUIFocusEvent = GUIFocusEvent;
GUIFocusEvent.NAME_FOCUS = 'focus';
GUIFocusEvent.NAME_BLUR = 'blur';

var ElementLayoutEvent = function (_$Event4) {
  (0, _inherits2.default)(ElementLayoutEvent, _$Event4);

  var _super4 = _createSuper(ElementLayoutEvent);

  function ElementLayoutEvent() {
    (0, _classCallCheck2.default)(this, ElementLayoutEvent);
    return _super4.call(this, ElementLayoutEvent.NAME);
  }

  return ElementLayoutEvent;
}(_1.Event);

exports.ElementLayoutEvent = ElementLayoutEvent;
ElementLayoutEvent.NAME = 'layout';

var ElementBuildContentEvent = function (_$Event5) {
  (0, _inherits2.default)(ElementBuildContentEvent, _$Event5);

  var _super5 = _createSuper(ElementBuildContentEvent);

  function ElementBuildContentEvent(type, batchList) {
    var _this3;

    (0, _classCallCheck2.default)(this, ElementBuildContentEvent);
    _this3 = _super5.call(this, type);
    _this3.batchList = batchList;
    return _this3;
  }

  return ElementBuildContentEvent;
}(_1.Event);

exports.ElementBuildContentEvent = ElementBuildContentEvent;
ElementBuildContentEvent.NAME_PREBUILD = 'prebuildcontent';
ElementBuildContentEvent.NAME_POSTBUILD = 'postbuildcontent';

var ElementHittestEvent = function (_$Event6) {
  (0, _inherits2.default)(ElementHittestEvent, _$Event6);

  var _super6 = _createSuper(ElementHittestEvent);

  function ElementHittestEvent(x, y) {
    var _this4;

    (0, _classCallCheck2.default)(this, ElementHittestEvent);
    _this4 = _super6.call(this, ElementHittestEvent.NAME);
    _this4.x = x;
    _this4.y = y;
    _this4.allow = true;
    return _this4;
  }

  return ElementHittestEvent;
}(_1.Event);

exports.ElementHittestEvent = ElementHittestEvent;
ElementHittestEvent.NAME = 'hittest';

var TextEvent = function (_$Event7) {
  (0, _inherits2.default)(TextEvent, _$Event7);

  var _super7 = _createSuper(TextEvent);

  function TextEvent(type) {
    (0, _classCallCheck2.default)(this, TextEvent);
    return _super7.call(this, type);
  }

  return TextEvent;
}(_1.Event);

exports.TextEvent = TextEvent;
TextEvent.NAME_CONTENT_CHANGE = 'textcontentchange';
TextEvent.NAME_FONT_CHANGE = 'textfontchange';

var ValueChangeEvent = function (_$Event8) {
  (0, _inherits2.default)(ValueChangeEvent, _$Event8);

  var _super8 = _createSuper(ValueChangeEvent);

  function ValueChangeEvent(value) {
    var _this5;

    (0, _classCallCheck2.default)(this, ValueChangeEvent);
    _this5 = _super8.call(this, ValueChangeEvent.NAME);
    _this5.value = value;
    return _this5;
  }

  return ValueChangeEvent;
}(_1.Event);

exports.ValueChangeEvent = ValueChangeEvent;
ValueChangeEvent.NAME = 'valuechange';

var AttributeChangeEvent = function (_$Event9) {
  (0, _inherits2.default)(AttributeChangeEvent, _$Event9);

  var _super9 = _createSuper(AttributeChangeEvent);

  function AttributeChangeEvent(name, removed) {
    var _this6;

    (0, _classCallCheck2.default)(this, AttributeChangeEvent);
    _this6 = _super9.call(this, AttributeChangeEvent.NAME);
    _this6.name = name;
    _this6.removed = removed;
    return _this6;
  }

  return AttributeChangeEvent;
}(_1.Event);

exports.AttributeChangeEvent = AttributeChangeEvent;
AttributeChangeEvent.NAME = 'attributechange';

var TextContentChangeEvent = function (_$Event10) {
  (0, _inherits2.default)(TextContentChangeEvent, _$Event10);

  var _super10 = _createSuper(TextContentChangeEvent);

  function TextContentChangeEvent() {
    (0, _classCallCheck2.default)(this, TextContentChangeEvent);
    return _super10.call(this, TextContentChangeEvent.NAME, {
      bubbles: true,
      cancelable: true
    });
  }

  return TextContentChangeEvent;
}(_1.Event);

exports.TextContentChangeEvent = TextContentChangeEvent;
TextContentChangeEvent.NAME = 'elementtextcontentchange';

var DOMTreeEvent = function (_$Event11) {
  (0, _inherits2.default)(DOMTreeEvent, _$Event11);

  var _super11 = _createSuper(DOMTreeEvent);

  function DOMTreeEvent(type, parent) {
    var _this7;

    (0, _classCallCheck2.default)(this, DOMTreeEvent);
    _this7 = _super11.call(this, type, {
      bubbles: type !== DOMTreeEvent.NAME_FOCUSED,
      cancelable: type !== DOMTreeEvent.NAME_FOCUSED
    });
    _this7.parent = parent;
    return _this7;
  }

  return DOMTreeEvent;
}(_1.Event);

exports.DOMTreeEvent = DOMTreeEvent;
DOMTreeEvent.NAME_INSERTED = 'elementinserted';
DOMTreeEvent.NAME_REMOVED = 'elementremoved';
DOMTreeEvent.NAME_FOCUSED = 'elementfocused';

/***/ }),

/***/ "./flow_element.ts":
/*!*************************!*\
  !*** ./flow_element.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowElement = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var FlowElement = function (_$RMLElement) {
  (0, _inherits2.default)(FlowElement, _$RMLElement);

  var _super = _createSuper(FlowElement);

  function FlowElement(uiscene) {
    (0, _classCallCheck2.default)(this, FlowElement);
    return _super.call(this, uiscene);
  }

  (0, _createClass2.default)(FlowElement, [{
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = {};
      style.width = '100%';
      style.height = 'auto';
      style.flexDirection = 'column';
      style.justifyContent = 'flex-start';
      style.alignItems = 'stretch';
      style.flex = '0 0 auto';
      style.overflow = 'auto';
      return style;
    }
  }]);
  return FlowElement;
}(_1.RMLElement);

FlowElement = __decorate([_1.tagname('html'), _1.tagname('body'), __metadata("design:paramtypes", [_1.GUI])], FlowElement);
exports.FlowElement = FlowElement;

/***/ }),

/***/ "./font.ts":
/*!*****************!*\
  !*** ./font.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Font = exports.FontCanvas = void 0;

var types_1 = __webpack_require__(/*! ./types */ "./types.ts");

var FontCanvas = function () {
  function FontCanvas() {
    (0, _classCallCheck2.default)(this, FontCanvas);
  }

  (0, _createClass2.default)(FontCanvas, null, [{
    key: "_realize",
    value: function _realize() {
      if (!this._canvas) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = 512;
        this._canvas.height = 512;
        this._canvas.style.left = '-10000px';
        this._canvas.style.position = 'absolute';
        document.body.appendChild(this._canvas);
        this._context = this._canvas.getContext('2d');
        this._context.textBaseline = 'top';
        this._context.textAlign = 'left';
        this._context.fillStyle = 'transparent';

        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._context.fillStyle = '#ffffff';
        this._context.imageSmoothingEnabled = true;
      }
    }
  }, {
    key: "canvas",
    get: function get() {
      this._realize();

      return this._canvas;
    }
  }, {
    key: "context",
    get: function get() {
      this._realize();

      return this._context;
    }
  }, {
    key: "font",
    get: function get() {
      return this._currentFont;
    },
    set: function set(font) {
      if (font && font !== this._currentFont) {
        this.context.font = font.fontName;
        this._currentFont = font;
      }
    }
  }]);
  return FontCanvas;
}();

exports.FontCanvas = FontCanvas;
FontCanvas._canvas = null;
FontCanvas._context = null;
FontCanvas._currentFont = null;

var Font = function () {
  function Font(name) {
    (0, _classCallCheck2.default)(this, Font);
    this.fontName = name;
    this._top = 0;
    this._bottom = 0;
    this._size = 0;
    this._family = '';
    this._name = name;

    if (this._name) {
      this._normalizeFont();
    }
  }

  (0, _createClass2.default)(Font, [{
    key: "equalTo",
    value: function equalTo(other) {
      return this._size === other._size && this._family === other._family;
    }
  }, {
    key: "_measureFontHeight",
    value: function _measureFontHeight() {
      var oldFont = FontCanvas.context.font;
      var oldTextBaseline = FontCanvas.context.textBaseline;
      var oldFillStyle = FontCanvas.context.fillStyle;
      FontCanvas.context.font = this._name;
      var testString = 'bdfghijklpq国美|_~';
      var metric = FontCanvas.context.measureText(testString);
      var top, bottom;

      if (typeof metric.fontBoundingBoxAscent === 'number' && typeof metric.fontBoundingBoxDescent === 'number') {
        top = Math.floor(metric.fontBoundingBoxAscent);
        bottom = Math.ceil(metric.fontBoundingBoxDescent);
      } else {
        top = 0;
        bottom = this._size - 1;
        var extra = 10;
        var halfExtra = extra >> 1;
        var maxWidth = Math.ceil(metric.width) + extra;
        var maxHeight = this._size + extra;
        FontCanvas.context.clearRect(0, 0, maxWidth, maxHeight);
        FontCanvas.context.textBaseline = 'top';
        FontCanvas.context.fillStyle = '#ffffff';
        FontCanvas.context.fillText(testString, halfExtra, halfExtra);
        var bitmap = FontCanvas.context.getImageData(0, 0, maxWidth, maxHeight);
        var pixels = bitmap.data;

        for (var i = 0; i < maxWidth * maxHeight; i++) {
          if (pixels[i * 4 + 3] > 0) {
            top = Math.floor(i / maxWidth);
            break;
          }
        }

        for (var _i = maxWidth * maxHeight - 1; _i >= 0; _i--) {
          if (pixels[_i * 4 + 3] > 0) {
            bottom = Math.floor(_i / maxWidth);
            break;
          }
        }

        top -= halfExtra;
        bottom -= halfExtra;
      }

      FontCanvas.context.font = oldFont;
      FontCanvas.context.textBaseline = oldTextBaseline;
      FontCanvas.context.fillStyle = oldFillStyle;
      return [top, bottom];
    }
  }, {
    key: "_normalizeFont",
    value: function _normalizeFont() {
      var oldFont = FontCanvas.context.font;
      FontCanvas.context.font = this._name;
      this._name = FontCanvas.context.font;

      var fontParts = this._name.split(/\s+/);

      types_1.assert(fontParts.length >= 2, 'normalize font failed', true);
      var sizePart = fontParts[fontParts.length - 2];
      types_1.assert(sizePart.substr(sizePart.length - 2) === 'px', 'normalize font failed', true);
      this._size = parseInt(sizePart.substr(0, sizePart.length - 2));
      this._family = fontParts[fontParts.length - 1];

      var _ref = (0, _toConsumableArray2.default)(this._measureFontHeight());

      this._top = _ref[0];
      this._bottom = _ref[1];
      FontCanvas.context.font = oldFont;
    }
  }, {
    key: "fontName",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;

      this._normalizeFont();
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    }
  }, {
    key: "family",
    get: function get() {
      return this._family;
    }
  }, {
    key: "top",
    get: function get() {
      return this._top;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this._bottom;
    }
  }, {
    key: "maxHeight",
    get: function get() {
      return this._bottom - this._top + 1;
    }
  }]);
  return Font;
}();

exports.Font = Font;

/***/ }),

/***/ "./glyph_manager.ts":
/*!**************************!*\
  !*** ./glyph_manager.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlyphManager = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var updateByCanvas = false;

var GlyphManager = function (_$AtlasManager) {
  (0, _inherits2.default)(GlyphManager, _$AtlasManager);

  var _super = _createSuper(GlyphManager);

  function GlyphManager(renderer, cacheWidth, cacheHeight, cachePadding) {
    (0, _classCallCheck2.default)(this, GlyphManager);
    return _super.call(this, renderer, Math.max(cacheWidth, 2), cacheHeight, cachePadding, 'rgba', true);
  }

  (0, _createClass2.default)(GlyphManager, [{
    key: "getGlyphTexture",
    value: function getGlyphTexture(index) {
      return this.getAtlasTexture(index);
    }
  }, {
    key: "getGlyphInfo",
    value: function getGlyphInfo(char, font) {
      if (!char || !font) {
        return null;
      }

      var glyphInfo = this.getAtlasInfo(this._hash(char, font));

      if (!glyphInfo) {
        glyphInfo = this._cacheGlyph(char, font);
      }

      return glyphInfo;
    }
  }, {
    key: "measureStringWidth",
    value: function measureStringWidth(str, charMargin, font) {
      var w = 0;

      for (var i = 0; i < str.length; i++) {
        var margin = i === 0 ? 0 : charMargin;
        var glyphInfo = this.getGlyphInfo(str[i], font);
        w += margin + (glyphInfo ? glyphInfo.width : 0);
      }

      return w;
    }
  }, {
    key: "clipStringToWidth",
    value: function clipStringToWidth(str, width, charMargin, start, font) {
      var sum = 0;
      var i = start;

      for (; i < str.length; i++) {
        var margin = i === start ? 0 : charMargin;
        var glyphInfo = this.getGlyphInfo(str[i], font);
        var charWidth = margin + (glyphInfo ? glyphInfo.width : 0);
        sum += charWidth;

        if (sum > width) {
          break;
        }
      }

      return i - start;
    }
  }, {
    key: "_hash",
    value: function _hash(char, font) {
      return "".concat(font.family, "@").concat(font.size, "&").concat(char);
    }
  }, {
    key: "_cacheGlyph",
    value: function _cacheGlyph(char, font) {
      if (updateByCanvas) {
        var bitmap = this._getGlyphBitmap(char, font);

        return this.pushCanvas(this._hash(char, font), _1.FontCanvas.context, bitmap.x, bitmap.y, bitmap.w, bitmap.h);
      } else {
        var _bitmap = this._getGlyphBitmap(char, font);

        return this.pushBitmap(this._hash(char, font), _bitmap);
      }
    }
  }, {
    key: "_getGlyphBitmap",
    value: function _getGlyphBitmap(char, font) {
      if (!font) {
        return null;
      }

      _1.FontCanvas.font = font;

      var metric = _1.FontCanvas.context.measureText(char);

      var w = metric.width;

      if (w === 0) {
        return null;
      }

      if (typeof metric.actualBoundingBoxRight === 'number') {
        w = Math.floor(Math.max(w, metric.actualBoundingBoxRight) + 0.8);
      }

      var h = font.bottom - font.top + 1;

      if (updateByCanvas) {
        _1.FontCanvas.canvas.width = w;
        _1.FontCanvas.canvas.height = h;
        _1.FontCanvas.context.textBaseline = 'top';
        _1.FontCanvas.context.fillStyle = '#ffffff';
      }

      _1.FontCanvas.context.clearRect(0, 0, w + 2, h);

      _1.FontCanvas.context.fillText(char, 0, -font.top);

      if (updateByCanvas) {
        return {
          x: 0,
          y: 0,
          w: w,
          h: h
        };
      } else {
        var bitmap = _1.FontCanvas.context.getImageData(0, 0, w, h);

        return bitmap;
      }
    }
  }]);
  return GlyphManager;
}(_1.AtlasManager);

exports.GlyphManager = GlyphManager;

/***/ }),

/***/ "./gui.ts":
/*!****************!*\
  !*** ./gui.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../node_modules/@babel/runtime/helpers/extends.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e5) { throw _e5; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e6) { didErr = true; err = _e6; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GUI = exports.tagname = exports.ElementRegistry = void 0;

var Yoga = __webpack_require__(/*! ./typeflex/api */ "./typeflex/api.ts");

var _1 = __webpack_require__(/*! . */ "./index.ts");

var misc_1 = __webpack_require__(/*! ./misc */ "./misc/index.ts");

var asset_1 = __webpack_require__(/*! ./asset */ "./asset/index.ts");

var GUIDrawVisitor = function (_misc_1$Visitor) {
  (0, _inherits2.default)(GUIDrawVisitor, _misc_1$Visitor);

  var _super = _createSuper(GUIDrawVisitor);

  function GUIDrawVisitor(renderer) {
    var _this;

    (0, _classCallCheck2.default)(this, GUIDrawVisitor);
    _this = _super.call(this);
    _this._renderer = renderer;
    return _this;
  }

  (0, _createClass2.default)(GUIDrawVisitor, [{
    key: "visitElement",
    value: function visitElement(w) {
      if (w._isVisible()) {
        w.draw(this._renderer);
      }
    }
  }]);
  return GUIDrawVisitor;
}(misc_1.Visitor);

__decorate([misc_1.visitor(_1.RMLNode), __metadata("design:type", Function), __metadata("design:paramtypes", [_1.RMLNode]), __metadata("design:returntype", void 0)], GUIDrawVisitor.prototype, "visitElement", null);

var ElementRegistry = function () {
  function ElementRegistry() {
    (0, _classCallCheck2.default)(this, ElementRegistry);
    this._constructors = {};
  }

  (0, _createClass2.default)(ElementRegistry, [{
    key: "register",
    value: function register(ctor, tagname) {
      _1.assert(!!ctor, 'Failed to register element type with null constructor', true);

      _1.assert(!!tagname, 'Failed to register element type with null tag name getter', true);

      if (typeof tagname === 'string') {
        _1.assert(!this._constructors[tagname], 'Failed to register element type: tagname already registered', true);

        this._constructors[tagname] = ctor;
      }
    }
  }, {
    key: "createElement",
    value: function createElement(gui, tagname) {
      var ctor = this._constructors[tagname] || this._constructors['div'];
      var el = new ctor(gui);

      el._setTagName(tagname);

      return el;
    }
  }]);
  return ElementRegistry;
}();

exports.ElementRegistry = ElementRegistry;
var elementRegistry = new ElementRegistry();

function tagname(name) {
  return function (ctor) {
    elementRegistry.register(ctor, name);
  };
}

exports.tagname = tagname;
var deviceMouseEvents = [_1.GUIMouseEvent.NAME_MOUSEDOWN, _1.GUIMouseEvent.NAME_MOUSEUP, _1.GUIMouseEvent.NAME_MOUSEMOVE, _1.GUIMouseEvent.NAME_MOUSECLICK, _1.GUIMouseEvent.NAME_MOUSEDBLCLICK];
var deviceKeyEvents = [_1.GUIKeyEvent.NAME_KEYDOWN, _1.GUIKeyEvent.NAME_KEYUP, _1.GUIKeyEvent.NAME_KEYPRESS];

var GUI = function () {
  function GUI(renderer, bounds) {
    var _this3 = this;

    (0, _classCallCheck2.default)(this, GUI);
    this._renderer = renderer;
    this._drawVisitor = new GUIDrawVisitor(renderer);
    this._imageManager = new _1.ImageManager(this._renderer);
    this._glyphManager = new _1.GlyphManager(this._renderer);
    this._document = null;
    this._focusElement = null;
    this._captureElement = null;
    this._hoverElements = [];
    this._layoutDirty = false;
    this._updatingLayout = false;
    this._bounds = bounds ? (0, _extends2.default)({}, bounds) : null;
    this._styleRefreshList = [];
    this._styleFullRefresh = false;
    this._ruleListImported = [];
    this._guiLoading = false;
    this._styleUpdating = false;
    this._domTag = 0;
    this._baseURI = '';
    this._topLayout = new _1.UILayout(null);

    this._topLayout.node.setDisplay(Yoga.DISPLAY_FLEX);

    this._topLayout.node.setPadding(Yoga.EDGE_LEFT, 0);

    this._topLayout.node.setPadding(Yoga.EDGE_TOP, 0);

    this._topLayout.node.setPadding(Yoga.EDGE_RIGHT, 0);

    this._topLayout.node.setPadding(Yoga.EDGE_BOTTOM, 0);

    this._topLayout.node.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);

    this._topLayout.node.setPosition(Yoga.EDGE_LEFT, this._bounds ? this._bounds.x : 0);

    this._topLayout.node.setPosition(Yoga.EDGE_TOP, this._bounds ? this._bounds.y : 0);

    this._topLayout.node.setWidth(this._bounds ? this._bounds.width : this._renderer.getDrawingBufferWidth());

    this._topLayout.node.setHeight(this._bounds ? this._bounds.height : this._renderer.getDrawingBufferHeight());

    this.addEventListener('deviceresize', function () {
      var _this2 = this;

      if (!this._bounds) {
        this._topLayout.node.setWidth(this._renderer.getDrawingBufferWidth());

        this._topLayout.node.setHeight(this._renderer.getDrawingBufferHeight());

        this.invalidateLayout();
        setTimeout(function () {
          var inputs = _this2.document.querySelectorAll('input');

          var _iterator = _createForOfIteratorHelper(inputs.values()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var input = _step.value;

              input._updateHiddenInput();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }, 0);
      }
    });

    var _iterator2 = _createForOfIteratorHelper(deviceMouseEvents),
        _step2;

    try {
      var _loop = function _loop() {
        var evt = _step2.value;

        _this3.addEventListener(evt, function (e) {
          var _this4 = this;

          var mouseEvent = e;

          if (evt === _1.GUIMouseEvent.NAME_MOUSEMOVE) {
            var hits = null;

            if (this._captureElement) {
              var v = this._captureElement.toAbsolute({
                x: 0,
                y: 0
              });

              hits = [{
                element: this._captureElement,
                x: mouseEvent.x - v.x,
                y: mouseEvent.y - v.y
              }];
            } else {
              hits = this.hitTest(mouseEvent.x, mouseEvent.y);
            }

            if (hits.length === 0) {
              this._renderer.setCursorStyle('default');
            }

            var _loop2 = function _loop2(i) {
              var info = _this4._hoverElements[i];

              if (!hits.find(function (hit) {
                return hit.element === info.element;
              })) {
                var _p = info.element.toAbsolute({
                  x: 0,
                  y: 0
                });

                info.element._onMouseOut(mouseEvent.x - _p.x, mouseEvent.y - _p.y);

                if (info.element.enabled) {
                  info.element.dispatchEvent(new _1.GUIMouseEvent(_1.GUIMouseEvent.NAME_MOUSEOUT, mouseEvent.x - _p.x, mouseEvent.y - _p.y, mouseEvent.button, mouseEvent.keymod));
                }
              }
            };

            for (var i = 0; i < this._hoverElements.length; i++) {
              _loop2(i);
            }

            var _loop3 = function _loop3(_i) {
              var info = hits[_i];

              if (!_this4._hoverElements.find(function (hit) {
                return hit.element === info.element;
              })) {
                info.element._onMouseIn(info.x, info.y);

                if (info.element.enabled) {
                  info.element.dispatchEvent(new _1.GUIMouseEvent(_1.GUIMouseEvent.NAME_MOUSEIN, info.x, info.y, mouseEvent.button, mouseEvent.keymod));
                }
              }
            };

            for (var _i = 0; _i < hits.length; _i++) {
              _loop3(_i);
            }

            var lastHover = this._hoverElements.length > 0 ? this._hoverElements[0] : null;
            var newHover = hits.length > 0 ? hits[0] : null;

            if ((lastHover === null || lastHover === void 0 ? void 0 : lastHover.element) !== (newHover === null || newHover === void 0 ? void 0 : newHover.element)) {
              if (lastHover) {
                var p = lastHover.element.toAbsolute({
                  x: 0,
                  y: 0
                });

                lastHover.element._onMouseLeave(mouseEvent.x - p.x, mouseEvent.y - p.y);

                if (lastHover.element.enabled) {
                  lastHover.element.dispatchEvent(new _1.GUIMouseEvent(_1.GUIMouseEvent.NAME_MOUSELEAVE, mouseEvent.x - p.x, mouseEvent.y - p.y, mouseEvent.button, mouseEvent.keymod));
                }
              }

              if (newHover) {
                newHover.element._onMouseEnter(newHover.x, newHover.y);

                if (newHover.element.enabled) {
                  newHover.element.dispatchEvent(new _1.GUIMouseEvent(_1.GUIMouseEvent.NAME_MOUSEENTER, newHover.x, newHover.y, mouseEvent.button, mouseEvent.keymod));
                }
              }
            }

            this._hoverElements = hits;
          }

          if (this._hoverElements.length > 0) {
            if (mouseEvent.button === 1) {
              if (evt === _1.GUIMouseEvent.NAME_MOUSEDOWN) {
                this._hoverElements[0].element._onMouseDown(this._hoverElements[0].x, this._hoverElements[0].y);

                this.setFocus(this._hoverElements[0].element.enabled ? this._hoverElements[0].element : null);
              } else if (evt === _1.GUIMouseEvent.NAME_MOUSEUP) {
                this._hoverElements[0].element._onMouseUp(this._hoverElements[0].x, this._hoverElements[0].y);
              }
            }

            var _iterator5 = _createForOfIteratorHelper(this._hoverElements),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var info = _step5.value;

                if (!info.element.enabled) {
                  continue;
                }

                var me = new _1.GUIMouseEvent(evt, info.x, info.y, mouseEvent.button, mouseEvent.keymod);
                info.element.dispatchEvent(me);

                if (me.cancelBubble) {
                  break;
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        });
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(deviceKeyEvents),
        _step3;

    try {
      var _loop4 = function _loop4() {
        var evt = _step3.value;

        _this3.addEventListener(evt, function (e) {
          var keyEvent = e;

          if (this._focusElement && this._focusElement.enabled) {
            var node = this._focusElement;

            while (node) {
              var ke = new _1.GUIKeyEvent(evt, keyEvent.key, keyEvent.name, keyEvent.charCode, keyEvent.repeat, keyEvent.keymod);
              node.dispatchEvent(ke);

              if (ke.cancelBubble) {
                break;
              }

              node = node.parentNode;
            }
          }
        });
      };

      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        _loop4();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var domChangeFunc = function domChangeFunc(e) {
      var data = e;
      this._domTag++;

      if (data.target.nodeType === _1.RMLNode.ELEMENT_NODE) {
        var el = data.target;

        if (el.tagName === 'style' || el.querySelectorAll('style')) {
          this.requireFullStyleRefresh();
        } else {
          this._markStyleRefreshForElement(data.parent || el);
        }

        if (!this._guiLoading && (el.tagName === 'link' || el.querySelector('link'))) {
          var linkElements = el.tagName === 'link' ? [data.target] : [];
          linkElements = [].concat((0, _toConsumableArray2.default)(linkElements), (0, _toConsumableArray2.default)(el.querySelectorAll('link').values()));

          var _iterator4 = _createForOfIteratorHelper(linkElements),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _el = _step4.value;

              this._importLinkContent(_el);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      }
    };

    this.addEventListener(_1.DOMTreeEvent.NAME_INSERTED, domChangeFunc);
    this.addEventListener(_1.DOMTreeEvent.NAME_REMOVED, domChangeFunc);
    this._document = new _1.RMLDocument(this);

    this._topLayout.appendChild(this._document._getLayout());

    var root = this._document.createElement('html');

    root.append(this._document.createElement('head'));
    root.append(this._document.createElement('body'));

    this._document.append(root);

    this.invalidateLayout();
    this.requireFullStyleRefresh();
  }

  (0, _createClass2.default)(GUI, [{
    key: "getFocus",
    value: function getFocus() {
      return this._focusElement;
    }
  }, {
    key: "setFocus",
    value: function setFocus(node) {
      node = node || null;

      if (node !== this._focusElement) {
        if (this._focusElement) {
          var focusElement = this._focusElement;
          setTimeout(function () {
            focusElement.dispatchEvent(new _1.GUIFocusEvent(_1.GUIFocusEvent.NAME_BLUR));
          }, 0);
        }

        if (node) {
          setTimeout(function () {
            node.dispatchEvent(new _1.GUIFocusEvent(_1.GUIFocusEvent.NAME_FOCUS));
          }, 0);
        }

        this._focusElement = node;
        this.dispatchEvent(new _1.DOMTreeEvent(_1.DOMTreeEvent.NAME_FOCUSED, null));
      }
    }
  }, {
    key: "getCapture",
    value: function getCapture() {
      return this._captureElement;
    }
  }, {
    key: "setCapture",
    value: function setCapture(node) {
      this._captureElement = node || null;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var _a;

      (_a = this._imageManager) === null || _a === void 0 ? void 0 : _a.dispose();
      this._imageManager = null;
    }
  }, {
    key: "invalidateLayout",
    value: function invalidateLayout() {
      this._layoutDirty = true;
    }
  }, {
    key: "requireFullStyleRefresh",
    value: function requireFullStyleRefresh() {
      if (!this._styleUpdating) {
        this._styleFullRefresh = true;
      }
    }
  }, {
    key: "checkAndRefreshStyle",
    value: function checkAndRefreshStyle() {
      var _this5 = this;

      if (this._document) {
        if (this._styleFullRefresh) {
          this._styleRefreshList.splice(0, this._styleRefreshList.length, this._document);
        } else {
          var validElements = [];

          var _iterator6 = _createForOfIteratorHelper(this._styleRefreshList),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var e = _step6.value;

              if (e.nodeType === _1.RMLNode.ELEMENT_NODE && e.tagName !== 'style' && e._isSucceedingOf(this._document)) {
                validElements.push(e);
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          this._styleRefreshList = validElements;
        }

        if (this._styleRefreshList.length > 0) {
          (function () {
            _this5._styleUpdating = true;

            var styleElements = _this5._document.querySelectorAll('style');

            var processedElements = new Set();
            var ruleList = (0, _toConsumableArray2.default)(_this5._ruleListImported);

            var _iterator7 = _createForOfIteratorHelper(styleElements.values()),
                _step7;

            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var el = _step7.value;

                var _iterator13 = _createForOfIteratorHelper(el.definitions),
                    _step13;

                try {
                  for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                    var def = _step13.value;

                    var _iterator14 = _createForOfIteratorHelper(def.selector.rules()),
                        _step14;

                    try {
                      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                        var rule = _step14.value;
                        ruleList.push({
                          rule: rule,
                          stylesheet: def.stylesheet,
                          extra: def.extra
                        });
                      }
                    } catch (err) {
                      _iterator14.e(err);
                    } finally {
                      _iterator14.f();
                    }
                  }
                } catch (err) {
                  _iterator13.e(err);
                } finally {
                  _iterator13.f();
                }
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }

            var allElements = null;
            var pseudoMap = new Map();

            if (_this5._styleFullRefresh) {
              allElements = _this5._querySelectorAll(_this5._document, '*', true, true);
            }

            if (ruleList.length > 0) {
              if (_this5._styleRefreshList.indexOf(_this5._document) >= 0) {
                _this5._styleRefreshList.splice(0, _this5._styleRefreshList.length, _this5._document);
              }

              ruleList.sort(function (a, b) {
                return a.rule.specificity - b.rule.specificity;
              });

              var _iterator8 = _createForOfIteratorHelper(ruleList),
                  _step8;

              try {
                var _loop5 = function _loop5() {
                  var rule = _step8.value;
                  rule.rule.resolve(_this5._styleRefreshList, true, true, function (node, type) {
                    var pseudoTypes = pseudoMap.get(node) || new Map();
                    pseudoMap.set(node, pseudoTypes);
                    var styleList = pseudoTypes.get(type) || [];
                    pseudoTypes.set(type, styleList);
                    styleList.push({
                      stylesheet: rule.stylesheet,
                      extra: rule.extra
                    });
                  });

                  var _iterator9 = _createForOfIteratorHelper(rule.rule.targets),
                      _step9;

                  try {
                    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                      var _e2 = _step9.value;

                      if (_e2.nodeType !== _1.RMLNode.DOCUMENT_NODE) {
                        if (!processedElements.has(_e2)) {
                          _e2._resetStyle();

                          processedElements.add(_e2);
                        }

                        _e2.style.applyStyleSheet(rule.stylesheet, false);
                      }

                      _e2._updatePseudoElementStyles(pseudoMap.get(_e2));
                    }
                  } catch (err) {
                    _iterator9.e(err);
                  } finally {
                    _iterator9.f();
                  }

                  if (!_this5._styleFullRefresh) {
                    var _iterator10 = _createForOfIteratorHelper(pseudoMap),
                        _step10;

                    try {
                      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                        var _e = _step10.value;

                        _e[0]._updatePseudoElementStyles(_e[1]);
                      }
                    } catch (err) {
                      _iterator10.e(err);
                    } finally {
                      _iterator10.f();
                    }

                    pseudoMap.clear();
                  }
                };

                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  _loop5();
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }

              processedElements.forEach(function (e) {
                e._applyInlineStyles();
              });
            }

            if (_this5._styleFullRefresh) {
              var _iterator11 = _createForOfIteratorHelper(allElements),
                  _step11;

              try {
                for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                  var _e3 = _step11.value;

                  if (!processedElements.has(_e3)) {
                    _e3._resetStyle();

                    _e3._applyInlineStyles();
                  }

                  _e3._updatePseudoElementStyles(pseudoMap.get(_e3));
                }
              } catch (err) {
                _iterator11.e(err);
              } finally {
                _iterator11.f();
              }
            } else {
              var _iterator12 = _createForOfIteratorHelper(_this5._styleRefreshList),
                  _step12;

              try {
                for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                  var _e4 = _step12.value;

                  if (!processedElements.has(_e4)) {
                    _e4._resetStyle();

                    _e4._applyInlineStyles();
                  }
                }
              } catch (err) {
                _iterator12.e(err);
              } finally {
                _iterator12.f();
              }
            }

            _this5._styleUpdating = false;
          })();
        }
      }

      this._styleRefreshList.splice(0, this._styleRefreshList.length);

      this._styleFullRefresh = false;
    }
  }, {
    key: "updateLayout",
    value: function updateLayout() {
      if (this._layoutDirty) {
        if (this._updatingLayout) {
          console.warn('updateLayout called recursively');
        } else {
          this._layoutDirty = false;
          this._updatingLayout = true;

          this._topLayout.calcLayout();

          if (this._document) {
            this._document._syncLayout();
          }

          this._updatingLayout = false;
        }
      }
    }
  }, {
    key: "hitTest",
    value: function hitTest(x, y) {
      if (this._document) {
        this.updateLayout();
        var v = new _1.GUIHitTestVisitor(x, y);

        this._document.traverse(v, true, true);

        var hits = v.getHits();

        if (hits.length > 0) {
          var topmost = hits[0].element;
          hits = hits.filter(function (val) {
            return val.element.contains(topmost);
          });
        }

        return hits;
      } else {
        return [];
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.checkAndRefreshStyle();
      this.updateLayout();

      this._renderer.beginRender();

      this.document.traverse(this._drawVisitor);

      this._renderer.endRender();
    }
  }, {
    key: "serializeToXML",
    value: function serializeToXML() {
      return this._serializeToXML();
    }
  }, {
    key: "deserializeFromXML",
    value: function deserializeFromXML(xml) {
      return __awaiter(this, void 0, void 0, _regenerator.default.mark(function _callee() {
        var parser, dom, docElement, linkElements, promises, _iterator15, _step15, link;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._guiLoading = true;

                while (this._document.firstChild) {
                  this._document.removeChild(this._document.firstChild);
                }

                parser = new DOMParser();
                dom = parser.parseFromString(xml, 'text/html');

                if (!(dom.getElementsByTagName('parsererror').length > 0)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", null);

              case 6:
                docElement = dom.documentElement;

                this._document.append(this._deserializeElement(docElement));

                linkElements = this._document.querySelectorAll('link');
                promises = [];
                _iterator15 = _createForOfIteratorHelper(linkElements.values());

                try {
                  for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                    link = _step15.value;
                    promises.push(this._importLinkContent(link));
                  }
                } catch (err) {
                  _iterator15.e(err);
                } finally {
                  _iterator15.f();
                }

                _context.next = 14;
                return Promise.all(promises);

              case 14:
                this._guiLoading = false;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "deserializeFromURL",
    value: function deserializeFromURL(url) {
      return __awaiter(this, void 0, void 0, _regenerator.default.mark(function _callee2() {
        var content, normalizedURL, index;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._guiLoading = true;
                _context2.next = 3;
                return new asset_1.FileLoader(null, 'text').load(url);

              case 3:
                content = _context2.sent;

                if (!content) {
                  _context2.next = 10;
                  break;
                }

                normalizedURL = asset_1.LoadManager.resolveURL(url);
                index = normalizedURL.lastIndexOf('/');
                this._baseURI = normalizedURL.substring(0, index + 1);
                _context2.next = 10;
                return this.deserializeFromXML(content);

              case 10:
                this._guiLoading = false;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "createElement",
    value: function createElement(tagname) {
      var el = elementRegistry.createElement(this, tagname);

      el._init();

      return el;
    }
  }, {
    key: "_getGlyphTexture",
    value: function _getGlyphTexture(index) {
      return this._glyphManager.getGlyphTexture(index);
    }
  }, {
    key: "_getGlyphInfo",
    value: function _getGlyphInfo(char, font) {
      return this._glyphManager.getGlyphInfo(char, font);
    }
  }, {
    key: "_measureStringWidth",
    value: function _measureStringWidth(str, charMargin, font) {
      return this._glyphManager.measureStringWidth(str, charMargin, font);
    }
  }, {
    key: "_clipStringToWidth",
    value: function _clipStringToWidth(str, width, charMargin, start, font) {
      return this._glyphManager.clipStringToWidth(str, width, charMargin, start, font);
    }
  }, {
    key: "_querySelectorAll",
    value: function _querySelectorAll(root, selectors, excludeRoot, allowInternal) {
      return new _1.RMLSelector(selectors).resolve(root, excludeRoot, allowInternal);
    }
  }, {
    key: "_querySelectorOne",
    value: function _querySelectorOne(root, selectors, excludeRoot, allowInternal) {
      return this._querySelectorAll(root, selectors, excludeRoot, allowInternal)[0] || null;
    }
  }, {
    key: "_getTopLayout",
    value: function _getTopLayout() {
      return this._topLayout;
    }
  }, {
    key: "_getElementById",
    value: function _getElementById(root, id) {
      if (root.nodeType === _1.RMLNode.ELEMENT_NODE && root.id === id) {
        return root;
      }

      var _iterator16 = _createForOfIteratorHelper(root.childNodes.values()),
          _step16;

      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var child = _step16.value;

          var e = this._getElementById(child, id);

          if (e) {
            return e;
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }

      return null;
    }
  }, {
    key: "_getElementsByTagName",
    value: function _getElementsByTagName(root, tagname, results) {
      if (root.nodeType === _1.RMLNode.ELEMENT_NODE && root.tagName === tagname) {
        results.push(root);
      }

      var _iterator17 = _createForOfIteratorHelper(root.childNodes.values()),
          _step17;

      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var child = _step17.value;

          this._getElementsByTagName(child, tagname, results);
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }

      return null;
    }
  }, {
    key: "_getElementsByClassName",
    value: function _getElementsByClassName(root, classnames, results) {
      if (root.nodeType === _1.RMLNode.ELEMENT_NODE) {
        var matched = true;
        var el = root;

        var _iterator18 = _createForOfIteratorHelper(classnames),
            _step18;

        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var classname = _step18.value;

            if (!el.classList.contains(classname)) {
              matched = false;
              break;
            }
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }

        if (matched) {
          results.push(el);
        }
      }

      var _iterator19 = _createForOfIteratorHelper(root.childNodes.values()),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var child = _step19.value;

          this._getElementsByClassName(child, classnames, results);
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }

      return null;
    }
  }, {
    key: "_markStyleRefreshForElement",
    value: function _markStyleRefreshForElement(element) {
      if (!this._styleUpdating && element && this._styleRefreshList.indexOf(element) < 0) {
        this._styleRefreshList.push(element);
      }
    }
  }, {
    key: "_importRuleListFromURL",
    value: function _importRuleListFromURL(url) {
      return __awaiter(this, void 0, void 0, _regenerator.default.mark(function _callee3() {
        var content, entries, _iterator20, _step20, def, _iterator21, _step21, rule;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return new asset_1.FileLoader(null, 'text').load(this._baseURI + url);

              case 2:
                content = _context3.sent;

                if (content) {
                  entries = this._parseStyleContent(content);
                  _iterator20 = _createForOfIteratorHelper(entries);

                  try {
                    for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                      def = _step20.value;
                      _iterator21 = _createForOfIteratorHelper(def.selector.rules());

                      try {
                        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                          rule = _step21.value;

                          this._ruleListImported.push({
                            rule: rule,
                            stylesheet: def.stylesheet,
                            extra: def.extra
                          });
                        }
                      } catch (err) {
                        _iterator21.e(err);
                      } finally {
                        _iterator21.f();
                      }
                    }
                  } catch (err) {
                    _iterator20.e(err);
                  } finally {
                    _iterator20.f();
                  }
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "_parseStyleContent",
    value: function _parseStyleContent(content) {
      var result = [];
      content = content.split(/[\r\n]+/).join('').replace(/\/\*[\s\S]*?\*\//g, '');

      while (true) {
        var lbracket = content.indexOf('{');
        var rbracket = content.indexOf('}');

        if (lbracket < 0 || rbracket < 0 || lbracket > rbracket) {
          break;
        }

        var sel = content.substring(0, lbracket).trim();
        var styles = content.substring(lbracket + 1, rbracket);
        content = content.substr(rbracket + 1);
        var selector = new _1.RMLSelector(sel);

        if (selector.rules().length === 0) {
          continue;
        }

        var extra = {};

        var stylesheet = _1.parseStyleSheet(styles, extra);

        if (!stylesheet) {
          continue;
        }

        result.push({
          selector: selector,
          stylesheet: stylesheet,
          extra: extra
        });
      }

      return result;
    }
  }, {
    key: "_deserializeElement",
    value: function _deserializeElement(el) {
      var element = this.createElement(el.tagName.toLowerCase());

      var _iterator22 = _createForOfIteratorHelper(el.attributes),
          _step22;

      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var attr = _step22.value;
          element.setAttribute(attr.name, attr.value);
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }

      var _iterator23 = _createForOfIteratorHelper(el.classList),
          _step23;

      try {
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          var className = _step23.value;
          element.classList.add(className);
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
      }

      var _iterator24 = _createForOfIteratorHelper(el.childNodes),
          _step24;

      try {
        for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
          var child = _step24.value;

          if (child.nodeType === Node.TEXT_NODE) {
            var text = child.textContent.trim().replace(/\s+/, ' ');

            if (text !== '') {
              element.append(text);
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            element.append(this._deserializeElement(child));
          }
        }
      } catch (err) {
        _iterator24.e(err);
      } finally {
        _iterator24.f();
      }

      return element;
    }
  }, {
    key: "_importLinkContent",
    value: function _importLinkContent(link) {
      return __awaiter(this, void 0, void 0, _regenerator.default.mark(function _callee4() {
        var _this6 = this;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = link.getAttribute('rel');
                _context4.next = _context4.t0 === 'stylesheet' ? 3 : 6;
                break;

              case 3:
                _context4.next = 5;
                return this._importRuleListFromURL(link.getAttribute('href')).then(function () {
                  return _this6.requireFullStyleRefresh();
                }).catch(function (reason) {
                  return console.error(reason);
                });

              case 5:
                return _context4.abrupt("break", 6);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }, {
    key: "_serializeToXML",
    value: function _serializeToXML() {
      var doc = document.implementation.createDocument(null, 'node', null);
      doc.firstChild.remove();

      if (this.document.documentElement) {
        doc.append(this._createDOMElement(this.document.documentElement, doc, null));

        this._buildDOM(this.document.documentElement, doc, doc.documentElement);
      }

      return new XMLSerializer().serializeToString(doc);
    }
  }, {
    key: "_buildDOM",
    value: function _buildDOM(root, doc, parent) {
      var _iterator25 = _createForOfIteratorHelper(root.childNodes.values()),
          _step25;

      try {
        for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
          var child = _step25.value;

          if (!child._isInternal()) {
            var childElement = this._createDOMElement(child, doc, null);

            parent.append(childElement);

            if (childElement instanceof Element) {
              this._buildDOM(child, doc, childElement);
            }
          }
        }
      } catch (err) {
        _iterator25.e(err);
      } finally {
        _iterator25.f();
      }
    }
  }, {
    key: "_createDOMElement",
    value: function _createDOMElement(el, doc, out) {
      if (el._isText()) {
        out = doc.createTextNode(el.textContent);
      } else if (el.nodeType === _1.RMLNode.ELEMENT_NODE) {
        out = out || doc.createElement(el.tagName);

        if (el.className) {
          out.className = el.className;
        }

        var _iterator26 = _createForOfIteratorHelper(el.attributes),
            _step26;

        try {
          for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
            var k = _step26.value;
            out.setAttribute(k.name, k.value);
          }
        } catch (err) {
          _iterator26.e(err);
        } finally {
          _iterator26.f();
        }
      }

      return out;
    }
  }, {
    key: "renderer",
    get: function get() {
      return this._renderer;
    }
  }, {
    key: "bounds",
    get: function get() {
      return this._bounds;
    },
    set: function set(rect) {
      this._bounds = rect ? (0, _extends2.default)({}, rect) : null;

      this._topLayout.node.setPosition(Yoga.EDGE_LEFT, this._bounds ? this._bounds.x : 0);

      this._topLayout.node.setPosition(Yoga.EDGE_TOP, this._bounds ? this._bounds.y : 0);

      this._topLayout.node.setWidth(this._bounds ? this._bounds.width : this._renderer.getDrawingBufferWidth());

      this._topLayout.node.setHeight(this._bounds ? this._bounds.height : this._renderer.getDrawingBufferHeight());

      this.invalidateLayout();
    }
  }, {
    key: "baseURI",
    get: function get() {
      return this._baseURI;
    },
    set: function set(val) {
      this._baseURI = val || '';
    }
  }, {
    key: "document",
    get: function get() {
      return this._document;
    }
  }, {
    key: "imageManager",
    get: function get() {
      return this._imageManager;
    }
  }, {
    key: "domTag",
    get: function get() {
      return this._domTag;
    }
  }]);
  return GUI;
}();

GUI = __decorate([_1.eventtarget(), __metadata("design:paramtypes", [Object, Object])], GUI);
exports.GUI = GUI;

/***/ }),

/***/ "./hittest_visitor.ts":
/*!****************************!*\
  !*** ./hittest_visitor.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GUIHitTestVisitor = void 0;

var misc_1 = __webpack_require__(/*! ./misc */ "./misc/index.ts");

var _1 = __webpack_require__(/*! . */ "./index.ts");

var GUIHitTestVisitor = function (_misc_1$Visitor) {
  (0, _inherits2.default)(GUIHitTestVisitor, _misc_1$Visitor);

  var _super = _createSuper(GUIHitTestVisitor);

  function GUIHitTestVisitor(x, y) {
    var _this;

    (0, _classCallCheck2.default)(this, GUIHitTestVisitor);
    _this = _super.call(this);
    _this._x = x;
    _this._y = y;
    _this._hits = [];
    return _this;
  }

  (0, _createClass2.default)(GUIHitTestVisitor, [{
    key: "getHits",
    value: function getHits() {
      return this._hits;
    }
  }, {
    key: "visitElement",
    value: function visitElement(w) {
      if (w._isVisible() && !w._isText()) {
        var v = w.toAbsolute({
          x: 0,
          y: 0
        });
        var x = this._x - v.x;
        var y = this._y - v.y;
        var rc = w.getClippedRect();
        var cx1 = rc ? rc.x : 0;
        var cy1 = rc ? rc.y : 0;
        var cx2 = rc ? rc.x + rc.width : w.getRect().width;
        var cy2 = rc ? rc.y + rc.height : w.getRect().height;

        if (x >= cx1 && x < cx2 && y >= cy1 && y < cy2) {
          var hittestEvent = new _1.ElementHittestEvent(x, y);
          w.dispatchEvent(hittestEvent);

          if (hittestEvent.allow) {
            this._hits.push({
              element: w,
              x: x,
              y: y
            });
          }
        }
      }
    }
  }]);
  return GUIHitTestVisitor;
}(misc_1.Visitor);

__decorate([misc_1.visitor(_1.RMLNode), __metadata("design:type", Function), __metadata("design:paramtypes", [_1.RMLNode]), __metadata("design:returntype", void 0)], GUIHitTestVisitor.prototype, "visitElement", null);

exports.GUIHitTestVisitor = GUIHitTestVisitor;

/***/ }),

/***/ "./image_manager.ts":
/*!**************************!*\
  !*** ./image_manager.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageManager = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var ImageManager = function () {
  function ImageManager(renderer) {
    (0, _classCallCheck2.default)(this, ImageManager);
    this._renderer = renderer;
    this._cachedImages = {};
    this._urlImages = {};
    this._atlasManager = new _1.AtlasManager(this._renderer, 1024, 1024, 1, 'rgba', false);

    this._createBuiltinImages();
  }

  (0, _createClass2.default)(ImageManager, [{
    key: "getImage",
    value: function getImage(name) {
      return this._cachedImages[name] || null;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._cachedImages = {};
      this._urlImages = {};
    }
  }, {
    key: "_createBuiltinImages",
    value: function _createBuiltinImages() {
      var cvs = document.createElement('canvas');
      cvs.width = 256;
      cvs.height = 256;
      var ctx = cvs.getContext('2d');
      var offsetX = 0;
      var offsetY = 0;
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ffffff';
      ctx.clearRect(0, 0, 10, 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();
      var bitmap = ctx.getImageData(0, 0, 10, 2);

      if (bitmap.data[5 * 4 + 3] < 255) {
        offsetX = 0.5;
        offsetY = 0.5;
      }

      var size = 10;
      var atlasInfo;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      var radius = (size - 2) / 2;
      ctx.ellipse(1 + radius + offsetX, 1 + radius + offsetY, radius, radius, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      atlasInfo = this._atlasManager.pushCanvas('default.input', ctx, 0, 0, size, size);
      this._cachedImages['default.input'] = new _1.TextureAtlas(this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), {
        x: atlasInfo.uMin,
        y: atlasInfo.vMin
      }, {
        x: atlasInfo.uMax,
        y: atlasInfo.vMax
      }, {
        x: 0.5,
        y: 0.5
      }, {
        x: 0.5,
        y: 0.5
      });
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.ellipse(1 + radius + offsetX, 1 + radius + offsetY, radius, radius, 0, 0, 2 * Math.PI);
      ctx.fill();
      atlasInfo = this._atlasManager.pushCanvas('default.button', ctx, 0, 0, size, size);
      this._cachedImages['default.button'] = new _1.TextureAtlas(this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), {
        x: atlasInfo.uMin,
        y: atlasInfo.vMin
      }, {
        x: atlasInfo.uMax,
        y: atlasInfo.vMax
      }, {
        x: 0.5,
        y: 0.5
      }, {
        x: 0.5,
        y: 0.5
      });
      size = 32;
      ctx.clearRect(0, 0, size, size);
      pathTriangle(ctx, ORIENTATION_VERTICAL, 16, 24, -10, 10, -14);
      ctx.fill();
      atlasInfo = this._atlasManager.pushCanvas('default.scrollbar.up', ctx, 0, 0, size, size);
      this._cachedImages['default.scrollbar.up'] = new _1.TextureAtlas(this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), {
        x: atlasInfo.uMin,
        y: atlasInfo.vMin
      }, {
        x: atlasInfo.uMax,
        y: atlasInfo.vMax
      });
      ctx.clearRect(0, 0, size, size);
      pathTriangle(ctx, ORIENTATION_VERTICAL, 16, 10, -10, 10, 14);
      ctx.fill();
      atlasInfo = this._atlasManager.pushCanvas('default.scrollbar.down', ctx, 0, 0, size, size);
      this._cachedImages['default.scrollbar.down'] = new _1.TextureAtlas(this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), {
        x: atlasInfo.uMin,
        y: atlasInfo.vMin
      }, {
        x: atlasInfo.uMax,
        y: atlasInfo.vMax
      });
      ctx.clearRect(0, 0, size, size);
      pathTriangle(ctx, ORIENTATION_HORIZONAL, 24, 16, -10, 10, -14);
      ctx.fill();
      atlasInfo = this._atlasManager.pushCanvas('default.scrollbar.left', ctx, 0, 0, size, size);
      this._cachedImages['default.scrollbar.left'] = new _1.TextureAtlas(this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), {
        x: atlasInfo.uMin,
        y: atlasInfo.vMin
      }, {
        x: atlasInfo.uMax,
        y: atlasInfo.vMax
      });
      ctx.clearRect(0, 0, size, size);
      pathTriangle(ctx, ORIENTATION_HORIZONAL, 10, 16, -10, 10, 14);
      ctx.fill();
      atlasInfo = this._atlasManager.pushCanvas('default.scrollbar.right', ctx, 0, 0, size, size);
      this._cachedImages['default.scrollbar.right'] = new _1.TextureAtlas(this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), {
        x: atlasInfo.uMin,
        y: atlasInfo.vMin
      }, {
        x: atlasInfo.uMax,
        y: atlasInfo.vMax
      });
      cvs = null;
    }
  }, {
    key: "renderer",
    get: function get() {
      return this._renderer;
    }
  }]);
  return ImageManager;
}();

exports.ImageManager = ImageManager;
ImageManager._tempElement = null;
var ORIENTATION_HORIZONAL = 0;
var ORIENTATION_VERTICAL = 1;

function pathTriangle(ctx, orientation, anchorX, anchorY, left, right, top) {
  ctx.beginPath();

  if (orientation === ORIENTATION_VERTICAL) {
    ctx.moveTo(anchorX + left, anchorY);
    ctx.lineTo(anchorX + right, anchorY);
    ctx.lineTo(anchorX, anchorY + top);
  } else {
    ctx.moveTo(anchorX, anchorY + left);
    ctx.lineTo(anchorX, anchorY + right);
    ctx.lineTo(anchorX + top, anchorY);
  }

  ctx.closePath();
}

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = void 0 && (void 0).__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./types */ "./types.ts"), exports);

__exportStar(__webpack_require__(/*! ./font */ "./font.ts"), exports);

__exportStar(__webpack_require__(/*! ./renderer */ "./renderer.ts"), exports);

__exportStar(__webpack_require__(/*! ./atlas_manager */ "./atlas_manager.ts"), exports);

__exportStar(__webpack_require__(/*! ./glyph_manager */ "./glyph_manager.ts"), exports);

__exportStar(__webpack_require__(/*! ./layout */ "./layout.ts"), exports);

__exportStar(__webpack_require__(/*! ./style */ "./style.ts"), exports);

__exportStar(__webpack_require__(/*! ./texture_atlas */ "./texture_atlas.ts"), exports);

__exportStar(__webpack_require__(/*! ./primitive */ "./primitive.ts"), exports);

__exportStar(__webpack_require__(/*! ./image_manager */ "./image_manager.ts"), exports);

__exportStar(__webpack_require__(/*! ./events */ "./events.ts"), exports);

__exportStar(__webpack_require__(/*! ./gui */ "./gui.ts"), exports);

__exportStar(__webpack_require__(/*! ./nodelist */ "./nodelist.ts"), exports);

__exportStar(__webpack_require__(/*! ./node */ "./node.ts"), exports);

__exportStar(__webpack_require__(/*! ./element */ "./element.ts"), exports);

__exportStar(__webpack_require__(/*! ./selector */ "./selector.ts"), exports);

__exportStar(__webpack_require__(/*! ./style_element */ "./style_element.ts"), exports);

__exportStar(__webpack_require__(/*! ./flow_element */ "./flow_element.ts"), exports);

__exportStar(__webpack_require__(/*! ./dummy_element */ "./dummy_element.ts"), exports);

__exportStar(__webpack_require__(/*! ./document */ "./document.ts"), exports);

__exportStar(__webpack_require__(/*! ./components/text */ "./components/text.ts"), exports);

__exportStar(__webpack_require__(/*! ./components/button */ "./components/button.ts"), exports);

__exportStar(__webpack_require__(/*! ./components/input */ "./components/input.ts"), exports);

__exportStar(__webpack_require__(/*! ./components/select */ "./components/select.ts"), exports);

__exportStar(__webpack_require__(/*! ./components/slider */ "./components/slider.ts"), exports);

__exportStar(__webpack_require__(/*! ./components/scrollbar */ "./components/scrollbar.ts"), exports);

__exportStar(__webpack_require__(/*! ./hittest_visitor */ "./hittest_visitor.ts"), exports);

/***/ }),

/***/ "./layout.ts":
/*!*******************!*\
  !*** ./layout.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UILayout = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var misc_1 = __webpack_require__(/*! ./misc */ "./misc/index.ts");

var Yoga = __webpack_require__(/*! ./typeflex/api */ "./typeflex/api.ts");

var yoga_1 = __webpack_require__(/*! ./typeflex/yoga */ "./typeflex/yoga.ts");

var yogaConfig = Yoga.Config.create();
yogaConfig.config.useWebDefaults = true;

var UILayout = function () {
  function UILayout(element) {
    (0, _classCallCheck2.default)(this, UILayout);
    this.element = element;
    this._parent = null;
    this._children = new misc_1.List();
    this._iterator = null;
    this.actualRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.clientRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.borderRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.clippedRect = null;
    this.scrollRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.desiredScrollX = 0;
    this.desiredScrollY = 0;
    this.actualScrollX = 0;
    this.actualScrollY = 0;
    this.minScrollX = 0;
    this.maxScrollX = 0;
    this.minScrollY = 0;
    this.maxScrollY = 0;
    this.changeStamp = 0;
    this.node = Yoga.Node.create(yogaConfig);

    if (element && element._isText()) {
      this.node.setMeasureFunc(function (node, width, widthMode, height, heightMode) {
        var rc = element._measureContentSize({
          x: 0,
          y: 0,
          width: 0,
          height: 0
        });

        var size = new yoga_1.YGSize();
        size.width = rc.width;
        size.height = rc.height;
        return size;
      });
    }
  }

  (0, _createClass2.default)(UILayout, [{
    key: "invalidateLayout",
    value: function invalidateLayout() {
      var _a;

      (_a = this.element) === null || _a === void 0 ? void 0 : _a._invalidateLayout();
    }
  }, {
    key: "getNumChildren",
    value: function getNumChildren() {
      return this._children.length;
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      _1.assert(this._children.length === this.node.getChildCount(), 'Failed to append child layout: child count mismatch');

      _1.assert(child && !child._parent, 'Failed to append child layout: invalid child or child already has an parent', true);

      child._parent = this;
      child._iterator = this._children.append(child);
      this.node.insertChild(child.node, this.node.getChildCount());
      this.invalidateLayout();
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      _1.assert(this._children.length === this.node.getChildCount(), 'Failed to append child layout: child count mismatch');

      if (child._iterator && child._iterator.list === this._children) {
        this.node.removeChild(child.node);
        this.invalidateLayout();

        this._children.remove(child._iterator);

        child._parent = null;
        child._iterator = null;
      }
    }
  }, {
    key: "insertChild",
    value: function insertChild(child, at) {
      _1.assert(this._children.length === this.node.getChildCount(), 'Failed to append child layout: child count mismatch');

      _1.assert(child && !child._parent, 'Failed to append child layout: invalid child or child already has an parent', true);

      _1.assert(at && at._parent === this, 'Failed to append child layout: invalid reference child', true);

      child._parent = this;
      child._iterator = this._children.insertAt(child, at._iterator);
      var index = this.node.node.getChildren().indexOf(at.node.node);

      _1.assert(index >= 0, 'Failed to append child layout: cannot get reference child index', true);

      this.node.insertChild(child.node, index);
      this.invalidateLayout();
    }
  }, {
    key: "firstChild",
    value: function firstChild() {
      var it = this._children.begin();

      return it.valid() ? it.data : null;
    }
  }, {
    key: "lastChild",
    value: function lastChild() {
      var it = this._children.rbegin();

      return it.valid() ? it.data : null;
    }
  }, {
    key: "nextSibling",
    value: function nextSibling() {
      var _a;

      var it = (_a = this._iterator) === null || _a === void 0 ? void 0 : _a.getNext();
      return it && it.valid() ? it.data : null;
    }
  }, {
    key: "previousSibling",
    value: function previousSibling() {
      var _a;

      var it = (_a = this._iterator) === null || _a === void 0 ? void 0 : _a.getPrev();
      return it && it.valid() ? it.data : null;
    }
  }, {
    key: "markDirty",
    value: function markDirty() {
      if (this.element && this.element._isText()) {
        this.node.markDirty();
      }
    }
  }, {
    key: "calcLayout",
    value: function calcLayout() {
      _1.assert(!this._parent, 'calcLayout must be called on root element', true);

      this.node.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);
      this.syncComputedRect(0, 0, false);
    }
  }, {
    key: "updateStyle",
    value: function updateStyle(val) {
      this.element._updateStyle(val);
    }
  }, {
    key: "updateBorder",
    value: function updateBorder(val) {
      this.element._updateBorder();
    }
  }, {
    key: "updateZIndex",
    value: function updateZIndex() {
      this.element._updateZIndex();
    }
  }, {
    key: "updateCursor",
    value: function updateCursor(val) {
      this.element._updateCursor(val);
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay(val) {
      this.element._updateDisplay(val);
    }
  }, {
    key: "updateFont",
    value: function updateFont(val) {
      var _a;

      (_a = this.element.gui) === null || _a === void 0 ? void 0 : _a.invalidateLayout();

      this.element._updateFont(val);
    }
  }, {
    key: "updateFontSize",
    value: function updateFontSize(val) {
      this.element._updateFontSize(val);
    }
  }, {
    key: "updateFontFamily",
    value: function updateFontFamily(val) {
      this.element._updateFontFamily(val);
    }
  }, {
    key: "updateFontColor",
    value: function updateFontColor(val) {
      this.element._updateFontColor(val);
    }
  }, {
    key: "updateBorderColor",
    value: function updateBorderColor(edge, val) {
      switch (edge) {
        case Yoga.EDGE_LEFT:
          this.element._updateBorderLeftColor(val);

          break;

        case Yoga.EDGE_TOP:
          this.element._updateBorderTopColor(val);

          break;

        case Yoga.EDGE_RIGHT:
          this.element._updateBorderRightColor(val);

          break;

        case Yoga.EDGE_BOTTOM:
          this.element._updateBorderBottomColor(val);

          break;
      }
    }
  }, {
    key: "updateBackgroundColor",
    value: function updateBackgroundColor(val) {
      this.element._updateBackgroundColor(val);
    }
  }, {
    key: "syncComputedRect",
    value: function syncComputedRect(px, py, markChanged) {
      var paddingLeft = this.node.getComputedPadding(Yoga.EDGE_LEFT);
      var paddingTop = this.node.getComputedPadding(Yoga.EDGE_TOP);
      var paddingRight = this.node.getComputedPadding(Yoga.EDGE_RIGHT);
      var paddingBottom = this.node.getComputedPadding(Yoga.EDGE_BOTTOM);
      var borderLeft = this.node.getComputedBorder(Yoga.EDGE_LEFT);
      var borderTop = this.node.getComputedBorder(Yoga.EDGE_TOP);
      var borderRight = this.node.getComputedBorder(Yoga.EDGE_RIGHT);
      var borderBottom = this.node.getComputedBorder(Yoga.EDGE_BOTTOM);
      var rect = this.actualRect;
      var x = this.node.getComputedLeft() - px;
      var y = this.node.getComputedTop() - py;
      var w = this.node.getComputedWidth();
      var h = this.node.getComputedHeight();

      if (!markChanged && (x !== rect.x || y !== rect.y || w !== rect.width || h !== rect.height)) {
        markChanged = true;
      }

      rect.x = x;
      rect.y = y;
      rect.width = w;
      rect.height = h;
      var clientRect = this.clientRect;
      var cx = paddingLeft + borderLeft;
      var cy = paddingTop + borderTop;
      var cw = Math.max(0, rect.width - paddingLeft - paddingRight - borderLeft - borderRight);
      var ch = Math.max(0, rect.height - paddingTop - paddingBottom - borderTop - borderBottom);

      if (!markChanged && (cx !== clientRect.x || cy !== clientRect.y || cw !== clientRect.width || ch !== clientRect.height)) {
        markChanged = true;
      }

      clientRect.x = cx;
      clientRect.y = cy;
      clientRect.width = cw;
      clientRect.height = ch;
      var borderRect = this.borderRect;
      var bx = borderLeft;
      var by = borderTop;
      var bw = Math.max(0, rect.width - borderLeft - borderRight);
      var bh = Math.max(0, rect.height - borderTop - borderBottom);

      if (!markChanged && (bx !== borderRect.x || by !== borderRect.y || bw !== borderRect.width || bh !== borderRect.height)) {
        markChanged = true;
      }

      borderRect.x = bx;
      borderRect.y = by;
      borderRect.width = bw;
      borderRect.height = bh;
      this.actualScrollX = 0;
      this.actualScrollY = 0;
      var minX = 0;
      var minY = 0;
      var maxX = clientRect.width;
      var maxY = clientRect.height;

      this._children.forEach(function (child) {
        if (child.element._isVisible()) {
          child.syncComputedRect(paddingLeft + borderLeft, paddingTop + borderTop, markChanged);
          var x1 = child.actualRect.x;
          var y1 = child.actualRect.y;
          var x2 = x1 + child.actualRect.width;
          var y2 = y1 + child.actualRect.height;
          minX = Math.min(minX, x1);
          minY = Math.min(minY, y1);
          maxX = Math.max(maxX, x2);
          maxY = Math.max(maxY, y2);
        }
      });

      this.scrollRect = {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
      this.minScrollX = this.scrollRect.x;
      this.maxScrollX = this.scrollRect.x + this.scrollRect.width - clientRect.width;
      this.minScrollY = this.scrollRect.y;
      this.maxScrollY = this.scrollRect.y + this.scrollRect.height - clientRect.height;

      if (markChanged) {
        this.changeStamp++;
      }
    }
  }, {
    key: "thisToParentClient",
    value: function thisToParentClient(p) {
      p.x += this.actualRect.x;
      p.y += this.actualRect.y;
      return p;
    }
  }, {
    key: "thisToParent",
    value: function thisToParent(p) {
      this.thisToParentClient(p);

      if (this._parent) {
        p.x += this._parent.clientRect.x;
        p.y += this._parent.clientRect.y;
      }

      return p;
    }
  }, {
    key: "clipRectForChildren",
    value: function clipRectForChildren() {
      var rcClient = this.clientRect;

      if (this.clippedRect) {
        var x = Math.max(rcClient.x, this.clippedRect.x);
        var y = Math.max(rcClient.y, this.clippedRect.y);
        var width = Math.max(0, Math.min(this.clippedRect.x + this.clippedRect.width, rcClient.x + rcClient.width) - x);
        var height = Math.max(0, Math.min(this.clippedRect.y + this.clippedRect.height, rcClient.y + rcClient.height) - y);
        return {
          x: x,
          y: y,
          width: width,
          height: height
        };
      } else {
        return rcClient;
      }
    }
  }, {
    key: "toAbsolute",
    value: function toAbsolute(v) {
      var layout = this;
      v.x += layout.actualRect.x;
      v.y += layout.actualRect.y;

      while (layout = layout._parent) {
        v.x += layout.actualRect.x + layout.clientRect.x;
        v.y += layout.actualRect.y + layout.clientRect.y;
      }

      return v;
    }
  }, {
    key: "clipToParent",
    value: function clipToParent(parent) {
      var parentRect = parent.clipRectForChildren();
      var vThis = this.toAbsolute({
        x: 0,
        y: 0
      });
      var vParent = parent.toAbsolute({
        x: parentRect.x,
        y: parentRect.y
      });
      var x1This = vThis.x;
      var y1This = vThis.y;
      var x2This = x1This + this.actualRect.width;
      var y2This = y1This + this.actualRect.height;
      var x1Parent = vParent.x;
      var y1Parent = vParent.y;
      var x2Parent = x1Parent + parentRect.width;
      var y2Parent = y1Parent + parentRect.height;
      var x1Clip = Math.max(x1This, x1Parent);
      var y1Clip = Math.max(y1This, y1Parent);
      var x2Clip = Math.min(x2This, x2Parent);
      var y2Clip = Math.min(y2This, y2Parent);
      return {
        x: x1Clip - x1This,
        y: y1Clip - y1This,
        width: Math.max(0, x2Clip - x1Clip),
        height: Math.max(0, y2Clip - y1Clip)
      };
    }
  }, {
    key: "calcLayoutScroll",
    value: function calcLayoutScroll() {
      var _this = this;

      scrollX = Math.max(this.minScrollX, Math.min(this.maxScrollX, this.desiredScrollX));
      scrollY = Math.max(this.minScrollY, Math.min(this.maxScrollY, this.desiredScrollY));

      if (scrollX !== this.actualScrollX || scrollY !== this.actualScrollY) {
        this._children.forEach(function (child) {
          if (child.element.style.position !== 'fixed') {
            child.actualRect.x += _this.actualScrollX - scrollX;
            child.actualRect.y += _this.actualScrollY - scrollY;

            child._markChanged();
          }
        });

        this.actualScrollX = scrollX;
        this.actualScrollY = scrollY;
      }

      this._children.forEach(function (child) {
        child.calcLayoutScroll();
      });
    }
  }, {
    key: "calcLayoutClip",
    value: function calcLayoutClip() {
      var parent = this._parent;
      var xClip = null;
      var yClip = null;

      if (!this._isClipX()) {
        while (parent && !parent._isClipX()) {
          parent = parent._parent;
        }

        parent = parent ? parent._parent : null;
      }

      if (parent) {
        xClip = this.clipToParent(parent);
      }

      parent = this._parent;

      if (!this._isClipY()) {
        while (parent && !parent._isClipY()) {
          parent = parent._parent;
        }

        parent = parent ? parent._parent : null;
      }

      if (parent) {
        yClip = this.clipToParent(parent);
      }

      var lastClippedRect = this.clippedRect;

      if (xClip === null) {
        this.clippedRect = yClip;
      } else if (yClip === null) {
        this.clippedRect = xClip;
      } else {
        this.clippedRect = {
          x: xClip.x,
          y: yClip.y,
          width: xClip.width,
          height: yClip.height
        };
      }

      if (this.clippedRect && this.clippedRect.width === this.actualRect.width && this.clippedRect.height === this.actualRect.height) {
        this.clippedRect = null;
      }

      var markChanged = false;

      if (this.clippedRect !== lastClippedRect) {
        if (this.clippedRect && lastClippedRect) {
          markChanged = this.clippedRect.x !== lastClippedRect.x || this.clippedRect.y !== lastClippedRect.y || this.clippedRect.width !== lastClippedRect.width || this.clippedRect.height !== lastClippedRect.height;
        } else {
          markChanged = true;
        }

        if (markChanged) {
          this.changeStamp++;
        }
      }

      this._children.forEach(function (child) {
        child.calcLayoutClip();
      });
    }
  }, {
    key: "_markChanged",
    value: function _markChanged() {
      this.changeStamp++;

      this._children.forEach(function (child) {
        child._markChanged();
      });
    }
  }, {
    key: "_isClipX",
    value: function _isClipX() {
      var _a, _b;

      return ((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.style.overflowX) !== 'visible';
    }
  }, {
    key: "_isClipY",
    value: function _isClipY() {
      var _a, _b;

      return ((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.style.overflowY) !== 'visible';
    }
  }]);
  return UILayout;
}();

exports.UILayout = UILayout;

/***/ }),

/***/ "./maxrects-packer/abstract-bin.ts":
/*!*****************************************!*\
  !*** ./maxrects-packer/abstract-bin.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bin = void 0;

var Bin = function () {
  function Bin() {
    (0, _classCallCheck2.default)(this, Bin);
    this._dirty = 0;
  }

  (0, _createClass2.default)(Bin, [{
    key: "setDirty",
    value: function setDirty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._dirty = value ? this._dirty + 1 : 0;

      if (!value) {
        var _iterator = _createForOfIteratorHelper(this.rects),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var rect = _step.value;
            if (rect.setDirty) rect.setDirty(false);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "dirty",
    get: function get() {
      return this._dirty > 0 || this.rects.some(function (rect) {
        return rect.dirty;
      });
    }
  }]);
  return Bin;
}();

exports.Bin = Bin;

/***/ }),

/***/ "./maxrects-packer/geom/Rectangle.ts":
/*!*******************************************!*\
  !*** ./maxrects-packer/geom/Rectangle.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rectangle = void 0;

var Rectangle = function () {
  function Rectangle() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var rot = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var allowRotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    (0, _classCallCheck2.default)(this, Rectangle);
    this.oversized = false;
    this._rot = false;
    this._allowRotation = undefined;
    this._dirty = 0;
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
    this._data = {};
    this._rot = rot;
    this._allowRotation = allowRotation;
  }

  (0, _createClass2.default)(Rectangle, [{
    key: "area",
    value: function area() {
      return this.width * this.height;
    }
  }, {
    key: "collide",
    value: function collide(rect) {
      return rect.x < this.x + this.width && rect.x + rect.width > this.x && rect.y < this.y + this.height && rect.y + rect.height > this.y;
    }
  }, {
    key: "contain",
    value: function contain(rect) {
      return rect.x >= this.x && rect.y >= this.y && rect.x + rect.width <= this.x + this.width && rect.y + rect.height <= this.y + this.height;
    }
  }, {
    key: "setDirty",
    value: function setDirty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._dirty = value ? this._dirty + 1 : 0;
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    },
    set: function set(value) {
      if (value === this._width) return;
      this._width = value;
      this._dirty++;
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    },
    set: function set(value) {
      if (value === this._height) return;
      this._height = value;
      this._dirty++;
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      if (value === this._x) return;
      this._x = value;
      this._dirty++;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      if (value === this._y) return;
      this._y = value;
      this._dirty++;
    }
  }, {
    key: "rot",
    get: function get() {
      return this._rot;
    },
    set: function set(value) {
      if (this._allowRotation === false) return;

      if (this._rot !== value) {
        var tmp = this.width;
        this.width = this.height;
        this.height = tmp;
        this._rot = value;
        this._dirty++;
      }
    }
  }, {
    key: "allowRotation",
    get: function get() {
      return this._allowRotation;
    },
    set: function set(value) {
      if (this._allowRotation !== value) {
        this._allowRotation = value;
        this._dirty++;
      }
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      if (value === null || value === this._data) return;
      this._data = value;

      if ((0, _typeof2.default)(value) === "object" && value.hasOwnProperty("allowRotation")) {
        this._allowRotation = value.allowRotation;
      }

      this._dirty++;
    }
  }, {
    key: "dirty",
    get: function get() {
      return this._dirty > 0;
    }
  }], [{
    key: "Collide",
    value: function Collide(first, second) {
      return first.collide(second);
    }
  }, {
    key: "Contain",
    value: function Contain(first, second) {
      return first.contain(second);
    }
  }]);
  return Rectangle;
}();

exports.Rectangle = Rectangle;

/***/ }),

/***/ "./maxrects-packer/index.ts":
/*!**********************************!*\
  !*** ./maxrects-packer/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rectangle_1 = __webpack_require__(/*! ./geom/Rectangle */ "./maxrects-packer/geom/Rectangle.ts");

Object.defineProperty(exports, "Rectangle", {
  enumerable: true,
  get: function get() {
    return Rectangle_1.Rectangle;
  }
});

var maxrects_packer_1 = __webpack_require__(/*! ./maxrects-packer */ "./maxrects-packer/maxrects-packer.ts");

Object.defineProperty(exports, "MaxRectsPacker", {
  enumerable: true,
  get: function get() {
    return maxrects_packer_1.MaxRectsPacker;
  }
});
Object.defineProperty(exports, "PACKING_LOGIC", {
  enumerable: true,
  get: function get() {
    return maxrects_packer_1.PACKING_LOGIC;
  }
});

var abstract_bin_1 = __webpack_require__(/*! ./abstract-bin */ "./maxrects-packer/abstract-bin.ts");

Object.defineProperty(exports, "Bin", {
  enumerable: true,
  get: function get() {
    return abstract_bin_1.Bin;
  }
});

var maxrects_bin_1 = __webpack_require__(/*! ./maxrects-bin */ "./maxrects-packer/maxrects-bin.ts");

Object.defineProperty(exports, "MaxRectsBin", {
  enumerable: true,
  get: function get() {
    return maxrects_bin_1.MaxRectsBin;
  }
});

var oversized_element_bin_1 = __webpack_require__(/*! ./oversized-element-bin */ "./maxrects-packer/oversized-element-bin.ts");

Object.defineProperty(exports, "OversizedElementBin", {
  enumerable: true,
  get: function get() {
    return oversized_element_bin_1.OversizedElementBin;
  }
});

/***/ }),

/***/ "./maxrects-packer/maxrects-bin.ts":
/*!*****************************************!*\
  !*** ./maxrects-packer/maxrects-bin.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxRectsBin = void 0;

var maxrects_packer_1 = __webpack_require__(/*! ./maxrects-packer */ "./maxrects-packer/maxrects-packer.ts");

var Rectangle_1 = __webpack_require__(/*! ./geom/Rectangle */ "./maxrects-packer/geom/Rectangle.ts");

var abstract_bin_1 = __webpack_require__(/*! ./abstract-bin */ "./maxrects-packer/abstract-bin.ts");

var MaxRectsBin = function (_abstract_bin_1$Bin) {
  (0, _inherits2.default)(MaxRectsBin, _abstract_bin_1$Bin);

  var _super = _createSuper(MaxRectsBin);

  function MaxRectsBin() {
    var _this;

    var maxWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : maxrects_packer_1.EDGE_MAX_VALUE;
    var maxHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : maxrects_packer_1.EDGE_MAX_VALUE;
    var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      smart: true,
      pot: true,
      square: true,
      allowRotation: false,
      tag: false,
      border: 0,
      logic: maxrects_packer_1.PACKING_LOGIC.MAX_EDGE
    };
    (0, _classCallCheck2.default)(this, MaxRectsBin);
    _this = _super.call(this);
    _this.maxWidth = maxWidth;
    _this.maxHeight = maxHeight;
    _this.padding = padding;
    _this.options = options;
    _this.freeRects = [];
    _this.rects = [];
    _this.verticalExpand = false;
    _this.width = _this.options.smart ? 0 : maxWidth;
    _this.height = _this.options.smart ? 0 : maxHeight;
    _this.border = _this.options.border ? _this.options.border : 0;

    _this.freeRects.push(new Rectangle_1.Rectangle(_this.maxWidth + _this.padding - _this.border * 2, _this.maxHeight + _this.padding - _this.border * 2, _this.border, _this.border));

    _this.stage = new Rectangle_1.Rectangle(_this.width, _this.height);
    return _this;
  }

  (0, _createClass2.default)(MaxRectsBin, [{
    key: "add",
    value: function add() {
      var data;
      var rect;

      if (arguments.length === 1) {
        if ((0, _typeof2.default)(arguments.length <= 0 ? undefined : arguments[0]) !== 'object') throw new Error("MacrectsBin.add(): Wrong parameters");
        rect = arguments.length <= 0 ? undefined : arguments[0];
        var tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
        if (this.options.tag && this.tag !== tag) return undefined;
      } else {
        data = arguments.length > 2 ? arguments.length <= 2 ? undefined : arguments[2] : null;

        if (this.options.tag) {
          if (data && this.tag !== data.tag) return undefined;
          if (!data && this.tag) return undefined;
        }

        rect = new Rectangle_1.Rectangle(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
        rect.data = data;
        rect.setDirty(false);
      }

      var result = this.place(rect);
      if (result) this.rects.push(result);
      return result;
    }
  }, {
    key: "repack",
    value: function repack() {
      var unpacked = [];
      this.reset();
      this.rects.sort(function (a, b) {
        var result = Math.max(b.width, b.height) - Math.max(a.width, a.height);

        if (result === 0 && a.hash && b.hash) {
          return a.hash > b.hash ? -1 : 1;
        } else return result;
      });

      var _iterator = _createForOfIteratorHelper(this.rects),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _rect = _step.value;

          if (!this.place(_rect)) {
            unpacked.push(_rect);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      for (var _i = 0, _unpacked = unpacked; _i < _unpacked.length; _i++) {
        var rect = _unpacked[_i];
        this.rects.splice(this.rects.indexOf(rect), 1);
      }

      return unpacked.length > 0 ? unpacked : undefined;
    }
  }, {
    key: "reset",
    value: function reset() {
      var deepReset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var resetOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (deepReset) {
        if (this.data) delete this.data;
        if (this.tag) delete this.tag;
        this.rects = [];

        if (resetOption) {
          this.options = {
            smart: true,
            pot: true,
            square: true,
            allowRotation: false,
            tag: false,
            border: 0
          };
        }
      }

      this.width = this.options.smart ? 0 : this.maxWidth;
      this.height = this.options.smart ? 0 : this.maxHeight;
      this.border = this.options.border ? this.options.border : 0;
      this.freeRects = [new Rectangle_1.Rectangle(this.maxWidth + this.padding - this.border * 2, this.maxHeight + this.padding - this.border * 2, this.border, this.border)];
      this.stage = new Rectangle_1.Rectangle(this.width, this.height);
      this._dirty = 0;
    }
  }, {
    key: "place",
    value: function place(rect) {
      var tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
      if (this.options.tag && this.tag !== tag) return undefined;
      var node;
      var allowRotation;

      if (rect.hasOwnProperty("_allowRotation") && rect.allowRotation !== undefined) {
        allowRotation = rect.allowRotation;
      } else {
        allowRotation = this.options.allowRotation;
      }

      node = this.findNode(rect.width + this.padding, rect.height + this.padding, allowRotation);

      if (node) {
        this.updateBinSize(node);
        var numRectToProcess = this.freeRects.length;
        var i = 0;

        while (i < numRectToProcess) {
          if (this.splitNode(this.freeRects[i], node)) {
            this.freeRects.splice(i, 1);
            numRectToProcess--;
            i--;
          }

          i++;
        }

        this.pruneFreeList();
        this.verticalExpand = this.width > this.height ? true : false;
        rect.x = node.x;
        rect.y = node.y;
        if (rect.rot === undefined) rect.rot = false;
        rect.rot = node.rot ? !rect.rot : rect.rot;
        this._dirty++;
        return rect;
      } else if (!this.verticalExpand) {
        if (this.updateBinSize(new Rectangle_1.Rectangle(rect.width + this.padding, rect.height + this.padding, this.width + this.padding - this.border, this.border)) || this.updateBinSize(new Rectangle_1.Rectangle(rect.width + this.padding, rect.height + this.padding, this.border, this.height + this.padding - this.border))) {
          return this.place(rect);
        }
      } else {
        if (this.updateBinSize(new Rectangle_1.Rectangle(rect.width + this.padding, rect.height + this.padding, this.border, this.height + this.padding - this.border)) || this.updateBinSize(new Rectangle_1.Rectangle(rect.width + this.padding, rect.height + this.padding, this.width + this.padding - this.border, this.border))) {
          return this.place(rect);
        }
      }

      return undefined;
    }
  }, {
    key: "findNode",
    value: function findNode(width, height, allowRotation) {
      var score = Number.MAX_VALUE;
      var areaFit;
      var r;
      var bestNode;

      for (var i in this.freeRects) {
        r = this.freeRects[i];

        if (r.width >= width && r.height >= height) {
          areaFit = this.options.logic === maxrects_packer_1.PACKING_LOGIC.MAX_AREA ? r.width * r.height - width * height : Math.min(r.width - width, r.height - height);

          if (areaFit < score) {
            bestNode = new Rectangle_1.Rectangle(width, height, r.x, r.y);
            score = areaFit;
          }
        }

        if (!allowRotation) continue;

        if (r.width >= height && r.height >= width) {
          areaFit = this.options.logic === maxrects_packer_1.PACKING_LOGIC.MAX_AREA ? r.width * r.height - height * width : Math.min(r.height - width, r.width - height);

          if (areaFit < score) {
            bestNode = new Rectangle_1.Rectangle(height, width, r.x, r.y, true);
            score = areaFit;
          }
        }
      }

      return bestNode;
    }
  }, {
    key: "splitNode",
    value: function splitNode(freeRect, usedNode) {
      if (!freeRect.collide(usedNode)) return false;

      if (usedNode.x < freeRect.x + freeRect.width && usedNode.x + usedNode.width > freeRect.x) {
        if (usedNode.y > freeRect.y && usedNode.y < freeRect.y + freeRect.height) {
          var newNode = new Rectangle_1.Rectangle(freeRect.width, usedNode.y - freeRect.y, freeRect.x, freeRect.y);
          this.freeRects.push(newNode);
        }

        if (usedNode.y + usedNode.height < freeRect.y + freeRect.height) {
          var _newNode = new Rectangle_1.Rectangle(freeRect.width, freeRect.y + freeRect.height - (usedNode.y + usedNode.height), freeRect.x, usedNode.y + usedNode.height);

          this.freeRects.push(_newNode);
        }
      }

      if (usedNode.y < freeRect.y + freeRect.height && usedNode.y + usedNode.height > freeRect.y) {
        if (usedNode.x > freeRect.x && usedNode.x < freeRect.x + freeRect.width) {
          var _newNode2 = new Rectangle_1.Rectangle(usedNode.x - freeRect.x, freeRect.height, freeRect.x, freeRect.y);

          this.freeRects.push(_newNode2);
        }

        if (usedNode.x + usedNode.width < freeRect.x + freeRect.width) {
          var _newNode3 = new Rectangle_1.Rectangle(freeRect.x + freeRect.width - (usedNode.x + usedNode.width), freeRect.height, usedNode.x + usedNode.width, freeRect.y);

          this.freeRects.push(_newNode3);
        }
      }

      return true;
    }
  }, {
    key: "pruneFreeList",
    value: function pruneFreeList() {
      var i = 0;
      var j = 0;
      var len = this.freeRects.length;

      while (i < len) {
        j = i + 1;
        var tmpRect1 = this.freeRects[i];

        while (j < len) {
          var tmpRect2 = this.freeRects[j];

          if (tmpRect2.contain(tmpRect1)) {
            this.freeRects.splice(i, 1);
            i--;
            len--;
            break;
          }

          if (tmpRect1.contain(tmpRect2)) {
            this.freeRects.splice(j, 1);
            j--;
            len--;
          }

          j++;
        }

        i++;
      }
    }
  }, {
    key: "updateBinSize",
    value: function updateBinSize(node) {
      if (!this.options.smart) return false;
      if (this.stage.contain(node)) return false;
      var tmpWidth = Math.max(this.width, node.x + node.width - this.padding + this.border);
      var tmpHeight = Math.max(this.height, node.y + node.height - this.padding + this.border);

      if (this.options.allowRotation) {
        var rotWidth = Math.max(this.width, node.x + node.height - this.padding + this.border);
        var rotHeight = Math.max(this.height, node.y + node.width - this.padding + this.border);

        if (rotWidth * rotHeight < tmpWidth * tmpHeight) {
          tmpWidth = rotWidth;
          tmpHeight = rotHeight;
        }
      }

      if (this.options.pot) {
        tmpWidth = Math.pow(2, Math.ceil(Math.log(tmpWidth) * Math.LOG2E));
        tmpHeight = Math.pow(2, Math.ceil(Math.log(tmpHeight) * Math.LOG2E));
      }

      if (this.options.square) {
        tmpWidth = tmpHeight = Math.max(tmpWidth, tmpHeight);
      }

      if (tmpWidth > this.maxWidth + this.padding || tmpHeight > this.maxHeight + this.padding) {
        return false;
      }

      this.expandFreeRects(tmpWidth + this.padding, tmpHeight + this.padding);
      this.width = this.stage.width = tmpWidth;
      this.height = this.stage.height = tmpHeight;
      return true;
    }
  }, {
    key: "expandFreeRects",
    value: function expandFreeRects(width, height) {
      var _this2 = this;

      this.freeRects.forEach(function (freeRect, index) {
        if (freeRect.x + freeRect.width >= Math.min(_this2.width + _this2.padding - _this2.border, width)) {
          freeRect.width = width - freeRect.x - _this2.border;
        }

        if (freeRect.y + freeRect.height >= Math.min(_this2.height + _this2.padding - _this2.border, height)) {
          freeRect.height = height - freeRect.y - _this2.border;
        }
      }, this);
      this.freeRects.push(new Rectangle_1.Rectangle(width - this.width - this.padding, height - this.border * 2, this.width + this.padding - this.border, this.border));
      this.freeRects.push(new Rectangle_1.Rectangle(width - this.border * 2, height - this.height - this.padding, this.border, this.height + this.padding - this.border));
      this.freeRects = this.freeRects.filter(function (freeRect) {
        return !(freeRect.width <= 0 || freeRect.height <= 0 || freeRect.x < _this2.border || freeRect.y < _this2.border);
      });
      this.pruneFreeList();
    }
  }]);
  return MaxRectsBin;
}(abstract_bin_1.Bin);

exports.MaxRectsBin = MaxRectsBin;

/***/ }),

/***/ "./maxrects-packer/maxrects-packer.ts":
/*!********************************************!*\
  !*** ./maxrects-packer/maxrects-packer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../node_modules/@babel/runtime/helpers/extends.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxRectsPacker = exports.PACKING_LOGIC = exports.EDGE_MIN_VALUE = exports.EDGE_MAX_VALUE = void 0;

var Rectangle_1 = __webpack_require__(/*! ./geom/Rectangle */ "./maxrects-packer/geom/Rectangle.ts");

var maxrects_bin_1 = __webpack_require__(/*! ./maxrects-bin */ "./maxrects-packer/maxrects-bin.ts");

var oversized_element_bin_1 = __webpack_require__(/*! ./oversized-element-bin */ "./maxrects-packer/oversized-element-bin.ts");

exports.EDGE_MAX_VALUE = 4096;
exports.EDGE_MIN_VALUE = 128;
var PACKING_LOGIC;

(function (PACKING_LOGIC) {
  PACKING_LOGIC[PACKING_LOGIC["MAX_AREA"] = 0] = "MAX_AREA";
  PACKING_LOGIC[PACKING_LOGIC["MAX_EDGE"] = 1] = "MAX_EDGE";
})(PACKING_LOGIC = exports.PACKING_LOGIC || (exports.PACKING_LOGIC = {}));

var MaxRectsPacker = function () {
  function MaxRectsPacker() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : exports.EDGE_MAX_VALUE;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : exports.EDGE_MAX_VALUE;
    var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      smart: true,
      pot: true,
      square: false,
      allowRotation: false,
      tag: false,
      border: 0,
      logic: PACKING_LOGIC.MAX_EDGE
    };
    (0, _classCallCheck2.default)(this, MaxRectsPacker);
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.options = options;
    this._currentBinIndex = 0;
    this.bins = [];
  }

  (0, _createClass2.default)(MaxRectsPacker, [{
    key: "add",
    value: function add() {
      if (arguments.length === 1) {
        if ((0, _typeof2.default)(arguments.length <= 0 ? undefined : arguments[0]) !== 'object') throw new Error("MacrectsPacker.add(): Wrong parameters");
        var rect = arguments.length <= 0 ? undefined : arguments[0];

        if (rect.width > this.width || rect.height > this.height) {
          this.bins.push(new oversized_element_bin_1.OversizedElementBin(rect));
        } else {
          var added = this.bins.slice(this._currentBinIndex).find(function (bin) {
            return bin.add(rect) !== undefined;
          });

          if (!added) {
            var bin = new maxrects_bin_1.MaxRectsBin(this.width, this.height, this.padding, this.options);
            var tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
            if (this.options.tag && tag) bin.tag = tag;
            bin.add(rect);
            this.bins.push(bin);
          }
        }

        return rect;
      } else {
        var _rect = new Rectangle_1.Rectangle(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);

        if (arguments.length > 2) _rect.data = arguments.length <= 2 ? undefined : arguments[2];

        if (_rect.width > this.width || _rect.height > this.height) {
          this.bins.push(new oversized_element_bin_1.OversizedElementBin(_rect));
        } else {
          var _added = this.bins.slice(this._currentBinIndex).find(function (bin) {
            return bin.add(_rect) !== undefined;
          });

          if (!_added) {
            var _bin = new maxrects_bin_1.MaxRectsBin(this.width, this.height, this.padding, this.options);

            if (this.options.tag && _rect.data.tag) _bin.tag = _rect.data.tag;

            _bin.add(_rect);

            this.bins.push(_bin);
          }
        }

        return _rect;
      }
    }
  }, {
    key: "addArray",
    value: function addArray(rects) {
      var _this = this;

      this.sort(rects, this.options.logic).forEach(function (rect) {
        return _this.add(rect);
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.bins = [];
      this._currentBinIndex = 0;
    }
  }, {
    key: "repack",
    value: function repack() {
      var quick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (quick) {
        var unpack = [];

        var _iterator = _createForOfIteratorHelper(this.bins),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var bin = _step.value;

            if (bin.dirty) {
              var up = bin.repack();
              if (up) unpack.push.apply(unpack, (0, _toConsumableArray2.default)(up));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this.addArray(unpack);
        return;
      }

      if (!this.dirty) return;
      var allRects = this.rects;
      this.reset();
      this.addArray(allRects);
    }
  }, {
    key: "next",
    value: function next() {
      this._currentBinIndex = this.bins.length;
      return this._currentBinIndex;
    }
  }, {
    key: "load",
    value: function load(bins) {
      var _this2 = this;

      bins.forEach(function (bin, index) {
        if (bin.maxWidth > _this2.width || bin.maxHeight > _this2.height) {
          _this2.bins.push(new oversized_element_bin_1.OversizedElementBin(bin.width, bin.height, {}));
        } else {
          var newBin = new maxrects_bin_1.MaxRectsBin(_this2.width, _this2.height, _this2.padding, bin.options);
          newBin.freeRects.splice(0);
          bin.freeRects.forEach(function (r, i) {
            newBin.freeRects.push(new Rectangle_1.Rectangle(r.width, r.height, r.x, r.y));
          });
          newBin.width = bin.width;
          newBin.height = bin.height;
          if (bin.tag) newBin.tag = bin.tag;
          _this2.bins[index] = newBin;
        }
      }, this);
    }
  }, {
    key: "save",
    value: function save() {
      var saveBins = [];
      this.bins.forEach(function (bin) {
        var saveBin = {
          width: bin.width,
          height: bin.height,
          maxWidth: bin.maxWidth,
          maxHeight: bin.maxHeight,
          freeRects: [],
          rects: [],
          options: bin.options
        };
        if (bin.tag) saveBin = (0, _extends2.default)((0, _extends2.default)({}, saveBin), {
          tag: bin.tag
        });
        bin.freeRects.forEach(function (r) {
          saveBin.freeRects.push({
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height
          });
        });
        saveBins.push(saveBin);
      });
      return saveBins;
    }
  }, {
    key: "sort",
    value: function sort(rects) {
      var logic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PACKING_LOGIC.MAX_EDGE;
      return rects.slice().sort(function (a, b) {
        var result = logic === PACKING_LOGIC.MAX_EDGE ? Math.max(b.width, b.height) - Math.max(a.width, a.height) : b.width * b.height - a.width * a.height;

        if (result === 0 && a.hash && b.hash) {
          return a.hash > b.hash ? -1 : 1;
        } else return result;
      });
    }
  }, {
    key: "currentBinIndex",
    get: function get() {
      return this._currentBinIndex;
    }
  }, {
    key: "dirty",
    get: function get() {
      return this.bins.some(function (bin) {
        return bin.dirty;
      });
    }
  }, {
    key: "rects",
    get: function get() {
      var allRects = [];

      var _iterator2 = _createForOfIteratorHelper(this.bins),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var bin = _step2.value;
          allRects.push.apply(allRects, (0, _toConsumableArray2.default)(bin.rects));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return allRects;
    }
  }]);
  return MaxRectsPacker;
}();

exports.MaxRectsPacker = MaxRectsPacker;

/***/ }),

/***/ "./maxrects-packer/oversized-element-bin.ts":
/*!**************************************************!*\
  !*** ./maxrects-packer/oversized-element-bin.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OversizedElementBin = void 0;

var Rectangle_1 = __webpack_require__(/*! ./geom/Rectangle */ "./maxrects-packer/geom/Rectangle.ts");

var abstract_bin_1 = __webpack_require__(/*! ./abstract-bin */ "./maxrects-packer/abstract-bin.ts");

var OversizedElementBin = function (_abstract_bin_1$Bin) {
  (0, _inherits2.default)(OversizedElementBin, _abstract_bin_1$Bin);

  var _super = _createSuper(OversizedElementBin);

  function OversizedElementBin() {
    var _this;

    (0, _classCallCheck2.default)(this, OversizedElementBin);
    _this = _super.call(this);
    _this.rects = [];

    if (arguments.length === 1) {
      if ((0, _typeof2.default)(arguments.length <= 0 ? undefined : arguments[0]) !== 'object') throw new Error("OversizedElementBin: Wrong parameters");
      var rect = arguments.length <= 0 ? undefined : arguments[0];
      _this.rects = [rect];
      _this.width = rect.width;
      _this.height = rect.height;
      _this.data = rect.data;
      rect.oversized = true;
    } else {
      _this.width = arguments.length <= 0 ? undefined : arguments[0];
      _this.height = arguments.length <= 1 ? undefined : arguments[1];
      _this.data = arguments.length > 2 ? arguments.length <= 2 ? undefined : arguments[2] : null;

      var _rect = new Rectangle_1.Rectangle(_this.width, _this.height);

      _rect.oversized = true;
      _rect.data = _this.data;

      _this.rects.push(_rect);
    }

    _this.freeRects = [];
    _this.maxWidth = _this.width;
    _this.maxHeight = _this.height;
    _this.options = {
      smart: false,
      pot: false,
      square: false
    };
    return _this;
  }

  (0, _createClass2.default)(OversizedElementBin, [{
    key: "add",
    value: function add() {
      return undefined;
    }
  }, {
    key: "reset",
    value: function reset() {
      var deepReset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    }
  }, {
    key: "repack",
    value: function repack() {
      return undefined;
    }
  }]);
  return OversizedElementBin;
}(abstract_bin_1.Bin);

exports.OversizedElementBin = OversizedElementBin;

/***/ }),

/***/ "./misc/index.ts":
/*!***********************!*\
  !*** ./misc/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = void 0 && (void 0).__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(/*! ./linkedlist */ "./misc/linkedlist.ts"), exports);

__exportStar(__webpack_require__(/*! ./visitor */ "./misc/visitor.ts"), exports);

__exportStar(__webpack_require__(/*! ./string_utils */ "./misc/string_utils.ts"), exports);

/***/ }),

/***/ "./misc/linkedlist.ts":
/*!****************************!*\
  !*** ./misc/linkedlist.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = exports.ListIterator = void 0;

var ListIterator = function () {
  function ListIterator(dl, node, reverse) {
    (0, _classCallCheck2.default)(this, ListIterator);
    this._dl = dl;
    this._node = node;
    this._reverse = reverse;
  }

  (0, _createClass2.default)(ListIterator, [{
    key: "valid",
    value: function valid() {
      return this._node !== this._dl.head;
    }
  }, {
    key: "next",
    value: function next() {
      if (this.valid()) {
        this._node = this._reverse ? this._node.prev : this._node = this._node.next;
      }

      return this;
    }
  }, {
    key: "getNext",
    value: function getNext() {
      if (!this.valid()) {
        throw new Error('Failed to get next iterator: this iterator is invalid');
      }

      return new ListIterator(this._dl, this._reverse ? this._node.prev : this._node.next, this._reverse);
    }
  }, {
    key: "prev",
    value: function prev() {
      if (this.valid()) {
        this._node = this._reverse ? this._node.next : this._node = this._node.prev;
      }

      return this;
    }
  }, {
    key: "getPrev",
    value: function getPrev() {
      if (!this.valid()) {
        throw new Error('Failed to get previous iterator: this iterator is invalid');
      }

      return new ListIterator(this._dl, this._reverse ? this._node.next : this._node.prev, this._reverse);
    }
  }, {
    key: "node",
    get: function get() {
      return this._node;
    },
    set: function set(n) {
      this._node = n;
    }
  }, {
    key: "reversed",
    get: function get() {
      return this._reverse;
    }
  }, {
    key: "list",
    get: function get() {
      return this._dl;
    }
  }, {
    key: "data",
    get: function get() {
      if (this.valid()) {
        return this._node.data;
      } else {
        throw new Error('Invalid interator');
      }
    },
    set: function set(val) {
      if (this.valid()) {
        this._node.data = val;
      }
    }
  }]);
  return ListIterator;
}();

exports.ListIterator = ListIterator;

var List = function () {
  function List() {
    (0, _classCallCheck2.default)(this, List);
    this._head = new ListNodeImpl();
    this._length = 0;
  }

  (0, _createClass2.default)(List, [{
    key: "clear",
    value: function clear() {
      while (this._length > 0) {
        this.remove(this.begin());
      }
    }
  }, {
    key: "append",
    value: function append(data) {
      return this._insertAt(data, this._head);
    }
  }, {
    key: "prepend",
    value: function prepend(data) {
      return this._insertAt(data, this._head.next);
    }
  }, {
    key: "remove",
    value: function remove(it) {
      if (it.valid() && it.list === this) {
        var node = it.node;
        it.next();

        this._remove(node);
      }
    }
  }, {
    key: "insertAt",
    value: function insertAt(data, at) {
      if (at.list === this) {
        if (at.valid()) {
          if (at.reversed) {
            return this._insertAt(data, at.node.next);
          } else {
            return this._insertAt(data, at.node);
          }
        } else {
          return this.append(data);
        }
      }

      return null;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var it = this.begin(); it.valid(); it.next()) {
        callback && callback(it.data);
      }
    }
  }, {
    key: "forEachReverse",
    value: function forEachReverse(callback) {
      for (var it = this.rbegin(); it.valid(); it.next()) {
        callback && callback(it.data);
      }
    }
  }, {
    key: "front",
    value: function front() {
      return this.begin().data;
    }
  }, {
    key: "back",
    value: function back() {
      return this.rbegin().data;
    }
  }, {
    key: "begin",
    value: function begin() {
      return new ListIterator(this, this._length > 0 ? this._head.next : this._head, false);
    }
  }, {
    key: "rbegin",
    value: function rbegin() {
      return new ListIterator(this, this._length > 0 ? this._head.prev : this._head, true);
    }
  }, {
    key: "_remove",
    value: function _remove(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      delete node.prev;
      delete node.next;
      this._length--;
    }
  }, {
    key: "_insertAt",
    value: function _insertAt(data, node) {
      var newNode = new ListNode(data);
      newNode.next = node;
      newNode.prev = node.prev;
      node.prev.next = newNode;
      node.prev = newNode;
      this._length++;
      return new ListIterator(this, newNode, false);
    }
  }, {
    key: "head",
    get: function get() {
      return this._head;
    }
  }, {
    key: "length",
    get: function get() {
      return this._length;
    }
  }]);
  return List;
}();

exports.List = List;

var ListNodeImpl = function ListNodeImpl() {
  (0, _classCallCheck2.default)(this, ListNodeImpl);
  this.next = this;
  this.prev = this;
};

var ListNode = function (_ListNodeImpl) {
  (0, _inherits2.default)(ListNode, _ListNodeImpl);

  var _super = _createSuper(ListNode);

  function ListNode(data) {
    var _this;

    (0, _classCallCheck2.default)(this, ListNode);
    _this = _super.call(this);
    _this.data = data;
    return _this;
  }

  return ListNode;
}(ListNodeImpl);

/***/ }),

/***/ "./misc/string_utils.ts":
/*!******************************!*\
  !*** ./misc/string_utils.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.u8ToString = exports.stringToU8 = exports.base64ToU8 = void 0;
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function removePaddingChars(input) {
  var lkey = _keyStr.indexOf(input.charAt(input.length - 1));

  if (lkey == 64) {
    return input.substring(0, input.length - 1);
  }

  return input;
}

;

function base64ToU8(input) {
  input = removePaddingChars(input);
  input = removePaddingChars(input);
  var bytes = Math.floor(input.length / 4 * 3);
  var uarray = new Uint8Array(bytes);
  var j = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  for (var i = 0; i < bytes; i += 3) {
    var enc1 = _keyStr.indexOf(input.charAt(j++));

    var enc2 = _keyStr.indexOf(input.charAt(j++));

    var enc3 = _keyStr.indexOf(input.charAt(j++));

    var enc4 = _keyStr.indexOf(input.charAt(j++));

    var chr1 = enc1 << 2 | enc2 >> 4;
    var chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    var chr3 = (enc3 & 3) << 6 | enc4;
    uarray[i] = chr1;
    if (enc3 != 64) uarray[i + 1] = chr2;
    if (enc4 != 64) uarray[i + 2] = chr3;
  }

  return uarray;
}

exports.base64ToU8 = base64ToU8;

function stringToU8(s) {
  var escstr = encodeURIComponent(s);
  var binstr = escstr.replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode(Number('0x' + p1));
  });
  var ua = new Uint8Array(binstr.length);
  Array.prototype.forEach.call(binstr, function (ch, i) {
    ua[i] = ch.charCodeAt(0);
  });
  return ua;
}

exports.stringToU8 = stringToU8;

function u8ToString(ua) {
  var binstr = Array.prototype.map.call(ua, function (ch) {
    return String.fromCharCode(ch);
  }).join('');
  var escstr = binstr.replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(p).toString(16).toUpperCase();

    if (code.length < 2) {
      code = '0' + code;
    }

    return '%' + code;
  });
  return decodeURIComponent(escstr);
}

exports.u8ToString = u8ToString;

/***/ }),

/***/ "./misc/visitor.ts":
/*!*************************!*\
  !*** ./misc/visitor.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visitor = exports.visitor = void 0;

function superClassOf(cls) {
  return Object.getPrototypeOf(cls.prototype).constructor;
}

function visitor(T) {
  return function (target, propertyKey) {
    Visitor.setVisitFunc(target.constructor, T, target[propertyKey]);
  };
}

exports.visitor = visitor;

var Visitor = function () {
  function Visitor() {
    (0, _classCallCheck2.default)(this, Visitor);
    this.visitFuncMap = Visitor._getFuncMap(this.constructor);
  }

  (0, _createClass2.default)(Visitor, [{
    key: "visit",
    value: function visit(target) {
      return this.visitWithType(target, target.constructor);
    }
  }, {
    key: "visitWithType",
    value: function visitWithType(target, type) {
      if (target) {
        var func = null;

        while (type !== Object && !func) {
          func = this.visitFuncMap.get(type);

          if (!func) {
            type = superClassOf(type);
          }
        }

        return func && func.call(this, target);
      }
    }
  }], [{
    key: "getVisitFunc",
    value: function getVisitFunc(visitorType, targetType) {
      var funcMap = Visitor._getFuncMap(visitorType);

      return funcMap ? funcMap.get(targetType) : null;
    }
  }, {
    key: "setVisitFunc",
    value: function setVisitFunc(visitorType, targetType, func) {
      var funcMap = Visitor._getFuncMap(visitorType);

      funcMap && funcMap.set(targetType, func);
    }
  }, {
    key: "removeVisitFunc",
    value: function removeVisitFunc(visitorType, targetType) {
      var funcMap = Visitor._getFuncMap(visitorType);

      funcMap && funcMap.delete(targetType);
    }
  }, {
    key: "_getFuncMap",
    value: function _getFuncMap(visitorType) {
      var funcMap = Visitor.visitorFuncMap.get(visitorType);

      if (!funcMap) {
        funcMap = new Map();
        Visitor.visitorFuncMap.set(visitorType, funcMap);
      }

      return funcMap;
    }
  }]);
  return Visitor;
}();

exports.Visitor = Visitor;
Visitor.visitorFuncMap = new Map();

/***/ }),

/***/ "./node.ts":
/*!*****************!*\
  !*** ./node.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RMLNode_1;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMLNode = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var defaultCursor = 'default';
var tmpUV1 = {
  x: 0,
  y: 0
};
var tmpUV2 = {
  x: 0,
  y: 0
};

var RMLNode = RMLNode_1 = function () {
  function RMLNode(uiscene) {
    (0, _classCallCheck2.default)(this, RMLNode);
    this._uiscene = uiscene;
    this._parent = null;
    this._childNodes = [];
    this._children = new _1.RMLLiveNodeList(this, _1.RMLLiveNodeList.MODE_NON_INTERNAL);
    this._childrenElements = new _1.RMLLiveNodeList(this, _1.RMLLiveNodeList.MODE_ELEMENT_NON_INTERNAL);
    this._renderOrder = [];
    this._renderOrderChanged = false;
    this._hScroll = null;
    this._vScroll = null;
    this._loadingTextures = [];
    this._backgroundColor = _1.ElementStyle.defaultBackgroundColor;
    this._backgroundImage = null;
    this._borderLeftColor = _1.ElementStyle.defaultBorderColor;
    this._borderTopColor = _1.ElementStyle.defaultBorderColor;
    this._borderRightColor = _1.ElementStyle.defaultBorderColor;
    this._borderBottomColor = _1.ElementStyle.defaultBorderColor;
    this._layout = new _1.UILayout(this);
    this._style = new _1.ElementStyle(this._layout);
    this._layoutChangeStamp = -1;
    this._disableCounter = 0;
    this._batchList = new _1.RMLPrimitiveBatchList(0, 0);
    this._numQuads = 0;
    this._contentDirty = true;
    this._hide = false;
    this._internal = false;
    this._pseudo = RMLNode_1.PSEUDO_NONE;
    this._font = null;
    this._cachedFontSize = null;
    this._cachedFontFamily = null;
    this._fontColor = null;

    this._resetStyle();
  }

  (0, _createClass2.default)(RMLNode, [{
    key: "normalize",
    value: function normalize() {
      var finished = false;
      var child = this.firstChild;

      while (!finished) {
        finished = true;

        for (; child; child = child.nextSibling) {
          if (child._isText()) {
            child = child._normalize();
            finished = false;
            break;
          }
        }
      }

      for (child = this.firstChild; child; child = child.nextSibling) {
        child.normalize();
      }
    }
  }, {
    key: "setScrollX",
    value: function setScrollX(val) {
      if (this._layout.desiredScrollX !== val) {
        this._layout.desiredScrollX = val;

        this._syncLayout();
      }
    }
  }, {
    key: "setScrollY",
    value: function setScrollY(val) {
      if (this._layout.desiredScrollY !== val) {
        this._layout.desiredScrollY = val;

        this._syncLayout();
      }
    }
  }, {
    key: "setScroll",
    value: function setScroll(x, y) {
      if (this._layout.desiredScrollX !== x || this._layout.desiredScrollY !== y) {
        this._layout.desiredScrollX = x;
        this._layout.desiredScrollY = y;

        this._syncLayout();
      }
    }
  }, {
    key: "getRect",
    value: function getRect() {
      this._uiscene.updateLayout();

      return this._layout.actualRect;
    }
  }, {
    key: "getClippedRect",
    value: function getClippedRect() {
      this._uiscene.updateLayout();

      return this._layout.clippedRect;
    }
  }, {
    key: "getClientRect",
    value: function getClientRect() {
      this._uiscene.updateLayout();

      return this._layout.clientRect;
    }
  }, {
    key: "getBorderRect",
    value: function getBorderRect() {
      this._uiscene.updateLayout();

      return this._layout.borderRect;
    }
  }, {
    key: "enable",
    value: function enable() {
      var parentCounter = this._parent ? this._parent._disableCounter : 0;

      if (this._disableCounter > parentCounter) {
        this._disable(-1);

        this._updateState();
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      var parentCounter = this._parent ? this._parent._disableCounter : 0;

      if (this._disableCounter === parentCounter) {
        this._disable(1);

        this._updateState();
      }
    }
  }, {
    key: "_remove",
    value: function _remove() {
      var parent = null;

      if (this._parent) {
        parent = this._parent;

        var index = this._parent._childNodes.indexOf(this);

        _1.assert(index >= 0, 'remove: node is not child', true);

        var focus = this._uiscene.getFocus();

        if (focus && focus._isSucceedingOf(this)) {
          this._uiscene.setFocus(null);
        }

        var captured = this._uiscene.getCapture();

        if (captured && captured._isSucceedingOf(this)) {
          this._uiscene.setCapture(null);
        }

        this._parent._removeChild(index);

        this._parent = null;

        this._disable(-this._disableCounter);
      } else {
        return null;
      }

      this.dispatchEvent(new _1.DOMTreeEvent(_1.DOMTreeEvent.NAME_REMOVED, parent));
      return this;
    }
  }, {
    key: "_before",
    value: function _before() {
      _1.assert(!!this.parentNode, 'Failed to execute before: parent element must not be null', true);

      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }

      _1.assert(nodes.indexOf(this) < 0, 'Failed to execute before: cannot insert self node', true);

      var first = this;

      for (var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];

        if (typeof node === 'string') {
          var textNode = new _1.Text(this._uiscene);
          textNode.textContent = node;
          textNode.style.width = 'auto';
          textNode.style.height = 'auto';
          textNode.style.flex = '0 0 auto';
          textNode.style.cursor = 'auto';
          this.parentNode.insertBefore(textNode, first);
          first = textNode;
        } else if (node instanceof RMLNode_1) {
          this.parentNode.insertBefore(node, first);
          first = node;
        }
      }
    }
  }, {
    key: "_after",
    value: function _after() {
      _1.assert(!!this.parentNode, 'Failed to execute after: parent element must not be null', true);

      for (var _len2 = arguments.length, nodes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nodes[_key2] = arguments[_key2];
      }

      _1.assert(nodes.indexOf(this) < 0, 'Failed to execute after: cannot insert self node', true);

      var next = this.nextSibling;

      if (next) {
        next._before.apply(next, nodes);
      } else {
        var _this$parentNode;

        (_this$parentNode = this.parentNode)._append.apply(_this$parentNode, nodes);
      }
    }
  }, {
    key: "_append",
    value: function _append() {
      for (var _len3 = arguments.length, nodes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nodes[_key3] = arguments[_key3];
      }

      for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
        var node = _nodes[_i];

        if (typeof node === 'string') {
          var textNode = new _1.Text(this._uiscene);
          textNode.textContent = node;
          textNode.style.width = 'auto';
          textNode.style.height = 'auto';
          textNode.style.flex = '0 0 auto';
          textNode.style.cursor = 'auto';
          textNode.style.backgroundColor = 'rgba(0,0,0,0)';
          this.appendChild(textNode);
        } else if (node instanceof RMLNode_1) {
          this.appendChild(node);
        }
      }
    }
  }, {
    key: "_prepend",
    value: function _prepend() {
      var first = this.firstChild;

      if (!first) {
        this._append.apply(this, arguments);
      } else {
        first._before.apply(first, arguments);
      }
    }
  }, {
    key: "cloneNode",
    value: function cloneNode(deep) {
      throw new Error('Failed to call cloneNode');
    }
  }, {
    key: "getRootNode",
    value: function getRootNode() {
      var root = this;

      while (root.parentNode) {
        root = root.parentNode;
      }

      return root;
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      var _a, _b;

      _1.assert(!!child, "Failed to appendChild: element to be append is ".concat(child), true);

      _1.assert(!this._isSucceedingOf(child), "Failed to appendChild: cannot append parent element", true);

      var ref = (_b = (_a = this.lastChild) === null || _a === void 0 ? void 0 : _a._layout.nextSibling()) === null || _b === void 0 ? void 0 : _b.element;

      child._reparent(this, ref);

      return child;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(newElement, referenceElement) {
      _1.assert(referenceElement && this === referenceElement.parentNode, 'Failed to insertBefore: reference element is not a valid elememnt or is not a child of this node', true);

      _1.assert(!!newElement, "Failed to insertBefore: element to be insert is ".concat(newElement), true);

      _1.assert(!this._isSucceedingOf(newElement), "Failed to insertBefore: cannot insert parent element", true);

      newElement._reparent(this, referenceElement);

      return newElement;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      _1.assert(!!child, "Failed to removeChild: element to be remove is ".concat(child), true);

      _1.assert(this === child.parentNode, 'Failed to removeChild: element to be remove is not a child of this node', true);

      return child._remove();
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(newChild, oldChild) {
      _1.assert(!!newChild, "Failed to replaceChild: element to be insert is ".concat(newChild), true);

      _1.assert(!!oldChild, "Failed to replaceChild: element to be replaced is ".concat(oldChild), true);

      _1.assert(this === oldChild.parentNode, 'Failed to replaceChild: element to be replaced is not a child of this node', true);

      if (newChild !== oldChild) {
        var next = oldChild.nextSibling;
        this.removeChild(oldChild);

        if (next) {
          this.insertBefore(newChild, next);
        } else {
          this.appendChild(newChild);
        }
      }

      return oldChild;
    }
  }, {
    key: "contains",
    value: function contains(child) {
      return child && child._isSucceedingOf(this);
    }
  }, {
    key: "hasChildNodes",
    value: function hasChildNodes() {
      return this.childNodes.length > 0;
    }
  }, {
    key: "setCapture",
    value: function setCapture() {
      if (this._isSucceedingOf(this._uiscene.document)) {
        this._uiscene.setCapture(this);
      }
    }
  }, {
    key: "releaseCapture",
    value: function releaseCapture() {
      if (this._uiscene.getCapture() === this) {
        this._uiscene.setCapture(null);
      }
    }
  }, {
    key: "accept",
    value: function accept(v) {
      v.visit(this);
    }
  }, {
    key: "traverse",
    value: function traverse(v, inverse, render) {
      if (!this._isVisible()) {
        return;
      }

      if (!!render) {
        if (this._renderOrderChanged) {
          this._renderOrderChanged = false;

          this._updateRenderOrders();
        }

        if (!!inverse) {
          for (var i = this._renderOrder.length - 1; i >= 0; i--) {
            this._childNodes[this._renderOrder[i]].traverse(v, inverse, render);
          }

          v.visit(this);
        } else {
          v.visit(this);

          for (var _i2 = 0; _i2 < this._renderOrder.length; _i2++) {
            this._childNodes[this._renderOrder[_i2]].traverse(v, inverse, render);
          }
        }
      } else {
        if (!!inverse) {
          for (var _i3 = this._childNodes.length - 1; _i3 >= 0; _i3--) {
            this._childNodes[_i3].traverse(v, inverse, render);
          }

          v.visit(this);
        } else {
          v.visit(this);

          var _iterator = _createForOfIteratorHelper(this._childNodes),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var child = _step.value;
              child.traverse(v, inverse, render);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(renderer) {
      var img = this.style.backgroundImage ? this._uiscene.imageManager.getImage(this.style.backgroundImage) : null;

      if (img !== this._backgroundImage) {
        this._backgroundImage = img;
        this._contentDirty = true;
      }

      if (this._contentDirty) {
        this._contentDirty = false;

        this._batchList.clear();

        var w = this._layout.actualRect.width;
        var h = this._layout.actualRect.height;

        if (w > 0 && h > 0) {
          var v = this.toAbsolute({
            x: 0,
            y: 0
          });
          this._batchList.x = v.x;
          this._batchList.y = v.y;
          var preEvt = new _1.ElementBuildContentEvent(_1.ElementBuildContentEvent.NAME_PREBUILD, this._batchList);
          this.dispatchEvent(preEvt);

          if (!preEvt.defaultPrevented) {
            this._buildVertexData();

            var postEvt = new _1.ElementBuildContentEvent(_1.ElementBuildContentEvent.NAME_POSTBUILD, this._batchList);
            this.dispatchEvent(postEvt);
          }
        }
      }

      this._draw(renderer);
    }
  }, {
    key: "toAbsolute",
    value: function toAbsolute(v) {
      return this._layout.toAbsolute(v);
    }
  }, {
    key: "_getCachedFontSize",
    value: function _getCachedFontSize() {
      var _a;

      return this._cachedFontSize || ((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a._getCachedFontSize()) || RMLNode_1._defaultFontSize;
    }
  }, {
    key: "_getCachedFontFamily",
    value: function _getCachedFontFamily() {
      var _a;

      return this._cachedFontFamily || ((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a._getCachedFontFamily()) || RMLNode_1._defaultFontFamily;
    }
  }, {
    key: "_getCachedFont",
    value: function _getCachedFont() {
      if (!this._font) {
        this._font = new _1.Font("".concat(this._getCachedFontSize(), " ").concat(this._getCachedFontFamily()));
      }

      return this._font;
    }
  }, {
    key: "_getCachedFontColor",
    value: function _getCachedFontColor() {
      var _a;

      return this._fontColor || ((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a._getCachedFontColor()) || _1.ElementStyle.defaultFontColor;
    }
  }, {
    key: "_updatePseudoElementStyles",
    value: function _updatePseudoElementStyles(types) {
      for (var _i4 = 0, _arr = ['before', 'after']; _i4 < _arr.length; _i4++) {
        var name = _arr[_i4];
        var info = types === null || types === void 0 ? void 0 : types.get(name);
        var pseudo = void 0;
        var node = void 0;

        if (name === 'before') {
          pseudo = RMLNode_1.PSEUDO_BEFORE;
          node = this._childNodes.length > 0 && this._childNodes[0]._getPseudo() === pseudo ? this._childNodes[0] : null;
        } else {
          pseudo = RMLNode_1.PSEUDO_AFTER;
          node = this._childNodes.length > 0 && this._childNodes[this._childNodes.length - 1]._getPseudo() === pseudo ? this._childNodes[this._childNodes.length - 1] : null;
        }

        if (info) {
          if (!node) {
            node = this.ownerDocument.createElement('div');

            node._setInternal();

            node._setPseudo(pseudo);

            node._reparent(this, name === 'before' && this._childNodes.length > 0 ? this._childNodes[0] : null);
          } else {
            node._resetStyle();
          }

          var _iterator2 = _createForOfIteratorHelper(info),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _s = _step2.value;
              node.style.applyStyleSheet(_s.stylesheet, true);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          if (info.length > 0 && typeof info[info.length - 1].extra.content === 'string') {
            var s = info[info.length - 1].extra.content.trim();
            var match = s.match(/^'([^']*)'$/);

            if (!match) {
              match = s.match(/^"([^"]*)"$/);
            }

            if (match) {
              node.textContent = _1.unescapeCSSString(match[1]);
            }
          }
        } else if (node) {
          node._remove();
        }
      }
    }
  }, {
    key: "_updateStyle",
    value: function _updateStyle(val) {
      this._uiscene._markStyleRefreshForElement(this);
    }
  }, {
    key: "_updateBorder",
    value: function _updateBorder() {
      this._invalidateContent();
    }
  }, {
    key: "_updateZIndex",
    value: function _updateZIndex() {
      if (this._parent) {
        this._parent._markRenderOrderChanged();
      }

      return this;
    }
  }, {
    key: "_updateCursor",
    value: function _updateCursor(val) {}
  }, {
    key: "_updateDisplay",
    value: function _updateDisplay(val) {
      this._hide = val === 'none';
    }
  }, {
    key: "_updateBorderLeftColor",
    value: function _updateBorderLeftColor(val) {
      this._borderLeftColor.x = val.x;
      this._borderLeftColor.y = val.y;
      this._borderLeftColor.z = val.z;
      this._borderLeftColor.w = val.w;

      this._invalidateContent();
    }
  }, {
    key: "_updateBorderTopColor",
    value: function _updateBorderTopColor(val) {
      this._borderTopColor.x = val.x;
      this._borderTopColor.y = val.y;
      this._borderTopColor.z = val.z;
      this._borderTopColor.w = val.w;

      this._invalidateContent();
    }
  }, {
    key: "_updateBorderRightColor",
    value: function _updateBorderRightColor(val) {
      this._borderRightColor.x = val.x;
      this._borderRightColor.y = val.y;
      this._borderRightColor.z = val.z;
      this._borderRightColor.w = val.w;

      this._invalidateContent();
    }
  }, {
    key: "_updateBorderBottomColor",
    value: function _updateBorderBottomColor(val) {
      this._borderBottomColor.x = val.x;
      this._borderBottomColor.y = val.y;
      this._borderBottomColor.z = val.z;
      this._borderBottomColor.w = val.w;

      this._invalidateContent();
    }
  }, {
    key: "_updateBackgroundColor",
    value: function _updateBackgroundColor(val) {
      this._backgroundColor.x = val.x;
      this._backgroundColor.y = val.y;
      this._backgroundColor.z = val.z;
      this._backgroundColor.w = val.w;

      this._invalidateContent();
    }
  }, {
    key: "_updateFont",
    value: function _updateFont(val) {
      if (this.style.font === val) {
        this._font = val ? new _1.Font(val) : null;
      }

      this._invalidateContent();

      this._invalidateLayout();

      var _iterator3 = _createForOfIteratorHelper(this._childNodes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;

          child._updateFont(val);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "_updateFontSize",
    value: function _updateFontSize(val) {
      val = val || null;

      if (this._cachedFontSize !== val) {
        this._cachedFontSize = val;
        this._font = null;

        this._invalidateContent();

        this._invalidateLayout();

        var _iterator4 = _createForOfIteratorHelper(this._childNodes),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var child = _step4.value;

            child._invalidateFont(true, false);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }
  }, {
    key: "_updateFontFamily",
    value: function _updateFontFamily(val) {
      val = val || null;

      if (this._cachedFontFamily !== val) {
        this._cachedFontFamily = val;
        this._font = null;

        this._invalidateContent();

        this._invalidateLayout();

        var _iterator5 = _createForOfIteratorHelper(this._childNodes),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var child = _step5.value;

            child._invalidateFont(false, true);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }
  }, {
    key: "_updateFontColor",
    value: function _updateFontColor(val) {
      if (this.style.color === val) {
        this._fontColor = val ? this.style.parseColor(val) : null;
      }

      this._invalidateContent();

      var _iterator6 = _createForOfIteratorHelper(this._childNodes),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var child = _step6.value;

          child._updateFontColor(val);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "_isSucceedingOf",
    value: function _isSucceedingOf(w) {
      var p = this;

      while (p && p !== w) {
        p = p.parentNode;
      }

      return !!p;
    }
  }, {
    key: "_isValid",
    value: function _isValid() {
      return this._uiscene && this._isSucceedingOf(this._uiscene.document);
    }
  }, {
    key: "_invalidateLayout",
    value: function _invalidateLayout() {
      if (this._isSucceedingOf(this._uiscene.document)) {
        this._layout.markDirty();

        this._uiscene.invalidateLayout();
      }
    }
  }, {
    key: "_invalidateContent",
    value: function _invalidateContent() {
      this._contentDirty = true;
    }
  }, {
    key: "_invalidateFont",
    value: function _invalidateFont(sizeChange, familyChange) {
      if (sizeChange && this._cachedFontSize === null || familyChange && this._cachedFontFamily === null) {
        this._font = null;

        this._invalidateContent();

        var _iterator7 = _createForOfIteratorHelper(this._childNodes),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var child = _step7.value;

            child._invalidateFont(sizeChange, familyChange);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }
  }, {
    key: "_reparent",
    value: function _reparent(p, at) {
      if (this._parent !== p) {
        this._remove();

        this._parent = p;

        if (p) {
          p._insertChild(this, at ? p._childNodes.indexOf(at) : -1);

          this._disable(p._disableCounter);

          this.dispatchEvent(new _1.DOMTreeEvent(_1.DOMTreeEvent.NAME_INSERTED, p));
        }
      }

      return this;
    }
  }, {
    key: "_calcLayout",
    value: function _calcLayout() {
      this._layout.calcLayout();

      this._syncLayout();
    }
  }, {
    key: "_getClipper",
    value: function _getClipper(clipToClient) {
      var clipper = this._layout.clippedRect || (clipToClient ? this._layout.clientRect : {
        x: 0,
        y: 0,
        width: this._layout.actualRect.width,
        height: this._layout.actualRect.height
      });
      return clipper.width > 0 && clipper.height > 0 ? clipper : null;
    }
  }, {
    key: "_measureContentSize",
    value: function _measureContentSize(rc) {
      rc.width = 0;
      rc.height = 0;
      return rc;
    }
  }, {
    key: "_onMouseIn",
    value: function _onMouseIn(x, y) {
      this._mouseIn = true;

      this._updateState();
    }
  }, {
    key: "_onMouseOut",
    value: function _onMouseOut(x, y) {
      this._mouseIn = false;

      this._updateState();
    }
  }, {
    key: "_onMouseEnter",
    value: function _onMouseEnter(x, y) {
      var cursor = this.style.cursor || defaultCursor;

      if (cursor !== 'auto') {
        this._uiscene.renderer.setCursorStyle(cursor);
      }
    }
  }, {
    key: "_onMouseLeave",
    value: function _onMouseLeave(x, y) {}
  }, {
    key: "_onMouseDown",
    value: function _onMouseDown(x, y) {
      this._mouseDown = true;

      this._updateState();
    }
  }, {
    key: "_onMouseUp",
    value: function _onMouseUp(x, y) {
      this._mouseDown = false;

      this._updateState();
    }
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = {};
      style.flex = '0 1 auto';
      style.flexDirection = 'row';
      style.width = 'auto';
      style.height = 'auto';
      return style;
    }
  }, {
    key: "_resetStyle",
    value: function _resetStyle() {
      this._font = null;
      this._fontColor = null;
      this.style.reset();
      this.style.applyStyleSheet(this._getDefaultStyleSheet(), false);
    }
  }, {
    key: "_applyInlineStyles",
    value: function _applyInlineStyles() {}
  }, {
    key: "_isVisible",
    value: function _isVisible() {
      return !this._hide && (!this._parent || this._parent._isVisible());
    }
  }, {
    key: "_getLayout",
    value: function _getLayout() {
      return this._layout;
    }
  }, {
    key: "_syncLayout",
    value: function _syncLayout() {
      this._layout.calcLayoutScroll();

      this._layout.calcLayoutClip();

      this._notifyLayoutEvents();
    }
  }, {
    key: "_updateState",
    value: function _updateState() {
      if (this._pseudo === RMLNode_1.PSEUDO_NONE) {
        this._uiscene._markStyleRefreshForElement(this);
      }
    }
  }, {
    key: "_draw",
    value: function _draw(renderer) {
      if (this._batchList.length > 0) {
        renderer.drawBatchList(this._batchList);
      }
    }
  }, {
    key: "_buildVertexData",
    value: function _buildVertexData() {
      var _a, _b;

      var w = this._layout.actualRect.width;
      var h = this._layout.actualRect.height;
      var img = this._backgroundImage;
      var drawPatch9 = !!((img === null || img === void 0 ? void 0 : img.topLeftPatch9) && (img === null || img === void 0 ? void 0 : img.bottomRightPatch9));

      if (drawPatch9) {
        if (img.topLeftPatch9.x + img.bottomRightPatch9.x > this._layout.actualRect.height || img.topLeftPatch9.y + img.bottomRightPatch9.y > this._layout.actualRect.width) {
          drawPatch9 = false;
        }
      }

      var color = this._backgroundColor;

      var clipper = this._getClipper(false);

      if (clipper) {
        if (color.w > 0) {
          if (!drawPatch9) {
            var u1 = (img === null || img === void 0 ? void 0 : img.uvMin.x) || 0;
            var v1 = (img === null || img === void 0 ? void 0 : img.uvMin.y) || 0;
            var u2 = (img === null || img === void 0 ? void 0 : img.uvMax.x) || 0;
            var v2 = (img === null || img === void 0 ? void 0 : img.uvMax.y) || 0;

            this._batchList.addPrimitive(new _1.RMLRectPrimitive(0, 0, w, h, u1, v1, u2, v2), clipper, ((_a = this._backgroundImage) === null || _a === void 0 ? void 0 : _a.texture) || null, color);
          } else {
            var t = img.topLeftPatch9.x;
            var l = img.topLeftPatch9.y;
            var b = img.bottomRightPatch9.x;
            var r = img.bottomRightPatch9.y;
            var _u = img.uvMin.x;
            var _v = img.uvMin.y;
            var _u2 = img.uvMax.x;
            var _v2 = img.uvMax.y;
            var aw = this._uiscene.renderer.getTextureWidth(img.texture) * (_u2 - _u) + 0.5 | 0;
            var ah = this._uiscene.renderer.getTextureHeight(img.texture) * (_v2 - _v) + 0.5 | 0;
            var ul = _u + (_u2 - _u) * l;
            var ur = _u + (_u2 - _u) * r;
            var vt = _v + (_v2 - _v) * t;
            var vb = _v + (_v2 - _v) * b;
            t = t * ah | 0;
            l = l * aw | 0;
            b = ah - (b * ah | 0);
            r = aw - (r * aw | 0);
            var quads = [t === 0 || l === 0 ? null : [0, 0, l, t, _u, _v, ul, vt], t === 0 ? null : [t, 0, w - l - r, t, ul, _v, ur, vt], t === 0 || r === 0 ? null : [w - r, 0, r, t, ur, _v, _u2, vt], t + b === h ? null : [0, t, l, h - t - b, _u, vt, ul, vb], t + b === h ? null : [l, t, w - l - r, h - t - b, ul, vt, ur, vb], t + b === h ? null : [w - r, t, r, h - t - b, ur, vt, _u2, vb], b === 0 || l === 0 ? null : [0, h - b, l, b, _u, vb, ul, _v2], b === 0 ? null : [l, h - b, w - l - r, b, ul, vb, ur, _v2], b === 0 || r === 0 ? null : [w - r, h - b, r, b, ur, vb, _u2, _v2]];

            for (var _i5 = 0, _quads = quads; _i5 < _quads.length; _i5++) {
              var q = _quads[_i5];

              if (q) {
                tmpUV1.x = q[4];
                tmpUV1.y = q[5];
                tmpUV2.x = q[6];
                tmpUV2.y = q[7];

                this._batchList.addPrimitive(new _1.RMLRectPrimitive(q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7]), clipper, ((_b = this._backgroundImage) === null || _b === void 0 ? void 0 : _b.texture) || null, color);
              }
            }
          }
        }

        var borderLeft = this.style.borderLeftWidth ? parseInt(this.style.borderLeftWidth) : 0;
        var borderTop = this.style.borderTopWidth ? parseInt(this.style.borderTopWidth) : 0;
        var borderRight = this.style.borderRightWidth ? parseInt(this.style.borderRightWidth) : 0;
        var borderBottom = this.style.borderBottomWidth ? parseInt(this.style.borderBottomWidth) : 0;
        var borderColorLeft = this._borderLeftColor;
        var borderColorTop = this._borderTopColor;
        var borderColorRight = this._borderRightColor;
        var borderColorBottom = this._borderBottomColor;

        if (borderLeft && borderColorLeft.w > 0) {
          this._batchList.addPrimitive(new _1.RMLPolygonPrimitive([{
            x: 0,
            y: 0
          }, {
            x: borderLeft,
            y: borderTop
          }, {
            x: borderLeft,
            y: h - borderBottom
          }, {
            x: 0,
            y: h
          }]), clipper, null, borderColorLeft);
        }

        if (borderTop && borderColorTop.w > 0) {
          this._batchList.addPrimitive(new _1.RMLPolygonPrimitive([{
            x: 0,
            y: 0
          }, {
            x: w,
            y: 0
          }, {
            x: w - borderRight,
            y: borderTop
          }, {
            x: borderLeft,
            y: borderTop
          }]), clipper, null, borderColorTop);
        }

        if (borderRight && borderColorRight.w > 0) {
          this._batchList.addPrimitive(new _1.RMLPolygonPrimitive([{
            x: w - borderRight,
            y: borderTop
          }, {
            x: w,
            y: 0
          }, {
            x: w,
            y: h
          }, {
            x: w - borderRight,
            y: h - borderBottom
          }]), clipper, null, borderColorRight);
        }

        if (borderBottom && borderColorBottom.w > 0) {
          this._batchList.addPrimitive(new _1.RMLPolygonPrimitive([{
            x: 0,
            y: h
          }, {
            x: borderLeft,
            y: h - borderBottom
          }, {
            x: w - borderRight,
            y: h - borderBottom
          }, {
            x: w,
            y: h
          }]), clipper, null, borderColorBottom);
        }
      }
    }
  }, {
    key: "_isText",
    value: function _isText() {
      return false;
    }
  }, {
    key: "_isInternal",
    value: function _isInternal() {
      return this._internal;
    }
  }, {
    key: "_setInternal",
    value: function _setInternal() {
      this._internal = true;
    }
  }, {
    key: "_getPseudo",
    value: function _getPseudo() {
      return this._pseudo;
    }
  }, {
    key: "_setPseudo",
    value: function _setPseudo(val) {
      this._pseudo = val;
    }
  }, {
    key: "_isHover",
    value: function _isHover() {
      return this._mouseIn;
    }
  }, {
    key: "_isActive",
    value: function _isActive() {
      return this._mouseDown;
    }
  }, {
    key: "_disable",
    value: function _disable(count) {
      this._disableCounter += count;

      var _iterator8 = _createForOfIteratorHelper(this._childNodes),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var child = _step8.value;

          child._disable(count);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }, {
    key: "_markRenderOrderChanged",
    value: function _markRenderOrderChanged() {
      this._renderOrderChanged = true;
    }
  }, {
    key: "_updateRenderOrders",
    value: function _updateRenderOrders() {
      var _this = this;

      this._renderOrder = this._childNodes.map(function (val, index) {
        return index;
      });

      this._renderOrder.sort(function (a, b) {
        return _this._childNodes[a]._getZIndex() - _this._childNodes[b]._getZIndex() || a - b;
      });
    }
  }, {
    key: "_notifyLayoutEvents",
    value: function _notifyLayoutEvents() {
      if (this._layout.changeStamp !== this._layoutChangeStamp) {
        this._layoutChangeStamp = this._layout.changeStamp;

        this._invalidateContent();

        this.dispatchEvent(new _1.ElementLayoutEvent());
      }

      this._updateScrollState();

      var _iterator9 = _createForOfIteratorHelper(this._childNodes),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var child = _step9.value;

          child._notifyLayoutEvents();
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "_notifyTextContentEvents",
    value: function _notifyTextContentEvents() {
      this.dispatchEvent(new _1.TextContentChangeEvent());
    }
  }, {
    key: "_getZIndex",
    value: function _getZIndex() {
      var val = Number(this.style.zIndex);

      if (Number.isNaN(val)) {
        val = 0;
      }

      return val;
    }
  }, {
    key: "_removeChild",
    value: function _removeChild(index) {
      var child = this._childNodes[index];

      this._layout.removeChild(this._childNodes[index]._getLayout());

      this._childNodes.splice(index, 1);

      this._invalidateLayout();

      this._markRenderOrderChanged();
    }
  }, {
    key: "_insertChild",
    value: function _insertChild(child) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (index >= 0) {
        var p = this._childNodes[index];

        this._layout.insertChild(child._getLayout(), p._getLayout());

        this._childNodes.splice(index, 0, child);

        if (child.nodeType === RMLNode_1.ELEMENT_NODE) {
          for (; p; p = p.nextSibling) {
            if (p.nodeType === RMLNode_1.ELEMENT_NODE) {
              break;
            }
          }
        }
      } else {
        this._layout.appendChild(child._getLayout());

        this._childNodes.push(child);
      }

      this._invalidateLayout();

      this._markRenderOrderChanged();
    }
  }, {
    key: "_getChildren",
    value: function _getChildren() {
      return this._childNodes;
    }
  }, {
    key: "_getFirstChild",
    value: function _getFirstChild(element) {
      var _a, _b;

      for (var child = (_a = this._layout.firstChild()) === null || _a === void 0 ? void 0 : _a.element; child; child = (_b = child._layout.nextSibling()) === null || _b === void 0 ? void 0 : _b.element) {
        if (!child._isInternal() && (!element || child.nodeType === RMLNode_1.ELEMENT_NODE)) {
          return child;
        }
      }

      return null;
    }
  }, {
    key: "_getLastChild",
    value: function _getLastChild(element) {
      var _a, _b;

      for (var child = (_a = this._layout.lastChild()) === null || _a === void 0 ? void 0 : _a.element; child; child = (_b = child._layout.previousSibling()) === null || _b === void 0 ? void 0 : _b.element) {
        if (!child._isInternal() && (!element || child.nodeType === RMLNode_1.ELEMENT_NODE)) {
          return child;
        }
      }

      return null;
    }
  }, {
    key: "_getNextSibling",
    value: function _getNextSibling(element) {
      var _a;

      var result = this;

      do {
        result = ((_a = result._layout.nextSibling()) === null || _a === void 0 ? void 0 : _a.element) || null;
      } while (result && (result._isInternal() || !!element && result.nodeType !== RMLNode_1.ELEMENT_NODE));

      return result;
    }
  }, {
    key: "_getPreviousSibling",
    value: function _getPreviousSibling(element) {
      var _a;

      var result = this;

      do {
        result = ((_a = result._layout.previousSibling()) === null || _a === void 0 ? void 0 : _a.element) || null;
      } while (result && (result._isInternal() || !!element && result.nodeType !== RMLNode_1.ELEMENT_NODE));

      return result;
    }
  }, {
    key: "_init",
    value: function _init() {}
  }, {
    key: "_updateScrollState",
    value: function _updateScrollState() {
      var _this2 = this;

      var overflowX = this.style.overflowX || 'auto';
      var overflowY = this.style.overflowY || 'auto';
      var xOverflow = overflowX === 'scroll' || overflowX === 'auto' && this._layout.scrollRect !== null && this._layout.scrollRect.width > this._layout.actualRect.width;
      var yOverflow = overflowY === 'scroll' || overflowY === 'auto' && this._layout.scrollRect !== null && this._layout.scrollRect.height > this._layout.actualRect.height;
      var scrollBarSize = 12;
      var blockSize = 8;
      var buttonSize = 12;

      if (xOverflow) {
        var width = yOverflow ? this._layout.clientRect.width - scrollBarSize : this._layout.clientRect.width;

        if (this._layout.clientRect.height < scrollBarSize || width < 2 * buttonSize + blockSize) {
          xOverflow = false;
        } else {
          if (!this._hScroll) {
            this._hScroll = this._uiscene.createElement('scrollbar');
            this._hScroll.style.position = 'fixed';
            this._hScroll.style.zIndex = 999999;
            this._hScroll.style.height = scrollBarSize;

            this._hScroll.setAttribute('orientation', 'horizonal');

            this._hScroll.setAttribute('blockSize', String(blockSize));

            this._hScroll.setAttribute('buttonSize', String(buttonSize));

            this._hScroll._setInternal();

            this._hScroll.addEventListener(_1.ValueChangeEvent.NAME, function (e) {
              var data = e;
              _this2.scrollX = data.value;
            });

            this.appendChild(this._hScroll);
          }

          this._hScroll.setAttribute('rangeStart', String(this._layout.minScrollX));

          this._hScroll.setAttribute('rangeEnd', String(this._layout.maxScrollX));

          this._hScroll.setAttribute('value', String(this.scrollX));

          this._hScroll.style.left = this._layout.clientRect.x - this._layout.borderRect.x;
          this._hScroll.style.width = width;
          this._hScroll.style.bottom = this._layout.borderRect.height - this._layout.clientRect.height - this._layout.clientRect.y + this._layout.borderRect.y;
        }
      }

      if (!xOverflow && this._hScroll) {
        this.removeChild(this._hScroll);
        this._hScroll = null;
      }

      if (yOverflow) {
        var height = xOverflow ? this._layout.clientRect.height - scrollBarSize : this._layout.clientRect.height;

        if (this._layout.clientRect.width < scrollBarSize || height < 2 * buttonSize + blockSize) {
          yOverflow = false;
        } else {
          if (!this._vScroll) {
            this._vScroll = this._uiscene.createElement('scrollbar');
            this._vScroll.style.position = 'fixed';
            this._vScroll.style.zIndex = 999999;
            this._vScroll.style.width = scrollBarSize;

            this._vScroll.setAttribute('orientation', 'vertical');

            this._vScroll.setAttribute('blockSize', String(blockSize));

            this._vScroll.setAttribute('buttonSize', String(buttonSize));

            this._vScroll._setInternal();

            this._vScroll.addEventListener(_1.ValueChangeEvent.NAME, function (e) {
              var data = e;
              _this2.scrollY = data.value;
            });

            this.appendChild(this._vScroll);
          }

          this._vScroll.setAttribute('rangeStart', String(this._layout.minScrollY));

          this._vScroll.setAttribute('rangeEnd', String(this._layout.maxScrollY));

          this._vScroll.setAttribute('value', String(this.scrollY));

          this._vScroll.style.top = this._layout.clientRect.y - this._layout.borderRect.y;
          this._vScroll.style.height = height;
          this._vScroll.style.right = this._layout.borderRect.width - this._layout.clientRect.width - this._layout.clientRect.x + this._layout.borderRect.x;
        }
      }

      if (!yOverflow && this._vScroll) {
        this.removeChild(this._vScroll);
        this._vScroll = null;
      }
    }
  }, {
    key: "gui",
    get: function get() {
      return this._uiscene;
    }
  }, {
    key: "nodeType",
    get: function get() {
      return RMLNode_1.UNKNOWN_NODE;
    }
  }, {
    key: "nodeName",
    get: function get() {
      switch (this.nodeType) {
        case RMLNode_1.ELEMENT_NODE:
          return this.tagName;

        case RMLNode_1.TEXT_NODE:
          return '#text';

        case RMLNode_1.DOCUMENT_NODE:
          return '#document';

        default:
          return '#unknown';
      }
    }
  }, {
    key: "nodeValue",
    get: function get() {
      switch (this.nodeType) {
        case RMLNode_1.TEXT_NODE:
          return this.textContent;

        default:
          return null;
      }
    }
  }, {
    key: "ownerDocument",
    get: function get() {
      return this === this._uiscene.document ? null : this._uiscene.document || null;
    }
  }, {
    key: "isConnected",
    get: function get() {
      return this._isSucceedingOf(this._uiscene.document);
    }
  }, {
    key: "parentNode",
    get: function get() {
      return this._parent;
    }
  }, {
    key: "parentElement",
    get: function get() {
      return this._parent && this._parent.nodeType === RMLNode_1.ELEMENT_NODE ? this._parent : null;
    }
  }, {
    key: "childNodes",
    get: function get() {
      return this._children;
    }
  }, {
    key: "style",
    get: function get() {
      return this._style;
    }
  }, {
    key: "textContent",
    get: function get() {
      var content = '';

      for (var child = this.firstChild; child; child = child.nextSibling) {
        content += child.textContent;
      }

      return content;
    },
    set: function set(text) {
      text = String(text) || '';
      text = text.trim().replace(/\s+/, ' ');
      var childrenToBeRemoved = [];

      for (var child = this.firstChild; child; child = child.nextSibling) {
        if (!child._isInternal()) {
          childrenToBeRemoved.push(child);
        }
      }

      for (var _i6 = 0, _childrenToBeRemoved = childrenToBeRemoved; _i6 < _childrenToBeRemoved.length; _i6++) {
        var _child = _childrenToBeRemoved[_i6];

        _child._remove();
      }

      if (this._pseudo === RMLNode_1.PSEUDO_BEFORE || this._pseudo === RMLNode_1.PSEUDO_AFTER || text !== '') {
        this._append(text);
      }
    }
  }, {
    key: "scrollX",
    get: function get() {
      return this._layout.desiredScrollX;
    },
    set: function set(val) {
      this.setScrollX(val);
    }
  }, {
    key: "scrollY",
    get: function get() {
      return this._layout.desiredScrollY;
    },
    set: function set(val) {
      this.setScrollY(val);
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._disableCounter === 0;
    },
    set: function set(enable) {
      enable ? this.enable() : this.disable();
    }
  }, {
    key: "nextSibling",
    get: function get() {
      return this._getNextSibling(false);
    }
  }, {
    key: "previousSibling",
    get: function get() {
      return this._getPreviousSibling(false);
    }
  }, {
    key: "firstChild",
    get: function get() {
      return this._getFirstChild(false);
    }
  }, {
    key: "lastChild",
    get: function get() {
      return this._getLastChild(false);
    }
  }]);
  return RMLNode;
}();

RMLNode.PSEUDO_NONE = 0;
RMLNode.PSEUDO_BEFORE = 1;
RMLNode.PSEUDO_AFTER = 2;
RMLNode.UNKNOWN_NODE = 0;
RMLNode.ELEMENT_NODE = 1;
RMLNode.TEXT_NODE = 3;
RMLNode.DOCUMENT_NODE = 9;
RMLNode._defaultFont = null;
RMLNode._defaultFontSize = '12px';
RMLNode._defaultFontFamily = 'arial';
RMLNode = RMLNode_1 = __decorate([_1.eventtarget(), __metadata("design:paramtypes", [_1.GUI])], RMLNode);
exports.RMLNode = RMLNode;

/***/ }),

/***/ "./nodelist.ts":
/*!*********************!*\
  !*** ./nodelist.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMLLiveNodeList = exports.RMLStaticNodeList = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var ElementIndexer = function () {
  function ElementIndexer(parent, mode) {
    (0, _classCallCheck2.default)(this, ElementIndexer);
    this._parent = parent;
    this._currentIndex = -1;
    this._currentNode = null;
    this._length = -1;
    this._mode = mode;
    this._domTag = parent.gui.domTag;
  }

  (0, _createClass2.default)(ElementIndexer, [{
    key: "item",
    value: function item(index) {
      return this._at(index);
    }
  }, {
    key: "entries",
    value: function entries() {
      return this._getEntriesIterator();
    }
  }, {
    key: "keys",
    value: function keys() {
      return this._getKeysIterator();
    }
  }, {
    key: "values",
    value: function values() {
      return this._getValuesIterator();
    }
  }, {
    key: "forEach",
    value: function forEach(callback, thisArg) {
      var _iterator = _createForOfIteratorHelper(this.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          callback && callback.call(thisArg, entry[1], entry[0], this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "indexOf",
    value: function indexOf(node) {
      for (var i = 0; i < this.length; i++) {
        if (this.item(i) === node) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "_at",
    value: function _at(index) {
      if (index < 0 || index >= this.length) {
        return null;
      }

      if (this._currentIndex < 0 || this._currentIndex >= this.length) {
        this._reset(index);
      } else {
        while (index < this._currentIndex) {
          this._previous();
        }

        while (index > this._currentIndex) {
          this._next();
        }
      }

      return this._currentNode;
    }
  }, {
    key: "_reset",
    value: function _reset(index) {
      var _a;

      this._length = -1;
      this._currentIndex = 0;

      switch (this._mode) {
        case ElementIndexer.MODE_ALL:
          this._currentNode = ((_a = this._parent._getLayout().firstChild()) === null || _a === void 0 ? void 0 : _a.element) || null;
          break;

        case ElementIndexer.MODE_NON_INTERNAL:
          this._currentNode = this._getFirstNonInternalNode();
          break;

        case ElementIndexer.MODE_ELEMENT_NON_INTERNAL:
          this._currentNode = this._getFirstNonInternalElement();
          break;

        default:
          break;
      }

      while (this._currentIndex < index && this._currentNode) {
        this._next();
      }
    }
  }, {
    key: "_getFirstNonInternalNode",
    value: function _getFirstNonInternalNode() {
      for (var child = this._parent._getLayout().firstChild(); child; child = child.nextSibling()) {
        if (!child.element._isInternal()) {
          return child.element;
        }
      }

      return null;
    }
  }, {
    key: "_getFirstNonInternalElement",
    value: function _getFirstNonInternalElement() {
      for (var child = this._parent._getLayout().firstChild(); child; child = child.nextSibling()) {
        if (!child.element._isInternal() && child.element.nodeType === _1.RMLNode.ELEMENT_NODE) {
          return child.element;
        }
      }

      return null;
    }
  }, {
    key: "_getLengthAll",
    value: function _getLengthAll() {
      return this._parent._getLayout().getNumChildren();
    }
  }, {
    key: "_getLengthNonInternalNode",
    value: function _getLengthNonInternalNode() {
      var length = 0;

      for (var child = this._parent._getLayout().firstChild(); child; child = child.nextSibling()) {
        if (!child.element._isInternal()) {
          length++;
        }
      }

      return length;
    }
  }, {
    key: "_getLengthNonInternalElement",
    value: function _getLengthNonInternalElement() {
      var length = 0;

      for (var child = this._parent._getLayout().firstChild(); child; child = child.nextSibling()) {
        if (!child.element._isInternal() && child.element.nodeType === _1.RMLNode.ELEMENT_NODE) {
          length++;
        }
      }

      return length;
    }
  }, {
    key: "_getLength",
    value: function _getLength() {
      if (this._domTag !== this._parent.gui.domTag) {
        this._domTag = this._parent.gui.domTag;

        this._reset(this._currentIndex);
      }

      if (this._length < 0) {
        switch (this._mode) {
          case ElementIndexer.MODE_ALL:
            this._length = this._getLengthAll();
            break;

          case ElementIndexer.MODE_NON_INTERNAL:
            this._length = this._getLengthNonInternalNode();
            break;

          case ElementIndexer.MODE_ELEMENT_NON_INTERNAL:
            this._length = this._getLengthNonInternalElement();
            break;
        }
      }

      return this._length;
    }
  }, {
    key: "_getKeysIterator",
    value: function _getKeysIterator() {
      var that = this;
      return (0, _defineProperty2.default)({}, Symbol.iterator, function () {
        return {
          lastIndex: -1,
          next: function next() {
            this.lastIndex++;

            if (that._domTag !== that._parent.gui.domTag) {
              that._domTag = that._parent.gui.domTag;

              that._reset(this.lastIndex);
            }

            if (this.lastIndex >= that.length) {
              this.lastIndex = -1;
              return {
                done: true,
                value: null
              };
            } else {
              return {
                done: false,
                value: this.lastIndex
              };
            }
          }
        };
      });
    }
  }, {
    key: "_getEntriesIterator",
    value: function _getEntriesIterator() {
      var that = this;
      return (0, _defineProperty2.default)({}, Symbol.iterator, function () {
        return {
          lastIndex: -1,
          next: function next() {
            this.lastIndex++;

            if (that._domTag !== that._parent.gui.domTag || that._currentIndex !== this.lastIndex) {
              that._domTag = that._parent.gui.domTag;

              that._reset(this.lastIndex);
            }

            if (!that._currentNode) {
              this.lastIndex = -1;
              return {
                done: true,
                value: null
              };
            } else {
              var ret = {
                done: false,
                value: [that._currentIndex, that._currentNode]
              };

              that._next();

              return ret;
            }
          }
        };
      });
    }
  }, {
    key: "_getValuesIterator",
    value: function _getValuesIterator() {
      var that = this;
      return (0, _defineProperty2.default)({}, Symbol.iterator, function () {
        return {
          lastIndex: -1,
          next: function next() {
            this.lastIndex++;

            if (that._domTag !== that._parent.gui.domTag || that._currentIndex !== this.lastIndex) {
              that._domTag = that._parent.gui.domTag;

              that._reset(this.lastIndex);
            }

            if (!that._currentNode) {
              this.lastIndex = -1;
              return {
                done: true,
                value: null
              };
            } else {
              var ret = {
                done: false,
                value: that._currentNode
              };

              that._next();

              return ret;
            }
          }
        };
      });
    }
  }, {
    key: "_next",
    value: function _next() {
      var _a, _b, _c, _d;

      if (this._currentNode) {
        switch (this._mode) {
          case ElementIndexer.MODE_ALL:
            {
              this._currentNode = ((_a = this._currentNode._getLayout().nextSibling()) === null || _a === void 0 ? void 0 : _a.element) || null;
              break;
            }

          case ElementIndexer.MODE_NON_INTERNAL:
            {
              do {
                this._currentNode = ((_b = this._currentNode._getLayout().nextSibling()) === null || _b === void 0 ? void 0 : _b.element) || null;
              } while ((_c = this._currentNode) === null || _c === void 0 ? void 0 : _c._isInternal());

              break;
            }

          case ElementIndexer.MODE_ELEMENT_NON_INTERNAL:
            {
              do {
                this._currentNode = ((_d = this._currentNode._getLayout().nextSibling()) === null || _d === void 0 ? void 0 : _d.element) || null;
              } while (this._currentNode && (this._currentNode._isInternal() || this._currentNode.nodeType !== _1.RMLNode.ELEMENT_NODE));

              break;
            }
        }

        this._currentIndex++;
      }
    }
  }, {
    key: "_previous",
    value: function _previous() {
      var _a, _b, _c, _d;

      if (this._currentNode) {
        switch (this._mode) {
          case ElementIndexer.MODE_ALL:
            {
              this._currentNode = ((_a = this._currentNode._getLayout().previousSibling()) === null || _a === void 0 ? void 0 : _a.element) || null;
              break;
            }

          case ElementIndexer.MODE_NON_INTERNAL:
            {
              do {
                this._currentNode = ((_b = this._currentNode._getLayout().previousSibling()) === null || _b === void 0 ? void 0 : _b.element) || null;
              } while ((_c = this._currentNode) === null || _c === void 0 ? void 0 : _c._isInternal());

              break;
            }

          case ElementIndexer.MODE_ELEMENT_NON_INTERNAL:
            {
              do {
                this._currentNode = ((_d = this._currentNode._getLayout().previousSibling()) === null || _d === void 0 ? void 0 : _d.element) || null;
              } while (this._currentNode && (this._currentNode._isInternal() || this._currentNode.nodeType !== _1.RMLNode.ELEMENT_NODE));

              break;
            }
        }

        this._currentIndex--;
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this._getLength();
    }
  }]);
  return ElementIndexer;
}();

ElementIndexer.MODE_ALL = 0;
ElementIndexer.MODE_NON_INTERNAL = 1;
ElementIndexer.MODE_ELEMENT_NON_INTERNAL = 2;

var RMLStaticNodeList = function () {
  function RMLStaticNodeList(nodelist) {
    (0, _classCallCheck2.default)(this, RMLStaticNodeList);
    this._nodelist = nodelist;
    var proxy = new Proxy(this, {
      get: function get(target, name) {
        if (typeof name === 'string' && /^\d+$/.test(name)) {
          return target._nodelist[parseInt(name)] || undefined;
        } else {
          return target[name];
        }
      },
      set: function set(target, name, value) {
        return false;
      }
    });
    return proxy;
  }

  (0, _createClass2.default)(RMLStaticNodeList, [{
    key: "item",
    value: function item(index) {
      return this._nodelist[index] || null;
    }
  }, {
    key: "entries",
    value: function entries() {
      var that = this;
      return (0, _defineProperty2.default)({}, Symbol.iterator, function () {
        return {
          lastIndex: -1,
          next: function next() {
            this.lastIndex++;

            if (this.lastIndex >= that.length) {
              this.lastIndex = -1;
              return {
                done: true,
                value: null
              };
            } else {
              return {
                done: false,
                value: [this.lastIndex, that.item(this.lastIndex)]
              };
            }
          }
        };
      });
    }
  }, {
    key: "keys",
    value: function keys() {
      var that = this;
      return (0, _defineProperty2.default)({}, Symbol.iterator, function () {
        return {
          lastIndex: -1,
          next: function next() {
            this.lastIndex++;

            if (this.lastIndex >= that.length) {
              this.lastIndex = -1;
              return {
                done: true,
                value: null
              };
            } else {
              return {
                done: false,
                value: this.lastIndex
              };
            }
          }
        };
      });
    }
  }, {
    key: "values",
    value: function values() {
      var that = this;
      return (0, _defineProperty2.default)({}, Symbol.iterator, function () {
        return {
          lastIndex: -1,
          next: function next() {
            this.lastIndex++;

            if (this.lastIndex >= that.length) {
              this.lastIndex = -1;
              return {
                done: true,
                value: null
              };
            } else {
              return {
                done: false,
                value: that.item(this.lastIndex)
              };
            }
          }
        };
      });
    }
  }, {
    key: "indexOf",
    value: function indexOf(node) {
      return this._nodelist.indexOf(node);
    }
  }, {
    key: "forEach",
    value: function forEach(callback, thisArg) {
      var that = this;

      if (callback) {
        for (var i = 0; i < this._nodelist.length; i++) {
          callback.call(thisArg, that._nodelist[i], i, that);
        }
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this._nodelist.length;
    }
  }]);
  return RMLStaticNodeList;
}();

exports.RMLStaticNodeList = RMLStaticNodeList;

var RMLLiveNodeList = function RMLLiveNodeList(parent, mode) {
  (0, _classCallCheck2.default)(this, RMLLiveNodeList);
  this._indexer = new ElementIndexer(parent, mode);
  var proxy = new Proxy(this, {
    get: function get(target, name) {
      if (typeof name === 'string' && /^\d+$/.test(name)) {
        return target._indexer.item(parseInt(name)) || undefined;
      } else {
        return target._indexer[name];
      }
    },
    set: function set(target, name, value) {
      if (typeof name === 'string' && /^\d+$/.test(name)) {
        return false;
      } else {
        target._indexer[name] = value;
        return true;
      }
    }
  });
  return proxy;
};

exports.RMLLiveNodeList = RMLLiveNodeList;
RMLLiveNodeList.MODE_ALL = ElementIndexer.MODE_ALL;
RMLLiveNodeList.MODE_NON_INTERNAL = ElementIndexer.MODE_NON_INTERNAL;
RMLLiveNodeList.MODE_ELEMENT_NON_INTERNAL = ElementIndexer.MODE_ELEMENT_NON_INTERNAL;

/***/ }),

/***/ "./primitive.ts":
/*!**********************!*\
  !*** ./primitive.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../node_modules/@babel/runtime/helpers/extends.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMLPrimitiveBatch = exports.RMLPrimitiveBatchList = exports.RMLRectPrimitive = exports.RMLPolygonPrimitive = exports.RMLPrimitive = void 0;

var RMLPrimitive = function RMLPrimitive() {
  (0, _classCallCheck2.default)(this, RMLPrimitive);
};

exports.RMLPrimitive = RMLPrimitive;

var RMLPolygonPrimitive = function (_RMLPrimitive) {
  (0, _inherits2.default)(RMLPolygonPrimitive, _RMLPrimitive);

  var _super = _createSuper(RMLPolygonPrimitive);

  function RMLPolygonPrimitive(vertices) {
    var _this;

    (0, _classCallCheck2.default)(this, RMLPolygonPrimitive);
    _this = _super.call(this);
    _this._vertices = vertices || [];
    return _this;
  }

  (0, _createClass2.default)(RMLPolygonPrimitive, [{
    key: "forEach",
    value: function forEach(callback, thisArg) {
      var indices = [];

      if (this._vertices.length > 2) {
        var numQuads = Math.ceil((this._vertices.length - 2) / 2);

        for (var i = 0; i < numQuads; i++) {
          indices.push(0);
          indices.push(i * 2 + 1);
          indices.push(i * 2 + 2);
          indices.push(Math.min(this._vertices.length - 1, i * 2 + 3));
        }
      }

      for (var _i = 0; _i < indices.length; _i++) {
        var v = this._vertices[indices[_i]];
        callback.call(thisArg, v.x, v.y, v.u || 0, v.v || 0);
      }
    }
  }, {
    key: "clipToRect",
    value: function clipToRect(x, y, w, h) {
      var _this2 = this;

      if (this._vertices.length < 3) {
        return null;
      }

      var pingpong = [[], []];
      var current = 0;
      pingpong[current] = (0, _toConsumableArray2.default)(this._vertices);
      var classify = [function (v) {
        return v.x >= x;
      }, function (v) {
        return v.x <= x + w;
      }, function (v) {
        return v.y >= y;
      }, function (v) {
        return v.y <= y + h;
      }];
      var intersect = [function (v1, v2) {
        return _this2._interpolateVertex(v1, v2, (x - v1.x) / (v2.x - v1.x));
      }, function (v1, v2) {
        return _this2._interpolateVertex(v1, v2, (x + w - v1.x) / (v2.x - v1.x));
      }, function (v1, v2) {
        return _this2._interpolateVertex(v1, v2, (y - v1.y) / (v2.y - v1.y));
      }, function (v1, v2) {
        return _this2._interpolateVertex(v1, v2, (y + h - v1.y) / (v2.y - v1.y));
      }];

      for (var pass = 0; pass < 4; pass++) {
        var fnClassify = classify[pass];
        var fnIntersect = intersect[pass];
        var src = pingpong[current];
        var dest = pingpong[1 - current];
        dest.length = 0;

        for (var i = 0; i < src.length; i++) {
          var j = (i + 1) % src.length;
          var firstIn = fnClassify(src[i]);
          var secondIn = fnClassify(src[j]);

          if (firstIn) {
            if (secondIn) {
              dest.push(src[j]);
            } else {
              dest.push(fnIntersect(src[i], src[j]));
            }
          } else if (secondIn) {
            dest.push(fnIntersect(src[i], src[j]), src[j]);
          }
        }

        current = 1 - current;
      }

      if (pingpong[current].length === 0) {
        return null;
      }

      var ret = new RMLPolygonPrimitive();
      ret.vertices = pingpong[current];
      return ret;
    }
  }, {
    key: "_interpolateVertex",
    value: function _interpolateVertex(v1, v2, factor) {
      var s1 = v1.u || 0;
      var t1 = v1.v || 0;
      var s2 = v2.u || 0;
      var t2 = v2.v || 0;
      return {
        x: Math.round(v1.x + (v2.x - v1.x) * factor),
        y: Math.round(v1.y + (v2.y - v1.y) * factor),
        u: s1 + (s2 - s1) * factor,
        v: t1 + (t2 - t1) * factor
      };
    }
  }, {
    key: "vertices",
    get: function get() {
      return this._vertices;
    },
    set: function set(v) {
      this._vertices = v || [];
    }
  }]);
  return RMLPolygonPrimitive;
}(RMLPrimitive);

exports.RMLPolygonPrimitive = RMLPolygonPrimitive;

var RMLRectPrimitive = function (_RMLPrimitive2) {
  (0, _inherits2.default)(RMLRectPrimitive, _RMLPrimitive2);

  var _super2 = _createSuper(RMLRectPrimitive);

  function RMLRectPrimitive(x, y, w, h, uMin, vMin, uMax, vMax) {
    var _this3;

    (0, _classCallCheck2.default)(this, RMLRectPrimitive);
    _this3 = _super2.call(this);
    _this3._x1 = x;
    _this3._y1 = y;
    _this3._x2 = x + w;
    _this3._y2 = y + h;
    _this3._u1 = uMin;
    _this3._v1 = vMin;
    _this3._u2 = uMax;
    _this3._v2 = vMax;
    return _this3;
  }

  (0, _createClass2.default)(RMLRectPrimitive, [{
    key: "forEach",
    value: function forEach(callback, thisArg) {
      var x = [this._x1, this._x2, this._x2, this._x1];
      var y = [this._y1, this._y1, this._y2, this._y2];
      var u = [this._u1, this._u2, this._u2, this._u1];
      var v = [this._v1, this._v1, this._v2, this._v2];

      for (var i = 0; i < 4; i++) {
        callback.call(thisArg, x[i], y[i], u[i], v[i]);
      }
    }
  }, {
    key: "clipToRect",
    value: function clipToRect(x, y, w, h) {
      var x1 = Math.max(x, this._x1);
      var y1 = Math.max(y, this._y1);
      var x2 = Math.min(x + w, this._x2);
      var y2 = Math.min(y + h, this._y2);

      if (x1 >= x2 || y1 >= y2) {
        return null;
      }

      var du = this._u2 - this._u1;
      var dv = this._v2 - this._v1;
      var dw = this._x2 - this._x1;
      var dh = this._y2 - this._y1;
      var u1 = this._u1 + du * (x1 - this._x1) / dw;
      var v1 = this._v1 + dv * (y1 - this._y1) / dh;
      var u2 = this._u2 - du * (this._x2 - x2) / dw;
      var v2 = this._v2 - dv * (this._y2 - y2) / dh;
      return new RMLRectPrimitive(x1, y1, x2 - x1, y2 - y1, u1, v1, u2, v2);
    }
  }]);
  return RMLRectPrimitive;
}(RMLPrimitive);

exports.RMLRectPrimitive = RMLRectPrimitive;

var RMLPrimitiveBatchList = function () {
  function RMLPrimitiveBatchList(x, y) {
    (0, _classCallCheck2.default)(this, RMLPrimitiveBatchList);
    this._absoluteX = x;
    this._absoluteY = y;
    this.clear();
  }

  (0, _createClass2.default)(RMLPrimitiveBatchList, [{
    key: "clear",
    value: function clear() {
      this._batchList = [];
      this._needUpdate = false;
    }
  }, {
    key: "getBatch",
    value: function getBatch(index) {
      var _a;

      return ((_a = this._batchList[index]) === null || _a === void 0 ? void 0 : _a.batch) || null;
    }
  }, {
    key: "getVertices",
    value: function getVertices(index) {
      var _a;

      if (this._needUpdate) {
        this._needUpdate = false;

        this._updateVertices();
      }

      return ((_a = this._batchList[index]) === null || _a === void 0 ? void 0 : _a.vertices) || null;
    }
  }, {
    key: "addBatch",
    value: function addBatch(batch) {
      if (batch) {
        var lastBatch = this._batchList[this._batchList.length - 1].batch || null;

        if (!lastBatch || lastBatch.texture !== batch.texture || lastBatch.color.x !== batch.color.x || lastBatch.color.y !== batch.color.y || lastBatch.color.z !== batch.color.z || lastBatch.color.w !== batch.color.w) {
          this._batchList.push({
            batch: batch,
            vertices: null
          });
        } else {
          for (var i = 0; i < batch.length; i++) {
            lastBatch.addPrimitive(batch.getPrimitive(i));
          }
        }

        this._needUpdate = true;
      }
    }
  }, {
    key: "addPrimitive",
    value: function addPrimitive(prim, clipper, tex, color) {
      var _a;

      if (prim && clipper) {
        tex = tex || null;
        color = color || {
          x: 1,
          y: 1,
          z: 1,
          w: 1
        };

        if (color.w > 0) {
          var lastBatch = ((_a = this._batchList[this._batchList.length - 1]) === null || _a === void 0 ? void 0 : _a.batch) || null;

          if (!lastBatch || lastBatch.texture !== tex || lastBatch.color.x !== color.x || lastBatch.color.y !== color.y || lastBatch.color.z !== color.z || lastBatch.color.w !== color.w || !lastBatch.isSameClipper(clipper)) {
            lastBatch = new RMLPrimitiveBatch(clipper);
            lastBatch.texture = tex;
            lastBatch.color = color;

            this._batchList.push({
              batch: lastBatch,
              vertices: null
            });
          }

          lastBatch.addPrimitive(prim);
          this._needUpdate = true;
        }
      }
    }
  }, {
    key: "_updateVertices",
    value: function _updateVertices() {
      var _this4 = this;

      var _iterator = _createForOfIteratorHelper(this._batchList),
          _step;

      try {
        var _loop = function _loop() {
          var batch = _step.value;
          var verts = [];

          var _loop2 = function _loop2(prim) {
            var primitive = batch.batch.getPrimitive(prim);
            var color = batch.batch.color;
            primitive.forEach(function (x, y, u, v) {
              verts.push(x + _this4._absoluteX, y + _this4._absoluteY, -50, color.x, color.y, color.z, color.w, u, v);
            });
          };

          for (var prim = 0; prim < batch.batch.length; prim++) {
            _loop2(prim);
          }

          batch.vertices = new Float32Array(verts);
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this._batchList.length;
    }
  }, {
    key: "x",
    get: function get() {
      return this._absoluteX;
    },
    set: function set(val) {
      if (this._absoluteX !== val) {
        this._absoluteX = val;
        this._needUpdate = true;
      }
    }
  }, {
    key: "y",
    get: function get() {
      return this._absoluteY;
    },
    set: function set(val) {
      if (this._absoluteY !== val) {
        this._absoluteY = val;
        this._needUpdate = true;
      }
    }
  }]);
  return RMLPrimitiveBatchList;
}();

exports.RMLPrimitiveBatchList = RMLPrimitiveBatchList;

var RMLPrimitiveBatch = function () {
  function RMLPrimitiveBatch(clipper) {
    (0, _classCallCheck2.default)(this, RMLPrimitiveBatch);

    if (!clipper) {
      throw new Error('Failed to construct RMLPrimitiveBatch: clipper must not be null');
    }

    this._clippedRect = clipper;
    this._tex = null;
    this._color = {
      x: 1,
      y: 1,
      z: 1,
      w: 1
    };
    this._primitives = [];
  }

  (0, _createClass2.default)(RMLPrimitiveBatch, [{
    key: "getPrimitive",
    value: function getPrimitive(index) {
      return this._primitives[index] || null;
    }
  }, {
    key: "addPrimitive",
    value: function addPrimitive(prim) {
      if (prim && this._primitives.indexOf(prim) < 0) {
        if (this._clippedRect) {
          prim = prim.clipToRect(this._clippedRect.x, this._clippedRect.y, this._clippedRect.width, this._clippedRect.height);
        }

        if (prim) {
          this._primitives.push(prim);
        }
      }
    }
  }, {
    key: "setClipper",
    value: function setClipper(rect) {
      this._clippedRect = rect ? (0, _extends2.default)({}, rect) : null;
    }
  }, {
    key: "isSameClipper",
    value: function isSameClipper(rc) {
      return rc.x !== this._clippedRect.x || rc.y !== this._clippedRect.y || rc.width !== this._clippedRect.width || rc.height !== this._clippedRect.height;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._primitives.length = 0;
    }
  }, {
    key: "texture",
    get: function get() {
      return this._tex;
    },
    set: function set(tex) {
      this._tex = tex;
    }
  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(clr) {
      clr = clr || {
        x: 1,
        y: 1,
        z: 1,
        w: 1
      };
      this._color.x = clr.x;
      this._color.y = clr.y;
      this._color.z = clr.z;
      this._color.w = clr.w;
    }
  }, {
    key: "length",
    get: function get() {
      return this._primitives.length;
    }
  }]);
  return RMLPrimitiveBatch;
}();

exports.RMLPrimitiveBatch = RMLPrimitiveBatch;

/***/ }),

/***/ "./renderer.ts":
/*!*********************!*\
  !*** ./renderer.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),

/***/ "./selector.ts":
/*!*********************!*\
  !*** ./selector.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RMLSelector = exports.Rule = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var misc_1 = __webpack_require__(/*! ./misc */ "./misc/index.ts");

var rIdentifier = /^([^\s\.\*\[\]\|\(\)\$\^\+#><~!=:]+)/;
var rOp = /^\s*(=|~=|\|=|\^=|\$=|\*=)?\s*/;
var rCombine = /^\s*([>|~|+]?)\s*/;
var rLiteral = /^"(.*)"|'(.*)'/;
var rCloseBracket = /^\s*\]/;
var rWS = /^\s*$/;
var Combine;

(function (Combine) {
  Combine[Combine["NONE"] = 0] = "NONE";
  Combine[Combine["DESCEND"] = 1] = "DESCEND";
  Combine[Combine["CHILD"] = 2] = "CHILD";
  Combine[Combine["SIBLING"] = 3] = "SIBLING";
  Combine[Combine["ADJACENT"] = 4] = "ADJACENT";
})(Combine || (Combine = {}));

var Op;

(function (Op) {
  Op[Op["ANY"] = 0] = "ANY";
  Op[Op["EQUAL"] = 1] = "EQUAL";
  Op[Op["CONTAINS"] = 2] = "CONTAINS";
  Op[Op["START"] = 3] = "START";
  Op[Op["END"] = 4] = "END";
})(Op || (Op = {}));

var Filter;

(function (Filter) {
  Filter[Filter["NONE"] = 0] = "NONE";
  Filter[Filter["TAGNAME"] = 1] = "TAGNAME";
  Filter[Filter["CLASS"] = 2] = "CLASS";
  Filter[Filter["ID"] = 3] = "ID";
  Filter[Filter["COMBINE"] = 4] = "COMBINE";
  Filter[Filter["ATTRIBUTE"] = 5] = "ATTRIBUTE";
  Filter[Filter["PSEUDO_CLASS"] = 6] = "PSEUDO_CLASS";
  Filter[Filter["PSEUDO_ELEMENT"] = 7] = "PSEUDO_ELEMENT";
})(Filter || (Filter = {}));

var Rule = function () {
  function Rule() {
    (0, _classCallCheck2.default)(this, Rule);
    this.filters = new misc_1.List();
    this.targets = new Set();
    this.specificity = 0;
  }

  (0, _createClass2.default)(Rule, [{
    key: "resolve",
    value: function resolve(roots, up, allowInternal, pseudoElementCallback) {
      var allElements = new Set();

      var _iterator = _createForOfIteratorHelper(roots),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var root = _step.value;

          this._traverseElement(root, allowInternal, function (el) {
            allElements.add(el);
          });

          if (up) {
            var p = root.parentNode;

            while (p) {
              if (allowInternal || p.nodeType === _1.RMLNode.ELEMENT_NODE) {
                allElements.add(p);
              }

              p = p.parentNode;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.targets = new Set(allElements);

      for (var it = this.filters.begin(); it.valid(); it.next()) {
        if (it.data.type != Filter.COMBINE) {
          var tmp = new Set();

          var _iterator2 = _createForOfIteratorHelper(this.targets),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var el = _step2.value;

              this._walkWithFilter(it, el, tmp, allowInternal, allElements, pseudoElementCallback);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          this.targets = tmp;
        }
      }
    }
  }, {
    key: "_traverseElement",
    value: function _traverseElement(element, allowInternal, cb) {
      if (allowInternal || !element._isInternal()) {
        if (allowInternal || element.nodeType === _1.RMLNode.ELEMENT_NODE) {
          cb(element);
        }

        var _iterator3 = _createForOfIteratorHelper(element._getChildren()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var child = _step3.value;

            this._traverseElement(child, allowInternal, cb);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  }, {
    key: "_check",
    value: function _check(filter, element) {
      var _a;

      switch (filter.type) {
        case Filter.TAGNAME:
          return element.nodeType === _1.RMLNode.ELEMENT_NODE && element.tagName === filter.name;

        case Filter.CLASS:
          return element.nodeType === _1.RMLNode.ELEMENT_NODE && element.classList.contains(filter.name);

        case Filter.ID:
          return element.nodeType === _1.RMLNode.ELEMENT_NODE && element.id === filter.name;

        case Filter.ATTRIBUTE:
          {
            if (element.nodeType === _1.RMLNode.ELEMENT_NODE) {
              var val = element.getAttribute(filter.attribKey);

              switch (filter.attribOp) {
                case Op.ANY:
                  return val !== undefined;

                case Op.CONTAINS:
                  return typeof val === 'string' && val.indexOf(filter.attribValue) >= 0;

                case Op.EQUAL:
                  return val === filter.attribValue;

                case Op.START:
                  return typeof val === 'string' && val.indexOf(filter.attribValue) === 0;

                case Op.END:
                  return typeof val === 'string' && val.length >= filter.attribValue.length && val.substr(-filter.attribValue.length) === filter.attribValue;

                default:
                  return false;
              }
            } else {
              return false;
            }
          }

        case Filter.PSEUDO_CLASS:
          {
            switch (filter.name) {
              case 'hover':
                return element._isHover();

              case 'active':
                return element._isActive();

              case 'disabled':
                return !element.enabled;

              case 'empty':
                return element.childNodes.length === 0;

              case 'enabled':
                return element.enabled;

              case 'first-child':
                return !element.previousSibling;

              case 'last-child':
                return !element.nextSibling;

              case 'only-child':
                return !element.previousSibling && !element.nextSibling;

              case 'focus':
                return element.gui.getFocus() === element;

              case 'focus-within':
                return !!((_a = element.gui.getFocus()) === null || _a === void 0 ? void 0 : _a._isSucceedingOf(element));

              default:
                return false;
            }
          }

        case Filter.NONE:
          return true;

        default:
          return false;
      }
    }
  }, {
    key: "_walkWithFilter",
    value: function _walkWithFilter(filter, last, targets, allowInternal, elementSet, pseudoElementCallback) {
      var _this = this;

      var prevIt = filter.getPrev();
      var lastFilter = prevIt.valid() ? prevIt.data : null;

      switch (filter.data.type) {
        case Filter.NONE:
        case Filter.TAGNAME:
        case Filter.CLASS:
        case Filter.ID:
        case Filter.PSEUDO_CLASS:
        case Filter.ATTRIBUTE:
          {
            if (lastFilter === null || lastFilter.type !== Filter.COMBINE) {
              if (this._check(filter.data, last)) {
                targets.add(last);
              }
            } else if (lastFilter) {
              switch (lastFilter.combineType) {
                case Combine.CHILD:
                  {
                    var _iterator4 = _createForOfIteratorHelper(last._getChildren()),
                        _step4;

                    try {
                      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                        var child = _step4.value;

                        if (child.nodeType === _1.RMLNode.ELEMENT_NODE && elementSet.has(child) && this._check(filter.data, child)) {
                          targets.add(child);
                        }
                      }
                    } catch (err) {
                      _iterator4.e(err);
                    } finally {
                      _iterator4.f();
                    }

                    break;
                  }

                case Combine.DESCEND:
                  {
                    var _iterator5 = _createForOfIteratorHelper(last._getChildren()),
                        _step5;

                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var _child = _step5.value;

                        if (_child.nodeType === _1.RMLNode.ELEMENT_NODE) {
                          this._traverseElement(_child, allowInternal, function (el) {
                            if (elementSet.has(el) && _this._check(filter.data, el)) {
                              targets.add(el);
                            }
                          });
                        }
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }

                    break;
                  }

                case Combine.SIBLING:
                  {
                    var next = last.nextSibling;

                    while (next) {
                      if (next.nodeType === _1.RMLNode.ELEMENT_NODE && elementSet.has(next) && this._check(filter.data, next)) {
                        targets.add(next);
                      }

                      next = next.nextSibling;
                    }

                    break;
                  }

                case Combine.ADJACENT:
                  {
                    var _next = last.nextSibling;

                    if (_next && _next.nodeType === _1.RMLNode.ELEMENT_NODE && elementSet.has(_next) && this._check(filter.data, _next)) {
                      targets.add(_next);
                    }

                    break;
                  }
              }
            }

            break;
          }

        case Filter.PSEUDO_ELEMENT:
          {
            if (pseudoElementCallback && lastFilter && lastFilter.type !== Filter.COMBINE && !filter.getNext().valid()) {
              pseudoElementCallback(last, filter.data.name);
            }

            break;
          }
      }
    }
  }]);
  return Rule;
}();

exports.Rule = Rule;

var RMLSelector = function () {
  function RMLSelector(s) {
    (0, _classCallCheck2.default)(this, RMLSelector);
    this._rules = s ? this._createRules(s) : [];

    var _iterator6 = _createForOfIteratorHelper(this._rules),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var rule = _step6.value;

        if (!this._validateRule(rule)) {
          this._rules = [];
          break;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }

  (0, _createClass2.default)(RMLSelector, [{
    key: "resolve",
    value: function resolve(root, excludeRoot, allowInternal) {
      if (this._rules.length === 0) {
        return [];
      }

      var matched = new Set();

      var _iterator7 = _createForOfIteratorHelper(this._rules),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var rule = _step7.value;
          rule.resolve([root], false, allowInternal);

          var _iterator8 = _createForOfIteratorHelper(rule.targets),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var val = _step8.value;
              matched.add(val);
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      if (excludeRoot) {
        matched.delete(root);
      }

      return Array.from(matched);
    }
  }, {
    key: "multiResolve",
    value: function multiResolve(roots, allowInternal) {
      if (this._rules.length === 0) {
        return [];
      }

      var matched = new Set();

      var _iterator9 = _createForOfIteratorHelper(this._rules),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var rule = _step9.value;
          rule.resolve(roots, true, allowInternal);

          var _iterator10 = _createForOfIteratorHelper(rule.targets),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var val = _step10.value;
              matched.add(val);
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return Array.from(matched);
    }
  }, {
    key: "rules",
    value: function rules() {
      return this._rules;
    }
  }, {
    key: "_validateRule",
    value: function _validateRule(rule) {
      for (var it = rule.filters.begin(); it.valid(); it.next()) {
        var prev = it.getPrev();

        if (it.data.type === Filter.COMBINE && prev.valid() && prev.data.type === Filter.COMBINE) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_createRules",
    value: function _createRules(s) {
      var _this2 = this;

      return s.trim().split(',').map(function (val) {
        return val.trim();
      }).filter(function (val) {
        return val !== '';
      }).map(function (val) {
        return _this2._createRule(val);
      }).filter(function (val) {
        return !!val;
      }).sort(function (a, b) {
        return a.specificity - b.specificity;
      });
    }
  }, {
    key: "_createRule",
    value: function _createRule(s) {
      var rule = new Rule();
      var numIds = 0;
      var numClasses = 0;
      var numTypes = 0;

      while (true) {
        var filter = this._createFilter(s);

        if (filter === null) {
          return null;
        } else if (filter[0] === null) {
          break;
        } else {
          rule.filters.append(filter[0]);
          s = filter[1];
          numIds += filter[0].numIds;
          numClasses += filter[0].numClasses;
          numTypes += filter[0].numTypes;
        }
      }

      var base = 100;
      rule.specificity = numIds * base * base + numClasses * base + numTypes;
      return rule;
    }
  }, {
    key: "_createFilter",
    value: function _createFilter(s) {
      if (rWS.exec(s)) {
        return [null, ''];
      }

      var info = {
        numIds: 0,
        numClasses: 0,
        numTypes: 0
      };
      var combine = rCombine.exec(s);

      if (combine && combine[0] === '') {
        combine = null;
      }

      if (!combine) {
        info.combineType = Combine.NONE;
        s = s.trim();

        switch (s[0]) {
          case '*':
            {
              info.type = Filter.NONE;
              s = s.substr(1);
              break;
            }

          case '.':
            {
              info.numClasses++;
              info.type = Filter.CLASS;
              s = s.substr(1);
              var match = rIdentifier.exec(s);

              if (!match) {
                return null;
              }

              info.name = match[1];
              s = s.substr(match[0].length);
              break;
            }

          case '#':
            {
              info.numIds++;
              info.type = Filter.ID;
              s = s.substr(1);

              var _match = rIdentifier.exec(s);

              if (!_match) {
                return null;
              }

              info.name = _match[1];
              s = s.substr(_match[0].length);
              break;
            }

          case ':':
            {
              info.numClasses++;

              if (s[1] !== ':') {
                info.type = Filter.PSEUDO_CLASS;
                s = s.substr(1);

                var _match2 = rIdentifier.exec(s);

                if (!_match2) {
                  return null;
                }

                info.name = _match2[1];
                s = s.substr(_match2[0].length);
              } else {
                info.type = Filter.PSEUDO_ELEMENT;
                s = s.substr(2);

                var _match3 = rIdentifier.exec(s);

                if (!_match3) {
                  return null;
                }

                info.name = _match3[1];
                s = s.substr(_match3[0].length);
              }

              break;
            }

          case '[':
            {
              info.numClasses++;
              info.type = Filter.ATTRIBUTE;
              s = s.substr(1);
              var matchKey = rIdentifier.exec(s);

              if (!matchKey) {
                return null;
              }

              info.attribKey = matchKey[1];
              s = s.substr(matchKey[0].length);
              var matchOp = rOp.exec(s);

              if (!matchOp) {
                return null;
              }

              switch (matchOp[1]) {
                case '=':
                  info.attribOp = Op.EQUAL;
                  break;

                case '~=':
                case '*=':
                  info.attribOp = Op.CONTAINS;
                  break;

                case '|=':
                case '^=':
                  info.attribOp = Op.START;
                  break;

                case '$=':
                  info.attribOp = Op.END;
                  break;

                default:
                  info.attribOp = Op.ANY;
                  break;
              }

              s = s.substr(matchOp[0].length);

              if (info.attribOp !== Op.ANY) {
                var matchValue = (s[0] === '\'' || s[0] === '\"' ? rLiteral : rIdentifier).exec(s);

                if (!matchValue) {
                  return null;
                }

                info.attribValue = matchValue[1] || matchValue[2];
                s = s.substr(matchValue[0].length);
              }

              var matchCloseBracket = rCloseBracket.exec(s);

              if (!matchCloseBracket) {
                return null;
              }

              s = s.substr(matchCloseBracket[0].length);
              break;
            }

          default:
            {
              info.numTypes++;
              info.type = Filter.TAGNAME;

              var _match4 = rIdentifier.exec(s);

              if (!_match4) {
                return null;
              }

              info.name = _match4[1];
              s = s.substr(_match4[0].length);
              break;
            }
        }
      } else {
        s = s.substr(combine[0].length);
        info.type = Filter.COMBINE;

        if (combine[1] === '') {
          info.combineType = Combine.DESCEND;
        } else if (combine[1] === '>') {
          info.combineType = Combine.CHILD;
        } else if (combine[1] === '~') {
          info.combineType = Combine.SIBLING;
        } else {
          info.combineType = Combine.ADJACENT;
        }
      }

      return [info, s];
    }
  }]);
  return RMLSelector;
}();

exports.RMLSelector = RMLSelector;

/***/ }),

/***/ "./style.ts":
/*!******************!*\
  !*** ./style.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementStyle = exports.unescapeCSSString = exports._normalizeCSSValue = exports.serializeStyleSheet = exports.parseStyleSheet = void 0;

var Yoga = __webpack_require__(/*! ./typeflex/api */ "./typeflex/api.ts");

var colorNames = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
  transparent: 'rgba(0,0,0,0)'
};
var overflowConstantMap = {
  'hidden': 'hidden',
  'auto': 'auto',
  'scroll': 'scroll',
  'visible': 'visible'
};
var alignmentConstantMap = {
  'auto': Yoga.ALIGN_AUTO,
  'flex-start': Yoga.ALIGN_FLEX_START,
  'flex-end': Yoga.ALIGN_FLEX_END,
  'center': Yoga.ALIGN_CENTER,
  'stretch': Yoga.ALIGN_STRETCH,
  'baseline': Yoga.ALIGN_BASELINE,
  'space-between': Yoga.ALIGN_SPACE_BETWEEN,
  'space-around': Yoga.ALIGN_SPACE_AROUND
};
var directionConstantMap = {
  'row': Yoga.FLEX_DIRECTION_ROW,
  'row-reverse': Yoga.FLEX_DIRECTION_ROW_REVERSE,
  'column': Yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': Yoga.FLEX_DIRECTION_COLUMN_REVERSE
};
var justifyConstantMap = {
  'flex-start': Yoga.JUSTIFY_FLEX_START,
  'center': Yoga.JUSTIFY_CENTER,
  'flex-end': Yoga.JUSTIFY_FLEX_END,
  'space-between': Yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': Yoga.JUSTIFY_SPACE_AROUND,
  'space-evenly': Yoga.JUSTIFY_SPACE_EVENLY
};
var wrapConstantMap = {
  'wrap': Yoga.WRAP_WRAP,
  'nowrap': Yoga.WRAP_NO_WRAP,
  'wrap-reverse': Yoga.WRAP_WRAP_REVERSE
};
var positionConstantMap = {
  'fixed': Yoga.POSITION_TYPE_ABSOLUTE,
  'relative': Yoga.POSITION_TYPE_RELATIVE,
  'absolute': Yoga.POSITION_TYPE_ABSOLUTE
};
var displayConstantMap = {
  'flex': Yoga.DISPLAY_FLEX,
  'none': Yoga.DISPLAY_NONE
};

function parseStyleSheet(styles, extra) {
  var items = styles.split(';').map(function (val) {
    return val.trim();
  }).filter(function (val) {
    return !!val;
  });
  var ss = {};

  var _iterator = _createForOfIteratorHelper(items),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var kv = item.split(':').map(function (val) {
        return val.trim();
      });

      if (kv.length === 2) {
        var setter = styleSetters[kv[0]];

        if (setter) {
          var k = kv[0].split('-').map(function (val, index) {
            return index === 0 ? val : val[0].toUpperCase() + val.substr(1);
          }).join('');
          ss[k] = kv[1];
        } else if (extra) {
          extra[kv[0]] = kv[1];
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return ss;
}

exports.parseStyleSheet = parseStyleSheet;

function serializeStyleSheet(styles) {
  var s = '';

  for (var k in styles) {
    if (styles[k]) {
      var kk = k.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ').map(function (s) {
        return s.toLowerCase();
      }).join('-');
      s = s + "".concat(kk, ":").concat(styles[k], ";");
    }
  }

  return s;
}

exports.serializeStyleSheet = serializeStyleSheet;

function _normalizeCSSValue2(value) {
  function _fetch(value, pos) {
    function _issep(ch) {
      return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';
    }

    var start, end;
    var quot = null;

    for (start = pos; start < value.length && _issep(value[start]); start++) {
      ;
    }

    if (start === value.length) {
      return ['', value.length];
    }

    if (value[start] === ',') {
      return [',', start + 1];
    }

    if (value[start] === '\'' || value[start] === '"') {
      quot = value[start];
    }

    if (quot === null) {
      for (end = start + 1; end < value.length && !_issep(value[end]) && value[end] !== ','; end++) {
        ;
      }

      return [value.substring(start, end), end];
    } else {
      var backslash = false;

      for (end = start + 1; end < value.length; end++) {
        if (!backslash && value[end] === quot) {
          quot = null;
          end++;
          break;
        }

        if (backslash) {
          backslash = false;
        } else if (value[end] === '\\') {
          backslash = true;
        }
      }

      if (quot !== null) {
        return null;
      }

      if (backslash) {
        end--;
      }

      return [value.substring(start, end), end];
    }
  }

  var ret = [];
  var pos = 0;
  var last = -1;

  for (;;) {
    var t = _fetch(value, pos);

    if (t === null) {
      return null;
    }

    if (t[0] === '') {
      break;
    }

    if (t[0] === ',') {
      if (ret.length === 0) {
        return null;
      }

      last = ret.length - 1;
      ret[last] = ret[last] + ',';
      pos = t[1];
    } else {
      if (last >= 0) {
        ret[last] = ret[last] + t[0];
        last = -1;
      } else {
        ret.push(t[0]);
      }

      pos = t[1];
    }
  }

  return ret;
}

exports._normalizeCSSValue = _normalizeCSSValue2;

function _unescapeCSSString(input) {
  function isHexCharCode(ch) {
    var cc0 = 0x30;
    var cc9 = 0x39;
    var cca = 0x61;
    var ccf = 0x66;
    var ccA = 0x41;
    var ccF = 0x46;
    return ch >= cc0 && ch <= cc9 || ch >= cca && ch <= ccf || ch >= ccA && ch <= ccF;
  }

  var output = '';
  var readoffset = 0;
  var inputoffset = 0;

  for (var i = 0; i < input.length; i++) {
    var ch = input[i];

    if (ch !== '\\' || i === input.length - 1) {
      continue;
    }

    var codepoint = -1;

    if (ch === '\\') {
      var next = input[i + 1];

      switch (next) {
        case '\n':
          codepoint = -2;
          inputoffset = i + 1;
          break;

        case ' ':
        case '!':
        case '"':
        case '\'':
        case '#':
        case '$':
        case '%':
        case '&':
        case '\\':
        case '(':
        case ')':
        case '*':
        case '+':
        case ',':
        case '-':
        case '.':
        case '/':
        case ':':
        case '<':
        case '=':
        case '>':
        case '?':
        case '@':
        case '[':
        case ']':
        case '^':
        case '_':
        case '`':
        case '{':
        case '|':
        case '}':
        case '~':
          codepoint = next.charCodeAt(0);
          inputoffset = i + 1;
          break;
      }

      if (codepoint === -1) {
        var cc = next.charCodeAt(0);

        if (isHexCharCode(cc)) {
          var f = i + 2;

          while (f < i + 7 && f < input.length) {
            var cf = input.charCodeAt(f);

            if (!isHexCharCode(cf)) {
              break;
            }

            f++;
          }

          codepoint = parseInt(input.substring(i + 1, f), 16);
          inputoffset = f - 1;

          if (f < input.length && input[f] === ' ') {
            inputoffset++;
          }
        } else if (next === '\r' || next === '\f') {
          i++;
          continue;
        } else {
          codepoint = next.charCodeAt(0);
          inputoffset = i + 1;
        }
      }
    }

    if (i - readoffset > 0) {
      output = output + input.substring(readoffset, i);
    }

    i = inputoffset;
    readoffset = i + 1;

    if (codepoint !== -2) {
      output = output + String.fromCharCode(codepoint);
    }
  }

  if (input.length > readoffset) {
    output = output + input.substring(readoffset);
  }

  return output;
}

exports.unescapeCSSString = _unescapeCSSString;

var ElementStyle = function () {
  function ElementStyle(layout) {
    (0, _classCallCheck2.default)(this, ElementStyle);
    this._layout = layout;
    this._setNonInline = false;
    this._stylesheetInline = {};
    this._stylesheet = {};
  }

  (0, _createClass2.default)(ElementStyle, [{
    key: "reset",
    value: function reset() {
      this._setNonInline = true;

      for (var k in this._stylesheet) {
        this[k] = '';
      }

      this._stylesheet = {};
      this._setNonInline = false;
    }
  }, {
    key: "unescapeCSSString",
    value: function unescapeCSSString(s) {
      return _unescapeCSSString(s);
    }
  }, {
    key: "_syncValue",
    value: function _syncValue(k, val) {
      if (val === '') {
        delete this._stylesheet[k];

        if (!this._setNonInline) {
          delete this._stylesheetInline[k];
        }
      } else {
        this._stylesheet[k] = val;

        if (!this._setNonInline) {
          this._stylesheetInline[k] = val;
        }
      }

      if (!this._setNonInline) {
        this._layout.updateStyle(serializeStyleSheet(this._stylesheetInline));
      }
    }
  }, {
    key: "_syncValues",
    value: function _syncValues(values) {
      for (var k in values) {
        var val = values[k];
        val ? this._stylesheet[k] = val : delete this._stylesheet[k];

        if (!this._setNonInline) {
          val ? this._stylesheetInline[k] = val : delete this._stylesheetInline[k];

          this._layout.updateStyle(serializeStyleSheet(this._stylesheetInline));
        }
      }
    }
  }, {
    key: "setOverflow",
    value: function setOverflow(val) {
      var values = ElementStyle._normalizeCSSValue(val);

      if (values) {
        if (values.length === 1) {
          this.setOverflowX(values[0]);
          this.setOverflowY(values[0]);
        } else if (values.length === 2) {
          this.setOverflowX(values[0]);
          this.setOverflowY(values[1]);
        }
      }
    }
  }, {
    key: "setOverflowX",
    value: function setOverflowX(val) {
      if (val !== this._stylesheet.overflowX && (val === '' || overflowConstantMap[val])) {
        this._syncValue('overflowX', val);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setOverflowY",
    value: function setOverflowY(val) {
      if (val !== this._stylesheet.overflowY && (val === '' || overflowConstantMap[val])) {
        this._syncValue('overflowY', val);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "getBorderLeft",
    value: function getBorderLeft() {
      return this._layout.node.getBorder(Yoga.EDGE_LEFT) || 0;
    }
  }, {
    key: "getBorderTop",
    value: function getBorderTop() {
      return this._layout.node.getBorder(Yoga.EDGE_TOP) || 0;
    }
  }, {
    key: "getBorderRight",
    value: function getBorderRight() {
      return this._layout.node.getBorder(Yoga.EDGE_RIGHT) || 0;
    }
  }, {
    key: "getBorderBottom",
    value: function getBorderBottom() {
      return this._layout.node.getBorder(Yoga.EDGE_BOTTOM) || 0;
    }
  }, {
    key: "getPaddingLeft",
    value: function getPaddingLeft() {
      return this._layout.node.getPadding(Yoga.EDGE_LEFT).value || 0;
    }
  }, {
    key: "getPaddingTop",
    value: function getPaddingTop() {
      return this._layout.node.getPadding(Yoga.EDGE_TOP).value || 0;
    }
  }, {
    key: "getPaddingRight",
    value: function getPaddingRight() {
      return this._layout.node.getPadding(Yoga.EDGE_RIGHT).value || 0;
    }
  }, {
    key: "getPaddingBottom",
    value: function getPaddingBottom() {
      return this._layout.node.getPadding(Yoga.EDGE_BOTTOM).value || 0;
    }
  }, {
    key: "_checkStringConstant",
    value: function _checkStringConstant(k, v, defaultValue, constantMap) {
      if (v !== this[k] && (v === '' || constantMap[v] !== undefined)) {
        var val = v === '' ? defaultValue : constantMap[v];

        this._syncValue(k, v);

        return val;
      }
    }
  }, {
    key: "setDisplay",
    value: function setDisplay(val) {
      var v = this._checkStringConstant('display', val, Yoga.DISPLAY_FLEX, displayConstantMap);

      if (v !== undefined) {
        this._layout.node.setDisplay(v);

        this._layout.updateDisplay(val);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setPositionType",
    value: function setPositionType(val) {
      var v = this._checkStringConstant('position', val, Yoga.POSITION_TYPE_RELATIVE, positionConstantMap);

      if (v !== undefined) {
        this._layout.node.setPositionType(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "_setPosition",
    value: function _setPosition(edge, k, v) {
      var position = v === '' ? 0 : this.parsePosition(v);

      if (v !== '') {
        v = typeof position === 'number' ? "".concat(position, "px") : position;
      }

      if (v !== undefined && v !== this[k]) {
        this._syncValue(k, v);

        this._layout.node.setPosition(edge, position);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setLeft",
    value: function setLeft(val) {
      this._setPosition(Yoga.EDGE_LEFT, 'left', val);
    }
  }, {
    key: "setTop",
    value: function setTop(val) {
      this._setPosition(Yoga.EDGE_TOP, 'top', val);
    }
  }, {
    key: "setRight",
    value: function setRight(val) {
      this._setPosition(Yoga.EDGE_RIGHT, 'right', val);
    }
  }, {
    key: "setBottom",
    value: function setBottom(val) {
      this._setPosition(Yoga.EDGE_BOTTOM, 'bottom', val);
    }
  }, {
    key: "setWidth",
    value: function setWidth(val) {
      var w = val === '' ? 'auto' : this.parseLengthOrAuto(val);
      val = typeof w === 'number' ? "".concat(w, "px") : w;

      if (val !== undefined && val !== this.width) {
        this._syncValue('width', val);

        this._layout.node.setWidth(w);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setMinWidth",
    value: function setMinWidth(val) {
      var w = val === '' ? undefined : this.parseLength(val);
      val = typeof w === 'number' ? "".concat(w, "px") : w;

      if (val !== this.minWidth) {
        this._syncValue('minWidth', val);

        this._layout.node.setMinWidth(w);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setMaxWidth",
    value: function setMaxWidth(val) {
      var w = val === '' ? undefined : this.parseLength(val);
      val = typeof w === 'number' ? "".concat(w, "px") : w;

      if (val !== this.maxWidth) {
        this._syncValue('maxWidth', val);

        this._layout.node.setMaxWidth(w);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setHeight",
    value: function setHeight(val) {
      var h = val === '' ? 'auto' : this.parseLengthOrAuto(val);
      val = typeof h === 'number' ? "".concat(h, "px") : h;

      if (val !== undefined && val !== this.height) {
        this._syncValue('height', val);

        this._layout.node.setHeight(h);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setMinHeight",
    value: function setMinHeight(val) {
      var h = val === '' ? undefined : this.parseLength(val);
      val = typeof h === 'number' ? "".concat(h, "px") : h;

      if (val !== this.minHeight) {
        this._syncValue('minHeight', val);

        this._layout.node.setMinHeight(h);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setMaxHeight",
    value: function setMaxHeight(val) {
      var h = val === '' ? undefined : this.parseLength(val);
      val = typeof h === 'number' ? "".concat(h, "px") : h;

      if (val !== this.maxHeight) {
        this._syncValue('maxHeight', val);

        this._layout.node.setMaxHeight(h);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlexDirection",
    value: function setFlexDirection(val) {
      var v = this._checkStringConstant('flexDirection', val, Yoga.FLEX_DIRECTION_ROW, directionConstantMap);

      if (v !== undefined) {
        this._layout.node.setFlexDirection(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlexWrap",
    value: function setFlexWrap(val) {
      var v = this._checkStringConstant('flexWrap', val, Yoga.WRAP_NO_WRAP, wrapConstantMap);

      if (v !== undefined) {
        this._layout.node.setFlexWrap(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlexFlow",
    value: function setFlexFlow(val) {
      if (val !== this.flexFlow) {
        if (val === '') {
          this.setFlexDirection('');
          this.setFlexWrap('');
        } else {
          var invalid = false;
          var direction = '';
          var wrap = '';
          var tuples = val.trim().split(/\s+/);

          if (tuples.length < 3) {
            for (var i = 0; i < tuples.length; i++) {
              if (direction === '') {
                if (directionConstantMap[tuples[i]] !== undefined) {
                  direction = tuples[i];
                  continue;
                }
              }

              if (wrap === '') {
                if (wrapConstantMap[tuples[i]] !== undefined) {
                  wrap = tuples[i];
                  continue;
                }
              }

              invalid = true;
              break;
            }

            if (!invalid) {
              this.setFlexDirection(direction);
              this.setFlexWrap(wrap);
            }
          }
        }
      }
    }
  }, {
    key: "setAlignItems",
    value: function setAlignItems(val) {
      var v = this._checkStringConstant('alignItems', val, Yoga.ALIGN_STRETCH, alignmentConstantMap);

      if (v !== undefined) {
        this._layout.node.setAlignItems(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setAlignContent",
    value: function setAlignContent(val) {
      var v = this._checkStringConstant('alignContent', val, Yoga.ALIGN_FLEX_START, alignmentConstantMap);

      if (v !== undefined) {
        this._layout.node.setAlignContent(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setAlignSelf",
    value: function setAlignSelf(val) {
      var v = this._checkStringConstant('alignSelf', val, Yoga.ALIGN_AUTO, alignmentConstantMap);

      if (v !== undefined) {
        this._layout.node.setAlignSelf(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setJustifyContent",
    value: function setJustifyContent(val) {
      var v = this._checkStringConstant('justifyContent', val, Yoga.JUSTIFY_FLEX_START, justifyConstantMap);

      if (v !== undefined) {
        this._layout.node.setJustifyContent(v);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlexGrow",
    value: function setFlexGrow(val) {
      var grow = val === '' ? undefined : this.parseGrowOrShrink(val);

      if (val !== '' && typeof grow === 'number') {
        val = String(grow);
      }

      if ((val === '' || grow !== undefined) && val !== this.flexGrow) {
        this._syncValue('flexGrow', val);

        this._layout.node.setFlexGrow(grow);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlexShrink",
    value: function setFlexShrink(val) {
      var shrink = val === '' ? undefined : this.parseGrowOrShrink(val);

      if (val !== '' && typeof shrink === 'number') {
        val = String(shrink);
      }

      if ((val === '' || shrink !== undefined) && val !== this.flexShrink) {
        this._syncValue('flexShrink', val);

        this._layout.node.setFlexShrink(shrink);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlexBasis",
    value: function setFlexBasis(val) {
      var basis = val === '' ? 'auto' : this.parseLengthOrAuto(val);
      val = typeof basis === 'number' ? "".concat(basis, "px") : basis;

      if (val !== undefined && val !== this.flexBasis) {
        this._syncValue('flexBasis', val);

        this._layout.node.setFlexBasis(basis);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "setFlex",
    value: function setFlex(val) {
      if (val !== this.flex || val === '' && (this.flexGrow || this.flexShrink || this.flexBasis)) {
        if (val === '') {
          this.setFlexGrow('');
          this.setFlexShrink('');
          this.setFlexBasis('');
        } else {
          var invalid = false;
          var values = [];
          var tuples = String(val).trim().split(/\s+/);

          if (tuples.length < 4) {
            for (var i = 0; i < tuples.length; i++) {
              var _val = i < 2 ? this.parseGrowOrShrink(tuples[i]) : this.parseLengthOrAuto(tuples[i]);

              if (_val === undefined) {
                invalid = true;
                break;
              }

              values.push(tuples[i]);
            }

            if (!invalid) {
              if (values.length > 0) {
                this.setFlexGrow(values[0]);
              } else {
                this.setFlexGrow('');
                this.setFlexShrink('');
                this.setFlexBasis('');
              }

              if (values.length > 1) {
                this.setFlexShrink(values[1]);
              } else {
                this.setFlexShrink('');
                this.setFlexBasis('');
              }

              if (values.length > 2) {
                this.setFlexBasis(values[2]);
              } else {
                this.setFlexBasis('');
              }

              this._layout.invalidateLayout();
            }
          }
        }
      }
    }
  }, {
    key: "setMarginLeft",
    value: function setMarginLeft(val) {
      this._setMargin(Yoga.EDGE_LEFT, 'marginLeft', val);
    }
  }, {
    key: "setMarginTop",
    value: function setMarginTop(val) {
      this._setMargin(Yoga.EDGE_TOP, 'marginTop', val);
    }
  }, {
    key: "setMarginRight",
    value: function setMarginRight(val) {
      this._setMargin(Yoga.EDGE_RIGHT, 'marginRight', val);
    }
  }, {
    key: "setMarginBottom",
    value: function setMarginBottom(val) {
      this._setMargin(Yoga.EDGE_BOTTOM, 'marginBottom', val);
    }
  }, {
    key: "setMargin",
    value: function setMargin(val) {
      if (val !== this.margin || val === '' && (this.marginLeft || this.marginTop || this.marginRight || this.marginBottom)) {
        if (val === '') {
          this.setMarginLeft('');
          this.setMarginTop('');
          this.setMarginRight('');
          this.setMarginBottom('');
        } else {
          var invalid = false;
          var values = [];
          var tuples = val.trim().split(/\s+/);

          if (tuples.length < 5) {
            for (var i = 0; i < tuples.length; i++) {
              var margin = this.parseMargin(tuples[i]);

              if (margin === undefined) {
                invalid = true;
                break;
              }

              values.push(tuples[i]);
            }

            if (!invalid) {
              switch (values.length) {
                case 1:
                  this.setMarginTop(values[0]);
                  this.setMarginRight(values[0]);
                  this.setMarginBottom(values[0]);
                  this.setMarginLeft(values[0]);
                  break;

                case 2:
                  this.setMarginTop(values[0]);
                  this.setMarginRight(values[1]);
                  this.setMarginBottom(values[0]);
                  this.setMarginLeft(values[1]);
                  break;

                case 3:
                  this.setMarginTop(values[0]);
                  this.setMarginRight(values[1]);
                  this.setMarginBottom(values[2]);
                  this.setMarginLeft(values[1]);
                  break;

                case 4:
                  this.setMarginTop(values[0]);
                  this.setMarginRight(values[1]);
                  this.setMarginBottom(values[2]);
                  this.setMarginLeft(values[3]);
                  break;
              }

              this._layout.invalidateLayout();
            }
          }
        }
      }
    }
  }, {
    key: "setBorderLeftColor",
    value: function setBorderLeftColor(val) {
      this._setBorderColor(Yoga.EDGE_LEFT, 'borderLeftColor', val);
    }
  }, {
    key: "setBorderTopColor",
    value: function setBorderTopColor(val) {
      this._setBorderColor(Yoga.EDGE_TOP, 'borderTopColor', val);
    }
  }, {
    key: "setBorderRightColor",
    value: function setBorderRightColor(val) {
      this._setBorderColor(Yoga.EDGE_RIGHT, 'borderRightColor', val);
    }
  }, {
    key: "setBorderBottomColor",
    value: function setBorderBottomColor(val) {
      this._setBorderColor(Yoga.EDGE_BOTTOM, 'borderBottomColor', val);
    }
  }, {
    key: "setBorderColor",
    value: function setBorderColor(val) {
      if (val !== this.borderColor || val === '' && (this.borderLeftColor || this.borderTopColor || this.borderRightColor || this.borderBottomColor)) {
        if (val === '') {
          this.setBorderLeftColor('');
          this.setBorderTopColor('');
          this.setBorderRightColor('');
          this.setBorderBottomColor('');
        } else {
          var invalid = false;
          var values = [];
          var tuples = val.trim().split(/\s+/);

          if (tuples.length < 5) {
            for (var i = 0; i < tuples.length; i++) {
              var color = this.parseColor(tuples[i]);

              if (color === undefined) {
                invalid = true;
                break;
              }

              values.push(tuples[i]);
            }

            if (!invalid) {
              switch (values.length) {
                case 1:
                  this.setBorderTopColor(values[0]);
                  this.setBorderRightColor(values[0]);
                  this.setBorderBottomColor(values[0]);
                  this.setBorderLeftColor(values[0]);
                  break;

                case 2:
                  this.setBorderTopColor(values[0]);
                  this.setBorderRightColor(values[1]);
                  this.setBorderBottomColor(values[0]);
                  this.setBorderLeftColor(values[1]);
                  break;

                case 3:
                  this.setBorderTopColor(values[0]);
                  this.setBorderRightColor(values[1]);
                  this.setBorderBottomColor(values[2]);
                  this.setBorderLeftColor(values[1]);
                  break;

                case 4:
                  this.setBorderTopColor(values[0]);
                  this.setBorderRightColor(values[1]);
                  this.setBorderBottomColor(values[2]);
                  this.setBorderLeftColor(values[3]);
                  break;
              }

              this._layout.invalidateLayout();
            }
          }
        }
      }
    }
  }, {
    key: "setBorderLeftWidth",
    value: function setBorderLeftWidth(val) {
      this._setBorderWidth(Yoga.EDGE_LEFT, 'borderLeftWidth', val);
    }
  }, {
    key: "setBorderTopWidth",
    value: function setBorderTopWidth(val) {
      this._setBorderWidth(Yoga.EDGE_TOP, 'borderTopWidth', val);
    }
  }, {
    key: "setBorderRightWidth",
    value: function setBorderRightWidth(val) {
      this._setBorderWidth(Yoga.EDGE_RIGHT, 'borderRightWidth', val);
    }
  }, {
    key: "setBorderBottomWidth",
    value: function setBorderBottomWidth(val) {
      this._setBorderWidth(Yoga.EDGE_BOTTOM, 'borderBottomWidth', val);
    }
  }, {
    key: "setBorderWidth",
    value: function setBorderWidth(val) {
      if (val !== this.borderWidth || val === '' && (this.borderLeftWidth || this.borderTopWidth || this.borderRightWidth || this.borderBottomWidth)) {
        if (val === '') {
          this.setBorderLeftWidth('');
          this.setBorderTopWidth('');
          this.setBorderRightWidth('');
          this.setBorderBottomWidth('');
        } else {
          var invalid = false;
          var values = [];
          var tuples = val.trim().split(/\s+/);

          if (tuples.length < 5) {
            for (var i = 0; i < tuples.length; i++) {
              var border = this.parseFixedNonNegative(tuples[i]);

              if (border === undefined) {
                invalid = true;
                break;
              }

              values.push(tuples[i]);
            }

            if (!invalid) {
              switch (values.length) {
                case 1:
                  this.setBorderTopWidth(values[0]);
                  this.setBorderRightWidth(values[0]);
                  this.setBorderBottomWidth(values[0]);
                  this.setBorderLeftWidth(values[0]);
                  break;

                case 2:
                  this.setBorderTopWidth(values[0]);
                  this.setBorderRightWidth(values[1]);
                  this.setBorderBottomWidth(values[0]);
                  this.setBorderLeftWidth(values[1]);
                  break;

                case 3:
                  this.setBorderTopWidth(values[0]);
                  this.setBorderRightWidth(values[1]);
                  this.setBorderBottomWidth(values[2]);
                  this.setBorderLeftWidth(values[1]);
                  break;

                case 4:
                  this.setBorderTopWidth(values[0]);
                  this.setBorderRightWidth(values[1]);
                  this.setBorderBottomWidth(values[2]);
                  this.setBorderLeftWidth(values[3]);
                  break;
              }

              this._layout.invalidateLayout();
            }
          }
        }
      }
    }
  }, {
    key: "setPaddingLeft",
    value: function setPaddingLeft(val) {
      this._setPadding(Yoga.EDGE_LEFT, 'paddingLeft', val);
    }
  }, {
    key: "setPaddingTop",
    value: function setPaddingTop(val) {
      this._setPadding(Yoga.EDGE_TOP, 'paddingTop', val);
    }
  }, {
    key: "setPaddingRight",
    value: function setPaddingRight(val) {
      this._setPadding(Yoga.EDGE_RIGHT, 'paddingRight', val);
    }
  }, {
    key: "setPaddingBottom",
    value: function setPaddingBottom(val) {
      this._setPadding(Yoga.EDGE_BOTTOM, 'paddingBottom', val);
    }
  }, {
    key: "setPadding",
    value: function setPadding(val) {
      if (val !== this.padding || val === '' && (this.paddingLeft || this.paddingTop || this.paddingRight || this.paddingBottom)) {
        if (val === '') {
          this.setPaddingLeft('');
          this.setPaddingTop('');
          this.setPaddingBottom('');
          this.setPaddingRight('');
        } else {
          var invalid = false;
          var values = [];
          var tuples = val.trim().split(/\s+/);

          if (tuples.length < 5) {
            for (var i = 0; i < tuples.length; i++) {
              var padding = this.parseFixedNonNegative(tuples[i]);

              if (padding === undefined) {
                invalid = true;
                break;
              }

              values.push(tuples[i]);
            }

            if (!invalid) {
              switch (values.length) {
                case 1:
                  this.setPaddingTop(values[0]);
                  this.setPaddingRight(values[0]);
                  this.setPaddingBottom(values[0]);
                  this.setPaddingLeft(values[0]);
                  break;

                case 2:
                  this.setPaddingTop(values[0]);
                  this.setPaddingRight(values[1]);
                  this.setPaddingBottom(values[0]);
                  this.setPaddingLeft(values[1]);
                  break;

                case 3:
                  this.setPaddingTop(values[0]);
                  this.setPaddingRight(values[1]);
                  this.setPaddingBottom(values[2]);
                  this.setPaddingLeft(values[1]);
                  break;

                case 4:
                  this.setPaddingTop(values[0]);
                  this.setPaddingRight(values[1]);
                  this.setPaddingBottom(values[2]);
                  this.setPaddingLeft(values[3]);
                  break;
              }

              this._layout.invalidateLayout();
            }
          }
        }
      }
    }
  }, {
    key: "setZIndex",
    value: function setZIndex(val) {
      var z = val === '' ? 0 : Number(val);

      if (!Number.isNaN(z)) {
        val = String(z);
      }

      if (!Number.isNaN(z) && val !== this.zIndex) {
        this._syncValue('zIndex', val);

        this._layout.updateZIndex();
      }
    }
  }, {
    key: "setCursor",
    value: function setCursor(val) {
      val = val || 'default';

      if (this._stylesheet.cursor !== val) {
        this._syncValue('cursor', val);

        this._layout.updateCursor(val);
      }
    }
  }, {
    key: "setBackgroundColor",
    value: function setBackgroundColor(val) {
      if (this._stylesheet.backgroundColor !== val) {
        var color = val !== '' ? this.parseColor(val) : ElementStyle.defaultBackgroundColor;

        if (color) {
          this._syncValue('backgroundColor', val);

          this._layout.updateBackgroundColor(color);
        }
      }
    }
  }, {
    key: "setBackgroundImage",
    value: function setBackgroundImage(val) {
      if (this._stylesheet.backgroundImage !== val) {
        this._syncValue('backgroundImage', val);
      }
    }
  }, {
    key: "setFontSize",
    value: function setFontSize(val) {
      var size = val === '' ? undefined : this.parseFixedNonNegative(val);

      if (size !== undefined) {
        val = typeof size === 'number' ? "".concat(size, "px") : val;
      }

      if (val !== this.fontSize) {
        this._syncValue('fontSize', val);

        this._layout.updateFontSize(val);
      }
    }
  }, {
    key: "setFontFamily",
    value: function setFontFamily(val) {
      if (val !== this.fontFamily) {
        this._syncValue('fontFamily', val);

        this._layout.updateFontFamily(val);
      }
    }
  }, {
    key: "setFont",
    value: function setFont(val) {
      if (val === '') {
        this.setFontSize('');
        this.setFontFamily('');
      } else {
        var fontParts = _normalizeCSSValue2(val);

        if (fontParts.length > 1) {
          var fontSize = fontParts[fontParts.length - 2];
          var fontFamily = fontParts[fontParts.length - 1];
          this.setFontSize(fontSize);
          this.setFontFamily(fontFamily);
        }
      }
    }
  }, {
    key: "setFontColor",
    value: function setFontColor(val) {
      if (this._stylesheet.color !== val) {
        this._syncValue('color', val);

        this._layout.updateFontColor(val);
      }
    }
  }, {
    key: "applyStyles",
    value: function applyStyles(styles, inline) {
      this._setNonInline = !inline;
      var items = styles.split(';').map(function (val) {
        return val.trim();
      }).filter(function (val) {
        return !!val;
      });

      var _iterator2 = _createForOfIteratorHelper(items),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          var kv = item.split(':').map(function (val) {
            return val.trim();
          });

          if (kv.length === 2) {
            var setter = styleSetters[kv[0]];
            setter && setter.call(this, kv[1]);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this._setNonInline = false;
    }
  }, {
    key: "applyStyleSheet",
    value: function applyStyleSheet(stylesheet, inline) {
      this._setNonInline = !inline;

      for (var k in stylesheet) {
        var v = stylesheet[k];

        if (v) {
          this[k] = v;
        }
      }

      this._setNonInline = false;
    }
  }, {
    key: "parseColor",
    value: function parseColor(input) {
      input = input.trim().toLowerCase();
      input = colorNames[input] || input;

      if (input.substr(0, 1) == '#') {
        var collen = (input.length - 1) / 3;
        var fact = [17, 1, 0.062272][collen - 1];
        var v = {
          x: parseInt(input.substr(1, collen), 16) * fact / 255,
          y: parseInt(input.substr(1 + collen, collen), 16) * fact / 255,
          z: parseInt(input.substr(1 + 2 * collen, collen), 16) * fact / 255,
          w: 1
        };
        return Number.isNaN(v.x) || Number.isNaN(v.y) || Number.isNaN(v.z) || Number.isNaN(v.w) ? null : v;
      } else {
        var _v = null;
        var m;

        if (m = input.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i)) {
          _v = {
            x: Number(m[1]) / 255,
            y: Number(m[2]) / 255,
            z: Number(m[3]) / 255,
            w: 1
          };
        } else if (m = input.match(/^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i)) {
          _v = {
            x: Number(m[1]) / 255,
            y: Number(m[2]) / 255,
            z: Number(m[3]) / 255,
            w: Number(m[4]) / 255
          };
        }

        return !_v || Number.isNaN(_v.x) || Number.isNaN(_v.y) || Number.isNaN(_v.z) || Number.isNaN(_v.w) ? null : _v;
      }
    }
  }, {
    key: "parseGrowOrShrink",
    value: function parseGrowOrShrink(s) {
      var val = Number(s);

      if (!Number.isNaN(val) && val >= 0) {
        return val;
      }
    }
  }, {
    key: "parseLengthOrAuto",
    value: function parseLengthOrAuto(s) {
      if (s === 'auto') {
        return s;
      } else {
        return this.parseLength(s);
      }
    }
  }, {
    key: "parseFixed",
    value: function parseFixed(s) {
      if (s.length > 2 && s.substr(s.length - 2, 2) === 'px') {
        s = s.substr(0, s.length - 2);
      }

      var pixels = Number(s);

      if (!Number.isNaN(pixels)) {
        return pixels;
      }
    }
  }, {
    key: "parseFixedNonNegative",
    value: function parseFixedNonNegative(s) {
      var pixels = this.parseFixed(s);

      if (pixels !== undefined && pixels >= 0) {
        return pixels;
      }
    }
  }, {
    key: "parseLength",
    value: function parseLength(s) {
      if (s[s.length - 1] === '%') {
        var percent = Number(s.substr(0, s.length - 1));

        if (!Number.isNaN(percent) && percent >= 0) {
          return s;
        }
      } else {
        var pixels = this.parseFixed(s);

        if (pixels >= 0) {
          return pixels;
        }
      }
    }
  }, {
    key: "parsePosition",
    value: function parsePosition(s) {
      if (s[s.length - 1] === '%') {
        var percent = Number(s.substr(0, s.length - 1));

        if (!Number.isNaN(percent) && percent >= 0) {
          return s;
        }
      } else {
        return this.parseFixed(s);
      }
    }
  }, {
    key: "parseMargin",
    value: function parseMargin(s) {
      if (s === 'auto') {
        return s;
      } else {
        return this.parsePosition(s);
      }
    }
  }, {
    key: "_setPadding",
    value: function _setPadding(edge, k, v) {
      var padding = v === '' ? undefined : this.parseFixedNonNegative(v);

      if (padding !== undefined) {
        v = typeof padding === 'number' ? "".concat(padding, "px") : padding;
      }

      if ((v === '' || padding !== undefined) && v !== this[k]) {
        this._syncValue(k, v);

        this._layout.node.setPadding(edge, padding);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "_setMargin",
    value: function _setMargin(edge, k, v) {
      var margin = v === '' ? undefined : this.parseMargin(v);

      if (margin !== undefined) {
        v = typeof margin === 'number' ? "".concat(margin, "px") : margin;
      }

      if ((v === '' || margin !== undefined) && v !== this[k]) {
        this._syncValue(k, v);

        this._layout.node.setMargin(edge, margin);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "_setBorderColor",
    value: function _setBorderColor(edge, k, v) {
      if (this._stylesheet[k] !== v) {
        var color = v !== '' ? this.parseColor(v) : ElementStyle.defaultBorderColor;

        if (color) {
          this._syncValue(k, v);

          this._layout.updateBorderColor(edge, color);
        }
      }
    }
  }, {
    key: "_setBorderWidth",
    value: function _setBorderWidth(edge, k, v) {
      var border = v === '' ? undefined : this.parseFixedNonNegative(v);

      if (border !== undefined) {
        v = typeof border === 'number' ? "".concat(border, "px") : border;
      }

      if ((v === '' || border !== undefined) && v !== this[k]) {
        this._syncValue(k, v);

        this._layout.node.setBorder(edge, border);

        this._layout.invalidateLayout();
      }
    }
  }, {
    key: "display",
    get: function get() {
      return this._stylesheet.display || '';
    },
    set: function set(val) {
      this.setDisplay(val || '');
    }
  }, {
    key: "position",
    get: function get() {
      return this._stylesheet.position || '';
    },
    set: function set(val) {
      this.setPositionType(val || '');
    }
  }, {
    key: "overflow",
    get: function get() {
      if (!this._stylesheet.overflowX || !this._stylesheet.overflowY) {
        return '';
      } else if (this._stylesheet.overflowX === this._stylesheet.overflowY) {
        return this._stylesheet.overflowX;
      } else {
        return "".concat(this._stylesheet.overflowX, " ").concat(this._stylesheet.overflowY);
      }
    },
    set: function set(val) {
      this.setOverflow(val || '');
    }
  }, {
    key: "overflowX",
    get: function get() {
      return this._stylesheet.overflowX || '';
    },
    set: function set(val) {
      this.setOverflowX(val || '');
    }
  }, {
    key: "overflowY",
    get: function get() {
      return this._stylesheet.overflowY || '';
    },
    set: function set(val) {
      this.setOverflowY(val || '');
    }
  }, {
    key: "left",
    get: function get() {
      return this._stylesheet.left || '';
    },
    set: function set(val) {
      this.setLeft(val === null ? '' : String(val));
    }
  }, {
    key: "top",
    get: function get() {
      return this._stylesheet.top || '';
    },
    set: function set(val) {
      this.setTop(val === null ? '' : String(val));
    }
  }, {
    key: "right",
    get: function get() {
      return this._stylesheet.right || '';
    },
    set: function set(val) {
      this.setRight(val === null ? '' : String(val));
    }
  }, {
    key: "bottom",
    get: function get() {
      return this._stylesheet.bottom || '';
    },
    set: function set(val) {
      this.setBottom(val === null ? '' : String(val));
    }
  }, {
    key: "width",
    get: function get() {
      return this._stylesheet.width || '';
    },
    set: function set(val) {
      this.setWidth(val === null ? '' : String(val));
    }
  }, {
    key: "minWidth",
    get: function get() {
      return this._stylesheet.minWidth || '';
    },
    set: function set(val) {
      this.setMinWidth(val === null ? '' : String(val));
    }
  }, {
    key: "maxWidth",
    get: function get() {
      return this._stylesheet.maxWidth || '';
    },
    set: function set(val) {
      this.setMaxWidth(val === null ? '' : String(val));
    }
  }, {
    key: "height",
    get: function get() {
      return this._stylesheet.height || '';
    },
    set: function set(val) {
      this.setHeight(val === null ? '' : String(val));
    }
  }, {
    key: "minHeight",
    get: function get() {
      return this._stylesheet.minHeight || '';
    },
    set: function set(val) {
      this.setMinHeight(val === null ? '' : String(val));
    }
  }, {
    key: "maxHeight",
    get: function get() {
      return this._stylesheet.maxHeight || '';
    },
    set: function set(val) {
      this.setMaxHeight(val === null ? '' : String(val));
    }
  }, {
    key: "flexDirection",
    get: function get() {
      return this._stylesheet.flexDirection || '';
    },
    set: function set(val) {
      this.setFlexDirection(val || '');
    }
  }, {
    key: "flexWrap",
    get: function get() {
      return this._stylesheet.flexWrap || '';
    },
    set: function set(val) {
      this.setFlexWrap(val || '');
    }
  }, {
    key: "flexFlow",
    get: function get() {
      var grow = this.flexGrow;
      var wrap = this.flexWrap;

      if (grow && wrap) {
        return "".concat(grow, " ").concat(wrap);
      } else {
        return '';
      }
    },
    set: function set(val) {
      this.setFlexFlow(val === null ? '' : String(val));
    }
  }, {
    key: "alignItems",
    get: function get() {
      return this._stylesheet.alignItems || '';
    },
    set: function set(val) {
      this.setAlignItems(val || '');
    }
  }, {
    key: "alignContent",
    get: function get() {
      return this._stylesheet.alignContent || '';
    },
    set: function set(val) {
      this.setAlignContent(val || '');
    }
  }, {
    key: "alignSelf",
    get: function get() {
      return this._stylesheet.alignSelf || '';
    },
    set: function set(val) {
      this.setAlignSelf(val || '');
    }
  }, {
    key: "justifyContent",
    get: function get() {
      return this._stylesheet.justifyContent || '';
    },
    set: function set(val) {
      this.setJustifyContent(val || '');
    }
  }, {
    key: "flexGrow",
    get: function get() {
      return this._stylesheet.flexGrow || '';
    },
    set: function set(val) {
      this.setFlexGrow(val === null ? '' : String(val));
    }
  }, {
    key: "flexShrink",
    get: function get() {
      return this._stylesheet.flexShrink || '';
    },
    set: function set(val) {
      this.setFlexShrink(val === null ? '' : String(val));
    }
  }, {
    key: "flexBasis",
    get: function get() {
      return this._stylesheet.flexBasis || '';
    },
    set: function set(val) {
      this.setFlexBasis(val === null ? '' : String(val));
    }
  }, {
    key: "flex",
    get: function get() {
      var grow = this.flexGrow;
      var shrink = this.flexShrink;
      var basis = this.flexBasis;

      if (grow && shrink && basis) {
        return "".concat(grow, " ").concat(shrink, " ").concat(basis);
      } else {
        return '';
      }
    },
    set: function set(val) {
      this.setFlex(val === null ? '' : String(val));
    }
  }, {
    key: "borderColor",
    get: function get() {
      var top = this.borderTopColor;
      var right = this.borderRightColor;
      var bottom = this.borderBottomColor;
      var left = this.borderLeftColor;

      if (!top || !right || !bottom || !left) {
        return '';
      } else if (top === bottom && right === left) {
        if (top === right) {
          return top;
        } else {
          return "".concat(top, " ").concat(right);
        }
      } else if (right === left) {
        return "".concat(top, " ").concat(right, " ").concat(bottom);
      } else {
        return "".concat(top, " ").concat(right, " ").concat(bottom, " ").concat(left);
      }
    },
    set: function set(val) {
      this.setBorderColor(val === null ? '' : String(val));
    }
  }, {
    key: "borderLeftColor",
    get: function get() {
      return this._stylesheet.borderLeftColor || '';
    },
    set: function set(val) {
      this.setBorderLeftColor(val === null ? '' : String(val));
    }
  }, {
    key: "borderTopColor",
    get: function get() {
      return this._stylesheet.borderTopColor || '';
    },
    set: function set(val) {
      this.setBorderTopColor(val === null ? '' : String(val));
    }
  }, {
    key: "borderRightColor",
    get: function get() {
      return this._stylesheet.borderRightColor || '';
    },
    set: function set(val) {
      this.setBorderRightColor(val === null ? '' : String(val));
    }
  }, {
    key: "borderBottomColor",
    get: function get() {
      return this._stylesheet.borderBottomColor || '';
    },
    set: function set(val) {
      this.setBorderBottomColor(val === null ? '' : String(val));
    }
  }, {
    key: "borderWidth",
    get: function get() {
      var top = this.borderTopWidth;
      var right = this.borderRightWidth;
      var bottom = this.borderBottomWidth;
      var left = this.borderLeftWidth;

      if (!top || !right || !bottom || !left) {
        return '';
      } else if (top === bottom && right === left) {
        if (top === right) {
          return top;
        } else {
          return "".concat(top, " ").concat(right);
        }
      } else if (right === left) {
        return "".concat(top, " ").concat(right, " ").concat(bottom);
      } else {
        return "".concat(top, " ").concat(right, " ").concat(bottom, " ").concat(left);
      }
    },
    set: function set(val) {
      this.setBorderWidth(val === null ? '' : String(val));
    }
  }, {
    key: "borderLeftWidth",
    get: function get() {
      return this._stylesheet.borderLeftWidth || '';
    },
    set: function set(val) {
      this.setBorderLeftWidth(val === null ? '' : String(val));
    }
  }, {
    key: "borderTopWidth",
    get: function get() {
      return this._stylesheet.borderTopWidth || '';
    },
    set: function set(val) {
      this.setBorderTopWidth(val === null ? '' : String(val));
    }
  }, {
    key: "borderRightWidth",
    get: function get() {
      return this._stylesheet.borderRightWidth || '';
    },
    set: function set(val) {
      this.setBorderRightWidth(val === null ? '' : String(val));
    }
  }, {
    key: "borderBottomWidth",
    get: function get() {
      return this._stylesheet.borderBottomWidth || '';
    },
    set: function set(val) {
      this.setBorderBottomWidth(val === null ? '' : String(val));
    }
  }, {
    key: "margin",
    get: function get() {
      var top = this.marginTop;
      var right = this.marginRight;
      var bottom = this.marginBottom;
      var left = this.marginLeft;

      if (!top || !right || !bottom || !left) {
        return '';
      } else if (top === bottom && right === left) {
        if (top === right) {
          return top;
        } else {
          return "".concat(top, " ").concat(right);
        }
      } else if (right === left) {
        return "".concat(top, " ").concat(right, " ").concat(bottom);
      } else {
        return "".concat(top, " ").concat(right, " ").concat(bottom, " ").concat(left);
      }
    },
    set: function set(val) {
      this.setMargin(val === null ? '' : String(val));
    }
  }, {
    key: "marginLeft",
    get: function get() {
      return this._stylesheet.marginLeft || '';
    },
    set: function set(val) {
      this.setMarginLeft(val === null ? '' : String(val));
    }
  }, {
    key: "marginTop",
    get: function get() {
      return this._stylesheet.marginTop || '';
    },
    set: function set(val) {
      this.setMarginTop(val === null ? '' : String(val));
    }
  }, {
    key: "marginRight",
    get: function get() {
      return this._stylesheet.marginRight || '';
    },
    set: function set(val) {
      this.setMarginRight(val === null ? '' : String(val));
    }
  }, {
    key: "marginBottom",
    get: function get() {
      return this._stylesheet.marginBottom || '';
    },
    set: function set(val) {
      this.setMarginBottom(val === null ? '' : String(val));
    }
  }, {
    key: "padding",
    get: function get() {
      var top = this.paddingTop;
      var right = this.paddingRight;
      var bottom = this.paddingBottom;
      var left = this.paddingLeft;

      if (!top || !right || !bottom || !left) {
        return '';
      } else if (top === bottom && right === left) {
        if (top === right) {
          return top;
        } else {
          return "".concat(top, " ").concat(right);
        }
      } else if (right === left) {
        return "".concat(top, " ").concat(right, " ").concat(bottom);
      } else {
        return "".concat(top, " ").concat(right, " ").concat(bottom, " ").concat(left);
      }
    },
    set: function set(val) {
      this.setPadding(val === null ? '' : String(val));
    }
  }, {
    key: "paddingLeft",
    get: function get() {
      return this._stylesheet.paddingLeft || '';
    },
    set: function set(val) {
      this.setPaddingLeft(val === null ? '' : String(val));
    }
  }, {
    key: "paddingTop",
    get: function get() {
      return this._stylesheet.paddingTop || '';
    },
    set: function set(val) {
      this.setPaddingTop(val === null ? '' : String(val));
    }
  }, {
    key: "paddingRight",
    get: function get() {
      return this._stylesheet.paddingRight || '';
    },
    set: function set(val) {
      this.setPaddingRight(val === null ? '' : String(val));
    }
  }, {
    key: "paddingBottom",
    get: function get() {
      return this._stylesheet.paddingBottom || '';
    },
    set: function set(val) {
      this.setPaddingBottom(val === null ? '' : String(val));
    }
  }, {
    key: "zIndex",
    get: function get() {
      return this._stylesheet.zIndex || '';
    },
    set: function set(val) {
      this.setZIndex(val === null ? '' : String(val));
    }
  }, {
    key: "cursor",
    get: function get() {
      return this._stylesheet.cursor || '';
    },
    set: function set(val) {
      this.setCursor(val || '');
    }
  }, {
    key: "backgroundColor",
    get: function get() {
      return this._stylesheet.backgroundColor || '';
    },
    set: function set(val) {
      this.setBackgroundColor(val || '');
    }
  }, {
    key: "backgroundImage",
    get: function get() {
      return this._stylesheet.backgroundImage || '';
    },
    set: function set(val) {
      this.setBackgroundImage(val || '');
    }
  }, {
    key: "font",
    get: function get() {
      var fontSize = this.fontSize;
      var fontFamily = this.fontFamily;
      return fontSize && fontFamily ? "".concat(fontSize, " ").concat(fontFamily) : '';
    },
    set: function set(val) {
      this.setFont(val || '');
    }
  }, {
    key: "fontSize",
    get: function get() {
      return this._stylesheet.fontSize || '';
    },
    set: function set(val) {
      this.setFontSize(val);
    }
  }, {
    key: "fontFamily",
    get: function get() {
      return this._stylesheet.fontFamily || '';
    },
    set: function set(val) {
      this.setFontFamily(val);
    }
  }, {
    key: "color",
    get: function get() {
      return this._stylesheet.color || '';
    },
    set: function set(val) {
      this.setFontColor(val || '');
    }
  }], [{
    key: "_normalizeCSSValue",
    value: function _normalizeCSSValue(value) {
      return _normalizeCSSValue2(value);
    }
  }, {
    key: "defaultBackgroundColor",
    get: function get() {
      return {
        x: 0,
        y: 0,
        z: 0,
        w: 0
      };
    }
  }, {
    key: "defaultBorderColor",
    get: function get() {
      return {
        x: 0,
        y: 0,
        z: 0,
        w: 1
      };
    }
  }, {
    key: "defaultFontColor",
    get: function get() {
      return {
        x: 0,
        y: 0,
        z: 0,
        w: 1
      };
    }
  }]);
  return ElementStyle;
}();

exports.ElementStyle = ElementStyle;
var styleSetters = {
  'border-color': ElementStyle.prototype.setBorderColor,
  'border-left-color': ElementStyle.prototype.setBorderLeftColor,
  'border-top-color': ElementStyle.prototype.setBorderTopColor,
  'border-right-color': ElementStyle.prototype.setBorderRightColor,
  'border-bottom-color': ElementStyle.prototype.setBorderBottomColor,
  'border-width': ElementStyle.prototype.setBorderWidth,
  'border-left-width': ElementStyle.prototype.setBorderLeftWidth,
  'border-top-width': ElementStyle.prototype.setBorderTopWidth,
  'border-right-width': ElementStyle.prototype.setBorderRightWidth,
  'border-bottom-width': ElementStyle.prototype.setBorderBottomWidth,
  'margin': ElementStyle.prototype.setMargin,
  'margin-left': ElementStyle.prototype.setMarginLeft,
  'margin-top': ElementStyle.prototype.setMarginTop,
  'margin-right': ElementStyle.prototype.setMarginRight,
  'margin-bottom': ElementStyle.prototype.setMarginBottom,
  'padding': ElementStyle.prototype.setPadding,
  'padding-left': ElementStyle.prototype.setPaddingLeft,
  'padding-right': ElementStyle.prototype.setPaddingRight,
  'padding-top': ElementStyle.prototype.setPaddingTop,
  'padding-bottom': ElementStyle.prototype.setPaddingBottom,
  'position': ElementStyle.prototype.setPositionType,
  'overflow': ElementStyle.prototype.setOverflow,
  'overflow-x': ElementStyle.prototype.setOverflowX,
  'overflow-y': ElementStyle.prototype.setOverflowY,
  'display': ElementStyle.prototype.setDisplay,
  'left': ElementStyle.prototype.setLeft,
  'top': ElementStyle.prototype.setTop,
  'right': ElementStyle.prototype.setRight,
  'bottom': ElementStyle.prototype.setBottom,
  'width': ElementStyle.prototype.setWidth,
  'height': ElementStyle.prototype.setHeight,
  'min-width': ElementStyle.prototype.setMinWidth,
  'max-width': ElementStyle.prototype.setMaxWidth,
  'min-height': ElementStyle.prototype.setMinHeight,
  'max-height': ElementStyle.prototype.setMaxHeight,
  'flex-flow': ElementStyle.prototype.setFlexFlow,
  'flex-direction': ElementStyle.prototype.setFlexDirection,
  'flex-wrap': ElementStyle.prototype.setFlexWrap,
  'align-content': ElementStyle.prototype.setAlignContent,
  'align-items': ElementStyle.prototype.setAlignItems,
  'align-self': ElementStyle.prototype.setAlignSelf,
  'justify-content': ElementStyle.prototype.setJustifyContent,
  'flex-grow': ElementStyle.prototype.setFlexGrow,
  'flex-shrink': ElementStyle.prototype.setFlexShrink,
  'flex-basis': ElementStyle.prototype.setFlexBasis,
  'flex': ElementStyle.prototype.setFlex,
  'z-index': ElementStyle.prototype.setZIndex,
  'cursor': ElementStyle.prototype.setCursor,
  'background-color': ElementStyle.prototype.setBackgroundColor,
  'background-image': ElementStyle.prototype.setBackgroundImage,
  'font': ElementStyle.prototype.setFont,
  'font-size': ElementStyle.prototype.setFontSize,
  'font-family': ElementStyle.prototype.setFontFamily,
  'color': ElementStyle.prototype.setFontColor
};

/***/ }),

/***/ "./style_element.ts":
/*!**************************!*\
  !*** ./style_element.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleElement = void 0;

var _1 = __webpack_require__(/*! . */ "./index.ts");

var StyleElement = function (_$RMLElement) {
  (0, _inherits2.default)(StyleElement, _$RMLElement);

  var _super = _createSuper(StyleElement);

  function StyleElement(uiscene) {
    var _this;

    (0, _classCallCheck2.default)(this, StyleElement);
    _this = _super.call(this, uiscene);
    _this._definitions = [];

    _this.addEventListener(_1.TextContentChangeEvent.NAME, function (e) {
      _this._update();
    });

    return _this;
  }

  (0, _createClass2.default)(StyleElement, [{
    key: "_update",
    value: function _update() {
      this._definitions = this._uiscene._parseStyleContent(this.textContent);

      if (this._isSucceedingOf(this._uiscene.document)) {
        this._uiscene.requireFullStyleRefresh();
      }
    }
  }, {
    key: "_getDefaultStyleSheet",
    value: function _getDefaultStyleSheet() {
      var style = {};
      style.display = 'none';
      return style;
    }
  }, {
    key: "definitions",
    get: function get() {
      return this._definitions;
    }
  }]);
  return StyleElement;
}(_1.RMLElement);

StyleElement = __decorate([_1.tagname('style'), __metadata("design:paramtypes", [_1.GUI])], StyleElement);
exports.StyleElement = StyleElement;

/***/ }),

/***/ "./texture_atlas.ts":
/*!**************************!*\
  !*** ./texture_atlas.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureAtlas = void 0;

var TextureAtlas = function () {
  function TextureAtlas(texture, uvMin, uvMax, topLeftPatch9, bottomRightPatch9) {
    (0, _classCallCheck2.default)(this, TextureAtlas);
    this._texture = texture || null;
    this._uvMin = uvMin || {
      x: 0,
      y: 0
    };
    this._uvMax = uvMax || {
      x: 1,
      y: 1
    };
    this._topLeftPatch9 = topLeftPatch9 || null;
    this._bottomRightPatch9 = bottomRightPatch9 || null;
  }

  (0, _createClass2.default)(TextureAtlas, [{
    key: "texture",
    get: function get() {
      return this._texture;
    },
    set: function set(tex) {
      this._texture = tex;
    }
  }, {
    key: "uvMin",
    get: function get() {
      return this._uvMin;
    },
    set: function set(v) {
      this._uvMin.x = v.x;
      this._uvMin.y = v.y;
    }
  }, {
    key: "uvMax",
    get: function get() {
      return this._uvMax;
    },
    set: function set(v) {
      this._uvMax.x = v.x;
      this._uvMax.y = v.y;
    }
  }, {
    key: "topLeftPatch9",
    get: function get() {
      return this._topLeftPatch9;
    },
    set: function set(v) {
      this._topLeftPatch9.x = v.x;
      this._topLeftPatch9.y = v.y;
    }
  }, {
    key: "bottomRightPatch9",
    get: function get() {
      return this._bottomRightPatch9;
    },
    set: function set(v) {
      this._bottomRightPatch9.x = v.x;
      this._bottomRightPatch9.y = v.y;
    }
  }]);
  return TextureAtlas;
}();

exports.TextureAtlas = TextureAtlas;

/***/ }),

/***/ "./typeflex/api.ts":
/*!*************************!*\
  !*** ./typeflex/api.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInstanceCount = exports.Node = exports.Config = exports.Value = exports.Size = exports.Layout = exports.UNDEFINED = exports.WRAP_WRAP_REVERSE = exports.WRAP_WRAP = exports.WRAP_NO_WRAP = exports.UNIT_AUTO = exports.UNIT_PERCENT = exports.UNIT_POINT = exports.UNIT_UNDEFINED = exports.POSITION_TYPE_ABSOLUTE = exports.POSITION_TYPE_RELATIVE = exports.OVERFLOW_SCROLL = exports.OVERFLOW_HIDDEN = exports.OVERFLOW_VISIBLE = exports.NODE_TYPE_TEXT = exports.NODE_TYPE_DEFAULT = exports.MEASURE_MODE_AT_MOST = exports.MEASURE_MODE_EXACTLY = exports.MEASURE_MODE_UNDEFINED = exports.LOGLEVEL_FATAL = exports.LOGLEVEL_VERBOSE = exports.LOGLEVEL_DEBUG = exports.LOGLEVEL_INFO = exports.LOGLEVEL_WARN = exports.LOGLEVEL_ERROR = exports.JUSTIFY_SPACE_EVENLY = exports.JUSTIFY_SPACE_AROUND = exports.JUSTIFY_SPACE_BETWEEN = exports.JUSTIFY_FLEX_END = exports.JUSTIFY_CENTER = exports.JUSTIFY_FLEX_START = exports.FLEX_DIRECTION_ROW_REVERSE = exports.FLEX_DIRECTION_ROW = exports.FLEX_DIRECTION_COLUMN_REVERSE = exports.FLEX_DIRECTION_COLUMN = exports.EXPERIMENTALFEATURE_WEBFLEXBASIS = exports.EDGE_ALL = exports.EDGE_VERTICAL = exports.EDGE_HORIZONTAL = exports.EDGE_END = exports.EDGE_START = exports.EDGE_BOTTOM = exports.EDGE_RIGHT = exports.EDGE_TOP = exports.EDGE_LEFT = exports.DISPLAY_NONE = exports.DISPLAY_FLEX = exports.DIRECTION_RTL = exports.DIRECTION_LTR = exports.DIRECTION_INHERIT = exports.DIMENSION_HEIGHT = exports.DIMENSION_WIDTH = exports.ALIGN_SPACE_AROUND = exports.ALIGN_SPACE_BETWEEN = exports.ALIGN_BASELINE = exports.ALIGN_STRETCH = exports.ALIGN_FLEX_END = exports.ALIGN_CENTER = exports.ALIGN_FLEX_START = exports.ALIGN_AUTO = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var yoga_1 = __webpack_require__(/*! ./yoga */ "./typeflex/yoga.ts");

var utils_1 = __webpack_require__(/*! ./utils */ "./typeflex/utils.ts");

exports.ALIGN_AUTO = enums_1.YGAlign.Auto;
exports.ALIGN_FLEX_START = enums_1.YGAlign.FlexStart;
exports.ALIGN_CENTER = enums_1.YGAlign.Center;
exports.ALIGN_FLEX_END = enums_1.YGAlign.FlexEnd;
exports.ALIGN_STRETCH = enums_1.YGAlign.Stretch;
exports.ALIGN_BASELINE = enums_1.YGAlign.Baseline;
exports.ALIGN_SPACE_BETWEEN = enums_1.YGAlign.SpaceBetween;
exports.ALIGN_SPACE_AROUND = enums_1.YGAlign.SpaceAround;
exports.DIMENSION_WIDTH = enums_1.YGDimension.Width;
exports.DIMENSION_HEIGHT = enums_1.YGDimension.Height;
exports.DIRECTION_INHERIT = enums_1.YGDirection.Inherit;
exports.DIRECTION_LTR = enums_1.YGDirection.LTR;
exports.DIRECTION_RTL = enums_1.YGDirection.RTL;
exports.DISPLAY_FLEX = enums_1.YGDisplay.Flex;
exports.DISPLAY_NONE = enums_1.YGDisplay.None;
exports.EDGE_LEFT = enums_1.YGEdge.Left;
exports.EDGE_TOP = enums_1.YGEdge.Top;
exports.EDGE_RIGHT = enums_1.YGEdge.Right;
exports.EDGE_BOTTOM = enums_1.YGEdge.Bottom;
exports.EDGE_START = enums_1.YGEdge.Start;
exports.EDGE_END = enums_1.YGEdge.End;
exports.EDGE_HORIZONTAL = enums_1.YGEdge.Horizontal;
exports.EDGE_VERTICAL = enums_1.YGEdge.Vertical;
exports.EDGE_ALL = enums_1.YGEdge.All;
exports.EXPERIMENTALFEATURE_WEBFLEXBASIS = enums_1.YGExperimentalFeature.WebFlexBasis;
exports.FLEX_DIRECTION_COLUMN = enums_1.YGFlexDirection.Column;
exports.FLEX_DIRECTION_COLUMN_REVERSE = enums_1.YGFlexDirection.ColumnReverse;
exports.FLEX_DIRECTION_ROW = enums_1.YGFlexDirection.Row;
exports.FLEX_DIRECTION_ROW_REVERSE = enums_1.YGFlexDirection.RowReverse;
exports.JUSTIFY_FLEX_START = enums_1.YGJustify.FlexStart;
exports.JUSTIFY_CENTER = enums_1.YGJustify.Center;
exports.JUSTIFY_FLEX_END = enums_1.YGJustify.FlexEnd;
exports.JUSTIFY_SPACE_BETWEEN = enums_1.YGJustify.SpaceBetween;
exports.JUSTIFY_SPACE_AROUND = enums_1.YGJustify.SpaceAround;
exports.JUSTIFY_SPACE_EVENLY = enums_1.YGJustify.SpaceEvenly;
exports.LOGLEVEL_ERROR = enums_1.YGLogLevel.Error;
exports.LOGLEVEL_WARN = enums_1.YGLogLevel.Warn;
exports.LOGLEVEL_INFO = enums_1.YGLogLevel.Info;
exports.LOGLEVEL_DEBUG = enums_1.YGLogLevel.Debug;
exports.LOGLEVEL_VERBOSE = enums_1.YGLogLevel.Verbose;
exports.LOGLEVEL_FATAL = enums_1.YGLogLevel.Fatal;
exports.MEASURE_MODE_UNDEFINED = enums_1.YGMeasureMode.Undefined;
exports.MEASURE_MODE_EXACTLY = enums_1.YGMeasureMode.Exactly;
exports.MEASURE_MODE_AT_MOST = enums_1.YGMeasureMode.AtMost;
exports.NODE_TYPE_DEFAULT = enums_1.YGNodeType.Default;
exports.NODE_TYPE_TEXT = enums_1.YGNodeType.Text;
exports.OVERFLOW_VISIBLE = enums_1.YGOverflow.Visible;
exports.OVERFLOW_HIDDEN = enums_1.YGOverflow.Hidden;
exports.OVERFLOW_SCROLL = enums_1.YGOverflow.Scroll;
exports.POSITION_TYPE_RELATIVE = enums_1.YGPositionType.Relative;
exports.POSITION_TYPE_ABSOLUTE = enums_1.YGPositionType.Absolute;
exports.UNIT_UNDEFINED = enums_1.YGUnit.Undefined;
exports.UNIT_POINT = enums_1.YGUnit.Point;
exports.UNIT_PERCENT = enums_1.YGUnit.Percent;
exports.UNIT_AUTO = enums_1.YGUnit.Auto;
exports.WRAP_NO_WRAP = enums_1.YGWrap.NoWrap;
exports.WRAP_WRAP = enums_1.YGWrap.Wrap;
exports.WRAP_WRAP_REVERSE = enums_1.YGWrap.WrapReverse;
exports.UNDEFINED = undefined;

var Layout = function Layout() {
  (0, _classCallCheck2.default)(this, Layout);
};

exports.Layout = Layout;

var Size = function () {
  function Size(width, height) {
    (0, _classCallCheck2.default)(this, Size);

    if (width) {
      this.width = width;
      this.height = height;
    } else {
      this.width = 0;
      this.height = 0;
    }
  }

  (0, _createClass2.default)(Size, null, [{
    key: "fromJS",
    value: function fromJS(obj) {
      return new Size(obj.width, obj.height);
    }
  }]);
  return Size;
}();

exports.Size = Size;

var Value = function Value(unit, value) {
  (0, _classCallCheck2.default)(this, Value);

  if (unit) {
    this.unit = unit;
    this.value = value;
  } else {
    this.unit = enums_1.YGUnit.Undefined;
    this.value = 0;
  }
};

exports.Value = Value;

var Config = function () {
  function Config() {
    (0, _classCallCheck2.default)(this, Config);
    this.config = yoga_1.YGConfigNew();
  }

  (0, _createClass2.default)(Config, [{
    key: "free",
    value: function free() {
      yoga_1.YGConfigFree(this.config);
    }
  }, {
    key: "setExperimentalFeatureEnabled",
    value: function setExperimentalFeatureEnabled(feature, enabled) {
      yoga_1.YGConfigSetExperimentalFeatureEnabled(this.config, feature, enabled);
    }
  }, {
    key: "setPointScaleFactor",
    value: function setPointScaleFactor(pixelsInPoint) {
      yoga_1.YGConfigSetPointScaleFactor(this.config, pixelsInPoint);
    }
  }, {
    key: "isExperimentalFeatureEnabled",
    value: function isExperimentalFeatureEnabled(feature) {
      yoga_1.YGConfigIsExperimentalFeatureEnabled(this.config, feature);
    }
  }], [{
    key: "create",
    value: function create() {
      return new Config();
    }
  }]);
  return Config;
}();

exports.Config = Config;

function fromYGNode(node) {
  return yoga_1.YGNodeGetContext(node);
}

function fromYGValue(val) {
  return new Value(val.unit, val.value);
}

var Node = function () {
  function Node(config) {
    (0, _classCallCheck2.default)(this, Node);

    if (!config) {
      this.node = yoga_1.YGNodeNew();
    } else {
      this.node = yoga_1.YGNodeNewWithConfig(config.config);
    }

    yoga_1.YGNodeSetContext(this.node, this);
  }

  (0, _createClass2.default)(Node, [{
    key: "calculateLayout",
    value: function calculateLayout(width, height, direction) {
      yoga_1.YGNodeCalculateLayout(this.node, width, height, direction);
    }
  }, {
    key: "copyStyle",
    value: function copyStyle(node) {
      yoga_1.YGNodeCopyStyle(this.node, node);
    }
  }, {
    key: "free",
    value: function free() {
      yoga_1.YGNodeFree(this.node);
    }
  }, {
    key: "freeRecursive",
    value: function freeRecursive() {
      yoga_1.YGNodeFreeRecursive(this.node);
    }
  }, {
    key: "getAlignContent",
    value: function getAlignContent() {
      return yoga_1.YGNodeStyleGetAlignContent(this.node);
    }
  }, {
    key: "getAlignItems",
    value: function getAlignItems() {
      return yoga_1.YGNodeStyleGetAlignItems(this.node);
    }
  }, {
    key: "getAlignSelf",
    value: function getAlignSelf() {
      return yoga_1.YGNodeStyleGetAlignSelf(this.node);
    }
  }, {
    key: "getAspectRatio",
    value: function getAspectRatio() {
      return yoga_1.YGNodeStyleGetAspectRatio(this.node);
    }
  }, {
    key: "getBorder",
    value: function getBorder(edge) {
      return yoga_1.YGNodeStyleGetBorder(this.node, edge);
    }
  }, {
    key: "getChild",
    value: function getChild(index) {
      return fromYGNode(yoga_1.YGNodeGetChild(this.node, index));
    }
  }, {
    key: "getChildCount",
    value: function getChildCount() {
      return yoga_1.YGNodeGetChildCount(this.node);
    }
  }, {
    key: "getComputedBorder",
    value: function getComputedBorder(edge) {
      return yoga_1.YGNodeLayoutGetBorder(this.node, edge);
    }
  }, {
    key: "getComputedBottom",
    value: function getComputedBottom() {
      return yoga_1.YGNodeLayoutGetBottom(this.node);
    }
  }, {
    key: "getComputedHeight",
    value: function getComputedHeight() {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetHeight(this.node));
    }
  }, {
    key: "getComputedLayout",
    value: function getComputedLayout() {
      var layout = new Layout();
      layout.left = yoga_1.YGNodeLayoutGetLeft(this.node);
      layout.right = yoga_1.YGNodeLayoutGetRight(this.node);
      layout.top = yoga_1.YGNodeLayoutGetTop(this.node);
      layout.bottom = yoga_1.YGNodeLayoutGetBottom(this.node);
      layout.width = yoga_1.YGNodeLayoutGetWidth(this.node);
      layout.height = yoga_1.YGNodeLayoutGetHeight(this.node);
      return layout;
    }
  }, {
    key: "getComputedLeft",
    value: function getComputedLeft() {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetLeft(this.node));
    }
  }, {
    key: "getComputedMargin",
    value: function getComputedMargin(edge) {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetMargin(this.node, edge));
    }
  }, {
    key: "getComputedPadding",
    value: function getComputedPadding(edge) {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetPadding(this.node, edge));
    }
  }, {
    key: "getComputedRight",
    value: function getComputedRight() {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetRight(this.node));
    }
  }, {
    key: "getComputedTop",
    value: function getComputedTop() {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetTop(this.node));
    }
  }, {
    key: "getComputedWidth",
    value: function getComputedWidth() {
      return utils_1.YGFloatSanitize(yoga_1.YGNodeLayoutGetWidth(this.node));
    }
  }, {
    key: "getDisplay",
    value: function getDisplay() {
      return yoga_1.YGNodeStyleGetDisplay(this.node);
    }
  }, {
    key: "getFlexBasis",
    value: function getFlexBasis() {
      return fromYGValue(yoga_1.YGNodeStyleGetFlexBasis(this.node));
    }
  }, {
    key: "getFlexDirection",
    value: function getFlexDirection() {
      return yoga_1.YGNodeStyleGetFlexDirection(this.node);
    }
  }, {
    key: "getFlexGrow",
    value: function getFlexGrow() {
      return yoga_1.YGNodeStyleGetFlexGrow(this.node);
    }
  }, {
    key: "getFlexShrink",
    value: function getFlexShrink() {
      return yoga_1.YGNodeStyleGetFlexShrink(this.node);
    }
  }, {
    key: "getFlexWrap",
    value: function getFlexWrap() {
      return yoga_1.YGNodeStyleGetFlexWrap(this.node);
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return fromYGValue(yoga_1.YGNodeStyleGetHeight(this.node));
    }
  }, {
    key: "getJustifyContent",
    value: function getJustifyContent() {
      return yoga_1.YGNodeStyleGetJustifyContent(this.node);
    }
  }, {
    key: "getMargin",
    value: function getMargin(edge) {
      return fromYGValue(yoga_1.YGNodeStyleGetMargin(this.node, edge));
    }
  }, {
    key: "getMaxHeight",
    value: function getMaxHeight() {
      return fromYGValue(yoga_1.YGNodeStyleGetMaxHeight(this.node));
    }
  }, {
    key: "getMaxWidth",
    value: function getMaxWidth() {
      return fromYGValue(yoga_1.YGNodeStyleGetMaxWidth(this.node));
    }
  }, {
    key: "getMinHeight",
    value: function getMinHeight() {
      return fromYGValue(yoga_1.YGNodeStyleGetMinHeight(this.node));
    }
  }, {
    key: "getMinWidth",
    value: function getMinWidth() {
      return fromYGValue(yoga_1.YGNodeStyleGetMinWidth(this.node));
    }
  }, {
    key: "getOverflow",
    value: function getOverflow() {
      return yoga_1.YGNodeStyleGetOverflow(this.node);
    }
  }, {
    key: "getPadding",
    value: function getPadding(edge) {
      return fromYGValue(yoga_1.YGNodeStyleGetPadding(this.node, edge));
    }
  }, {
    key: "getParent",
    value: function getParent() {
      var parent = yoga_1.YGNodeGetParent(this.node);

      if (!parent) {
        return undefined;
      }

      return fromYGNode(parent);
    }
  }, {
    key: "getPosition",
    value: function getPosition(edge) {
      return fromYGValue(yoga_1.YGNodeStyleGetPosition(this.node, edge));
    }
  }, {
    key: "getPositionType",
    value: function getPositionType() {
      return yoga_1.YGNodeStyleGetPositionType(this.node);
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return fromYGValue(yoga_1.YGNodeStyleGetWidth(this.node));
    }
  }, {
    key: "insertChild",
    value: function insertChild(child, index) {
      yoga_1.YGNodeInsertChild(this.node, child.node, index);
    }
  }, {
    key: "isDirty",
    value: function isDirty() {
      return yoga_1.YGNodeIsDirty(this.node);
    }
  }, {
    key: "markDirty",
    value: function markDirty() {
      yoga_1.YGNodeMarkDirty(this.node);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      yoga_1.YGNodeRemoveChild(this.node, child.node);
    }
  }, {
    key: "reset",
    value: function reset() {
      yoga_1.YGNodeReset(this.node);
    }
  }, {
    key: "setAlignContent",
    value: function setAlignContent(alignContent) {
      yoga_1.YGNodeStyleSetAlignContent(this.node, alignContent);
    }
  }, {
    key: "setAlignItems",
    value: function setAlignItems(alignItems) {
      yoga_1.YGNodeStyleSetAlignItems(this.node, alignItems);
    }
  }, {
    key: "setAlignSelf",
    value: function setAlignSelf(alignSelf) {
      yoga_1.YGNodeStyleSetAlignSelf(this.node, alignSelf);
    }
  }, {
    key: "setAspectRatio",
    value: function setAspectRatio(aspectRatio) {
      yoga_1.YGNodeStyleSetAspectRatio(this.node, aspectRatio);
    }
  }, {
    key: "setBorder",
    value: function setBorder(edge, borderWidth) {
      yoga_1.YGNodeStyleSetBorder(this.node, edge, borderWidth);
    }
  }, {
    key: "setDisplay",
    value: function setDisplay(display) {
      yoga_1.YGNodeStyleSetDisplay(this.node, display);
    }
  }, {
    key: "setFlex",
    value: function setFlex(flex) {
      yoga_1.YGNodeStyleSetFlex(this.node, flex);
    }
  }, {
    key: "setFlexBasis",
    value: function setFlexBasis(flexBasis) {
      if (typeof flexBasis === 'string') {
        if (flexBasis === 'auto') {
          this.setFlexBasisAuto();
        } else if (flexBasis[flexBasis.length - 1] === '%') {
          this.setFlexBasisPercent(parseFloat(flexBasis));
        } else {
          return;
        }
      } else if (typeof flexBasis === 'number') {
        yoga_1.YGNodeStyleSetFlexBasis(this.node, flexBasis);
      }
    }
  }, {
    key: "setFlexBasisAuto",
    value: function setFlexBasisAuto() {
      yoga_1.YGNodeStyleSetFlexBasisAuto(this.node);
    }
  }, {
    key: "setFlexBasisPercent",
    value: function setFlexBasisPercent(flexBasis) {
      yoga_1.YGNodeStyleSetFlexBasisPercent(this.node, flexBasis);
    }
  }, {
    key: "setFlexDirection",
    value: function setFlexDirection(flexDirection) {
      yoga_1.YGNodeStyleSetFlexDirection(this.node, flexDirection);
    }
  }, {
    key: "setFlexGrow",
    value: function setFlexGrow(flexGrow) {
      yoga_1.YGNodeStyleSetFlexGrow(this.node, flexGrow);
    }
  }, {
    key: "setFlexShrink",
    value: function setFlexShrink(flexShrink) {
      yoga_1.YGNodeStyleSetFlexShrink(this.node, flexShrink);
    }
  }, {
    key: "setFlexWrap",
    value: function setFlexWrap(flexWrap) {
      yoga_1.YGNodeStyleSetFlexWrap(this.node, flexWrap);
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      if (typeof height === 'string') {
        if (height === 'auto') {
          this.setHeightAuto();
        } else if (height[height.length - 1] === '%') {
          this.setHeightPercent(parseFloat(height));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetHeight(this.node, height);
      }
    }
  }, {
    key: "setHeightAuto",
    value: function setHeightAuto() {
      yoga_1.YGNodeStyleSetHeightAuto(this.node);
    }
  }, {
    key: "setHeightPercent",
    value: function setHeightPercent(height) {
      yoga_1.YGNodeStyleSetHeightPercent(this.node, height);
    }
  }, {
    key: "setJustifyContent",
    value: function setJustifyContent(justifyContent) {
      yoga_1.YGNodeStyleSetJustifyContent(this.node, justifyContent);
    }
  }, {
    key: "setMargin",
    value: function setMargin(edge, margin) {
      if (typeof margin === 'string') {
        if (margin === 'auto') {
          this.setMarginAuto(edge);
        } else if (margin[margin.length - 1] === '%') {
          this.setMarginPercent(edge, parseFloat(margin));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetMargin(this.node, edge, margin);
      }
    }
  }, {
    key: "setMarginAuto",
    value: function setMarginAuto(edge) {
      yoga_1.YGNodeStyleSetMarginAuto(this.node, edge);
    }
  }, {
    key: "setMarginPercent",
    value: function setMarginPercent(edge, margin) {
      yoga_1.YGNodeStyleSetMarginPercent(this.node, edge, margin);
    }
  }, {
    key: "setMaxHeight",
    value: function setMaxHeight(maxHeight) {
      if (typeof maxHeight === 'string') {
        if (maxHeight[maxHeight.length - 1] === '%') {
          this.setMaxHeightPercent(parseFloat(maxHeight));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetMaxHeight(this.node, maxHeight);
      }
    }
  }, {
    key: "setMaxHeightPercent",
    value: function setMaxHeightPercent(maxHeight) {
      yoga_1.YGNodeStyleSetMaxHeightPercent(this.node, maxHeight);
    }
  }, {
    key: "setMaxWidth",
    value: function setMaxWidth(maxWidth) {
      if (typeof maxWidth === 'string') {
        if (maxWidth[maxWidth.length - 1] === '%') {
          this.setMaxWidthPercent(parseFloat(maxWidth));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetMaxWidth(this.node, maxWidth);
      }
    }
  }, {
    key: "setMaxWidthPercent",
    value: function setMaxWidthPercent(maxWidth) {
      yoga_1.YGNodeStyleSetMaxWidthPercent(this.node, maxWidth);
    }
  }, {
    key: "setMeasureFunc",
    value: function setMeasureFunc(measureFunc) {
      if (measureFunc == null) {
        this.unsetMeasureFunc();
      } else {
        yoga_1.YGNodeSetMeasureFunc(this.node, measureFunc);
      }
    }
  }, {
    key: "unsetMeasureFunc",
    value: function unsetMeasureFunc() {
      yoga_1.YGNodeSetMeasureFunc(this.node, null);
    }
  }, {
    key: "setMinHeight",
    value: function setMinHeight(minHeight) {
      if (typeof minHeight === 'string') {
        if (minHeight[minHeight.length - 1] === '%') {
          this.setMinHeightPercent(parseFloat(minHeight));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetMinHeight(this.node, minHeight);
      }
    }
  }, {
    key: "setMinHeightPercent",
    value: function setMinHeightPercent(minHeight) {
      yoga_1.YGNodeStyleSetMinHeightPercent(this.node, minHeight);
    }
  }, {
    key: "setMinWidth",
    value: function setMinWidth(minWidth) {
      if (typeof minWidth === 'string') {
        if (minWidth[minWidth.length - 1] === '%') {
          this.setMinWidthPercent(parseFloat(minWidth));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetMinWidth(this.node, minWidth);
      }
    }
  }, {
    key: "setMinWidthPercent",
    value: function setMinWidthPercent(minWidth) {
      yoga_1.YGNodeStyleSetMinWidthPercent(this.node, minWidth);
    }
  }, {
    key: "setOverflow",
    value: function setOverflow(overflow) {
      yoga_1.YGNodeStyleSetOverflow(this.node, overflow);
    }
  }, {
    key: "setPadding",
    value: function setPadding(edge, padding) {
      if (typeof padding === 'string') {
        if (padding[padding.length - 1] === '%') {
          this.setPaddingPercent(edge, parseFloat(padding));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetPadding(this.node, edge, padding);
      }
    }
  }, {
    key: "setPaddingPercent",
    value: function setPaddingPercent(edge, padding) {
      yoga_1.YGNodeStyleSetPaddingPercent(this.node, edge, padding);
    }
  }, {
    key: "setPosition",
    value: function setPosition(edge, position) {
      if (typeof position === 'string') {
        if (position[position.length - 1] === '%') {
          this.setPositionPercent(edge, parseFloat(position));
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetPosition(this.node, edge, position);
      }
    }
  }, {
    key: "setPositionPercent",
    value: function setPositionPercent(edge, position) {
      yoga_1.YGNodeStyleSetPositionPercent(this.node, edge, position);
    }
  }, {
    key: "setPositionType",
    value: function setPositionType(positionType) {
      yoga_1.YGNodeStyleSetPositionType(this.node, positionType);
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      if (typeof width === 'string') {
        if (width[width.length - 1] === '%') {
          this.setWidthPercent(parseFloat(width));
        } else if (width === 'auto') {
          this.setWidthAuto();
        } else {
          throw new Error('Invalid input type.');
        }
      } else {
        yoga_1.YGNodeStyleSetWidth(this.node, width);
      }
    }
  }, {
    key: "setWidthAuto",
    value: function setWidthAuto() {
      yoga_1.YGNodeStyleSetWidthAuto(this.node);
    }
  }, {
    key: "setWidthPercent",
    value: function setWidthPercent(width) {
      yoga_1.YGNodeStyleSetWidthPercent(this.node, width);
    }
  }, {
    key: "unsetMeasureFun",
    value: function unsetMeasureFun() {
      yoga_1.YGNodeSetMeasureFunc(this.node, undefined);
    }
  }], [{
    key: "create",
    value: function create(config) {
      if (config) {
        return new Node(config);
      } else {
        return new Node();
      }
    }
  }, {
    key: "createDefault",
    value: function createDefault() {
      return new Node(undefined);
    }
  }, {
    key: "createWithConfig",
    value: function createWithConfig(config) {
      return new Node(config);
    }
  }]);
  return Node;
}();

exports.Node = Node;

function getInstanceCount() {
  return yoga_1.YGNodeGetInstanceCount();
}

exports.getInstanceCount = getInstanceCount;

/***/ }),

/***/ "./typeflex/enums.ts":
/*!***************************!*\
  !*** ./typeflex/enums.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGWrapToString = exports.YGWrap = exports.YGWrapCount = exports.YGUnitToString = exports.YGUnit = exports.YGUnitCount = exports.YGPrintOptionsToString = exports.YGPrintOptions = exports.YGPrintOptionsCount = exports.YGPositionTypeToString = exports.YGPositionType = exports.YGPositionTypeCount = exports.YGOverflowToString = exports.YGOverflow = exports.YGOverflowCount = exports.YGNodeTypeToString = exports.YGNodeType = exports.YGNodeTypeCount = exports.YGMeasureModeToString = exports.YGMeasureMode = exports.YGMeasureModeCount = exports.YGLogLevelToString = exports.YGLogLevel = exports.YGLogLevelCount = exports.YGJustifyToString = exports.YGJustify = exports.YGJustifyCount = exports.YGFlexDirectionToString = exports.YGFlexDirection = exports.YGFlexDirectionCount = exports.YGExperimentalFeatureToString = exports.YGExperimentalFeature = exports.YGExperimentalFeatureCount = exports.YGEdgeToString = exports.YGEdge = exports.YGEdgeCount = exports.YGDisplayToString = exports.YGDisplay = exports.YGDisplayCount = exports.YGDirectionToString = exports.YGDirection = exports.YGDimensionToString = exports.YGDimension = exports.YGDimensionCount = exports.YGAlignToString = exports.YGAlign = exports.YGAlignCount = void 0;
exports.YGAlignCount = 8;
var YGAlign;

(function (YGAlign) {
  YGAlign[YGAlign["Auto"] = 0] = "Auto";
  YGAlign[YGAlign["FlexStart"] = 1] = "FlexStart";
  YGAlign[YGAlign["Center"] = 2] = "Center";
  YGAlign[YGAlign["FlexEnd"] = 3] = "FlexEnd";
  YGAlign[YGAlign["Stretch"] = 4] = "Stretch";
  YGAlign[YGAlign["Baseline"] = 5] = "Baseline";
  YGAlign[YGAlign["SpaceBetween"] = 6] = "SpaceBetween";
  YGAlign[YGAlign["SpaceAround"] = 7] = "SpaceAround";
})(YGAlign = exports.YGAlign || (exports.YGAlign = {}));

function YGAlignToString(value) {
  switch (value) {
    case YGAlign.Auto:
      return "auto";

    case YGAlign.FlexStart:
      return "flex-start";

    case YGAlign.Center:
      return "center";

    case YGAlign.FlexEnd:
      return "flex-end";

    case YGAlign.Stretch:
      return "stretch";

    case YGAlign.Baseline:
      return "baseline";

    case YGAlign.SpaceBetween:
      return "space-between";

    case YGAlign.SpaceAround:
      return "space-around";
  }

  return "unknown";
}

exports.YGAlignToString = YGAlignToString;
exports.YGDimensionCount = 2;
var YGDimension;

(function (YGDimension) {
  YGDimension[YGDimension["Width"] = 0] = "Width";
  YGDimension[YGDimension["Height"] = 1] = "Height";
})(YGDimension = exports.YGDimension || (exports.YGDimension = {}));

function YGDimensionToString(value) {
  switch (value) {
    case YGDimension.Width:
      return "width";

    case YGDimension.Height:
      return "height";
  }

  return "unknown";
}

exports.YGDimensionToString = YGDimensionToString;
var YGDirection;

(function (YGDirection) {
  YGDirection[YGDirection["Inherit"] = 0] = "Inherit";
  YGDirection[YGDirection["LTR"] = 1] = "LTR";
  YGDirection[YGDirection["RTL"] = 2] = "RTL";
})(YGDirection = exports.YGDirection || (exports.YGDirection = {}));

function YGDirectionToString(value) {
  switch (value) {
    case YGDirection.Inherit:
      return "inherit";

    case YGDirection.LTR:
      return "ltr";

    case YGDirection.RTL:
      return "rtl";
  }

  return "unknown";
}

exports.YGDirectionToString = YGDirectionToString;
exports.YGDisplayCount = 2;
var YGDisplay;

(function (YGDisplay) {
  YGDisplay[YGDisplay["Flex"] = 0] = "Flex";
  YGDisplay[YGDisplay["None"] = 1] = "None";
})(YGDisplay = exports.YGDisplay || (exports.YGDisplay = {}));

function YGDisplayToString(value) {
  switch (value) {
    case YGDisplay.Flex:
      return "flex";

    case YGDisplay.None:
      return "none";
  }

  return "unknown";
}

exports.YGDisplayToString = YGDisplayToString;
exports.YGEdgeCount = 9;
var YGEdge;

(function (YGEdge) {
  YGEdge[YGEdge["Left"] = 0] = "Left";
  YGEdge[YGEdge["Top"] = 1] = "Top";
  YGEdge[YGEdge["Right"] = 2] = "Right";
  YGEdge[YGEdge["Bottom"] = 3] = "Bottom";
  YGEdge[YGEdge["Start"] = 4] = "Start";
  YGEdge[YGEdge["End"] = 5] = "End";
  YGEdge[YGEdge["Horizontal"] = 6] = "Horizontal";
  YGEdge[YGEdge["Vertical"] = 7] = "Vertical";
  YGEdge[YGEdge["All"] = 8] = "All";
})(YGEdge = exports.YGEdge || (exports.YGEdge = {}));

function YGEdgeToString(value) {
  switch (value) {
    case YGEdge.Left:
      return "left";

    case YGEdge.Top:
      return "top";

    case YGEdge.Right:
      return "right";

    case YGEdge.Bottom:
      return "bottom";

    case YGEdge.Start:
      return "start";

    case YGEdge.End:
      return "end";

    case YGEdge.Horizontal:
      return "horizontal";

    case YGEdge.Vertical:
      return "vertical";

    case YGEdge.All:
      return "all";
  }

  return "unknown";
}

exports.YGEdgeToString = YGEdgeToString;
exports.YGExperimentalFeatureCount = 1;
var YGExperimentalFeature;

(function (YGExperimentalFeature) {
  YGExperimentalFeature[YGExperimentalFeature["WebFlexBasis"] = 0] = "WebFlexBasis";
})(YGExperimentalFeature = exports.YGExperimentalFeature || (exports.YGExperimentalFeature = {}));

function YGExperimentalFeatureToString(value) {
  switch (value) {
    case YGExperimentalFeature.WebFlexBasis:
      return "web-flex-basis";
  }

  return "unknown";
}

exports.YGExperimentalFeatureToString = YGExperimentalFeatureToString;
exports.YGFlexDirectionCount = 4;
var YGFlexDirection;

(function (YGFlexDirection) {
  YGFlexDirection[YGFlexDirection["Column"] = 0] = "Column";
  YGFlexDirection[YGFlexDirection["ColumnReverse"] = 1] = "ColumnReverse";
  YGFlexDirection[YGFlexDirection["Row"] = 2] = "Row";
  YGFlexDirection[YGFlexDirection["RowReverse"] = 3] = "RowReverse";
})(YGFlexDirection = exports.YGFlexDirection || (exports.YGFlexDirection = {}));

function YGFlexDirectionToString(value) {
  switch (value) {
    case YGFlexDirection.Column:
      return "column";

    case YGFlexDirection.ColumnReverse:
      return "column-reverse";

    case YGFlexDirection.Row:
      return "row";

    case YGFlexDirection.RowReverse:
      return "row-reverse";
  }

  return "unknown";
}

exports.YGFlexDirectionToString = YGFlexDirectionToString;
exports.YGJustifyCount = 6;
var YGJustify;

(function (YGJustify) {
  YGJustify[YGJustify["FlexStart"] = 0] = "FlexStart";
  YGJustify[YGJustify["Center"] = 1] = "Center";
  YGJustify[YGJustify["FlexEnd"] = 2] = "FlexEnd";
  YGJustify[YGJustify["SpaceBetween"] = 3] = "SpaceBetween";
  YGJustify[YGJustify["SpaceAround"] = 4] = "SpaceAround";
  YGJustify[YGJustify["SpaceEvenly"] = 5] = "SpaceEvenly";
})(YGJustify = exports.YGJustify || (exports.YGJustify = {}));

function YGJustifyToString(value) {
  switch (value) {
    case YGJustify.FlexStart:
      return "flex-start";

    case YGJustify.Center:
      return "center";

    case YGJustify.FlexEnd:
      return "flex-end";

    case YGJustify.SpaceBetween:
      return "space-between";

    case YGJustify.SpaceAround:
      return "space-around";

    case YGJustify.SpaceEvenly:
      return "space-evenly";
  }

  return "unknown";
}

exports.YGJustifyToString = YGJustifyToString;
exports.YGLogLevelCount = 6;
var YGLogLevel;

(function (YGLogLevel) {
  YGLogLevel[YGLogLevel["Error"] = 0] = "Error";
  YGLogLevel[YGLogLevel["Warn"] = 1] = "Warn";
  YGLogLevel[YGLogLevel["Info"] = 2] = "Info";
  YGLogLevel[YGLogLevel["Debug"] = 3] = "Debug";
  YGLogLevel[YGLogLevel["Verbose"] = 4] = "Verbose";
  YGLogLevel[YGLogLevel["Fatal"] = 5] = "Fatal";
})(YGLogLevel = exports.YGLogLevel || (exports.YGLogLevel = {}));

function YGLogLevelToString(value) {
  switch (value) {
    case YGLogLevel.Error:
      return "error";

    case YGLogLevel.Warn:
      return "warn";

    case YGLogLevel.Info:
      return "info";

    case YGLogLevel.Debug:
      return "debug";

    case YGLogLevel.Verbose:
      return "verbose";

    case YGLogLevel.Fatal:
      return "fatal";
  }

  return "unknown";
}

exports.YGLogLevelToString = YGLogLevelToString;
exports.YGMeasureModeCount = 3;
var YGMeasureMode;

(function (YGMeasureMode) {
  YGMeasureMode[YGMeasureMode["Undefined"] = 0] = "Undefined";
  YGMeasureMode[YGMeasureMode["Exactly"] = 1] = "Exactly";
  YGMeasureMode[YGMeasureMode["AtMost"] = 2] = "AtMost";
})(YGMeasureMode = exports.YGMeasureMode || (exports.YGMeasureMode = {}));

function YGMeasureModeToString(value) {
  switch (value) {
    case YGMeasureMode.Undefined:
      return "undefined";

    case YGMeasureMode.Exactly:
      return "exactly";

    case YGMeasureMode.AtMost:
      return "at-most";
  }

  return "unknown";
}

exports.YGMeasureModeToString = YGMeasureModeToString;
exports.YGNodeTypeCount = 2;
var YGNodeType;

(function (YGNodeType) {
  YGNodeType[YGNodeType["Default"] = 0] = "Default";
  YGNodeType[YGNodeType["Text"] = 1] = "Text";
})(YGNodeType = exports.YGNodeType || (exports.YGNodeType = {}));

function YGNodeTypeToString(value) {
  switch (value) {
    case YGNodeType.Default:
      return "default";

    case YGNodeType.Text:
      return "text";
  }

  return "unknown";
}

exports.YGNodeTypeToString = YGNodeTypeToString;
exports.YGOverflowCount = 3;
var YGOverflow;

(function (YGOverflow) {
  YGOverflow[YGOverflow["Visible"] = 0] = "Visible";
  YGOverflow[YGOverflow["Hidden"] = 1] = "Hidden";
  YGOverflow[YGOverflow["Scroll"] = 2] = "Scroll";
})(YGOverflow = exports.YGOverflow || (exports.YGOverflow = {}));

function YGOverflowToString(value) {
  switch (value) {
    case YGOverflow.Visible:
      return "visible";

    case YGOverflow.Hidden:
      return "hidden";

    case YGOverflow.Scroll:
      return "scroll";
  }

  return "unknown";
}

exports.YGOverflowToString = YGOverflowToString;
exports.YGPositionTypeCount = 2;
var YGPositionType;

(function (YGPositionType) {
  YGPositionType[YGPositionType["Relative"] = 0] = "Relative";
  YGPositionType[YGPositionType["Absolute"] = 1] = "Absolute";
})(YGPositionType = exports.YGPositionType || (exports.YGPositionType = {}));

function YGPositionTypeToString(value) {
  switch (value) {
    case YGPositionType.Relative:
      return "relative";

    case YGPositionType.Absolute:
      return "absolute";
  }

  return "unknown";
}

exports.YGPositionTypeToString = YGPositionTypeToString;
exports.YGPrintOptionsCount = 3;
var YGPrintOptions;

(function (YGPrintOptions) {
  YGPrintOptions[YGPrintOptions["Layout"] = 1] = "Layout";
  YGPrintOptions[YGPrintOptions["Style"] = 2] = "Style";
  YGPrintOptions[YGPrintOptions["Children"] = 4] = "Children";
})(YGPrintOptions = exports.YGPrintOptions || (exports.YGPrintOptions = {}));

function YGPrintOptionsToString(value) {
  switch (value) {
    case YGPrintOptions.Layout:
      return "layout";

    case YGPrintOptions.Style:
      return "style";

    case YGPrintOptions.Children:
      return "children";
  }

  return "unknown";
}

exports.YGPrintOptionsToString = YGPrintOptionsToString;
exports.YGUnitCount = 4;
var YGUnit;

(function (YGUnit) {
  YGUnit[YGUnit["Undefined"] = 0] = "Undefined";
  YGUnit[YGUnit["Point"] = 1] = "Point";
  YGUnit[YGUnit["Percent"] = 2] = "Percent";
  YGUnit[YGUnit["Auto"] = 3] = "Auto";
})(YGUnit = exports.YGUnit || (exports.YGUnit = {}));

function YGUnitToString(value) {
  switch (value) {
    case YGUnit.Undefined:
      return "undefined";

    case YGUnit.Point:
      return "point";

    case YGUnit.Percent:
      return "percent";

    case YGUnit.Auto:
      return "auto";
  }

  return "unknown";
}

exports.YGUnitToString = YGUnitToString;
exports.YGWrapCount = 3;
var YGWrap;

(function (YGWrap) {
  YGWrap[YGWrap["NoWrap"] = 0] = "NoWrap";
  YGWrap[YGWrap["Wrap"] = 1] = "Wrap";
  YGWrap[YGWrap["WrapReverse"] = 2] = "WrapReverse";
})(YGWrap = exports.YGWrap || (exports.YGWrap = {}));

function YGWrapToString(value) {
  switch (value) {
    case YGWrap.NoWrap:
      return "no-wrap";

    case YGWrap.Wrap:
      return "wrap";

    case YGWrap.WrapReverse:
      return "wrap-reverse";
  }

  return "unknown";
}

exports.YGWrapToString = YGWrapToString;

/***/ }),

/***/ "./typeflex/internal.ts":
/*!******************************!*\
  !*** ./typeflex/internal.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kWebDefaultFlexShrink = exports.kDefaultFlexShrink = exports.kDefaultFlexGrow = exports.YG_MAX_CACHED_RESULT_COUNT = exports.dim = exports.pos = exports.trailing = exports.leading = exports.YGCachedMeasurement = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var yoga_1 = __webpack_require__(/*! ./yoga */ "./typeflex/yoga.ts");

var YGCachedMeasurement = function () {
  function YGCachedMeasurement() {
    (0, _classCallCheck2.default)(this, YGCachedMeasurement);
    this.availableWidth = 0;
    this.availableHeight = 0;
    this.widthMeasureMode = enums_1.YGMeasureMode.AtMost;
    this.heightMeasureMode = enums_1.YGMeasureMode.AtMost;
    this.computedWidth = -1;
    this.computedHeight = -1;
  }

  (0, _createClass2.default)(YGCachedMeasurement, [{
    key: "isEqual",
    value: function isEqual(measurement) {
      var isEqual = this.widthMeasureMode == measurement.widthMeasureMode && this.heightMeasureMode == measurement.heightMeasureMode;

      if (!yoga_1.YGFloatIsUndefined(this.availableWidth) || !yoga_1.YGFloatIsUndefined(measurement.availableWidth)) {
        isEqual = isEqual && this.availableWidth == measurement.availableWidth;
      }

      if (!yoga_1.YGFloatIsUndefined(this.availableHeight) || !yoga_1.YGFloatIsUndefined(measurement.availableHeight)) {
        isEqual = isEqual && this.availableHeight == measurement.availableHeight;
      }

      if (!yoga_1.YGFloatIsUndefined(this.computedWidth) || !yoga_1.YGFloatIsUndefined(measurement.computedWidth)) {
        isEqual = isEqual && this.computedWidth == measurement.computedWidth;
      }

      if (!yoga_1.YGFloatIsUndefined(this.computedHeight) || !yoga_1.YGFloatIsUndefined(measurement.computedHeight)) {
        isEqual = isEqual && this.computedHeight == measurement.computedHeight;
      }

      return isEqual;
    }
  }, {
    key: "clone",
    value: function clone() {
      var newCached = new YGCachedMeasurement();
      newCached.availableWidth = this.availableWidth;
      newCached.availableHeight = this.availableHeight;
      newCached.widthMeasureMode = this.widthMeasureMode;
      newCached.heightMeasureMode = this.heightMeasureMode;
      newCached.computedWidth = this.computedWidth;
      newCached.computedHeight = this.computedHeight;
      return newCached;
    }
  }]);
  return YGCachedMeasurement;
}();

exports.YGCachedMeasurement = YGCachedMeasurement;
exports.leading = [enums_1.YGEdge.Top, enums_1.YGEdge.Bottom, enums_1.YGEdge.Left, enums_1.YGEdge.Right];
exports.trailing = [enums_1.YGEdge.Bottom, enums_1.YGEdge.Top, enums_1.YGEdge.Right, enums_1.YGEdge.Left];
exports.pos = [enums_1.YGEdge.Top, enums_1.YGEdge.Bottom, enums_1.YGEdge.Left, enums_1.YGEdge.Right];
exports.dim = [enums_1.YGDimension.Height, enums_1.YGDimension.Height, enums_1.YGDimension.Width, enums_1.YGDimension.Width];
exports.YG_MAX_CACHED_RESULT_COUNT = 16;
exports.kDefaultFlexGrow = 0.0;
exports.kDefaultFlexShrink = 0.0;
exports.kWebDefaultFlexShrink = 1.0;

/***/ }),

/***/ "./typeflex/utils.ts":
/*!***************************!*\
  !*** ./typeflex/utils.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneYGValueArray = exports.YGResolveValueMargin = exports.YGResolveFlexDirection = exports.YGFlexDirectionIsColumn = exports.YGResolveValue = exports.YGFlexDirectionIsRow = exports.YGFlexDirectionCross = exports.YGUnwrapFloatOptional = exports.YGFloatSanitize = exports.YGValueArrayEqual = exports.YGFloatArrayEqual = exports.YGFloatMin = exports.YGFloatOptionalMax = exports.YGFloatMax = exports.YGFloatsEqual = exports.YGValueEqual = exports.YGCollectFlexItemsRowValues = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var ygfloatoptional_1 = __webpack_require__(/*! ./ygfloatoptional */ "./typeflex/ygfloatoptional.ts");

var yoga_1 = __webpack_require__(/*! ./yoga */ "./typeflex/yoga.ts");

var YGCollectFlexItemsRowValues = function YGCollectFlexItemsRowValues() {
  (0, _classCallCheck2.default)(this, YGCollectFlexItemsRowValues);
  this.itemsOnLine = 0;
  this.sizeConsumedOnCurrentLine = 0;
  this.totalFlexGrowFactors = 0;
  this.totalFlexShrinkScaledFactors = 0;
  this.endOfLineIndex = 0;
  this.relativeChildren = [];
  this.remainingFreeSpace = 0;
  this.mainDim = 0;
  this.crossDim = 0;
};

exports.YGCollectFlexItemsRowValues = YGCollectFlexItemsRowValues;

function YGValueEqual(a, b) {
  if (a.unit != b.unit) {
    return false;
  }

  if (a.unit == enums_1.YGUnit.Undefined || yoga_1.YGFloatIsUndefined(a.value) && yoga_1.YGFloatIsUndefined(b.value)) {
    return true;
  }

  return Math.abs(a.value - b.value) < 0.0001;
}

exports.YGValueEqual = YGValueEqual;

function YGFloatsEqual(a, b) {
  if (!yoga_1.YGFloatIsUndefined(a) && !yoga_1.YGFloatIsUndefined(b)) {
    return Math.abs(a - b) < 0.0001;
  }

  return yoga_1.YGFloatIsUndefined(a) && yoga_1.YGFloatIsUndefined(b);
}

exports.YGFloatsEqual = YGFloatsEqual;

function YGFloatMax(a, b) {
  if (!yoga_1.YGFloatIsUndefined(a) && !yoga_1.YGFloatIsUndefined(b)) {
    return Math.max(a, b);
  }

  return yoga_1.YGFloatIsUndefined(a) ? b : a;
}

exports.YGFloatMax = YGFloatMax;

function YGFloatOptionalMax(op1, op2) {
  if (!op1.isUndefined() && !op2.isUndefined()) {
    return op1.getValue() > op2.getValue() ? op1 : op2;
  }

  return op1.isUndefined() ? op2 : op1;
}

exports.YGFloatOptionalMax = YGFloatOptionalMax;

function YGFloatMin(a, b) {
  if (!yoga_1.YGFloatIsUndefined(a) && !yoga_1.YGFloatIsUndefined(b)) {
    return Math.min(a, b);
  }

  return yoga_1.YGFloatIsUndefined(a) ? b : a;
}

exports.YGFloatMin = YGFloatMin;

function YGFloatArrayEqual(val1, val2) {
  var areEqual = true;

  for (var i = 0; i < val1.length && areEqual; ++i) {
    areEqual = YGFloatsEqual(val1[i], val2[i]);
  }

  return areEqual;
}

exports.YGFloatArrayEqual = YGFloatArrayEqual;

function YGValueArrayEqual(val1, val2) {
  var areEqual = true;

  for (var i = 0; i < val1.length && areEqual; ++i) {
    areEqual = YGValueEqual(val1[i], val2[i]);
  }

  return areEqual;
}

exports.YGValueArrayEqual = YGValueArrayEqual;

function YGFloatSanitize(val) {
  return yoga_1.YGFloatIsUndefined(val) ? 0 : val;
}

exports.YGFloatSanitize = YGFloatSanitize;

function YGUnwrapFloatOptional(op) {
  return op.isUndefined() ? yoga_1.YGUndefined : op.getValue();
}

exports.YGUnwrapFloatOptional = YGUnwrapFloatOptional;

function YGFlexDirectionCross(flexDirection, direction) {
  return YGFlexDirectionIsColumn(flexDirection) ? YGResolveFlexDirection(enums_1.YGFlexDirection.Row, direction) : enums_1.YGFlexDirection.Column;
}

exports.YGFlexDirectionCross = YGFlexDirectionCross;

function YGFlexDirectionIsRow(flexDirection) {
  return flexDirection == enums_1.YGFlexDirection.Row || flexDirection == enums_1.YGFlexDirection.RowReverse;
}

exports.YGFlexDirectionIsRow = YGFlexDirectionIsRow;

function YGResolveValue(value, ownerSize) {
  switch (value.unit) {
    case enums_1.YGUnit.Undefined:
    case enums_1.YGUnit.Auto:
      return new ygfloatoptional_1.YGFloatOptional();

    case enums_1.YGUnit.Point:
      return new ygfloatoptional_1.YGFloatOptional(value.value);

    case enums_1.YGUnit.Percent:
      return new ygfloatoptional_1.YGFloatOptional(value.value * ownerSize * 0.01);
  }

  return new ygfloatoptional_1.YGFloatOptional();
}

exports.YGResolveValue = YGResolveValue;

function YGFlexDirectionIsColumn(flexDirection) {
  return flexDirection == enums_1.YGFlexDirection.Column || flexDirection == enums_1.YGFlexDirection.ColumnReverse;
}

exports.YGFlexDirectionIsColumn = YGFlexDirectionIsColumn;

function YGResolveFlexDirection(flexDirection, direction) {
  if (direction == enums_1.YGDirection.RTL) {
    if (flexDirection == enums_1.YGFlexDirection.Row) {
      return enums_1.YGFlexDirection.RowReverse;
    } else if (flexDirection == enums_1.YGFlexDirection.RowReverse) {
      return enums_1.YGFlexDirection.Row;
    }
  }

  return flexDirection;
}

exports.YGResolveFlexDirection = YGResolveFlexDirection;

function YGResolveValueMargin(value, ownerSize) {
  return value.unit == enums_1.YGUnit.Auto ? new ygfloatoptional_1.YGFloatOptional(0) : YGResolveValue(value, ownerSize);
}

exports.YGResolveValueMargin = YGResolveValueMargin;

function cloneYGValueArray(array) {
  var ret = new Array(array.length);

  for (var i = 0; i < array.length; i++) {
    ret[i] = array[i].clone();
  }

  return ret;
}

exports.cloneYGValueArray = cloneYGValueArray;

/***/ }),

/***/ "./typeflex/ygconfig.ts":
/*!******************************!*\
  !*** ./typeflex/ygconfig.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGConfig = void 0;

var kYGDefaultExperimentalFeatures = function kYGDefaultExperimentalFeatures() {
  return [false, false, false];
};

var YGConfig = function YGConfig(logger) {
  (0, _classCallCheck2.default)(this, YGConfig);
  this.cloneNodeCallback = null;
  this.experimentalFeatures = kYGDefaultExperimentalFeatures();
  this.useWebDefaults = false;
  this.useLegacyStretchBehaviour = false;
  this.shouldDiffLayoutWithoutLegacyStretchBehaviour = false;
  this.pointScaleFactor = 1.0;
  this.logger = logger;
  this.context = null;
};

exports.YGConfig = YGConfig;

/***/ }),

/***/ "./typeflex/ygfloatoptional.ts":
/*!*************************************!*\
  !*** ./typeflex/ygfloatoptional.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGFloatOptional = void 0;

var yoga_1 = __webpack_require__(/*! ./yoga */ "./typeflex/yoga.ts");

var YGFloatOptional = function () {
  function YGFloatOptional() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    (0, _classCallCheck2.default)(this, YGFloatOptional);

    if (value instanceof YGFloatOptional) {
      this.value_ = value.getValue();
      this.isUndefined_ = value.isUndefined();
      return;
    }

    if (yoga_1.YGFloatIsUndefined(value)) {
      this.value_ = 0;
      this.isUndefined_ = true;
    } else {
      this.value_ = value;
      this.isUndefined_ = false;
    }
  }

  (0, _createClass2.default)(YGFloatOptional, [{
    key: "clone",
    value: function clone() {
      return new YGFloatOptional(this.isUndefined_ ? undefined : this.value_);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.isUndefined_) {
        throw "Tried to get value of an undefined YGFloatOptional";
      }

      return this.value_;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.value_ = value;
      this.isUndefined_ = false;
    }
  }, {
    key: "isUndefined",
    value: function isUndefined() {
      return this.isUndefined_;
    }
  }, {
    key: "add",
    value: function add(op) {
      if (!this.isUndefined_ && !op.isUndefined()) {
        return new YGFloatOptional(this.value_ + op.getValue());
      }

      return new YGFloatOptional();
    }
  }, {
    key: "isBigger",
    value: function isBigger(op) {
      if (this.isUndefined_ || op.isUndefined()) {
        return false;
      }

      return this.value_ > op.getValue();
    }
  }, {
    key: "isSmaller",
    value: function isSmaller(op) {
      if (this.isUndefined_ || op.isUndefined()) {
        return false;
      }

      return this.value_ < op.getValue();
    }
  }, {
    key: "isBiggerEqual",
    value: function isBiggerEqual(op) {
      return this.isEqual(op) ? true : this.isBigger(op);
    }
  }, {
    key: "isSmallerEqual",
    value: function isSmallerEqual(op) {
      return this.isEqual(op) ? true : this.isSmaller(op);
    }
  }, {
    key: "isEqual",
    value: function isEqual(op) {
      if (this.isUndefined_ == op.isUndefined()) {
        return this.isUndefined_ ? true : this.value_ == op.getValue();
      }

      return false;
    }
  }, {
    key: "isDiff",
    value: function isDiff(op) {
      return !this.isEqual(op);
    }
  }, {
    key: "isEqualValue",
    value: function isEqualValue(val) {
      if (yoga_1.YGFloatIsUndefined(val) == this.isUndefined_) {
        return this.isUndefined_ || val == this.value_;
      }

      return false;
    }
  }, {
    key: "isDiffValue",
    value: function isDiffValue(val) {
      return !this.isEqualValue(val);
    }
  }]);
  return YGFloatOptional;
}();

exports.YGFloatOptional = YGFloatOptional;

/***/ }),

/***/ "./typeflex/yglayout.ts":
/*!******************************!*\
  !*** ./typeflex/yglayout.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGLayout = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var ygfloatoptional_1 = __webpack_require__(/*! ./ygfloatoptional */ "./typeflex/ygfloatoptional.ts");

var internal_1 = __webpack_require__(/*! ./internal */ "./typeflex/internal.ts");

var utils_1 = __webpack_require__(/*! ./utils */ "./typeflex/utils.ts");

var yoga_1 = __webpack_require__(/*! ./yoga */ "./typeflex/yoga.ts");

var kYGDefaultDimensionValues = function kYGDefaultDimensionValues() {
  return [undefined, undefined];
};

var YG_MAX_CACHED_RESULT_COUNT = 16;

function buildCache(c) {
  var ret = [];

  for (var i = 0; i < c; i++) {
    ret.push(new internal_1.YGCachedMeasurement());
  }

  return ret;
}

var YGLayout = function () {
  function YGLayout() {
    (0, _classCallCheck2.default)(this, YGLayout);
    this.dimensions = kYGDefaultDimensionValues();
    this.direction = enums_1.YGDirection.Inherit;
    this.computedFlexBasisGeneration = 0;
    this.computedFlexBasis = new ygfloatoptional_1.YGFloatOptional();
    this.hadOverflow = false;
    this.generationCount = 0;
    this.lastOwnerDirection = enums_1.YGDirection.RTL;
    this.nextCachedMeasurementsIndex = 0;
    this.measuredDimensions = kYGDefaultDimensionValues();
    this.cachedLayout = new internal_1.YGCachedMeasurement();
    this.didUseLegacyFlag = false;
    this.doesLegacyStretchFlagAffectsLayout = false;
    this.position = [undefined, undefined, undefined, undefined];
    this.margin = [undefined, undefined, undefined, undefined, undefined, undefined];
    this.border = [undefined, undefined, undefined, undefined, undefined, undefined];
    this.padding = [undefined, undefined, undefined, undefined, undefined, undefined];
    this.cachedMeasurements = buildCache(YG_MAX_CACHED_RESULT_COUNT);
  }

  (0, _createClass2.default)(YGLayout, [{
    key: "equal",
    value: function equal(layout) {
      var isEqual = utils_1.YGFloatArrayEqual(this.position, layout.position) && utils_1.YGFloatArrayEqual(this.dimensions, layout.dimensions) && utils_1.YGFloatArrayEqual(this.margin, layout.margin) && utils_1.YGFloatArrayEqual(this.border, layout.border) && utils_1.YGFloatArrayEqual(this.padding, layout.padding) && this.direction == layout.direction && this.hadOverflow == layout.hadOverflow && this.lastOwnerDirection == layout.lastOwnerDirection && this.nextCachedMeasurementsIndex == layout.nextCachedMeasurementsIndex && this.cachedLayout == layout.cachedLayout && this.computedFlexBasis == layout.computedFlexBasis;

      for (var i = 0; i < YG_MAX_CACHED_RESULT_COUNT && isEqual; ++i) {
        isEqual = isEqual && this.cachedMeasurements[i] == layout.cachedMeasurements[i];
      }

      if (!yoga_1.YGFloatIsUndefined(this.measuredDimensions[0]) || !yoga_1.YGFloatIsUndefined(layout.measuredDimensions[0])) {
        isEqual = isEqual && this.measuredDimensions[0] == layout.measuredDimensions[0];
      }

      if (!yoga_1.YGFloatIsUndefined(this.measuredDimensions[1]) || !yoga_1.YGFloatIsUndefined(layout.measuredDimensions[1])) {
        isEqual = isEqual && this.measuredDimensions[1] == layout.measuredDimensions[1];
      }

      return isEqual;
    }
  }, {
    key: "diff",
    value: function diff(layout) {
      return !this.equal(layout);
    }
  }, {
    key: "clean",
    value: function clean() {
      this.dimensions = kYGDefaultDimensionValues();
      this.direction = enums_1.YGDirection.Inherit;
      this.computedFlexBasisGeneration = 0;
      this.computedFlexBasis = new ygfloatoptional_1.YGFloatOptional();
      this.hadOverflow = false;
      this.generationCount = 0;
      this.lastOwnerDirection = enums_1.YGDirection.RTL;
      this.nextCachedMeasurementsIndex = 0;
      this.measuredDimensions = kYGDefaultDimensionValues();
      this.cachedLayout = new internal_1.YGCachedMeasurement();
      this.didUseLegacyFlag = false;
      this.doesLegacyStretchFlagAffectsLayout = false;
      this.position = [undefined, undefined, undefined, undefined];
      this.margin = [undefined, undefined, undefined, undefined, undefined, undefined];
      this.border = [undefined, undefined, undefined, undefined, undefined, undefined];
      this.padding = [undefined, undefined, undefined, undefined, undefined, undefined];
      this.cachedMeasurements = buildCache(YG_MAX_CACHED_RESULT_COUNT);
    }
  }, {
    key: "clone",
    value: function clone() {
      var newLayout = new YGLayout();
      newLayout.dimensions = [this.dimensions[0], this.dimensions[1]];
      newLayout.direction = this.direction;
      newLayout.computedFlexBasisGeneration = this.computedFlexBasisGeneration;
      newLayout.computedFlexBasis = this.computedFlexBasis.clone();
      newLayout.hadOverflow = this.hadOverflow;
      newLayout.generationCount = this.generationCount;
      newLayout.lastOwnerDirection = this.lastOwnerDirection;
      newLayout.nextCachedMeasurementsIndex = this.nextCachedMeasurementsIndex;
      newLayout.measuredDimensions = [this.measuredDimensions[0], this.measuredDimensions[1]];
      newLayout.cachedLayout = this.cachedLayout.clone();
      newLayout.didUseLegacyFlag = this.didUseLegacyFlag;
      newLayout.doesLegacyStretchFlagAffectsLayout = this.doesLegacyStretchFlagAffectsLayout;
      newLayout.position = [this.position[0], this.position[1], this.position[2], this.position[3]];
      newLayout.margin = [this.margin[0], this.margin[1], this.margin[2], this.margin[3], this.margin[4], this.margin[5]];
      newLayout.border = [this.border[0], this.border[1], this.border[2], this.border[3], this.border[4], this.border[5]];
      newLayout.padding = [this.padding[0], this.padding[1], this.padding[2], this.padding[3], this.padding[4], this.padding[5]];
      newLayout.cachedMeasurements = buildCache(YG_MAX_CACHED_RESULT_COUNT);
      return newLayout;
    }
  }]);
  return YGLayout;
}();

exports.YGLayout = YGLayout;

/***/ }),

/***/ "./typeflex/ygnode.ts":
/*!****************************!*\
  !*** ./typeflex/ygnode.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGNode = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var ygfloatoptional_1 = __webpack_require__(/*! ./ygfloatoptional */ "./typeflex/ygfloatoptional.ts");

var ygconfig_1 = __webpack_require__(/*! ./ygconfig */ "./typeflex/ygconfig.ts");

var utils_1 = __webpack_require__(/*! ./utils */ "./typeflex/utils.ts");

var yglayout_1 = __webpack_require__(/*! ./yglayout */ "./typeflex/yglayout.ts");

var ygstyle_1 = __webpack_require__(/*! ./ygstyle */ "./typeflex/ygstyle.ts");

var internal_1 = __webpack_require__(/*! ./internal */ "./typeflex/internal.ts");

var yoga_1 = __webpack_require__(/*! ./yoga */ "./typeflex/yoga.ts");

var YGNode = function () {
  function YGNode() {
    var contextOrNodeOrConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var print = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var hasNewLayout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var nodeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : enums_1.YGNodeType.Default;
    var measure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var baseline = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var dirtied = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var style = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new ygstyle_1.YGStyle();
    var layout = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : new yglayout_1.YGLayout();
    var lineIndex = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var owner = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
    var children = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [];
    var config = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : null;
    var isDirty = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
    var resolvedDimensions = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : [yoga_1.YGValueUndefined(), yoga_1.YGValueUndefined()];
    (0, _classCallCheck2.default)(this, YGNode);

    if (contextOrNodeOrConfig instanceof YGNode) {
      console.log('from node');
      this.fromNode(contextOrNodeOrConfig);
      return;
    }

    this.print_ = print;
    this.hasNewLayout_ = hasNewLayout;
    this.nodeType_ = nodeType;
    this.measure_ = measure;
    this.baseline_ = baseline;
    this.dirtied_ = dirtied;
    this.style_ = style;
    this.layout_ = layout;
    this.lineIndex_ = lineIndex;
    this.owner_ = owner;
    this.children_ = children;
    this.config_ = config;
    this.isDirty_ = isDirty;
    this.resolvedDimensions_ = resolvedDimensions;

    if (contextOrNodeOrConfig instanceof ygconfig_1.YGConfig) {
      this.config_ = contextOrNodeOrConfig;
      this.context_ = null;
    } else {
      this.context_ = contextOrNodeOrConfig;
    }
  }

  (0, _createClass2.default)(YGNode, [{
    key: "relativePosition",
    value: function relativePosition(axis, axisSize) {
      if (this.isLeadingPositionDefined(axis)) {
        return this.getLeadingPosition(axis, axisSize);
      }

      var trailingPosition = this.getTrailingPosition(axis, axisSize);

      if (!trailingPosition.isUndefined()) {
        trailingPosition.setValue(-1 * trailingPosition.getValue());
      }

      return trailingPosition;
    }
  }, {
    key: "operatorAtrib",
    value: function operatorAtrib(node) {
      if (node == this) {
        return this;
      }

      this.clearChildren();
      this.fromNode(node);
      return this;
    }
  }, {
    key: "fromNode",
    value: function fromNode(node) {
      console.log(node);
      this.context_ = node.context_;
      this.print_ = node.print_;
      this.hasNewLayout_ = node.hasNewLayout_;
      this.nodeType_ = node.nodeType_;
      this.measure_ = node.measure_;
      this.baseline_ = node.baseline_;
      this.dirtied_ = node.dirtied_;
      this.style_ = node.style_;
      this.layout_ = node.layout_;
      this.lineIndex_ = node.lineIndex_;
      this.owner_ = node.owner_;
      this.children_ = node.children_;
      this.config_ = node.config_;
      this.isDirty_ = node.isDirty_;
      this.resolvedDimensions_ = node.resolvedDimensions_;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.context_;
    }
  }, {
    key: "getPrintFunc",
    value: function getPrintFunc() {
      return this.print_;
    }
  }, {
    key: "getHasNewLayout",
    value: function getHasNewLayout() {
      return this.hasNewLayout_;
    }
  }, {
    key: "getNodeType",
    value: function getNodeType() {
      return this.nodeType_;
    }
  }, {
    key: "getMeasure",
    value: function getMeasure() {
      return this.measure_;
    }
  }, {
    key: "getBaseline",
    value: function getBaseline() {
      return this.baseline_;
    }
  }, {
    key: "getDirtied",
    value: function getDirtied() {
      return this.dirtied_;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      return this.style_;
    }
  }, {
    key: "getLayout",
    value: function getLayout() {
      return this.layout_;
    }
  }, {
    key: "getLineIndex",
    value: function getLineIndex() {
      return this.lineIndex_;
    }
  }, {
    key: "getOwner",
    value: function getOwner() {
      return this.owner_;
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this.getOwner();
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      return this.children_;
    }
  }, {
    key: "getChildrenCount",
    value: function getChildrenCount() {
      return this.children_.length;
    }
  }, {
    key: "getChild",
    value: function getChild(index) {
      return this.children_[index];
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this.config_;
    }
  }, {
    key: "isDirty",
    value: function isDirty() {
      return this.isDirty_;
    }
  }, {
    key: "getResolvedDimensions",
    value: function getResolvedDimensions() {
      return this.resolvedDimensions_;
    }
  }, {
    key: "getResolvedDimension",
    value: function getResolvedDimension(index) {
      return this.resolvedDimensions_[index];
    }
  }, {
    key: "getLeadingPosition",
    value: function getLeadingPosition(axis, axisSize) {
      if (utils_1.YGFlexDirectionIsRow(axis)) {
        var _leadingPosition = yoga_1.YGComputedEdgeValue(this.style_.position, enums_1.YGEdge.Start, yoga_1.YGValueUndefined());

        if (_leadingPosition.unit != enums_1.YGUnit.Undefined) {
          return utils_1.YGResolveValue(_leadingPosition, axisSize);
        }
      }

      var leadingPosition = yoga_1.YGComputedEdgeValue(this.style_.position, internal_1.leading[axis], yoga_1.YGValueUndefined());
      return leadingPosition.unit == enums_1.YGUnit.Undefined ? new ygfloatoptional_1.YGFloatOptional(0) : utils_1.YGResolveValue(leadingPosition, axisSize);
    }
  }, {
    key: "isLeadingPositionDefined",
    value: function isLeadingPositionDefined(axis) {
      return utils_1.YGFlexDirectionIsRow(axis) && yoga_1.YGComputedEdgeValue(this.style_.position, enums_1.YGEdge.Start, yoga_1.YGValueUndefined()).unit != enums_1.YGUnit.Undefined || yoga_1.YGComputedEdgeValue(this.style_.position, internal_1.leading[axis], yoga_1.YGValueUndefined()).unit != enums_1.YGUnit.Undefined;
    }
  }, {
    key: "isTrailingPosDefined",
    value: function isTrailingPosDefined(axis) {
      return utils_1.YGFlexDirectionIsRow(axis) && yoga_1.YGComputedEdgeValue(this.style_.position, enums_1.YGEdge.End, yoga_1.YGValueUndefined()).unit != enums_1.YGUnit.Undefined || yoga_1.YGComputedEdgeValue(this.style_.position, internal_1.trailing[axis], yoga_1.YGValueUndefined()).unit != enums_1.YGUnit.Undefined;
    }
  }, {
    key: "getTrailingPosition",
    value: function getTrailingPosition(axis, axisSize) {
      if (utils_1.YGFlexDirectionIsRow(axis)) {
        var _trailingPosition = yoga_1.YGComputedEdgeValue(this.style_.position, enums_1.YGEdge.End, yoga_1.YGValueUndefined());

        if (_trailingPosition.unit != enums_1.YGUnit.Undefined) {
          return utils_1.YGResolveValue(_trailingPosition, axisSize);
        }
      }

      var trailingPosition = yoga_1.YGComputedEdgeValue(this.style_.position, internal_1.trailing[axis], yoga_1.YGValueUndefined());
      return trailingPosition.unit == enums_1.YGUnit.Undefined ? new ygfloatoptional_1.YGFloatOptional(0) : utils_1.YGResolveValue(trailingPosition, axisSize);
    }
  }, {
    key: "getLeadingMargin",
    value: function getLeadingMargin(axis, widthSize) {
      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_1.YGEdge.Start].unit != enums_1.YGUnit.Undefined) {
        return utils_1.YGResolveValueMargin(this.style_.margin[enums_1.YGEdge.Start], widthSize);
      }

      return utils_1.YGResolveValueMargin(yoga_1.YGComputedEdgeValue(this.style_.margin, internal_1.leading[axis], yoga_1.YGValueZero()), widthSize);
    }
  }, {
    key: "getTrailingMargin",
    value: function getTrailingMargin(axis, widthSize) {
      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_1.YGEdge.End].unit != enums_1.YGUnit.Undefined) {
        return utils_1.YGResolveValueMargin(this.style_.margin[enums_1.YGEdge.End], widthSize);
      }

      return utils_1.YGResolveValueMargin(yoga_1.YGComputedEdgeValue(this.style_.margin, internal_1.trailing[axis], yoga_1.YGValueZero()), widthSize);
    }
  }, {
    key: "getLeadingBorder",
    value: function getLeadingBorder(axis) {
      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.border[enums_1.YGEdge.Start].unit != enums_1.YGUnit.Undefined && !yoga_1.YGFloatIsUndefined(this.style_.border[enums_1.YGEdge.Start].value) && this.style_.border[enums_1.YGEdge.Start].value >= 0.0) {
        return this.style_.border[enums_1.YGEdge.Start].value;
      }

      var computedEdgeValue = yoga_1.YGComputedEdgeValue(this.style_.border, internal_1.leading[axis], yoga_1.YGValueZero()).value;
      return utils_1.YGFloatMax(computedEdgeValue, 0.0);
    }
  }, {
    key: "getTrailingBorder",
    value: function getTrailingBorder(axis) {
      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.border[enums_1.YGEdge.End].unit != enums_1.YGUnit.Undefined && !yoga_1.YGFloatIsUndefined(this.style_.border[enums_1.YGEdge.End].value) && this.style_.border[enums_1.YGEdge.End].value >= 0.0) {
        return this.style_.border[enums_1.YGEdge.End].value;
      }

      var computedEdgeValue = yoga_1.YGComputedEdgeValue(this.style_.border, internal_1.trailing[axis], yoga_1.YGValueZero()).value;
      return utils_1.YGFloatMax(computedEdgeValue, 0.0);
    }
  }, {
    key: "getLeadingPadding",
    value: function getLeadingPadding(axis, widthSize) {
      var paddingEdgeStart = utils_1.YGResolveValue(this.style_.padding[enums_1.YGEdge.Start], widthSize);

      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.padding[enums_1.YGEdge.Start].unit != enums_1.YGUnit.Undefined && !paddingEdgeStart.isUndefined() && paddingEdgeStart.getValue() > 0.0) {
        return paddingEdgeStart;
      }

      var resolvedValue = utils_1.YGResolveValue(yoga_1.YGComputedEdgeValue(this.style_.padding, internal_1.leading[axis], yoga_1.YGValueZero()), widthSize);
      return utils_1.YGFloatOptionalMax(resolvedValue, new ygfloatoptional_1.YGFloatOptional(0.0));
    }
  }, {
    key: "getTrailingPadding",
    value: function getTrailingPadding(axis, widthSize) {
      var paddingEdgeEnd = utils_1.YGResolveValue(this.style_.padding[enums_1.YGEdge.End], widthSize);

      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.padding[enums_1.YGEdge.End].unit != enums_1.YGUnit.Undefined && !paddingEdgeEnd.isUndefined() && paddingEdgeEnd.getValue() >= 0.0) {
        return paddingEdgeEnd;
      }

      var resolvedValue = utils_1.YGResolveValue(yoga_1.YGComputedEdgeValue(this.style_.padding, internal_1.trailing[axis], yoga_1.YGValueZero()), widthSize);
      return utils_1.YGFloatOptionalMax(resolvedValue, new ygfloatoptional_1.YGFloatOptional(0.0));
    }
  }, {
    key: "getLeadingPaddingAndBorder",
    value: function getLeadingPaddingAndBorder(axis, widthSize) {
      return this.getLeadingPadding(axis, widthSize).add(new ygfloatoptional_1.YGFloatOptional(this.getLeadingBorder(axis)));
    }
  }, {
    key: "getTrailingPaddingAndBorder",
    value: function getTrailingPaddingAndBorder(axis, widthSize) {
      return this.getTrailingPadding(axis, widthSize).add(new ygfloatoptional_1.YGFloatOptional(this.getTrailingBorder(axis)));
    }
  }, {
    key: "getMarginForAxis",
    value: function getMarginForAxis(axis, widthSize) {
      return this.getLeadingMargin(axis, widthSize).add(this.getTrailingMargin(axis, widthSize));
    }
  }, {
    key: "setContext",
    value: function setContext(context) {
      this.context_ = context;
    }
  }, {
    key: "setPrintFunc",
    value: function setPrintFunc(printFunc) {
      this.print_ = printFunc;
    }
  }, {
    key: "setHasNewLayout",
    value: function setHasNewLayout(hasNewLayout) {
      this.hasNewLayout_ = hasNewLayout;
    }
  }, {
    key: "setNodeType",
    value: function setNodeType(nodeType) {
      this.nodeType_ = nodeType;
    }
  }, {
    key: "setMeasureFunc",
    value: function setMeasureFunc(measureFunc) {
      if (measureFunc == null) {
        this.measure_ = null;
        this.nodeType_ = enums_1.YGNodeType.Default;
      } else {
        if (this.children_.length != 0) {
          console.error("Cannot set measure function: Nodes with measure functions cannot have children.");
        }

        this.measure_ = measureFunc;
        this.setNodeType(enums_1.YGNodeType.Text);
      }

      this.measure_ = measureFunc;
    }
  }, {
    key: "setBaseLineFunc",
    value: function setBaseLineFunc(baseLineFunc) {
      this.baseline_ = baseLineFunc;
    }
  }, {
    key: "setDirtiedFunc",
    value: function setDirtiedFunc(dirtiedFunc) {
      this.dirtied_ = dirtiedFunc;
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      this.style_ = style;
    }
  }, {
    key: "setStyleFlexDirection",
    value: function setStyleFlexDirection(direction) {
      this.style_.flexDirection = direction;
    }
  }, {
    key: "setStyleAlignContent",
    value: function setStyleAlignContent(alignContent) {
      this.style_.alignContent = alignContent;
    }
  }, {
    key: "setLayout",
    value: function setLayout(layout) {
      this.layout_ = layout;
    }
  }, {
    key: "setLineIndex",
    value: function setLineIndex(lineIndex) {
      this.lineIndex_ = lineIndex;
    }
  }, {
    key: "setOwner",
    value: function setOwner(owner) {
      this.owner_ = owner;
    }
  }, {
    key: "setChildren",
    value: function setChildren(children) {
      this.children_ = children;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this.config_ = config;
    }
  }, {
    key: "setDirty",
    value: function setDirty(isDirty) {
      this.isDirty_ = isDirty;
    }
  }, {
    key: "setLayoutLastOwnerDirection",
    value: function setLayoutLastOwnerDirection(direction) {
      this.layout_.lastOwnerDirection = direction;
    }
  }, {
    key: "setLayoutComputedFlexBasis",
    value: function setLayoutComputedFlexBasis(computedFlexBasis) {
      this.layout_.computedFlexBasis = computedFlexBasis;
    }
  }, {
    key: "setLayoutComputedFlexBasisGeneration",
    value: function setLayoutComputedFlexBasisGeneration(computedFlexBasisGeneration) {
      this.layout_.computedFlexBasisGeneration = computedFlexBasisGeneration;
    }
  }, {
    key: "setLayoutMeasuredDimension",
    value: function setLayoutMeasuredDimension(measuredDimension, index) {
      this.layout_.measuredDimensions[index] = measuredDimension;
    }
  }, {
    key: "setLayoutHadOverflow",
    value: function setLayoutHadOverflow(hadOverflow) {
      this.layout_.hadOverflow = hadOverflow;
    }
  }, {
    key: "setLayoutDimension",
    value: function setLayoutDimension(dimension, index) {
      this.layout_.dimensions[index] = dimension;
    }
  }, {
    key: "setLayoutDirection",
    value: function setLayoutDirection(direction) {
      this.layout_.direction = direction;
    }
  }, {
    key: "setLayoutMargin",
    value: function setLayoutMargin(margin, index) {
      this.layout_.margin[index] = margin;
    }
  }, {
    key: "setLayoutBorder",
    value: function setLayoutBorder(border, index) {
      this.layout_.border[index] = border;
    }
  }, {
    key: "setLayoutPadding",
    value: function setLayoutPadding(padding, index) {
      this.layout_.padding[index] = padding;
    }
  }, {
    key: "setLayoutPosition",
    value: function setLayoutPosition(position, index) {
      this.layout_.position[index] = position;
    }
  }, {
    key: "setPosition",
    value: function setPosition(direction, mainSize, crossSize, ownerWidth) {
      var directionRespectingRoot = this.owner_ != null ? direction : enums_1.YGDirection.LTR;
      var mainAxis = utils_1.YGResolveFlexDirection(this.style_.flexDirection, directionRespectingRoot);
      var crossAxis = utils_1.YGFlexDirectionCross(mainAxis, directionRespectingRoot);
      var relativePositionMain = this.relativePosition(mainAxis, mainSize);
      var relativePositionCross = this.relativePosition(crossAxis, crossSize);
      this.setLayoutPosition(utils_1.YGUnwrapFloatOptional(this.getLeadingMargin(mainAxis, ownerWidth).add(relativePositionMain)), internal_1.leading[mainAxis]);
      this.setLayoutPosition(utils_1.YGUnwrapFloatOptional(this.getTrailingMargin(mainAxis, ownerWidth).add(relativePositionMain)), internal_1.trailing[mainAxis]);
      this.setLayoutPosition(utils_1.YGUnwrapFloatOptional(this.getLeadingMargin(crossAxis, ownerWidth).add(relativePositionCross)), internal_1.leading[crossAxis]);
      this.setLayoutPosition(utils_1.YGUnwrapFloatOptional(this.getTrailingMargin(crossAxis, ownerWidth).add(relativePositionCross)), internal_1.trailing[crossAxis]);
    }
  }, {
    key: "setAndPropogateUseLegacyFlag",
    value: function setAndPropogateUseLegacyFlag(useLegacyFlag) {
      this.config_.useLegacyStretchBehaviour = useLegacyFlag;

      for (var i = 0; i < this.children_.length; i++) {
        this.children_[i].getConfig().useLegacyStretchBehaviour = useLegacyFlag;
      }
    }
  }, {
    key: "setLayoutDoesLegacyFlagAffectsLayout",
    value: function setLayoutDoesLegacyFlagAffectsLayout(doesLegacyFlagAffectsLayout) {
      this.layout_.doesLegacyStretchFlagAffectsLayout = doesLegacyFlagAffectsLayout;
    }
  }, {
    key: "setLayoutDidUseLegacyFlag",
    value: function setLayoutDidUseLegacyFlag(didUseLegacyFlag) {
      this.layout_.didUseLegacyFlag = didUseLegacyFlag;
    }
  }, {
    key: "markDirtyAndPropogateDownwards",
    value: function markDirtyAndPropogateDownwards() {
      this.isDirty_ = true;

      for (var i = 0; i < this.children_.length; i++) {
        this.children_[i].markDirtyAndPropogateDownwards();
      }
    }
  }, {
    key: "marginLeadingValue",
    value: function marginLeadingValue(axis) {
      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_1.YGEdge.Start].unit != enums_1.YGUnit.Undefined) {
        return this.style_.margin[enums_1.YGEdge.Start];
      } else {
        return this.style_.margin[internal_1.leading[axis]];
      }
    }
  }, {
    key: "marginTrailingValue",
    value: function marginTrailingValue(axis) {
      if (utils_1.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_1.YGEdge.End].unit != enums_1.YGUnit.Undefined) {
        return this.style_.margin[enums_1.YGEdge.End];
      } else {
        return this.style_.margin[internal_1.trailing[axis]];
      }
    }
  }, {
    key: "resolveFlexBasisPtr",
    value: function resolveFlexBasisPtr() {
      var flexBasis = this.style_.flexBasis;

      if (flexBasis.unit != enums_1.YGUnit.Auto && flexBasis.unit != enums_1.YGUnit.Undefined) {
        return flexBasis;
      }

      if (!this.style_.flex.isUndefined() && this.style_.flex.getValue() > 0.0) {
        return this.config_.useWebDefaults ? yoga_1.YGValueAuto() : yoga_1.YGValueZero();
      }

      return yoga_1.YGValueAuto();
    }
  }, {
    key: "resolveDimension",
    value: function resolveDimension() {
      for (var dim = enums_1.YGDimension.Width; dim < enums_1.YGDimensionCount; ++dim) {
        if (this.style_.maxDimensions[dim].unit != enums_1.YGUnit.Undefined && utils_1.YGValueEqual(this.style_.maxDimensions[dim], this.style_.minDimensions[dim])) {
          this.resolvedDimensions_[dim] = this.style_.maxDimensions[dim];
        } else {
          this.resolvedDimensions_[dim] = this.style_.dimensions[dim];
        }
      }
    }
  }, {
    key: "resolveDirection",
    value: function resolveDirection(ownerDirection) {
      if (this.style_.direction == enums_1.YGDirection.Inherit) {
        return ownerDirection > enums_1.YGDirection.Inherit ? ownerDirection : enums_1.YGDirection.LTR;
      } else {
        return this.style_.direction;
      }
    }
  }, {
    key: "clearChildren",
    value: function clearChildren() {
      while (this.children_.length > 0) {
        this.children_.pop();
      }
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(oldChild, newChild) {
      var index = this.children_.indexOf(oldChild);

      if (index >= 0) {
        this.children_[index] = newChild;
      }
    }
  }, {
    key: "replaceChildIndex",
    value: function replaceChildIndex(child, index) {
      this.children_[index] = child;
    }
  }, {
    key: "insertChildIndex",
    value: function insertChildIndex(child, index) {
      this.children_.splice(index, 0, child);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var index = this.children_.indexOf(child);

      if (index >= 0) {
        this.children_.splice(index, 1);
        return true;
      }

      return false;
    }
  }, {
    key: "removeChildIndex",
    value: function removeChildIndex(index) {
      this.children_.splice(index, 1);
    }
  }, {
    key: "cloneChildrenIfNeeded",
    value: function cloneChildrenIfNeeded() {
      var childCount = this.children_.length;

      if (childCount == 0) {
        return;
      }

      var firstChild = this.children_[0];

      if (firstChild.getOwner() == this) {
        return;
      }

      var cloneNodeCallback = this.config_.cloneNodeCallback;

      for (var i = 0; i < childCount; ++i) {
        var oldChild = this.children_[i];
        var newChild = null;

        if (cloneNodeCallback) {
          newChild = cloneNodeCallback(oldChild, this, i);
        }

        if (newChild == null) {
          newChild = yoga_1.YGNodeClone(oldChild);
        }

        this.replaceChildIndex(newChild, i);
        newChild.setOwner(this);
      }
    }
  }, {
    key: "markDirtyAndPropogate",
    value: function markDirtyAndPropogate() {
      if (!this.isDirty_) {
        this.setDirty(true);
        this.setLayoutComputedFlexBasis(new ygfloatoptional_1.YGFloatOptional());

        if (this.owner_) {
          this.owner_.markDirtyAndPropogate();
        }
      }
    }
  }, {
    key: "resolveFlexGrow",
    value: function resolveFlexGrow() {
      if (this.owner_ == null) {
        return 0.0;
      }

      if (!this.style_.flexGrow.isUndefined()) {
        return this.style_.flexGrow.getValue();
      }

      if (!this.style_.flex.isUndefined() && this.style_.flex.getValue() > 0.0) {
        return this.style_.flex.getValue();
      }

      return internal_1.kDefaultFlexGrow;
    }
  }, {
    key: "resolveFlexShrink",
    value: function resolveFlexShrink() {
      if (this.owner_ == null) {
        return 0.0;
      }

      if (!this.style_.flexShrink.isUndefined()) {
        return this.style_.flexShrink.getValue();
      }

      if (!this.config_.useWebDefaults && !this.style_.flex.isUndefined() && this.style_.flex.getValue() < 0.0) {
        return -this.style_.flex.getValue();
      }

      return this.config_.useWebDefaults ? internal_1.kWebDefaultFlexShrink : internal_1.kDefaultFlexShrink;
    }
  }, {
    key: "isNodeFlexible",
    value: function isNodeFlexible() {
      return this.style_.positionType == enums_1.YGPositionType.Relative && (this.resolveFlexGrow() != 0 || this.resolveFlexShrink() != 0);
    }
  }, {
    key: "didUseLegacyFlag",
    value: function didUseLegacyFlag() {
      var didUseLegacyFlag = this.layout_.didUseLegacyFlag;

      if (didUseLegacyFlag) {
        return true;
      }

      for (var i = 0; i < this.children_.length; i++) {
        if (this.children_[i].getLayout().didUseLegacyFlag) {
          didUseLegacyFlag = true;
          break;
        }
      }

      return didUseLegacyFlag;
    }
  }, {
    key: "isLayoutTreeEqualToNode",
    value: function isLayoutTreeEqualToNode(node) {
      if (this.children_.length != node.getChildren().length) {
        return false;
      }

      if (this.layout_.diff(node.getLayout())) {
        return false;
      }

      if (this.children_.length == 0) {
        return true;
      }

      var isLayoutTreeEqual = true;

      for (var i = 0; i < this.children_.length; ++i) {
        var otherNodeChildren = node.getChild(i);
        isLayoutTreeEqual = this.children_[i].isLayoutTreeEqualToNode(otherNodeChildren);

        if (!isLayoutTreeEqual) {
          return false;
        }
      }

      return isLayoutTreeEqual;
    }
  }]);
  return YGNode;
}();

exports.YGNode = YGNode;

/***/ }),

/***/ "./typeflex/ygstyle.ts":
/*!*****************************!*\
  !*** ./typeflex/ygstyle.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGStyle = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var utils_1 = __webpack_require__(/*! ./utils */ "./typeflex/utils.ts");

var ygvalue_1 = __webpack_require__(/*! ./ygvalue */ "./typeflex/ygvalue.ts");

var ygfloatoptional_1 = __webpack_require__(/*! ./ygfloatoptional */ "./typeflex/ygfloatoptional.ts");

var kYGValueUndefined = function kYGValueUndefined() {
  return new ygvalue_1.YGValue(0, enums_1.YGUnit.Undefined);
};

var kYGValueAuto = function kYGValueAuto() {
  return new ygvalue_1.YGValue(0, enums_1.YGUnit.Auto);
};

var kYGDefaultEdgeValuesUnit = function kYGDefaultEdgeValuesUnit() {
  return [kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined(), kYGValueUndefined()];
};

var kYGDefaultDimensionValuesAutoUnit = function kYGDefaultDimensionValuesAutoUnit() {
  return [kYGValueAuto(), kYGValueAuto()];
};

var kYGDefaultDimensionValuesUnit = function kYGDefaultDimensionValuesUnit() {
  return [kYGValueUndefined(), kYGValueUndefined()];
};

var YGStyle = function () {
  function YGStyle() {
    (0, _classCallCheck2.default)(this, YGStyle);
    this.margin = new Array(enums_1.YGEdgeCount);
    this.position = new Array(enums_1.YGEdgeCount);
    this.padding = new Array(enums_1.YGEdgeCount);
    this.border = new Array(enums_1.YGEdgeCount);
    this.direction = enums_1.YGDirection.Inherit;
    this.flexDirection = enums_1.YGFlexDirection.Row;
    this.justifyContent = enums_1.YGJustify.FlexStart;
    this.alignContent = enums_1.YGAlign.FlexStart;
    this.alignItems = enums_1.YGAlign.Stretch;
    this.alignSelf = enums_1.YGAlign.Auto;
    this.positionType = enums_1.YGPositionType.Relative;
    this.flexWrap = enums_1.YGWrap.NoWrap;
    this.overflow = enums_1.YGOverflow.Visible;
    this.display = enums_1.YGDisplay.Flex;
    this.flex = new ygfloatoptional_1.YGFloatOptional();
    this.flexGrow = new ygfloatoptional_1.YGFloatOptional();
    this.flexShrink = new ygfloatoptional_1.YGFloatOptional();
    this.flexBasis = kYGValueAuto();
    this.margin = kYGDefaultEdgeValuesUnit();
    this.position = kYGDefaultEdgeValuesUnit();
    this.padding = kYGDefaultEdgeValuesUnit();
    this.border = kYGDefaultEdgeValuesUnit();
    this.dimensions = kYGDefaultDimensionValuesAutoUnit();
    this.minDimensions = kYGDefaultDimensionValuesUnit();
    this.maxDimensions = kYGDefaultDimensionValuesUnit();
    this.aspectRatio = new ygfloatoptional_1.YGFloatOptional();
  }

  (0, _createClass2.default)(YGStyle, [{
    key: "isEqual",
    value: function isEqual(style) {
      var areNonFloatValuesEqual = this.direction == style.direction && this.flexDirection == style.flexDirection && this.justifyContent == style.justifyContent && this.alignContent == style.alignContent && this.alignItems == style.alignItems && this.alignSelf == style.alignSelf && this.positionType == style.positionType && this.flexWrap == style.flexWrap && this.overflow == style.overflow && this.display == style.display && utils_1.YGValueEqual(this.flexBasis, style.flexBasis) && utils_1.YGValueArrayEqual(this.margin, style.margin) && utils_1.YGValueArrayEqual(this.position, style.position) && utils_1.YGValueArrayEqual(this.padding, style.padding) && utils_1.YGValueArrayEqual(this.border, style.border) && utils_1.YGValueArrayEqual(this.dimensions, style.dimensions) && utils_1.YGValueArrayEqual(this.minDimensions, style.minDimensions) && utils_1.YGValueArrayEqual(this.maxDimensions, style.maxDimensions);
      areNonFloatValuesEqual = areNonFloatValuesEqual && this.flex.isUndefined() == style.flex.isUndefined();

      if (areNonFloatValuesEqual && !this.flex.isUndefined() && !style.flex.isUndefined()) {
        areNonFloatValuesEqual = areNonFloatValuesEqual && this.flex.getValue() == style.flex.getValue();
      }

      areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexGrow.isUndefined() == style.flexGrow.isUndefined();

      if (areNonFloatValuesEqual && !this.flexGrow.isUndefined()) {
        areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexGrow.getValue() == style.flexGrow.getValue();
      }

      areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexShrink.isUndefined() == style.flexShrink.isUndefined();

      if (areNonFloatValuesEqual && !style.flexShrink.isUndefined()) {
        areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexShrink.getValue() == style.flexShrink.getValue();
      }

      if (!(this.aspectRatio.isUndefined() && style.aspectRatio.isUndefined())) {
        areNonFloatValuesEqual = areNonFloatValuesEqual && this.aspectRatio.getValue() == style.aspectRatio.getValue();
      }

      return areNonFloatValuesEqual;
    }
  }, {
    key: "isDiff",
    value: function isDiff(style) {
      return !this.isEqual(style);
    }
  }, {
    key: "clone",
    value: function clone() {
      var newStyle = new YGStyle();
      newStyle.direction = this.direction;
      newStyle.flexDirection = this.flexDirection;
      newStyle.justifyContent = this.justifyContent;
      newStyle.alignContent = this.alignContent;
      newStyle.alignItems = this.alignItems;
      newStyle.alignSelf = this.alignSelf;
      newStyle.positionType = this.positionType;
      newStyle.flexWrap = this.flexWrap;
      newStyle.overflow = this.overflow;
      newStyle.display = this.display;
      newStyle.flex = this.flex.clone();
      newStyle.flexGrow = this.flexGrow.clone();
      newStyle.flexShrink = this.flexShrink.clone();
      newStyle.flexBasis = this.flexBasis.clone();
      newStyle.margin = utils_1.cloneYGValueArray(this.margin);
      newStyle.position = utils_1.cloneYGValueArray(this.position);
      newStyle.padding = utils_1.cloneYGValueArray(this.padding);
      newStyle.border = utils_1.cloneYGValueArray(this.border);
      newStyle.dimensions = [this.dimensions[0].clone(), this.dimensions[1].clone()];
      newStyle.minDimensions = [this.minDimensions[0].clone(), this.minDimensions[1].clone()];
      newStyle.maxDimensions = [this.maxDimensions[0].clone(), this.maxDimensions[1].clone()];
      newStyle.aspectRatio = this.aspectRatio.clone();
      return newStyle;
    }
  }]);
  return YGStyle;
}();

exports.YGStyle = YGStyle;

/***/ }),

/***/ "./typeflex/ygvalue.ts":
/*!*****************************!*\
  !*** ./typeflex/ygvalue.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGValue = void 0;

var YGValue = function () {
  function YGValue(value, unit) {
    (0, _classCallCheck2.default)(this, YGValue);
    this.value = value;
    this.unit = unit;
  }

  (0, _createClass2.default)(YGValue, [{
    key: "clone",
    value: function clone() {
      return new YGValue(this.value, this.unit);
    }
  }]);
  return YGValue;
}();

exports.YGValue = YGValue;

/***/ }),

/***/ "./typeflex/yoga.ts":
/*!**************************!*\
  !*** ./typeflex/yoga.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../node_modules/@babel/runtime/helpers/extends.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YGTraversePreOrder = exports.YGTraverseChildrenPreOrder = exports.YGConfigSetCloneNodeFunc = exports.YGConfigGetContext = exports.YGConfigSetContext = exports.YGConfigGetUseWebDefaults = exports.YGConfigSetUseLegacyStretchBehaviour = exports.YGConfigSetUseWebDefaults = exports.YGConfigIsExperimentalFeatureEnabled = exports.YGConfigSetExperimentalFeatureEnabled = exports.YGAssertWithConfig = exports.YGAssertWithNode = exports.YGAssert = exports.YGLog = exports.YGLogWithConfig = exports.YGVLog = exports.YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour = exports.YGConfigSetLogger = exports.YGNodeCalculateLayout = exports.YGRoundToPixelGrid = exports.YGConfigSetPointScaleFactor = exports.YGLayoutNodeInternal = exports.YGNodeCanUseCachedMeasurement = exports.YGRoundValueToPixelGrid = exports.YGMeasureModeNewMeasureSizeIsStricterAndStillValid = exports.YGMeasureModeOldSizeIsUnspecifiedAndStillFits = exports.YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize = exports.YGMeasureModeName = exports.YGSpacer = exports.YGNodelayoutImpl = exports.YGJustifyMainAxis = exports.YGResolveFlexibleLength = exports.YGDistributeFreeSpaceFirstPass = exports.YGDistributeFreeSpaceSecondPass = exports.YGCalculateCollectFlexItemsRowValues = exports.YGNodeComputeFlexBasisForChildren = exports.YGNodeCalculateAvailableInnerDim = exports.YGZeroOutLayoutRecursivly = exports.YGNodeFixedSizeSetMeasuredDimensions = exports.YGNodeEmptyContainerSetMeasuredDimensions = exports.YGNodeWithMeasureFuncSetMeasuredDimensions = exports.YGNodeAbsoluteLayoutChild = exports.YGNodeComputeFlexBasisForChild = exports.YGConstrainMaxSizeForMode = exports.YGNodeSetChildTrailingPosition = exports.YGNodeBoundAxis = exports.YGNodeBoundAxisWithinMinAndMax = exports.YGNodeIsLayoutDimDefined = exports.YGNodeIsStyleDimDefined = exports.YGNodeDimWithMargin = exports.YGIsBaselineLayout = exports.YGBaseline = exports.YGNodeAlignItem = exports.YGNodePaddingAndBorderForAxis = exports.YGNodePrint = exports.YGNodePrintInternal = exports.YGNodeLayoutGetDidLegacyStretchFlagAffectLayout = exports.YGNodeStyleSetAspectRatio = exports.YGNodeStyleGetAspectRatio = exports.YGNodeStyleGetBorder = exports.YGNodeStyleSetBorder = exports.YGNodeStyleSetFlexBasisAuto = exports.YGNodeStyleSetFlexBasisPercent = exports.YGNodeStyleSetFlexBasis = exports.YGNodeStyleGetFlexBasis = exports.YGNodeStyleSetFlexShrink = exports.YGNodeStyleSetFlexGrow = exports.YGNodeStyleGetFlex = exports.YGNodeStyleSetFlex = exports.YGNodeLayoutGetPadding = exports.YGNodeLayoutGetBorder = exports.YGNodeLayoutGetMargin = exports.YGNodeLayoutGetHadOverflow = exports.YGNodeLayoutGetDirection = exports.YGNodeLayoutGetHeight = exports.YGNodeLayoutGetWidth = exports.YGNodeLayoutGetBottom = exports.YGNodeLayoutGetRight = exports.YGNodeLayoutGetTop = exports.YGNodeLayoutGetLeft = exports.YGNodeStyleGetMaxHeight = exports.YGNodeStyleSetMaxHeightPercent = exports.YGNodeStyleSetMaxHeight = exports.YGNodeStyleGetMaxWidth = exports.YGNodeStyleSetMaxWidthPercent = exports.YGNodeStyleSetMaxWidth = exports.YGNodeStyleGetMinHeight = exports.YGNodeStyleSetMinHeightPercent = exports.YGNodeStyleSetMinHeight = exports.YGNodeStyleGetMinWidth = exports.YGNodeStyleSetMinWidthPercent = exports.YGNodeStyleSetMinWidth = exports.YGNodeStyleGetHeight = exports.YGNodeStyleSetHeightAuto = exports.YGNodeStyleSetHeightPercent = exports.YGNodeStyleSetHeight = exports.YGNodeStyleGetWidth = exports.YGNodeStyleSetWidthAuto = exports.YGNodeStyleSetWidthPercent = exports.YGNodeStyleSetWidth = exports.YGNodeStyleSetMarginAuto = exports.YGNodeStyleGetPadding = exports.YGNodeStyleSetPaddingPercent = exports.YGNodeStyleSetPadding = exports.YGNodeStyleGetMargin = exports.YGNodeStyleSetMarginPercent = exports.YGNodeStyleSetMargin = exports.YGNodeStyleGetPosition = exports.YGNodeStyleSetPositionPercent = exports.YGNodeStyleSetPosition = exports.YGNodeStyleGetDisplay = exports.YGNodeStyleSetDisplay = exports.YGNodeStyleGetOverflow = exports.YGNodeStyleSetOverflow = exports.YGNodeStyleGetFlexWrap = exports.YGNodeStyleSetFlexWrap = exports.YGNodeStyleGetPositionType = exports.YGNodeStyleSetPositionType = exports.YGNodeStyleGetAlignSelf = exports.YGNodeStyleSetAlignSelf = exports.YGNodeStyleGetAlignItems = exports.YGNodeStyleSetAlignItems = exports.YGNodeStyleGetAlignContent = exports.YGNodeStyleSetAlignContent = exports.YGNodeStyleGetJustifyContent = exports.YGNodeStyleSetJustifyContent = exports.YGNodeStyleGetFlexDirection = exports.YGNodeStyleSetFlexDirection = exports.YGNodeStyleGetDirection = exports.YGNodeStyleSetDirection = exports.YGNodeStyleGetFlexShrink = exports.YGNodeStyleGetFlexGrow = exports.YGNodeCopyStyle = exports.YGNodeMarkDirty = exports.YGNodeGetParent = exports.YGNodeGetOwner = exports.YGNodeGetChildCount = exports.YGNodeGetChild = exports.YGNodeSetChildren = exports.YGNodeSetChildrenInternal = exports.YGNodeRemoveAllChildren = exports.YGNodeRemoveChild = exports.YGNodeInsertSharedChild = exports.YGNodeInsertChild = exports.YGConfigCopy = exports.YGConfigFree = exports.YGConfigNew = exports.YGConfigGetInstanceCount = exports.YGNodeGetInstanceCount = exports.YGNodeReset = exports.YGNodeFreeRecursive = exports.YGConfigFreeRecursive = exports.YGNodeFree = exports.YGNodeDeepClone = exports.YGConfigClone = exports.YGNodeClone = exports.YGNodeNew = exports.YGConfigGetDefault = exports.YGNodeNewWithConfig = exports.YGNodeMarkDirtyAndPropogateToDescendants = exports.YGNodeLayoutGetDidUseLegacyFlag = exports.YGNodeIsDirty = exports.YGNodeSetNodeType = exports.YGNodeGetNodeType = exports.YGNodeSetHasNewLayout = exports.YGNodeGetHasNewLayout = exports.YGNodeSetPrintFunc = exports.YGNodeGetPrintFunc = exports.YGNodeSetDirtiedFunc = exports.YGNodeGetDirtiedFunc = exports.YGNodeSetBaselineFunc = exports.YGNodeGetBaselineFunc = exports.YGNodeSetMeasureFunc = exports.YGNodeGetMeasureFunc = exports.YGNodeSetContext = exports.YGNodeGetContext = exports.YGComputedEdgeValue = exports.YGFloatIsUndefined = exports.YGValueZero = exports.YGValueAuto = exports.YGValueUndefined = exports.YGUndefined = exports.YGSize = void 0;

var enums_1 = __webpack_require__(/*! ./enums */ "./typeflex/enums.ts");

var ygnode_1 = __webpack_require__(/*! ./ygnode */ "./typeflex/ygnode.ts");

var ygconfig_1 = __webpack_require__(/*! ./ygconfig */ "./typeflex/ygconfig.ts");

var yglayout_1 = __webpack_require__(/*! ./yglayout */ "./typeflex/yglayout.ts");

var ygfloatoptional_1 = __webpack_require__(/*! ./ygfloatoptional */ "./typeflex/ygfloatoptional.ts");

var ygvalue_1 = __webpack_require__(/*! ./ygvalue */ "./typeflex/ygvalue.ts");

var utils_1 = __webpack_require__(/*! ./utils */ "./typeflex/utils.ts");

var internal_1 = __webpack_require__(/*! ./internal */ "./typeflex/internal.ts");

var YGSize = function YGSize() {
  (0, _classCallCheck2.default)(this, YGSize);
};

exports.YGSize = YGSize;
exports.YGUndefined = undefined;

exports.YGValueUndefined = function () {
  return new ygvalue_1.YGValue(exports.YGUndefined, enums_1.YGUnit.Undefined);
};

exports.YGValueAuto = function () {
  return new ygvalue_1.YGValue(exports.YGUndefined, enums_1.YGUnit.Auto);
};

exports.YGValueZero = function () {
  return new ygvalue_1.YGValue(0, enums_1.YGUnit.Point);
};

;
;
;
;
;
;

function formatToString(format, args) {
  var ret = format;

  var _iterator = _createForOfIteratorHelper(args[0][0]),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var arg = _step.value;
      ret = ret.replace(/%[d|s|f]/, arg);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return ret;
}

function YGDefaultLog(config, node, level, format) {
  for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  switch (level) {
    case enums_1.YGLogLevel.Error:
    case enums_1.YGLogLevel.Fatal:
      return console.error(formatToString(format, args));

    case enums_1.YGLogLevel.Warn:
    case enums_1.YGLogLevel.Info:
    case enums_1.YGLogLevel.Debug:
    case enums_1.YGLogLevel.Verbose:
    default:
      return console.log(formatToString(format, args));
  }
}

function YGFloatIsUndefined(value) {
  if (value === undefined || isNaN(value)) {
    return true;
  }

  return false;
}

exports.YGFloatIsUndefined = YGFloatIsUndefined;

function YGComputedEdgeValue(edges, edge, defaultValue) {
  if (edges[edge].unit != enums_1.YGUnit.Undefined) {
    return edges[edge];
  }

  if ((edge == enums_1.YGEdge.Top || edge == enums_1.YGEdge.Bottom) && edges[enums_1.YGEdge.Vertical].unit != enums_1.YGUnit.Undefined) {
    return edges[enums_1.YGEdge.Vertical];
  }

  if ((edge == enums_1.YGEdge.Left || edge == enums_1.YGEdge.Right || edge == enums_1.YGEdge.Start || edge == enums_1.YGEdge.End) && edges[enums_1.YGEdge.Horizontal].unit != enums_1.YGUnit.Undefined) {
    return edges[enums_1.YGEdge.Horizontal];
  }

  if (edges[enums_1.YGEdge.All].unit != enums_1.YGUnit.Undefined) {
    return edges[enums_1.YGEdge.All];
  }

  if (edge == enums_1.YGEdge.Start || edge == enums_1.YGEdge.End) {
    return exports.YGValueUndefined();
  }

  return defaultValue;
}

exports.YGComputedEdgeValue = YGComputedEdgeValue;

function YGNodeGetContext(node) {
  return node.getContext();
}

exports.YGNodeGetContext = YGNodeGetContext;

function YGNodeSetContext(node, context) {
  return node.setContext(context);
}

exports.YGNodeSetContext = YGNodeSetContext;

function YGNodeGetMeasureFunc(node) {
  return node.getMeasure();
}

exports.YGNodeGetMeasureFunc = YGNodeGetMeasureFunc;

function YGNodeSetMeasureFunc(node, measureFunc) {
  node.setMeasureFunc(measureFunc);
}

exports.YGNodeSetMeasureFunc = YGNodeSetMeasureFunc;

function YGNodeGetBaselineFunc(node) {
  return node.getBaseline();
}

exports.YGNodeGetBaselineFunc = YGNodeGetBaselineFunc;

function YGNodeSetBaselineFunc(node, baselineFunc) {
  node.setBaseLineFunc(baselineFunc);
}

exports.YGNodeSetBaselineFunc = YGNodeSetBaselineFunc;

function YGNodeGetDirtiedFunc(node) {
  return node.getDirtied();
}

exports.YGNodeGetDirtiedFunc = YGNodeGetDirtiedFunc;

function YGNodeSetDirtiedFunc(node, dirtiedFunc) {
  node.setDirtiedFunc(dirtiedFunc);
}

exports.YGNodeSetDirtiedFunc = YGNodeSetDirtiedFunc;

function YGNodeGetPrintFunc(node) {
  return node.getPrintFunc();
}

exports.YGNodeGetPrintFunc = YGNodeGetPrintFunc;

function YGNodeSetPrintFunc(node, printFunc) {
  node.setPrintFunc(printFunc);
}

exports.YGNodeSetPrintFunc = YGNodeSetPrintFunc;

function YGNodeGetHasNewLayout(node) {
  return node.getHasNewLayout();
}

exports.YGNodeGetHasNewLayout = YGNodeGetHasNewLayout;

function YGNodeSetHasNewLayout(node, hasNewLayout) {
  node.setHasNewLayout(hasNewLayout);
}

exports.YGNodeSetHasNewLayout = YGNodeSetHasNewLayout;

function YGNodeGetNodeType(node) {
  return node.getNodeType();
}

exports.YGNodeGetNodeType = YGNodeGetNodeType;

function YGNodeSetNodeType(node, nodeType) {
  node.setNodeType(nodeType);
}

exports.YGNodeSetNodeType = YGNodeSetNodeType;

function YGNodeIsDirty(node) {
  return node.isDirty();
}

exports.YGNodeIsDirty = YGNodeIsDirty;

function YGNodeLayoutGetDidUseLegacyFlag(node) {
  return node.didUseLegacyFlag();
}

exports.YGNodeLayoutGetDidUseLegacyFlag = YGNodeLayoutGetDidUseLegacyFlag;

function YGNodeMarkDirtyAndPropogateToDescendants(node) {
  node.markDirtyAndPropogateDownwards();
}

exports.YGNodeMarkDirtyAndPropogateToDescendants = YGNodeMarkDirtyAndPropogateToDescendants;
var gNodeInstanceCount = 0;
var gConfigInstanceCount = 0;

function YGNodeNewWithConfig(config) {
  var node = new ygnode_1.YGNode();
  gNodeInstanceCount++;

  if (config.useWebDefaults) {
    node.setStyleFlexDirection(enums_1.YGFlexDirection.Row);
    node.setStyleAlignContent(enums_1.YGAlign.Stretch);
  }

  node.setConfig(config);
  return node;
}

exports.YGNodeNewWithConfig = YGNodeNewWithConfig;

function YGConfigGetDefault() {
  return YGConfigNew();
}

exports.YGConfigGetDefault = YGConfigGetDefault;

function YGNodeNew() {
  return YGNodeNewWithConfig(YGConfigGetDefault());
}

exports.YGNodeNew = YGNodeNew;

function YGNodeClone(oldNode) {
  console.log('clone?');
  var node = new ygnode_1.YGNode(oldNode);
  gNodeInstanceCount++;
  node.setOwner(null);
  return node;
}

exports.YGNodeClone = YGNodeClone;

function YGConfigClone(oldConfig) {
  var config = new ygconfig_1.YGConfig(oldConfig.logger);
  gConfigInstanceCount++;
  return config;
}

exports.YGConfigClone = YGConfigClone;

function YGNodeDeepClone(oldNode) {
  var node = YGNodeClone(oldNode);
  var vec = new Array(oldNode.getChildren().length);
  var childNode = null;

  for (var i = 0; i < oldNode.getChildren().length; ++i) {
    var item = oldNode.getChild(i);
    childNode = YGNodeDeepClone(item);
    childNode.setOwner(node);
    vec.push(childNode);
  }

  node.setChildren(vec);

  if (oldNode.getConfig() != null) {
    node.setConfig(YGConfigClone(oldNode.getConfig()));
  }

  return node;
}

exports.YGNodeDeepClone = YGNodeDeepClone;

function YGNodeFree(node) {
  var owner = node.getOwner();

  if (owner != null) {
    owner.removeChild(node);
    node.setOwner(null);
  }

  var childCount = YGNodeGetChildCount(node);

  for (var i = 0; i < childCount; i++) {
    var child = YGNodeGetChild(node, i);
    child.setOwner(null);
  }

  node.clearChildren();
  gNodeInstanceCount--;
}

exports.YGNodeFree = YGNodeFree;

function YGConfigFreeRecursive(root) {
  if (root.getConfig() != null) {
    gConfigInstanceCount--;
    root.setConfig(null);
  }

  for (var i = 0; i < root.getChildrenCount(); ++i) {
    YGConfigFreeRecursive(root.getChild(i));
  }
}

exports.YGConfigFreeRecursive = YGConfigFreeRecursive;

function YGNodeFreeRecursive(root) {
  while (YGNodeGetChildCount(root) > 0) {
    var child = YGNodeGetChild(root, 0);

    if (child.getOwner() != root) {
      break;
    }

    YGNodeRemoveChild(root, child);
    YGNodeFreeRecursive(child);
  }

  YGNodeFree(root);
}

exports.YGNodeFreeRecursive = YGNodeFreeRecursive;

function YGNodeReset(node) {
  YGAssertWithNode(node, YGNodeGetChildCount(node) == 0, "Cannot reset a node which still has children attached");
  YGAssertWithNode(node, node.getOwner() == null, "Cannot reset a node still attached to a owner");
  node.clearChildren();
  var config = node.getConfig();
  node.fromNode(new ygnode_1.YGNode());

  if (config.useWebDefaults) {
    node.setStyleFlexDirection(enums_1.YGFlexDirection.Row);
    node.setStyleAlignContent(enums_1.YGAlign.Stretch);
  }

  node.setConfig(config);
}

exports.YGNodeReset = YGNodeReset;

function YGNodeGetInstanceCount() {
  return gNodeInstanceCount;
}

exports.YGNodeGetInstanceCount = YGNodeGetInstanceCount;

function YGConfigGetInstanceCount() {
  return gConfigInstanceCount;
}

exports.YGConfigGetInstanceCount = YGConfigGetInstanceCount;

function YGConfigNew() {
  var config = new ygconfig_1.YGConfig(YGDefaultLog);
  gConfigInstanceCount++;
  return config;
}

exports.YGConfigNew = YGConfigNew;

function YGConfigFree(config) {
  gConfigInstanceCount--;
}

exports.YGConfigFree = YGConfigFree;

function YGConfigCopy(dest, src) {
  (0, _extends2.default)(dest, src);
}

exports.YGConfigCopy = YGConfigCopy;

function YGNodeInsertChild(node, child, index) {
  YGAssertWithNode(node, child.getOwner() == null, "Child already has a owner, it must be removed first.");
  YGAssertWithNode(node, node.getMeasure() == null, "Cannot add child: Nodes with measure functions cannot have children.");
  node.cloneChildrenIfNeeded();
  node.insertChildIndex(child, index);
  var owner = child.getOwner() ? null : node;
  child.setOwner(owner);
  node.markDirtyAndPropogate();
}

exports.YGNodeInsertChild = YGNodeInsertChild;

function YGNodeInsertSharedChild(node, child, index) {
  YGAssertWithNode(node, node.getMeasure() == null, "Cannot add child: Nodes with measure functions cannot have children.");
  node.insertChildIndex(child, index);
  child.setOwner(null);
  node.markDirtyAndPropogate();
}

exports.YGNodeInsertSharedChild = YGNodeInsertSharedChild;

function YGNodeRemoveChild(owner, excludedChild) {
  var childCount = YGNodeGetChildCount(owner);

  if (childCount == 0) {
    return;
  }

  var firstChild = YGNodeGetChild(owner, 0);

  if (firstChild.getOwner() == owner) {
    if (owner.removeChild(excludedChild)) {
      excludedChild.setLayout(new yglayout_1.YGLayout());
      excludedChild.setOwner(null);
      owner.markDirtyAndPropogate();
    }

    return;
  }

  var cloneNodeCallback = owner.getConfig().cloneNodeCallback;
  var nextInsertIndex = 0;

  for (var i = 0; i < childCount; i++) {
    var oldChild = owner.getChild(i);

    if (excludedChild == oldChild) {
      owner.markDirtyAndPropogate();
      continue;
    }

    var newChild = null;

    if (cloneNodeCallback) {
      newChild = cloneNodeCallback(oldChild, owner, nextInsertIndex);
    }

    if (newChild == null) {
      newChild = YGNodeClone(oldChild);
    }

    owner.replaceChildIndex(newChild, nextInsertIndex);
    newChild.setOwner(owner);
    nextInsertIndex++;
  }

  while (nextInsertIndex < childCount) {
    owner.removeChildIndex(nextInsertIndex);
    nextInsertIndex++;
  }
}

exports.YGNodeRemoveChild = YGNodeRemoveChild;

function YGNodeRemoveAllChildren(owner) {
  var childCount = YGNodeGetChildCount(owner);

  if (childCount == 0) {
    return;
  }

  var firstChild = YGNodeGetChild(owner, 0);

  if (firstChild.getOwner() == owner) {
    for (var i = 0; i < childCount; i++) {
      var oldChild = YGNodeGetChild(owner, i);
      oldChild.setLayout(new yglayout_1.YGLayout());
      oldChild.setOwner(null);
    }

    owner.clearChildren();
    owner.markDirtyAndPropogate();
    return;
  }

  owner.setChildren(new Array());
  owner.markDirtyAndPropogate();
}

exports.YGNodeRemoveAllChildren = YGNodeRemoveAllChildren;

function YGNodeSetChildrenInternal(owner, children) {
  if (!owner) {
    return;
  }

  var ownerChildren = owner.getChildren();

  if (children.length == 0) {
    if (ownerChildren.length > 0) {
      for (var i = 0; i < ownerChildren.length; i++) {
        var child = ownerChildren[i];
        child.setLayout(new yglayout_1.YGLayout());
        child.setOwner(null);
      }

      owner.setChildren(new Array());
      owner.markDirtyAndPropogate();
    }
  } else {
    if (ownerChildren.length > 0) {
      for (var _i = 0; _i < ownerChildren.length; _i++) {
        var oldChild = ownerChildren[_i];

        if (children.indexOf(oldChild) < 0) {
          oldChild.setLayout(new yglayout_1.YGLayout());
          oldChild.setOwner(null);
        }
      }
    }

    owner.setChildren(children);

    for (var _i2 = 0; _i2 < children.length; _i2++) {
      children[_i2].setOwner(owner);
    }

    owner.markDirtyAndPropogate();
  }
}

exports.YGNodeSetChildrenInternal = YGNodeSetChildrenInternal;

function YGNodeSetChildren(owner, children) {
  YGNodeSetChildrenInternal(owner, children);
}

exports.YGNodeSetChildren = YGNodeSetChildren;

function YGNodeGetChild(node, index) {
  var children = node.getChildren();

  if (index < children.length) {
    return children[index];
  }

  return null;
}

exports.YGNodeGetChild = YGNodeGetChild;

function YGNodeGetChildCount(node) {
  return node.getChildrenCount();
}

exports.YGNodeGetChildCount = YGNodeGetChildCount;

function YGNodeGetOwner(node) {
  return node.getOwner();
}

exports.YGNodeGetOwner = YGNodeGetOwner;

function YGNodeGetParent(node) {
  return node.getOwner();
}

exports.YGNodeGetParent = YGNodeGetParent;

function YGNodeMarkDirty(node) {
  YGAssertWithNode(node, node.getMeasure() != null, "Only leaf nodes with custom measure functions should manually mark themselves as dirty");
  node.markDirtyAndPropogate();
}

exports.YGNodeMarkDirty = YGNodeMarkDirty;

function YGNodeCopyStyle(dstNode, srcNode) {
  if (!dstNode.getStyle().isEqual(srcNode.getStyle())) {
    dstNode.setStyle(srcNode.getStyle());
    dstNode.markDirtyAndPropogate();
  }
}

exports.YGNodeCopyStyle = YGNodeCopyStyle;

function YGNodeStyleGetFlexGrow(node) {
  return node.getStyle().flexGrow.isUndefined() ? internal_1.kDefaultFlexGrow : node.getStyle().flexGrow.getValue();
}

exports.YGNodeStyleGetFlexGrow = YGNodeStyleGetFlexGrow;

function YGNodeStyleGetFlexShrink(node) {
  return node.getStyle().flexShrink.isUndefined() ? node.getConfig().useWebDefaults ? internal_1.kWebDefaultFlexShrink : internal_1.kDefaultFlexShrink : node.getStyle().flexShrink.getValue();
}

exports.YGNodeStyleGetFlexShrink = YGNodeStyleGetFlexShrink;

function YGNodeStyleSetDirection(node, direction) {
  if (node.getStyle().direction != direction) {
    var style = node.getStyle();
    style.direction = direction;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetDirection = YGNodeStyleSetDirection;

function YGNodeStyleGetDirection(node) {
  return node.getStyle().direction;
}

exports.YGNodeStyleGetDirection = YGNodeStyleGetDirection;

function YGNodeStyleSetFlexDirection(node, flexDirection) {
  if (node.getStyle().flexDirection != flexDirection) {
    var style = node.getStyle();
    style.flexDirection = flexDirection;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexDirection = YGNodeStyleSetFlexDirection;

function YGNodeStyleGetFlexDirection(node) {
  return node.getStyle().flexDirection;
}

exports.YGNodeStyleGetFlexDirection = YGNodeStyleGetFlexDirection;

function YGNodeStyleSetJustifyContent(node, justifyContent) {
  if (node.getStyle().justifyContent != justifyContent) {
    var style = node.getStyle();
    style.justifyContent = justifyContent;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetJustifyContent = YGNodeStyleSetJustifyContent;

function YGNodeStyleGetJustifyContent(node) {
  return node.getStyle().justifyContent;
}

exports.YGNodeStyleGetJustifyContent = YGNodeStyleGetJustifyContent;

function YGNodeStyleSetAlignContent(node, alignContent) {
  if (node.getStyle().alignContent != alignContent) {
    var style = node.getStyle();
    style.alignContent = alignContent;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetAlignContent = YGNodeStyleSetAlignContent;

function YGNodeStyleGetAlignContent(node) {
  return node.getStyle().alignContent;
}

exports.YGNodeStyleGetAlignContent = YGNodeStyleGetAlignContent;

function YGNodeStyleSetAlignItems(node, alignItems) {
  if (node.getStyle().alignItems != alignItems) {
    var style = node.getStyle();
    style.alignItems = alignItems;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetAlignItems = YGNodeStyleSetAlignItems;

function YGNodeStyleGetAlignItems(node) {
  return node.getStyle().alignItems;
}

exports.YGNodeStyleGetAlignItems = YGNodeStyleGetAlignItems;

function YGNodeStyleSetAlignSelf(node, alignSelf) {
  if (node.getStyle().alignSelf != alignSelf) {
    var style = node.getStyle();
    style.alignSelf = alignSelf;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetAlignSelf = YGNodeStyleSetAlignSelf;

function YGNodeStyleGetAlignSelf(node) {
  return node.getStyle().alignSelf;
}

exports.YGNodeStyleGetAlignSelf = YGNodeStyleGetAlignSelf;

function YGNodeStyleSetPositionType(node, positionType) {
  if (node.getStyle().positionType != positionType) {
    var style = node.getStyle();
    style.positionType = positionType;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetPositionType = YGNodeStyleSetPositionType;

function YGNodeStyleGetPositionType(node) {
  return node.getStyle().positionType;
}

exports.YGNodeStyleGetPositionType = YGNodeStyleGetPositionType;

function YGNodeStyleSetFlexWrap(node, flexWrap) {
  if (node.getStyle().flexWrap != flexWrap) {
    var style = node.getStyle();
    style.flexWrap = flexWrap;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexWrap = YGNodeStyleSetFlexWrap;

function YGNodeStyleGetFlexWrap(node) {
  return node.getStyle().flexWrap;
}

exports.YGNodeStyleGetFlexWrap = YGNodeStyleGetFlexWrap;

function YGNodeStyleSetOverflow(node, overflow) {
  if (node.getStyle().overflow != overflow) {
    var style = node.getStyle();
    style.overflow = overflow;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetOverflow = YGNodeStyleSetOverflow;

function YGNodeStyleGetOverflow(node) {
  return node.getStyle().overflow;
}

exports.YGNodeStyleGetOverflow = YGNodeStyleGetOverflow;

function YGNodeStyleSetDisplay(node, display) {
  if (node.getStyle().display != display) {
    var style = node.getStyle();
    style.display = display;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetDisplay = YGNodeStyleSetDisplay;

function YGNodeStyleGetDisplay(node) {
  return node.getStyle().display;
}

exports.YGNodeStyleGetDisplay = YGNodeStyleGetDisplay;

function YGNodeStyleSetPosition(node, edge, position) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(position), YGFloatIsUndefined(position) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().position[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().position[edge].unit != value.unit) {
    var style = node.getStyle();
    style.position[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetPosition = YGNodeStyleSetPosition;

function YGNodeStyleSetPositionPercent(node, edge, position) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(position), YGFloatIsUndefined(position) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().position[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().position[edge].unit != value.unit) {
    var style = node.getStyle();
    style.position[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetPositionPercent = YGNodeStyleSetPositionPercent;

function YGNodeStyleGetPosition(node, edge) {
  var value = node.getStyle().position[edge];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetPosition = YGNodeStyleGetPosition;

function YGNodeStyleSetMargin(node, edge, margin) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(margin), YGFloatIsUndefined(margin) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().margin[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().margin[edge].unit != value.unit) {
    var style = node.getStyle();
    style.margin[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMargin = YGNodeStyleSetMargin;

function YGNodeStyleSetMarginPercent(node, edge, margin) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(margin), YGFloatIsUndefined(margin) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().margin[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().margin[edge].unit != value.unit) {
    var style = node.getStyle();
    style.margin[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMarginPercent = YGNodeStyleSetMarginPercent;

function YGNodeStyleGetMargin(node, edge) {
  var value = node.getStyle().margin[edge];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetMargin = YGNodeStyleGetMargin;

function YGNodeStyleSetPadding(node, edge, padding) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(padding), YGFloatIsUndefined(padding) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().padding[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().padding[edge].unit != value.unit) {
    var style = node.getStyle();
    style.padding[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetPadding = YGNodeStyleSetPadding;

function YGNodeStyleSetPaddingPercent(node, edge, padding) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(padding), YGFloatIsUndefined(padding) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().padding[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().padding[edge].unit != value.unit) {
    var style = node.getStyle();
    style.padding[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetPaddingPercent = YGNodeStyleSetPaddingPercent;

function YGNodeStyleGetPadding(node, edge) {
  var value = node.getStyle().padding[edge];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetPadding = YGNodeStyleGetPadding;

function YGNodeStyleSetMarginAuto(node, edge) {
  if (node.getStyle().margin[edge].unit != enums_1.YGUnit.Auto) {
    var style = node.getStyle();
    style.margin[edge].value = 0;
    style.margin[edge].unit = enums_1.YGUnit.Auto;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMarginAuto = YGNodeStyleSetMarginAuto;

function YGNodeStyleSetWidth(node, width) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(width), YGFloatIsUndefined(width) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().dimensions[enums_1.YGDimension.Width].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().dimensions[enums_1.YGDimension.Width].unit != value.unit) {
    var style = node.getStyle();
    style.dimensions[enums_1.YGDimension.Width] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetWidth = YGNodeStyleSetWidth;

function YGNodeStyleSetWidthPercent(node, width) {
  if (node.getStyle().dimensions[enums_1.YGDimension.Width].value != utils_1.YGFloatSanitize(width) || node.getStyle().dimensions[enums_1.YGDimension.Width].unit != enums_1.YGUnit.Percent) {
    var style = node.getStyle();
    style.dimensions[enums_1.YGDimension.Width].value = utils_1.YGFloatSanitize(width);
    style.dimensions[enums_1.YGDimension.Width].unit = YGFloatIsUndefined(width) ? enums_1.YGUnit.Auto : enums_1.YGUnit.Percent;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetWidthPercent = YGNodeStyleSetWidthPercent;

function YGNodeStyleSetWidthAuto(node) {
  if (node.getStyle().dimensions[enums_1.YGDimension.Width].unit != enums_1.YGUnit.Auto) {
    var style = node.getStyle();
    style.dimensions[enums_1.YGDimension.Width].value = 0;
    style.dimensions[enums_1.YGDimension.Width].unit = enums_1.YGUnit.Auto;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetWidthAuto = YGNodeStyleSetWidthAuto;

function YGNodeStyleGetWidth(node) {
  var value = node.getStyle().dimensions[enums_1.YGDimension.Width];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetWidth = YGNodeStyleGetWidth;

function YGNodeStyleSetHeight(node, height) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(height), YGFloatIsUndefined(height) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().dimensions[enums_1.YGDimension.Height].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().dimensions[enums_1.YGDimension.Height].unit != value.unit) {
    var style = node.getStyle();
    style.dimensions[enums_1.YGDimension.Height] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetHeight = YGNodeStyleSetHeight;

function YGNodeStyleSetHeightPercent(node, height) {
  if (node.getStyle().dimensions[enums_1.YGDimension.Height].value != utils_1.YGFloatSanitize(height) || node.getStyle().dimensions[enums_1.YGDimension.Height].unit != enums_1.YGUnit.Percent) {
    var style = node.getStyle();
    style.dimensions[enums_1.YGDimension.Height].value = utils_1.YGFloatSanitize(height);
    style.dimensions[enums_1.YGDimension.Height].unit = YGFloatIsUndefined(height) ? enums_1.YGUnit.Auto : enums_1.YGUnit.Percent;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetHeightPercent = YGNodeStyleSetHeightPercent;

function YGNodeStyleSetHeightAuto(node) {
  if (node.getStyle().dimensions[enums_1.YGDimension.Height].unit != enums_1.YGUnit.Auto) {
    var style = node.getStyle();
    style.dimensions[enums_1.YGDimension.Height].value = 0;
    style.dimensions[enums_1.YGDimension.Height].unit = enums_1.YGUnit.Auto;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetHeightAuto = YGNodeStyleSetHeightAuto;

function YGNodeStyleGetHeight(node) {
  var value = node.getStyle().dimensions[enums_1.YGDimension.Height];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetHeight = YGNodeStyleGetHeight;

function YGNodeStyleSetMinWidth(node, minWidth) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(minWidth), YGFloatIsUndefined(minWidth) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().minDimensions[enums_1.YGDimension.Width].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().minDimensions[enums_1.YGDimension.Width].unit != value.unit) {
    var style = node.getStyle();
    style.minDimensions[enums_1.YGDimension.Width] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMinWidth = YGNodeStyleSetMinWidth;

function YGNodeStyleSetMinWidthPercent(node, minWidth) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(minWidth), YGFloatIsUndefined(minWidth) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().minDimensions[enums_1.YGDimension.Width].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().minDimensions[enums_1.YGDimension.Width].unit != value.unit) {
    var style = node.getStyle();
    style.minDimensions[enums_1.YGDimension.Width] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMinWidthPercent = YGNodeStyleSetMinWidthPercent;

function YGNodeStyleGetMinWidth(node) {
  var value = node.getStyle().minDimensions[enums_1.YGDimension.Width];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetMinWidth = YGNodeStyleGetMinWidth;

function YGNodeStyleSetMinHeight(node, minHeight) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(minHeight), YGFloatIsUndefined(minHeight) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().minDimensions[enums_1.YGDimension.Height].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().minDimensions[enums_1.YGDimension.Height].unit != value.unit) {
    var style = node.getStyle();
    style.minDimensions[enums_1.YGDimension.Height] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMinHeight = YGNodeStyleSetMinHeight;

function YGNodeStyleSetMinHeightPercent(node, minHeight) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(minHeight), YGFloatIsUndefined(minHeight) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().minDimensions[enums_1.YGDimension.Height].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().minDimensions[enums_1.YGDimension.Height].unit != value.unit) {
    var style = node.getStyle();
    style.minDimensions[enums_1.YGDimension.Height] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMinHeightPercent = YGNodeStyleSetMinHeightPercent;

function YGNodeStyleGetMinHeight(node) {
  var value = node.getStyle().minDimensions[enums_1.YGDimension.Height];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetMinHeight = YGNodeStyleGetMinHeight;

function YGNodeStyleSetMaxWidth(node, maxWidth) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(maxWidth), YGFloatIsUndefined(maxWidth) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().maxDimensions[enums_1.YGDimension.Width].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().maxDimensions[enums_1.YGDimension.Width].unit != value.unit) {
    var style = node.getStyle();
    style.maxDimensions[enums_1.YGDimension.Width] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMaxWidth = YGNodeStyleSetMaxWidth;

function YGNodeStyleSetMaxWidthPercent(node, maxWidth) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(maxWidth), YGFloatIsUndefined(maxWidth) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().maxDimensions[enums_1.YGDimension.Width].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().maxDimensions[enums_1.YGDimension.Width].unit != value.unit) {
    var style = node.getStyle();
    style.maxDimensions[enums_1.YGDimension.Width] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMaxWidthPercent = YGNodeStyleSetMaxWidthPercent;

function YGNodeStyleGetMaxWidth(node) {
  var value = node.getStyle().maxDimensions[enums_1.YGDimension.Width];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetMaxWidth = YGNodeStyleGetMaxWidth;

function YGNodeStyleSetMaxHeight(node, maxHeight) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(maxHeight), YGFloatIsUndefined(maxHeight) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().maxDimensions[enums_1.YGDimension.Height].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().maxDimensions[enums_1.YGDimension.Height].unit != value.unit) {
    var style = node.getStyle();
    style.maxDimensions[enums_1.YGDimension.Height] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMaxHeight = YGNodeStyleSetMaxHeight;

function YGNodeStyleSetMaxHeightPercent(node, maxHeight) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(maxHeight), YGFloatIsUndefined(maxHeight) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Percent);

  if (node.getStyle().maxDimensions[enums_1.YGDimension.Height].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().maxDimensions[enums_1.YGDimension.Height].unit != value.unit) {
    var style = node.getStyle();
    style.maxDimensions[enums_1.YGDimension.Height] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetMaxHeightPercent = YGNodeStyleSetMaxHeightPercent;

function YGNodeStyleGetMaxHeight(node) {
  var value = node.getStyle().maxDimensions[enums_1.YGDimension.Height];

  if (value.unit == enums_1.YGUnit.Undefined || value.unit == enums_1.YGUnit.Auto) {
    value.value = exports.YGUndefined;
  }

  return value;
}

exports.YGNodeStyleGetMaxHeight = YGNodeStyleGetMaxHeight;

function YGNodeLayoutGetLeft(node) {
  return node.getLayout().position[enums_1.YGEdge.Left];
}

exports.YGNodeLayoutGetLeft = YGNodeLayoutGetLeft;

function YGNodeLayoutGetTop(node) {
  return node.getLayout().position[enums_1.YGEdge.Top];
}

exports.YGNodeLayoutGetTop = YGNodeLayoutGetTop;

function YGNodeLayoutGetRight(node) {
  return node.getLayout().position[enums_1.YGEdge.Right];
}

exports.YGNodeLayoutGetRight = YGNodeLayoutGetRight;

function YGNodeLayoutGetBottom(node) {
  return node.getLayout().position[enums_1.YGEdge.Bottom];
}

exports.YGNodeLayoutGetBottom = YGNodeLayoutGetBottom;

function YGNodeLayoutGetWidth(node) {
  return node.getLayout().dimensions[enums_1.YGDimension.Width];
}

exports.YGNodeLayoutGetWidth = YGNodeLayoutGetWidth;

function YGNodeLayoutGetHeight(node) {
  return node.getLayout().dimensions[enums_1.YGDimension.Height];
}

exports.YGNodeLayoutGetHeight = YGNodeLayoutGetHeight;

function YGNodeLayoutGetDirection(node) {
  return node.getLayout().direction;
}

exports.YGNodeLayoutGetDirection = YGNodeLayoutGetDirection;

function YGNodeLayoutGetHadOverflow(node) {
  return node.getLayout().hadOverflow;
}

exports.YGNodeLayoutGetHadOverflow = YGNodeLayoutGetHadOverflow;

function YGNodeLayoutGetMargin(node, edge) {
  YGAssertWithNode(node, edge <= enums_1.YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

  if (edge == enums_1.YGEdge.Left) {
    if (node.getLayout().direction == enums_1.YGDirection.RTL) {
      return node.getLayout().margin[enums_1.YGEdge.End];
    } else {
      return node.getLayout().margin[enums_1.YGEdge.Start];
    }
  }

  if (edge == enums_1.YGEdge.Right) {
    if (node.getLayout().direction == enums_1.YGDirection.RTL) {
      return node.getLayout().margin[enums_1.YGEdge.Start];
    } else {
      return node.getLayout().margin[enums_1.YGEdge.End];
    }
  }

  return node.getLayout().margin[edge];
}

exports.YGNodeLayoutGetMargin = YGNodeLayoutGetMargin;

function YGNodeLayoutGetBorder(node, edge) {
  YGAssertWithNode(node, edge <= enums_1.YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

  if (edge == enums_1.YGEdge.Left) {
    if (node.getLayout().direction == enums_1.YGDirection.RTL) {
      return node.getLayout().border[enums_1.YGEdge.End];
    } else {
      return node.getLayout().border[enums_1.YGEdge.Start];
    }
  }

  if (edge == enums_1.YGEdge.Right) {
    if (node.getLayout().direction == enums_1.YGDirection.RTL) {
      return node.getLayout().border[enums_1.YGEdge.Start];
    } else {
      return node.getLayout().border[enums_1.YGEdge.End];
    }
  }

  return node.getLayout().border[edge];
}

exports.YGNodeLayoutGetBorder = YGNodeLayoutGetBorder;

function YGNodeLayoutGetPadding(node, edge) {
  YGAssertWithNode(node, edge <= enums_1.YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

  if (edge == enums_1.YGEdge.Left) {
    if (node.getLayout().direction == enums_1.YGDirection.RTL) {
      return node.getLayout().padding[enums_1.YGEdge.End];
    } else {
      return node.getLayout().padding[enums_1.YGEdge.Start];
    }
  }

  if (edge == enums_1.YGEdge.Right) {
    if (node.getLayout().direction == enums_1.YGDirection.RTL) {
      return node.getLayout().padding[enums_1.YGEdge.Start];
    } else {
      return node.getLayout().padding[enums_1.YGEdge.End];
    }
  }

  return node.getLayout().padding[edge];
}

exports.YGNodeLayoutGetPadding = YGNodeLayoutGetPadding;

function YGNodeStyleSetFlex(node, flex) {
  if (node.getStyle().flex.isDiffValue(flex)) {
    var style = node.getStyle();

    if (YGFloatIsUndefined(flex)) {
      style.flex = new ygfloatoptional_1.YGFloatOptional();
    } else {
      style.flex = new ygfloatoptional_1.YGFloatOptional(flex);
    }

    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlex = YGNodeStyleSetFlex;

function YGNodeStyleGetFlex(node) {
  return node.getStyle().flex.isUndefined() ? exports.YGUndefined : node.getStyle().flex.getValue();
}

exports.YGNodeStyleGetFlex = YGNodeStyleGetFlex;

function YGNodeStyleSetFlexGrow(node, flexGrow) {
  if (node.getStyle().flexGrow.isDiffValue(flexGrow)) {
    var style = node.getStyle();

    if (YGFloatIsUndefined(flexGrow)) {
      style.flexGrow = new ygfloatoptional_1.YGFloatOptional();
    } else {
      style.flexGrow = new ygfloatoptional_1.YGFloatOptional(flexGrow);
    }

    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexGrow = YGNodeStyleSetFlexGrow;

function YGNodeStyleSetFlexShrink(node, flexShrink) {
  if (node.getStyle().flexShrink.isDiffValue(flexShrink)) {
    var style = node.getStyle();

    if (YGFloatIsUndefined(flexShrink)) {
      style.flexShrink = new ygfloatoptional_1.YGFloatOptional();
    } else {
      style.flexShrink = new ygfloatoptional_1.YGFloatOptional(flexShrink);
    }

    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexShrink = YGNodeStyleSetFlexShrink;

function YGNodeStyleGetFlexBasis(node) {
  var flexBasis = node.getStyle().flexBasis;

  if (flexBasis.unit == enums_1.YGUnit.Undefined || flexBasis.unit == enums_1.YGUnit.Auto) {
    flexBasis.value = exports.YGUndefined;
  }

  return flexBasis;
}

exports.YGNodeStyleGetFlexBasis = YGNodeStyleGetFlexBasis;

function YGNodeStyleSetFlexBasis(node, flexBasis) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(flexBasis), YGFloatIsUndefined(flexBasis) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().flexBasis.value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().flexBasis.unit != value.unit) {
    var style = node.getStyle();
    style.flexBasis = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexBasis = YGNodeStyleSetFlexBasis;

function YGNodeStyleSetFlexBasisPercent(node, flexBasisPercent) {
  if (node.getStyle().flexBasis.value != flexBasisPercent || node.getStyle().flexBasis.unit != enums_1.YGUnit.Percent) {
    var style = node.getStyle();
    style.flexBasis.value = utils_1.YGFloatSanitize(flexBasisPercent);
    style.flexBasis.unit = YGFloatIsUndefined(flexBasisPercent) ? enums_1.YGUnit.Auto : enums_1.YGUnit.Percent;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexBasisPercent = YGNodeStyleSetFlexBasisPercent;

function YGNodeStyleSetFlexBasisAuto(node) {
  if (node.getStyle().flexBasis.unit != enums_1.YGUnit.Auto) {
    var style = node.getStyle();
    style.flexBasis.value = 0;
    style.flexBasis.unit = enums_1.YGUnit.Auto;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetFlexBasisAuto = YGNodeStyleSetFlexBasisAuto;

function YGNodeStyleSetBorder(node, edge, border) {
  var value = new ygvalue_1.YGValue(utils_1.YGFloatSanitize(border), YGFloatIsUndefined(border) ? enums_1.YGUnit.Undefined : enums_1.YGUnit.Point);

  if (node.getStyle().border[edge].value != value.value && value.unit != enums_1.YGUnit.Undefined || node.getStyle().border[edge].unit != value.unit) {
    var style = node.getStyle();
    style.border[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetBorder = YGNodeStyleSetBorder;

function YGNodeStyleGetBorder(node, edge) {
  if (node.getStyle().border[edge].unit == enums_1.YGUnit.Undefined || node.getStyle().border[edge].unit == enums_1.YGUnit.Auto) {
    return exports.YGUndefined;
  }

  return node.getStyle().border[edge].value;
}

exports.YGNodeStyleGetBorder = YGNodeStyleGetBorder;

function YGNodeStyleGetAspectRatio(node) {
  var op = node.getStyle().aspectRatio;
  return op.isUndefined() ? exports.YGUndefined : op.getValue();
}

exports.YGNodeStyleGetAspectRatio = YGNodeStyleGetAspectRatio;

function YGNodeStyleSetAspectRatio(node, aspectRatio) {
  if (node.getStyle().aspectRatio.isDiffValue(aspectRatio)) {
    var style = node.getStyle();
    style.aspectRatio = new ygfloatoptional_1.YGFloatOptional(aspectRatio);
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

exports.YGNodeStyleSetAspectRatio = YGNodeStyleSetAspectRatio;

function YGNodeLayoutGetDidLegacyStretchFlagAffectLayout(node) {
  return node.getLayout().doesLegacyStretchFlagAffectsLayout;
}

exports.YGNodeLayoutGetDidLegacyStretchFlagAffectLayout = YGNodeLayoutGetDidLegacyStretchFlagAffectLayout;
var gCurrentGenerationCount = 0;

function YGNodePrintInternal(node, options) {}

exports.YGNodePrintInternal = YGNodePrintInternal;

function YGNodePrint(node, options) {
  YGNodePrintInternal(node, options);
}

exports.YGNodePrint = YGNodePrint;

function YGNodePaddingAndBorderForAxis(node, axis, widthSize) {
  return utils_1.YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(axis, widthSize).add(node.getTrailingPaddingAndBorder(axis, widthSize)));
}

exports.YGNodePaddingAndBorderForAxis = YGNodePaddingAndBorderForAxis;

function YGNodeAlignItem(node, child) {
  var align = child.getStyle().alignSelf == enums_1.YGAlign.Auto ? node.getStyle().alignItems : child.getStyle().alignSelf;

  if (align == enums_1.YGAlign.Baseline && utils_1.YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
    return enums_1.YGAlign.FlexStart;
  }

  return align;
}

exports.YGNodeAlignItem = YGNodeAlignItem;

function YGBaseline(node) {
  if (node.getBaseline() != null) {
    var _baseline = node.getBaseline()(node, node.getLayout().measuredDimensions[enums_1.YGDimension.Width], node.getLayout().measuredDimensions[enums_1.YGDimension.Height]);

    YGAssertWithNode(node, !YGFloatIsUndefined(_baseline), "Expect custom baseline function to not return NaN");
    return _baseline;
  }

  var baselineChild = null;
  var childCount = YGNodeGetChildCount(node);

  for (var i = 0; i < childCount; i++) {
    var child = YGNodeGetChild(node, i);

    if (child.getLineIndex() > 0) {
      break;
    }

    if (child.getStyle().positionType == enums_1.YGPositionType.Absolute) {
      continue;
    }

    if (YGNodeAlignItem(node, child) == enums_1.YGAlign.Baseline) {
      baselineChild = child;
      break;
    }

    if (baselineChild == null) {
      baselineChild = child;
    }
  }

  if (baselineChild == null) {
    return node.getLayout().measuredDimensions[enums_1.YGDimension.Height];
  }

  var baseline = YGBaseline(baselineChild);
  return baseline + baselineChild.getLayout().position[enums_1.YGEdge.Top];
}

exports.YGBaseline = YGBaseline;

function YGIsBaselineLayout(node) {
  if (utils_1.YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
    return false;
  }

  if (node.getStyle().alignItems == enums_1.YGAlign.Baseline) {
    return true;
  }

  var childCount = YGNodeGetChildCount(node);

  for (var i = 0; i < childCount; i++) {
    var child = YGNodeGetChild(node, i);

    if (child.getStyle().positionType == enums_1.YGPositionType.Relative && child.getStyle().alignSelf == enums_1.YGAlign.Baseline) {
      return true;
    }
  }

  return false;
}

exports.YGIsBaselineLayout = YGIsBaselineLayout;

function YGNodeDimWithMargin(node, axis, widthSize) {
  return node.getLayout().measuredDimensions[internal_1.dim[axis]] + utils_1.YGUnwrapFloatOptional(node.getLeadingMargin(axis, widthSize).add(node.getTrailingMargin(axis, widthSize)));
}

exports.YGNodeDimWithMargin = YGNodeDimWithMargin;

function YGNodeIsStyleDimDefined(node, axis, ownerSize) {
  var isUndefined = YGFloatIsUndefined(node.getResolvedDimension(internal_1.dim[axis]).value);
  return !(node.getResolvedDimension(internal_1.dim[axis]).unit == enums_1.YGUnit.Auto || node.getResolvedDimension(internal_1.dim[axis]).unit == enums_1.YGUnit.Undefined || node.getResolvedDimension(internal_1.dim[axis]).unit == enums_1.YGUnit.Point && !isUndefined && node.getResolvedDimension(internal_1.dim[axis]).value < 0.0 || node.getResolvedDimension(internal_1.dim[axis]).unit == enums_1.YGUnit.Percent && !isUndefined && (node.getResolvedDimension(internal_1.dim[axis]).value < 0.0 || YGFloatIsUndefined(ownerSize)));
}

exports.YGNodeIsStyleDimDefined = YGNodeIsStyleDimDefined;

function YGNodeIsLayoutDimDefined(node, axis) {
  var value = node.getLayout().measuredDimensions[internal_1.dim[axis]];
  return !YGFloatIsUndefined(value) && value >= 0.0;
}

exports.YGNodeIsLayoutDimDefined = YGNodeIsLayoutDimDefined;

function YGNodeBoundAxisWithinMinAndMax(node, axis, value, axisSize) {
  var min;
  var max;

  if (utils_1.YGFlexDirectionIsColumn(axis)) {
    min = utils_1.YGResolveValue(node.getStyle().minDimensions[enums_1.YGDimension.Height], axisSize);
    max = utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Height], axisSize);
  } else if (utils_1.YGFlexDirectionIsRow(axis)) {
    min = utils_1.YGResolveValue(node.getStyle().minDimensions[enums_1.YGDimension.Width], axisSize);
    max = utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Width], axisSize);
  }

  if (!max.isUndefined() && max.getValue() >= 0 && value > max.getValue()) {
    return max;
  }

  if (!min.isUndefined() && min.getValue() >= 0 && value < min.getValue()) {
    return min;
  }

  return new ygfloatoptional_1.YGFloatOptional(value);
}

exports.YGNodeBoundAxisWithinMinAndMax = YGNodeBoundAxisWithinMinAndMax;

function YGNodeBoundAxis(node, axis, value, axisSize, widthSize) {
  return utils_1.YGFloatMax(utils_1.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(node, axis, value, axisSize)), YGNodePaddingAndBorderForAxis(node, axis, widthSize));
}

exports.YGNodeBoundAxis = YGNodeBoundAxis;

function YGNodeSetChildTrailingPosition(node, child, axis) {
  var size = child.getLayout().measuredDimensions[internal_1.dim[axis]];
  child.setLayoutPosition(node.getLayout().measuredDimensions[internal_1.dim[axis]] - size - child.getLayout().position[internal_1.pos[axis]], internal_1.trailing[axis]);
}

exports.YGNodeSetChildTrailingPosition = YGNodeSetChildTrailingPosition;

function YGConstrainMaxSizeForMode(node, axis, ownerAxisSize, ownerWidth, mode, size) {
  var maxSize = utils_1.YGResolveValue(node.getStyle().maxDimensions[internal_1.dim[axis]], ownerAxisSize).add(node.getMarginForAxis(axis, ownerWidth));

  switch (mode.value) {
    case enums_1.YGMeasureMode.Exactly:
    case enums_1.YGMeasureMode.AtMost:
      size.value = maxSize.isUndefined() || size.value < maxSize.getValue() ? size.value : maxSize.getValue();
      break;

    case enums_1.YGMeasureMode.Undefined:
      if (!maxSize.isUndefined()) {
        mode.value = enums_1.YGMeasureMode.AtMost;
        size.value = maxSize.getValue();
      }

      break;
  }
}

exports.YGConstrainMaxSizeForMode = YGConstrainMaxSizeForMode;

function YGNodeComputeFlexBasisForChild(node, child, width, widthMode, height, ownerWidth, ownerHeight, heightMode, direction, config) {
  var mainAxis = utils_1.YGResolveFlexDirection(node.getStyle().flexDirection, direction);
  var isMainAxisRow = utils_1.YGFlexDirectionIsRow(mainAxis);
  var mainAxisSize = isMainAxisRow ? width : height;
  var mainAxisownerSize = isMainAxisRow ? ownerWidth : ownerHeight;
  var childWidth;
  var childHeight;
  var childWidthMeasureMode;
  var childHeightMeasureMode;
  var resolvedFlexBasis = utils_1.YGResolveValue(child.resolveFlexBasisPtr(), mainAxisownerSize);
  var isRowStyleDimDefined = YGNodeIsStyleDimDefined(child, enums_1.YGFlexDirection.Row, ownerWidth);
  var isColumnStyleDimDefined = YGNodeIsStyleDimDefined(child, enums_1.YGFlexDirection.Column, ownerHeight);

  if (!resolvedFlexBasis.isUndefined() && !YGFloatIsUndefined(mainAxisSize)) {
    if (child.getLayout().computedFlexBasis.isUndefined() || YGConfigIsExperimentalFeatureEnabled(child.getConfig(), enums_1.YGExperimentalFeature.WebFlexBasis) && child.getLayout().computedFlexBasisGeneration != gCurrentGenerationCount) {
      var paddingAndBorder = new ygfloatoptional_1.YGFloatOptional(YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth));
      child.setLayoutComputedFlexBasis(utils_1.YGFloatOptionalMax(resolvedFlexBasis, paddingAndBorder));
    }
  } else if (isMainAxisRow && isRowStyleDimDefined) {
    var _paddingAndBorder = new ygfloatoptional_1.YGFloatOptional(YGNodePaddingAndBorderForAxis(child, enums_1.YGFlexDirection.Row, ownerWidth));

    child.setLayoutComputedFlexBasis(utils_1.YGFloatOptionalMax(utils_1.YGResolveValue(child.getResolvedDimension(enums_1.YGDimension.Width), ownerWidth), _paddingAndBorder));
  } else if (!isMainAxisRow && isColumnStyleDimDefined) {
    var _paddingAndBorder2 = new ygfloatoptional_1.YGFloatOptional(YGNodePaddingAndBorderForAxis(child, enums_1.YGFlexDirection.Column, ownerWidth));

    child.setLayoutComputedFlexBasis(utils_1.YGFloatOptionalMax(utils_1.YGResolveValue(child.getResolvedDimension(enums_1.YGDimension.Height), ownerHeight), _paddingAndBorder2));
  } else {
    childWidth = exports.YGUndefined;
    childHeight = exports.YGUndefined;
    childWidthMeasureMode = enums_1.YGMeasureMode.Undefined;
    childHeightMeasureMode = enums_1.YGMeasureMode.Undefined;
    var marginRow = utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(enums_1.YGFlexDirection.Row, ownerWidth));
    var marginColumn = utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(enums_1.YGFlexDirection.Column, ownerWidth));

    if (isRowStyleDimDefined) {
      childWidth = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(child.getResolvedDimension(enums_1.YGDimension.Width), ownerWidth)) + marginRow;
      childWidthMeasureMode = enums_1.YGMeasureMode.Exactly;
    }

    if (isColumnStyleDimDefined) {
      childHeight = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(child.getResolvedDimension(enums_1.YGDimension.Height), ownerHeight)) + marginColumn;
      childHeightMeasureMode = enums_1.YGMeasureMode.Exactly;
    }

    if (!isMainAxisRow && node.getStyle().overflow == enums_1.YGOverflow.Scroll || node.getStyle().overflow != enums_1.YGOverflow.Scroll) {
      if (YGFloatIsUndefined(childWidth) && !YGFloatIsUndefined(width)) {
        childWidth = width;
        childWidthMeasureMode = enums_1.YGMeasureMode.AtMost;
      }
    }

    if (isMainAxisRow && node.getStyle().overflow == enums_1.YGOverflow.Scroll || node.getStyle().overflow != enums_1.YGOverflow.Scroll) {
      if (YGFloatIsUndefined(childHeight) && !YGFloatIsUndefined(height)) {
        childHeight = height;
        childHeightMeasureMode = enums_1.YGMeasureMode.AtMost;
      }
    }

    if (!child.getStyle().aspectRatio.isUndefined()) {
      if (!isMainAxisRow && childWidthMeasureMode == enums_1.YGMeasureMode.Exactly) {
        childHeight = marginColumn + (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
        childHeightMeasureMode = enums_1.YGMeasureMode.Exactly;
      } else if (isMainAxisRow && childHeightMeasureMode == enums_1.YGMeasureMode.Exactly) {
        childWidth = marginRow + (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
        childWidthMeasureMode = enums_1.YGMeasureMode.Exactly;
      }
    }

    var hasExactWidth = !YGFloatIsUndefined(width) && widthMode == enums_1.YGMeasureMode.Exactly;
    var childWidthStretch = YGNodeAlignItem(node, child) == enums_1.YGAlign.Stretch && childWidthMeasureMode != enums_1.YGMeasureMode.Exactly;

    if (!isMainAxisRow && !isRowStyleDimDefined && hasExactWidth && childWidthStretch) {
      childWidth = width;
      childWidthMeasureMode = enums_1.YGMeasureMode.Exactly;

      if (!child.getStyle().aspectRatio.isUndefined()) {
        childHeight = (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
        childHeightMeasureMode = enums_1.YGMeasureMode.Exactly;
      }
    }

    var hasExactHeight = !YGFloatIsUndefined(height) && heightMode == enums_1.YGMeasureMode.Exactly;
    var childHeightStretch = YGNodeAlignItem(node, child) == enums_1.YGAlign.Stretch && childHeightMeasureMode != enums_1.YGMeasureMode.Exactly;

    if (isMainAxisRow && !isColumnStyleDimDefined && hasExactHeight && childHeightStretch) {
      childHeight = height;
      childHeightMeasureMode = enums_1.YGMeasureMode.Exactly;

      if (!child.getStyle().aspectRatio.isUndefined()) {
        childWidth = (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
        childWidthMeasureMode = enums_1.YGMeasureMode.Exactly;
      }
    }

    var childWidthMeasureModeRef = {
      value: childWidthMeasureMode
    };
    var childWidthRef = {
      value: childWidth
    };
    var childHeightMeasureModeRef = {
      value: childHeightMeasureMode
    };
    var childHeightRef = {
      value: childHeight
    };
    YGConstrainMaxSizeForMode(child, enums_1.YGFlexDirection.Row, ownerWidth, ownerWidth, childWidthMeasureModeRef, childWidthRef);
    YGConstrainMaxSizeForMode(child, enums_1.YGFlexDirection.Column, ownerHeight, ownerWidth, childHeightMeasureModeRef, childHeightRef);
    YGLayoutNodeInternal(child, childWidthRef.value, childHeightRef.value, direction, childWidthMeasureModeRef.value, childHeightMeasureModeRef.value, ownerWidth, ownerHeight, false, "measure", config);
    child.setLayoutComputedFlexBasis(new ygfloatoptional_1.YGFloatOptional(utils_1.YGFloatMax(child.getLayout().measuredDimensions[internal_1.dim[mainAxis]], YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth))));
  }

  child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
}

exports.YGNodeComputeFlexBasisForChild = YGNodeComputeFlexBasisForChild;

function YGNodeAbsoluteLayoutChild(node, child, width, widthMode, height, direction, config) {
  var mainAxis = utils_1.YGResolveFlexDirection(node.getStyle().flexDirection, direction);
  var crossAxis = utils_1.YGFlexDirectionCross(mainAxis, direction);
  var isMainAxisRow = utils_1.YGFlexDirectionIsRow(mainAxis);
  var childWidth = exports.YGUndefined;
  var childHeight = exports.YGUndefined;
  var childWidthMeasureMode = enums_1.YGMeasureMode.Undefined;
  var childHeightMeasureMode = enums_1.YGMeasureMode.Undefined;
  var marginRow = utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(enums_1.YGFlexDirection.Row, width));
  var marginColumn = utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(enums_1.YGFlexDirection.Column, width));

  if (YGNodeIsStyleDimDefined(child, enums_1.YGFlexDirection.Row, width)) {
    childWidth = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(child.getResolvedDimension(enums_1.YGDimension.Width), width)) + marginRow;
  } else {
    if (child.isLeadingPositionDefined(enums_1.YGFlexDirection.Row) && child.isTrailingPosDefined(enums_1.YGFlexDirection.Row)) {
      childWidth = node.getLayout().measuredDimensions[enums_1.YGDimension.Width] - (node.getLeadingBorder(enums_1.YGFlexDirection.Row) + node.getTrailingBorder(enums_1.YGFlexDirection.Row)) - utils_1.YGUnwrapFloatOptional(child.getLeadingPosition(enums_1.YGFlexDirection.Row, width).add(child.getTrailingPosition(enums_1.YGFlexDirection.Row, width)));
      childWidth = YGNodeBoundAxis(child, enums_1.YGFlexDirection.Row, childWidth, width, width);
    }
  }

  if (YGNodeIsStyleDimDefined(child, enums_1.YGFlexDirection.Column, height)) {
    childHeight = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(child.getResolvedDimension(enums_1.YGDimension.Height), height)) + marginColumn;
  } else {
    if (child.isLeadingPositionDefined(enums_1.YGFlexDirection.Column) && child.isTrailingPosDefined(enums_1.YGFlexDirection.Column)) {
      childHeight = node.getLayout().measuredDimensions[enums_1.YGDimension.Height] - (node.getLeadingBorder(enums_1.YGFlexDirection.Column) + node.getTrailingBorder(enums_1.YGFlexDirection.Column)) - utils_1.YGUnwrapFloatOptional(child.getLeadingPosition(enums_1.YGFlexDirection.Column, height).add(child.getTrailingPosition(enums_1.YGFlexDirection.Column, height)));
      childHeight = YGNodeBoundAxis(child, enums_1.YGFlexDirection.Column, childHeight, height, width);
    }
  }

  if (YGFloatIsUndefined(childWidth) ? !YGFloatIsUndefined(childHeight) : YGFloatIsUndefined(childHeight)) {
    if (!child.getStyle().aspectRatio.isUndefined()) {
      if (YGFloatIsUndefined(childWidth)) {
        childWidth = marginRow + (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
      } else if (YGFloatIsUndefined(childHeight)) {
        childHeight = marginColumn + (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
      }
    }
  }

  if (YGFloatIsUndefined(childWidth) || YGFloatIsUndefined(childHeight)) {
    childWidthMeasureMode = YGFloatIsUndefined(childWidth) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;
    childHeightMeasureMode = YGFloatIsUndefined(childHeight) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;

    if (!isMainAxisRow && YGFloatIsUndefined(childWidth) && widthMode != enums_1.YGMeasureMode.Undefined && !YGFloatIsUndefined(width) && width > 0) {
      childWidth = width;
      childWidthMeasureMode = enums_1.YGMeasureMode.AtMost;
    }

    YGLayoutNodeInternal(child, childWidth, childHeight, direction, childWidthMeasureMode, childHeightMeasureMode, childWidth, childHeight, false, "abs-measure", config);
    childWidth = child.getLayout().measuredDimensions[enums_1.YGDimension.Width] + utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(enums_1.YGFlexDirection.Row, width));
    childHeight = child.getLayout().measuredDimensions[enums_1.YGDimension.Height] + utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(enums_1.YGFlexDirection.Column, width));
  }

  YGLayoutNodeInternal(child, childWidth, childHeight, direction, enums_1.YGMeasureMode.Exactly, enums_1.YGMeasureMode.Exactly, childWidth, childHeight, true, "abs-layout", config);

  if (child.isTrailingPosDefined(mainAxis) && !child.isLeadingPositionDefined(mainAxis)) {
    child.setLayoutPosition(node.getLayout().measuredDimensions[internal_1.dim[mainAxis]] - child.getLayout().measuredDimensions[internal_1.dim[mainAxis]] - node.getTrailingBorder(mainAxis) - utils_1.YGUnwrapFloatOptional(child.getTrailingMargin(mainAxis, width)) - utils_1.YGUnwrapFloatOptional(child.getTrailingPosition(mainAxis, isMainAxisRow ? width : height)), internal_1.leading[mainAxis]);
  } else if (!child.isLeadingPositionDefined(mainAxis) && node.getStyle().justifyContent == enums_1.YGJustify.Center) {
    child.setLayoutPosition((node.getLayout().measuredDimensions[internal_1.dim[mainAxis]] - child.getLayout().measuredDimensions[internal_1.dim[mainAxis]]) / 2.0, internal_1.leading[mainAxis]);
  } else if (!child.isLeadingPositionDefined(mainAxis) && node.getStyle().justifyContent == enums_1.YGJustify.FlexEnd) {
    child.setLayoutPosition(node.getLayout().measuredDimensions[internal_1.dim[mainAxis]] - child.getLayout().measuredDimensions[internal_1.dim[mainAxis]], internal_1.leading[mainAxis]);
  }

  if (child.isTrailingPosDefined(crossAxis) && !child.isLeadingPositionDefined(crossAxis)) {
    child.setLayoutPosition(node.getLayout().measuredDimensions[internal_1.dim[crossAxis]] - child.getLayout().measuredDimensions[internal_1.dim[crossAxis]] - node.getTrailingBorder(crossAxis) - utils_1.YGUnwrapFloatOptional(child.getTrailingMargin(crossAxis, width)) - utils_1.YGUnwrapFloatOptional(child.getTrailingPosition(crossAxis, isMainAxisRow ? height : width)), internal_1.leading[crossAxis]);
  } else if (!child.isLeadingPositionDefined(crossAxis) && YGNodeAlignItem(node, child) == enums_1.YGAlign.Center) {
    child.setLayoutPosition((node.getLayout().measuredDimensions[internal_1.dim[crossAxis]] - child.getLayout().measuredDimensions[internal_1.dim[crossAxis]]) / 2.0, internal_1.leading[crossAxis]);
  } else if (!child.isLeadingPositionDefined(crossAxis) && (YGNodeAlignItem(node, child) == enums_1.YGAlign.FlexEnd ? !(node.getStyle().flexWrap == enums_1.YGWrap.WrapReverse) : node.getStyle().flexWrap == enums_1.YGWrap.WrapReverse)) {
    child.setLayoutPosition(node.getLayout().measuredDimensions[internal_1.dim[crossAxis]] - child.getLayout().measuredDimensions[internal_1.dim[crossAxis]], internal_1.leading[crossAxis]);
  }
}

exports.YGNodeAbsoluteLayoutChild = YGNodeAbsoluteLayoutChild;

function YGNodeWithMeasureFuncSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight) {
  YGAssertWithNode(node, node.getMeasure() != null, "Expected node to have custom measure function");
  var paddingAndBorderAxisRow = YGNodePaddingAndBorderForAxis(node, enums_1.YGFlexDirection.Row, availableWidth);
  var paddingAndBorderAxisColumn = YGNodePaddingAndBorderForAxis(node, enums_1.YGFlexDirection.Column, availableWidth);
  var marginAxisRow = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Row, availableWidth));
  var marginAxisColumn = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Column, availableWidth));
  var innerWidth = YGFloatIsUndefined(availableWidth) ? availableWidth : utils_1.YGFloatMax(0, availableWidth - marginAxisRow - paddingAndBorderAxisRow);
  var innerHeight = YGFloatIsUndefined(availableHeight) ? availableHeight : utils_1.YGFloatMax(0, availableHeight - marginAxisColumn - paddingAndBorderAxisColumn);

  if (widthMeasureMode == enums_1.YGMeasureMode.Exactly && heightMeasureMode == enums_1.YGMeasureMode.Exactly) {
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Row, availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_1.YGDimension.Width);
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Column, availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_1.YGDimension.Height);
  } else {
    var measuredSize = node.getMeasure()(node, innerWidth, widthMeasureMode, innerHeight, heightMeasureMode);
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Row, widthMeasureMode == enums_1.YGMeasureMode.Undefined || widthMeasureMode == enums_1.YGMeasureMode.AtMost ? measuredSize.width + paddingAndBorderAxisRow : availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_1.YGDimension.Width);
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Column, heightMeasureMode == enums_1.YGMeasureMode.Undefined || heightMeasureMode == enums_1.YGMeasureMode.AtMost ? measuredSize.height + paddingAndBorderAxisColumn : availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_1.YGDimension.Height);
  }
}

exports.YGNodeWithMeasureFuncSetMeasuredDimensions = YGNodeWithMeasureFuncSetMeasuredDimensions;

function YGNodeEmptyContainerSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight) {
  var paddingAndBorderAxisRow = YGNodePaddingAndBorderForAxis(node, enums_1.YGFlexDirection.Row, ownerWidth);
  var paddingAndBorderAxisColumn = YGNodePaddingAndBorderForAxis(node, enums_1.YGFlexDirection.Column, ownerWidth);
  var marginAxisRow = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Row, ownerWidth));
  var marginAxisColumn = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Column, ownerWidth));
  node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Row, widthMeasureMode == enums_1.YGMeasureMode.Undefined || widthMeasureMode == enums_1.YGMeasureMode.AtMost ? paddingAndBorderAxisRow : availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_1.YGDimension.Width);
  node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Column, heightMeasureMode == enums_1.YGMeasureMode.Undefined || heightMeasureMode == enums_1.YGMeasureMode.AtMost ? paddingAndBorderAxisColumn : availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_1.YGDimension.Height);
}

exports.YGNodeEmptyContainerSetMeasuredDimensions = YGNodeEmptyContainerSetMeasuredDimensions;

function YGNodeFixedSizeSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight) {
  if (!YGFloatIsUndefined(availableWidth) && widthMeasureMode == enums_1.YGMeasureMode.AtMost && availableWidth <= 0 || !YGFloatIsUndefined(availableHeight) && heightMeasureMode == enums_1.YGMeasureMode.AtMost && availableHeight <= 0 || widthMeasureMode == enums_1.YGMeasureMode.Exactly && heightMeasureMode == enums_1.YGMeasureMode.Exactly) {
    var marginAxisColumn = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Column, ownerWidth));
    var marginAxisRow = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Row, ownerWidth));
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Row, YGFloatIsUndefined(availableWidth) || widthMeasureMode == enums_1.YGMeasureMode.AtMost && availableWidth < 0 ? 0 : availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_1.YGDimension.Width);
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Column, YGFloatIsUndefined(availableHeight) || heightMeasureMode == enums_1.YGMeasureMode.AtMost && availableHeight < 0 ? 0 : availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_1.YGDimension.Height);
    return true;
  }

  return false;
}

exports.YGNodeFixedSizeSetMeasuredDimensions = YGNodeFixedSizeSetMeasuredDimensions;

function YGZeroOutLayoutRecursivly(node) {
  node.getLayout().clean();
  node.setHasNewLayout(true);
  node.cloneChildrenIfNeeded();
  var childCount = YGNodeGetChildCount(node);

  for (var i = 0; i < childCount; i++) {
    var child = node.getChild(i);
    YGZeroOutLayoutRecursivly(child);
  }
}

exports.YGZeroOutLayoutRecursivly = YGZeroOutLayoutRecursivly;

function YGNodeCalculateAvailableInnerDim(node, axis, availableDim, ownerDim) {
  var direction = utils_1.YGFlexDirectionIsRow(axis) ? enums_1.YGFlexDirection.Row : enums_1.YGFlexDirection.Column;
  var dimension = utils_1.YGFlexDirectionIsRow(axis) ? enums_1.YGDimension.Width : enums_1.YGDimension.Height;
  var margin = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(direction, ownerDim));
  var paddingAndBorder = YGNodePaddingAndBorderForAxis(node, direction, ownerDim);
  var availableInnerDim = availableDim - margin - paddingAndBorder;

  if (!YGFloatIsUndefined(availableInnerDim)) {
    var minDimensionOptional = utils_1.YGResolveValue(node.getStyle().minDimensions[dimension], ownerDim);
    var minInnerDim = minDimensionOptional.isUndefined() ? 0.0 : minDimensionOptional.getValue() - paddingAndBorder;
    var maxDimensionOptional = utils_1.YGResolveValue(node.getStyle().maxDimensions[dimension], ownerDim);
    var maxInnerDim = maxDimensionOptional.isUndefined() ? Number.MAX_VALUE : maxDimensionOptional.getValue() - paddingAndBorder;
    availableInnerDim = utils_1.YGFloatMax(utils_1.YGFloatMin(availableInnerDim, maxInnerDim), minInnerDim);
  }

  return availableInnerDim;
}

exports.YGNodeCalculateAvailableInnerDim = YGNodeCalculateAvailableInnerDim;

function YGNodeComputeFlexBasisForChildren(node, availableInnerWidth, availableInnerHeight, widthMeasureMode, heightMeasureMode, direction, mainAxis, config, performLayout, totalOuterFlexBasisRef) {
  var singleFlexChild = null;
  var children = node.getChildren();
  var measureModeMainDim = utils_1.YGFlexDirectionIsRow(mainAxis) ? widthMeasureMode : heightMeasureMode;

  if (measureModeMainDim == enums_1.YGMeasureMode.Exactly) {
    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.isNodeFlexible()) {
        if (singleFlexChild != null || utils_1.YGFloatsEqual(child.resolveFlexGrow(), 0.0) || utils_1.YGFloatsEqual(child.resolveFlexShrink(), 0.0)) {
          singleFlexChild = null;
          break;
        } else {
          singleFlexChild = child;
        }
      }
    }
  }

  for (var _i3 = 0; _i3 < children.length; ++_i3) {
    var _child = children[_i3];

    _child.resolveDimension();

    if (_child.getStyle().display == enums_1.YGDisplay.None) {
      YGZeroOutLayoutRecursivly(_child);

      _child.setHasNewLayout(true);

      _child.setDirty(false);

      continue;
    }

    if (performLayout) {
      var childDirection = _child.resolveDirection(direction);

      var mainDim = utils_1.YGFlexDirectionIsRow(mainAxis) ? availableInnerWidth : availableInnerHeight;
      var crossDim = utils_1.YGFlexDirectionIsRow(mainAxis) ? availableInnerHeight : availableInnerWidth;

      _child.setPosition(childDirection, mainDim, crossDim, availableInnerWidth);
    }

    if (_child.getStyle().positionType == enums_1.YGPositionType.Absolute) {
      continue;
    }

    if (_child == singleFlexChild) {
      _child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);

      _child.setLayoutComputedFlexBasis(new ygfloatoptional_1.YGFloatOptional(0));
    } else {
      YGNodeComputeFlexBasisForChild(node, _child, availableInnerWidth, widthMeasureMode, availableInnerHeight, availableInnerWidth, availableInnerHeight, heightMeasureMode, direction, config);
    }

    totalOuterFlexBasisRef.value += utils_1.YGUnwrapFloatOptional(_child.getLayout().computedFlexBasis.add(_child.getMarginForAxis(mainAxis, availableInnerWidth)));
  }
}

exports.YGNodeComputeFlexBasisForChildren = YGNodeComputeFlexBasisForChildren;

function YGCalculateCollectFlexItemsRowValues(node, ownerDirection, mainAxisownerSize, availableInnerWidth, availableInnerMainDim, startOfLineIndex, lineCount) {
  var flexAlgoRowMeasurement = new utils_1.YGCollectFlexItemsRowValues();
  var sizeConsumedOnCurrentLineIncludingMinConstraint = 0;
  var mainAxis = utils_1.YGResolveFlexDirection(node.getStyle().flexDirection, node.resolveDirection(ownerDirection));
  var isNodeFlexWrap = node.getStyle().flexWrap != enums_1.YGWrap.NoWrap;
  var endOfLineIndex = startOfLineIndex;

  for (; endOfLineIndex < node.getChildrenCount(); endOfLineIndex++) {
    var child = node.getChild(endOfLineIndex);

    if (child.getStyle().display == enums_1.YGDisplay.None || child.getStyle().positionType == enums_1.YGPositionType.Absolute) {
      continue;
    }

    child.setLineIndex(lineCount);
    var childMarginMainAxis = utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth));
    var flexBasisWithMinAndMaxConstraints = utils_1.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(child, mainAxis, utils_1.YGUnwrapFloatOptional(child.getLayout().computedFlexBasis), mainAxisownerSize));

    if (sizeConsumedOnCurrentLineIncludingMinConstraint + flexBasisWithMinAndMaxConstraints + childMarginMainAxis > availableInnerMainDim && isNodeFlexWrap && flexAlgoRowMeasurement.itemsOnLine > 0) {
      break;
    }

    sizeConsumedOnCurrentLineIncludingMinConstraint += flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
    flexAlgoRowMeasurement.sizeConsumedOnCurrentLine += flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
    flexAlgoRowMeasurement.itemsOnLine++;

    if (child.isNodeFlexible()) {
      flexAlgoRowMeasurement.totalFlexGrowFactors += child.resolveFlexGrow();
      flexAlgoRowMeasurement.totalFlexShrinkScaledFactors += -child.resolveFlexShrink() * utils_1.YGUnwrapFloatOptional(child.getLayout().computedFlexBasis);
    }

    flexAlgoRowMeasurement.relativeChildren.push(child);
  }

  if (flexAlgoRowMeasurement.totalFlexGrowFactors > 0 && flexAlgoRowMeasurement.totalFlexGrowFactors < 1) {
    flexAlgoRowMeasurement.totalFlexGrowFactors = 1;
  }

  if (flexAlgoRowMeasurement.totalFlexShrinkScaledFactors > 0 && flexAlgoRowMeasurement.totalFlexShrinkScaledFactors < 1) {
    flexAlgoRowMeasurement.totalFlexShrinkScaledFactors = 1;
  }

  flexAlgoRowMeasurement.endOfLineIndex = endOfLineIndex;
  return flexAlgoRowMeasurement;
}

exports.YGCalculateCollectFlexItemsRowValues = YGCalculateCollectFlexItemsRowValues;

function YGDistributeFreeSpaceSecondPass(collectedFlexItemsValues, node, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config) {
  var childFlexBasis = 0;
  var flexShrinkScaledFactor = 0;
  var flexGrowFactor = 0;
  var deltaFreeSpace = 0;
  var isMainAxisRow = utils_1.YGFlexDirectionIsRow(mainAxis);
  var isNodeFlexWrap = node.getStyle().flexWrap != enums_1.YGWrap.NoWrap;

  for (var i = 0; i < collectedFlexItemsValues.relativeChildren.length; ++i) {
    var currentRelativeChild = collectedFlexItemsValues.relativeChildren[i];
    childFlexBasis = utils_1.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(currentRelativeChild, mainAxis, utils_1.YGUnwrapFloatOptional(currentRelativeChild.getLayout().computedFlexBasis), mainAxisownerSize));
    var updatedMainSize = childFlexBasis;

    if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) && collectedFlexItemsValues.remainingFreeSpace < 0) {
      flexShrinkScaledFactor = -currentRelativeChild.resolveFlexShrink() * childFlexBasis;

      if (flexShrinkScaledFactor != 0) {
        var childSize = void 0;

        if (!YGFloatIsUndefined(collectedFlexItemsValues.totalFlexShrinkScaledFactors) && collectedFlexItemsValues.totalFlexShrinkScaledFactors == 0) {
          childSize = childFlexBasis + flexShrinkScaledFactor;
        } else {
          childSize = childFlexBasis + collectedFlexItemsValues.remainingFreeSpace / collectedFlexItemsValues.totalFlexShrinkScaledFactors * flexShrinkScaledFactor;
        }

        updatedMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, childSize, availableInnerMainDim, availableInnerWidth);
      }
    } else if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) && collectedFlexItemsValues.remainingFreeSpace > 0) {
      flexGrowFactor = currentRelativeChild.resolveFlexGrow();

      if (!YGFloatIsUndefined(flexGrowFactor) && flexGrowFactor != 0) {
        updatedMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, childFlexBasis + collectedFlexItemsValues.remainingFreeSpace / collectedFlexItemsValues.totalFlexGrowFactors * flexGrowFactor, availableInnerMainDim, availableInnerWidth);
      }
    }

    deltaFreeSpace += updatedMainSize - childFlexBasis;
    var marginMain = utils_1.YGUnwrapFloatOptional(currentRelativeChild.getMarginForAxis(mainAxis, availableInnerWidth));
    var marginCross = utils_1.YGUnwrapFloatOptional(currentRelativeChild.getMarginForAxis(crossAxis, availableInnerWidth));
    var childCrossSize = void 0;
    var childMainSize = updatedMainSize + marginMain;
    var childCrossMeasureMode = void 0;
    var childMainMeasureMode = enums_1.YGMeasureMode.Exactly;

    if (!currentRelativeChild.getStyle().aspectRatio.isUndefined()) {
      childCrossSize = isMainAxisRow ? (childMainSize - marginMain) / currentRelativeChild.getStyle().aspectRatio.getValue() : (childMainSize - marginMain) * currentRelativeChild.getStyle().aspectRatio.getValue();
      childCrossMeasureMode = enums_1.YGMeasureMode.Exactly;
      childCrossSize += marginCross;
    } else if (!YGFloatIsUndefined(availableInnerCrossDim) && !YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim) && measureModeCrossDim == enums_1.YGMeasureMode.Exactly && !(isNodeFlexWrap && flexBasisOverflows) && YGNodeAlignItem(node, currentRelativeChild) == enums_1.YGAlign.Stretch && currentRelativeChild.marginLeadingValue(crossAxis).unit != enums_1.YGUnit.Auto && currentRelativeChild.marginTrailingValue(crossAxis).unit != enums_1.YGUnit.Auto) {
      childCrossSize = availableInnerCrossDim;
      childCrossMeasureMode = enums_1.YGMeasureMode.Exactly;
    } else if (!YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim)) {
      childCrossSize = availableInnerCrossDim;
      childCrossMeasureMode = YGFloatIsUndefined(childCrossSize) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.AtMost;
    } else {
      childCrossSize = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(currentRelativeChild.getResolvedDimension(internal_1.dim[crossAxis]), availableInnerCrossDim)) + marginCross;
      var isLoosePercentageMeasurement = currentRelativeChild.getResolvedDimension(internal_1.dim[crossAxis]).unit == enums_1.YGUnit.Percent && measureModeCrossDim != enums_1.YGMeasureMode.Exactly;
      childCrossMeasureMode = YGFloatIsUndefined(childCrossSize) || isLoosePercentageMeasurement ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;
    }

    var childMainMeasureModeRef = {
      value: childMainMeasureMode
    };
    var childMainSizeRef = {
      value: childMainSize
    };
    var childCrossMeasureModeRef = {
      value: childCrossMeasureMode
    };
    var childCrossSizeRef = {
      value: childCrossSize
    };
    YGConstrainMaxSizeForMode(currentRelativeChild, mainAxis, availableInnerMainDim, availableInnerWidth, childMainMeasureModeRef, childMainSizeRef);
    YGConstrainMaxSizeForMode(currentRelativeChild, crossAxis, availableInnerCrossDim, availableInnerWidth, childCrossMeasureModeRef, childCrossSizeRef);
    childMainMeasureMode = childMainMeasureModeRef.value;
    childMainSize = childMainSizeRef.value;
    childCrossMeasureMode = childCrossMeasureModeRef.value;
    childCrossSize = childCrossSizeRef.value;
    var requiresStretchLayout = !YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim) && YGNodeAlignItem(node, currentRelativeChild) == enums_1.YGAlign.Stretch && currentRelativeChild.marginLeadingValue(crossAxis).unit != enums_1.YGUnit.Auto && currentRelativeChild.marginTrailingValue(crossAxis).unit != enums_1.YGUnit.Auto;
    var childWidth = isMainAxisRow ? childMainSize : childCrossSize;
    var childHeight = !isMainAxisRow ? childMainSize : childCrossSize;
    var childWidthMeasureMode = isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
    var childHeightMeasureMode = !isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
    YGLayoutNodeInternal(currentRelativeChild, childWidth, childHeight, node.getLayout().direction, childWidthMeasureMode, childHeightMeasureMode, availableInnerWidth, availableInnerHeight, performLayout && !requiresStretchLayout, "flex", config);
    node.setLayoutHadOverflow(node.getLayout().hadOverflow || currentRelativeChild.getLayout().hadOverflow);
  }

  return deltaFreeSpace;
}

exports.YGDistributeFreeSpaceSecondPass = YGDistributeFreeSpaceSecondPass;

function YGDistributeFreeSpaceFirstPass(collectedFlexItemsValues, mainAxis, mainAxisownerSize, availableInnerMainDim, availableInnerWidth) {
  var flexShrinkScaledFactor = 0;
  var flexGrowFactor = 0;
  var baseMainSize = 0;
  var boundMainSize = 0;
  var deltaFreeSpace = 0;

  for (var i = 0; i < collectedFlexItemsValues.relativeChildren.length; ++i) {
    var currentRelativeChild = collectedFlexItemsValues.relativeChildren[i];
    var childFlexBasis = utils_1.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(currentRelativeChild, mainAxis, utils_1.YGUnwrapFloatOptional(currentRelativeChild.getLayout().computedFlexBasis), mainAxisownerSize));

    if (collectedFlexItemsValues.remainingFreeSpace < 0) {
      flexShrinkScaledFactor = -currentRelativeChild.resolveFlexShrink() * childFlexBasis;

      if (!YGFloatIsUndefined(flexShrinkScaledFactor) && flexShrinkScaledFactor != 0) {
        baseMainSize = childFlexBasis + collectedFlexItemsValues.remainingFreeSpace / collectedFlexItemsValues.totalFlexShrinkScaledFactors * flexShrinkScaledFactor;
        boundMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, baseMainSize, availableInnerMainDim, availableInnerWidth);

        if (!YGFloatIsUndefined(baseMainSize) && !YGFloatIsUndefined(boundMainSize) && baseMainSize != boundMainSize) {
          deltaFreeSpace += boundMainSize - childFlexBasis;
          collectedFlexItemsValues.totalFlexShrinkScaledFactors -= flexShrinkScaledFactor;
        }
      }
    } else if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) && collectedFlexItemsValues.remainingFreeSpace > 0) {
      flexGrowFactor = currentRelativeChild.resolveFlexGrow();

      if (!YGFloatIsUndefined(flexGrowFactor) && flexGrowFactor != 0) {
        baseMainSize = childFlexBasis + collectedFlexItemsValues.remainingFreeSpace / collectedFlexItemsValues.totalFlexGrowFactors * flexGrowFactor;
        boundMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, baseMainSize, availableInnerMainDim, availableInnerWidth);

        if (!YGFloatIsUndefined(baseMainSize) && !YGFloatIsUndefined(boundMainSize) && baseMainSize != boundMainSize) {
          deltaFreeSpace += boundMainSize - childFlexBasis;
          collectedFlexItemsValues.totalFlexGrowFactors -= flexGrowFactor;
        }
      }
    }
  }

  collectedFlexItemsValues.remainingFreeSpace -= deltaFreeSpace;
}

exports.YGDistributeFreeSpaceFirstPass = YGDistributeFreeSpaceFirstPass;

function YGResolveFlexibleLength(node, collectedFlexItemsValues, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config) {
  var originalFreeSpace = collectedFlexItemsValues.remainingFreeSpace;
  YGDistributeFreeSpaceFirstPass(collectedFlexItemsValues, mainAxis, mainAxisownerSize, availableInnerMainDim, availableInnerWidth);
  var distributedFreeSpace = YGDistributeFreeSpaceSecondPass(collectedFlexItemsValues, node, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config);
  collectedFlexItemsValues.remainingFreeSpace = originalFreeSpace - distributedFreeSpace;
}

exports.YGResolveFlexibleLength = YGResolveFlexibleLength;

function YGJustifyMainAxis(node, collectedFlexItemsValues, startOfLineIndex, mainAxis, crossAxis, measureModeMainDim, measureModeCrossDim, mainAxisownerSize, ownerWidth, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, performLayout) {
  var style = node.getStyle();

  if (measureModeMainDim == enums_1.YGMeasureMode.AtMost && collectedFlexItemsValues.remainingFreeSpace > 0) {
    if (style.minDimensions[internal_1.dim[mainAxis]].unit != enums_1.YGUnit.Undefined && !utils_1.YGResolveValue(style.minDimensions[internal_1.dim[mainAxis]], mainAxisownerSize).isUndefined()) {
      collectedFlexItemsValues.remainingFreeSpace = utils_1.YGFloatMax(0, utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(style.minDimensions[internal_1.dim[mainAxis]], mainAxisownerSize)) - (availableInnerMainDim - collectedFlexItemsValues.remainingFreeSpace));
    } else {
      collectedFlexItemsValues.remainingFreeSpace = 0;
    }
  }

  var numberOfAutoMarginsOnCurrentLine = 0;

  for (var i = startOfLineIndex; i < collectedFlexItemsValues.endOfLineIndex; i++) {
    var child = node.getChild(i);

    if (child.getStyle().positionType == enums_1.YGPositionType.Relative) {
      if (child.marginLeadingValue(mainAxis).unit == enums_1.YGUnit.Auto) {
        numberOfAutoMarginsOnCurrentLine++;
      }

      if (child.marginTrailingValue(mainAxis).unit == enums_1.YGUnit.Auto) {
        numberOfAutoMarginsOnCurrentLine++;
      }
    }
  }

  var leadingMainDim = 0;
  var betweenMainDim = 0;
  var justifyContent = node.getStyle().justifyContent;

  if (numberOfAutoMarginsOnCurrentLine == 0) {
    switch (justifyContent) {
      case enums_1.YGJustify.Center:
        leadingMainDim = collectedFlexItemsValues.remainingFreeSpace / 2;
        break;

      case enums_1.YGJustify.FlexEnd:
        leadingMainDim = collectedFlexItemsValues.remainingFreeSpace;
        break;

      case enums_1.YGJustify.SpaceBetween:
        if (collectedFlexItemsValues.itemsOnLine > 1) {
          betweenMainDim = utils_1.YGFloatMax(collectedFlexItemsValues.remainingFreeSpace, 0) / (collectedFlexItemsValues.itemsOnLine - 1);
        } else {
          betweenMainDim = 0;
        }

        break;

      case enums_1.YGJustify.SpaceEvenly:
        betweenMainDim = collectedFlexItemsValues.remainingFreeSpace / (collectedFlexItemsValues.itemsOnLine + 1);
        leadingMainDim = betweenMainDim;
        break;

      case enums_1.YGJustify.SpaceAround:
        betweenMainDim = collectedFlexItemsValues.remainingFreeSpace / collectedFlexItemsValues.itemsOnLine;
        leadingMainDim = betweenMainDim / 2;
        break;

      case enums_1.YGJustify.FlexStart:
        break;
    }
  }

  var leadingPaddingAndBorderMain = utils_1.YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(mainAxis, ownerWidth));
  collectedFlexItemsValues.mainDim = leadingPaddingAndBorderMain + leadingMainDim;
  collectedFlexItemsValues.crossDim = 0;

  for (var _i4 = startOfLineIndex; _i4 < collectedFlexItemsValues.endOfLineIndex; _i4++) {
    var _child2 = node.getChild(_i4);

    var childStyle = _child2.getStyle();

    var childLayout = _child2.getLayout();

    if (childStyle.display == enums_1.YGDisplay.None) {
      continue;
    }

    if (childStyle.positionType == enums_1.YGPositionType.Absolute && _child2.isLeadingPositionDefined(mainAxis)) {
      if (performLayout) {
        _child2.setLayoutPosition(utils_1.YGUnwrapFloatOptional(_child2.getLeadingPosition(mainAxis, availableInnerMainDim)) + node.getLeadingBorder(mainAxis) + utils_1.YGUnwrapFloatOptional(_child2.getLeadingMargin(mainAxis, availableInnerWidth)), internal_1.pos[mainAxis]);
      }
    } else {
      if (childStyle.positionType == enums_1.YGPositionType.Relative) {
        if (_child2.marginLeadingValue(mainAxis).unit == enums_1.YGUnit.Auto) {
          collectedFlexItemsValues.mainDim += collectedFlexItemsValues.remainingFreeSpace / numberOfAutoMarginsOnCurrentLine;
        }

        if (performLayout) {
          _child2.setLayoutPosition(childLayout.position[internal_1.pos[mainAxis]] + collectedFlexItemsValues.mainDim, internal_1.pos[mainAxis]);
        }

        if (_child2.marginTrailingValue(mainAxis).unit == enums_1.YGUnit.Auto) {
          collectedFlexItemsValues.mainDim += collectedFlexItemsValues.remainingFreeSpace / numberOfAutoMarginsOnCurrentLine;
        }

        var canSkipFlex = !performLayout && measureModeCrossDim == enums_1.YGMeasureMode.Exactly;

        if (canSkipFlex) {
          collectedFlexItemsValues.mainDim += betweenMainDim + utils_1.YGUnwrapFloatOptional(_child2.getMarginForAxis(mainAxis, availableInnerWidth)) + utils_1.YGUnwrapFloatOptional(childLayout.computedFlexBasis);
          collectedFlexItemsValues.crossDim = availableInnerCrossDim;
        } else {
          collectedFlexItemsValues.mainDim += betweenMainDim + YGNodeDimWithMargin(_child2, mainAxis, availableInnerWidth);
          collectedFlexItemsValues.crossDim = utils_1.YGFloatMax(collectedFlexItemsValues.crossDim, YGNodeDimWithMargin(_child2, crossAxis, availableInnerWidth));
        }
      } else if (performLayout) {
        _child2.setLayoutPosition(childLayout.position[internal_1.pos[mainAxis]] + node.getLeadingBorder(mainAxis) + leadingMainDim, internal_1.pos[mainAxis]);
      }
    }
  }

  collectedFlexItemsValues.mainDim += utils_1.YGUnwrapFloatOptional(node.getTrailingPaddingAndBorder(mainAxis, ownerWidth));
}

exports.YGJustifyMainAxis = YGJustifyMainAxis;

function YGNodelayoutImpl(node, availableWidth, availableHeight, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, performLayout, config) {
  YGAssertWithNode(node, YGFloatIsUndefined(availableWidth) ? widthMeasureMode == enums_1.YGMeasureMode.Undefined : true, "availableWidth is indefinite so widthMeasureMode must be YGMeasureMode.Undefined");
  YGAssertWithNode(node, YGFloatIsUndefined(availableHeight) ? heightMeasureMode == enums_1.YGMeasureMode.Undefined : true, "availableHeight is indefinite so heightMeasureMode must be YGMeasureMode.Undefined");
  var direction = node.resolveDirection(ownerDirection);
  node.setLayoutDirection(direction);
  var flexRowDirection = utils_1.YGResolveFlexDirection(enums_1.YGFlexDirection.Row, direction);
  var flexColumnDirection = utils_1.YGResolveFlexDirection(enums_1.YGFlexDirection.Column, direction);
  node.setLayoutMargin(utils_1.YGUnwrapFloatOptional(node.getLeadingMargin(flexRowDirection, ownerWidth)), enums_1.YGEdge.Start);
  node.setLayoutMargin(utils_1.YGUnwrapFloatOptional(node.getTrailingMargin(flexRowDirection, ownerWidth)), enums_1.YGEdge.End);
  node.setLayoutMargin(utils_1.YGUnwrapFloatOptional(node.getLeadingMargin(flexColumnDirection, ownerWidth)), enums_1.YGEdge.Top);
  node.setLayoutMargin(utils_1.YGUnwrapFloatOptional(node.getTrailingMargin(flexColumnDirection, ownerWidth)), enums_1.YGEdge.Bottom);
  node.setLayoutBorder(node.getLeadingBorder(flexRowDirection), enums_1.YGEdge.Start);
  node.setLayoutBorder(node.getTrailingBorder(flexRowDirection), enums_1.YGEdge.End);
  node.setLayoutBorder(node.getLeadingBorder(flexColumnDirection), enums_1.YGEdge.Top);
  node.setLayoutBorder(node.getTrailingBorder(flexColumnDirection), enums_1.YGEdge.Bottom);
  node.setLayoutPadding(utils_1.YGUnwrapFloatOptional(node.getLeadingPadding(flexRowDirection, ownerWidth)), enums_1.YGEdge.Start);
  node.setLayoutPadding(utils_1.YGUnwrapFloatOptional(node.getTrailingPadding(flexRowDirection, ownerWidth)), enums_1.YGEdge.End);
  node.setLayoutPadding(utils_1.YGUnwrapFloatOptional(node.getLeadingPadding(flexColumnDirection, ownerWidth)), enums_1.YGEdge.Top);
  node.setLayoutPadding(utils_1.YGUnwrapFloatOptional(node.getTrailingPadding(flexColumnDirection, ownerWidth)), enums_1.YGEdge.Bottom);

  if (node.getMeasure() != null) {
    YGNodeWithMeasureFuncSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight);
    return;
  }

  var childCount = YGNodeGetChildCount(node);

  if (childCount == 0) {
    YGNodeEmptyContainerSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight);
    return;
  }

  if (!performLayout && YGNodeFixedSizeSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight)) {
    return;
  }

  node.cloneChildrenIfNeeded();
  node.setLayoutHadOverflow(false);
  var mainAxis = utils_1.YGResolveFlexDirection(node.getStyle().flexDirection, direction);
  var crossAxis = utils_1.YGFlexDirectionCross(mainAxis, direction);
  var isMainAxisRow = utils_1.YGFlexDirectionIsRow(mainAxis);
  var isNodeFlexWrap = node.getStyle().flexWrap != enums_1.YGWrap.NoWrap;
  var mainAxisownerSize = isMainAxisRow ? ownerWidth : ownerHeight;
  var crossAxisownerSize = isMainAxisRow ? ownerHeight : ownerWidth;
  var leadingPaddingAndBorderCross = utils_1.YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(crossAxis, ownerWidth));
  var paddingAndBorderAxisMain = YGNodePaddingAndBorderForAxis(node, mainAxis, ownerWidth);
  var paddingAndBorderAxisCross = YGNodePaddingAndBorderForAxis(node, crossAxis, ownerWidth);
  var measureModeMainDim = isMainAxisRow ? widthMeasureMode : heightMeasureMode;
  var measureModeCrossDim = isMainAxisRow ? heightMeasureMode : widthMeasureMode;
  var paddingAndBorderAxisRow = isMainAxisRow ? paddingAndBorderAxisMain : paddingAndBorderAxisCross;
  var paddingAndBorderAxisColumn = isMainAxisRow ? paddingAndBorderAxisCross : paddingAndBorderAxisMain;
  var marginAxisRow = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Row, ownerWidth));
  var marginAxisColumn = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Column, ownerWidth));
  var minInnerWidth = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getStyle().minDimensions[enums_1.YGDimension.Width], ownerWidth)) - paddingAndBorderAxisRow;
  var maxInnerWidth = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Width], ownerWidth)) - paddingAndBorderAxisRow;
  var minInnerHeight = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getStyle().minDimensions[enums_1.YGDimension.Height], ownerHeight)) - paddingAndBorderAxisColumn;
  var maxInnerHeight = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Height], ownerHeight)) - paddingAndBorderAxisColumn;
  var minInnerMainDim = isMainAxisRow ? minInnerWidth : minInnerHeight;
  var maxInnerMainDim = isMainAxisRow ? maxInnerWidth : maxInnerHeight;
  var availableInnerWidth = YGNodeCalculateAvailableInnerDim(node, enums_1.YGFlexDirection.Row, availableWidth, ownerWidth);
  var availableInnerHeight = YGNodeCalculateAvailableInnerDim(node, enums_1.YGFlexDirection.Column, availableHeight, ownerHeight);
  var availableInnerMainDim = isMainAxisRow ? availableInnerWidth : availableInnerHeight;
  var availableInnerCrossDim = isMainAxisRow ? availableInnerHeight : availableInnerWidth;
  var totalOuterFlexBasis = {
    value: 0
  };
  YGNodeComputeFlexBasisForChildren(node, availableInnerWidth, availableInnerHeight, widthMeasureMode, heightMeasureMode, direction, mainAxis, config, performLayout, totalOuterFlexBasis);
  var flexBasisOverflows = measureModeMainDim == enums_1.YGMeasureMode.Undefined ? false : totalOuterFlexBasis.value > availableInnerMainDim;

  if (isNodeFlexWrap && flexBasisOverflows && measureModeMainDim == enums_1.YGMeasureMode.AtMost) {
    measureModeMainDim = enums_1.YGMeasureMode.Exactly;
  }

  var startOfLineIndex = 0;
  var endOfLineIndex = 0;
  var lineCount = 0;
  var totalLineCrossDim = 0;
  var maxLineMainDim = 0;
  var collectedFlexItemsValues;

  for (; endOfLineIndex < childCount; lineCount++, startOfLineIndex = endOfLineIndex) {
    collectedFlexItemsValues = YGCalculateCollectFlexItemsRowValues(node, ownerDirection, mainAxisownerSize, availableInnerWidth, availableInnerMainDim, startOfLineIndex, lineCount);
    endOfLineIndex = collectedFlexItemsValues.endOfLineIndex;
    var canSkipFlex = !performLayout && measureModeCrossDim == enums_1.YGMeasureMode.Exactly;
    var sizeBasedOnContent = false;

    if (measureModeMainDim != enums_1.YGMeasureMode.Exactly) {
      if (!YGFloatIsUndefined(minInnerMainDim) && collectedFlexItemsValues.sizeConsumedOnCurrentLine < minInnerMainDim) {
        availableInnerMainDim = minInnerMainDim;
      } else if (!YGFloatIsUndefined(maxInnerMainDim) && collectedFlexItemsValues.sizeConsumedOnCurrentLine > maxInnerMainDim) {
        availableInnerMainDim = maxInnerMainDim;
      } else {
        if (!node.getConfig().useLegacyStretchBehaviour && (YGFloatIsUndefined(collectedFlexItemsValues.totalFlexGrowFactors) && collectedFlexItemsValues.totalFlexGrowFactors == 0 || YGFloatIsUndefined(node.resolveFlexGrow()) && node.resolveFlexGrow() == 0)) {
          availableInnerMainDim = collectedFlexItemsValues.sizeConsumedOnCurrentLine;
        }

        if (node.getConfig().useLegacyStretchBehaviour) {
          node.setLayoutDidUseLegacyFlag(true);
        }

        sizeBasedOnContent = !node.getConfig().useLegacyStretchBehaviour;
      }
    }

    if (!sizeBasedOnContent && !YGFloatIsUndefined(availableInnerMainDim)) {
      collectedFlexItemsValues.remainingFreeSpace = availableInnerMainDim - collectedFlexItemsValues.sizeConsumedOnCurrentLine;
    } else if (collectedFlexItemsValues.sizeConsumedOnCurrentLine < 0) {
      collectedFlexItemsValues.remainingFreeSpace = -collectedFlexItemsValues.sizeConsumedOnCurrentLine;
    }

    if (!canSkipFlex) {
      YGResolveFlexibleLength(node, collectedFlexItemsValues, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config);
    }

    node.setLayoutHadOverflow(node.getLayout().hadOverflow || collectedFlexItemsValues.remainingFreeSpace < 0);
    YGJustifyMainAxis(node, collectedFlexItemsValues, startOfLineIndex, mainAxis, crossAxis, measureModeMainDim, measureModeCrossDim, mainAxisownerSize, ownerWidth, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, performLayout);
    var containerCrossAxis = availableInnerCrossDim;

    if (measureModeCrossDim == enums_1.YGMeasureMode.Undefined || measureModeCrossDim == enums_1.YGMeasureMode.AtMost) {
      containerCrossAxis = YGNodeBoundAxis(node, crossAxis, collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross, crossAxisownerSize, ownerWidth) - paddingAndBorderAxisCross;
    }

    if (!isNodeFlexWrap && measureModeCrossDim == enums_1.YGMeasureMode.Exactly) {
      collectedFlexItemsValues.crossDim = availableInnerCrossDim;
    }

    collectedFlexItemsValues.crossDim = YGNodeBoundAxis(node, crossAxis, collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross, crossAxisownerSize, ownerWidth) - paddingAndBorderAxisCross;

    if (performLayout) {
      for (var i = startOfLineIndex; i < endOfLineIndex; i++) {
        var child = node.getChild(i);

        if (child.getStyle().display == enums_1.YGDisplay.None) {
          continue;
        }

        if (child.getStyle().positionType == enums_1.YGPositionType.Absolute) {
          var isChildLeadingPosDefined = child.isLeadingPositionDefined(crossAxis);

          if (isChildLeadingPosDefined) {
            child.setLayoutPosition(utils_1.YGUnwrapFloatOptional(child.getLeadingPosition(crossAxis, availableInnerCrossDim)) + node.getLeadingBorder(crossAxis) + utils_1.YGUnwrapFloatOptional(child.getLeadingMargin(crossAxis, availableInnerWidth)), internal_1.pos[crossAxis]);
          }

          if (!isChildLeadingPosDefined || YGFloatIsUndefined(child.getLayout().position[internal_1.pos[crossAxis]])) {
            child.setLayoutPosition(node.getLeadingBorder(crossAxis) + utils_1.YGUnwrapFloatOptional(child.getLeadingMargin(crossAxis, availableInnerWidth)), internal_1.pos[crossAxis]);
          }
        } else {
          var leadingCrossDim = leadingPaddingAndBorderCross;
          var alignItem = YGNodeAlignItem(node, child);

          if (alignItem == enums_1.YGAlign.Stretch && child.marginLeadingValue(crossAxis).unit != enums_1.YGUnit.Auto && child.marginTrailingValue(crossAxis).unit != enums_1.YGUnit.Auto) {
            if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
              var childMainSize = child.getLayout().measuredDimensions[internal_1.dim[mainAxis]];
              var childCrossSize = !child.getStyle().aspectRatio.isUndefined() ? utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(crossAxis, availableInnerWidth)) + (isMainAxisRow ? childMainSize / child.getStyle().aspectRatio.getValue() : childMainSize * child.getStyle().aspectRatio.getValue()) : collectedFlexItemsValues.crossDim;
              childMainSize += utils_1.YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth));
              var childMainMeasureMode = enums_1.YGMeasureMode.Exactly;
              var childCrossMeasureMode = enums_1.YGMeasureMode.Exactly;
              var childMainMeasureModeRef = {
                value: childMainMeasureMode
              };
              var childMainSizeRef = {
                value: childMainSize
              };
              var childCrossMeasureModeRef = {
                value: childCrossMeasureMode
              };
              var childCrossSizeRef = {
                value: childCrossSize
              };
              YGConstrainMaxSizeForMode(child, mainAxis, availableInnerMainDim, availableInnerWidth, childMainMeasureModeRef, childMainSizeRef);
              YGConstrainMaxSizeForMode(child, crossAxis, availableInnerCrossDim, availableInnerWidth, childCrossMeasureModeRef, childCrossSizeRef);
              childMainMeasureMode = childMainMeasureModeRef.value;
              childMainSize = childMainSizeRef.value;
              childCrossMeasureMode = childCrossMeasureModeRef.value;
              childCrossSize = childCrossSizeRef.value;
              var childWidth = isMainAxisRow ? childMainSize : childCrossSize;
              var childHeight = !isMainAxisRow ? childMainSize : childCrossSize;
              var childWidthMeasureMode = YGFloatIsUndefined(childWidth) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;
              var childHeightMeasureMode = YGFloatIsUndefined(childHeight) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;
              YGLayoutNodeInternal(child, childWidth, childHeight, direction, childWidthMeasureMode, childHeightMeasureMode, availableInnerWidth, availableInnerHeight, true, "stretch", config);
            }
          } else {
            var remainingCrossDim = containerCrossAxis - YGNodeDimWithMargin(child, crossAxis, availableInnerWidth);

            if (child.marginLeadingValue(crossAxis).unit == enums_1.YGUnit.Auto && child.marginTrailingValue(crossAxis).unit == enums_1.YGUnit.Auto) {
              leadingCrossDim += utils_1.YGFloatMax(0.0, remainingCrossDim / 2);
            } else if (child.marginTrailingValue(crossAxis).unit == enums_1.YGUnit.Auto) {} else if (child.marginLeadingValue(crossAxis).unit == enums_1.YGUnit.Auto) {
              leadingCrossDim += utils_1.YGFloatMax(0.0, remainingCrossDim);
            } else if (alignItem == enums_1.YGAlign.FlexStart) {} else if (alignItem == enums_1.YGAlign.Center) {
              leadingCrossDim += remainingCrossDim / 2;
            } else {
              leadingCrossDim += remainingCrossDim;
            }
          }

          child.setLayoutPosition(child.getLayout().position[internal_1.pos[crossAxis]] + totalLineCrossDim + leadingCrossDim, internal_1.pos[crossAxis]);
        }
      }
    }

    totalLineCrossDim += collectedFlexItemsValues.crossDim;
    maxLineMainDim = utils_1.YGFloatMax(maxLineMainDim, collectedFlexItemsValues.mainDim);
  }

  if (performLayout && (lineCount > 1 || YGIsBaselineLayout(node)) && !YGFloatIsUndefined(availableInnerCrossDim)) {
    var remainingAlignContentDim = availableInnerCrossDim - totalLineCrossDim;
    var crossDimLead = 0;
    var currentLead = leadingPaddingAndBorderCross;

    switch (node.getStyle().alignContent) {
      case enums_1.YGAlign.FlexEnd:
        currentLead += remainingAlignContentDim;
        break;

      case enums_1.YGAlign.Center:
        currentLead += remainingAlignContentDim / 2;
        break;

      case enums_1.YGAlign.Stretch:
        if (availableInnerCrossDim > totalLineCrossDim) {
          crossDimLead = remainingAlignContentDim / lineCount;
        }

        break;

      case enums_1.YGAlign.SpaceAround:
        if (availableInnerCrossDim > totalLineCrossDim) {
          currentLead += remainingAlignContentDim / (2 * lineCount);

          if (lineCount > 1) {
            crossDimLead = remainingAlignContentDim / lineCount;
          }
        } else {
          currentLead += remainingAlignContentDim / 2;
        }

        break;

      case enums_1.YGAlign.SpaceBetween:
        if (availableInnerCrossDim > totalLineCrossDim && lineCount > 1) {
          crossDimLead = remainingAlignContentDim / (lineCount - 1);
        }

        break;

      case enums_1.YGAlign.Auto:
      case enums_1.YGAlign.FlexStart:
      case enums_1.YGAlign.Baseline:
        break;
    }

    var endIndex = 0;

    for (var _i5 = 0; _i5 < lineCount; _i5++) {
      var startIndex = endIndex;
      var ii = void 0;
      var lineHeight = 0;
      var maxAscentForCurrentLine = 0;
      var maxDescentForCurrentLine = 0;

      for (ii = startIndex; ii < childCount; ii++) {
        var _child3 = node.getChild(ii);

        if (_child3.getStyle().display == enums_1.YGDisplay.None) {
          continue;
        }

        if (_child3.getStyle().positionType == enums_1.YGPositionType.Relative) {
          if (_child3.getLineIndex() != _i5) {
            break;
          }

          if (YGNodeIsLayoutDimDefined(_child3, crossAxis)) {
            lineHeight = utils_1.YGFloatMax(lineHeight, _child3.getLayout().measuredDimensions[internal_1.dim[crossAxis]] + utils_1.YGUnwrapFloatOptional(_child3.getMarginForAxis(crossAxis, availableInnerWidth)));
          }

          if (YGNodeAlignItem(node, _child3) == enums_1.YGAlign.Baseline) {
            var ascent = YGBaseline(_child3) + utils_1.YGUnwrapFloatOptional(_child3.getLeadingMargin(enums_1.YGFlexDirection.Column, availableInnerWidth));
            var descent = _child3.getLayout().measuredDimensions[enums_1.YGDimension.Height] + utils_1.YGUnwrapFloatOptional(_child3.getMarginForAxis(enums_1.YGFlexDirection.Column, availableInnerWidth)) - ascent;
            maxAscentForCurrentLine = utils_1.YGFloatMax(maxAscentForCurrentLine, ascent);
            maxDescentForCurrentLine = utils_1.YGFloatMax(maxDescentForCurrentLine, descent);
            lineHeight = utils_1.YGFloatMax(lineHeight, maxAscentForCurrentLine + maxDescentForCurrentLine);
          }
        }
      }

      endIndex = ii;
      lineHeight += crossDimLead;

      if (performLayout) {
        for (ii = startIndex; ii < endIndex; ii++) {
          var _child4 = node.getChild(ii);

          if (_child4.getStyle().display == enums_1.YGDisplay.None) {
            continue;
          }

          if (_child4.getStyle().positionType == enums_1.YGPositionType.Relative) {
            switch (YGNodeAlignItem(node, _child4)) {
              case enums_1.YGAlign.FlexStart:
                {
                  _child4.setLayoutPosition(currentLead + utils_1.YGUnwrapFloatOptional(_child4.getLeadingMargin(crossAxis, availableInnerWidth)), internal_1.pos[crossAxis]);

                  break;
                }

              case enums_1.YGAlign.FlexEnd:
                {
                  _child4.setLayoutPosition(currentLead + lineHeight - utils_1.YGUnwrapFloatOptional(_child4.getTrailingMargin(crossAxis, availableInnerWidth)) - _child4.getLayout().measuredDimensions[internal_1.dim[crossAxis]], internal_1.pos[crossAxis]);

                  break;
                }

              case enums_1.YGAlign.Center:
                {
                  var _childHeight = _child4.getLayout().measuredDimensions[internal_1.dim[crossAxis]];

                  _child4.setLayoutPosition(currentLead + (lineHeight - _childHeight) / 2, internal_1.pos[crossAxis]);

                  break;
                }

              case enums_1.YGAlign.Stretch:
                {
                  _child4.setLayoutPosition(currentLead + utils_1.YGUnwrapFloatOptional(_child4.getLeadingMargin(crossAxis, availableInnerWidth)), internal_1.pos[crossAxis]);

                  if (!YGNodeIsStyleDimDefined(_child4, crossAxis, availableInnerCrossDim)) {
                    var _childWidth = isMainAxisRow ? _child4.getLayout().measuredDimensions[enums_1.YGDimension.Width] + utils_1.YGUnwrapFloatOptional(_child4.getMarginForAxis(mainAxis, availableInnerWidth)) : lineHeight;

                    var _childHeight2 = !isMainAxisRow ? _child4.getLayout().measuredDimensions[enums_1.YGDimension.Height] + utils_1.YGUnwrapFloatOptional(_child4.getMarginForAxis(crossAxis, availableInnerWidth)) : lineHeight;

                    if (!(utils_1.YGFloatsEqual(_childWidth, _child4.getLayout().measuredDimensions[enums_1.YGDimension.Width]) && utils_1.YGFloatsEqual(_childHeight2, _child4.getLayout().measuredDimensions[enums_1.YGDimension.Height]))) {
                      YGLayoutNodeInternal(_child4, _childWidth, _childHeight2, direction, enums_1.YGMeasureMode.Exactly, enums_1.YGMeasureMode.Exactly, availableInnerWidth, availableInnerHeight, true, "multiline-stretch", config);
                    }
                  }

                  break;
                }

              case enums_1.YGAlign.Baseline:
                {
                  _child4.setLayoutPosition(currentLead + maxAscentForCurrentLine - YGBaseline(_child4) + utils_1.YGUnwrapFloatOptional(_child4.getLeadingPosition(enums_1.YGFlexDirection.Column, availableInnerCrossDim)), enums_1.YGEdge.Top);

                  break;
                }

              case enums_1.YGAlign.Auto:
              case enums_1.YGAlign.SpaceBetween:
              case enums_1.YGAlign.SpaceAround:
                break;
            }
          }
        }
      }

      currentLead += lineHeight;
    }
  }

  node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Row, availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_1.YGDimension.Width);
  node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_1.YGFlexDirection.Column, availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_1.YGDimension.Height);

  if (measureModeMainDim == enums_1.YGMeasureMode.Undefined || node.getStyle().overflow != enums_1.YGOverflow.Scroll && measureModeMainDim == enums_1.YGMeasureMode.AtMost) {
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, mainAxis, maxLineMainDim, mainAxisownerSize, ownerWidth), internal_1.dim[mainAxis]);
  } else if (measureModeMainDim == enums_1.YGMeasureMode.AtMost && node.getStyle().overflow == enums_1.YGOverflow.Scroll) {
    node.setLayoutMeasuredDimension(utils_1.YGFloatMax(utils_1.YGFloatMin(availableInnerMainDim + paddingAndBorderAxisMain, utils_1.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(node, mainAxis, maxLineMainDim, mainAxisownerSize))), paddingAndBorderAxisMain), internal_1.dim[mainAxis]);
  }

  if (measureModeCrossDim == enums_1.YGMeasureMode.Undefined || node.getStyle().overflow != enums_1.YGOverflow.Scroll && measureModeCrossDim == enums_1.YGMeasureMode.AtMost) {
    node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, crossAxis, totalLineCrossDim + paddingAndBorderAxisCross, crossAxisownerSize, ownerWidth), internal_1.dim[crossAxis]);
  } else if (measureModeCrossDim == enums_1.YGMeasureMode.AtMost && node.getStyle().overflow == enums_1.YGOverflow.Scroll) {
    node.setLayoutMeasuredDimension(utils_1.YGFloatMax(utils_1.YGFloatMin(availableInnerCrossDim + paddingAndBorderAxisCross, utils_1.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(node, crossAxis, totalLineCrossDim + paddingAndBorderAxisCross, crossAxisownerSize))), paddingAndBorderAxisCross), internal_1.dim[crossAxis]);
  }

  if (performLayout && node.getStyle().flexWrap == enums_1.YGWrap.WrapReverse) {
    for (var _i6 = 0; _i6 < childCount; _i6++) {
      var _child5 = YGNodeGetChild(node, _i6);

      if (_child5.getStyle().positionType == enums_1.YGPositionType.Relative) {
        _child5.setLayoutPosition(node.getLayout().measuredDimensions[internal_1.dim[crossAxis]] - _child5.getLayout().position[internal_1.pos[crossAxis]] - _child5.getLayout().measuredDimensions[internal_1.dim[crossAxis]], internal_1.pos[crossAxis]);
      }
    }
  }

  if (performLayout) {
    var children = node.getChildren();

    for (var _i7 = 0; _i7 < children.length; ++_i7) {
      var _child6 = children[_i7];

      if (_child6.getStyle().positionType != enums_1.YGPositionType.Absolute) {
        continue;
      }

      YGNodeAbsoluteLayoutChild(node, _child6, availableInnerWidth, isMainAxisRow ? measureModeMainDim : measureModeCrossDim, availableInnerHeight, direction, config);
    }

    var needsMainTrailingPos = mainAxis == enums_1.YGFlexDirection.RowReverse || mainAxis == enums_1.YGFlexDirection.ColumnReverse;
    var needsCrossTrailingPos = crossAxis == enums_1.YGFlexDirection.RowReverse || crossAxis == enums_1.YGFlexDirection.ColumnReverse;

    if (needsMainTrailingPos || needsCrossTrailingPos) {
      for (var _i8 = 0; _i8 < childCount; _i8++) {
        var _child7 = node.getChild(_i8);

        if (_child7.getStyle().display == enums_1.YGDisplay.None) {
          continue;
        }

        if (needsMainTrailingPos) {
          YGNodeSetChildTrailingPosition(node, _child7, mainAxis);
        }

        if (needsCrossTrailingPos) {
          YGNodeSetChildTrailingPosition(node, _child7, crossAxis);
        }
      }
    }
  }
}

exports.YGNodelayoutImpl = YGNodelayoutImpl;
var gDepth = 0;
var gPrintTree = false;
var gPrintChanges = false;
var gPrintSkips = false;
var spacer = "                                                            ";

function YGSpacer(level) {
  var spacerLen = spacer.length;

  if (level > spacerLen) {
    return spacer;
  } else {
    return spacer.substr(spacerLen - level);
  }
}

exports.YGSpacer = YGSpacer;

function YGMeasureModeName(mode, performLayout) {
  var kMeasureModeNames = ["UNDEFINED", "EXACTLY", "AT_MOST"];
  var kLayoutModeNames = ["LAY_UNDEFINED", "LAY_EXACTLY", "LAY_AT_", "MOST"];

  if (mode >= enums_1.YGMeasureModeCount) {
    return "";
  }

  return performLayout ? kLayoutModeNames[mode] : kMeasureModeNames[mode];
}

exports.YGMeasureModeName = YGMeasureModeName;

function YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(sizeMode, size, lastComputedSize) {
  return sizeMode == enums_1.YGMeasureMode.Exactly && utils_1.YGFloatsEqual(size, lastComputedSize);
}

exports.YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize = YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize;

function YGMeasureModeOldSizeIsUnspecifiedAndStillFits(sizeMode, size, lastSizeMode, lastComputedSize) {
  return sizeMode == enums_1.YGMeasureMode.AtMost && lastSizeMode == enums_1.YGMeasureMode.Undefined && (size >= lastComputedSize || utils_1.YGFloatsEqual(size, lastComputedSize));
}

exports.YGMeasureModeOldSizeIsUnspecifiedAndStillFits = YGMeasureModeOldSizeIsUnspecifiedAndStillFits;

function YGMeasureModeNewMeasureSizeIsStricterAndStillValid(sizeMode, size, lastSizeMode, lastSize, lastComputedSize) {
  return lastSizeMode == enums_1.YGMeasureMode.AtMost && sizeMode == enums_1.YGMeasureMode.AtMost && !YGFloatIsUndefined(lastSize) && !YGFloatIsUndefined(size) && !YGFloatIsUndefined(lastComputedSize) && lastSize > size && (lastComputedSize <= size || utils_1.YGFloatsEqual(size, lastComputedSize));
}

exports.YGMeasureModeNewMeasureSizeIsStricterAndStillValid = YGMeasureModeNewMeasureSizeIsStricterAndStillValid;

function YGRoundValueToPixelGrid(value, pointScaleFactor, forceCeil, forceFloor) {
  var scaledValue = value * pointScaleFactor;
  var fractial = scaledValue % 1.0;

  if (utils_1.YGFloatsEqual(fractial, 0)) {
    scaledValue = scaledValue - fractial;
  } else if (utils_1.YGFloatsEqual(fractial, 1.0)) {
    scaledValue = scaledValue - fractial + 1.0;
  } else if (forceCeil) {
    scaledValue = scaledValue - fractial + 1.0;
  } else if (forceFloor) {
    scaledValue = scaledValue - fractial;
  } else {
    scaledValue = scaledValue - fractial + (!YGFloatIsUndefined(fractial) && (fractial > 0.5 || utils_1.YGFloatsEqual(fractial, 0.5)) ? 1.0 : 0.0);
  }

  return YGFloatIsUndefined(scaledValue) || YGFloatIsUndefined(pointScaleFactor) ? exports.YGUndefined : scaledValue / pointScaleFactor;
}

exports.YGRoundValueToPixelGrid = YGRoundValueToPixelGrid;

function YGNodeCanUseCachedMeasurement(widthMode, width, heightMode, height, lastWidthMode, lastWidth, lastHeightMode, lastHeight, lastComputedWidth, lastComputedHeight, marginRow, marginColumn, config) {
  if (!YGFloatIsUndefined(lastComputedHeight) && lastComputedHeight < 0 || !YGFloatIsUndefined(lastComputedWidth) && lastComputedWidth < 0) {
    return false;
  }

  var useRoundedComparison = config != null && config.pointScaleFactor != 0;
  var effectiveWidth = useRoundedComparison ? YGRoundValueToPixelGrid(width, config.pointScaleFactor, false, false) : width;
  var effectiveHeight = useRoundedComparison ? YGRoundValueToPixelGrid(height, config.pointScaleFactor, false, false) : height;
  var effectiveLastWidth = useRoundedComparison ? YGRoundValueToPixelGrid(lastWidth, config.pointScaleFactor, false, false) : lastWidth;
  var effectiveLastHeight = useRoundedComparison ? YGRoundValueToPixelGrid(lastHeight, config.pointScaleFactor, false, false) : lastHeight;
  var hasSameWidthSpec = lastWidthMode == widthMode && utils_1.YGFloatsEqual(effectiveLastWidth, effectiveWidth);
  var hasSameHeightSpec = lastHeightMode == heightMode && utils_1.YGFloatsEqual(effectiveLastHeight, effectiveHeight);
  var widthIsCompatible = hasSameWidthSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(widthMode, width - marginRow, lastComputedWidth) || YGMeasureModeOldSizeIsUnspecifiedAndStillFits(widthMode, width - marginRow, lastWidthMode, lastComputedWidth) || YGMeasureModeNewMeasureSizeIsStricterAndStillValid(widthMode, width - marginRow, lastWidthMode, lastWidth, lastComputedWidth);
  var heightIsCompatible = hasSameHeightSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(heightMode, height - marginColumn, lastComputedHeight) || YGMeasureModeOldSizeIsUnspecifiedAndStillFits(heightMode, height - marginColumn, lastHeightMode, lastComputedHeight) || YGMeasureModeNewMeasureSizeIsStricterAndStillValid(heightMode, height - marginColumn, lastHeightMode, lastHeight, lastComputedHeight);
  return widthIsCompatible && heightIsCompatible;
}

exports.YGNodeCanUseCachedMeasurement = YGNodeCanUseCachedMeasurement;

function YGLayoutNodeInternal(node, availableWidth, availableHeight, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, performLayout, reason, config) {
  var layout = node.getLayout();
  gDepth++;
  var needToVisitNode = node.isDirty() && layout.generationCount != gCurrentGenerationCount || layout.lastOwnerDirection != ownerDirection;

  if (needToVisitNode) {
    layout.nextCachedMeasurementsIndex = 0;
    layout.cachedLayout.widthMeasureMode = enums_1.YGMeasureModeCount - 1;
    layout.cachedLayout.heightMeasureMode = enums_1.YGMeasureModeCount - 1;
    layout.cachedLayout.computedWidth = -1;
    layout.cachedLayout.computedHeight = -1;
  }

  var cachedResults = null;

  if (node.getMeasure() != null) {
    var marginAxisRow = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Row, ownerWidth));
    var marginAxisColumn = utils_1.YGUnwrapFloatOptional(node.getMarginForAxis(enums_1.YGFlexDirection.Column, ownerWidth));

    if (YGNodeCanUseCachedMeasurement(widthMeasureMode, availableWidth, heightMeasureMode, availableHeight, layout.cachedLayout.widthMeasureMode, layout.cachedLayout.availableWidth, layout.cachedLayout.heightMeasureMode, layout.cachedLayout.availableHeight, layout.cachedLayout.computedWidth, layout.cachedLayout.computedHeight, marginAxisRow, marginAxisColumn, config)) {
      cachedResults = layout.cachedLayout;
    } else {
      for (var i = 0; i < layout.nextCachedMeasurementsIndex; i++) {
        if (YGNodeCanUseCachedMeasurement(widthMeasureMode, availableWidth, heightMeasureMode, availableHeight, layout.cachedMeasurements[i].widthMeasureMode, layout.cachedMeasurements[i].availableWidth, layout.cachedMeasurements[i].heightMeasureMode, layout.cachedMeasurements[i].availableHeight, layout.cachedMeasurements[i].computedWidth, layout.cachedMeasurements[i].computedHeight, marginAxisRow, marginAxisColumn, config)) {
          cachedResults = layout.cachedMeasurements[i];
          break;
        }
      }
    }
  } else if (performLayout) {
    if (utils_1.YGFloatsEqual(layout.cachedLayout.availableWidth, availableWidth) && utils_1.YGFloatsEqual(layout.cachedLayout.availableHeight, availableHeight) && layout.cachedLayout.widthMeasureMode == widthMeasureMode && layout.cachedLayout.heightMeasureMode == heightMeasureMode) {
      cachedResults = layout.cachedLayout;
    }
  } else {
    for (var _i9 = 0; _i9 < layout.nextCachedMeasurementsIndex; _i9++) {
      if (utils_1.YGFloatsEqual(layout.cachedMeasurements[_i9].availableWidth, availableWidth) && utils_1.YGFloatsEqual(layout.cachedMeasurements[_i9].availableHeight, availableHeight) && layout.cachedMeasurements[_i9].widthMeasureMode == widthMeasureMode && layout.cachedMeasurements[_i9].heightMeasureMode == heightMeasureMode) {
        cachedResults = layout.cachedMeasurements[_i9];
        break;
      }
    }
  }

  if (!needToVisitNode && cachedResults != null) {
    layout.measuredDimensions[enums_1.YGDimension.Width] = cachedResults.computedWidth;
    layout.measuredDimensions[enums_1.YGDimension.Height] = cachedResults.computedHeight;

    if (gPrintChanges && gPrintSkips) {
      YGLog(node, enums_1.YGLogLevel.Verbose, "%s%d.{[skipped] ", YGSpacer(gDepth), gDepth);

      if (node.getPrintFunc() != null) {
        node.getPrintFunc()(node);
      }

      YGLog(node, enums_1.YGLogLevel.Verbose, "wm: %s, hm: %s, aw: %f ah: %f => d: (%f, %f) %s\n", YGMeasureModeName(widthMeasureMode, performLayout), YGMeasureModeName(heightMeasureMode, performLayout), availableWidth, availableHeight, cachedResults.computedWidth, cachedResults.computedHeight, reason);
    }
  } else {
    if (gPrintChanges) {
      YGLog(node, enums_1.YGLogLevel.Verbose, "%s%d.{%s", YGSpacer(gDepth), gDepth, needToVisitNode ? "*" : "");

      if (node.getPrintFunc() != null) {
        node.getPrintFunc()(node);
      }

      YGLog(node, enums_1.YGLogLevel.Verbose, "wm: %s, hm: %s, aw: %f ah: %f %s\n", YGMeasureModeName(widthMeasureMode, performLayout), YGMeasureModeName(heightMeasureMode, performLayout), availableWidth, availableHeight, reason);
    }

    YGNodelayoutImpl(node, availableWidth, availableHeight, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, performLayout, config);

    if (gPrintChanges) {
      YGLog(node, enums_1.YGLogLevel.Verbose, "%s%d.}%s", YGSpacer(gDepth), gDepth, needToVisitNode ? "*" : "");

      if (node.getPrintFunc() != null) {
        node.getPrintFunc()(node);
      }

      YGLog(node, enums_1.YGLogLevel.Verbose, "wm: %s, hm: %s, d: (%f, %f) %s\n", YGMeasureModeName(widthMeasureMode, performLayout), YGMeasureModeName(heightMeasureMode, performLayout), layout.measuredDimensions[enums_1.YGDimension.Width], layout.measuredDimensions[enums_1.YGDimension.Height], reason);
    }

    layout.lastOwnerDirection = ownerDirection;

    if (cachedResults == null) {
      if (layout.nextCachedMeasurementsIndex == internal_1.YG_MAX_CACHED_RESULT_COUNT) {
        if (gPrintChanges) {
          YGLog(node, enums_1.YGLogLevel.Verbose, "Out of cache entries!\n");
        }

        layout.nextCachedMeasurementsIndex = 0;
      }

      var newCacheEntry;

      if (performLayout) {
        newCacheEntry = layout.cachedLayout;
      } else {
        newCacheEntry = layout.cachedMeasurements[layout.nextCachedMeasurementsIndex];
        layout.nextCachedMeasurementsIndex++;
      }

      newCacheEntry.availableWidth = availableWidth;
      newCacheEntry.availableHeight = availableHeight;
      newCacheEntry.widthMeasureMode = widthMeasureMode;
      newCacheEntry.heightMeasureMode = heightMeasureMode;
      newCacheEntry.computedWidth = layout.measuredDimensions[enums_1.YGDimension.Width];
      newCacheEntry.computedHeight = layout.measuredDimensions[enums_1.YGDimension.Height];
    }
  }

  if (performLayout) {
    node.setLayoutDimension(node.getLayout().measuredDimensions[enums_1.YGDimension.Width], enums_1.YGDimension.Width);
    node.setLayoutDimension(node.getLayout().measuredDimensions[enums_1.YGDimension.Height], enums_1.YGDimension.Height);
    node.setHasNewLayout(true);
    node.setDirty(false);
  }

  gDepth--;
  layout.generationCount = gCurrentGenerationCount;
  return needToVisitNode || cachedResults == null;
}

exports.YGLayoutNodeInternal = YGLayoutNodeInternal;

function YGConfigSetPointScaleFactor(config, pixelsInPoint) {
  YGAssertWithConfig(config, pixelsInPoint >= 0.0, "Scale factor should not be less than zero");

  if (pixelsInPoint == 0.0) {
    config.pointScaleFactor = 0.0;
  } else {
    config.pointScaleFactor = pixelsInPoint;
  }
}

exports.YGConfigSetPointScaleFactor = YGConfigSetPointScaleFactor;

function fmodf(x, y) {
  return x % y;
}

function YGRoundToPixelGrid(node, pointScaleFactor, absoluteLeft, absoluteTop) {
  if (pointScaleFactor == 0.0) {
    return;
  }

  var nodeLeft = node.getLayout().position[enums_1.YGEdge.Left];
  var nodeTop = node.getLayout().position[enums_1.YGEdge.Top];
  var nodeWidth = node.getLayout().dimensions[enums_1.YGDimension.Width];
  var nodeHeight = node.getLayout().dimensions[enums_1.YGDimension.Height];
  var absoluteNodeLeft = absoluteLeft + nodeLeft;
  var absoluteNodeTop = absoluteTop + nodeTop;
  var absoluteNodeRight = absoluteNodeLeft + nodeWidth;
  var absoluteNodeBottom = absoluteNodeTop + nodeHeight;
  var textRounding = node.getNodeType() == enums_1.YGNodeType.Text;
  node.setLayoutPosition(YGRoundValueToPixelGrid(nodeLeft, pointScaleFactor, false, textRounding), enums_1.YGEdge.Left);
  node.setLayoutPosition(YGRoundValueToPixelGrid(nodeTop, pointScaleFactor, false, textRounding), enums_1.YGEdge.Top);
  var hasFractionalWidth = !utils_1.YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 0) && !utils_1.YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 1.0);
  var hasFractionalHeight = !utils_1.YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 0) && !utils_1.YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 1.0);
  node.setLayoutDimension(YGRoundValueToPixelGrid(absoluteNodeRight, pointScaleFactor, textRounding && hasFractionalWidth, textRounding && !hasFractionalWidth) - YGRoundValueToPixelGrid(absoluteNodeLeft, pointScaleFactor, false, textRounding), enums_1.YGDimension.Width);
  node.setLayoutDimension(YGRoundValueToPixelGrid(absoluteNodeBottom, pointScaleFactor, textRounding && hasFractionalHeight, textRounding && !hasFractionalHeight) - YGRoundValueToPixelGrid(absoluteNodeTop, pointScaleFactor, false, textRounding), enums_1.YGDimension.Height);
  var childCount = YGNodeGetChildCount(node);

  for (var i = 0; i < childCount; i++) {
    YGRoundToPixelGrid(YGNodeGetChild(node, i), pointScaleFactor, absoluteNodeLeft, absoluteNodeTop);
  }
}

exports.YGRoundToPixelGrid = YGRoundToPixelGrid;

function YGNodeCalculateLayout(node, ownerWidth, ownerHeight, ownerDirection) {
  gCurrentGenerationCount++;
  node.resolveDimension();
  var width = exports.YGUndefined;
  var widthMeasureMode = enums_1.YGMeasureMode.Undefined;

  if (YGNodeIsStyleDimDefined(node, enums_1.YGFlexDirection.Row, ownerWidth)) {
    width = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getResolvedDimension(internal_1.dim[enums_1.YGFlexDirection.Row]), ownerWidth).add(node.getMarginForAxis(enums_1.YGFlexDirection.Row, ownerWidth)));
    widthMeasureMode = enums_1.YGMeasureMode.Exactly;
  } else if (!utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Width], ownerWidth).isUndefined()) {
    width = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Width], ownerWidth));
    widthMeasureMode = enums_1.YGMeasureMode.AtMost;
  } else {
    width = ownerWidth;
    widthMeasureMode = YGFloatIsUndefined(width) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;
  }

  var height = exports.YGUndefined;
  var heightMeasureMode = enums_1.YGMeasureMode.Undefined;

  if (YGNodeIsStyleDimDefined(node, enums_1.YGFlexDirection.Column, ownerHeight)) {
    height = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getResolvedDimension(internal_1.dim[enums_1.YGFlexDirection.Column]), ownerHeight).add(node.getMarginForAxis(enums_1.YGFlexDirection.Column, ownerWidth)));
    heightMeasureMode = enums_1.YGMeasureMode.Exactly;
  } else if (!utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Height], ownerHeight).isUndefined()) {
    height = utils_1.YGUnwrapFloatOptional(utils_1.YGResolveValue(node.getStyle().maxDimensions[enums_1.YGDimension.Height], ownerHeight));
    heightMeasureMode = enums_1.YGMeasureMode.AtMost;
  } else {
    height = ownerHeight;
    heightMeasureMode = YGFloatIsUndefined(height) ? enums_1.YGMeasureMode.Undefined : enums_1.YGMeasureMode.Exactly;
  }

  if (YGLayoutNodeInternal(node, width, height, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, true, "initial", node.getConfig())) {
    node.setPosition(node.getLayout().direction, ownerWidth, ownerHeight, ownerWidth);
    YGRoundToPixelGrid(node, node.getConfig().pointScaleFactor, 0.0, 0.0);

    if (gPrintTree) {
      YGNodePrint(node, enums_1.YGPrintOptions.Layout | enums_1.YGPrintOptions.Children | enums_1.YGPrintOptions.Style);
    }
  }

  if (node.getConfig().shouldDiffLayoutWithoutLegacyStretchBehaviour && node.didUseLegacyFlag()) {
    console.log('legacy config');
    var originalNode = YGNodeDeepClone(node);
    originalNode.resolveDimension();
    originalNode.markDirtyAndPropogateDownwards();
    gCurrentGenerationCount++;
    originalNode.setAndPropogateUseLegacyFlag(false);

    if (YGLayoutNodeInternal(originalNode, width, height, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, true, "initial", originalNode.getConfig())) {
      originalNode.setPosition(originalNode.getLayout().direction, ownerWidth, ownerHeight, ownerWidth);
      YGRoundToPixelGrid(originalNode, originalNode.getConfig().pointScaleFactor, 0.0, 0.0);
      node.setLayoutDoesLegacyFlagAffectsLayout(!originalNode.isLayoutTreeEqualToNode(node));

      if (gPrintTree) {
        YGNodePrint(originalNode, enums_1.YGPrintOptions.Layout | enums_1.YGPrintOptions.Children | enums_1.YGPrintOptions.Style);
      }
    }

    YGConfigFreeRecursive(originalNode);
    YGNodeFreeRecursive(originalNode);
  }
}

exports.YGNodeCalculateLayout = YGNodeCalculateLayout;

function YGConfigSetLogger(config, logger) {
  if (logger != null) {
    config.logger = logger;
  } else {
    config.logger = YGDefaultLog;
  }
}

exports.YGConfigSetLogger = YGConfigSetLogger;

function YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour(config, shouldDiffLayout) {
  config.shouldDiffLayoutWithoutLegacyStretchBehaviour = shouldDiffLayout;
}

exports.YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour = YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour;

function YGVLog(config, node, level, format) {
  var logConfig = config != null ? config : YGConfigGetDefault();

  for (var _len2 = arguments.length, args = new Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
    args[_key2 - 4] = arguments[_key2];
  }

  logConfig.logger(logConfig, node, level, format, args);

  if (level == enums_1.YGLogLevel.Fatal) {
    throw new Error('Abort Yoga');
  }
}

exports.YGVLog = YGVLog;

function YGLogWithConfig(config, level, format) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  YGVLog(config, null, level, format, args);
}

exports.YGLogWithConfig = YGLogWithConfig;

function YGLog(node, level, format) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  YGVLog(node == null ? null : node.getConfig(), node, level, format, args);
}

exports.YGLog = YGLog;

function YGAssert(condition, message) {
  if (!condition) {
    YGLog(null, enums_1.YGLogLevel.Fatal, "%s\n", message);
  }
}

exports.YGAssert = YGAssert;

function YGAssertWithNode(node, condition, message) {
  if (!condition) {
    YGLog(node, enums_1.YGLogLevel.Fatal, "%s\n", message);
  }
}

exports.YGAssertWithNode = YGAssertWithNode;

function YGAssertWithConfig(config, condition, message) {
  if (!condition) {
    YGLogWithConfig(config, enums_1.YGLogLevel.Fatal, "%s\n", message);
  }
}

exports.YGAssertWithConfig = YGAssertWithConfig;

function YGConfigSetExperimentalFeatureEnabled(config, feature, enabled) {
  config.experimentalFeatures[feature] = enabled;
}

exports.YGConfigSetExperimentalFeatureEnabled = YGConfigSetExperimentalFeatureEnabled;

function YGConfigIsExperimentalFeatureEnabled(config, feature) {
  return config.experimentalFeatures[feature];
}

exports.YGConfigIsExperimentalFeatureEnabled = YGConfigIsExperimentalFeatureEnabled;

function YGConfigSetUseWebDefaults(config, enabled) {
  config.useWebDefaults = enabled;
}

exports.YGConfigSetUseWebDefaults = YGConfigSetUseWebDefaults;

function YGConfigSetUseLegacyStretchBehaviour(config, useLegacyStretchBehaviour) {
  config.useLegacyStretchBehaviour = useLegacyStretchBehaviour;
}

exports.YGConfigSetUseLegacyStretchBehaviour = YGConfigSetUseLegacyStretchBehaviour;

function YGConfigGetUseWebDefaults(config) {
  return config.useWebDefaults;
}

exports.YGConfigGetUseWebDefaults = YGConfigGetUseWebDefaults;

function YGConfigSetContext(config, context) {
  config.context = context;
}

exports.YGConfigSetContext = YGConfigSetContext;

function YGConfigGetContext(config) {
  return config.context;
}

exports.YGConfigGetContext = YGConfigGetContext;

function YGConfigSetCloneNodeFunc(config, callback) {
  config.cloneNodeCallback = callback;
}

exports.YGConfigSetCloneNodeFunc = YGConfigSetCloneNodeFunc;

function YGTraverseChildrenPreOrder(children, f) {
  for (var i = 0; i < children.length; ++i) {
    var node = children[i];
    f(node);
    YGTraverseChildrenPreOrder(node.getChildren(), f);
  }
}

exports.YGTraverseChildrenPreOrder = YGTraverseChildrenPreOrder;

function YGTraversePreOrder(node, f) {
  if (!node) {
    return;
  }

  f(node);
  YGTraverseChildrenPreOrder(node.getChildren(), f);
}

exports.YGTraversePreOrder = YGTraversePreOrder;

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = exports.eventtarget = exports.Event = void 0;

var Event = function () {
  function Event(type, initOptions) {
    (0, _classCallCheck2.default)(this, Event);
    this._type = type;
    this._flags = 0;
    this._bubbles = !!(initOptions === null || initOptions === void 0 ? void 0 : initOptions.bubbles);
    this._cancelable = !!(initOptions === null || initOptions === void 0 ? void 0 : initOptions.cancelable);
    this._target = null;
    this._currentTarget = null;
    this._timestamp = Date.now();
  }

  (0, _createClass2.default)(Event, [{
    key: "preventDefault",
    value: function preventDefault() {
      this._flags |= Event.FLAG_CANCELED;
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation() {
      this._flags |= Event.FLAG_STOP_PROPAGATION;
    }
  }, {
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this._flags |= Event.FLAG_STOP_PROPAGATION;
      this._flags |= Event.FLAG_STOP_IMMEDIATE_PROPAGATION;
    }
  }, {
    key: "_prepareDispatch",
    value: function _prepareDispatch(target) {
      if (this._flags & Event.FLAG_DISPATCHED) {
        throw new Error('Failed to dispatch event: invalid event state');
      }

      this._target = target;
      this._flags |= Event.FLAG_DISPATCHED;
    }
  }, {
    key: "_invokeListener",
    value: function _invokeListener(listener, thisObject) {
      this._currentTarget = thisObject;
      var handler = typeof listener === 'function' ? listener : listener.handleEvent;
      handler.call(thisObject, this);
      this._currentTarget = null;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "bubbles",
    get: function get() {
      return this._bubbles;
    }
  }, {
    key: "cancelable",
    get: function get() {
      return this._cancelable;
    }
  }, {
    key: "cancelBubble",
    get: function get() {
      return !!(this._flags & Event.FLAG_STOP_PROPAGATION);
    },
    set: function set(val) {
      val && this.stopPropagation();
    }
  }, {
    key: "cancelImmediate",
    get: function get() {
      return !!(this._flags & Event.FLAG_STOP_IMMEDIATE_PROPAGATION);
    }
  }, {
    key: "defaultPrevented",
    get: function get() {
      return !!(this._flags & Event.FLAG_CANCELED);
    }
  }, {
    key: "target",
    get: function get() {
      return this._target;
    }
  }, {
    key: "currentTarget",
    get: function get() {
      return this._currentTarget;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this._timestamp;
    }
  }]);
  return Event;
}();

exports.Event = Event;
Event.FLAG_STOP_PROPAGATION = 1 << 0;
Event.FLAG_STOP_IMMEDIATE_PROPAGATION = 1 << 1;
Event.FLAG_CANCELED = 1 << 2;
Event.FLAG_DISPATCHED = 1 << 3;

function eventtarget() {
  return function (ctor) {
    var listeners = {};
    ctor.prototype.__listeners = listeners;

    ctor.prototype.addEventListener = function (type, callback) {
      if (!(type in this.__listeners)) {
        this.__listeners[type] = [];
      }

      this.__listeners[type].push(callback);
    };

    ctor.prototype.removeEventListener = function (type, callback) {
      if (type in this.__listeners) {
        var _listeners = this.__listeners[type];

        var index = _listeners.indexOf(callback);

        if (index >= 0) {
          _listeners.splice(index, 1);
        }
      }
    };

    ctor.prototype.dispatchEvent = function (evt) {
      evt._prepareDispatch(this);

      var obj = this;

      while (obj) {
        if (evt.type in obj.__listeners) {
          var stack = obj.__listeners[evt.type].slice();

          for (var i = 0, l = stack.length; i < l; i++) {
            evt._invokeListener(stack[i], obj);

            if (evt.cancelImmediate) {
              break;
            }
          }
        }

        if (evt.bubbles && !evt.cancelBubble) {
          obj = obj.parentNode || obj.gui || null;
        }
      }

      return !evt.defaultPrevented;
    };
  };
}

exports.eventtarget = eventtarget;

function assert(expr, message, fatal) {
  if (!expr) {
    var msg = "Assertion failed: ".concat(message);
    console.log(msg);

    if (fatal) {
      throw new Error(msg);
    }
  }

  return expr;
}

exports.assert = assert;

/***/ })

/******/ });
});
//# sourceMappingURL=flui.js.map