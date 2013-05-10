var CookieWarn = new Class(
    Implements: Options,
    options: {
        cookieName: 'CookieWarn',
        id: 'CookieWarn',
        'class': null,
        container: null,
        auto: true,
        html: '{message}: {ok} {more}'
        message: 'This site uses cookies to enable persistent features between page changes and to gather anonymous statistics about our web site frequentation.',
        ok: 'Thanks for Telling Me',
        more: 'Why this message?',
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
        if(!this.accepted()){
            var t = this,
                o = t.options,
                replacements = {
                    message: o.message,
                    ok: '<a href="#" class="cookieWarnOk">'+o.ok+'</a>',
                    more: '<a href="'+o.link+'" class="cookieWarnMore" target="_blank">'+o.more+'</a>'
                },
                el = new Element('div', {
                    id: o.id,
                    class: o.class,
                    html: o.html.substitute(replacements)
                }),
                okLink = el.getElement('.cookieWarnOk').addEvent('click', function(e){
                    if(e){
                        e.preventDefault();
                    }
                    t.accepted(true);
                });
        }
    },
    accepted: function(value){
        return (value !== undefined) ? Cookie.write(this.options.cookieName, value) : Cookie.read(this.options.cookieName);
    }
);
