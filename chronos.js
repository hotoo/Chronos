/**
 * Sync Client & Server Time-smtp.
 *
 * @param {String} servTime, the server init time.
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 * @version 0.1, 2010/11/15
 *
 * FIXME: unfinished.
 */
var Chronos = function(servTime){
    this._client = +new Date();
    this._server = Date.parse(servTime);
    this._diff = this._client - this._server;
    var THIS = this;
    this._delay = 100;
    window.setInterval(function(){
        THIS.timer.call(THIS, +new Date());
    }, this._delay);
};
Chronos.prototype = {
    timer : function(time){
        if(Math.abs(this._server + this._diff - time + this._delay) > 2*this._delay){
            this._diff = time - this._client + this._delay;
        }
        this._client = time;
        this._server = time + this._diff;
    },
    get : function(){
        return new Date(this._server);
    },
    sync : function(){
        throw new Error("Server Unrealized.");

        var start = new Date();
        var THIS = this;
        jQuery.ajax({
            url:"http://www.time.ac.cn/api/jsonp?local="+start+"&callback=?",
            type:"GET",
            dataType:"jsonp",
            success:function(time){
                var trans = (new Date()-start) / 2;
                THIS._diff = (THIS._diff + Date.parse(time) - trans) / 2;
            }
        });
    }
};
