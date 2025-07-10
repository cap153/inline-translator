let e = new Set,
    t = null,
    n = null,
    o = 0,
    a = null,
    r = 100,
    i = {
        isLoggedIn: !1,
        token: null
    },
    s = {
        targetLanguage: "zh",
        sourceLanguage: "en",
        language: "zh-CN",
        enableContextTranslation: !1,
        contextTranslationApiUrl: "",
        contextTranslationApiKey: "",
        contextTranslationModel: "gpt-4o-mini",
        modelProvider: "openai",
        apiKeys: {
            openai: "",
            qwen: "",
            deepseek: "",
            anthropic: "",
            openrouter: "",
            custom: "",
            volcengine: "",
            zhipu: ""
        },
        customModelNames: {
            openai: "",
            qwen: "",
            deepseek: "",
            anthropic: "",
            openrouter: "",
            custom: "",
            volcengine: "",
            zhipu: ""
        }
    };
async function l() {
    await async function() {
        try {
            const e = await chrome.storage.sync.get(["language", "targetLanguage", "sourceLanguage", "enableContextTranslation", "contextTranslationApiUrl", "contextTranslationModel", "customModelNames", "modelProvider", "apiKey_openai", "apiKey_qwen", "apiKey_deepseek", "apiKey_anthropic", "apiKey_openrouter", "apiKey_custom", "apiKey_volcengine", "apiKey_zhipu", "customModelName_openai", "customModelName_qwen", "customModelName_deepseek", "customModelName_anthropic", "customModelName_openrouter", "customModelName_custom", "customModelName_volcengine", "customModelName_zhipu", "authState"]);
            if (e.targetLanguage) return s.targetLanguage = e.targetLanguage, s.language = e.language || "zh-CN", s.sourceLanguage = e.sourceLanguage || "en", s.enableContextTranslation = e.enableContextTranslation || !1, s.contextTranslationApiUrl = e.contextTranslationApiUrl || "", s.contextTranslationModel = e.contextTranslationModel || "gpt-4o-mini", s.modelProvider = e.modelProvider || "openai", s.customModelNames = e.customModelNames || {
                openai: "",
                qwen: "",
                deepseek: "",
                anthropic: "",
                openrouter: "",
                custom: "",
                volcengine: "",
                zhipu: ""
            }, s.apiKeys = {
                openai: e.apiKey_openai || "",
                qwen: e.apiKey_qwen || "",
                deepseek: e.apiKey_deepseek || "",
                anthropic: e.apiKey_anthropic || "",
                openrouter: e.apiKey_openrouter || "",
                custom: e.apiKey_custom || "",
                volcengine: e.apiKey_volcengine || "",
                zhipu: e.apiKey_zhipu || ""
            }, s.customModelNames = {
                openai: e.customModelName_openai || "",
                qwen: e.customModelName_qwen || "",
                deepseek: e.customModelName_deepseek || "",
                anthropic: e.customModelName_anthropic || "",
                openrouter: e.customModelName_openrouter || "",
                custom: e.customModelName_custom || "",
                volcengine: e.customModelName_volcengine || "",
                zhipu: e.customModelName_zhipu || ""
            }, s.contextTranslationApiKey = s.apiKeys[s.modelProvider] || "", void(e.authState && (i = e.authState));
            await new Promise((e => {
                const t = () => {
                    window.i18n ? e() : setTimeout(t, 100)
                };
                t()
            })), window.i18n && (await window.i18n.loadSettings(), s = window.i18n.getSettings(), void 0 === s.enableContextTranslation && (s.enableContextTranslation = !1), void 0 === s.contextTranslationApiUrl && (s.contextTranslationApiUrl = ""), void 0 === s.contextTranslationApiKey && (s.contextTranslationApiKey = ""), void 0 === s.contextTranslationModel && (s.contextTranslationModel = "gpt-4o-mini"), void 0 === s.modelProvider && (s.modelProvider = "openai"), void 0 === s.apiKeys && (s.apiKeys = {
                openai: "",
                qwen: "",
                deepseek: "",
                anthropic: "",
                openrouter: "",
                custom: "",
                volcengine: "",
                zhipu: ""
            }), s.contextTranslationApiKey = s.apiKeys[s.modelProvider] || "")
        } catch (e) {
            s = {
                targetLanguage: "zh",
                sourceLanguage: "en",
                language: "zh-CN",
                enableContextTranslation: !1,
                contextTranslationApiUrl: "",
                contextTranslationApiKey: "",
                contextTranslationModel: "gpt-4o-mini",
                modelProvider: "openai",
                apiKeys: {
                    openai: "",
                    qwen: "",
                    deepseek: "",
                    anthropic: "",
                    openrouter: "",
                    custom: "",
                    volcengine: "",
                    zhipu: ""
                },
                customModelNames: {
                    openai: "",
                    qwen: "",
                    deepseek: "",
                    anthropic: "",
                    openrouter: "",
                    custom: "",
                    volcengine: "",
                    zhipu: ""
                }
            }
        }
    }(), document.addEventListener("mouseup", c), document.addEventListener("dblclick", c), chrome.runtime.onMessage.addListener(((l, c, w) => {
        "SETTINGS_UPDATED" === l.type ? s = l.settings : "DELETE_ALL_TRANSLATIONS" === l.type ? (e.forEach((e => {
            e && e.parentNode && e.parentNode.removeChild(e)
        })), e.clear(), n = null, a = null, o = 0, t = null) : "TRANSLATE_SELECTED_SENTENCE" === l.type ? async function(n) {
            try {
                if (!n || "" === n.trim()) return;
                const o = n.trim().split(/\s+/).length;
                if (o > r) return void alert(`选中文本过长(${o}个单词)，请选择不超过100个单词的句子。`);
                const a = window.getSelection();
                if (!a || 0 === a.rangeCount) return;
                t = a;
                d(n, a);
                ! function(n, o) {
                    try {
                        const a = o.getRangeAt(0),
                            r = a.endContainer,
                            i = a.endOffset,
                            l = m(r, i);
                        l && u(l);
                        const c = document.createElement("span");
                        c.className = "word-translation-inline sentence-translation";
                        const w = window.i18n ? window.i18n.t("translating") : "翻译中...";
                        const textSpan1 = document.createElement("span");
                        textSpan1.className = "translation-text";
                        textSpan1.textContent = `(${w})`;
                        c.appendChild(textSpan1);
                        c.addEventListener("click", (function(e) {
                            e.stopPropagation(), u(c)
                        })), h(c, r, i), e.add(c), async function(e, n) {
                            try {
                                const o = await async function(e) {
                                    if (!s.enableContextTranslation || !s.contextTranslationApiUrl) return await g(e);
                                    try {
                                        const n = t ? d(e, t) : e;
                                        return await p(e, n)
                                    } catch (n) {
                                        return await g(e)
                                    }
                                }(e);
                                if (n && n.querySelector(".translation-text")) {
                                    n.querySelector(".translation-text").textContent = `(${o})`
                                }
                            } catch (o) {
                                if (n && n.querySelector(".translation-text")) {
                                    const e = n.querySelector(".translation-text"),
                                        t = window.i18n ? window.i18n.t("translationFailed") : "翻译失败";
                                    e.textContent = `(${t})`
                                }
                            }
                        }(n, c), o.removeAllRanges()
                    } catch (a) {}
                }(n, a)
            } catch (o) {}
        }(l.text): "SIMPLIFY_SELECTED_ENGLISH" === l.type && async function(n) {
            try {
                if (!n || "" === n.trim()) return;
                const o = n.trim().split(/\s+/).length;
                if (o > r) return void alert(`选中文本过长(${o}个单词)，请选择不超过100个单词的句子。`);
                const a = window.getSelection();
                if (!a || 0 === a.rangeCount) return;
                t = a;
                d(n, a);
                ! function(n, o) {
                    try {
                        const a = o.getRangeAt(0),
                            r = a.endContainer,
                            l = a.endOffset,
                            c = m(r, l);
                        c && u(c);
                        const p = document.createElement("span");
                        p.className = "word-translation-inline sentence-translation";
                        const g = window.i18n ? window.i18n.t("translating") : "简化中...";
                        const textSpan2 = document.createElement("span");
                        textSpan2.className = "translation-text";
                        textSpan2.textContent = `(${g})`;
                        p.appendChild(textSpan2);
                        p.addEventListener("click", (function(e) {
                            e.stopPropagation(), u(p)
                        })), h(p, r, l), e.add(p), async function(e, n) {
                            try {
                                const o = await async function(e) {
                                    var n;
                                    try {
                                        s.targetLanguage;
                                        const o = s.sourceLanguage || "en",
                                            a = s.contextTranslationApiKey || "",
                                            r = s.modelProvider || "openai";
                                        let l = {},
                                            c = {
                                                "Content-Type": "application/json"
                                            },
                                            u = {
                                                method: "POST",
                                                headers: c
                                            };
                                        const p = t ? d(e, t) : e;
                                        if ("wordwiseCloud" === r) l = {
                                            source_text: e,
                                            context_sentence: p,
                                            target_language: "simplify",
                                            source_language: o,
                                            website_url: window.location.href
                                        }, i.token && (c.Authorization = `Bearer ${i.token}`);
                                        else {
                                            a && (c.Authorization = `Bearer ${a}`);
                                            const t = 'You are an English language assistant. Your goal is to simplify the provided English text to make it easier for a non-native speaker to understand.\n\nFollow these rules:\n1. Replace complex words and idioms with simpler, more common alternatives (e.g., change "utilize" to "use", "purchase" to "buy").\n2. Break down long, complex sentences into shorter, more direct ones.\n3. Preserve the original meaning of the text as accurately as possible.\n4. The output MUST be in English. Do not translate it to any other language.\n5. Do not add any comments or explanations, just provide the simplified English text.',
                                                n = `Please simplify the following English text:\n"""\n${e}\n"""`,
                                                o = "custom" === s.contextTranslationModel ? s.customModelNames[r] : s.contextTranslationModel;
                                            switch (r) {
                                                case "openai":
                                                case "zhipu":
                                                case "volcengine":
                                                case "deepseek":
                                                case "qwen":
                                                case "openrouter":
                                                default:
                                                    l = {
                                                        model: o,
                                                        messages: [{
                                                            role: "system",
                                                            content: t
                                                        }, {
                                                            role: "user",
                                                            content: n
                                                        }],
                                                        max_tokens: 150
                                                    };
                                                    break;
                                                case "anthropic":
                                                    l = {
                                                        model: o,
                                                        messages: [{
                                                            role: "user",
                                                            content: n
                                                        }],
                                                        system: t,
                                                        max_tokens: 150
                                                    }
                                            }
                                        }
                                        u.body = JSON.stringify(l);
                                        const g = await fetch(s.contextTranslationApiUrl, u);
                                        if (!g.ok) {
                                            const e = await g.json().catch((() => ({})));
                                            if (429 === g.status) return "免费额度已用完";
                                            throw new Error(`API请求失败: ${g.status} ${(null==(n=e.error)?void 0:n.message)||""}`.trim())
                                        }
                                        const m = await g.json();
                                        let h = "";
                                        if ("wordwiseCloud" === r) {
                                            if (!(m && m.data && m.data.target_text)) throw new Error("无法解析内联翻译官方服务 API响应");
                                            h = m.data.target_text
                                        } else if ("anthropic" === r) {
                                            if (!(m && m.content && m.content.length > 0)) throw new Error("无法解析Claude API响应");
                                            h = m.content[0].text.trim()
                                        } else {
                                            if (!(m && m.choices && m.choices.length > 0)) throw new Error("无法解析API响应");
                                            h = m.choices[0].message.content.trim()
                                        }
                                        return h
                                    } catch (o) {
                                        throw o
                                    }
                                }(e);
                                if (n && n.querySelector(".translation-text")) {
                                    n.querySelector(".translation-text").textContent = `(${o})`
                                }
                            } catch (o) {
                                if (n && n.querySelector(".translation-text")) {
                                    const e = n.querySelector(".translation-text"),
                                        t = window.i18n ? window.i18n.t("translationFailed") : "简化失败";
                                    e.textContent = `(${t})`
                                }
                            }
                        }(n, p), o.removeAllRanges()
                    } catch (a) {}
                }(n, a)
            } catch (o) {}
        }(l.text)
    })), chrome.storage.onChanged.addListener(((e, t) => {
        if ("sync" === t) {
            let t = !1;
            if (e.targetLanguage && (s.targetLanguage = e.targetLanguage.newValue, t = !0), e.language && (s.language = e.language.newValue, t = !0), e.sourceLanguage && (s.sourceLanguage = e.sourceLanguage.newValue, t = !0), e.authState && (i = e.authState.newValue || {
                    isLoggedIn: !1,
                    token: null
                }), e.enableContextTranslation && (s.enableContextTranslation = e.enableContextTranslation.newValue, t = !0), e.contextTranslationApiUrl && (s.contextTranslationApiUrl = e.contextTranslationApiUrl.newValue, t = !0), e.contextTranslationModel && (s.contextTranslationModel = e.contextTranslationModel.newValue, t = !0), e.modelProvider) {
                s.modelProvider = e.modelProvider.newValue, t = !0;
                const n = e.modelProvider.newValue;
                s.apiKeys && s.apiKeys[n] ? s.contextTranslationApiKey = s.apiKeys[n] : s.contextTranslationApiKey = ""
            }
            const n = {
                apiKey_openai: "openai",
                apiKey_qwen: "qwen",
                apiKey_deepseek: "deepseek",
                apiKey_anthropic: "anthropic",
                apiKey_openrouter: "openrouter",
                apiKey_custom: "custom",
                apiKey_volcengine: "volcengine",
                apiKey_zhipu: "zhipu"
            };
            Object.entries(n).forEach((([n, o]) => {
                e[n] && (s.apiKeys || (s.apiKeys = {}), s.apiKeys[o] = e[n].newValue, t = !0, s.modelProvider === o && (s.contextTranslationApiKey = e[n].newValue))
            }));
            const o = {
                customModelName_openai: "openai",
                customModelName_qwen: "qwen",
                customModelName_deepseek: "deepseek",
                customModelName_anthropic: "anthropic",
                customModelName_openrouter: "openrouter",
                customModelName_custom: "custom",
                customModelName_volcengine: "volcengine",
                customModelName_zhipu: "zhipu"
            };
            Object.entries(o).forEach((([n, o]) => {
                e[n] && (s.customModelNames || (s.customModelNames = {}), s.customModelNames[o] = e[n].newValue, t = !0)
            }))
        }
    }))
}

