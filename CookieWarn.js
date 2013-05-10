var CookieWarn = new Class({
    Implements: Options,
    options: {
        cookieName: 'CookieWarn',
        id: 'CookieWarn',
        'class': null,
        container: null,
        auto: true,
        html: '{message}: {ok} | {more}'
        message: 'This site uses cookies to enable persistent features between page changes and to gather anonymous statistics about our web site frequentation.',
        ok: 'Thanks for Telling Me',
        okClass: 'cookieWarnOk',
        more: 'Why this message?',
        moreClass: 'cookieWarnMore',
        moreTarget: '_blank',
        link: 'http://cookie-warn.asper.fr'
    },
    initialize: function(options){
        this.options.container = document.id(document.body);
        this.setOptions(options);
        if(this.options.auto){
            this.show();
        }
    },
    show: function(){
        if(this.accepted()){
            return true;
        }
        var t = this,
            o = t.options,
            replacements = {
                message: o.message,
                ok: new Element('a', {
                    href: '#',
                    'class': o.okClass,
                    html: o.ok
                }),
                more: new Element('a', {
                    href: o.link,
                    'class': o.moreClass,
                    target: o.moreTarget,
                    html: o.more
                })
            },
            el = new Element('div', {
                id: o.id,
                'class': o.class,
                html: o.html.substitute(replacements)
            }),
            okLink = el.getElement('.cookieWarnOk').addEvent('click', function(e){
                if(e){
                    e.preventDefault();
                }
                t.accepted(true);
            });
        el.inject(document.id(o.container));
    },
    accepted: function(value){
        return (value !== undefined) ? Cookie.write(this.options.cookieName, value) : Cookie.read(this.options.cookieName);
    }
});
