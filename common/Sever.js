var talkEntity = require('./entity/TalkEntity');

var talk = new talkEntity();


function Server(eventSelect) {
    switch (eventSelect) {
        case 'ceshi':
            talk.firstTimeEntity('5000000');
    }
}

module.exports = {
    Server
};