function c(r) {
    const i = Date.now();
    i - o < 500 || setTimeout((() => {
        const r = window.getSelection(),
            l = r.toString().trim();
        if (l && (/^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(c = l) && c.length <= 30) && function(e) {
                try {
                    const t = e.getRangeAt(0),
                        n = t.startContainer,
                        o = t.endContainer,
                        a = t.startOffset,
                        r = t.endOffset;
                    if (n.nodeType !== Node.TEXT_NODE || o.nodeType !== Node.TEXT_NODE) return !0;
                    if (n !== o) return !0;
                    const i = n.textContent;
                    let s = r;
                    if (r > a && /\s/.test(i.substring(r - 1, r)) && (s = r - 1), a > 0) {
                        const e = i.charAt(a - 1);
                        if (/[a-zA-Z-]/.test(e)) return !1
                    }
                    if (s < i.length) {
                        const e = i.charAt(s);
                        if (/[a-zA-Z-]/.test(e)) return !1
                    }
                    return !0
                } catch (t) {
                    return !0
                }
            }(r)) {
            if (function(e) {
                    try {
                        const t = e.getRangeAt(0),
                            n = t.startContainer.nodeType === Node.TEXT_NODE ? t.startContainer.parentNode : t.startContainer;
                        if (n.closest('input, textarea, [contenteditable="true"], [contenteditable=""]')) return !0;
                        const o = n.closest("div, span, form, label, p, dd");
                        if (o) {
                            const e = o.querySelectorAll('input, textarea, [contenteditable="true"], [contenteditable=""]');
                            if (Array.from(e).some((e => function(e) {
                                    if (!e) return !1;
                                    const t = window.getComputedStyle(e);
                                    return "none" !== t.display && "hidden" !== t.visibility && "0" !== t.opacity && e.offsetWidth > 0 && e.offsetHeight > 0
                                }(e)))) return !0
                        }
                        if ("github.com" === window.location.hostname) {
                            if (window.location.pathname.includes("/blob/")) return !0;
                            if (n.closest(".react-blob-textarea, .js-file-line-container, .blob-wrapper")) return !0
                        }
                        return !1
                    } catch (t) {
                        return !1
                    }
                }(r)) return;
            const c = function(e, t) {
                if (!t || 0 === e.rangeCount) return !1;
                try {
                    const n = e.getRangeAt(0);
                    return n.startContainer === t.startContainer && n.startOffset === t.startOffset && n.endContainer === t.endContainer && n.endOffset === t.endOffset
                } catch (n) {
                    return !1
                }
            }(r, a);
            if (l === n && c) return;
            t = r, n = l, o = i, a = function(e) {
                    try {
                        if (0 === e.rangeCount) return null;
                        const t = e.getRangeAt(0);
                        return {
                            startContainer: t.startContainer,
                            startOffset: t.startOffset,
                            endContainer: t.endContainer,
                            endOffset: t.endOffset
                        }
                    } catch (t) {
                        return null
                    }
                }(r),
                function(n, o) {
                    try {
                        const a = o.getRangeAt(0),
                            r = a.endContainer,
                            i = a.endOffset;
                        let l = null;
                        const c = r.nodeType === Node.TEXT_NODE ? r.parentNode : r,
                            m = Array.from(c.childNodes);
                        for (let e = 0; e < m.length; e++) {
                            const t = m[e];
                            if (t.classList && t.classList.contains("word-translation-inline") && e > 0 && m[e - 1] === r) {
                                l = t;
                                break
                            }
                        }
                        l && u(l);
                        const h = document.createElement("span");
                        h.className = "word-translation-inline";
                        const w = window.i18n ? window.i18n.t("translating") : "翻译中...";

                        // --- 这是第三处修改的正确实现 ---
                        const textSpan3 = document.createElement("span");
                        textSpan3.className = "translation-text";
                        textSpan3.textContent = `(${w})`;
                        h.appendChild(textSpan3);

                        h.addEventListener("click", (function(e) {
                            e.stopPropagation(), u(h)
                        }));
                        // --- 修改结束 ---

                        if (r.nodeType === Node.TEXT_NODE) {
                            const e = r.parentNode,
                                t = r.textContent.substring(i),
                                n = r.textContent.substring(0, i);
                            if (r.textContent = n, e.insertBefore(h, r.nextSibling), t) {
                                const n = document.createTextNode(t);
                                e.insertBefore(n, h.nextSibling)
                            }
                        } else {
                            const e = r;
                            e.insertBefore(h, e.childNodes[i])
                        }
                        e.add(h), async function(e, n) {
                            try {
                                const o = t ? d(e, t) : e,
                                    a = await async function(e, t) {
                                        if (!s.enableContextTranslation || !s.contextTranslationApiUrl) return await g(e);
                                        try {
                                            return await p(e, t)
                                        } catch (n) {
                                            return await g(e)
                                        }
                                    }(e, o);
                                if (n && n.querySelector(".translation-text")) {
                                    n.querySelector(".translation-text").textContent = `(${a})`
                                }
                            } catch (o) {
                                if (n && n.querySelector(".translation-text")) {
                                    const e = n.querySelector(".translation-text"),
                                        t = window.i18n ? window.i18n.t("translationFailed") : "翻译失败";
                                    e.textContent = `(${t})`
                                }
                            }
                        }(n, h), o.removeAllRanges()
                    } catch (a) {}
                }(l, r)
        }
        var c
    }), 100)
}

