var talkEntity = require('./entity/TalkEntity');

var talk = new talkEntity();


function talkServer(eventSelect) {
    switch (eventSelect) {
        case 'ceshi':
            console.log(eventSelect);
            return talk.firstTimeEntity('5000000');
    }
}

module.exports = {
    talkServer
};
