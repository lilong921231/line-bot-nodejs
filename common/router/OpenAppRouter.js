function OpenAppRouter(req, res) {
    console.log("========== OpenAppRouter req ==========");
    console.log(req['_parsedUrl'].search);
    console.log("========== OpenAppRouter res ==========");
    // console.log(JSON.stringify(res));
    // next();
    const html ='<!DOCTYPE html>\n' +
    '<!-- saved from url=(0054)https://terms2.line.me/LINE_Developers_Developer_Trial -->\n' +
    '<html dir="ltr" lang="ja">\n' +
    '<head>\n' +
    '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n' +
    '    <!--  <meta http-equiv="x-dns-prefetch-control" content="on" />-->\n' +
    '      <title>アプリ起動</title>\n' +
    '    <!--  <meta name="viewport" content="width=320.1,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />-->\n' +
    '    <!--  <meta name="apple-mobile-web-app-title" content="アプリ起動" />-->\n' +
    '    <!--  <meta name="apple-mobile-web-app-capable" content="yes" />-->\n' +
    '    <!--  <meta content="telephone=no" name="format-detection" />-->\n' +
    '    <!--  <meta name="full-screen" content="yes" />-->\n' +
    '    <!--  <meta name="x5-fullscreen" content="true" />-->\n' +
    '\n' +
    '    <!--<title>アプリを起動しています</title>-->\n' +
    '    <!--<meta http-equiv="X-UA-Compatible" content="IE=edge">-->\n' +
    '</head>\n' +
    '<body>\n' +
    '    <div>\n' +
    '        <h1>アプリを起動しています</h1>\n' +
    '    </div>\n' +
    '<script>\n' +
    '    window.onload = function () {\n' +
    '        loadApp();\n' +
    '    };\n' +
    '    function loadApp() {\n' +
    '        const ua = navigator.userAgent;\n' +
    '\n' +
    '        if(ua.match(/iPhone|iPod/i) != null){\n' +
    '            //iphone代码\n' +
    // '            document.location = \'FrontShip://creadApp' + req['_parsedUrl'].search + '\';\n' +
    '            window.location.href = \'test3://?userId=' + req.query.userId + '\';\n' +
    // '            window.location.href = \'Fujitsu://bank?userId=' + req.query.userId + '\';\n' +
    '        }else if(ua.match(/Android/i) != null){\n' +
    '            //android代码\n' +
    '               window.location.href = \'Fujitsu://bank?userId=' + req['_parsedUrl'].search + '\';\n' +
    '        }else if(ua.match(/iPad/i) != null){\n' +
    '            //ipad代码\n' +
    '        }\n' +
    '    }\n' +
    '</script>\n' +
    '\n' +
    '</body>\n' +
    '</html>';
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
    // res.status(200).send('Something broke!');
}

module.exports = OpenAppRouter;