function u(t) {
    t && t.parentNode && (t.parentNode.removeChild(t), e.delete(t), n = null, a = null, o = 0)
}

function d(e, t) {
    try {
        const n = t.getRangeAt(0),
            o = n.startContainer.nodeType === Node.TEXT_NODE ? n.startContainer.parentNode : n.startContainer,
            a = (o.closest("p, div, span, h1, h2, h3, h4, h5, h6, article, section") || o).cloneNode(!0);
        a.querySelectorAll(".word-translation-inline").forEach((e => {
            e && e.parentNode && e.parentNode.removeChild(e)
        }));
        let r = a.textContent || "";
        r = r.trim().replace(/\s+/g, " ");
        const i = 300;
        if (r.length > i) {
            const t = r.indexOf(e);
            if (t >= 0) {
                const n = Math.max(0, t - Math.floor((i - e.length) / 2)),
                    o = Math.min(r.length, n + i);
                r = r.substring(n, o)
            } else r = r.substring(0, i)
        }
        return r
    } catch (n) {
        return e
    }
}
async function p(e, t) {
    var n;
    try {
        const o = s.targetLanguage || "zh",
            a = s.sourceLanguage || "en",
            r = s.contextTranslationApiKey || "",
            l = s.modelProvider || "openai";
        let c = {},
            u = {
                "Content-Type": "application/json"
            },
            d = {
                method: "POST",
                headers: u
            };
        if ("wordwiseCloud" === l) c = {
            source_text: e,
            context_sentence: t,
            target_language: o,
            source_language: a,
            website_url: window.location.href
        }, i.token && (u.Authorization = `Bearer ${i.token}`);
        else {
            r && (u.Authorization = `Bearer ${r}`);
            const n = `You are a professional translation assistant. Please translate the English word into ${o}, determining the most accurate translation based on the provided context. Only return the translation result, without any explanation or original text.`,
                a = `The context is: "${t}" \n\n Please translate the word: "${e}" `,
                i = "custom" === s.contextTranslationModel ? s.customModelNames[l] : s.contextTranslationModel;
            switch (l) {
                case "openai":
                case "zhipu":
                case "volcengine":
                case "deepseek":
                case "qwen":
                case "openrouter":
                default:
                    c = {
                        model: i,
                        messages: [{
                            role: "system",
                            content: n
                        }, {
                            role: "user",
                            content: a
                        }],
                        max_tokens: 50
                    };
                    break;
                case "anthropic":
                    c = {
                        model: i,
                        messages: [{
                            role: "user",
                            content: a
                        }],
                        system: n,
                        max_tokens: 50
                    }
            }
        }
        d.body = JSON.stringify(c);
        const p = await fetch(s.contextTranslationApiUrl, d);
        if (!p.ok) {
            const e = await p.json().catch((() => ({})));
            if (429 === p.status) return "免费额度已用完";
            throw new Error(`API请求失败: ${p.status} ${(null==(n=e.error)?void 0:n.message)||""}`.trim())
        }
        const g = await p.json();
        let m = "";
        if ("wordwiseCloud" === l) {
            if (!(g && g.data && g.data.target_text)) throw new Error("无法解析内联翻译官方服务 API响应");
            m = g.data.target_text
        } else if ("anthropic" === l) {
            if (!(g && g.content && g.content.length > 0)) throw new Error("无法解析Claude API响应");
            m = g.content[0].text.trim()
        } else {
            if (!(g && g.choices && g.choices.length > 0)) throw new Error("无法解析API响应");
            m = g.choices[0].message.content.trim()
        }
        return m
    } catch (o) {
        throw o
    }
}
async function g(e) {
    try {
        const t = s.targetLanguage || "zh",
            n = s.sourceLanguage || "en",
            o = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${n}&tl=${t}&dt=t&q=${encodeURIComponent(e)}`);
        if (!o.ok) throw new Error("API请求失败");
        const a = await o.json();
        if (a && a[0] && a[0][0] && a[0][0][0]) return a[0][0][0];
        throw new Error("无法解析翻译结果")
    } catch (t) {
        return function(e) {
            const t = s.targetLanguage || "zh",
                n = {
                    zh: {
                        hello: "你好"
                    },
                    ja: {
                        hello: "こんにちは"
                    },
                    ko: {
                        hello: "안녕하세요"
                    },
                    es: {
                        hello: "hola"
                    },
                    fr: {
                        hello: "bonjour"
                    }
                } [t],
                o = window.i18n ? window.i18n.t("notFound") : "未找到翻译";
            return n && n[e.toLowerCase()] ? n[e.toLowerCase()] : o
        }(e)
    }
}

function m(e, t) {
    const n = e.nodeType === Node.TEXT_NODE ? e.parentNode : e,
        o = Array.from(n.childNodes);
    for (let a = 0; a < o.length; a++) {
        const t = o[a];
        if (t.classList && t.classList.contains("word-translation-inline") && a > 0 && o[a - 1] === e) return t
    }
    return null
}

function h(e, t, n) {
    if (t.nodeType === Node.TEXT_NODE) {
        const o = t.parentNode,
            a = t.textContent.substring(n),
            r = t.textContent.substring(0, n);
        if (t.textContent = r, o.insertBefore(e, t.nextSibling), a) {
            const t = document.createTextNode(a);
            o.insertBefore(t, e.nextSibling)
        }
    } else {
        const o = t;
        o.insertBefore(e, o.childNodes[n])
    }
}(async () => {
    try {
        await l()
    } catch (e) {}
})();
