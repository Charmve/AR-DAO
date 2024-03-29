self.__BUILD_MANIFEST = function (e, s, n) {
    return {
        __rewrites: {
            beforeFiles: [],
            afterFiles: [{
                source: "/:nextInternalLocale(en\\-US|fr)/:path*",
                destination: "/:nextInternalLocale/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/tos",
                destination: "/:nextInternalLocale/terms"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/public/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/invite/nos"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/success-nos"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/blog"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/blog/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/remove-background"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/remove-background/:path*"
            }, {
                source: e
            }, {
                source: s
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/image-upscaler"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/image-upscaler/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/apis"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/apis/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/profile-picture"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/profile-picture/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/editor"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/editor/:path*"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/cleanup"
            }, {
                source: "/:nextInternalLocale(en\\-US|fr)/cleanup/:path*"
            }, {
                source: e
            }, {
                source: s
            }],
            fallback: []
        },
        "/": [n, "static/chunks/251-b50a96b2ac144e2d.js", "static/chunks/pages/index-80f483a4ad1563f3.js"],
        "/404": ["static/chunks/pages/404-4f2951fb2ef57ed9.js"],
        "/500": ["static/chunks/pages/500-60ceddce85024a21.js"],
        "/_error": ["static/chunks/pages/_error-11b8f06147a36068.js"],
        "/download": ["static/chunks/pages/download-f78a950a7957001c.js"],
        "/drop": ["static/chunks/pages/drop-5028bfb640f633fc.js"],
        "/forgot": ["static/chunks/pages/forgot-938325ac06f6fd35.js"],
        "/help": ["static/chunks/pages/help-2528363820847b25.js"],
        "/hiring": ["static/chunks/pages/hiring-b5527affbbf1fa4b.js"],
        "/presskit": ["static/chunks/pages/presskit-b314d078773ae292.js"],
        "/pricing": [n, "static/chunks/pages/pricing-f60c435f3589f88b.js"],
        "/privacy": ["static/chunks/pages/privacy-631f714645e6a10c.js"],
        "/signin-link": ["static/chunks/pages/signin-link-72d145357c66f10c.js"],
        "/start": ["static/chunks/pages/start-a44a72cf18d6e9fb.js"],
        "/subscription-cancel": ["static/chunks/pages/subscription-cancel-bede96538c3c120a.js"],
        "/subscription-success": ["static/chunks/pages/subscription-success-83c36fe285ee4b23.js"],
        "/terms": ["static/chunks/pages/terms-f7e0e7e1851e3045.js"],
        sortedPages: ["/", "/404", "/500", "/_app", "/_error", "/download", "/drop", "/forgot", "/help", "/hiring", "/presskit", "/pricing", "/privacy", "/signin-link", "/start", "/subscription-cancel", "/subscription-success", "/terms"]
    }
}("/:nextInternalLocale(en\\-US|fr)/relight", "/:nextInternalLocale(en\\-US|fr)/relight/:path*", "static/chunks/834-1e09c549ef4466f0.js"), self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();