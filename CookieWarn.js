/**
* CookieWarn Class
* 
**/
var CookieWarn = new Class({
    Implements: [Options, Events],
    el : null,
    options: {
        cookieName: 'CookieWarn',
        id: 'CookieWarn',
        'class': null,
        container: null,
        auto: true,
        
        more: 'Why this message?',
        moreClass: 'cookieWarnMore',
        moreTarget: '_blank',
        moreLink: 'http://cookie-warn.asper.fr',
        
        warnMessage: 'This site uses cookies to enable persistent features between page changes and to gather anonymous statistics about our web site frequentation',
        warnHtml: '{message}<br />{ok} | {more}',
        warnOk: 'Thanks for Telling Me',
        warnOkClass: 'cookieWarnOk',
        
        remindMessage: 'You have allowed cookies',
        remindHtml: '{message}<br />{nok} | {more}',
        remindNok: 'Do not allow cookies',
        remindNokClass: 'cookieWarnNok'
    },
    initialize: function(options) {
        this.options.container = document.id(document.body);
        this.setOptions(options);
        if (this.options.auto) {
            this.show();
        }
    },
    show: function(){
        var prefix = this.accepted() ? 'remind' : 'warn',
            t = this,
            o = t.options,
            replacements = {
                message: o[prefix+'Message'],
                ok: '<a href="#" class="'+o[prefix+'OkClass']+'">'+o[prefix+'Ok']+'</a>',
                more: '<a href="'+o.moreLink+'" class="'+o.moreClass+'" target="'+o.moreTarget+'">'+o.more+'</a>'
            },
            el = new Element('div', {
                id: o.id,
                'class': o.class,
                html: o[prefix+'Html'].substitute(replacements)
            }),
            okLink = el.getElement('.'+o[prefix+'Class']);
        okLink.addEvent('click', function(e) {
            if (e) {
                e.preventDefault();
            }
            t.accepted(1);
        });
        el.inject(document.id(o.container));
    },
    accepted: function(value) {
        return (value !== undefined) ? Cookie.write(this.options.cookieName, value) : Cookie.read(this.options.cookieName);
    }
});