/**
 * AgriStack Card Generator Helper - Extension Popup Script (Version 5.3.4)
 * - Two distinct modes: CSC VLE (Registration Form) & Self Farmer (View Farmer Details)
 * - Multi-State (36 States/UTs) auto-detection and selector
 * - Always captures live active webpage data for fresh card generation
 */
(function () {
    "use strict";

    // Primary & failover backend endpoints (Transparent, human-readable for Chrome Web Store compliance)
    const BACKEND_SERVERS = Object.freeze([
        "https://farmer-card-f6fradh5cde3esgq.indiasouthcentral-01.azurewebsites.net", // Main: Microsoft Azure (Primary Production Server)
        "https://agristack-extension.onrender.com",                                      // Failover 1: Render Primary
        "https://agristack-extension-qaau.onrender.com"                                 // Failover 2: Render Secondary
    ]);
    const DEFAULT_SERVER_URL = BACKEND_SERVERS[0];
    const CURRENT_VERSION = "5.3.4";
    let stickyPreferredServer = DEFAULT_SERVER_URL;

    function fetchWithFailover(endpoint, options, preferredServer) {
        options = options || {};
        let targetServer = preferredServer || stickyPreferredServer || DEFAULT_SERVER_URL;
        let servers = [targetServer];
        for (let i = 0; i < BACKEND_SERVERS.length; i++) {
            if (BACKEND_SERVERS[i].replace(/\/+$/, "") !== targetServer.replace(/\/+$/, "")) {
                servers.push(BACKEND_SERVERS[i]);
            }
        }

        function tryServer(index) {
            if (index >= servers.length) {
                return Promise.reject(new Error("All backend servers are currently unreachable. Please try again in a few moments."));
            }
            const sUrl = servers[index].replace(/\/+$/, "");

            let timer = null;
            let fetchOpts = options;
            if (typeof AbortController !== "undefined") {
                const controller = new AbortController();
                const timeoutDuration = (options && options.timeoutMs) || 8000;
                timer = setTimeout(function () {
                    try { controller.abort(); } catch (_) {}
                }, timeoutDuration);
                fetchOpts = Object.assign({}, options, { signal: controller.signal });
            }

            return fetch(sUrl + endpoint, fetchOpts)
                .then(function (res) {
                    if (timer) clearTimeout(timer);
                    // Failover immediately on 5xx, 429 (rate limit), 408 (timeout), 404 (session may be on peer node), or 403
                    if (res.status >= 500 || res.status === 429 || res.status === 408 || res.status === 404 || res.status === 403) {
                        console.warn("Server " + sUrl + " returned HTTP " + res.status + ", failing forward to next node...");
                        return tryServer(index + 1);
                    }
                    if (res.status === 400) {
                        return res.clone().text().then(function (bodyText) {
                            if (bodyText.includes("origin") || bodyText.includes("not allowed") || !bodyText.trim().startsWith("{")) {
                                console.warn("Server " + sUrl + " rejected request (proxy/CORS 400), failing forward to next node...");
                                return tryServer(index + 1);
                            }
                            res._usedServerUrl = sUrl;
                            stickyPreferredServer = sUrl;
                            return res;
                        }).catch(function () {
                            res._usedServerUrl = sUrl;
                            stickyPreferredServer = sUrl;
                            return res;
                        });
                    }
                    res._usedServerUrl = sUrl;
                    stickyPreferredServer = sUrl;
                    return res;
                })
                .catch(function (err) {
                    if (timer) clearTimeout(timer);
                    console.warn("Server " + sUrl + " connection error (" + err.message + "), failing forward to next node...");
                    return tryServer(index + 1);
                });
        }

        return tryServer(0);
    }

    // State domain & URL mapping
    const STATE_DOMAIN_MAP = {
        "punjab": "PB", "pb": "PB",
        "uttarpradesh": "UP", "up": "UP",
        "maharashtra": "MH", "mh": "MH",
        "gujarat": "GJ", "gj": "GJ",
        "rajasthan": "RJ", "rj": "RJ",
        "madhyapradesh": "MP", "mp": "MP",
        "karnataka": "KA", "ka": "KA",
        "andhrapradesh": "AP", "ap": "AP",
        "telangana": "TS", "ts": "TS",
        "tamilnadu": "TN", "tn": "TN",
        "kerala": "KL", "kl": "KL",
        "westbengal": "WB", "wb": "WB",
        "odisha": "OR", "or": "OR",
        "bihar": "BR", "br": "BR",
        "haryana": "HR", "hr": "HR",
        "himachalpradesh": "HP", "hp": "HP",
        "jammuandkashmir": "JK", "jk": "JK",
        "jharkhand": "JH", "jh": "JH",
        "chhattisgarh": "CG", "cg": "CG",
        "assam": "AS", "as": "AS",
        "uttarakhand": "UK", "uk": "UK",
        "goa": "GA", "ga": "GA",
        "tripura": "TR", "tr": "TR",
        "manipur": "MN", "mn": "MN",
        "meghalaya": "ML", "ml": "ML",
        "nagaland": "NL", "nl": "NL",
        "mizoram": "MZ", "mz": "MZ",
        "sikkim": "SK", "sk": "SK",
        "arunachalpradesh": "AR", "ar": "AR",
        "chandigarh": "CH", "ch": "CH",
        "delhi": "DL", "dl": "DL",
        "puducherry": "PY", "py": "PY",
        "andaman": "AN", "an": "AN",
        "lakshadweep": "LD", "ld": "LD",
        "ladakh": "LA", "la": "LA",
        "daman": "DH", "dh": "DH",
        "central": "IN", "in": "IN"
    };

    const KNOWN_STATE_CODES = new Set([
        "AN", "AP", "AR", "AS", "BR", "CH", "CG", "DH", "DL", "GA",
        "GJ", "HR", "HP", "JK", "JH", "KA", "KL", "LA", "LD", "MP",
        "MH", "MN", "ML", "MZ", "NL", "OR", "PY", "PB", "RJ", "SK",
        "TN", "TS", "TR", "UP", "UK", "WB", "IN"
    ]);

    let userManuallySelected = false;

    document.addEventListener("DOMContentLoaded", function () {
        const statusDiv = document.getElementById("status");
        const stateSelect = document.getElementById("stateSelect");
        const stateAutoBadge = document.getElementById("stateAutoBadge");
        const portalModeSelect = document.getElementById("portalMode");
        const aadhaarInput = document.getElementById("aadhaar");
        const payBtn = document.getElementById("payBtn");
        const downloadContainer = document.getElementById("downloadContainer");
        const downloadBtn = document.getElementById("downloadBtn");
        let activeSessionId = null;

        function setStatus(message, type) {
            if (!statusDiv) return;
            statusDiv.textContent = message;
            if (type === "success") {
                statusDiv.className = "status-success";
            } else if (type === "error") {
                statusDiv.className = "status-error";
            } else {
                statusDiv.className = "";
            }
        }

        // Apply detected state to dropdown
        function applyDetectedState(code, isAuto) {
            if (!stateSelect || !code) return;
            if (isAuto && userManuallySelected) return;

            const upper = code.toUpperCase();
            if (KNOWN_STATE_CODES.has(upper)) {
                stateSelect.value = upper;
                if (stateAutoBadge) {
                    stateAutoBadge.textContent = isAuto ? ("Auto: " + upper) : "Selected";
                    stateAutoBadge.style.background = isAuto ? "#ecfdf5" : "#f1f5f9";
                    stateAutoBadge.style.color = isAuto ? "#047857" : "#475569";
                    stateAutoBadge.style.borderColor = isAuto ? "#d1fae5" : "#cbd5e1";
                }
            }
        }

        // Detect State Code from active tab URL
        function detectStateFromUrl(url) {
            if (!url) return null;
            try {
                const u = new URL(url);
                const host = u.hostname.toLowerCase();
                
                const subMatch = host.match(/^([a-z]{2})(?:fr)?\.agristack\.gov\.in/i);
                if (subMatch && subMatch[1]) {
                    const code = subMatch[1].toUpperCase();
                    if (KNOWN_STATE_CODES.has(code)) return code;
                }

                for (const key of Object.keys(STATE_DOMAIN_MAP)) {
                    if (host.includes(key)) {
                        return STATE_DOMAIN_MAP[key];
                    }
                }

                const pathMatch = u.pathname.match(/farmer[-_]registry[-_]([a-z]{2})/i);
                if (pathMatch && pathMatch[1]) {
                    const code = pathMatch[1].toUpperCase();
                    if (KNOWN_STATE_CODES.has(code)) return code;
                }
            } catch (e) {}
            return null;
        }

        // Detect State Code from scraped HTML contents
        function detectStateFromHtml(html) {
            if (!html) return null;
            const idMatch = html.match(/\b([A-Z]{2})[0-9A-Z]{6,16}\b/);
            if (idMatch && idMatch[1] && KNOWN_STATE_CODES.has(idMatch[1].toUpperCase())) {
                return idMatch[1].toUpperCase();
            }
            for (const key of Object.keys(STATE_DOMAIN_MAP)) {
                if (key.length > 3 && html.toLowerCase().includes(key)) {
                    return STATE_DOMAIN_MAP[key];
                }
            }
            return null;
        }

        if (stateSelect) {
            stateSelect.addEventListener("change", function () {
                userManuallySelected = true;
                if (stateAutoBadge) {
                    stateAutoBadge.textContent = "Selected";
                    stateAutoBadge.style.background = "#f1f5f9";
                    stateAutoBadge.style.color = "#475569";
                    stateAutoBadge.style.borderColor = "#cbd5e1";
                }
            });
        }

        // Lightweight detector for initial popup open: runs in < 1ms, zero image processing
        function lightweightStateAndModeDetector() {
            var detectedMode = null;
            try {
                var bodyText = (document.body && (document.body.innerText || document.body.textContent)) || "";
                var pageTitle = document.title || "";
                var fullText = bodyText + " " + pageTitle;

                if (fullText.indexOf("View Farmer Details") !== -1 ||
                    fullText.indexOf("Enrollment details") !== -1 ||
                    fullText.indexOf("Farmer Profile") !== -1 ||
                    fullText.indexOf("Farmer Registry") !== -1 ||
                    fullText.indexOf("ज़मीन") !== -1) {
                    detectedMode = "registry";
                } else if (fullText.indexOf("Registration Form") !== -1 || fullText.indexOf("CSC") !== -1) {
                    detectedMode = "csc";
                }

                return {
                    detectedMode: detectedMode,
                    sampleText: fullText.substring(0, 4000)
                };
            } catch (_) {
                return { detectedMode: null, sampleText: "" };
            }
        }

        // Fast & targeted scraper executed only when user clicks 'Pay & Generate Card'
        function pageDOMScraper() {
            var detectedMode = null;
            var photoB64 = "";
            try {
                var bodyText = (document.body && (document.body.innerText || document.body.textContent)) || "";
                var pageTitle = document.title || "";
                var fullText = bodyText + " " + pageTitle;

                if (fullText.indexOf("View Farmer Details") !== -1 ||
                    fullText.indexOf("Enrollment details") !== -1 ||
                    fullText.indexOf("Farmer Profile") !== -1 ||
                    fullText.indexOf("Farmer Registry") !== -1 ||
                    fullText.indexOf("ज़मीन") !== -1) {
                    detectedMode = "registry";
                } else if (fullText.indexOf("Registration Form") !== -1 || fullText.indexOf("CSC") !== -1) {
                    detectedMode = "csc";
                }

                // Preserve form input values into DOM attributes for backend parsing
                var inputs = document.querySelectorAll("input, select, textarea");
                for (var i = 0; i < inputs.length; i++) {
                    var el = inputs[i];
                    if (el.tagName === "INPUT") {
                        if (el.type === "checkbox" || el.type === "radio") {
                            if (el.checked) el.setAttribute("checked", "checked");
                            else el.removeAttribute("checked");
                        } else if (el.value) {
                            el.setAttribute("value", el.value);
                        }
                    } else if (el.tagName === "TEXTAREA") {
                        if (el.value) el.setAttribute("value", el.value);
                        el.textContent = el.value;
                    } else if (el.tagName === "SELECT") {
                        if (el.value) el.setAttribute("value", el.value);
                        if (el.selectedIndex >= 0 && el.options[el.selectedIndex]) {
                            el.setAttribute("data-selected-text", el.options[el.selectedIndex].text.trim());
                        }
                    }
                }

                // Target ONLY the single real farmer portrait (never generic page icons/logos)
                var pImg = document.querySelector("img.farmer_photo_img, img.photo, img#photo, div.farmer_photo img, div.farmerPhoto img, div[class*='Photograph'] img, div[class*='photo'] img, img[alt*='photo' i], img[src*='photo' i], img[src*='Photo' i]");
                if (!pImg) {
                    var candImgs = document.querySelectorAll("div[class*='details'] img, div[class*='profile'] img, table img");
                    for (var c = 0; c < candImgs.length; c++) {
                        var ci = candImgs[c];
                        if (ci.naturalWidth >= 50 && ci.naturalHeight >= 50 && ci.naturalWidth <= 500 && ci.naturalHeight <= 600) {
                            pImg = ci;
                            break;
                        }
                    }
                }

                if (pImg && pImg.naturalWidth > 30 && pImg.naturalHeight > 30) {
                    try {
                        var canvas = document.createElement("canvas");
                        var maxDim = 320;
                        var scale = Math.min(1, maxDim / Math.max(pImg.naturalWidth, pImg.naturalHeight));
                        canvas.width = Math.round(pImg.naturalWidth * scale);
                        canvas.height = Math.round(pImg.naturalHeight * scale);
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(pImg, 0, 0, canvas.width, canvas.height);
                        photoB64 = canvas.toDataURL("image/jpeg", 0.85);
                        pImg.setAttribute("src", photoB64);
                    } catch (_) {}
                }
            } catch (_) {}

            // Clean & lightweight HTML: clone body and remove bloated <script>, <style>, <svg>, <iframe>
            var cleanHtml = "";
            try {
                if (document.body) {
                    var clone = document.body.cloneNode(true);
                    var removeEls = clone.querySelectorAll("script, style, svg, noscript, iframe");
                    for (var r = 0; r < removeEls.length; r++) {
                        removeEls[r].parentNode && removeEls[r].parentNode.removeChild(removeEls[r]);
                    }
                    cleanHtml = "<html><head><title>" + (document.title || "") + "</title></head><body>" + clone.innerHTML + "</body></html>";
                } else if (document.documentElement) {
                    cleanHtml = document.documentElement.outerHTML;
                }
            } catch (_) {
                cleanHtml = document.documentElement ? document.documentElement.outerHTML : "";
            }

            return {
                html: cleanHtml,
                detectedMode: detectedMode,
                photo_b64: photoB64
            };
        }

        function simpleScraper() {
            try {
                var pImg = document.querySelector("img.farmer_photo_img, img.photo, img#photo, div.farmer_photo img, div.farmerPhoto img, div[class*='Photograph'] img, div[class*='photo'] img, img[alt*='photo' i]");
                var photoB64 = "";
                if (pImg && pImg.naturalWidth > 30 && pImg.naturalHeight > 30) {
                    try {
                        var canvas = document.createElement("canvas");
                        canvas.width = Math.min(320, pImg.naturalWidth);
                        canvas.height = Math.round(pImg.naturalHeight * (canvas.width / pImg.naturalWidth));
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(pImg, 0, 0, canvas.width, canvas.height);
                        photoB64 = canvas.toDataURL("image/jpeg", 0.85);
                        pImg.setAttribute("src", photoB64);
                    } catch (_) {}
                }
                return {
                    html: document.body ? document.body.innerHTML : (document.documentElement ? document.documentElement.outerHTML : ""),
                    photo_b64: photoB64
                };
            } catch (_) {
                return { html: "", photo_b64: "" };
            }
        }

        // Initial ready status
        setStatus("🟢 Ready for Card Generation", "success");

        // Scan active tab on load to auto-select state
        if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const activeTab = tabs && tabs[0];
                if (activeTab && activeTab.url) {
                    const detected = detectStateFromUrl(activeTab.url);
                    if (detected) {
                        applyDetectedState(detected, true);
                    }
                }
                if (activeTab && activeTab.id && activeTab.url && !activeTab.url.startsWith("chrome://") && !activeTab.url.startsWith("edge://") && !activeTab.url.startsWith("about:")) {
                    chrome.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        func: lightweightStateAndModeDetector
                    }, function (results) {
                        if (!chrome.runtime.lastError && results && results[0] && results[0].result) {
                            const res = results[0].result;
                            if (res.detectedMode && portalModeSelect) {
                                portalModeSelect.value = res.detectedMode;
                            }
                            if (!userManuallySelected && res.sampleText) {
                                const htmlDetected = detectStateFromHtml(res.sampleText);
                                if (htmlDetected) {
                                    applyDetectedState(htmlDetected, true);
                                }
                            }
                        }
                    });
                }
            });
        }

        // Read HTML directly from the active AgriStack tab
        function getActiveTabHtml() {
            return new Promise(function (resolve, reject) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    const activeTab = tabs && tabs[0];
                    if (!activeTab || !activeTab.id) {
                        return reject(new Error("No active browser tab found."));
                    }
                    if (activeTab.url && (activeTab.url.startsWith("chrome://") || activeTab.url.startsWith("chrome-extension://") || activeTab.url.startsWith("edge://") || activeTab.url.startsWith("about:"))) {
                        return reject(new Error("Please switch to the AgriStack farmer webpage tab first."));
                    }

                    chrome.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        func: pageDOMScraper
                    }, function (results) {
                        if (chrome.runtime.lastError || !results || !results[0] || !results[0].result || !results[0].result.html) {
                            var errMsg = (chrome.runtime.lastError && chrome.runtime.lastError.message) || "";
                            chrome.scripting.executeScript({
                                target: { tabId: activeTab.id },
                                func: simpleScraper
                            }, function (fbResults) {
                                if (fbResults && fbResults[0] && fbResults[0].result && fbResults[0].result.html) {
                                    return resolve({
                                        tabId: activeTab.id,
                                        html: fbResults[0].result.html,
                                        photo_b64: fbResults[0].result.photo_b64 || ""
                                    });
                                }
                                if (errMsg.indexOf("Extension context invalidated") !== -1 || errMsg.indexOf("Cannot access") !== -1) {
                                    return reject(new Error("Please refresh (press F5 on) the farmer webpage tab and try again."));
                                }
                                return reject(new Error("Failed to read webpage contents. Make sure you are on the farmer details page."));
                            });
                            return;
                        }

                        const res = results[0].result;
                        if (res.detectedMode && portalModeSelect) {
                            portalModeSelect.value = res.detectedMode;
                        }

                        resolve({
                            tabId: activeTab.id,
                            html: res.html,
                            photo_b64: res.photo_b64 || ""
                        });
                    });
                });
            });
        }

        const recoveryCard = document.getElementById("recoveryCard");
        const recentFarmerInfo = document.getElementById("recentFarmerInfo");
        const recentTime = document.getElementById("recentTime");
        const recentDlBtn = document.getElementById("recentDlBtn");
        const toggleRecoverBtn = document.getElementById("toggleRecoverBtn");
        const recoverBox = document.getElementById("recoverBox");
        const recoverInput = document.getElementById("recoverInput");
        const recoverSubmitBtn = document.getElementById("recoverSubmitBtn");

        function saveSessionLocally(sessData, usedServer) {
            try {
                if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.set({
                        last_session: {
                            sessionId: sessData.session_id,
                            farmerName: sessData.farmer_name || "Verified Farmer",
                            farmerId: sessData.farmer_id || "N/A",
                            stateCode: sessData.state_code || "",
                            serverUrl: usedServer || DEFAULT_SERVER_URL,
                            timestamp: Date.now()
                        }
                    });
                }
            } catch (_) {}
        }

        function checkRecentPaidSession() {
            try {
                if (typeof chrome === "undefined" || !chrome.storage || !chrome.storage.local) return;
                chrome.storage.local.get(["last_session"], function (result) {
                    const sess = result && result.last_session;
                    if (!sess || !sess.sessionId) return;

                    // Only check if created in the last 48 hours
                    if (Date.now() - (sess.timestamp || 0) > 48 * 3600 * 1000) return;

                    // Use a short 2.5-second timeout so this background check never slows down popup rendering
                    fetchWithFailover("/order_status?session_id=" + encodeURIComponent(sess.sessionId), { timeoutMs: 2500 }, sess.serverUrl)
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                            if (data && data.status === "paid" && recoveryCard) {
                                recoveryCard.style.display = "block";
                                if (recentFarmerInfo) {
                                    recentFarmerInfo.textContent = (sess.farmerName || "Farmer") + " (" + (sess.farmerId || "Ready") + ")";
                                }
                                if (recentTime) {
                                    recentTime.textContent = "Saved";
                                }
                                if (recentDlBtn) {
                                    recentDlBtn.onclick = function () {
                                        const sUrl = (sess.serverUrl || DEFAULT_SERVER_URL).replace(/\/+$/, "");
                                        const dlUrl = sUrl + "/download_card_file?session_id=" + encodeURIComponent(sess.sessionId);
                                        if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                                            chrome.tabs.create({ url: dlUrl });
                                        } else {
                                            window.open(dlUrl, "_blank");
                                        }
                                    };
                                }
                            }
                        })
                        .catch(function () {});
                });
            } catch (_) {}
        }

        checkRecentPaidSession();

        if (toggleRecoverBtn && recoverBox) {
            toggleRecoverBtn.addEventListener("click", function () {
                recoverBox.style.display = recoverBox.style.display === "none" ? "block" : "none";
            });
        }

        if (recoverSubmitBtn && recoverInput) {
            recoverSubmitBtn.addEventListener("click", function () {
                const searchId = recoverInput.value.trim();
                if (!searchId) {
                    setStatus("⚠️ Please enter a Payment ID or Session ID", "error");
                    return;
                }
                setStatus("Checking payment status across backends...", "normal");
                fetchWithFailover("/order_status?session_id=" + encodeURIComponent(searchId))
                    .then(function (res) {
                        return res.json().then(function (data) {
                            return { data: data, usedServer: res._usedServerUrl || DEFAULT_SERVER_URL };
                        });
                    })
                    .then(function (result) {
                        const data = result.data;
                        const usedServer = result.usedServer.replace(/\/+$/, "");
                        if (data && data.status === "paid") {
                            setStatus("🎉 Payment verified! Starting card download...", "success");
                            const dlUrl = usedServer + "/download_card_file?session_id=" + encodeURIComponent(searchId);
                            if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                                chrome.tabs.create({ url: dlUrl });
                            } else {
                                window.open(dlUrl, "_blank");
                            }
                        } else if (data && data.status === "created") {
                            setStatus("⚠️ Payment is still pending for this reference ID.", "error");
                        } else {
                            setStatus("❌ No matching order found for this reference ID.", "error");
                        }
                    })
                    .catch(function (err) {
                        setStatus("❌ Error: " + err.message, "error");
                    });
            });
        }

        let activeServerUrl = DEFAULT_SERVER_URL;

        function showPaidDownload(sessionId, serverUrl) {
            activeSessionId = sessionId;
            if (serverUrl) activeServerUrl = serverUrl;
            if (downloadContainer) downloadContainer.style.display = "block";
            setStatus("🎉 Card Generated! Click below to download your Farmer Card PDF.", "success");
        }

        if (downloadBtn) {
            downloadBtn.addEventListener("click", function () {
                if (!activeSessionId) return;
                const sUrl = (activeServerUrl || DEFAULT_SERVER_URL).replace(/\/+$/, "");
                const downloadUrl = sUrl + "/download_card_file?session_id=" + encodeURIComponent(activeSessionId);
                if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                    chrome.tabs.create({ url: downloadUrl });
                } else {
                    window.open(downloadUrl, "_blank");
                }
            });
        }

        // Initiate Instant Card Generation on the OPEN tab
        if (payBtn) {
            payBtn.addEventListener("click", function () {
                const aadhaarValue = aadhaarInput ? aadhaarInput.value.trim() : "";
                const selectedState = stateSelect ? stateSelect.value : "PB";
                const selectedPortalMode = portalModeSelect ? portalModeSelect.value : "csc";

                setStatus("Reading farmer details from current webpage...", "normal");
                payBtn.disabled = true;

                getActiveTabHtml()
                    .then(function (pageData) {
                        setStatus("Generating Official Farmer Card PDF...", "normal");

                        const payload = {
                            html: pageData.html,
                            portal_mode: selectedPortalMode,
                            aadhaar: aadhaarValue,
                            state_code: selectedState,
                            version: CURRENT_VERSION,
                            structured_data: {
                                photo_b64: pageData.photo_b64 || ""
                            }
                        };

                        return fetchWithFailover("/create_payment_session", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload)
                        }).then(function (res) {
                            if (!res.ok) {
                                return res.json().catch(function () { return {}; }).then(function (err) {
                                    throw new Error(err.error || ("Server error (" + res.status + ")"));
                                });
                            }
                            return res.json().then(function (sessionData) {
                                return { sessionData: sessionData, usedServer: res._usedServerUrl || DEFAULT_SERVER_URL };
                            });
                        }).then(function (result) {
                            payBtn.disabled = false;
                            const sessionData = result.sessionData;
                            const usedServer = result.usedServer.replace(/\/+$/, "");
                            activeSessionId = sessionData.session_id || null;
                            activeServerUrl = usedServer;

                            if (sessionData.session_id) {
                                saveSessionLocally(sessionData, usedServer);
                            }

                            // 1. Free Card Generation Flow (₹0)
                            if (sessionData.is_free || sessionData.fee_inr === 0) {
                                setStatus("🎉 Card generated successfully! Starting download...", "success");
                                showPaidDownload(activeSessionId, usedServer);
                                const downloadUrl = usedServer + (sessionData.download_url || ("/download_card_file?session_id=" + encodeURIComponent(activeSessionId)));
                                if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                                    chrome.tabs.create({ url: downloadUrl });
                                } else {
                                    window.open(downloadUrl, "_blank");
                                }
                                return;
                            }

                            // 2. Paid Card Generation Flow
                            let checkoutUrl = sessionData.checkout_url.startsWith("http")
                                ? sessionData.checkout_url
                                : (usedServer + sessionData.checkout_url);

                            if (selectedState && !checkoutUrl.includes("state_code=")) {
                                checkoutUrl += (checkoutUrl.includes("?") ? "&" : "?") + "state_code=" + encodeURIComponent(selectedState);
                            }

                            // Prioritize chrome.windows.create to guarantee popup blockers do NOT suppress the payment window
                            let checkoutWinId = null;
                            if (typeof chrome !== "undefined" && chrome.windows && chrome.windows.create) {
                                chrome.windows.create({
                                    url: checkoutUrl,
                                    type: "popup",
                                    width: 480,
                                    height: 720,
                                    focused: true
                                }, function (createdWin) {
                                    if (createdWin && createdWin.id) {
                                        checkoutWinId = createdWin.id;
                                    }
                                    if (chrome.runtime.lastError || !createdWin) {
                                        if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                                            chrome.tabs.create({ url: checkoutUrl });
                                        } else {
                                            window.open(checkoutUrl, "_blank");
                                        }
                                    }
                                });
                            } else if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                                chrome.tabs.create({ url: checkoutUrl });
                            } else {
                                window.open(checkoutUrl, "_blank");
                            }

                            setStatus("✅ Payment window opened! Complete payment to download.", "success");

                            if (sessionData.session_id) {
                                let isCompleted = false;
                                const pollTimer = setInterval(function () {
                                    fetchWithFailover("/order_status?session_id=" + encodeURIComponent(sessionData.session_id), {}, usedServer)
                                        .then(function (r) { return r.json(); })
                                        .then(function (statusData) {
                                            if (statusData && statusData.status === "paid" && !isCompleted) {
                                                isCompleted = true;
                                                clearInterval(pollTimer);
                                                setStatus("🎉 Payment Complete! Downloading Official Farmer Card PDF...", "success");
                                                showPaidDownload(sessionData.session_id, usedServer);

                                                // Automatic once-download failsafe from extension
                                                const dlUrl = usedServer + "/download_card_file?session_id=" + encodeURIComponent(sessionData.session_id);
                                                if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
                                                    chrome.tabs.create({ url: dlUrl });
                                                } else {
                                                    window.open(dlUrl, "_blank");
                                                }

                                                // Auto-close the checkout popup window
                                                if (checkoutWinId && typeof chrome !== "undefined" && chrome.windows && chrome.windows.remove) {
                                                    setTimeout(function () {
                                                        try { chrome.windows.remove(checkoutWinId); } catch (_) {}
                                                    }, 2500);
                                                }
                                            }
                                        })
                                        .catch(function () {});
                                }, 2000);

                                setTimeout(function () {
                                    clearInterval(pollTimer);
                                }, 600000);
                            }
                        });
                    })
                    .catch(function (err) {
                        setStatus("❌ " + err.message, "error");
                        payBtn.disabled = false;
                    });
            });
        }
    });
})();