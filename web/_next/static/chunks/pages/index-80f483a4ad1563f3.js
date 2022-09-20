(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [405], {
        3115: function (e, t, s) {
            var r, c = Object.create,
                a = Object.defineProperty,
                l = Object.defineProperties,
                n = Object.getOwnPropertyDescriptor,
                i = Object.getOwnPropertyDescriptors,
                o = Object.getOwnPropertyNames,
                d = Object.getOwnPropertySymbols,
                u = Object.getPrototypeOf,
                m = Object.prototype.hasOwnProperty,
                p = Object.prototype.propertyIsEnumerable,
                h = (e, t, s) => t in e ? a(e, t, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: s
                }) : e[t] = s,
                x = (e, t, s, r) => {
                    if (t && "object" === typeof t || "function" === typeof t)
                        for (let c of o(t)) m.call(e, c) || c === s || a(e, c, {
                            get: () => t[c],
                            enumerable: !(r = n(t, c)) || r.enumerable
                        });
                    return e
                },
                f = (e, t, s) => (s = null != e ? c(u(e)) : {}, x(!t && e && e.__esModule ? s : a(s, "default", {
                    value: e,
                    enumerable: !0
                }), e)),
                j = {};
            ((e, t) => {
                for (var s in t) a(e, s, {
                    get: t[s],
                    enumerable: !0
                })
            })(j, {
                default: () => C,
                useFaqFromI18nMessages: () => E
            }), e.exports = (r = j, x(a({}, "__esModule", {
                value: !0
            }), r));
            var v = f(s(2784)),
                b = s(2784),
                w = f(s(8460)),
                g = f(s(1540)),
                y = f(s(786)),
                N = s(5805),
                k = s(2784);

            function A(e) {
                const t = e.split("/").slice(0, -2),
                    [s] = e.split("/").slice(-1),
                    r = `${t.join("/")}/response/${s}`;
                return {
                    question: e,
                    order: Number.parseInt(s, 10),
                    response: r
                }
            }

            function P(e) {
                return (t, s) => {
                    return r = ((e, t) => {
                        for (var s in t || (t = {})) m.call(t, s) && h(e, s, t[s]);
                        if (d)
                            for (var s of d(t)) p.call(t, s) && h(e, s, t[s]);
                        return e
                    })({}, t), c = {
                        [s.question]: {
                            question: e({
                                id: s.question
                            }),
                            response: e({
                                id: s.response
                            })
                        }
                    }, l(r, i(c));
                    var r, c
                }
            }

            function E(e, t, s) {
                return (0, k.useMemo)((() => function (e, t, s) {
                    return Object.keys(e).filter((e => s.test(e))).filter((e => e.includes("/question/"))).map(A).sort(((e, t) => e.order - t.order)).reduce(P(t), {})
                }(s, t, e)), [s, t, e])
            }

            function _({
                children: e,
                className: t
            }) {
                return v.createElement("details", {
                    itemScope: !0,
                    itemProp: "mainEntity",
                    itemType: "https://schema.org/Question",
                    className: (0, N.mergeClass)("group border-t-[1px] py-6 border-gray-200 dark:border-gray-700 w-full max-w-[1000px] mx-10", t)
                }, e)
            }

            function O({
                children: e
            }) {
                return v.createElement("summary", {
                    className: "flex items-center group-open:mb-3 cursor-pointer"
                }, v.createElement(y.default, {
                    width: 24,
                    height: 24,
                    className: "mr-2 flex-shrink-0 group-open:rotate-90 transition-transform text-black dark:text-white"
                }), e)
            }

            function C({
                questions: e,
                limit: t
            }) {
                const s = Object.keys(e),
                    r = s.length > t,
                    [c, a] = (0, b.useState)(!0);

                function l(e) {
                    return !(!r || !c) && e > t
                }
                return v.createElement(v.Fragment, null, s.map(((t, s) => v.createElement(_, {
                    key: t,
                    className: l(s) ? "hidden" : ""
                }, v.createElement(O, null, v.createElement(N.H2, {
                    itemProp: "name",
                    className: "text-[18px] md:text-[18px] xl:text-[18px] font-semibold"
                }, e[t].question)), v.createElement("div", {
                    itemScope: !0,
                    itemProp: "acceptedAnswer",
                    itemType: "https://schema.org/Question",
                    className: "ml-[32px] text-black dark:text-white opacity-50"
                }, e[t].response)))), r && v.createElement(v.Fragment, null, c ? v.createElement(N.Button, {
                    buttonType: "light",
                    onClick: () => a(!1)
                }, v.createElement(g.default, {
                    width: 16,
                    height: 16
                })) : v.createElement(N.Button, {
                    buttonType: "light",
                    onClick: () => a(!0)
                }, v.createElement(w.default, {
                    width: 16,
                    height: 16
                }))))
            }
        },
        7314: function (e, t, s) {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/", function () {
                return s(4916)
            }])
        },
        7334: function (e, t, s) {
            "use strict";
            s.d(t, {
                Z: function () {
                    return x
                }
            });
            var r, c, a = s(2322),
                l = s(2784),
                n = s(7729),
                i = s.n(n),
                o = s(5632),
                d = s(3793),
                u = s(3542),
                m = null !== (r = "https://clipdrop.co") ? r : "",
                p = null !== (c = u.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION) && void 0 !== c ? c : "vlhvipxe4l11ip4w8pc6ujf03d36e5",
                h = "/web/homepage/preview.jpg";

            function x(e) {
                var t = e.children,
                    s = e.title,
                    r = e.description,
                    c = (0, o.useRouter)(),
                    n = c.basePath,
                    u = c.pathname,
                    x = c.locale;
                return (0, l.useEffect)((function () {
                    "" === m && console.error("process.env.NEXT_PUBLIC_HOME_URL is not defined")
                }), []), (0, a.jsxs)(i(), {
                    children: [(0, a.jsx)("title", {
                        children: s
                    }), (0, a.jsx)("meta", {
                        name: "description",
                        content: r
                    }), (0, a.jsx)("meta", {
                        name: "facebook-domain-verification",
                        content: p
                    }), (0, a.jsx)("link", {
                        rel: "icon",
                        href: "".concat(n, "/favicon.ico")
                    }), d.extraLocales.map((function (e) {
                        return (0, a.jsx)("link", {
                            rel: "alternate",
                            href: "".concat(m).concat(n, "/").concat(e).concat(u),
                            hrefLang: e
                        }, e)
                    })), (0, a.jsx)("link", {
                        rel: "alternate",
                        href: "".concat(m).concat(n).concat(u),
                        hrefLang: "x-default"
                    }), (0, a.jsx)("meta", {
                        name: "og:title",
                        content: s
                    }), (0, a.jsx)("meta", {
                        property: "og:description",
                        content: r
                    }), (0, a.jsx)("meta", {
                        property: "og:image",
                        content: "http://static.clipdrop.co".concat(h)
                    }), (0, a.jsx)("meta", {
                        property: "og:image:secure",
                        content: "https://static.clipdrop.co".concat(h)
                    }), (0, a.jsx)("meta", {
                        property: "og:url",
                        content: "https://clipdrop.co".concat(n, "/").concat(x)
                    }), (0, a.jsx)("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }), (0, a.jsx)("meta", {
                        name: "twitter:title",
                        content: s
                    }), (0, a.jsx)("meta", {
                        name: "twitter:description",
                        content: r
                    }), (0, a.jsx)("meta", {
                        name: "twitter:image",
                        content: "https://static.clipdrop.co".concat(h)
                    }), t]
                })
            }
        },
        4916: function (e, t, s) {
            "use strict";
            s.r(t), s.d(t, {
                __N_SSG: function () {
                    return z
                },
                default: function () {
                    return X
                }
            });
            var r = s(2322),
                c = s(6577),
                a = s.n(c),
                l = s(7454),
                n = s.n(l),
                i = s(2784),
                o = s(3112),
                d = s(5805),
                u = s(750),
                m = s.n(u),
                p = s(9590),
                h = s(6750),
                x = s.n(h),
                f = s(2873),
                j = s(3115),
                v = s.n(j);

            function b() {
                var e = (0, i.useMemo)((function () {
                        return /^\/home\/faq\//
                    }), []),
                    t = (0, o.Z)(),
                    s = t.formatMessage,
                    c = t.messages,
                    a = (0, j.useFaqFromI18nMessages)(e, s, c);
                return (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsx)(v(), {
                        limit: 5,
                        questions: a
                    })
                })
            }
            var w = s(6605),
                g = s.n(w),
                y = s(9097),
                N = s.n(y),
                k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                A = function (e, t, s) {
                    return k.charAt(e >> 2) + k.charAt((3 & e) << 4 | t >> 4) + k.charAt((15 & t) << 2 | s >> 6) + k.charAt(63 & s)
                };

            function P(e) {
                var t, s, c, l = e.message,
                    n = e.href,
                    i = e.src;
                e.alt;
                return (0, r.jsxs)("div", {
                    className: "w-full h-full p-8 flex flex-col justify-center items-center gap-7",
                    children: [(0, r.jsxs)(d.P, {
                        className: "font-bold text-[37px] text-center",
                        children: ['"', l, '"']
                    }), (0, r.jsx)(a(), {
                        className: "object-contain dark:invert",
                        src: i,
                        placeholder: "blur",
                        blurDataURL: (t = 255, s = 255, c = 255, "data:image/gif;base64,R0lGODlhAQABAPAA".concat(A(0, t, s) + A(c, 255, 255), "/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==")),
                        alt: "",
                        width: 117,
                        height: 20
                    }), (0, r.jsx)(N(), {
                        href: n,
                        passHref: !0,
                        children: (0, r.jsxs)(d.A, {
                            className: "flex gap-1 items-center",
                            children: [(0, r.jsx)(g(), {
                                width: 18,
                                height: 18
                            }), " Read the full article"]
                        })
                    })]
                })
            }
            var E = s(7328),
                _ = s(6297);

            function O(e) {
                var t = e.className,
                    s = (0, _.Z)(e, ["className"]);
                return (0, r.jsx)("section", (0, E.Z)({
                    className: (0, d.mergeClass)("my-36 flex justify-center items-center flex-col", t)
                }, s))
            }
            var C = s(6670),
                q = s(8530),
                B = s(1630),
                I = s.n(B),
                H = s(6693);

            function T(e) {
                var t = e.sources,
                    s = e.autoPlayWhenVisible,
                    c = e.autoPlay,
                    a = (0, _.Z)(e, ["sources", "autoPlayWhenVisible", "autoPlay"]),
                    l = (0, q.Z)((0, H.useIsElementVisible)(), 2),
                    n = l[0],
                    o = l[1];
                return (0, i.useEffect)((function () {
                    s && n.current && (o && n.current.paused ? n.current.play().catch((function (e) {
                        return console.warn(e)
                    })) : n.current.pause())
                }), [s, o, n]), (0, i.useEffect)((function () {
                    var e;
                    !1 === s && (null === (e = n.current) || void 0 === e || e.pause())
                }), [s, n]), (0, r.jsx)("video", (0, C.Z)((0, E.Z)({
                    ref: n,
                    autoPlay: c
                }, a), {
                    children: null === t || void 0 === t ? void 0 : t.map((function (e) {
                        var t = e.src,
                            s = e.type;
                        return (0, r.jsx)("source", {
                            src: t,
                            type: s
                        }, t)
                    }))
                }))
            }

            function R(e) {
                var t = e.onClick,
                    s = e.children,
                    c = (0, i.useRef)(null);
                return (0, r.jsxs)("div", {
                    className: "relative group cursor-pointer",
                    onClick: t,
                    ref: c,
                    children: [s, (0, r.jsx)("div", {
                        className: "absolute top-0 right-0 bottom-0 left-0 bg-[hsla(0,0%,20%,0.35)] flex justify-center items-center rounded-2xl",
                        children: (0, r.jsx)(I(), {
                            className: "text-white group-hover:scale-125 transition-transform",
                            width: 90,
                            height: 80
                        })
                    })]
                })
            }
            var S = s(5556),
                F = s.n(S),
                L = s(1378),
                V = s.n(L),
                Z = {
                    hero: "6ktXlBDf4hQ",
                    demo: "ogKO58Ay2Z8"
                };

            function M(e) {
                var t = e.video,
                    s = e.onClickOutSide;
                return (0, r.jsx)(F(), {
                    open: !!t,
                    onClickOutSide: s,
                    children: (0, r.jsxs)("div", {
                        className: "flex flex-col h-full",
                        children: [(0, r.jsx)("div", {
                            className: "m-2 flex justify-end",
                            children: (0, r.jsx)("div", {
                                onClick: s,
                                className: "p-3 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer",
                                children: (0, r.jsx)(V(), {
                                    width: 30,
                                    height: 30
                                })
                            })
                        }), t && (0, r.jsx)("div", {
                            className: "flex-1 flex justify-center items-center",
                            children: (0, r.jsx)("div", {
                                className: "max-h-full max-w-full aspect-video",
                                children: (0, r.jsx)("iframe", {
                                    width: "1120",
                                    height: "630",
                                    src: "https://www.youtube.com/embed/".concat(Z[t]),
                                    title: "YouTube video player",
                                    frameBorder: "0",
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    className: "object-contain md:object-cover h-full max-w-full aspect-video",
                                    allowFullScreen: !0
                                })
                            })
                        })]
                    })
                })
            }
            var W = s(7334),
                D = s(5632);
            var z = !0,
                X = function () {
                    var e = function (e) {
                            var t = document.querySelector("#hero-video");
                            null === t || void 0 === t || t.pause(), h(e)
                        },
                        t = (0, o.Z)().formatMessage,
                        s = function () {
                            var e = (0, D.useRouter)(),
                                t = e.defaultLocale,
                                s = e.locale,
                                r = (0, i.useCallback)((function (e) {
                                    return "".concat(e).concat(t !== s ? "/".concat(s) : "")
                                }), [t, s]);
                            return (0, i.useMemo)((function () {
                                return {
                                    removeBackground: r("/remove-background"),
                                    cleanup: r("/cleanup"),
                                    enhance: r("/image-upscaler"),
                                    relight: r("/relight")
                                }
                            }), [t, s])
                        }(),
                        c = (0, i.useState)(),
                        l = c[0],
                        h = c[1];
                    return (0, i.useEffect)((function () {
                        var e = function (e) {
                            "Escape" === e.key && h(void 0)
                        };
                        return window.addEventListener("keydown", e),
                            function () {
                                window.removeEventListener("keydown", e)
                            }
                    }), []), (0, i.useEffect)((function () {
                        var e = document.querySelector("#hero-video");
                        e && (e.playbackRate = 1.5)
                    })), (0, r.jsxs)(r.Fragment, {
                        children: [(0, r.jsx)(W.Z, {
                            title: t({
                                id: "/home/title/index"
                            }),
                            description: t({
                                id: "/home/description/index"
                            })
                        }), (0, r.jsx)(x(), {
                            campaign: "background_removal"
                        }), (0, r.jsx)(M, {
                            video: l,
                            onClickOutSide: function () {
                                var e = document.querySelector("#hero-video");
                                null === e || void 0 === e || e.play(), h(void 0)
                            }
                        }), (0, r.jsxs)("main", {
                            className: "px-4",
                            children: [(0, r.jsxs)(O, {
                                className: "gap-11 my-14 md:mt-20",
                                children: [(0, r.jsx)(d.H1, {
                                    className: "text-center",
                                    children: t({
                                        id: "/home/h1/create"
                                    })
                                }), (0, r.jsx)(d.H4, {
                                    className: "text-center",
                                    children: t({
                                        id: "/home/h4/ecosystem"
                                    })
                                }), (0, r.jsxs)("div", {
                                    className: "self-center flex gap-8 items-center",
                                    children: [(0, r.jsx)(d.A, {
                                        className: "cursor-pointer",
                                        onClick: function () {
                                            return e("demo")
                                        },
                                        children: t({
                                            id: "/home/a/watch"
                                        })
                                    }), (0, r.jsx)(d.Button, {
                                        onClick: function () {
                                            var e;
                                            null === (e = document.getElementById("features")) || void 0 === e || e.scrollIntoView({
                                                behavior: "smooth"
                                            })
                                        },
                                        buttonType: "action",
                                        children: t({
                                            id: "/home/button/try"
                                        })
                                    })]
                                }), (0, r.jsx)(R, {
                                    onClick: function () {
                                        return e("hero")
                                    },
                                    children: (0, r.jsx)(T, {
                                        className: "self-center object-contain max-h-[506px] aspect-video rounded-2xl",
                                        id: "hero-video",
                                        sources: [{
                                            src: "https://static.clipdrop.co/web/homepage/hero-video.webm#t=0.1",
                                            type: "video/webm"
                                        }, {
                                            src: "https://static.clipdrop.co/web/homepage/hero-video.mp4#t=0.1",
                                            type: "video/mp4"
                                        }],
                                        muted: !0,
                                        playsInline: !0,
                                        autoPlay: !0,
                                        loop: !0
                                    })
                                })]
                            }), (0, r.jsxs)(O, {
                                id: "features",
                                children: [(0, r.jsx)(d.H2, {
                                    className: "text-center mb-7",
                                    children: t({
                                        id: "/home/h2/assistant"
                                    })
                                }), (0, r.jsx)(d.H4, {
                                    className: "text-center mb-6",
                                    children: t({
                                        id: "/home/h4/saveTime"
                                    })
                                }), (0, r.jsx)("div", {
                                    className: "w-full max-w-[1200px] h-[500px]",
                                    children: (0, r.jsx)(u.Cards, {
                                        cards: [{
                                            index: 0,
                                            title: "Remove Background",
                                            description: t({
                                                id: "/home/p/removeBackground"
                                            }),
                                            button: (0, r.jsx)(d.Button, {
                                                className: "self-start",
                                                children: (0, r.jsx)("a", {
                                                    href: s.removeBackground,
                                                    children: t({
                                                        id: "/home/button/try"
                                                    })
                                                })
                                            })
                                        }, {
                                            index: 1,
                                            title: "Cleanup",
                                            description: t({
                                                id: "/home/p/cleanup"
                                            }),
                                            button: (0, r.jsx)(d.Button, {
                                                className: "self-start",
                                                children: (0, r.jsx)("a", {
                                                    href: s.cleanup,
                                                    children: t({
                                                        id: "/home/button/try"
                                                    })
                                                })
                                            })
                                        }, {
                                            index: 2,
                                            title: "Super Resolution",
                                            description: t({
                                                id: "/home/p/enhance"
                                            }),
                                            button: (0, r.jsx)(d.Button, {
                                                className: "self-start",
                                                children: (0, r.jsx)("a", {
                                                    href: s.enhance,
                                                    children: t({
                                                        id: "/home/button/try"
                                                    })
                                                })
                                            })
                                        }, {
                                            index: 3,
                                            title: "Relight",
                                            description: t({
                                                id: "/home/p/relight"
                                            }),
                                            button: (0, r.jsx)(d.Button, {
                                                className: "self-start",
                                                children: (0, r.jsx)("a", {
                                                    href: s.relight,
                                                    children: t({
                                                        id: "/home/button/try"
                                                    })
                                                })
                                            })
                                        }],
                                        uniqueName: "product",
                                        children: (0, r.jsx)(m(), {
                                            autoPaginate: !1,
                                            uniqueName: "product",
                                            className: "rounded-2xl",
                                            children: [(0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full w-full",
                                                children: (0, r.jsx)(T, {
                                                    className: "self-center object-cover max-h-full aspect-video rounded-2xl",
                                                    sources: [{
                                                        src: "https://static.clipdrop.co/web/homepage/feature_remove-background.webm#t=0.1",
                                                        type: "video/webm"
                                                    }, {
                                                        src: "https://static.clipdrop.co/web/homepage/feature_remove-background.mp4#t=0.1",
                                                        type: "video/mp4"
                                                    }],
                                                    muted: !0,
                                                    autoPlayWhenVisible: !0,
                                                    loop: !0,
                                                    playsInline: !0
                                                })
                                            }, 1), (0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full w-full",
                                                children: (0, r.jsx)(T, {
                                                    className: "self-center object-cover max-h-full aspect-video rounded-2xl",
                                                    sources: [{
                                                        src: "https://static.clipdrop.co/web/homepage/feature_cleanup.webm#t=0.1",
                                                        type: "video/webm"
                                                    }, {
                                                        src: "https://static.clipdrop.co/web/homepage/feature_cleanup.mp4#t=0.1",
                                                        type: "video/mp4"
                                                    }],
                                                    muted: !0,
                                                    autoPlayWhenVisible: !0,
                                                    loop: !0,
                                                    playsInline: !0
                                                })
                                            }, 2), (0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full w-full",
                                                children: (0, r.jsx)(T, {
                                                    className: "self-center object-cover max-h-full aspect-video rounded-2xl",
                                                    sources: [{
                                                        src: "https://static.clipdrop.co/web/homepage/feature_upscale.webm#t=0.1",
                                                        type: "video/webm"
                                                    }, {
                                                        src: "https://static.clipdrop.co/web/homepage/feature_upscale.mp4#t=0.1",
                                                        type: "video/mp4"
                                                    }],
                                                    muted: !0,
                                                    autoPlayWhenVisible: !0,
                                                    loop: !0,
                                                    playsInline: !0
                                                })
                                            }, 2), (0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full w-full",
                                                children: (0, r.jsx)(T, {
                                                    className: "self-center object-cover max-h-full aspect-video rounded-2xl",
                                                    sources: [{
                                                        src: "https://static.clipdrop.co/web/homepage/feature-relight.webm#t=0.1",
                                                        type: "video/webm"
                                                    }, {
                                                        src: "https://static.clipdrop.co/web/homepage/feature-relight.mp4#t=0.1",
                                                        type: "video/mp4"
                                                    }],
                                                    muted: !0,
                                                    autoPlayWhenVisible: !0,
                                                    loop: !0,
                                                    playsInline: !0
                                                })
                                            }, 3)]
                                        })
                                    })
                                })]
                            }), (0, r.jsxs)(O, {
                                children: [(0, r.jsx)(d.H2, {
                                    className: "text-center mb-7",
                                    children: t({
                                        id: "/home/h2/use-cases"
                                    })
                                }), (0, r.jsx)(d.H4, {
                                    className: "text-center mb-6",
                                    children: t({
                                        id: "/home/h4/use-cases"
                                    })
                                }), (0, r.jsx)("div", {
                                    className: "w-full max-w-[1200px] h-[500px]",
                                    children: (0, r.jsx)(u.Cards, {
                                        reverse: !0,
                                        uniqueName: "use-cases",
                                        cards: [{
                                            index: 0,
                                            title: "E-commerce",
                                            description: t({
                                                id: "/home/use-cases/ecommerce"
                                            })
                                        }, {
                                            index: 1,
                                            title: "Real Estate",
                                            description: t({
                                                id: "/home/use-cases/real-estate"
                                            })
                                        }, {
                                            index: 2,
                                            title: "Car Resellers",
                                            description: t({
                                                id: "/home/use-cases/car-resellers"
                                            })
                                        }, {
                                            index: 3,
                                            title: "Team portraits",
                                            description: t({
                                                id: "/home/use-cases/team-portraits"
                                            })
                                        }],
                                        children: (0, r.jsx)(m(), {
                                            autoPaginate: !1,
                                            uniqueName: "use-cases",
                                            className: "rounded-2xl",
                                            children: [(0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full",
                                                children: (0, r.jsx)(n(), {
                                                    className: "object-contain max-w-full max-h-full pointer-events-none rounded-xl",
                                                    src: "https://static.clipdrop.co/web/homepage/use-case_ecommerce.webp",
                                                    alt: "eCommerce use case",
                                                    height: 500,
                                                    width: 832
                                                })
                                            }, 1), (0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full",
                                                children: (0, r.jsx)(n(), {
                                                    className: "object-contain max-w-full max-h-full pointer-events-none rounded-xl",
                                                    src: "https://static.clipdrop.co/web/homepage/use-case_real-estate.webp",
                                                    alt: "Real estate use case",
                                                    height: 500,
                                                    width: 832
                                                })
                                            }, 2), (0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full",
                                                children: (0, r.jsx)(n(), {
                                                    className: "object-contain max-w-full max-h-full pointer-events-none rounded-xl",
                                                    src: "https://static.clipdrop.co/web/homepage/use-case_car.webp",
                                                    alt: "Car use case",
                                                    height: 500,
                                                    width: 832
                                                })
                                            }, 3), (0, r.jsx)("div", {
                                                className: "flex justify-center items-center h-full",
                                                children: (0, r.jsx)(n(), {
                                                    className: "object-contain max-w-full max-h-full pointer-events-none rounded-xl",
                                                    src: "https://static.clipdrop.co/web/homepage/use-case_team.webp",
                                                    alt: "Team use case",
                                                    height: 500,
                                                    width: 832
                                                })
                                            }, 4)]
                                        })
                                    })
                                })]
                            }), (0, r.jsxs)(O, {
                                children: [(0, r.jsx)(d.H2, {
                                    className: "text-center mb-7",
                                    children: t({
                                        id: "/home/h2/award"
                                    })
                                }), (0, r.jsx)(d.H4, {
                                    className: "text-center mb-6",
                                    children: t({
                                        id: "/home/h4/award"
                                    })
                                }), (0, r.jsxs)("div", {
                                    className: "w-full max-w-[1000px] h-[460px] flex flex-row gap-7",
                                    children: [(0, r.jsx)(T, {
                                        className: "w-full sm:w-1/2 self-center object-cover h-full aspect-video rounded-2xl",
                                        sources: [{
                                            src: "https://static.clipdrop.co/web/homepage/clipdrop-demo400.webm#t=0.1",
                                            type: "video/webm"
                                        }, {
                                            src: "https://static.clipdrop.co/web/homepage/clipdrop-demo400.mp4#t=0.1",
                                            type: "video/mp4"
                                        }],
                                        muted: !0,
                                        autoPlayWhenVisible: !0,
                                        loop: !0,
                                        playsInline: !0
                                    }), (0, r.jsx)(d.Overlay, {
                                        className: "hidden sm:block relative w-1/2",
                                        children: (0, r.jsxs)(u.OnHover, {
                                            uniqueName: "award",
                                            className: "absolute top-0 right-0 bottom-0 left-0",
                                            children: [(0, r.jsx)(m(), {
                                                uniqueName: "award",
                                                autoPaginate: !0,
                                                className: "rounded-2xl",
                                                children: [(0, r.jsx)("div", {
                                                    className: "flex justify-center items-center h-full",
                                                    children: (0, r.jsx)(P, {
                                                        message: "A new horizon of potential",
                                                        href: "https://www.wired.it/mobile/app/2020/05/06/ar-cutpaste-copia-incolla/",
                                                        alt: "wired",
                                                        src: "https://static.clipdrop.co/web/homepage/wired.svg"
                                                    })
                                                }, 1), (0, r.jsx)("div", {
                                                    className: "flex justify-center items-center h-full",
                                                    children: (0, r.jsx)(P, {
                                                        message: "The results are nothing short of astounding",
                                                        href: "https://petapixel.com/2020/05/06/this-guy-figured-out-how-to-cut-and-paste-the-real-world-into-photoshop/",
                                                        alt: "petapixel",
                                                        src: "https://static.clipdrop.co/web/homepage/petapixel.png"
                                                    })
                                                }, 2), (0, r.jsx)("div", {
                                                    className: "flex justify-center items-center h-full",
                                                    children: (0, r.jsx)(P, {
                                                        message: "Finally a practical use for AR",
                                                        href: "https://www.theverge.com/2020/5/4/21246386/augmented-reality-ar-copy-cut-paste-real-world-photoshop-demo",
                                                        alt: "the verge",
                                                        src: "https://static.clipdrop.co/web/homepage/the-verge.svg"
                                                    })
                                                }, 3)]
                                            }), (0, r.jsx)(u.Dots, {
                                                uniqueName: "award",
                                                className: "relative bottom-8 w-full justify-center",
                                                items: [{
                                                    index: 0
                                                }, {
                                                    index: 1
                                                }, {
                                                    index: 2
                                                }]
                                            })]
                                        })
                                    })]
                                })]
                            }), (0, r.jsxs)(O, {
                                children: [(0, r.jsx)(d.H2, {
                                    className: "text-center mb-7",
                                    children: t({
                                        id: "/home/h2/superPower"
                                    })
                                }), (0, r.jsx)(d.H4, {
                                    className: "text-center mb-6",
                                    children: t({
                                        id: "/home/h4/superPower"
                                    })
                                }), (0, r.jsxs)("div", {
                                    className: "flex flex-col gap-5 w-full max-w-[1000px]",
                                    children: [(0, r.jsx)(u.ButtonsTabs, {
                                        uniqueName: "super-power",
                                        tabs: [{
                                            index: 0,
                                            title: (0, r.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [(0, r.jsx)(p.Photoshop, {
                                                    size: 24
                                                }), (0, r.jsx)(d.P, {
                                                    children: "Photoshop"
                                                })]
                                            })
                                        }, {
                                            index: 1,
                                            title: (0, r.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [(0, r.jsx)(p.Figma, {
                                                    size: 24
                                                }), (0, r.jsx)(d.P, {
                                                    children: "Figma"
                                                })]
                                            })
                                        }, {
                                            index: 2,
                                            title: (0, r.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [(0, r.jsx)(p.Apple, {
                                                    size: 24
                                                }), (0, r.jsx)(d.P, {
                                                    children: "iOS"
                                                })]
                                            })
                                        }, {
                                            index: 3,
                                            title: (0, r.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [(0, r.jsx)(p.Android, {
                                                    className: "text-[#A6D864]",
                                                    size: 24
                                                }), (0, r.jsx)(d.P, {
                                                    children: "Android"
                                                })]
                                            })
                                        }]
                                    }), (0, r.jsx)(m(), {
                                        uniqueName: "super-power",
                                        autoPaginate: !1,
                                        className: "rounded-2xl h-[500px]",
                                        children: [(0, r.jsx)("div", {
                                            className: "flex justify-center items-center h-full max-w-full",
                                            children: (0, r.jsx)("div", {
                                                className: "relative self-center object-cover max-h-full w-full aspect-video sm:rounded-2xl select-none",
                                                children: (0, r.jsx)(f.LiteYoutubeEmbed, {
                                                    id: "ogKO58Ay2Z8"
                                                })
                                            })
                                        }, 1), (0, r.jsx)("div", {
                                            className: "flex justify-center items-center h-full",
                                            children: (0, r.jsx)("iframe", {
                                                src: "https://www.loom.com/embed/378d70f3ef2f4ad88b41071685e7c024",
                                                frameBorder: "0",
                                                allowFullScreen: !0,
                                                className: "self-center object-contain max-h-full w-full aspect-video sm:rounded-2xl"
                                            })
                                        }, 2), (0, r.jsx)("div", {
                                            className: "flex justify-center items-center h-full",
                                            children: (0, r.jsx)(T, {
                                                className: "self-center object-cover h-full aspect-square sm:rounded-2xl",
                                                sources: [{
                                                    src: "https://static.clipdrop.co/web/homepage/clipdrop-demo400.webm#t=0.1",
                                                    type: "video/webm"
                                                }, {
                                                    src: "https://static.clipdrop.co/web/homepage/clipdrop-demo400.mp4#t=0.1",
                                                    type: "video/mp4"
                                                }],
                                                muted: !0,
                                                autoPlayWhenVisible: !0,
                                                loop: !0,
                                                playsInline: !0
                                            })
                                        }, 3), (0, r.jsx)("div", {
                                            className: "flex justify-center items-center h-full",
                                            children: (0, r.jsx)(T, {
                                                className: "self-center object-cover h-full aspect-square sm:rounded-2xl",
                                                sources: [{
                                                    src: "https://static.clipdrop.co/web/homepage/clipdrop-demo400.webm#t=0.1",
                                                    type: "video/webm"
                                                }, {
                                                    src: "https://static.clipdrop.co/web/homepage/clipdrop-demo400.mp4#t=0.1",
                                                    type: "video/mp4"
                                                }],
                                                muted: !0,
                                                autoPlayWhenVisible: !0,
                                                loop: !0,
                                                playsInline: !0
                                            })
                                        }, 4)]
                                    })]
                                })]
                            }), (0, r.jsxs)(O, {
                                className: "gap-7",
                                children: [(0, r.jsx)(d.Tag, {
                                    children: t({
                                        id: "/home/tag/new"
                                    })
                                }), (0, r.jsx)(d.H2, {
                                    className: "text-center",
                                    children: t({
                                        id: "/home/h2/api"
                                    })
                                }), (0, r.jsx)(d.H4, {
                                    className: "text-center",
                                    children: t({
                                        id: "/home/h4/api"
                                    })
                                }), (0, r.jsxs)("div", {
                                    className: "self-center flex gap-8 items-center",
                                    children: [(0, r.jsx)(d.Button, {
                                        buttonType: "action",
                                        children: (0, r.jsx)("a", {
                                            href: "https://clipdrop.co/apis",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: t({
                                                id: "/home/button/api"
                                            })
                                        })
                                    }), (0, r.jsx)(d.A, {
                                        href: "https://github.com/initml/clipdrop-api-samples",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        children: t({
                                            id: "/home/a/api"
                                        })
                                    })]
                                }), (0, r.jsx)("div", {
                                    className: "w-full max-w-[1000px] rounded-2xl overflow-hidden",
                                    children: (0, r.jsx)(a(), {
                                        src: "https://static.clipdrop.co/web/homepage/home-api.webp",
                                        alt: "API representation",
                                        width: 1e3,
                                        height: 586,
                                        className: "w-full rounded-2xl object-cover"
                                    })
                                })]
                            }), (0, r.jsxs)(O, {
                                children: [(0, r.jsx)(d.H2, {
                                    className: "mb-6",
                                    children: t({
                                        id: "/h1/faq"
                                    })
                                }), (0, r.jsx)(b, {})]
                            })]
                        })]
                    })
                }
        }
    },
    function (e) {
        e.O(0, [834, 251, 774, 888, 179], (function () {
            return t = 7314, e(e.s = t);
            var t
        }));
        var t = e.O();
        _N_E = t
    }
]);
//# sourceMappingURL=index-80f483a4ad1563f3.js.map