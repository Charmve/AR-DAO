(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [834],
    {
        5253: function (e, t, o) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                (t.getDomainLocale = function (e, t, n, r) {
                    var a = o(6872).normalizeLocalePath,
                        u = o(6497).detectDomainLocale,
                        l = t || a(e, n).detectedLocale,
                        c = u(r, void 0, l);
                    if (c) {
                        var f = "http".concat(c.http ? "" : "s", "://"),
                            i = l === c.defaultLocale ? "" : "/".concat(l);
                        return "".concat(f).concat(c.domain).concat("").concat(i).concat(e);
                    }
                    return !1;
                });
            ("function" === typeof t.default ||
                ("object" === typeof t.default && null !== t.default)) &&
            "undefined" === typeof t.default.__esModule &&
                (Object.defineProperty(t.default, "__esModule", {
                        value: !0
                    }),
                    Object.assign(t.default, t),
                    (e.exports = t.default));
        },
        162: function (e, t, o) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = o(4566).Z;
            o(9178).default;
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                (t.default = void 0);
            var r = o(3903).Z,
                a = o(5154).Z,
                u = r(o(2784)),
                l = o(9918),
                c = o(4400),
                f = o(3220),
                i = o(4069),
                s = o(2030),
                p = o(5253),
                d = o(3952),
                y = "undefined" !== typeof u.default.useTransition,
                v = {};

            function b(e, t, o, n) {
                if (e && l.isLocalURL(t)) {
                    Promise.resolve(e.prefetch(t, o, n)).catch(function (e) {
                        0;
                    });
                    var r =
                        n && "undefined" !== typeof n.locale ? n.locale : e && e.locale;
                    v[t + "%" + o + (r ? "%" + r : "")] = !0;
                }
            }
            var h = u.default.forwardRef(function (e, t) {
                var o,
                    r = e.href,
                    h = e.as,
                    O = e.children,
                    m = e.prefetch,
                    j = e.passHref,
                    g = e.replace,
                    L = e.shallow,
                    _ = e.scroll,
                    P = e.locale,
                    C = e.onClick,
                    x = e.onMouseEnter,
                    M = e.onTouchStart,
                    w = e.legacyBehavior,
                    E = void 0 === w ? !0 !== Boolean(!1) : w,
                    R = a(e, [
                        "href",
                        "as",
                        "children",
                        "prefetch",
                        "passHref",
                        "replace",
                        "shallow",
                        "scroll",
                        "locale",
                        "onClick",
                        "onMouseEnter",
                        "onTouchStart",
                        "legacyBehavior",
                    ]);
                (o = O),
                !E ||
                    ("string" !== typeof o && "number" !== typeof o) ||
                    (o = u.default.createElement("a", null, o));
                var S = !1 !== m,
                    k = n(y ? u.default.useTransition() : [], 2)[1],
                    A = u.default.useContext(f.RouterContext),
                    T = u.default.useContext(i.AppRouterContext);
                T && (A = T);
                var D,
                    U = u.default.useMemo(
                        function () {
                            var e = n(l.resolveHref(A, r, !0), 2),
                                t = e[0],
                                o = e[1];
                            return {
                                href: t,
                                as: h ? l.resolveHref(A, h) : o || t
                            };
                        },
                        [A, r, h]
                    ),
                    Z = U.href,
                    I = U.as,
                    z = u.default.useRef(Z),
                    B = u.default.useRef(I);
                E && (D = u.default.Children.only(o));
                var H = E ? D && "object" === typeof D && D.ref : t,
                    K = n(s.useIntersection({
                        rootMargin: "200px"
                    }), 3),
                    N = K[0],
                    G = K[1],
                    $ = K[2],
                    q = u.default.useCallback(
                        function (e) {
                            (B.current === I && z.current === Z) ||
                            ($(), (B.current = I), (z.current = Z)),
                            N(e),
                                H &&
                                ("function" === typeof H ?
                                    H(e) :
                                    "object" === typeof H && (H.current = e));
                        },
                        [I, H, Z, $, N]
                    );
                u.default.useEffect(
                    function () {
                        var e = G && S && l.isLocalURL(Z),
                            t = "undefined" !== typeof P ? P : A && A.locale,
                            o = v[Z + "%" + I + (t ? "%" + t : "")];
                        e && !o && b(A, Z, I, {
                            locale: t
                        });
                    },
                    [I, Z, G, P, S, A]
                );
                var F = {
                    ref: q,
                    onClick: function (e) {
                        E || "function" !== typeof C || C(e),
                            E &&
                            D.props &&
                            "function" === typeof D.props.onClick &&
                            D.props.onClick(e),
                            e.defaultPrevented ||
                            (function (e, t, o, n, r, a, u, c, f, i) {
                                if (
                                    "A" !== e.currentTarget.nodeName.toUpperCase() ||
                                    (!(function (e) {
                                            var t = e.currentTarget.target;
                                            return (
                                                (t && "_self" !== t) ||
                                                e.metaKey ||
                                                e.ctrlKey ||
                                                e.shiftKey ||
                                                e.altKey ||
                                                (e.nativeEvent && 2 === e.nativeEvent.which)
                                            );
                                        })(e) &&
                                        l.isLocalURL(o))
                                ) {
                                    e.preventDefault();
                                    var s = function () {
                                        "beforePopState" in t
                                            ?
                                            t[r ? "replace" : "push"](o, n, {
                                                shallow: a,
                                                locale: c,
                                                scroll: u,
                                            }) :
                                            t[r ? "replace" : "push"](o, {
                                                forceOptimisticNavigation: !i,
                                            });
                                    };
                                    f ? f(s) : s();
                                }
                            })(e, A, Z, I, g, L, _, P, T ? k : void 0, S);
                    },
                    onMouseEnter: function (e) {
                        E || "function" !== typeof x || x(e),
                            E &&
                            D.props &&
                            "function" === typeof D.props.onMouseEnter &&
                            D.props.onMouseEnter(e),
                            (!S && T) || (l.isLocalURL(Z) && b(A, Z, I, {
                                priority: !0
                            }));
                    },
                    onTouchStart: function (e) {
                        E || "function" !== typeof M || M(e),
                            E &&
                            D.props &&
                            "function" === typeof D.props.onTouchStart &&
                            D.props.onTouchStart(e),
                            (!S && T) || (l.isLocalURL(Z) && b(A, Z, I, {
                                priority: !0
                            }));
                    },
                };
                if (!E || j || ("a" === D.type && !("href" in D.props))) {
                    var J = "undefined" !== typeof P ? P : A && A.locale,
                        Q =
                        A &&
                        A.isLocaleDomain &&
                        p.getDomainLocale(I, J, A.locales, A.domainLocales);
                    F.href = Q || d.addBasePath(c.addLocale(I, J, A && A.defaultLocale));
                }
                return E ?
                    u.default.cloneElement(D, F) :
                    u.default.createElement("a", Object.assign({}, R, F), o);
            });
            (t.default = h),
            ("function" === typeof t.default ||
                ("object" === typeof t.default && null !== t.default)) &&
            "undefined" === typeof t.default.__esModule &&
                (Object.defineProperty(t.default, "__esModule", {
                        value: !0
                    }),
                    Object.assign(t.default, t),
                    (e.exports = t.default));
        },
        6872: function (e, t, o) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                (t.normalizeLocalePath = void 0);
            (t.normalizeLocalePath = function (e, t) {
                return o(8458).normalizeLocalePath(e, t);
            }),
            ("function" === typeof t.default ||
                ("object" === typeof t.default && null !== t.default)) &&
            "undefined" === typeof t.default.__esModule &&
                (Object.defineProperty(t.default, "__esModule", {
                        value: !0
                    }),
                    Object.assign(t.default, t),
                    (e.exports = t.default));
        },
        4069: function (e, t, o) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                (t.GlobalLayoutRouterContext =
                    t.LayoutRouterContext =
                    t.AppRouterContext =
                    void 0);
            var n = (0, o(3903).Z)(o(2784)),
                r = n.default.createContext(null);
            t.AppRouterContext = r;
            var a = n.default.createContext(null);
            t.LayoutRouterContext = a;
            var u = n.default.createContext(null);
            t.GlobalLayoutRouterContext = u;
        },
        9097: function (e, t, o) {
            e.exports = o(162);
        },
        6670: function (e, t, o) {
            "use strict";

            function n(e, t) {
                return (
                    (t = null != t ? t : {}),
                    Object.getOwnPropertyDescriptors ?
                    Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) :
                    (function (e, t) {
                        var o = Object.keys(e);
                        if (Object.getOwnPropertySymbols) {
                            var n = Object.getOwnPropertySymbols(e);
                            t &&
                                (n = n.filter(function (t) {
                                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                                })),
                                o.push.apply(o, n);
                        }
                        return o;
                    })(Object(t)).forEach(function (o) {
                        Object.defineProperty(
                            e,
                            o,
                            Object.getOwnPropertyDescriptor(t, o)
                        );
                    }),
                    e
                );
            }
            o.d(t, {
                Z: function () {
                    return n;
                },
            });
        },
        6297: function (e, t, o) {
            "use strict";

            function n(e, t) {
                if (null == e) return {};
                var o,
                    n,
                    r = (function (e, t) {
                        if (null == e) return {};
                        var o,
                            n,
                            r = {},
                            a = Object.keys(e);
                        for (n = 0; n < a.length; n++)
                            (o = a[n]), t.indexOf(o) >= 0 || (r[o] = e[o]);
                        return r;
                    })(e, t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < a.length; n++)
                        (o = a[n]),
                        t.indexOf(o) >= 0 ||
                        (Object.prototype.propertyIsEnumerable.call(e, o) &&
                            (r[o] = e[o]));
                }
                return r;
            }
            o.d(t, {
                Z: function () {
                    return n;
                },
            });
        },
        8530: function (e, t, o) {
            "use strict";

            function n(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
                return n;
            }

            function r(e, t) {
                return (
                    (function (e) {
                        if (Array.isArray(e)) return e;
                    })(e) ||
                    (function (e) {
                        if (
                            ("undefined" !== typeof Symbol && null != e[Symbol.iterator]) ||
                            null != e["@@iterator"]
                        )
                            return Array.from(e);
                    })(e) ||
                    (function (e, t) {
                        if (e) {
                            if ("string" === typeof e) return n(e, t);
                            var o = Object.prototype.toString.call(e).slice(8, -1);
                            return (
                                "Object" === o && e.constructor && (o = e.constructor.name),
                                "Map" === o || "Set" === o ?
                                Array.from(o) :
                                "Arguments" === o ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ?
                                n(e, t) :
                                void 0
                            );
                        }
                    })(e, t) ||
                    (function () {
                        throw new TypeError(
                            "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                    })()
                );
            }
            o.d(t, {
                Z: function () {
                    return r;
                },
            });
        },
    },
]);
//# sourceMappingURL=834-1e09c549ef4466f0.js.map